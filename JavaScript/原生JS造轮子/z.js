let str = '[object Object]'
const match1 = /\[/g;
const match2 = /\]/g;

const a = str.replace(match1, '')
const b = a.replace(match2, '')

console.log(
  b.split(' ')[1]
)

console.log(
  [] == ![],
  Boolean('')
)

function Person(name) {
  this.name = name
}
const aihao = new Person('aihao')
console.log(
  Person.prototype === aihao.__proto__
)

function Student(job) {
  this.job = job
}

Student.prototype = Object.create(Person.prototype)

const aihao2 = new Student('frontend')
console.log(
  aihao,
  Student.prototype.__proto__ === Person.prototype
)