## 一、HTTP报文结构
HTTP报文结构：
`起始行+头部+空行+实体`

起始行分为**请求行**和**响应行**。

### 请求行：
`GET /home HTTP/1.1`

### 响应行：
`HTTP/1.1 200 OK`

### 头部
1. 字段名不区分大小写
2. 不允许出现空格
3. 字段名后面必须紧跟着`：`

空行用来区分头部和实体

## 二、HTTP请求方法
- GET   获取资源
- POST  更新资源
- HEAD  获取资源的元信息，用于获取报头
- PUT   修改数据
- OPTIONS 列出可对资源实行的请求方法
- DELETE  删除资源
- CONNECT 建立连接隧道，用于代理服务器
- TRACE 追踪请求

GET和POST的区别：
1. GET可被浏览器缓存，会留下历史记录
2. GET只能进行URL编码，只能接收ASCII字符，POST不受限制
3. GET传递数据大小一般被浏览器限制大小，POST没有限制
4. 从TCP看，GET会把请求报文一次性发出去，POST会分为两个TCP包，首先发header部分，如果服务器响应100，然后发送body部分。

## 三、URI
URI： 统一资源标识符，区分互联网上不同的资源

URI = URN + URL

组成部分：
1. scheme：协议名（http/https/file）+ `://`
2. user:passwd@： 登录主机时的用户信息，不安全，不常用
3. host:port： 主机和端口号
4. path： 路径
5. query： 查询参数
6. fragment： 锚点

URI编码：

ASCII（128个）之外的字符不支持，将所有非 ASCII 码字符和界定符转为**十六进制字节值**，然后在前面加个`%`

## 四、HTTP状态码
- 1xx： 目前处于协议的中间状态，还需要后续操作
- 2xx： 成功状态
- 3xx： 重定向，资源位置发生变动，需要重新请求
- 4xx： 请求报文有错误
- 5xx： 服务端发生错误

常见相关状态码：
- 100: 继续。客户端应当继续发送请求。
- 101: `HTTP`升级为`WebSocket`时，如果服务器同意变更，会发送101
- 200: 成功状态码，响应体中有数据
- 204: `No Conent`，响应体中没有数据
- 206: `Partial Content`，部分内容，HTTP分块下载和断点续传，响应头字段也会带上**Content-Range**
- 301: 永久重定向。浏览器默认会做缓存优化，第二次访问的时候自动访问那个重定向的新地址。
- 302: 临时重定向。浏览器不会做缓存优化。
- 304: `Not Modified`，**协商缓存**命中
- 400: `Bad Request`，请求错误
- 401: `unauthorized`，未鉴权，发送的请求需要有通过HTTP认证的认证信息
- 403: `Forbidden`，请求被拒绝，服务器禁止访问
- 404: 资源找不到
- 405: `Method Not Allowed`，请求方法不被允许
- 406: `Not Acceptable`，资源无法满足客户端条件
- 413: `Request Entity Too Large`，请求体的体积过大
- 414: `Request-URL Too Large`，请求行里的URL太大
- 429: `Too Many Request`，客户端发送的请求过多
- 431: `Request Header Fields Too Large`，请求头的字段内容过大
- 500: 服务器出错
- 501: 客户端的请求目前还不支持
- 502: 服务器本身正常，但访问的时候出错
- 503: 服务器忙，暂时无法响应

## 五、HTTP特点
HTTP特点：
1. 灵活可扩展。语义上的自由，传输形式多样式。
2. 可靠传输。基于TCP
3. 请求-应答。一发一收，有来有回。
4. 无状态。状态是指通信过程的上下文信息，每次http请求都是独立的、无关的。

HTTP缺点：
- 明文传输。报文（主要指头部）不是用二进制，而是文本，容易被截取
- 队头阻塞问题。HTTP开启长连接时，**共用一个TCP**，同一时刻只能处理一个请求，当前请求耗时过长的情况下，其它请求只能处于阻塞状态，这就是**队头阻塞**问题。

## 六、Accept字段
Accept分为四个部分：
- **数据格式**
- **压缩方式**
- **支持语言**
- **字符集**

### 数据格式
字段为**Accept**和**Content-Type**

