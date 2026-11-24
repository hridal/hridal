// Visitor tallies: "I've been here too" on the Travel globe, and hearts on Kitchen recipes.
// Each visitor counts once per item (by network address, for a year) and can take it back.
import type { APIRoute } from 'astro';
import { redis, storeReady, json } from '../../lib/store';
import { places } from '../../data/travel';
import { recipes } from '../../data/kitchen';

export const prerender = false;

export const placeId = (p: { name: string; country: string }) => (p.name + '-' + p.country).toLowerCase().replace(/[^a-z0-9]+/g, '-');
const ITEMS: Record<string, Set<string>> = {
  been: new Set(places.map(placeId)),
  heart: new Set(recipes.map(r => r.id)),
};
const YEAR = 60 * 60 * 24 * 365;

async function counts(kind: string) {
  const [flat] = await redis([['HGETALL', 'tally:' + kind]]);
  const out: Record<string, number> = {};
  for (let i = 0; i < (flat || []).length; i += 2) if (ITEMS[kind].has(flat[i])) out[flat[i]] = Math.max(0, +flat[i + 1]);
  return out;
}

export const GET: APIRoute = async ({ url }) => {
  const kind = url.searchParams.get('kind') || '';
  if (!ITEMS[kind]) return json({ error: 'Unknown list.' }, 400);
  if (!storeReady) return json({ enabled: false });
  try { return json({ enabled: true, counts: await counts(kind) }); } catch { return json({ enabled: false }, 503); }
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!storeReady) return json({ enabled: false }, 503);
  let b: any; try { b = await request.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  const kind = String(b?.kind || ''), id = String(b?.id || ''), on = b?.on !== false;
  if (!ITEMS[kind] || !ITEMS[kind].has(id)) return json({ error: 'Unknown item.' }, 400);
  const who = (clientAddress || 'unknown').replace(/[^0-9a-f:.]/gi, '');
  const mark = `tally:${kind}:${id}:${who}`;
  try {
    if (on) {
      const [set] = await redis([['SET', mark, '1', 'NX', 'EX', YEAR]]);
      if (set === 'OK') await redis([['HINCRBY', 'tally:' + kind, id, 1]]);
    } else {
      const [gone] = await redis([['DEL', mark]]);
      if (gone) await redis([['HINCRBY', 'tally:' + kind, id, -1]]);
    }
    return json({ enabled: true, counts: await counts(kind) });
  } catch { return json({ enabled: false }, 503); }
};
