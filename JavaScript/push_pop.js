// 模拟数组push、pop函数操作
Array.prototype.push = function(...items) {
  const len = this.length >>> 0;
  const argLen = items.length >>> 0;
  if (len + argLen > 2 ** 53 - 1) {
    throw new Error("The number of array is over the max value restricted!");
  }
  for (let i = 0; i < argLen; i++) {
    this[len + i] = items[i];
  }
  const newLen = len + argLen;
  this.length = newLen;
  return newLen;
}

Array.prototype.pop = function() {
  const len = this.length >>> 0;
  if (len === 0) {
    this.length = 0;
    return undefined;
  }
  const value = this[len - 1];
  delete this[len - 1];
  this.length = len - 1;
  return value;
}

const animals = ['pigs', 'goats', 'sheep'];
animals.push('aaaa');
console.log(animals)
console.log(animals.pop());
console.log(animals);
