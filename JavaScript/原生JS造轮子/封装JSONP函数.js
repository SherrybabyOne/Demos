function jsonp(url, jsonpCallback, success) {
  let script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.type = 'text/javascript';
  window[jsonpCallback] = function(data) {
    success && success(data);
  }
  document.appendChild(script)
}

jsonp(
  'http://api?params=1',
  'callback',
  function(data) {
    console.log(data)
  }
)