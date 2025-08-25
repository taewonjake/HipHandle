const neighbors: Record<string, string[]> = {
  q:["w","a"], w:["q","e","s"], e:["w","r","d"], r:["e","t","f"], t:["r","y","g"], y:["t","u","h"],
  u:["y","i","j"], i:["u","o","k"], o:["i","p","l"], p:["o"],
  a:["q","s","z"], s:["a","d","w","x"], d:["s","f","e","c"], f:["d","g","r","v"], g:["f","h","t","b"],
  h:["g","j","y","n"], j:["h","k","u","m"], k:["j","l","i"], l:["k","o"],
  z:["a","x"], x:["z","c","s"], c:["x","v","d"], v:["c","b","f"], b:["v","n","g"], n:["b","m","h"], m:["n","j"] //키보드 근처 버튼들
};
export function keyboardMash(base: string) {//오타처럼 보이게 만들어주는 함수
  const s = (base || "").toLowerCase();
  return s.replace(/[a-z]/g, ch => {//글자를 하나씩 바꿔줌
    const list = neighbors[ch];
    if (!list) return ch;
    return Math.random() < 0.3 ? list[Math.floor(Math.random()*list.length)] : ch; //0.3퍼센트로 오타가 발생하면 list에서 랜덤하게 하나 고르기
  });
}
