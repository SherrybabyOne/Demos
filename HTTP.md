## 一、HTTP报文结构
HTTP报文结构：
`起始行+头部+空行+实体`

起始行分为**请求行**和**响应行**。

请求行：
`GET /home HTTP/1.1`

响应行：
`HTTP/1.1 200 OK`

空行用来区分头部和实体

## 二、HTTP请求方法
- GET   获取资源
- POST  更新资源
- HEAD  获取资源的元信息
- DELETE  删除资源
- OPTIONS 列出可对资源实行的请求方法
- PUT   修改数据
- CONNECT 建立连接隧道，用于代理服务器
- TRACE 追踪请求

GET和POST的区别：
1. GET可被浏览器缓存，会留下历史记录
2. GET只能进行URL编码，只能接收ASCII字符，POST不受限制
3. GET传递数据一般被浏览器限制大小，POST没有限制
4. 从TCP看，GET会把请求报文一次性发出去，POST会分为两个TCP包，首先发header部分，如果服务器响应100，然后发送body部分。

## 三、URI
URI： 统一资源标识符，区分互联网上不同的资源

URI = URN + URL

组成部分：
1. scheme：协议名（http/https/file）://
2. user:passwd@： 登录主机时的用户信息，不安全，不常用
3. host:port： 主机和端口号
4. path： 路径
5. query： 查询参数
6. fragment： 锚点

URI编码：

ASCII（128个）之外的字符不支持，将所有非 ASCII 码字符和界定符转为**十六进制字节值**，然后在前面加个**%**

## 四、HTTP状态码
- 1xx： 目前处于协议的中间状态，还需要后续操作
- 2xx： 成功状态
- 3xx： 重定向，资源位置发生变动，需要重新请求
- 4xx： 请求报文有错误
- 5xx： 服务端发生错误


- 101： HTTP升级为WebSocket时，如果服务器同意变更，会发送101
- 200: 成功状态码，响应体中有数据
- 204: No Conent，响应体中没有数据
- 206: Partial Content，部分内容，HTTP分块下载和断点续传，响应头字段也会带上**Content-Range**
- 301: 永久重定向
- 302: 临时重定向
- 304: Not Modified，协商缓存命中
- 400: Bad Request，请求错误
- 403: Forbidden，请求被拒绝
- 404: 资源找不到
- 405: Method Not Allowed，请求方法不被允许
- 406: Not Acceptable，资源无法满足客户端条件
- 408: Request Timeout，超时，服务器等了太长时间
- 409: Conflict，多个请求发生了冲突
- 413: Request Entity Too Large，请求体的体积过大
- 414: Request-URL Too Large，请求行里的URL太大
- 429: Too Many Request，客户端发送的请求过多
- 431: Request Header Fields Too Large，请求头的字段内容过大
- 500: 服务器出错
- 501: 客户端的请求目前还不支持
- 502: 服务器本身正常，但访问的时候出错
- 503: 服务器忙，暂时无法响应

text
image
audio
application

Origin
Access-Control-Allow-Origin

