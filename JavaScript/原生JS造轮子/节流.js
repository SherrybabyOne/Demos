// 简易版节流
const throttle1 = (fn, wait = 500) => {
  let canRun = true;
  return function() {
    if(!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, wait)
  }
}