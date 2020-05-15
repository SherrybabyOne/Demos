// 模拟一个深拷贝

// 第一种方法：使用 for...in + Object.getOwnPropertySymbols
const cloneDeep1 = (target, hash = new WeakMap()) => {
  // 对于传入参数处理
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  // 哈希表中存在直接返回
  if (hash.has(target)) return hash.get(target);

  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.set(target, cloneTarget);

  // 针对Symbol属性
  const symKeys = Object.getOwnPropertySymbols(target);
  if (symKeys.length) {
    symKeys.forEach(symKey => {
      if (typeof target[symKey] === 'object' && target[symKey] !== null) {
        cloneTarget[symKey] = cloneDeep1(target[symKey]);
      } else {
        cloneTarget[symKey] = target[symKey];
      }
    })
  }

  for (const i in target) {
    if (Object.prototype.hasOwnProperty.call(target, i)) {
      cloneTarget[i] =
        typeof target[i] === 'object' && target[i] !== null
        ? cloneDeep1(target[i], hash)
        : target[i];
    }
  }
  return cloneTarget;
}

// 第二种方法：使用Reflect.ownKeys()方法
const cloneDeep2 = (target, hash = new WeakMap()) => {
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  if (hash.has(target)) return hash.get(target);
  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.set(target, cloneTarget);

  Reflect.ownKeys(target).forEach(key => {
    if (typeof target[key] === 'object' && target[key] !== null) {
      cloneTarget[key] = cloneDeep2(target[key], hash);
    } else {
      cloneTarget[key] = target[key];
    }
  });

  return cloneTarget;
}

// 存在递归爆栈的问题，第三种方法：使用循环
const cloneDeep3 = target => {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  // 用来去重
  const uniqueList = [];
  const root = Array.isArray(target) ? [] :{};
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: target,
    }
  ];

  while (loopList.length) {
    // 广度优先遍历
    const node = loopList.pop();
    const { parent, key, data } = node;

    // key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      parent[key] = Array.isArray(data) ? [] : {};
      res = parent[key];
    }
    // 数据已经存在
    const uniqueData = find(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      break;
    }
    
    // 数据不存在
    uniqueList.push({
      source: data,
      target: res,
    });

    Reflect.ownKeys(data).forEach(k => {
      if (typeof data[k] === 'object' && data[k] !== null) {
        loopList.push({
          parent: res,
          key: k,
          data: data[k],
        });
      } else {
        res[k] = data[k];
      }
    })
  }

  return root;
}
function find(arr, item) {
  for(let i = 0; i < arr.length; i++) {
      if (arr[i].source === item) {
          return arr[i];
      }
  }

  return null;
}

var a = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45"
  },
}
var sym1 = Symbol("a"); // 创建新的symbol类型
var sym2 = Symbol.for("b"); // 从全局的symbol注册?表设置和取得symbol
a[sym1] = "localSymbol";
a[sym2] = "globalSymbol";
a.circleRef = a;
var b = cloneDeep1(a);
a.book.price = 50;
// console.log(b);
const c = cloneDeep2(a);
// console.log(c);
const d = cloneDeep3(a);
console.log(d);
