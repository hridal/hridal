// Tiny client for the Upstash Redis database that Vercel's Storage tab connects.
// If no database is connected, `storeReady` is false and features fall back gracefully.
const env = (k: string) => (import.meta.env as any)[k] || process.env[k];
const URL_ = env('KV_REST_API_URL') || env('UPSTASH_REDIS_REST_URL');
const TOKEN = env('KV_REST_API_TOKEN') || env('UPSTASH_REDIS_REST_TOKEN');
export const storeReady = Boolean(URL_ && TOKEN);
export const adminPassword = env('ESSAY_ADMIN_PASSWORD') || '';

export async function redis(commands: (string | number)[][]): Promise<any[]> {
  const r = await fetch(`${URL_}/pipeline`, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify(commands) });
  if (!r.ok) throw new Error('store ' + r.status);
  return ((await r.json()) as { result: unknown }[]).map(x => x.result);
}

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

// Who is counting: each browser sends its own random visitor id, so people sharing one Wi-Fi
// (a library, halls) each count. A generous per-network hourly cap stops anyone scripting the counts.
export function voter(body: any, clientAddress?: string) {
  const vid = String(body?.vid || '');
  const ip = (clientAddress || 'unknown').replace(/[^0-9a-f:.]/gi, '');
  return { id: /^[a-z0-9]{12,32}$/.test(vid) ? 'v:' + vid : 'ip:' + ip, ip };
}
export async function overLimit(ip: string, max = 300) {
  const k = `rl:${ip}:${Math.floor(Date.now() / 3_600_000)}`;
  const [n] = await redis([['INCR', k], ['EXPIRE', k, 3600]]);
  return +n > max;
}
