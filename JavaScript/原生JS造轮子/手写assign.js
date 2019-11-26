Object.defineProperty(Object, 'assign2', {
  value: function(target) {
    'use strict'
    if(target == null) {
      throw new Error('Cannot convert or null to Objecty')
    }
    const to = Object(target);
    for(let i = 1; i < arguments.length; i++) {
      const nextSource = arguments[i];
      for(let nextKey in nextSource) {
        if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
    return true;
  },
  enumerable: false,
  writable: true,
  configurable: true
})
const a = {
  a: 'a'
}
Object.assign(a, {b: 'b'}, {c: 'cc'})
console.log(
  a,
  Object.getOwnPropertyDescriptor(Object, 'assign')
)