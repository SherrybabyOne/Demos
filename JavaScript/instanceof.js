const myInstanceof = (left, right) => {
  // 基本数据类型都返回false
  if (typeof left !== 'object' || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

console.log(myInstanceof("111", String)); //false
console.log(myInstanceof(new String("111"), String));//true