function Person(){

}
var p1=new Person();
console.log(p1 instanceof Person);//true，是Person的实例

function Student(){
    return 100;
}
var s1=new Student();
console.log(s1 instanceof Student);//true，是Student的实例

function Programmer(){
    return [1,3,5]
}
var pro=new Programmer();//pro并不是Programmer的实例
console.log(pro instanceof Programmer);//false
console.log("是数组的实例吗？",pro instanceof Array);//true