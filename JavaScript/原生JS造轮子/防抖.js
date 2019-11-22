// 简易版防抖
const debounce1 = (fn, wait = 500) => {
  let timer = null;
  return function() {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

// 一般完整的防抖会加入immediate选项
const debounce2 = (fn, wait = 500, immediate = true) => {
  let timer, context, args;

  // 延迟执行函数
  const later = () => setTimeout(() => {
    timer = null;
    if(!immediate) {
      fn.apply(context, args);
      context = args = null;
    }
  }, wait)

  return function(...params) {
    if(!timer) {
      timer = later();
      if(immediate) {
        fn.apply(this, params)
      }else {
        context = this;
        args = params;
      }
    }else {
      clearTimeout(timer);
      args = params;
      timer = later();
    }
  }
}