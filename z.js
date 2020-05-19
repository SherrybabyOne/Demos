class A {
  constructor() {
    this.a = 'a';
  }
  cal() {
    console.log(this.a);
  }
}

const test = new A();
console.log(Object.getPrototypeOf(test));
console.log(
  Object.getOwnPropertyDescriptor(Object.getPrototypeOf(test), 'cal'),
  Reflect.ownKeys(Object.getPrototypeOf(test))
)
// console.log(test.__proto__.constructor);
