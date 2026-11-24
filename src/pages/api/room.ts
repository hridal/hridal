// "Study with me" room on the Focus page.
// Hridal's own timer (once she has signed in with the admin password) tells the room when she is
// studying and what on. Visitors can take a seat; seats disappear a minute or so after they leave.
import type { APIRoute } from 'astro';
import { redis, storeReady, adminPassword, json } from '../../lib/store';

export const prerender = false;

const ACTS = ['Revising', 'Coding', 'Writing', 'Reading', 'Working', 'Just vibing'];
const SEAT_TTL = 75_000;   // a seat is freed this long after its last heartbeat
const HOST_TTL = 150;      // seconds the live status lasts without a heartbeat from Hridal's timer
const isAdmin = (req: Request) => !!adminPassword && req.headers.get('x-admin-password') === adminPassword;
const clean = (s: unknown, max: number) => String(s ?? '').replace(/[\u0000-\u001F]/g, ' ').trim().slice(0, max);

async function state() {
  const now = Date.now();
  const [, ids, host, days, last] = await redis([
    ['ZREMRANGEBYSCORE', 'room:people', 0, now - SEAT_TTL],
    ['ZRANGE', 'room:people', 0, 40],
    ['GET', 'room:host'],
    ['HGETALL', 'room:days'],
    ['GET', 'room:last'],
  ]);
  let acts: (string | null)[] = [];
  if (ids?.length) [acts] = await redis([['HMGET', 'room:acts', ...ids]]);
  else await redis([['DEL', 'room:acts']]);
  const week: Record<string, number> = {};
  for (let i = 0; i < (days || []).length; i += 2) week[days[i]] = Math.round(+days[i + 1]);
  return {
    enabled: true, now,
    host: host ? JSON.parse(host) : null,
    last: last ? JSON.parse(last) : null,
    people: (ids || []).map((id: string, i: number) => ({ id, act: acts?.[i] || 'Working' })),
    week,
  };
}

export const GET: APIRoute = async () => {
  if (!storeReady) return json({ enabled: false });
  try { return json(await state()); } catch { return json({ enabled: false }, 503); }
};

export const POST: APIRoute = async ({ request }) => {
  if (!storeReady) return json({ enabled: false }, 503);
  let b: any; try { b = await request.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  const action = String(b?.action || '');
  try {
    // ---- visitors ----
    if (action === 'seat' || action === 'leave') {
      const id = String(b?.id || '');
      if (!/^[a-z0-9]{8,16}$/.test(id)) return json({ error: 'Bad seat.' }, 400);
      if (action === 'leave') await redis([['ZREM', 'room:people', id], ['HDEL', 'room:acts', id]]);
      else {
        const act = ACTS.includes(b?.act) ? b.act : 'Working';
        const [count] = await redis([['ZCARD', 'room:people']]);
        const [mine] = await redis([['ZSCORE', 'room:people', id]]);
        if (!mine && count >= 40) return json({ error: 'The room is full right now.' }, 429);
        await redis([['ZADD', 'room:people', Date.now(), id], ['HSET', 'room:acts', id, act]]);
      }
      return json(await state());
    }

    // ---- Hridal ----
    if (!isAdmin(request)) return json({ error: 'Wrong password.' }, 401);
    if (action === 'check') return json({ ok: true });
    if (action === 'live') {
      const host = {
        task: clean(b.task, 80), cat: clean(b.cat, 40), color: /^#[0-9a-f]{6}$/i.test(b.color) ? b.color : '#6c202d',
        elapsed: Math.max(0, Math.min(+b.elapsed || 0, 86_400_000)), paused: !!b.paused,
        target: Math.max(0, Math.min(+b.target || 0, 600)), at: Date.now(),
      };
      await redis([['SET', 'room:host', JSON.stringify(host), 'EX', HOST_TTL]]);
      return json(await state());
    }
    if (action === 'finish' || action === 'off') {
      const cmds: (string | number)[][] = [['DEL', 'room:host']];
      const minutes = Math.max(0, Math.min(+b.minutes || 0, 1440));
      const day = /^\d{4}-\d{2}-\d{2}$/.test(b.day) ? b.day : '';
      if (action === 'finish' && minutes >= 1 && day) {
        cmds.push(['HINCRBYFLOAT', 'room:days', day, minutes]);
        cmds.push(['SET', 'room:last', JSON.stringify({ task: clean(b.task, 80), cat: clean(b.cat, 40), minutes: Math.round(minutes), end: Date.now() })]);
      }
      await redis(cmds);
      return json(await state());
    }
    return json({ error: 'Unknown action.' }, 400);
  } catch { return json({ enabled: false }, 503); }
};
