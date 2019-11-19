Function.prototype.call = function(context, ...args) {
  // 设置默认值
  context = context || window;
  args = args ? args : [];

  const key = Symbol()
  context[key] = this;
  // 通过隐式绑定this
  const res = context[key](...args);
  delete context[key];
  return res;
}

const a = function() {
  console.log(this.name)
}
a.call({name: 'aihao'})