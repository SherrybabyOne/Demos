// 图片懒加载

// 方案一
<img src="default.jpg" data-src="http://www.xxx.com/picture.jpg"/>

// JS
const img = document.getElementsByTagName('img');
const num = img.length;
let count = 0;

// 首次加载需要调用
lazyload();

function lazyload() {
  // 视口的高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = count; i < num; i++) {
    const offsetHeight = img[i].offsetTop;
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = img[i].dataset.src;
      img[i].src = src;
      count++;
    }
  }
}

window.addEventListener('scroll', lazyload);


// 方案二，使用getBoundingClientRect
// Element.getBoundingClientRect返回元素的大小以及其相对于视口的位置
function lazyload() {
  for (let i = count; i < num; i++) {
    if (
      img[i].getBoundingClientRect.top
        <
      document.documentElement.clientHeight) {
        if (img[i].getAttribute('src') !== 'default.jpg') {
          img[i].src = img[i].dataset.src;
        }
    }
  }
}

// 方案三，使用IntersectionObserver
// IntersectionObserver：提供异步观察目标元素与其祖先元素或顶级文档元素（viewport）交叉状态的方法
const observer = new IntersectionObserver(changes => {
  // changes是被观察元素的集合
  for (let i = 0; i <changes.length; i++) {
    const change = changes[i];
    if (change.isIntersecting){
      const imgElement = change.target;
      imgElement.src = imgElement.dataset.src;
      observer.unobserve(imgElement);
    }
  }
})
Array.from(img).forEach(item => observer.observe(item));
