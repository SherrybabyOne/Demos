Function.prototype.apply = function(context, args) {
  // 没有传递context默认值为window
  context = context || window;
  args = args ? args : [];
  // 给context设置一个独一无二的值
  const key = Symbol();
  context[key] = this;
  // 通过隐式绑定的方式调用函数
  const res = context[key](...args);
  // 删除添加的属性
  delete context[key];
  // 返回函数调用的值
  return res;
}

const a = function() {
  console.log(this.name)
}
a.apply({name: 'aihao'})