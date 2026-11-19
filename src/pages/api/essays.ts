// Reader essays: anyone can submit; nothing is public until Hridal publishes it.
import type { APIRoute } from 'astro';
import { redis, storeReady, adminPassword, json } from '../../lib/store';

export const prerender = false;

const clean = (s: unknown, max: number) => String(s ?? '').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
const words = (s: string) => (s.match(/\S+/g) || []).length;
const isAdmin = (req: Request) => adminPassword && req.headers.get('x-admin-password') === adminPassword;

async function read(ids: string[]) {
  if (!ids.length) return [];
  const rows = await redis(ids.map(id => ['HGETALL', 'essay:' + id]));
  return rows.map((r: string[], i) => {
    const o: Record<string, string> = { id: ids[i] };
    for (let k = 0; k < (r || []).length; k += 2) o[r[k]] = r[k + 1];
    return o;
  }).filter(o => o.title);
}

// GET /api/essays            -> published list (no bodies)
// GET /api/essays?id=abc     -> one published essay
// GET /api/essays?pending=1  -> review queue (password header required)
export const GET: APIRoute = async ({ url, request }) => {
  if (!storeReady) return json({ enabled: false });
  try {
    const id = url.searchParams.get('id');
    if (url.searchParams.get('pending')) {
      if (!isAdmin(request)) return json({ error: 'Wrong password.' }, 401);
      const ids = await redis([['ZREVRANGE', 'essays:pending', 0, 99]]);
      return json({ enabled: true, essays: await read(ids[0] || []) });
    }
    if (id) {
      const [e] = await read([id.replace(/[^a-z0-9]/gi, '')]);
      if (!e || e.status !== 'published') return json({ error: 'This essay isn’t published.' }, 404);
      return json({ enabled: true, essay: e });
    }
    const ids = await redis([['ZREVRANGE', 'essays:published', 0, 99]]);
    const list = (await read(ids[0] || [])).map(({ body, ip, ...rest }) => ({ ...rest, words: words(body || '') }));
    return json({ enabled: true, essays: list });
  } catch { return json({ enabled: false }, 503); }
};

// POST /api/essays {title, name, topic, body, website}  -> submit for review
// POST /api/essays {action: 'publish'|'remove', id}       -> review (password header required)
export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!storeReady) return json({ enabled: false }, 503);
  let b: any; try { b = await request.json(); } catch { return json({ error: 'Something went wrong reading that. Try again.' }, 400); }

  if (b?.action) {
    if (!isAdmin(request)) return json({ error: 'Wrong password.' }, 401);
    const id = String(b.id || '').replace(/[^a-z0-9]/gi, '');
    if (!id) return json({ error: 'Missing essay.' }, 400);
    if (b.action === 'publish') {
      await redis([['HSET', 'essay:' + id, 'status', 'published', 'published', Date.now()], ['ZREM', 'essays:pending', id], ['ZADD', 'essays:published', Date.now(), id]]);
    } else if (b.action === 'remove') {
      await redis([['ZREM', 'essays:pending', id], ['ZREM', 'essays:published', id], ['DEL', 'essay:' + id]]);
    } else return json({ error: 'Unknown action.' }, 400);
    return json({ ok: true });
  }

  if (b?.website) return json({ ok: true }); // honeypot: quietly ignore bots
  const title = clean(b?.title, 140), name = clean(b?.name, 60) || 'Anonymous', topic = clean(b?.topic, 200), body = clean(b?.body, 30000);
  if (title.length < 3) return json({ error: 'Give your essay a title.' }, 400);
  if (words(body) < 150) return json({ error: `Essays need at least 150 words. You have ${words(body)}.` }, 400);
  const who = (clientAddress || 'unknown').replace(/[^0-9a-f:.]/gi, '');
  try {
    const [slot] = await redis([['SET', 'essay-limit:' + who, '1', 'NX', 'EX', 600]]);
    if (slot !== 'OK') return json({ error: 'You’ve just sent one. Give it ten minutes before sending another.' }, 429);
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    await redis([['HSET', 'essay:' + id, 'title', title, 'name', name, 'topic', topic, 'body', body, 'created', Date.now(), 'status', 'pending'], ['ZADD', 'essays:pending', Date.now(), id]]);
    return json({ ok: true });
  } catch { return json({ error: 'The essay couldn’t be sent just now. Your draft is saved; try again in a minute.' }, 503); }
};
