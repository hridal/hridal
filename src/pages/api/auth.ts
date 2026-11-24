// Sign in and out for Hridal. Guesses are limited: 5 wrong passwords from one network locks it out
// for 15 minutes, and 30 wrong passwords site-wide in an hour pauses sign-in for everyone for a while.
import type { APIRoute } from 'astro';
import { redis, storeReady, adminPassword, json, isAdmin, passwordMatches, newToken, sessionToken, SESSION_COOKIE, SESSION_DAYS } from '../../lib/store';

export const prerender = false;

const PER_IP = 5, IP_WINDOW = 15 * 60, SITE = 30, SITE_WINDOW = 60 * 60;
const cookie = (token: string, maxAge: number) => `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
const withCookie = (res: Response, c: string) => { res.headers.append('set-cookie', c); return res; };
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

export const GET: APIRoute = async ({ request }) => {
  if (!storeReady || !adminPassword) return json({ signedIn: false, enabled: false });
  try { return json({ signedIn: await isAdmin(request), enabled: true }); } catch { return json({ signedIn: false, enabled: false }, 503); }
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!storeReady || !adminPassword) return json({ error: 'Sign-in isn’t set up.' }, 503);
  let b: any; try { b = await request.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  try {
    if (b?.action === 'logout') {
      const t = sessionToken(request); if (t) await redis([['DEL', 'sess:' + t]]);
      return withCookie(json({ signedIn: false }), cookie('', 0));
    }
    if (b?.action !== 'login') return json({ error: 'Unknown action.' }, 400);
    const ip = (clientAddress || 'unknown').replace(/[^0-9a-f:.]/gi, '');
    const [ipFails, siteFails] = await redis([['GET', 'auth:fail:' + ip], ['GET', 'auth:fail:all']]);
    if (+(ipFails || 0) >= PER_IP) return json({ error: 'Too many wrong attempts. Try again in 15 minutes.' }, 429);
    if (+(siteFails || 0) >= SITE) return json({ error: 'Sign-in is paused for a while after too many wrong attempts.' }, 429);
    if (!passwordMatches(b?.password)) {
      await redis([['INCR', 'auth:fail:' + ip], ['EXPIRE', 'auth:fail:' + ip, IP_WINDOW], ['INCR', 'auth:fail:all'], ['EXPIRE', 'auth:fail:all', SITE_WINDOW]]);
      await wait(600); // slows down guessing a little more
      const left = Math.max(0, PER_IP - (+(ipFails || 0) + 1));
      return json({ error: left ? `That password didn’t work. ${left} ${left === 1 ? 'try' : 'tries'} left.` : 'Too many wrong attempts. Try again in 15 minutes.' }, 401);
    }
    const token = newToken();
    await redis([['SET', 'sess:' + token, '1', 'EX', SESSION_DAYS * 86400], ['DEL', 'auth:fail:' + ip]]);
    return withCookie(json({ signedIn: true }), cookie(token, SESSION_DAYS * 86400));
  } catch { return json({ error: 'Couldn’t sign in right now.' }, 503); }
};
