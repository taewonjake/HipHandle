export const sample = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];//배열길이 반환
export const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);//랜덤 수에 -0.5
