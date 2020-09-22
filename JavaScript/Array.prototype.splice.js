// 实现数组的splice方法
Array.prototype.splice = function(startIndex, deleteCount, ...addElements) {
  const argumentsLen = arguments.length >>> 0;
  const len = this.length >>> 0;
  const deleteArr = new Array(deleteCount);

  // 下面参数的清洗工作
  startIndex = computeStartIndex(startIndex, len);
  deleteCount = computeDeleteCount(startIndex, len, deleteCount, argumentsLen);

  // 拷贝被删除的元素
  sliceDeleteElements(this, startIndex, deleteCount, deleteArr);
  // 移动删除元素后面的元素
  movePostElements(this, startIndex, len, deleteCount, addElements);
  // 插入新元素
  for (let i = 0; i < addElements.length; i++) {
    this[startIndex + i] = addElements[i];
  }
  this.length = len - deleteCount + addElements.length;
  return deleteArr;
}

const sliceDeleteElements = (array, startIndex, deleteCount, deleteArr) => {
  for (let i = 0; i < deleteCount; i++) {
    const index = startIndex + i;
    if (index in array) {
      deleteArr[i] = array[index];
    }
  }
}

const movePostElements = (array, startIndex, len, deleteCount, addElements) => {
  // 当添加的元素数和被删除的元素数相等时
  if (deleteCount === addElements.length) return;
  // 当添加的元素数小于被删除的元素数时
  if (deleteCount > addElements.length) {
    for (let i = startIndex + deleteCount; i < len; i++) {
      const fromIndex = i;
      const toIndex = i - (deleteCount - addElements.length);
      if (fromIndex in array) {
        array[toIndex] = arr[fromIndex];
      } else {
        delete array[toIndex];
      }
    }
  }
  // 当添加的元素数大于被删除的元素数时
  if (deleteCount < addElements.length) {
    for (let i = len - 1; i >= startIndex + deleteCount; i--) {
      const fromIndex = i;
      const toIndex = i + (addElements.length - deleteCount);
      if (fromIndex in array) {
        array[toIndex] = array[fromIndex];
      } else {
        delete array[toIndex];
      }
    }
  }
}

// 当用户非法传来的startIndex和deleteCount或者负索引的时候，需要作出特殊的处理
const computeStartIndex = (startIndex, len) => {
  if (startIndex < 0) {
    return startIndex + len > 0 ? startIndex + len : 0;
  }
  return startIndex > len ? len : startIndex;
}
const computeDeleteCount = (startIndex, len, deleteCount, argumentsLen) => {
  // 删除数目没有传，默认删除startIndex及后面所有的
  if (argumentsLen === 1) 
    return len - startIndex;
  // 删除数目过小
  if (deleteCount < 0) 
    return 0;
  // 删除数目过大
  if (deleteCount > len - startIndex) 
    return len - startIndex;
  return deleteCount;
}

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]