// 1. Symbol.toPrimitive
// 2. valueOf
// 3. toString
// 4. 报错
const a = {
  value: 1,
  valueOf() {
    return this.value++;
  }
}

console.log(
  (a == 1 && a == 2)
)