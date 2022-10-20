---
title: Bom
date: 
tags:
- JS
---
## BOM概念

 BOM  浏览器对象模型(Browser Object Model)

| DOM                          | BOM                                          |
| ---------------------------- | -------------------------------------------- |
| 文档对象模型                 | 浏览器对象模型                               |
| 将文档当作一个对象来看       | 将浏览器当作一个对象看待                     |
| 顶级对象是document           | 顶级对象是window                             |
| 主要学习   操作页面元素** ** | 主要学习   浏览器窗口交互                    |
| 是W3C标准规范                | 是浏览器厂商在各自浏览器上定义的，兼容性较差 |

注意:

- let定义在全局作用域中的变量、函数都会变成window对象的属性和方法
- window对象下的属性和方法调用的时候可以省略window

```js
    <script>
      console.log(document === window.document) //true

      // 以下两种写法都是一样效果
      document.querySelector()
      window.document.querySelector()

      let num = 10
      console.log(window.num)

      function fn() {
        console.log(11)
      }
      window.fn()
    </script>
```

###  定时器

- 定时器 ：每隔一段时间可以自动执行代码的方法

- 场景：网页中的倒计时

- 语法:

  - 设置定时器 ：

    ```
     let 变量名 = setInterval(函数, 间隔时间)
    ```

    - 回调函数不需要加括号
    - 间隔时间为毫秒数

  - 清除定时器 ： `clearInterval(变量名)`

- 注意 ：

  - 注意清除的是下一次执行的函数, 当前次还要执行完
  - 定时器会返回数值类型,  代表了当前页面第x个定时器

```js
       <script>
      /*   setInterval(function () {
                console.log(1)
            }, 1000) */

      /*  let i = 0
            let n = setInterval(function () {
                i++
                if (i >= 5) {
                    clearInterval(n) // 注意清除的是下一次执行的函数, 当前次还要执行完
                }
                console.log(i)
            }, 1000) */

      // 定时器会返回数值类型, 代表了当前页面第x个定时器
      console.log(setInterval(function () {}, 1000)) // 1
      console.log(setInterval(function () {}, 1000)) // 2

      let n = setInterval(function () {}, 1000)
      console.log(n) // 3
        </script>
```



### 延时器

- 概念:   js内置的可以延迟执行的函数，延迟函数只执行一次
- 语法:
  - 设置: `let timer = setTimeout(回调函数, 等待的毫秒数)`
  - 清除: `clearTimeout(timer)`
- 注意：
  - 执行顺序：延时器需要等待,所以后面的代码先执行
  - 延时器只会执行一次, 一般不需要清除,   定时器会不断执行, 需要手动清除

```js
    <script>
      console.log("111")
      // 设置延时器
      let timer = setTimeout(function () {
        console.log("时间到了")
      }, 2000)
      console.log("222")

      // 清除延时器
      //clearTimeout(timer)
    </script>
```
## js执行机制

- 对比以下两段代码的结果， 思考代码的执行顺序

<img src="https://img-blog.csdnimg.cn/f2621ac48beb45c8addc579e1d697c82.png">

###  单线程

- 单线程:
  - 同一时间只能做一件事,  多个任务时需要排队让线程依次执行

```js
    <script>
      console.log(1)
      console.log(2)
      console.log(3)
      console.log(4)
    </script>
```

- 为什么是单线程:
  - JS主要功能是处理用户交互及操作DOM
  - 假设多线程， 一个线程添加DOM元素，另一个线程删除元素， 两个操作对立无法定义结果
  - 所以js是单线程的， 保证了任务会有先后顺序不会同时发生
- 缺陷:
  - 执行时间过长，页面渲染不连贯，页面渲染加载阻塞
- 解决方案：** **
  - 利用多核 CPU 的计算能力, H5 提出 Web Worker 标准
  - 在此基础上js设计了同步/异步任务解决运行效率问题
  - JavaScript 语言仍是运行在单线程上的，Web Worker只是浏览器（宿主环境）提供的能力

###  同步和异步

- 同步：
  - 前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的
  - 举例：做饭要完成烧水切菜炒菜任务，同步是水开了再切菜、炒菜，等水开期间不做其他事情
- 异步
  - 某个任务花费很长时间，在处理这个任务同时就可以处理其他任务
  - 举例：做饭要完成烧水切菜炒菜任务，在烧水的同时切菜，炒菜
  - 异步任务一般由回调函数完成，常见异步任务：
    1. 普通事件，如 click、resize 等
    2. 资源加载，如 load、DOMContentLoaded 等
    3. 定时器，包括 setInterval、setTimeout 等
- 本质： 流水线上各个流程的执行顺序不同

```js
    <script>
      console.log(1)
      console.log(2)
      setTimeout(function () {
        console.log(3)
      }, 1000)
      console.log(4)
    </script>
```

###  js执行栈和任务队列

- 执行栈：    主线程上，同步任务一起形成了执行栈
- 任务队列：不在主线程上， 异步任务一起形成了任务队列（消息队列）
- 

<img src="https://img-blog.csdnimg.cn/5296ee0ef31b4e1c8c3c14973fc3e9c1.png">

- 执行步骤： 主线程才是真正执行任务的地方
  1. 主线程优先处理执行栈中的同步任务
  2. 遇到异步任务就放入任务队列中， 等待任务队列通知主线程
  3. 执行栈中所有同步任务执行完毕后，主线程读取任务队列的通知
  4. 已经准备好的异步任务此时会结束等待状态，进入执行栈开始执行

###  事件循环(event loop)

- 主线程不断重复的获取任务、执行任务、再获取、再执行，这种机制被称为事件循环
- <img src="https://img-blog.csdnimg.cn/a38a3169974e4ca086f75dceb80d187f.png">

