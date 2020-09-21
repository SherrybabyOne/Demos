function sum(a, b) {
  const temp = Array.prototype.concat.apply([], arguments);
  return temp.reduce((pre, cur) => pre + cur);
}

console.log(sum(1, 2));