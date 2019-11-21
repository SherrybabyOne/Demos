// 防抖
const debunce = (fn) => {
  let timeout = null;
  return function() {
    clearTimeout(timeout);
    setTimeout(() => {
      fn.apply(this, arguments)
    }, 500)
  }
}

// 节流
const throttle = (fn) => {
  let canRun = true;
  return function() {
    if(!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, 500)
  }
}