数据格式主要有四大类：
- text： text/html、text/plain、text/css...
- image： image/gif、image/jpeg、image/png...
- audio/vedio： audio/mpeg、vedio/mp4...
- application： application/json、application/javascript、application/pdf...

### 压缩方式
字段为**Accept-Encoding**和**Content-Encoding**

- gzip
- deflate
- br  //一种专门为 HTTP 发明的压缩算法

### 支持语言
**Accept-Language**和**Content-Language**

### 字符集
**Accept-Charset**,接收端放在了**Content-Type**中
```
// 发送端
Content-Type: text/html; charset=utf-8
// 接收端
Accept-Charset: charset=utf-8
```

## 七、定长、不定长数据
### 定长
发送端**Content-Length**，用来指明包的长度

### 不定长
头部字段：
```
Transfer-Encoding: chunked
```
表示分块传输。

- Content-Length会被忽略
- 基于长连接持续推送动态内容

`Connection: keep-alive`，TCP一直会保持连接。

## 八、HTTP大文件的传输
采取**范围请求**的解决大文件传输

### 服务端支持
首先，服务器需要支持**范围请求**，必须加上响应头：
```
Accept-Ranges: bytes  //支持范围请求
Accept-Ranges: none   //不支持范围请求
```

### 客户端
对于客户端，需要指定请求哪一部分，通过**Range**字段确定请求范围，格式为**bytes=x-y**。

服务器收到请求之后。首先验证范围是否合法，如果越界则返回**416**，否则读取相应片段并返回**206**。

同时，服务器响应需要添加**Content-Range**字段。

具体分为单段请求和多段请求：
```
// 单段数据
Range: bytes=0-9
// 多段数据
Range: bytes=0-9, 30-39
```

### 单段请求
对于单段请求，返回响应：
```
HTTP/1.1 206 Partial Content
Content-Length: 10
Accept-Ranges: bytes
Content-Range: bytes 0-9/100

i am xxxxx
```
**Content-Range**指定请求的大小和资源总大小

### 多段请求
多段请求的响应：
```
HTTP/1.1 206 Partial Content
Content-Type: multipart/byteranges; boundary=00000010101
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes


--00000010101
Content-Type: text/plain
Content-Range: bytes 0-9/96

i am xxxxx
--00000010101
Content-Type: text/plain
Content-Range: bytes 20-29/96

eex jspy e
--00000010101--
```
`Content-Type: multipart/byteranges;boundary=00000010101` 表示：
1. 请求一定是多段请求
2. 响应体中的分隔符是 00000010101

在响应体中各段数据之间会由这里指定的**分隔符**分开，而且在最后的分隔末尾添上--表示结束。


## 九、HTTP处理表单数据的提交
两种**Content-Type**值：
- application/x-www-form-urlencoded
- multipart/form-data

### application/x-www-form-urlencoded
1. 数据会被编码成以`&`分隔的键值对
2. 字符串以**URL**编码方式编码
```
// 转换过程: {a: 1, b: 2} -> a=1&b=2 -> 如下(最终形式)
"a%3D1%26b%3D2"
```

### multipart/form-data
- 请求头中的**Content-Type**字段会包含**boundary**，且boundary的值有浏览器默认指定。例: `Content-Type: multipart/form-data;boundary=----WebkitFormBoundaryRRJKeWfHPGrS4LKe`
- 数据会分为多个部分，每两个部分之间通过分隔符来分隔，每部分表述均有 HTTP 头部描述子包体，如Content-Type，在最后的分隔符会加上--表示结束。

请求体：
```
Content-Disposition: form-data;name="data1";
Content-Type: text/plain
data1
----WebkitFormBoundaryRRJKeWfHPGrS4LKe
Content-Disposition: form-data;name="data2";
Content-Type: text/plain
data2
----WebkitFormBoundaryRRJKeWfHPGrS4LKe--
```

### 小结
`multipart/form-data`格式最大的特点在于:**每一个表单元素都是独立的资源表述**。

另外，你可能在写业务的过程中，并没有注意到其中还有boundary的存在，如果你打开抓包工具，确实可以看到不同的表单元素被拆分开了，之所以在平时感觉不到，是以为浏览器和 HTTP 给你封装了这一系列操作。

