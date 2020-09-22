// 模拟实现bind函数
Function.prototype.bind = function(context, ...args) {
  if(typeof this !== 'function') {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  // 保存this的值
  var self = this;

  return function F() {
    // 考虑new的情况
    if(this instanceof F) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, [...args, ...arguments])
  }
}

const module2 = {
  x: 42,
  getX: function() {
    return this.x;
  }
};
const unboundGetX = module2.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined
const boundGetX = unboundGetX.bind(module2);
console.log(boundGetX());
// expected output: 42
