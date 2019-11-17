function sum1(a, b) {
  const args = Array.prototype.slice.call(arguments)
  console.log(args.reduce((sum, cur) => sum + cur))
}
sum1(1, 2)

function sum2(a, b) {
  const args = Array.from(arguments)
  console.log(args.reduce((sum, cur) => sum + cur))
}
sum2(1, 2)

function sum3(a, b) {
  const args = [...arguments]
  console.log(args.reduce((sum, cur) => sum + cur))
}
sum3(1, 2)

function sum4(a, b) {
  const args = Array.prototype.concat.apply([], arguments)
  console.log(args.reduce((sum, cur) => sum + cur))
}
sum4(1, 2)