// 利用递归+哈希表实现
const cloneDeep1 = (source, hash = new WeakMap()) => {
  if(!isObject(source)) return source;
  if(hash.has(source)) return hash.get(source);

  let target = Array.isArray(source) ? [] : {};
  hash.set(source, target);
  for(let key in source) {
    if(Object.prototype.hasOwnProperty.call(source, key)) {
      if(isObject(source[key])) {
        target[key] = cloneDeep1(source[key], hash)
      }else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
var isObject = (obj) => {
  if(typeof obj === 'object' && obj !== null) return true;
  return false;
}

const a = {
  a: 'a',
  b: {
    ba: 'ba',
    bb: 'bb'
  }
}
const b = cloneDeep1(a)
console.log(b)

const cloneDeep2 = (source) => {
  if(!isObject(source)) return source;
  const root = {};
  const hash = new WeakMap();
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: source
    }
  ];
  while(loopList.length) {
    const node = loopList.pop();
    const { parent, key, data } = node;
    let res = parent;
    if(typeof key !== 'undefined') {
      res = parent[key] = {};
    }
    if(hash.has(data)) {
      parent[key] = hash.get(data);
      continue;
    }
    hash.set(data, res);
    for(let k in data) {
      if(Object.prototype.hasOwnProperty.call(data, k)) {
        if(isObject(data[k])) {
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        }else {
          res[k] = data[k]
        }
      }
    }
  }
  return root;
}
const c = cloneDeep2(a)
console.log(c)

const d = {
  a: 'a',
  bbb: {
    bb: 'bb'
  }
}
d.cc = d;
console.log(cloneDeep2(d))