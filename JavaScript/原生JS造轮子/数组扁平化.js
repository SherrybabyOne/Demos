let ary = [1, [2, [3, 4, [5, 6, 7]]]]
let str = JSON.stringify(ary)

console.log(
  ary.flat(Infinity)
)

console.log(
  str.replace(/\[|\]/g, '').split(',')
)

console.log(
  JSON.parse('[' + str.replace(/\[|\]/g, '') + ']')
)

// 递归
const res = []
const fn = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      fn(arr[i])
    }else {
      res.push(arr[i])
    }
  }
}
fn(ary)
console.log(res)

const flatten = (ary) => {
  return ary.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
console.log(
  flatten(ary)
)


console.log(ary)