const newOperatoe = (ctor, ...args) => {
  if(typeof ctor !== 'function') {
    throw new Error("newOperater function the first param be a function")
  }
  const obj = Object.create(ctor.prototype);
  const res = ctor.apply(obj, args);
  const isObject = typeof res === 'object' && res !== null;
  const isFunction = typeof res === 'function';
  return isObject || isFunction ? res : obj;l
}

function Person(name) {
  this.name = name;
  this.job = 'frontend';
}
const aihao = new Person('aihao');
console.log(aihao)