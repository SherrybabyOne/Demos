// 模拟数组map方法
Array.prototype.map = function(callbackFn, thisArg) {
  if (this == undefined) throw new TypeError('Type Error');
  if (typeof callbackFn !== 'function') throw new TypeError('Type Error');
  const res = [];
  for (let i = 0; i < len; i++) {
    if (i in this) {
      const val = this[i];
      res[i] = callbackFn.call(thisArg, val, i, this);
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
