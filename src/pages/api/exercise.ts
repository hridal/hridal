// Exercise page: Hridal's live workout (gym or bouldering), her recent sessions, and visitors' waves.
// Her own tracker (signed in with the admin password) sends updates; everyone else can read and wave.
import type { APIRoute } from 'astro';
import { redis, storeReady, adminPassword, json, voter, overLimit } from '../../lib/store';

export const prerender = false;

const LIVE_TTL = 4 * 60 * 60;            // a live workout disappears after 4 hours without an update
const REACTS = ['wave', 'cheer'];
const isAdmin = (req: Request) => !!adminPassword && req.headers.get('x-admin-password') === adminPassword;
const txt = (s: unknown, max: number) => String(s ?? '').replace(/[\u0000-\u001F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const num = (n: unknown, max: number) => { const v = Math.round((+(n as number) || 0) * 10) / 10; return Math.max(0, Math.min(v, max)); };
const GRADES = ['VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10'];
const RESULTS = ['flash', 'sent', 'project'];

// Only keep the fields the page shows, with sane limits.
function tidy(w: any) {
  return {
    id: txt(w?.id, 24), type: w?.type === 'climb' ? 'climb' : 'gym', title: txt(w?.title, 60),
    startedAt: +w?.startedAt || Date.now(), endedAt: w?.endedAt ? +w.endedAt : undefined,
    exercises: (Array.isArray(w?.exercises) ? w.exercises : []).slice(0, 30).map((e: any) => ({
      name: txt(e?.name, 50),
      sets: (Array.isArray(e?.sets) ? e.sets : []).slice(0, 20).map((s: any) => ({ reps: num(s?.reps, 1000), kg: num(s?.kg, 1000), done: !!s?.done, ...(s?.pb ? { pb: true } : {}) })),
    })).filter((e: any) => e.name),
    climbs: (Array.isArray(w?.climbs) ? w.climbs : []).slice(0, 80).map((c: any) => ({
      grade: GRADES.includes(c?.grade) ? c.grade : 'V0', result: RESULTS.includes(c?.result) ? c.result : 'sent', attempts: num(c?.attempts, 99), ...(c?.pb ? { pb: true } : {}),
    })),
  };
}

async function state() {
  const [live, hist] = await redis([['GET', 'ex:live'], ['LRANGE', 'ex:history', 0, 59]]);
  const w = live ? JSON.parse(live) : null;
  let reacts: Record<string, number> = {};
  if (w) {
    const res = await redis(REACTS.map(k => ['GET', `ex:react:${w.id}:${k}`]));
    REACTS.forEach((k, i) => reacts[k] = +(res[i] || 0));
  }
  return { enabled: true, now: Date.now(), live: w, reacts, history: (hist || []).map((h: string) => JSON.parse(h)) };
}

export const GET: APIRoute = async () => {
  if (!storeReady) return json({ enabled: false });
  try { return json(await state()); } catch { return json({ enabled: false }, 503); }
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!storeReady) return json({ enabled: false }, 503);
  let b: any; try { b = await request.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  const action = String(b?.action || '');
  try {
    // ---- visitors: wave or cheer at the workout that's on now (once each per visitor) ----
    if (action === 'react') {
      const kind = String(b?.kind || '');
      if (!REACTS.includes(kind)) return json({ error: 'Unknown reaction.' }, 400);
      const [live] = await redis([['GET', 'ex:live']]);
      if (!live) return json(await state());
      const w = JSON.parse(live), who = voter(b, clientAddress);
      if (await overLimit(who.ip)) return json({ error: 'Too many from this network. Try again in a bit.' }, 429);
      const [first] = await redis([['SET', `ex:reacted:${w.id}:${kind}:${who.id}`, '1', 'NX', 'EX', LIVE_TTL]]);
      if (first === 'OK') await redis([['INCR', `ex:react:${w.id}:${kind}`], ['EXPIRE', `ex:react:${w.id}:${kind}`, 60 * 60 * 24 * 30]]);
      return json({ ...(await state()), counted: first === 'OK' });
    }

    // ---- Hridal ----
    if (!isAdmin(request)) return json({ error: 'Wrong password.' }, 401);
    if (action === 'check') return json({ ok: true });
    if (action === 'live') {
      const w = tidy(b.workout); if (!w.id) return json({ error: 'No workout.' }, 400);
      await redis([['SET', 'ex:live', JSON.stringify(w), 'EX', LIVE_TTL]]);
      return json(await state());
    }
    if (action === 'finish') {
      const w = tidy(b.workout); if (!w.id) return json({ error: 'No workout.' }, 400);
      w.endedAt = Date.now();
      const res = await redis(REACTS.map(k => ['GET', `ex:react:${w.id}:${k}`]));
      const done = { ...w, reacts: Object.fromEntries(REACTS.map((k, i) => [k, +(res[i] || 0)])) };
      await redis([['DEL', 'ex:live'], ['LPUSH', 'ex:history', JSON.stringify(done)], ['LTRIM', 'ex:history', 0, 199]]);
      return json(await state());
    }
    if (action === 'cancel') { await redis([['DEL', 'ex:live']]); return json(await state()); }
    if (action === 'delete') {
      // remove a past session from the public list (e.g. logged by mistake)
      const id = txt(b.id, 24); const [hist] = await redis([['LRANGE', 'ex:history', 0, 199]]);
      const hit = (hist || []).find((h: string) => JSON.parse(h).id === id);
      if (hit) await redis([['LREM', 'ex:history', 1, hit]]);
      return json(await state());
    }
    return json({ error: 'Unknown action.' }, 400);
  } catch { return json({ enabled: false }, 503); }
};
