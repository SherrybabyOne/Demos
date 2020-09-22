Promise.myAll = function(promiseArr) {
  return new Promise((resolve, reject) => {
    const ans = [];
    let index = 0;
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i]
      .then(res => {
        ans[i] = res;
        index++;
        if (index === promiseArr.length) {
          resolve(ans);
        }
      })
      .catch(err => reject(err));
    }
  })
}

var p1 = Promise.resolve(3);
var p2 = Promise.resolve(1337);
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
}); 

Promise.myAll([p1, p2, p3]).then(values => { 
  console.log(values); // [3, 1337, "foo"] 
});
// expected output: Array [3, 42, "foo"]