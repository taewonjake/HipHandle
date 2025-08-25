export function birthdayInsert(base: string, birthday?: string) {
  const b = (birthday || "").replace(/[^0-9]/g, ""); // e.g. 19990502 -> "19990502"
  if (!base) return b;//입력 시 문자열로 반환
  if (!b) return base; //입력 없으면 기본값
  const mid = Math.max(1, Math.min(base.length-1, Math.floor(base.length/2)));//mid의 위치는 최소 1, 최대 base.length - 1 사이의 값
  return base.slice(0, mid) + (Number(b)%100).toString() + base.slice(mid); //base의 앞부분 + (b의 끝 두 자리) + base의 뒷부분
}
