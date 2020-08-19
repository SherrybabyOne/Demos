// 模拟数组reduce方法
Array.prototype.reduce = function(callbackfn, initialValue) {
  if (this == undefined) {
    throw new TypeError("Cannot read property 'reduce' of null or undefined");
  }
  if (Object.prototype.toString.call(callbackfn) !== '[object Function]') {
    throw new TypeError(callbackfn + ' is not a function');
  }
  const len = this.length >>> 0;
  let accumulator = initialValue;
  let k = 0;
  if (accumulator === undefined) {
    for(; k < len; k++) {
      if (k in this) {
        accumulator = this[k];
        k++;
        break;
      }
    }
  }
  // 数组为空
  if (k === len && accumulator === undefined) {
    throw new Error('Each element of the array is empty');
  }
  for(; k < len; k++) {
    if (k in this) {
      accumulator = callbackfn.call(undefined, accumulator, this[k], k, this);
    }
  }
  return accumulator;
}

const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10
// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15

var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.x;
},initialValue)

console.log(sum) // logs 6