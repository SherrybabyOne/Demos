# TypeScript
TypeScript是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

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

## 三、类
```
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
```

### private、protected
类定义的成员默认为public。

当成员被标记为private时，不能在类的外部访问。
```
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```
如果其中一个类型里包含一个`private`成员，那么只有当另外一个类型中也存在这样一个`private`成员， 并且它们都是来自**同一处声明**时，我们才认为这两个类型是兼容的。

**protected**区别在于：成员在**派生类**中仍然可以访问。不能在类的外部访问，但可以在类的派生类的实例方法中访问。

构造函数被标记成protected时，意味着这个类不能在包含它的类之外被实例化，但能被继承。

**readonly**只读属性，必须在声明时或构造函数里初始化。

参数属性：可以添加访问限制符：public、private、protected进行声明限制。
```
class Animal {
  constructor(private name: string) { }
  move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

### 抽象类
抽象类**abstract**作为其它派生类的基类使用，一般不会被直接实例化。

不同于接口，抽象类可以包含成员的实现细节。

抽象类中的抽象方法不包含具体使用细节且必须在派生类中实现。
```
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log('roaming the earch...');
  }
}
```

### 类与接口
在TS中，类定义会创建两个东西：类的实例类型和一个构造函数。

因为类可以创建出类型，所以能够在允许使用接口的地方使用类。
```
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 四、函数
函数类型：包括参数类型和返回值类型。
```
function add(x: number, y: number): number {
  return x + y;
} // TS能根据返回语句自动推断出返回值类型，通常省略

const myAdd: (baseValue: number, increment: number) => number =
  function(x: number, y: number): number { return x + y; };
```

### 函数参数
TS里每个参数都是必须的。
- 可使用`?`实现可选参数，可选参数必须跟在必选参数后面
- 可以给函数参数一个默认值
- 剩余参数rest。`function fn(x: number, ...y: number[]) {}`

### 函数重载
为同一个函数提供多个函数类型定义来进行函数重载。

## 五、范型（generic）
范型用来创建可重用的组件，一个组件可以支持多种类型的数据。
```
function identity<T>(arg: T): T {
  return arg;
}
```

### 范型类型
可以写一个范型接口:
```
interface GenericIdentityFn {
  <T>(arg: T): T;
}
function identity<T>(arg: T): T {
  return arg;
}

const myIdentity: GenericIdentityFn = identity;
```

可以把范型参数当作整个接口的一个参数
```
interface GenericIdentityFn<T> {
  (arg: T): T;
}
function identity(arg: string): string {
  return arg;
}

const myIdentity: GenericIdentityFn<string> = identity;
```

### 范型类
```
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```
范型类指的是实例部分的类型，所以类的静态属性不能使用这个范型类型。

### 范型约束
限制函数去处理带有`.length`属性的类型，至少包含这一属性。
```
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}
```

在范型约束中使用类型参数：
```
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error
```

## 六、枚举（enum）
使用枚举可以定义一些有名字的数字变量，默认从0开始递增加1。

枚举类型被编译成一个对象，它包含双向映射(name -> value)和(value -> name)。

常数枚举是在`enum`关键字前使用`const`修饰符。

常数枚举只能使用常数枚举表达式并且不同于常规的枚举的是它们在编译阶段会被删除。

## 七、类型推论（type inference）

### 通用类型推论
```
const x = [0, 1, null];
```
TS会推断出一个通用类型（一个兼容所有候选类型），如果没有最佳通用类型的话就为联合类型。

### 上下文类型
上下文归类会发生在表达式的类型与所处的位置相关时。
```
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button);  //<- Error
};
```
TypeScript类型检查器使用Window.onmousedown函数的类型来推断右边函数表达式的类型。 因此，就能推断出mouseEvent参数的类型了。 如果函数表达式不是在上下文类型的位置，mouseEvent参数的类型需要指定为any，这样也不会报错了。
```
window.onmousedown = function(mouseEvent: any) {
  console.log(mouseEvent.button);  //<- Now, no error is given
};
```
上下文归类会在很多情况下使用到。 通常包含函数的参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句。 上下文类型也会做为最佳通用类型的候选类型。比如：
```
function createZoo(): Animal[] {
  return [new Rhino(), new Elephant(), new Snake()];
}
```
`Animal`会成为最佳通用类型。

### 类型兼容性




