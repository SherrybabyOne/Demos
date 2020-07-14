// const test = /^\d+(.\d{0, 2})?$/g

// const fixNumber = number => {
// 	if (number < 1000) return number;
// 	let res = '';
// 	while (number) {
// 		res = ',' + number % 1000 + res;
// 		number = Math.floor(number / 1000);
// 	}
// 	return res.slice(1);
// }

// console.log(
// 	fixNumber(123456),
// 	fixNumber(1234567)
// )

var a = 10;
function b() {
	a = 100;
}
b();
console.log(a);

var a = 10;
function b() {
	a = 100;
	return;
	function a() {}
}

var a = 10;
if (true) {
	var a = 100;
}
console.log(a);
