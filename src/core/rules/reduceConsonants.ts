export function reduceConsonants(base: string) {
  return (base || "").replace(/([xzq])\1+/g, "$1");//xzq가 여러개 반복되면 하나만, $1=글자 하나
}