而且，在实际的场景中，对于图片等文件的上传，基本采用`multipart/form-data`而不用`application/x-www-form-urlencoded`，因为没有必要做 URL 编码，带来巨大耗时的同时也占用了更多的空间。


## 十、HTTP队头阻塞问题
HTTP报文是一发一收，任务被放置在任务队列中执行，一旦队首的请求处理太慢，就会阻塞到后面请求的处理，这就是**HTTP队头阻塞**。

### 并发连接
一个域名允许分配多个长连接，那么相当于增加了任务队列，不至于一个队列的任务阻塞其它所有任务。在RFC2616规定过客户端最多并发 2 个连接，不过事实上在现在的浏览器标准中，这个上限要多很多，Chrome 中是 6 个。

### 域名分卡
一个域名不是可以并发 6 个长连接吗？那我就多分几个域名。

比如`content1.xxx.com`、`content2.xxx.com`

这样`xxx.com`下面可以分出非常多的二级域名，而它们指向统一服务器，能够并发的长连接增多了。

## 十一、Cookie
HTTP是无状态协议，引入Cookie保存一些状态。
```
// 请求头
Cookie: a=xxx;b=xxx
// 响应头
Set-Cookie: a=xxx
set-Cookie: b=xxx
```

### Cookie生命周期
- Expires   //过期时间
- Max-Age   //生效时长，从浏览器收到报文开始计算

### 作用域
**Domain**和**Path**，绑定域名和路径。

### 安全相关
- HttpOnly  //设置只能通过HTTP协议传输获取，不能通过JS访问
- SameSite  //Strict、Lax、None

### Cookie缺点
1. 容量太小
2. 性能缺陷
3. 安全缺陷

## 十二、HTTP代理
在客户端和服务器之间充当中间人的身份。对于客户端是接收方，对于源服务器是发送方。

功能：
1. **负载均衡**。保障各台源服务器负载平均。
2. **保障安全**。利用心跳机制监控后台的服务器，一旦发现故障机就将其踢出集群。并且对于上下行的数据进行过滤，对非法 IP 限流，这些都是代理服务器的工作。
3. **缓存代理**。

### 相关头部字段
- Via： 记录经过的代理服务器，顺序即为在 HTTP 传输中报文传达的顺序。
- X-Forwarded-For： 请求方的IP地址
- X-Real-IP： 记录最初的客户端的IP

## 十三、代理缓存

### 为什么产生代理缓存？
源服务器也有缓存，比如Redis, Memcache，但对于 HTTP 缓存来说，如果每次客户端缓存失效都要到源服务器获取，那给源服务器的压力是很大的。

因此引入了代理缓存，让**代理服务器**接管一部分服务器的HTTP缓存。

客户端缓存过期后就近到代理缓存中获取，代理缓存过期了才请求源服务器

代理缓存的控制分为两部分：一是**源服务器端**的控制，二是**客户端**的控制。

### 源服务器端的缓存控制
- **public、private**   // 响应头中**Cache-Control**加入，private或public表示是否允许代理服务器缓存。
- proxy-revalidate  //`must-revalidate`的意思是客户端缓存过期就去源服务器获取，而p`roxy-revalidate`则表示代理服务器的缓存过期后到源服务器获取。
- s-maxage  //限制了缓存在代理服务器中可以存放多久

### 客户端的缓存控制
- max-stale //对缓存进行宽容操作。`max-stale: 5`：只要过期时间在5秒之内，还是可以从代理中获取的。
- min-fresh //对缓存进行限制操作。`min-fresh: 5`：不要等到缓存刚好到期再拿，一定要在到期前 5 秒之前的时间拿，否则拿不到。
- only-if-cached  //表示客户端只接受代理缓存，不接受源服务器的缓存。如果代理缓存无效，直接返回**504（Gateway Timeout）**

## 十四、跨域
同源协议：**协议、主机、端口**都相同为同源。

### 什么是跨域
非同源即跨域有一定限制：
- 不能读取和修改DOM
- 不能访问Cookie、LocalStorage、SessionStorage、IndexDB...
- 限制XMLHttpRequest

跨域请求的响应一般会被**浏览器**所拦截，注意，是被浏览器拦截，响应其实是成功到达客户端了。

