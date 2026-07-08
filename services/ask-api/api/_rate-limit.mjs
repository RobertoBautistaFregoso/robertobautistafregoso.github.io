// Best-effort in-memory rate limiter for the ask gatekeeper (#38).
//
// State lives per serverless instance, so it is NOT globally exact — a
// distributed or cold-start-spread flood can slip past. That's acceptable
// because the HARD spend ceiling is the OpenAI monthly budget cap
// (provider-enforced; see ../README.md). This layer's job is to reject the
// common single-client flood fast, before any upstream LLM call.
//
// Underscore-prefixed so Vercel treats it as a helper, not a route.

const MINUTE = 60_000;
const DAY = 86_400_000;

export function createState() {
  return { hits: new Map() };
}

// Pure given (state, ip, now, limits). Two-phase so a rejected request does not
// consume budget in the other windows: first check if any window is already at
// its cap; only if all are clear do we increment them.
// Returns { allowed, retryAfterSecs?, scope? }  (scope: "rate" | "daily" | "global").
export function rateCheck(state, ip, now, limits) {
  const windows = [
    { key: "global", max: limits.globalPerDay, windowMs: DAY, scope: "global" },
    { key: `min:${ip}`, max: limits.ipPerMin, windowMs: MINUTE, scope: "rate" },
    { key: `day:${ip}`, max: limits.ipPerDay, windowMs: DAY, scope: "daily" },
  ];

  for (const w of windows) {
    const b = state.hits.get(w.key);
    if (b && now < b.resetAt && b.count >= w.max) {
      return { allowed: false, retryAfterSecs: Math.ceil((b.resetAt - now) / 1000), scope: w.scope };
    }
  }

  for (const w of windows) {
    const b = state.hits.get(w.key);
    if (!b || now >= b.resetAt) state.hits.set(w.key, { count: 1, resetAt: now + w.windowMs });
    else b.count += 1;
  }

  // Opportunistic prune so a long-lived instance's map can't grow unbounded.
  if (state.hits.size > 5000) {
    for (const [k, b] of state.hits) if (now >= b.resetAt) state.hits.delete(k);
  }

  return { allowed: true };
}
