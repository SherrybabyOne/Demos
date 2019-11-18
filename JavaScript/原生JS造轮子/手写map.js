Array.prototype.map = function(callback, thisArg) {
  if(this == undefined) {
    throw new Error("Cannot read property 'map' of null or undefined")
  }
  if(Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new Error(callback + ' is not a function')
  }
  // 先转化为对象
  let O = Object(this);
  let T = thisArg;

  // 无符号右移0位，实际上是把前面的空位用0填充，保证len为数字且为整数
  let len = O.length >>> 0;
  let A = new Array(len);
  for(let k = 0; k < len; k++) {
    if(k in O) {
      let kValue = O[k];
      let mappedValue = callback.call(T, kValue, k, O);
      A[k] = mappedValue;
    }
  }
  return A;
}

const a = [1,2,3]

console.log(
  a.map((item) => item * 2)
)