<img src="https://img-blog.csdnimg.cn/f7fb2231c59040a898de6885f4e90db6.png">

```js
    <script>
      console.log(1)
      document.addEventListener("click", function () {
        console.log(4)
      })
      console.log(2)
      setTimeout(function () {
        console.log(3)
      }, 3000)
    </script>
```

## BOM对象

### location对象

- 作用:  拆分并保存了 URL 地址的各个组成部分的一个BOM对象

- > 常用属性和方法：
  >
  > - `href` 属性：获取完整的 URL 地址，对其赋值时用于地址的跳转
  > - `search` 属性：获取地址中携带的参数，符号 ？后面部分
  > - `hash` 属性：获取地址中的啥希值，符号 # 后面部分
  > - `reload` 方法： 刷新当前页面，传入参数 true 时表示强制刷新

```js
  <body>
    <form action="">
      <input type="text" name="username" />
      <input type="password" name="pwd" />
      <button>提交</button>
    </form>

    <a href="#/my">我的</a>
    <a href="#/friend">关注</a>
    <a href="#/download">下载</a>
    <button class="reload">刷新</button>
    
   <script>
      console.log(location)
      console.log(location.href)
      console.log(location.search)
      console.log(location.hash)

      // 经常用 href 跳转页面
      location.href = "http://www.baidu.com"
      
      const reload = document.querySelector(".reload")
      reload.addEventListener("click", function () {
        // f5 刷新页面
        //location.reload()
        // 强制刷新  ctrl+f5
        location.reload(true)
      })
    </script>
  </body>
```



###  navigator对象

- 作用： 记录浏览器自身相关信息
- 常用属性:  `navigator.userAgent`可以检测浏览器的版本及平台

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <script>
      // 检测 userAgent（浏览器信息）
      !(function () {
        console.log(navigator)
        const userAgent = navigator.userAgent

        // 验证是否为Android或iPhone
        console.log(userAgent.match(/(iPhone\sOS)\s([\d_]+)/))
        console.log(userAgent.match(/(Android);?[\s\/]+([\d.]+)?/))
        const android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
        const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/)

        // 如果是Android或iPhone，则跳转至移动站点
        if (android || iphone) {
          location.href = "http://m.itcast.cn"
        }
      })()
    </script>
  </head>
  <body>
    这是pc端的页面
  </body>
</html>
```

###  history对象

- 作用：包含用户（在浏览器窗口中）访问过的 URL。

- > 常用属性和方法：
  >
  > - `length`： 返回历史列表中的网址数
  > - `back()` ： 加载 history 列表中的前一个 URL
  > - `forward()`：加载 history 列表中的下一个 URL
  > - `go()`： 加载 history 列表中的某个具体页面

```js
<body>
    <button class='forward'>前进</button>
    <button class='back'>后退</button>
    <script>
      const forward = document.querySelector(".button")
      const back = document.querySelector(".button")
      forward.addEventListener("click", function () {
        // 前进一步
        history.forward()
        // history.go(1)
      })
      
      back.addEventListener("click", function () {
        // 后退一步
        history.back()
        // history.go(-1)
      })
    </script>
  </body>
```



## localStorage本地存储

###  本地存储-基本数据类型

- 概念：一种web存储方式, 将数据存储到浏览器, 浏览器窗口关闭后数据不会丢失。

- 具体条件:

  - 在相同协议、主机名、端口下，可以读取/修改到同一份localStorage数据
  - 默认大小为5M左右

- 语法：

  > - 存数据: ` localStorage.setItem('键', '值')`
  > - 取数据:  `localStorage.getItem('键')`
  > - 改数据:  `localStorage.setItem('键', '新值')`
  > - 删数据:  `localStorage.removeItem('键')`

- 注意:

  - 增删改查的键值对都要用引号包裹
  - 本地存储只能存储字符串类型数据

```js
 <script>
      // 1. 存  'uname': 'pink老师'
      localStorage.setItem("uname", "pink老师")

      // 2. 取  注意引号
      console.log(localStorage.getItem("uname"))

      // 3. 改  存数据时已经存在相同键, 就是修改值
      localStorage.setItem("uname", "red老师")

      // 4. 删  只删除名字
      localStorage.removeItem("uname")

      // 我要存一个年龄
      // 注意: 本地存储时, 非字符串类型会自动转为字符串
      localStorage.setItem("age", 18)
      console.log(localStorage.getItem("age"))
      console.log(typeof localStorage.getItem("age"))
 </script>
```

### 本地存储-复杂数据类型

- localStorage:  无法直接存储复杂数据类型
- 解决方案:
  1. 存储时将数据转为JSON字符串： `JSON.stringify(对象)`
  2. 取出时把JSON字符串转为对象：`JSON.parse(JSON字符串）`

```js
  <script>
      const obj = {
        uname: "pink老师",
        age: 18,
        gender: "女",
      }

      // 直接无法存储
      // localStorage.setItem("obj", obj) // [object object]
      // console.log(localStorage.getItem("obj")) // [object object]

      // 1. 把对象转为 JSON字符串   JSON.stringify(数据)
      console.log(JSON.stringify(obj)) // 得到JSON对象, 属性和值都有双引号{"uname":"pink老师","age":18,"gender":"女"}
      localStorage.setItem("obj", JSON.stringify(obj))

      // 2. 把JSON字符串转换为 对象
      const str = localStorage.getItem("obj")
      console.log(str)
      console.log(JSON.parse(str)) // 转为对象
    </script>
```

### sessionStorage-本地存储

- > 特性：
  >
  > - 生命周期为关闭浏览器窗口
  > - 在同一个窗口(页面)下数据可以共享
  > - 以键值对的形式存储使用
  > - 用法跟localStorage 基本相同，大小也5M左右
