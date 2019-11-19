// bind函数所做的事情：
// 1. 对于普通函数，绑定this指向
// 2. 对于构造函数，要保证原函数的原型对象上的属性不能丢失
Function.prototype.bind = function(context, ...args) {
  if(typeof this !== 'function') {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  // 保存this的值
  var self = this;
  var fNOP = function() {};

  
}

function test() {

}
test.bind({a: 1})