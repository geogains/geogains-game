// src/lib/data/daily.ts
export function getDailyIndex(total: number, tzOffsetMinutes = 0) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const shifted = utc + tzOffsetMinutes * 60000; // change if you want day to roll over in a specific TZ
  const days = Math.floor(shifted / 86400000);
  const idx = ((days % total) + total) % total;
  return idx;
}

export function getTodayKey(tzOffsetMinutes = 0) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000 + tzOffsetMinutes * 60000;
  const d = new Date(utc);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const da = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}
