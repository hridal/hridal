// Hridal's own Focus and Exercise data (study sessions, to-dos, types of work, workouts), saved to the site
// so it follows her to any device she signs in on. Only works while she is signed in; nobody else can read it.
// Each device sends everything it has; the server merges it with what's stored (newest edit of each item wins,
// deleted items stay deleted) and sends the merged copy back.
import type { APIRoute } from 'astro';
import { redis, storeReady, json, isAdmin } from '../../lib/store';

export const prerender = false;

const APPS: Record<string, { lists: string[]; ones: string[] }> = {
  focus: { lists: ['hridal.focus.cats', 'hridal.focus.sessions', 'hridal.focus.todos'], ones: ['hridal.focus.running'] },
  exercise: { lists: ['hridal.ex.history'], ones: ['hridal.ex.current'] },
};
const MAX_BYTES = 900_000;            // stay under the store's 1 MB request limit
const KEEP_GONE = 400 * 864e5;        // remember deletions for about a year

type Doc = { lists: Record<string, any[]>; ones: Record<string, { v: unknown; t: number }>; gone: Record<string, number> };

function clean(app: string, d: any): Doc {
  const spec = APPS[app], out: Doc = { lists: {}, ones: {}, gone: {} };
  for (const k of spec.lists) out.lists[k] = (Array.isArray(d?.lists?.[k]) ? d.lists[k] : []).filter((it: any) => it && typeof it === 'object' && it.id != null).slice(0, 20000);
  for (const k of spec.ones) { const o = d?.ones?.[k]; out.ones[k] = { v: o && 'v' in o ? o.v ?? null : null, t: +o?.t || 0 }; }
  const now = Date.now();
  for (const [k, t] of Object.entries(d?.gone || {})) if (typeof k === 'string' && k.length < 200 && +t! > now - KEEP_GONE) out.gone[k] = +t!;
  return out;
}

function merge(app: string, a: Doc, b: Doc): Doc {
  const spec = APPS[app], out: Doc = { lists: {}, ones: {}, gone: { ...a.gone } };
  for (const [k, t] of Object.entries(b.gone)) out.gone[k] = Math.max(out.gone[k] || 0, t);
  for (const k of spec.lists) {
    const by = new Map<string, any>();
    for (const it of [...(a.lists[k] || []), ...(b.lists[k] || [])]) {
      const id = String(it.id), had = by.get(id);
      if (!had || (+it._t || 0) >= (+had._t || 0)) by.set(id, it);
    }
    out.lists[k] = [...by.values()].filter(it => !((out.gone[k + '|' + it.id] ?? -1) >= (+it._t || 0)));
  }
  for (const k of spec.ones) out.ones[k] = (b.ones[k]?.t || 0) >= (a.ones[k]?.t || 0) ? b.ones[k] : a.ones[k];
  return out;
}

export const GET: APIRoute = async ({ request, url }) => {
  const app = url.searchParams.get('app') || '';
  if (!APPS[app]) return json({ error: 'Unknown app.' }, 400);
  if (!storeReady) return json({ enabled: false }, 503);
  if (!(await isAdmin(request))) return json({ error: 'Sign in first.' }, 401);
  const [raw] = await redis([['GET', 'vault:' + app]]);
  return json({ doc: raw ? JSON.parse(raw) : null });
};

export const POST: APIRoute = async ({ request }) => {
  if (!storeReady) return json({ enabled: false }, 503);
  if (!(await isAdmin(request))) return json({ error: 'Sign in first.' }, 401);
  let b: any; try { b = await request.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  const app = String(b?.app || '');
  if (!APPS[app]) return json({ error: 'Unknown app.' }, 400);
  try {
    const [raw] = await redis([['GET', 'vault:' + app]]);
    const stored = raw ? clean(app, JSON.parse(raw)) : clean(app, {});
    const doc = merge(app, stored, clean(app, b.doc));
    const text = JSON.stringify(doc);
    if (text.length > MAX_BYTES) return json({ error: 'Too much to save in one go.', doc: stored }, 413);
    if (text !== raw) await redis([['SET', 'vault:' + app, text]]);
    return json({ doc, savedAt: Date.now() });
  } catch { return json({ error: 'Couldn’t save just now.' }, 503); }
};
