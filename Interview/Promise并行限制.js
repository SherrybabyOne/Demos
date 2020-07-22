const imageUrls = [
  'pic_1.png',
  'pic_2.png',
  'pic_3.png',
  'pic_4.png',
  'pic_5.png',
  'pic_6.png',
]
// 为了演示方便，我们在此用fetchImage函数来模拟异步请求图片，返回成功提示
function fetchImage(url) {
  // 模拟请求的响应时间在0 - 1s之间随机
  const timeCost = Math.random() * 1000
  return new Promise(resolve =>
    setTimeout(resolve, timeCost, 'get: ' + url)
  ).then(res => console.log(res));
}

const a = imageUrls.map(item => fetchImage(item));

