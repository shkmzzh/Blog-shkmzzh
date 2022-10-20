---
title: 扩展
date: 
tags:
- JS
---
## 深浅拷贝

### 浅拷贝

首先浅拷贝和深拷贝只针对引用类型 *浅拷贝：拷贝的是地址*

**常见方法：**

- 1.拷贝对象：Object.assgin( )  或者  展开运算符 {...obj} 拷贝对象

- 2.拷贝数组：Array.prototype.concat() 或者 [...arr]

```js
cosnt pink ={
name:'pink老师',
age:18
}
const red ={}
Object.assign(red,pink)
console.log(red) // {name:'pink老师',age:18}
res.name='res老师'
console.log(red) // {name:'red老师',age:18}
console.log(pink) // {name:'pink老师',age:18}
---------------------------
cosnt obj = {
 uname:'pink'
}
cosnt o ={...obj}
console.log(o) // {uname:'pink'}
o.uname='red'
console.log(o)// {uname:'red'}
console.log(obj) // {uname:pink}
```

*注意*：如果是简单数据类型拷贝值，引用数据类型拷贝的是地址 (简单理解： 如果是单层对象，没问题，如果有多层就有问题)

*总结：*

- 直接赋值和浅拷贝有什么区别？
  -  直接赋值的方法，只要是对象，都会相互影响，因为是直接拷贝对
     象栈里面的地址
  -  浅拷贝如果是一层对象，不相互影响，如果出现多层对象拷贝还会
     相互影响
- 浅拷贝怎么理解？
  - 拷贝对象之后，里面的属性值是简单数据类型直接拷贝值
  - 如果属性值是引用数据类型则拷贝的是地址



### 深拷贝

深拷贝：拷贝的是对象，不是地址

常见方法：

> 1. 通过递归实现深拷贝
> 2. lodash/cloneDeep
> 3. 通过JSON.stringify()实现

**通过递归实现浅拷贝**

```js
 let obj = {
   uname: 'ikun',
   age: 18,
   hobby: ['唱跳', 'rep', '篮球'],
   sing: { music: '鸡你太美' }
  }
  let o = {}
  function deepCopy(newObj, oldObj) {
    // 遍历数组时 k是下标
  for (let k in oldObj) {
  //处理数组的问题
  if (oldObj[k] instanceof Array) {
  // 执行流程, 先判断oldObj的hobby里的是不是一个数组, 是的话就让newObj[hobbby] 为空数组
  // 然后调用函数,传入参数deepCopy([],['唱跳', 'rep', '篮球']),然后开始遍历数组
 // 然后又执行到了这里,这个时候的lodObj[k]是数组里的字符串，所以判断为false,然后执行到最后的else里
 //最后开始个newObj这个空数组传入参数 newObj[0]=oldObj[唱跳]
  newObj[k] = []
 // 相当于执行 deepCopy([], ['唱跳', 'rep', '篮球'])
  deepCopy(newObj[k], oldObj[k])
 // 注意这里的if判断 Object一定要写到 Array的后面,因为Array也是对象
  } else if (oldObj[k] instanceof Object) {
  newObj[k] = {}
  deepCopy(newObj[k], oldObj[k])
  } else {
  // newObj[k]===o.uname  给新对象添加属性
  // 这里我们为什么不按照习惯 newObj.k 赋值呢而是 用 newObj[k]呢
  // 因为 k 是一个变量  而newObj.k 是拿k作为属性赋值
  newObj[k] = oldObj[k]
          }
       }
   }
  deepCopy(o, obj) //函数调用 两个参数 o新对象  obj旧对象
  o.hobby[1] = 'hh'
  o.sing.music = '哈密'
  console.log(o)
  console.log(obj)
```

**js库lodash里面cloneDeep内部实现了深拷贝**

