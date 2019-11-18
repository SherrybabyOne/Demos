Array.prototype.reduce = function(callback, initialValue) {
  if(this == undefined) {
    throw new Error("Cannot read property 'map' of null or undefined")
  }
  if(Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new Error(callback + ' is not a function')
  }

  let O = Object(this);
  let len = O.length >>> 0;
  let k = 0;
  let accumulator = initialValue;
  if(accumulator === undefined) {
    for(; k < len; k++ ) {
      if(k in O) {
        accumulator = O[k];
        k++;
        break;
      }
    }
  }
  // 数组全空
  if(k === len && accumulator === undefined) {
    throw new Error('Each element of the array is empty')
  }
  for(;k < len; k++) {
    accumulator = callback.call(undefined, accumulator, O[k], k, O)
  }
  return accumulator;
}

const a = [1,2,3]
console.log(
  a.reduce((acc, cur) => acc + cur)
)