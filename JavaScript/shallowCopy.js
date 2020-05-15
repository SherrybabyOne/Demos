// 浅拷贝Shallow Copy
const shallowCopy = target => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let i in target) {
      if (Object.prototype.hasOwnProperty.call(target, i)) {
        cloneTarget[i] = target[i]
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
