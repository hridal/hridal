// Shelf recommendations: visitors suggest a book or film for Hridal. Suggestions wait privately until she
// signs in and chooses to show them on the page (or remove them), so nothing appears publicly without her say.
import type { APIRoute } from 'astro';
import { redis, storeReady, json, isAdmin, clean, voter, overLimit } from '../../lib/store';

export const prerender = false;

const KINDS = ['book', 'film'];
const MAX_WAITING = 300, MAX_SHOWN = 200, PER_VISITOR_DAY = 8;
const LINK = /(https?:|www\.|\.(com|net|org|io|ly|gg|xyz)\b)/i;

const parse = (list: string[] | null) => (list || []).map(r => { try { return JSON.parse(r); } catch { return null; } }).filter(Boolean);

async function state(admin: boolean) {
  const [shown, waiting] = await redis([['LRANGE', 'recs:shown', 0, MAX_SHOWN - 1], ['LRANGE', 'recs:waiting', 0, MAX_WAITING - 1]]);
  const s = parse(shown), w = parse(waiting);
  return { enabled: true, shown: s.map(({ vid, ...r }: any) => r), ...(admin ? { waiting: w, admin: true } : { waitingCount: w.length }) };
}

export const GET: APIRoute = async ({ request }) => {
  if (!storeReady) return json({ enabled: false });
  try { return json(await state(await isAdmin(request))); } catch { return json({ enabled: false }, 503); }
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!storeReady) return json({ enabled: false }, 503);
  let b: any; try { b = await request.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  const action = String(b?.action || '');
  try {
    // ---- visitors: suggest something ----
    if (action === 'suggest') {
      const kind = KINDS.includes(b?.kind) ? b.kind : 'book';
      const rec = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), kind,
        title: clean(b?.title, 90), by: clean(b?.by, 60), why: clean(b?.why, 240), name: clean(b?.name, 30), at: Date.now() };
      if (rec.title.length < 2) return json({ error: 'Add a title first.' }, 400);
      if ([rec.title, rec.by, rec.why, rec.name].some(t => LINK.test(t))) return json({ error: 'Please leave out links.' }, 400);
      const who = voter(b, clientAddress);
      if (await overLimit(who.ip, 40)) return json({ error: 'Lots of suggestions from this network. Try again later.' }, 429);
      const day = new Date().toISOString().slice(0, 10), mine = `recs:by:${who.id}:${day}`;
      const [n] = await redis([['INCR', mine], ['EXPIRE', mine, 60 * 60 * 26]]);
      if (+n > PER_VISITOR_DAY) return json({ error: 'That’s plenty for today, thank you! Come back tomorrow.' }, 429);
      await redis([['LPUSH', 'recs:waiting', JSON.stringify(rec)], ['LTRIM', 'recs:waiting', 0, MAX_WAITING - 1]]);
      return json({ ok: true, rec });
    }

    // ---- Hridal: show or remove ----
    if (!(await isAdmin(request))) return json({ error: 'Sign in first.' }, 401);
    const id = clean(b?.id, 24);
    const [waiting, shown] = await redis([['LRANGE', 'recs:waiting', 0, -1], ['LRANGE', 'recs:shown', 0, -1]]);
    const inWaiting = (waiting || []).find((r: string) => { try { return JSON.parse(r).id === id; } catch { return false; } });
    const inShown = (shown || []).find((r: string) => { try { return JSON.parse(r).id === id; } catch { return false; } });
    if (action === 'show' && inWaiting) {
      const rec = { ...JSON.parse(inWaiting), shownAt: Date.now() };
      if (typeof b?.reply === 'string') rec.reply = clean(b.reply, 200);
      await redis([['LREM', 'recs:waiting', 1, inWaiting], ['LPUSH', 'recs:shown', JSON.stringify(rec)], ['LTRIM', 'recs:shown', 0, MAX_SHOWN - 1]]);
    } else if (action === 'hide' && inShown) {
      // take it off the page but keep it in her list
      await redis([['LREM', 'recs:shown', 1, inShown], ['LPUSH', 'recs:waiting', inShown]]);
    } else if (action === 'remove') {
      const cmds: (string | number)[][] = [];
      if (inWaiting) cmds.push(['LREM', 'recs:waiting', 1, inWaiting]);
      if (inShown) cmds.push(['LREM', 'recs:shown', 1, inShown]);
      if (cmds.length) await redis(cmds);
    } else if (!['show', 'hide', 'remove'].includes(action)) return json({ error: 'Unknown action.' }, 400);
    return json(await state(true));
  } catch { return json({ enabled: false }, 503); }
};
