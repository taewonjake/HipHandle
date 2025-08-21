export function reduceConsonants(base: string) {
  return (base || "").replace(/([xzq])\1+/g, "$1");
}
