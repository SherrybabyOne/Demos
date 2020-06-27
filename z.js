function Animal() {

}

function Cat() {
  Animal.call(this);
}
// Cat.prototype = new Animal();
// Cat.prototype.constructor = Cat;
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

function once(fn) {
  let flag = true;
  return function() {
    if (flag) {
      fn.apply(null, arguments);
      flag = false;
    } else {
      return null;
    }
  }
}