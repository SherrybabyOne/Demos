const Ajax = {
  get: function(url, fn) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          console.log(xhr.responseText);
          fn.call(xhr.responseText);
        }
      }
    }
    xhr.send();
  },
  post: function(url, data, fn) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          fn.call(xhr.responseText);
        }
      }
    }
    xhr.send(data);
  }
}


const getJSON = function(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.setRequestHeader('Accept', 'application/json');
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
