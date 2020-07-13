# TypeScript

## 一、基础类型
- 布尔值
- 数字
- 字符串
- 数组  `number[]    Array<number>`
- 元组**Tuple**  `[string, number]` 当访问越界元素时，会使用联合类型替代
- 枚举**enum**
  - `enum Color {Red, Green, Blue}` 
  - 枚举类型提供的便利是可以由枚举的值得到它的名字。
- 任意值**any**
- 空值**void**  表示没有任何类型，适用于当一个函数没有返回值时，声明void的变量只能赋值undefined和null
- undefined
- null  默认情况下undefined和null时所有类型的子类型。
  - 指定了`--strictNullChecks`，`null`和`undefined`只能赋值给`void`和它们各自
- **Never**  表示用不存在的类型。用于总是会抛出异常或根本不会有返回值的函数类型。
  - never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）
  - 即使any也不可以赋值给never。
- 类型断言。我清楚地知道自己在干什么，比TypeScript更了解某个类型的详细信息。两种写法：
  - `let strLength: number = (<string>someValue).length;`
  - `let strLength: number = (someValue as string).length;`  JSX中只能使用as


## 二、接口（interface）
接口的作用就是为这些类型命名和为你的代码或第三方代码提供契约。

### 可选属性
```
interface SquareConfig {
  color?: string;
  width?: number;
}
```
### 只读属性
```
interface Point {
  readonly x: number;
  readonly y: number;
}
```
TS有`ReadonlyArray<T>`属性，把所有可选方法去掉了。
```
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
a = ro; // error!
```
就算把整个ReadonlyArray赋值到一个普通数组也不行。

可以使用类型断言：`a = ro as number[]`

作为变量的时候使用`const`，作为属性的时候使用`readonly`

### 额外的属性检查
TS中**对象字面量**会被特殊对待而且会经过额外的属性检查。
```
interface SquareConfig {
    width: number;
}

function createSquare(config: SquareConfig): void {}

let mySquare = createSquare({ width: 100, color: "red" });
// 对象字面量多出了color属性，会报错
```
解决方法有三：
1. 断言。`let mySquare = createSquare({ width: 100, color: "red" } as SquareConfig);`
2. 添加字符串索引签名。`[propName: string]: any`
3. 将对象赋值到另一个变量，不会经过额外属性检查。`let squareOptions = { colour: "red", width: 100 }; let mySquare = createSquare(squareOptions);`

### 函数类型
接口也可以描述函数类型。
```
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

### 类实现接口
使用**implements**。
```
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```
接口描述的是类的**公共部分**，不会检查类是否具有某些私有成员。

### 继承接口
使用**extends**继承接口，从一个接口复制成员到另一个接口。
```
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

### 接口继承类
当接口继承类的时候，它会继承类的成员但不包括其实现。

接口会同时继承到类的**public**和**private**成员，这意味着当你创建了一个接口继承了一个拥有私有或保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implements）。


