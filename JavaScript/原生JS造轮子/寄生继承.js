function Parent() {
  this.name = 'parent'
  this.play = [1,2,3]
}
function Child() {
  Parent.call(this)
  this.type = 'child'
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const aihao = new Child()
console.log(
  aihao.__proto__ === Child.prototype
)
