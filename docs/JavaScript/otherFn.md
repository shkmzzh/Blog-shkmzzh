---
title: 其他常用方法
date: 
tags:
- JS
---

## Math数学对象

[参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

```js
<script>
            // 1. 生成随机数, [0-1)包括0不包括1
            console.log(Math.random())

            //2. 向上取整
            console.log(Math.ceil(9.1))

            //3. 向下取整
            console.log(Math.floor(9.9))

            //4. 找最大最小数
            console.log(Math.max(1, 8, 4, 2))
            console.log(Math.min(1, -8, 4, 2))

            //5. 幂运算  10的3次幂运算
            console.log(Math.pow(10, 3))

            //6. 绝对值
            console.log(Math.abs(-10.01))
            console.log(Math.abs(10.01))
      
    </script>
```

## Date日期对象

[参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

```js
 <script>
          // Date对象 : 日期对象， 需要先创建当前实例对象
          let d = new Date()

          //1. 获取当前日期和时间
          console.log(d) // 当前日期对象
          console.log(d.toString()) //当前日期字符串
          console.log(d.toLocaleString()) // 转为本地时间格式字符串

          //2. 获取年份
          console.log(d.getFullYear())

          //3. 获取月份(0-11)
          console.log(d.getMonth())

          //4. 获取当前几号(1-31)
          console.log(d.getDate())

          //5. 获取星期几(0-6, 星期天为0)
          console.log(d.getDay())

          //6. 获取时间
          console.log(d.getHours(), d.getMinutes(), d.getSeconds())

          //7. 时间戳：1970年1月1日00时00分00秒起至今的毫秒数，是一种特殊的计量时间的方式。
          //7.1 获取方法一
          console.log(d.getTime())
          
          //7.2 获取方法二
          console.log(+new Date())
            
          //7.3 获取方法三
          console.log(Date.now())
  </script>
```
## Number方法

### Number.prototype.toFixed()

**`toFixed()`** 方法设置保留小数位的长度。(返回值是一个字符串)

**参数**：小数点后数字的个数；介于 0 到 20（包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0

```js
console.log(0.004.toFixed(2)) // "0.00"
console.log(123.456.toFixed(2)) // "123.46"
```

## Object方法


- Object 是内置的构造函数，用于创建普通对象。

- 常用的三个静态方法（静态方法就是只有构造函数Object可以调用的）

> Object.keys()   // 获取对象所有的键，返回一个数组
>
> Object.values()  // 获取对象所有的值，返回一个数组
>
> Object.assign()  //拷贝对象

### Object.keys()

`Object.keys()` 静态方法获取对象中所有属性（键）

```js
const o ={name : '坤坤',age : 18}
获得对象的所有键,并且返回是一个数组
const arr = Object.keys(o)
console.log(arr) // ['name','age']
```

*注意*：返回的是一个数组

### Object.values()

`Object.values` 静态方法获取对象中所有属性值

```js
const o ={name : '坤坤',age : 18}
获得对象的所有键,并且返回是一个数组
const arr = Object.values(o)
console.log(arr) // ['坤坤','18']
```

*注意*：返回的是一个数组

### Object.assign()

`Object.assign`静态方法常用于对象拷贝

```js
// 给 o 新增属性
const o ={name : '坤坤',age : 18}
Object.assign(o,{gender:'女'})
console.log(o) // {name:'坤坤',age:18,gender:'女'}
```

### Object.enrties()

**`Object.entries()`**方法返回一个给定对象自身可枚举属性的键值对数组,（如果想拿到其的键和值可以用for of方法遍历）

**注**：返回的是一个数组

```js
const object1 = {
  a: 'somestring',
  b: 42
};

console.log(Object.entries(object1))
//Array [Array ["a", "somestring"], Array ["b", 42]]

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}
// expected output:
// "a: somestring"
// "b: 42"
```


