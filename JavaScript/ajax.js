const Ajax = {
  get: function(url, fn) {
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp');
    // 第三个参数表示是否异步，默认true
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      // XMLHttpRequest.readyState属性返回一个 XMLHttpRequest代理当前所处的状态。
      // 0: 代理被创建，但未调用open()方法
      // 1: open()方法已被调用
      // 2: send()方法已被调用，且头部和状态已经可以获得
      // 3: 下载中。responseText属性已经包括部分数据
      // 4: 下载操作完成
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          fn(xhr.responseText);
        }
      }
    }
    xhr.send();
  },
  post: function(url, data, fn) {
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp');
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          fn(xhr.responseText);
        }
      }
    }
    // 接受一个可选参数，作为请求主体。如果请求方法是GET/HEAD，应设置为null
    xhr.send(data);
  }
}


const getJSON = function(url) {
  return new Promise((resolve, reject) => {
    // 兼容IE低版本
    const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp');
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // 监听readyState
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    }
    xhr.send();
  })
}
