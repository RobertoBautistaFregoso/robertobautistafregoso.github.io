// Unit test for the rate limiter. Run: node api/_rate-limit.test.mjs
// (No test framework — the gatekeeper package is dependency-free on purpose.)

import { createState, rateCheck } from "./_rate-limit.mjs";

const limits = { ipPerMin: 3, ipPerDay: 5, globalPerDay: 8 };
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? pass++ : (fail++, console.error("FAIL:", name)); };

// per-IP per-minute: first 3 allowed, 4th denied with scope "rate"
{
  const s = createState(), now = 1_000_000;
  const r = [1, 2, 3, 4].map(() => rateCheck(s, "1.1.1.1", now, limits));
  check("min: first 3 allowed", r[0].allowed && r[1].allowed && r[2].allowed);
  check("min: 4th denied, scope=rate", !r[3].allowed && r[3].scope === "rate");
  check("min: retryAfter in (0,60]", r[3].retryAfterSecs > 0 && r[3].retryAfterSecs <= 60);
}

// window reset: minute window clears after 60s
{
  const s = createState(), t0 = 1_000_000;
  for (let i = 0; i < 3; i++) rateCheck(s, "2.2.2.2", t0, limits);
  check("min: blocked before reset", !rateCheck(s, "2.2.2.2", t0, limits).allowed);
  check("min: allowed after 61s", rateCheck(s, "2.2.2.2", t0 + 61_000, limits).allowed);
}

// per-IP isolation: one IP's limit doesn't affect another
{
  const s = createState(), now = 5_000_000;
  for (let i = 0; i < 3; i++) rateCheck(s, "a", now, limits);
  check("isolation: A blocked", !rateCheck(s, "a", now, limits).allowed);
  check("isolation: B allowed", rateCheck(s, "b", now, limits).allowed);
}

// global daily cap holds across many IPs; exactly globalPerDay allowed
{
  const s = createState(), now = 9_000_000;
  let allowed = 0;
  for (let i = 0; i < 12; i++) if (rateCheck(s, "ip" + i, now, limits).allowed) allowed++;
  check("global: exactly globalPerDay allowed", allowed === 8);
  const g = rateCheck(s, "ipX", now, limits);
  check("global: over-cap denied, scope=global", !g.allowed && g.scope === "global");
}

// two-phase: a request denied by one window must not increment the others
{
  const s = createState(), now = 11_000_000;
  for (let i = 0; i < 3; i++) rateCheck(s, "z", now, limits); // exhaust minute (3)
  rateCheck(s, "z", now, limits);                            // denied by minute
  check("two-phase: denied req didn't inflate day count", s.hits.get("day:z").count === 3);
}

console.log(`rate-limit: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
