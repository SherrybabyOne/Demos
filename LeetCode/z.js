let comb = arr => {
    let tmp = [];
    for(let i = 0; i<arr[0].length; i++) {
        for(let j = 0; j<arr[1].length; j++) {
            tmp.push(`${arr[0][i]}${arr[1][j]}`)
        }
    }
    arr.splice(0,2,tmp);
    if(arr.length > 1) {
        comb(arr)
    }else {
        return tmp
    }
}
const arr = ['abc','def','ghi'];
console.log(comb(['abc','def','ghi']));