# Es6模块化

## ES6模块化 - 简介

### 引言

- 在 `ES6` 模块化标准出来之前，JavaScript出现了多种模块化方案，`AMD`，`CMD`，`CommonJS` 等。 由于这些方案都有一定的差异性与局限性，例如

- `AMD`，`CMD`  适用于浏览器端的JavaScript
- `CommonJS`   适用于服务器端的JavaScript

- 都没能做到一统整个市场。太多的模块化给开发者增加了学习的难度与开发成本。因此官方的 `ES6` 模块化标准诞生了。

- 放眼将来，只要是JavaScript中就可以使用 `ES6` 模块化。

### Node.js中启用 ES6模块化

- Node.js中为了兼顾以前的模块化方案，Node.js中并没有一刀切，而是让老的方案与新的方案并行一段时间，开发可以在package.json中通过配置自行决定是否启用 `ES6模块化`。 :point_right: 要求Node.js版本要 >= 13.0 `package.json`

<img src="https://img-blog.csdnimg.cn/e5657a19f3e940e1a9458bcc65e23b64.webp">

### ES6 模块化基本语法

相关概念并没有变，一个JS文件就是一个独立 的模块。 模块导出使用 `export` 关键字	[传送门:mdn-export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export) 导入模块使用 `import` 关键字	[传送门:mdn-import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

### 小结

1. Node.js中默认的模块化方案是

   > `CommonJS`

2. Node.js中如何启用ES6模块化

   > package.json

```javascript
{
  "type":"module",
}
```

1. ES6 导出、导入语法是什么

   > export 关键字 import 关键字

## ES6模块化 - 按需导出/导入

### 导出

- 语法

  > export { 标识符, 标识符, ... } 这里的 标识符，指定的是变量名、对象名、方法名、数组名 ...

- 示例

```javascript
const v = 'smart'

const arr = [10,20,30]

function say(){
 console.log('hello');
}

const car = {
 price: '500w',
 brand: 'Rolls Royce'
}

// 按需导出
export {arr, say}
// 按需导出
export {v, car}

// 缺省导出
export default say
```

### 导入

- 语法

  > import  { `接收名`, `接收名`, ...}  from  `模块` :point_right: 接收名，默认与导出名要相同，如果不相同则报错。

- 示例：

```javascript
import {arr,car} from './b.js'
console.log(arr);
console.log(car);

import o from './b.js'
console.log(o);
```

### 别名导出/别名导入

> 无论导出时还是导入时都可以使用 `as 别名`，重新设置导出新名，或导入后的新名

- 别名导出

```javascript
const v = 'smart'

const arr = [10,20,30]

function say(){
 console.log('hello');
}

const car = {
 price: '500w',
 brand: 'Rolls Royce'
}

// 导出时以新名导出
export {v as myv, arr, say, car}
```

- 别名导入

```javascript
// 导入时重新命名
import {myv, arr,car as mycar, car as youcar} from './b.js'
console.log(myv);
console.log(mycar);
console.log(youcar);
```

### 小结

1. 按需导出、导入 易混点

   > 都需要使用 {}

2. 按需导出可以写几次

   > 任意次

3. 导出/导出时如何使用别名

   > as 别名

## ES6模块化 - 缺省导出/导入

### 缺省导出

- 语法

  > export default `导出内容`

- 示例

```javascript
const v = 'smart'

const arr = [10,20,30]

function say(){
 console.log('hello');
}

const car = {
 price: '500w',
 brand: 'Rolls Royce'
}

export arr

// 缺省输出
// export default car

// 缺省输出
export default {
 v,
 arr,
 say,
 car
}
注意: 一个文件只能有一个缺省导出。
```

### 导入(对缺省的导出进行导入)

- 语法

  > import `接收名` from `模块` 缺省导出可以随意命名。

- 示例

```javascript
import o from './b.js'

console.log(o);
```

### 小结

1. 缺省导出语法

   > export default `导出内容`

2. 对象缺省的导出进行导入语法

   > import `接收名` from `模块`

3. 一个文件能有几个缺省导出

   > 只能有1个

4. 按需导出，缺省导出可以同时存在么

   > 可以

5. 如何选择 缺省导出 与 按需导出

   > 看需求 一般只有一个导出使用缺省导出，如果多个就使用按需导出。

# ES6模块化 - 全部导入

全部导入所有的内容。

导入

- 语法

  > import  *  as  `接收名`  from  `模块` 将模块内所有的导出都保存到 接收名中。* as 是固定语法

- 示例：

  - `b.js` 导出

```javascript
const v = 'smart'

const arr = [10,20,30]

function say(){
    console.log('hello');
}

const car = {
    price: '500w',
    brand: 'Rolls Royce'
}

// 按需导出
export {arr, say}
// 按需导出
export {v, car}

// 缺省导出
export default say
- `a.js` 导入
// 全部导入
import * as all from './b.js'

console.log(all);
console.log(all.v);
console.log(all.arr);
console.log(all.car);
console.log(all.say);
```

## ES6模块化 - 直接导入

有时候我们只希望执行某个模块中的代码，并不需要得到模块中向外共享的成员，可以选择直接导入。

### 直接导入

- 语法

  > import  `模块` 直接调用导入的模块。

- 示例：

  - `b.js` 模块

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}   
- `a.js`  直接调用导入模块
// 直接调用导入模块
import './b.js'
```

## ES6模块化 - 浏览器端

到目前为止测试的环境基本都是`Node.js`，但是作为前端开发者，咱们编写的代码大部分情况下运行的为止是浏览器，刚刚学习的`ES6`的模块化语法，在浏览器中可以使用吗？ [传送门：MDN-import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

### 语法

- 为script标签设置 type="module" 属性
- html文件必须通过服务器访问。

### 示例

- `a.html`

```html
<html>
    <head>
        
    </head>
    <body>
        <script type="module">
            // es6 模块语法
            import './b.js'

        </script>
    </body>
</html>
```

- `b.js`

```javascript
for(let i=0;i<5;i++){
    let oH3 = document.createElement('h3');
    oH3.innerHTML = i;
    document.body.appendChild(oH3)
}
```

**注意**：必须要通过浏览器来访问，本地访问的话，在 a文件夹访问 b文件夹会造成跨域。

- 可以通过`vscode`的 *live Server*  插件通过浏览器来访问，访问的就会是同一个ip，不会造成跨域

### 兼容性

<img src="https://img-blog.csdnimg.cn/0735665dcefc4269913f85be8e632625.webp">

