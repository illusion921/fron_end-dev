单页面开发SPA single page Application
index.html
1.页面与页面之间怎么进行数据的共享？
2.跳转页面的方式
3.主页结构怎么搭建
4.怎么保存页面的状态

面向对象编程 OOP

addressModule	地址搜索页模块
searchModule	商家搜索页模块
rlistModule		商家列表页模块
detailModule	食物详情页模块

js 的两种数据类型
1.基本数据类型：Number,String,Boolean,Undefined,null
2.引用数据类型: Array(数组),Object,Function
基本数据类型相互独立，引用数据类型相互联系。
var a = 1;
var b = a;
b = 4;
console.log(a); //output 1
var obj = {
	name: 't',
	age: 14,
};
var t = [];
t.push(obj);
var arr = [];
arr.push(2);
console.log(t);	//obj
arr.push(obj);
arr[1].name=89;
console.log(t);//obj.name=89


对象的继承：
是为了让对象在进行赋值的时候，能保持其互相独立的特性，对象之间直接复制一定是错误的。
正确的继承方法：
var a = Object.create(b) //b为父对象，a为子对象，a继承b

//原型继承
function Create(obj){
	function T(){

	}
	T.prototyoe = obj;
	var t = new T();//创建一个属于构造函数T的实例对象小t
	//此时小t实例拥有其原型上的属性和方法
	//原型查找：当实例重写一个T的属性时，会首先查找实例重写过的属性值
	//若没有重写，则首先访问原型的属性值
}
//创建一个干净的对象
var test = Object.create(null);

重载：
直接对对象的属性值进行重新赋值
var searchModule = Object.create(addressModule);
searchModule.name = 'sss';
或者：
$.extend将对象与对象之间进行合并，若两个对象都没有的属性或者方法，不会丢弃某一个方法或属性进行
合并，若有相同的属性或者方法，后面的会覆盖前面的。
searchModule = $.extend(searchModule,{name: '商家搜索页',dom: $('#search')})