一、缓存
强缓存（不需要发送HTTP请求）
1. Expires （过期时间）存在于响应头中。
2. Cache-Control（存在与请求头和响应头中）
  - max-age
  - Public
  - private
  - no-cache
  - no-store
  - s-maxage

协商缓存（需要发送HTTP请求，在请求头中携带缓存tag，在服务器端决定是否使用缓存）
1. Last-Modified （浏览器第二次发送请求会在请求头中携带：If-Modified-Since）304：用户直接使用缓存
2. ETag 文件生成的唯一标识（浏览器第二次发送请求会在请求头中携带：If-None-Match）304：用户直接使用缓存

缓存地址：
1. Service Worker
2. Memory Cache
3. Disk Cache
4. Push Cache


二、浏览器本地存储
浏览器本地存储：
1. Cookie
2. WebStorage（localStorage、sessionStorage）
3. IndexDB


三、从输入URL到页面呈现发生了什么？
网络请求：
1. 构建请求行 GET / HTTP/1.1
2. 查找强缓存
3. DNS解析
4. TCP连接
5. 网络响应
  - 响应行：HTTP/1.1 200 OK
  - 响应头：Set-Cookie、Date、Server、Cache-Control、Connection、Content-Encoding

Content-Type: text/html
开始解析部分：
1. 构建DOM树
2. 样式计算
3. 生成布局树




