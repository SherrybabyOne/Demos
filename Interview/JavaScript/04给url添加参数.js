// 实现一个函数给一个url添加参数， 如果参数已经存在则替换，否则就是添加
const addParamToUrl = (key, value, url) => {
  const urlParse = url.split('?');
  console.log(urlParse);
}

addParamToUrl('1', '2', 'www.baidu.com/a?b=c')

