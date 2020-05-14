function Parent() {
  this.name = 'parent';
  this.play = [1, 2, 3, 4, 5];
}

function Children() {
  Parent.call(this);
  this.type = 'children';
}
Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor = Children;
// 继承父类的静态方法
Object.setPrototypeOf(Children, Parent);
