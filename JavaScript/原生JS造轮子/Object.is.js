console.log(
  +0 === -0,
  NaN === NaN
)

function objectIs(x, y) {
  if(x === y) {
    return x!==0 || y!==0 || 1/x===1/y
  }else {
    return x!==x && y!==y
  }
}
console.log(
  objectIs(+0, -0),
  objectIs(NaN, NaN)
)