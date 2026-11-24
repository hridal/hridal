// Shared visitor ratings for the Shelf.
// Works once an Upstash Redis database is connected in Vercel (Storage tab), which adds the
// URL and token below automatically. Without it, the page keeps ratings in each visitor's browser.
import type { APIRoute } from 'astro';
import { books, films } from '../../data/shelf';
import { voter, overLimit } from '../../lib/store';

export const prerender = false;

const URL_ = import.meta.env.KV_REST_API_URL || import.meta.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = import.meta.env.KV_REST_API_TOKEN || import.meta.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const ids = new Set([...books.map(b => 'b:' + b.id), ...films.map(f => 'f:' + f.id)]);
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

async function redis(commands: (string | number)[][]) {
  const r = await fetch(`${URL_}/pipeline`, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify(commands) });
  if (!r.ok) throw new Error('store ' + r.status);
  return (await r.json()) as { result: unknown }[];
}

async function totals() {
  const list = [...ids];
  const res = await redis(list.map(id => ['HMGET', 'rating:' + id, 'sum', 'count']));
  const out: Record<string, { sum: number; count: number }> = {};
  list.forEach((id, i) => { const [s, c] = (res[i].result as (string | null)[]) || []; out[id] = { sum: +(s || 0), count: +(c || 0) }; });
  return out;
}

export const GET: APIRoute = async () => {
  if (!URL_ || !TOKEN) return json({ enabled: false });
  try { return json({ enabled: true, ratings: await totals() }); } catch { return json({ enabled: false }, 503); }
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!URL_ || !TOKEN) return json({ enabled: false }, 503);
  let body: any; try { body = await request.json(); } catch { return json({ error: 'Send JSON with an id and stars.' }, 400); }
  const id = String(body?.id || ''); const stars = Number(body?.stars);
  if (!ids.has(id)) return json({ error: 'That book or film isn’t on the shelf.' }, 400);
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) return json({ error: 'Stars must be a whole number from 1 to 5.' }, 400);
  // one rating per item per visitor (each browser, so people on the same Wi-Fi all count) for 30 days
  const who = voter(body, clientAddress);
  try {
    if (await overLimit(who.ip)) return json({ enabled: true, counted: false, ratings: await totals() }, 429);
    const [first] = await redis([['SET', `voted:${id}:${who.id}`, '1', 'NX', 'EX', 60 * 60 * 24 * 30]]);
    if (first.result === 'OK') await redis([['HINCRBY', 'rating:' + id, 'sum', stars], ['HINCRBY', 'rating:' + id, 'count', 1]]);
    return json({ enabled: true, counted: first.result === 'OK', ratings: await totals() });
  } catch { return json({ enabled: false }, 503); }
};
