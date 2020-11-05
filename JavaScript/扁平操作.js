// 将数组进行扁平操作
const arr = [1, [2, [3, [4, 5]]], 6];

const res1 = arr.flat(Infinity);

const res2 = JSON.stringify(arr).replace(/\[|\]/g, '').split(',');

const res3 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');

const flatten = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, [])
}
const res4 = flatten(arr);

const res5 = [];
const fn = arr => {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      fn(arr[i]);
    } else {
      res5.push(arr[i]);
    }
  }
}
fn(arr);

const flat6 = arr => {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
  return arr;
}
const res6 = flat6(arr);

console.log(
  res1,
  res2,
  res3,
  res4,
  res5,
  res6,
);