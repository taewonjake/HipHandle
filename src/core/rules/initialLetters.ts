export function initialLetters(sentence: string) {
  const src = (sentence || "").toLowerCase().replace(/[^a-z0-9\s]/g, "");
  const parts = src.trim().split(/\s+/).filter(Boolean);
  const initials = parts.map(p => p[0]).join("");
  return initials || "";
}
