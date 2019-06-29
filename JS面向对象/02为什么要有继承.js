    function Person(name,age){
        this.name=name;
        this.age=age;
        this.say=function(){}
    }
    var p1=new Person();
    var p2=new Person();
    
    //p1对象和p2对象的say方法是否是同一个方法：false
    console.log(p1.say===p2.say);

    //由于say方法可能功能相似，但是不是同一个方法(没有指向同一块内存，会造成内存浪费)
    //解决方案：把say方法写在他们共同的(父对象)中
    //其实他们共同的父对象，就可以通过：Person.prototype来获取

    //-->只要把say方法写在Person.prototype中，那么say方法就是同一个方法
    Person.prototype.run=function(){
        console.log('时速500KM');
    }
    //此时p1和p2都可以访问到run方法
    p1.run();
    p2.run();
    //验证p1.run和p2.run是否是同一个方法？
    console.log(p1.run === p2.run); //指向同一个方法，这种方法避免了内存的浪费
    
    console.log(p1.run === Person.prototype.run);
    //true

    var p3=new Person();
    console.log(p3.run === p1.run); //true
    console.log(p3.run === p1.run);//true
    //结论：只要往某个构造函数的prototype对象中添加某个属性、方法，那么这样的属性、方法都可以被所有的构造函数的实例所共享
    //==>这里的【构造函数的prototype对象】称之为原型对象
    //  Person.prototype是 p1 p2 p3 的原型对象
    //  Person.prototype是Person构造函数的【实例】的原型对象

    //猜猜看？
    //  Person的原型对象是谁呢？
    //  -->首先要知道Person的构造函数：-->Function
    //  -->所以Person的原型对象是：Function.prototype

    //  p1的原型对象是谁呢？
    //  -->首先要知道p1是谁创建的？    -->Person
    //  -->所以p1的原型对象时：     Person.prototype
    function Student(name){
        return name
    }
    const a = new Student('a')
    console.log(a)