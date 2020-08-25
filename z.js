const a = Object.create(null);

console.log(typeof a);

console.log(a instanceof Object);

console.log(Object.prototype.toString.call(a) === '[object Object]');
