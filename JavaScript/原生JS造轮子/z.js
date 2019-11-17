let str = '[object Object]'
const match1 = /\[/g;
const match2 = /\]/g;

const a = str.replace(match1, '')
const b = a.replace(match2, '')

console.log(
  b.split(' ')[1]
)