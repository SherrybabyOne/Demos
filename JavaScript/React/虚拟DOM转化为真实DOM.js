// const title = React.createElement(
//   'h1',
//   { className: 'title' },
//   'Hello, world!'
// );
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
  };
}
const React = {
  createElement,
};

function render(vnode, container) {
  container.appendChild(_render(vnode));
}
function _render(vnode) {
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    })
  }
  vnode.children.forEach(child => render(child, dom));
  return dom;
}
const ReactDom = {
  render,
};

