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
  const that = this;
  that.status = PENDING;
  that.value = null;
  that.error = null;
  // 成功态回调队列
  that.onFulfilledCallbacks = [];
  // 失败态回调队列
  that.onRejectedCallbacks = [];

  const resolve = value => {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (that.status === PENDING) {
        that.value = value;
        that.staus = FULFILLED;
        that.onFulfilledCallbacks.map(cb => {
          that.value = cb(that.value);
        })
      }
    }, 0)
  }
  const reject = error => {
    setTimeout(() => {
      if (that.status === PENDING) {
        that.error = error;
        that.status = REJECTED;
        that.onRejectedCallbacks.map(cb => {
          that.error = cb(that.error);
        })
      }
    }, 0)
  }
  exector(resolve, reject);
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };
  if (that.status === PENDING) {
    that.onFulfilledCallbacks.push(onFulfilled);
    that.onRejectedCallbacks.push(onRejected);
  } else if (that.status === FULFILLED) {
    onFulfilled(that.value);
  } else {
    onRejected(that.error);
  }
  // 返回this支持then方法可以被同一个promise调用多次
  return that;
}

MyPromise.resolve(4).then().then((value) => console.log(value))