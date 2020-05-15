// 模拟new
function newOperator(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw new TypeError('newOperator function the first param must be a function');
  }
  const obj = Object.create(ctor.prototype);
  const res = ctor.apply(obj, args);

  const isObject = typeof res === 'object' && res !== null;
  const isFunction = typeof res === 'function';
  return isObject || isFunction ? res : obj;
}
