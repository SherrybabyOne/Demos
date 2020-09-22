// 模拟call、apply函数
Function.prototype.call = function(context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  const fn = Symbol('fn');
  context[fn] = this;

  const res = this[fn](...args);
  delete this.fn;
  return res;
}

Function.prototype.apply = function(context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  const fn = Symbol('fn');
  context[fn] = this;

  const res = context[fn](...args);
  delete context[fn];
  return res;
}