[Lodach地址](https://www.lodashjs.com/)

```js
const obj ={
uname:'pink',
age:18,
hobby:['篮球','rep'],
family:{
baby:'小pink'
}
}
// 语法：_.cloneDeep(要被克隆的对象)
const o = _.cloneDeep(obj)
console.log(o)
o.family.baby = '老pink'
console.log(obj)
```

**通过JSON.stringify()实现**

```js
const obj ={
uname:'pink',
age:18,
hobby:['篮球','rep'],
family:{
baby:'小pink'
}
}
// 语法先将对象转化为JSON字符串 转换后数据为简单数据 在转换为JSON对象形成深拷贝
const obj ={
  o.family.baby = '老pink'
}
console.log(obj)
```

##  异常处理

### throw 抛异常

异常处理是指预估代码执行过程中可能发生的错误，然后最大程度的避免错误的发生导致整个程序无法继续运行

- **`throw`** **语句**用来抛出一个用户自定义的异常。当前函数的执行将被停止（`throw` 之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个 [`catch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch) 块。如果调用者函数中没有 `catch` 块，程序将会终止

```js
function counter(x,y) {
if(!x || !y)
// throw '参数不能为空'
throw new Error('参数不能为空！')
}
return x+y
}
counter()
```

*总结*：

抛出异常我们经常用 `throw `关键字，他会终止程序,经常配合 new Error()对象使用

### try/catch 捕获错误信息

```js
function fn() {
 try {
    //可能预估有问题的代码写到这
    const p = document.querySelector('.p')
    p.style.color = 'red'
 } catch (err) {
    console.log(err.message)
       //return 跳出函数不执行后面的代码
   throw new Error('选择器写错了')  没有写return的话要写throw
 } finally {
   alert('执行')
    }
  console.log('捕获到异常不执行这行代码')
    }
 fn()
```

*总结*：

- try...catch 用于捕获错误信息
- 将预估可能发生错误的代码写在 try 代码段中
- 如果 try 代码段中出现错误后，会执行 catch 代码段，并截获到错误信息
- finally 不管是否有错误，都会执行

### debugger

*debugger 语句*调用任何可用的调试功能，例如设置断点。 如果没有调试功能可用，则此语句不起作用

## this指向

- 普通函数的调用方式决定了 this 的值，即【谁调用 this 的值指向谁】
- 普通函数没有明确调用者时 this 值为 window，严格模式下没有调用者时 this 的值为 undefined

```js
<script>
'use strict' //开启严格模式
function fn(){
console.log(this) //undefined
}
fn()
<script>
```

箭头函数中的 this 与普通函数完全不同，也不受调用方式的影响，事实上箭头函数中并不存在 this 

- 1.箭头函数会默认帮我们绑定外层 this 的值，所以在箭头函数中 this 的值和外层的 this 是一样的
- 2.箭头函数中的this引用的就是最近作用域中的this
- 3.向外层作用域中，一层一层查找this，直到有this的定义

**改变this指向**

### call()

使用 call 方法调用函数，同时指定被调用函数中 this 的值

> 语法：fun.call(thisArg, arg1, arg2, ...) 

```js
const obj = {
name :'pink'
}
function fn(x,y){
console.log(this) //指向 obj {name:'pink'}
console.log(x + y) //传递过来的参数相加
}
fn.call(obj,1,2)
```

​	*总结*：

- thisArg：在 fun 函数运行时指定的 this 值
- arg1，arg2：传递的其他参数
- 返回值就是函数的返回值，因为它就是调用函数

###  apply()

使用 apply 方法调用函数，同时指定被调用函数中 this 的值

> 语法：fun.apply(thisArg, [argsArray])

```js
//求和函数
function counter(x,y) {
return x + y  //x=5 y=10
}
调用 counter 函数，并传入参数
let result = counter.apply(null,[5,10])
console.log(result)
```

-  thisArg：在fun函数运行时指定的 this 值
-  argsArray：传递的值，必须包含在数组里面
-  返回值就是函数的返回值，因为它就是调用函数
-  因此 apply 主要跟数组有关系，比如使用 Math.max() 求数组的最大值

### bind()

bind() 方法不会调用函数。但是能改变函数内部this 指向

> 语法：fun.bind(thisArg, arg1, arg2, ...)

```js
//普通函数
function sayHi(){
console.log(this)  //{name: '小明', age: 18}
}
let user ={
name:'小明',
age:18
}
//调用 bind 指定 this的值
let sayHello =sayHi.bind(user)
//调用使用 bind 创建的新函数
sayHello()
```



- thisArg：在 fun 函数运行时指定的 this 值
- arg1，arg2：传递的其他参数
- 返回由指定的 this 值和初始化参数改造的 原函数拷贝 （新函数）
- 因此当我们只是想改变 this 指向，并且不想调用这个函数的时候，可以使用 bind，比如改变定时器内部的this指向.

**call apply bind 总结**

- 相同点:
  - 都可以改变函数内部的this指向.
- 区别点: 
  - call 和 apply 会调用函数, 并且改变函数内部this指向.
  -  call 和 apply 传递的参数不一样, call 传递参数 aru1, aru2..形式 apply 必须数组形式[arg]
  - bind 不会调用函数, 可以改变函数内部this指向.
- 主要应用场景: 
  -  call 调用函数并且可以传递参数
  - apply 经常跟数组有关系. 比如借助于数学对象实现数组最大值最小值
  - *bind 不调用函数*,但是还想改变this指向. 比如改变定时器内部的this指向.

##  节流和防抖

作用：节流和防抖作为页面性能优化的一种策略，可以降低回调函数的执行频率，节省计算资源，能有效减少浏览器引擎的损耗，防止出现页面堵塞卡顿现象。

### 节流

**一、节流：简单地说，就是限制一个动作在一段时间内只能执行一次**

打个比方，好比我们打英雄联盟或者王者荣耀的时候，释放技能都有一段冷却时间，比如Q技能有5秒的冷却时间，那么我们在5秒钟的时间内只能释放一次Q技能。

一般使用场景：

- 1、`scroll` 事件，每隔一秒计算一次位置信息等

- 2、`input` 框实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求

代码实现：

```js
 //<div class="box" style="width: 500px; height: 500px;"></div>
const box= document.querySelector('.box')
   let i = 1  //让这个变量++
    // 鼠标移动函数
    function mouseMove(){
    box.innerHTML=i++
    // 如果里面存在大量操作DOM的情况可能会造成页面卡顿
     }
 function throttle(callBack,time){
    let stratTime =0
    return function(){
    let now = Date.now()
    if(now-stratTime>time){
     callBack()
     stratTime =now
      }
    }
  }
 box.addEventListener('mousemove',throttle(mouseMove,500))
```

### 防抖

**二、防抖：简单地说，就是 当一个动作连续触发，只执行最后一次。**

还是举一个英雄联盟中的例子，比如你按下了回城键，那么在8秒钟之后，就会执行回城事件，但如果你再次按下回城键，那么回城时间又将重新计时，需要在等8秒才会执行回城事件。

一般使用场景：

- 1.登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
- 2.调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖

代码实现：

```js
const box = document.querySelector('.box')
  let i = 1
  function mouseMove(){
  box.innerHTML = i++
}
  function debounce(fn,t){
  let timeId
  return function (){
//如果有定时器,先清除
  if(timeId) clearTimeout(timeId)
  // 开启定时器
  timeId = setTimeout(function(){
  fn()
  },t)
  }
 }  
//这里的box调用的 函数 debounce() 加了括号，按一般情况是只会调用一次的,但是它是一个闭包函数
// 调用了debounce 相当于调用了里面的闭包函数，所以实现了重复触发
  box.addEventListener('mousemove',debounce(fn,1000))
// 原理:你每次移动的时候都会调用 debounde 这个函数里面的闭包函数, 你每次移动都会
// 重复的调用闭包函数,每次当 timeId 有值时,如果你在 小于 t的时间内重复调用了就会清除不执行函数
```
### Lodash 库 实现节流和防抖

```js
//节流
const box = document.querySelector('.box')
let i = 1
function mouseMove(){
box.innerHTML =i++
}
box.addEventListener('mousemove',_.throttle(mouseMove,1000))
—————————————————————————————
//防抖
const box = document.querySelector('.box')
let i = 1
function mouseMove(){
box.innerHTML =i++
}
box.addEventListener('mousemove',_.debounce(mouseMove,1000))
```

