---
title: 构造函数
date: 
tags:
- JS
---

- **构造函数语法**：大写字母开头的函数
- 创建构造函数
<img src="https://img-blog.csdnimg.cn/0134f47bf2dd4b0793a84531d3d40cd8.png">

### 实例成员&静态成员

**实例成员**

通过构造函数创建的对象称为实例对象，实例对象中的属性和方法称为实例成员。

```js
//构造函数
function person(){
//构造函数内部的 this 就是实例对象
//实例对象中动态添加属性
this.name = '坤坤'
//实例对象动态添加方法
this.sayHi = function (){
console.log('鸡你太美')
}
}
实例化 ikun 是实例对象 也就是构造函数的this
const ikun = new person()
console.log('ikun.name') //访问实例属性
ikun.sayHi() //调用实例方法
```

*说明*：

- 实例对象的属性和方法即为实例成员
- 为构造函数传入参数，动态创建结构相同但值不同的对象
- 构造函数创建的实例对象彼此独立互不影响。

**静态成员**

构造函数的属性和方法被称为静态成员

```js
//构造函数
function Person (name,age){
this.name=name
}
//静态属性
Person.eyes = 2
Person.hand = 1
//静态方法
Person.walk = function(){
console.log('坤坤会鸡叫')
this 指向 person
console.log('this.eyes')
}
```

*说明*：

- 构造函数的属性和方法被称为静态成员
- 一般公共特征的属性或方法静态成员设置为静态成员
- 静态成员方法中的 this 指向构造函数本身

### 内置构造函数

**Object**

- Object 是内置的构造函数，用于创建普通对象。

- 常用的三个静态方法（静态方法就是只有构造函数Object可以调用的）

> Object.keys()   // 获取对象所有的键，返回一个数组
>
> Object.values()  // 获取对象所有的值，返回一个数组
>
> Object.assign()  //拷贝对象

*Object.keys()* 静态方法获取对象中所有属性（键）

```js
const o ={name : '坤坤',age : 18}
获得对象的所有键,并且返回是一个数组
const arr = Object.keys(o)
console.log(arr) // ['name','age']
```

*注意*：返回的是一个数组

*Object.values* 静态方法获取对象中所有属性值

```js
const o ={name : '坤坤',age : 18}
获得对象的所有键,并且返回是一个数组
const arr = Object.values(o)
console.log(arr) // ['坤坤','18']
```

*注意*：返回的是一个数组

*Object. assign* 静态方法常用于对象拷贝

```js
// 给 o 新增属性
const o ={name : '坤坤',age : 18}
Object.assign(o,{gender:'女'})
console.log(o) // {name:'佩奇',age:6,gender:'女'}
```

**Array** **String** **Number**的方法这里就不写了,需要可以去看文档 [MDN](https://developer.mozilla.org/zh-CN/)

### 编程思想

**面向过程编程**

- *优点*：性能比面向对象高，适合跟硬件联系很紧密的东西，例如单片机就采用的面向过程编程。
- *缺点*：没有面向对象易维护、易复用、易扩展

**面向对象编程**

- *优点*：易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统 更加灵活、更加易于维护
- *缺点*：性能比面向过程低

*总结*：生活离不开蛋炒饭，也离不开盖浇饭，选择不同而已，只不过前端不同于其他语言，面向过程更多

### 原型

- 构造函数通过原型分配的函数是所有对象所 共享的。
- JavaScript 规定，每一个构造函数都有一个 prototype 属性，指向另一个对象，所以我们也称为原型对象
- 这个对象可以挂载函数，对象实例化不会多次创建原型上函数，节约内存
- 我们可以把那些不变的方法，直接定义在 prototype 对象上，这样所有对象的实例就可以共享这些方法

```js
function Star(uname,age){
this.uname = uname
this.age = age
}
console.log(Star.prototype) //返回一个对象称为原型对象
将方法挂载到原型上,该构造函数的实例对象都能访问到
Star.prototype.sing =function(){
console.log('我会唱歌')
}
const ldh = new Star('刘德华',18)
const zxy = new Star('张学友',19)
console.log(ldh.sing===zxy.sing)
//结果true 说明实例对象调用的是同一个方法不会造成内存浪费
```

### constructor属性

每个原型对象里面都有个constructor 属性，该属性指向该原型对象的构造函数

*使用场景*

- 如果有多个对象的方法，我们可以给原型对象采取对象形式赋值.
- 但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 constructor 就不再指向当前构造函数了
- 此时，我们可以在修改后的原型对象中，添加一个 constructor 指向原来的构造函数。

```js
function Star(name){
this.name = name
}
Star.prototype = {
手动让修改后的原型对象利用 constructor 重新指向star构造函数
constructor:Star
sing: function (){console.log('唱歌')}
}
console.log(Star.prototype.constructor) //指向Star
```

### 对象原型

对象都会有一个属性` __proto__` 指向构造函数的 `prototype` 原型对象，之所以我们对象可以使用构造函数 prototype
原型对象的属性和方法，就是因为对象有` __proto__ `原型的存在

<img src="https://img-blog.csdnimg.cn/907a1529b6ed4c2086e0499a3c1eda1f.png">

### 原型继承

继承是面向对象编程的另一个特征，通过继承进一步提升代码封装的程度，JavaScript 中大多是借助原型对象实现继承
的特性。

```js
 // 实例共同的父亲必须是构造函数因为console.log(p1===p2) 结果为false
//这样的话 man和woman两个子构造函数就不会互相造成影响了
function Person(){
   this.eays=2,
   this.head=1
 }
const p1 = new Person()
const p2 = new Person()
function Man(){
}
Man.prototype=new Person()
// 通过赋值让构造函数的原型对象指向 person这个对象 但这个对象里面没有countrutor
const pink = new Man()
Man.prototype.countructor = Man //让构造函数的原型对象的countructor指回 构造函数
Man.prototype.baby=function(){
   console.log('hollw')
}
console.log(pink)
console.log(Man.prototype.countructor)
console.log(Man.prototype)
pink.baby()
function Woman(){
}
Woman.prototype=new Person()
Woman.prototype.countructor=Woman
const red = new Woman()
console.log(red)
```

### 原型链

基于原型对象的继承使得不同构造函数的原型对象关联在一起，并且这种关联的关系是一种链状的结构，我们将原型对象的链状结构关系称为原型链

<img src="https://img-blog.csdnimg.cn/04d65274f8b747e8b9553398da1bb51c.png">

**原型链-查找规则**

- ① 当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。
- ② 如果没有就查找它的原型（也就是 __proto__指向的 prototype 原型对象）
- ③ 如果还没有就查找原型对象的原型（Object的原型对象）
- ④ 依此类推一直找到 Object 为止（null）
- ⑤ __proto__对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线