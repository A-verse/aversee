const memoryWindow = new Map<string, number[]>();

export function getRequestRateLimiter(
  identifier: string,
  maxRequestsPerMinute: number,
) {
  const now = Date.now();
  const windowMs = 60_000;
  const entry = memoryWindow.get(identifier) ?? [];
  const recent = entry.filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= maxRequestsPerMinute) {
    return { allowed: false } as const;
  }

  recent.push(now);
  memoryWindow.set(identifier, recent);
  return { allowed: true } as const;
}
