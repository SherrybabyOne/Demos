// 模拟实现Promise
// Promise利用三大手段解决回调地狱：
// 1. 回调函数延迟绑定
// 2. 返回值穿透
// 3. 错误冒泡

// 定义三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function MyPromise(exector) {
  this.status = PENDING;
  this.value = null;
  this.error = null;
  // 成功态回调队列
  this.onFulfilledCallbacks = [];
  // 失败态回调队列
  this.onRejectedCallbacks = [];

  const resolve = value => {
    if (this.status !== PENDING) return;
    setTimeout(() => {
      this.value = value;
      this.staus = FULFILLED;
      this.onFulfilledCallbacks.map(cb => {
        this.value = cb(this.value);
      })
    })
  }
  const reject = error => {
    if (this.status !== PENDING) return;
    setTimeout(() => {
      this.error = error;
      this.status = REJECTED;
      this.onRejectedCallbacks.map(cb => {
        this.error = cb(this.error);
      })
    })
  }
  exector(resolve, reject);
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (this.status === PENDING) {
    typeof onFulfilled === 'function' && this.onFulfilledCallbacks.push(onFulfilled);
    typeof onRejected === 'function' && this.onRejectedCallbacks.push(onRejected);
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value);
  } else {
    onRejected(this.error);
  }
  // 返回this支持then方法可以被同一个promise调用多次
  return this;
}
