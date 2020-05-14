// 模拟数组map方法
Array.prototype.map = function(callback, thisArg) {
  if (this == undefined) {
    throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new TypeError(callbackfn + 'is not a function');
  }
  const res = [];
  // 保证len为数字且是正整数
  const len = this.length >>> 0;
  for (let i = 0; i < len; i++) {
    if (i in this) {
      const kValue = this[i];
      const mappedValue = callback.call(thisArg, kValue, i, this);
      res[i] = mappedValue;
    }
  }
  return res;
}

const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
console.log(map1);

var map = Array.prototype.map
var a = map.call("Hello World", function(x) { 
  return x.charCodeAt(0); 
})
console.log(a);
