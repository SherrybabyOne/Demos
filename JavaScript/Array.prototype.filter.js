// 实现数组filter函数
Array.prototype.filter = function(callbackfn, thisArg) {
  if (this == undefined) throw new TypeError("Type Error");
  if (typeof callbackfn !== 'function') throw new TypeError("Type Error");
  const res = [];
  for (let i = 0, j = 0; i < len; i++) {
    if (callbackfn.call(thisArg, this[i], i, this)) {
      res[j] = this[i];
      j++
    }
  }
  return res;
}

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]

function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
console.log(filtered);