首先，浏览器是多进程的：
![](https://user-gold-cdn.xitu.io/2020/3/22/170ffd8131a4628f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
![](https://user-gold-cdn.xitu.io/2020/3/22/170ffd83a20647db?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
**WebKit 渲染引擎**和**V8 引擎**都在渲染进程当中。

当`xhr.send`被调用，即` Ajax `请求准备发送的时候，其实还只是在**渲染进程**的处理。为了防止黑客通过脚本触碰到系统资源，浏览器将每一个渲染进程装进了沙箱，并给每一个不同的站点（一级域名不同）分配了沙箱，互不干扰。

在沙箱当中的渲染进程是没有办法发送网络请求的，只能通过网络进程来发送。就涉及到进程间通信（IPC）。

现在数据传递给了浏览器主进程，主进程接收到后，才真正地发出相应的网络请求。在服务端处理完数据后，将响应返回，主进程检查到跨域，且没有**cors**(后面会详细说)响应头，将响应体全部丢掉，并不会发送给渲染进程。这就达到了拦截数据的目的。

### CORS
跨站资源共享，需要浏览器和服务器的共同支持。

分为**简单请求**和**非简单请求**

### 简单请求
以下条件属于简单请求：
- 请求方法为 GET、POST 或者 HEAD
- 请求头的取值范围: Accept、Accept-Language、Content-Language、Content-Type(只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain)

属于简单请求，自动在请求头中加入**Origin**，说明来自哪个源。

服务器拿到请求之后，在回应时对应地添加**Access-Control-Allow-Origin**字段，如果`Origin`不在这个字段的范围中，那么浏览器就会将响应拦截。

**Access-Control-Allow-Credentials**：这个字段是一个布尔值，表示是否允许发送 Cookie，对于跨域请求，浏览器对这个字段默认值设为 false，而如果需要拿到浏览器的 Cookie，需要添加这个响应头并设为true, 并且在前端也需要设置withCredentials属性:
```
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

### 非简单请求
非简单请求有两个不同：**预检请求**和**响应字段**

以PUT方法为例：
```
var url = 'http://xxx.com';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'xxx');
xhr.send();
```
代码执行后，首先会执行预检请求：
```
OPTIONS / HTTP/1.1
Origin: 当前地址
Host: xxx.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
```
预检请求的方法是**OPTIONS**，同时会加上`Origin`源地址和`Host`目标地址，这很简单。同时也会加上两个关键的字段:
- Access-Control-Request-Method, 列出 CORS 请求用到哪个HTTP方法
- Access-Control-Request-Headers，指定 CORS 请求将要加上什么请求头

接下来是响应字段，分为两部分：
- 一部分是对于预检请求的响应
- 一部分是对于 CORS 请求的响应。

预检请求的响应。如下面的格式:
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
```
- Access-Control-Allow-Origin: 表示可以允许请求的源，可以填具体的源名，也可以填*表示允许任意源请求。
- Access-Control-Allow-Methods: 表示允许的请求方法列表。
- Access-Control-Allow-Credentials: 这个字段是一个布尔值，表示是否允许发送 Cookie，对于跨域请求，浏览器对这个字段默认值设为 false。
- Access-Control-Allow-Headers: 表示允许发送的请求头字段
- Access-Control-Max-Age: 预检请求的有效期，在此期间，不用发出另外一条预检请求。

在预检请求的响应返回后，如果请求不满足响应头的条件，则触发XMLHttpRequest的`onerror`方法，当然后面真正的CORS请求也不会发出去了。

CORS 请求的响应。绕了这么一大转，到了真正的 CORS 请求就容易多了，现在它和简单请求的情况是一样的。浏览器自动加上`Origin`字段，服务端响应头返回`Access-Control-Allow-Origin`。可以参考以上简单请求部分的内容。

### JSONP
利用script的src不遵循同源协议，兼容性较好，但仅限于**GET**请求。

### Nginx
Nginx 是一种高性能的反向代理服务器，可以用来轻松解决跨域问题。

![](https://user-gold-cdn.xitu.io/2020/3/22/170ffd97d0b1cf15?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
正向代理帮助客户端访问客户端自己访问不到的服务器，然后将结果返回给客户端。

反向代理拿到客户端的请求，将请求转发给其他的服务器，主要的场景是维持服务器集群的负载均衡，换句话说，反向代理帮其它的服务器拿到请求，然后选择一个合适的服务器，将请求转交给它。
```
server {
  listen  80;
  server_name  client.com;
  location /api {
    proxy_pass server.com;
  }
}
```

## 十五、TLS1.2握手
HTTP是明文传输非常不安全，由此产生了HTTPS。

HTTPS是在HTTP下增加了一层SSL/TLS协议。简单来讲**HTTPS = HTTP + SSL/TLS**

SSL 即安全套接层（Secure Sockets Layer），在 OSI 七层模型中处于会话层(第 5 层)。之前 SSL 出过三个大版本，当它发展到第三个大版本的时候才被标准化，成为 TLS（传输层安全，Transport Layer Security），并被当做 TLS1.0 的版本，准确地说，**TLS1.0 = SSL3.1**。

现在TLS主流版本是1.2，之前的1.0和1.1都是不安全的。2018年推出了更优秀的1.3版本。

### 传统RSA握手
传统的TLS握手就是RSA握手，是对称加密和非对称加密的结合，因为在加解密`pre_random`采用的是RSA算法所以成为RSA握手。
![](http://47.98.159.95/my_blog/week12/1.jpg)
- 浏览器 -> 服务器： `client_random` + 加密方法列表
- 服务器 -> 浏览器： `server_random` + 加密方法 + 公钥
- 浏览器生成随机数**pre_random**，并用公钥加密，传给服务器。
- 服务器用私钥解密，得到**pre_random**
- 然后浏览器和服务器用一样的公钥进行通信，即对称加密。

中间人没有私钥，拿不到**pre_random**，无法生成最终的密钥。

### TLS1.2握手过程
![](https://user-gold-cdn.xitu.io/2020/3/22/170ffd9b35c7a81b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 1:step1: Client Hello
首先，浏览器发送**client_random**、TLS版本以及加密套件列表。

加密套件一般这样：
```
TLS_ECDHE_WITH_AES_128_GCM_SHA256
```
> 意思是TLS握手过程中，使用ECDHE算法生成pre_random(这个数后面会介绍)，128位的AES算法进行对称加密，在对称加密的过程中使用主流的GCM分组模式，因为对称加密中很重要的一个问题就是如何分组。最后一个是哈希摘要算法，采用SHA256算法。
#### 2:step2: Server Hello
**server_random**也是最后生成secret的一个参数, 同时确认 TLS 版本、需要使用的加密套件和自己的证书。
#### 3:Clinet验证证书，生成secret
客户端验证服务端传来的证书和签名是否通过，如果验证通过，则传递client_params这个参数给服务器。

接着客户端通过ECDHE算法计算出**pre_random**，其中传入两个参数:`server_params`和`client_params`。现在你应该清楚这个两个参数的作用了吧，由于ECDHE基于椭圆曲线离散对数，这两个参数也称作椭圆曲线的公钥。

客户端现在拥有了`client_random`、`server_random`和`pre_random`，接下来将这三个数通过一个伪随机数函数来计算出最终的**secret**。
#### 4:Server生成secret
现在服务端开始用ECDHE算法生成**pre_random**，接着用和客户端同样的伪随机数函数生成最后的**secret**。

#### 注意事项
1. 实际上 TLS 握手是一个双向认证的过程。step1：客户端有能力验证服务器的身份，step3:客户端发送`client_params`实际上给服务器传一个验证消息，让服务器将相同的验证流程(哈希摘要 + 私钥加密 + 公钥解密)走一遍，确认客户端的身份。
2. 当客户端生成`secret`后，会给服务端发送一个收尾的消息，告诉服务器之后的都用对称加密，对称加密的算法就用第一次约定的。服务器生成完`secret`也会向客户端发送一个**收尾**的消息，告诉客户端以后就直接用对称加密来通信。

这个收尾的消息包括两部分，一部分是`Change Cipher Spec`，意味着后面加密传输了，另一个是`Finished`消息，这个消息是对之前所有发送的数据做的摘要，对摘要进行加密，让对方验证一下。

当双方都验证通过之后，握手才正式结束。后面的 HTTP 正式开始传输加密报文。

#### RSA和ECDHE握手过程的区别
1. ECDHE 握手，也就是主流的 TLS1.2 握手中，使用ECDHE实现pre_random的加密解密，没有用到 RSA。
2. 使用 ECDHE 还有一个特点，就是客户端发送完收尾消息后可以提前**抢跑**，直接发送 HTTP 报文，节省了一个 RTT，不必等到收尾消息到达服务器，然后等服务器返回收尾消息给自己，直接开始发请求。这也叫TLS False Start。

## 十六、TLS1.3做了哪些改进？
为了获得更强的安全、更优秀的性能，在2018年就推出了 TLS1.3，对于TLS1.2做了一系列的改进，主要分为这几个部分：
- 强化安全
- 提高性能

### 强化安全
在 TLS1.3 中废除了非常多的加密算法，最后只保留五个加密套件:
- TLS_AES_128_GCM_SHA256
- TLS_AES_256_GCM_SHA384
- TLS_CHACHA20_POLY1305_SHA256
- TLS_AES_128_GCM_SHA256
- TLS_AES_128_GCM_8_SHA256
最后剩下的对称加密算法只有 AES 和 CHACHA20，之前主流的也会这两种。分组模式也只剩下 GCM 和 POLY1305, 哈希摘要算法只剩下了 SHA256 和 SHA384 了。

RSA非对称加密算法被取消了，原因有二：
1. 2015年发现了FREAK攻击，即已经有人发现了 RSA 的漏洞，能够进行破解了。
2. 一旦私钥泄露，那么中间人可以通过私钥计算出之前所有报文的secret，破解之前所有的密文。

RSA握手当中，如果拿到了服务器私钥，就能拿到最终生成的会话密钥，每一个历史报文都能通过这样的方式进行破解。

但ECDHE在每次握手时都会生成临时的密钥对，即使私钥被破解，之前的历史消息并不会收到影响。这种一次破解并不影响历史信息的性质也叫**前向安全性**。

### 提升性能
#### 握手改进
![](https://user-gold-cdn.xitu.io/2020/3/22/170ffda75857d404?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
和 TLS 1.2 相比少了一个 RTT，服务器不必等待对方验证证书之后才拿到`client_params`，而是直接在第一次握手的时候就能够拿到, 拿到之后立即计算secret，节省了之前不必要的等待时间。

这种 TLS 1.3 握手方式也被叫做**1-RTT握手**。

但还有优化的空间，主要是会话复用和PSK
#### 会话复用
会话复用有两种方式: **Session ID**和**Session Ticket**。

最早出现的**Seesion ID**，具体做法是客户端和服务器首次连接后各自保存会话的 ID，并存储会话密钥，当再次连接时，客户端发送ID过来，服务器查找这个 ID 是否存在，如果找到了就直接复用之前的会话状态，会话密钥不用重新生成，直接用原来的那份。

但当客户端数量庞大的时候，对服务端的存储压力非常大。

因此出现了第二种方式：**Session Ticket**。双方连接成功后，服务器加密会话信息，用Session Ticket消息发给客户端，让客户端保存下来。下次重连的时候，就把这个 Ticket 进行解密，验证它过没过期，如果没过期那就直接恢复之前的会话状态。

这种方式虽然减小了服务端的存储压力，但与带来了安全问题，即每次用一个固定的密钥来解密 Ticket 数据，一旦黑客拿到这个密钥，之前所有的历史记录也被破解了。因此为了尽量避免这样的问题，密钥需要定期进行更换。
#### PSK
还可以优化到`0-RTT`。

在发送Session Ticket的同时带上应用数据，不用等到服务端确认，这种方式被称为`Pre-Shared Key`，即 **PSK**。

这种方式虽然方便，但也带来了安全问题。中间人截获PSK的数据，不断向服务器重复发，类似于 TCP 第一次握手携带数据，增加了服务器被攻击的风险。

#### 总结
TLS1.3 在 TLS1.2 的基础上废除了大量的算法，提升了安全性。同时利用会话复用节省了重新生成密钥的时间，利用 PSK 做到了0-RTT连接。


## 十七、HTTP/2的改进
HTTPS已经将安全做的足够好，HTTP/2改进的是性能，主要有两方面：
- 头部压缩
- 多路复用

还有一些新增功能：
- 设置请求优先级
- 服务器推送

### 头部压缩
HTTP/1.1及之前，指定**Content-Encoding**可将请求体压缩。

HTTP/2针对头部字段，采用了**HPACK算法**压缩。

HPACK主要有两个亮点：
1. 浏览器和服务器之间建立一个哈希表，将用过的相关字段存入，传输过程直接使用**索引**。
![](https://user-gold-cdn.xitu.io/2020/3/22/170ffdaa6f41c004?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
> HTTP/2 当中废除了起始行的概念，将起始行中的请求方法、URI、状态码转换成了头字段，不过这些字段都有一个":"前缀，用来和其它请求头区分开。
2. 对于整数和字符进行**哈夫曼编码**。先将所有出现的字符建立一张索引表，然后让出现次数较多的索引尽可能短。

### 多路复用
HTTP队头阻塞的问题根本在于HTTP基于**请求-响应**模型。在同一个TCP连接中，前面的请求没有得到响应，后面的请求就会被阻塞。

HTTP的明文传输效率比较低，HTTP/2将报文全部替换为**二进制格式**，方便机器解析。

原来的`Header+Body`如今被拆分为了一个一个二进制帧，用**Header帧**存放头部字段，用**Data帧**存放请求体字段。分帧后，服务器看到的是一堆乱序的二进制帧，就不存在先后关系也不会排队等待，就没了HTTP队头阻塞问题。

通信双方都可以给对方发送二进制帧，这种二进制帧的双向传输的序列，也叫做**流(Stream)**。HTTP/2 用流来在一个 TCP 连接上来进行多个数据帧的通信，这就是**多路复用**的概念。

所谓乱序，是指不同ID的Stream是乱序的，但同一个 Stream ID 的帧一定是按顺序传输的。二进制帧到达后对方会将 **Stream ID** 相同的二进制帧组装成完整的请求报文和响应报文。

### 服务器推送
HTTP/2也能新建stream来给客户端发送消息。

当 TCP 连接建立之后，比如浏览器请求一个 HTML 文件，服务器就可以在返回 HTML 的基础上，将 HTML 中引用到的其他资源文件一起返回给客户端，减少客户端的等待。

### 小结
HTTP/2完全兼容之前的HTTP的语法和语义，如请求头、状态码、头部字段都没有改变。

此外，在安全方面，HTTP/2也支持TLS，并且现在主流的浏览器都公开只支持加密的 HTTP/2, 因此你现在能看到的 HTTP/2 也基本上都是跑在 TLS 上面的了。
![](https://user-gold-cdn.xitu.io/2020/3/22/170ffdc6783132a5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 十八、HTTP/2中的二进制帧
### 帧结构
![](https://user-gold-cdn.xitu.io/2020/3/22/170ffdc9e9c25e93?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
帧分为帧头和帧体。

- 显示3个字节的帧长度，表示的是帧体的长度。
- 帧类型。数据帧和控制帧两种。数据帧用来存放 HTTP 报文，控制帧用来管理流的传输。
- 帧标志。里面一共有 8 个标志位，常用的有 END_HEADERS表示头数据结束，END_STREAM表示单方向数据发送结束。
- 流标识符。接收方就能从乱序的二进制帧中选择出 ID 相同的帧，按顺序组装成请求/响应报文。

### 流的状态变化
在HTTP中，流就是**二进制的双向传输的序列**。

流的状态改变借鉴了TCP状态变化的思想，根据**帧的标志位**来实现具体的状态改变。
![](https://user-gold-cdn.xitu.io/2020/3/22/170ffdcd0abdd1ba?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果下次要开启新的流，流ID自增，直到上限为止，到达上限后开一个新的 TCP 连接重头开始计数。由于流 ID 字段长度为 4 个字节，最高位又被保留，因此范围是 0 ~ 2的 31 次方，大约 21 亿个。

### 流特性
流的传输特性：
1. 并发性。一个 HTTP/2 连接上可以同时发多个帧，这一点和 HTTP/1 不同。这也是实现**多路复用**的基础。
2. 自增性。流 ID 是不可重用的，而是会按顺序递增，达到上限之后又新开 TCP 连接从头开始。
3. 双向性。客户端和服务端都可以创建流，互不干扰，双方都可以作为发送方或者接收方。
4. 可设置优先级。可以设置数据帧的优先级，让服务端先处理重要资源，优化用户体验。













