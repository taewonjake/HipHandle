const neighbors: Record<string, string[]> = {
  q:["w","a"], w:["q","e","s"], e:["w","r","d"], r:["e","t","f"], t:["r","y","g"], y:["t","u","h"],
  u:["y","i","j"], i:["u","o","k"], o:["i","p","l"], p:["o"],
  a:["q","s","z"], s:["a","d","w","x"], d:["s","f","e","c"], f:["d","g","r","v"], g:["f","h","t","b"],
  h:["g","j","y","n"], j:["h","k","u","m"], k:["j","l","i"], l:["k","o"],
  z:["a","x"], x:["z","c","s"], c:["x","v","d"], v:["c","b","f"], b:["v","n","g"], n:["b","m","h"], m:["n","j"]
};
export function keyboardMash(base: string) {
  const s = (base || "").toLowerCase();
  return s.replace(/[a-z]/g, ch => {
    const list = neighbors[ch];
    if (!list) return ch;
    return Math.random() < 0.3 ? list[Math.floor(Math.random()*list.length)] : ch;
  });
}
