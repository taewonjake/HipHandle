const map: Record<string, string> = { a:"4", e:"3", i:"1", o:"0", s:"5", t:"7", b:"8", g:"9" };
export function leet(base: string) {
  return (base || "").replace(/[aeiostbg]/g, ch => map[ch] ?? ch);
}
