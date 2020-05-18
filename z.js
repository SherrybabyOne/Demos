process.nextTick(function() {
  console.log('a')
})

process.nextTick(function() {
  console.log('b')
})

setImmediate(function() {
  console.log('c')
  process.nextTick(function() {
    console.log('d')
  })
})

setImmediate(function() {
  console.log('e')
})

console.log('f')
