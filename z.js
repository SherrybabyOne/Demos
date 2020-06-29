const deepCopy = (target, hash = new WeakMap()) => {
  if (typeof target !== 'object' || target === null) {
    return obj;
  }

  if (hash.has(ob)) return hash.get(target);
  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.set(target, cloneTarget);

  for (const i in target) {
    if (Object.prototype.hasOwnProperty.call(target, i)) {
      if (typeof target[i] === 'object' && target[i] !== null) {
        cloneTarget[i] = deepCopy(target[i]);
      } else {
        cloneTarget[i] = target[i];
      }
    }
  }

  return cloneTarget;
}

requestAnimationFrame(function() {
  console.log('aaa')
})