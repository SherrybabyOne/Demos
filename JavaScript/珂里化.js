// 函数珂里化
// 珂里化是指把接受多个参数的函数变换成一个单一参数
function add() {
  const _args = [...arguments];
  function fn() {
    _args.push(...arguments);
    return fn;
  }
  fn.toString = function() {
    return _args.reduce((sum, cur) => sum + cur);
  }
  return fn;
}
console.log(add(1)(2, 3)(4).toString());

// 珂里化的应用：
const checkType = (type, content) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`;
}
console.log(checkType('Number', 2));

const curry = (type) => {
  return function(content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
  }
}
const isNumber = curry('Number');
console.log(isNumber(3));

