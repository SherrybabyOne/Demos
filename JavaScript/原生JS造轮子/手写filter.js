Array.prototype.filter = function(callback, thisArg) {
  if(this == null) {
    throw new Error("Cannot read property 'filter' of null or undefined")
  }
  if(Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new Error(callback + ' is not a function')
  }
  let O = Object(this);
  let len = O.length >>> 0;
  let res = [];
  let resLen = 0;
  for(let i = 0; i < len; i++) {
    if(callback.call(thisArg, O[i], i, O)) {
      res[resLen++] = O[i]
    }
  }
  return res;
}

console.log(
  [12, 5, 8, 130, 44].filter((item) => item > 10)
)