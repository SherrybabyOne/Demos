Array.prototype.push = function(...items) {
  let O = Object(this);
  let len = O.length >>> 0;
  let argCount = items.length >>> 0;
  if(len + argCount > 2 ** 53 - 1) {
    throw new Error('The number of array is over the max value restricted!')
  }
  for(let i = 0; i < argCount; i++) {
    O[len + i] = items[i]
  }
  let newLength = len + argCount;
  O.length = newLength;
  return newLength;
}

const a = [1,2,3,4,5]
console.log(
  a.push(6),
  a
)