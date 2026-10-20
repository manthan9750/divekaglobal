// Tiny in-memory rate limiter. Best effort for Vercel serverless.
interface RateLimitData {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitData>();

export function checkRateLimit(ip: string, limit: number = 8, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = store.get(ip);

  if (!record) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return true; // Allowed
  }

  if (now > record.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return true; // Allowed
  }

  if (record.count >= limit) {
    return false; // Rate limited
  }

  record.count += 1;
  return true; // Allowed
}