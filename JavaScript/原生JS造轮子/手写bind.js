// bind函数所做的事情：
// 1. 对于普通函数，绑定this指向
// 2. 对于构造函数，要保证原函数的原型对象上的属性不能丢失
// 要考虑到new的调用，并且new的优先级比bind高
Function.prototype.bind = function(context, ...args) {
  if(typeof this !== 'function') {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  // 保存this的值
  var self = this;

  return function F() {
    if(this instanceof F) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, args.concat(arguments))
  }
  // var fBound = function() {
  //   self.apply(
  //     this instanceof self ? this : context,
  //     args.concat(Array.prototype.slice.call(arguments))
  //   )
  // }

  // fBound.prototype = Object.create(self.prototype)
  // return fBound;
}

function test() {
  console.log(this.name)
}
const a = test.bind({name: 'aihao'})
a()