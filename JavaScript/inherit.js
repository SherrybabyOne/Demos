// JS如何实现继承？

// 1. 借助call
function Parent1() {
  this.name = 'parent';
}

function Child1() {
  Parent1.call(this);
  this.type = 'children';
}
// 父类原型的方法无法继承

// 2. 借助原型链
function Parent2() {
  this.name = 'parent';
}
function Child2() {
  this.type = 'children';
}
Child2.prototype = new Parent2();
// 实例使用的是相同的原型对象

// 3. 将前两种组合
function Parent3() {
  this.name = 'parent';
}
function Child3() {
  Parent3.call(this);
  this.type = 'children';
}
Child3.prototype = new Parent3();
// 新增的问题：Parent3构造函数会多执行一次

// 4. 组合继承的优化1
function Parent4() {
  this.name = 'parent';
}
function Child4() {
  Parent4.call(this);
  this.type = 'children';
}
Child4.prototype = Parent4.prototype;
// 将父类原型对象直接给子类，父类构造函数只执行了一次，而且父类属性和方法均能访问
// 但是子类实例的构造函数却是Parent4: new Child4().__proto__.constructor === Parent4

// 5. 组合继承的优化2
// 也称寄生组合继承
function Parent5() {
  this.name = 'parent5';
}
function Child5() {
  Parent5.call(this);
  this.type = 'children';
}
Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;

