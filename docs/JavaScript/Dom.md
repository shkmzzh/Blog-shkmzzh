---
title: Dom
date: 
tags:
- JS
---
<hr>

 **DOM**
- 浏览器呈现HTML及与HTML 交互的API

**DOM树**
- 浏览器将 HTML 文档内容以树状结构表现出来， 可以直观体现标签之间的关系

<img src="https://img-blog.csdnimg.cn/71effb9ebaf045b2a0d507e91ab9d457.png">

**DOM对象**

- 浏览器根据html标签生成的 JS对象
- 标签所有属性在对应的DOM对象上都可以找到
- 修改DOM对象属性会自动映射到标签上

 **页面渲染过程**

- 读取： 浏览器加载页面，代码从硬盘读取到内存
- 解析： 将内存中的代码解析成DOM树
- 渲染： 浏览器渲染引擎渲染DOM树，呈现页面


## Dom元素样式

### 单个样式-style方式

- 获取样式 ：`对象.style.样式属性`
- 修改样式 ：`对象.style.样式属性 = '值'`
- 注意事项 ： 多组单词时使用驼峰命名法
- 代码展示

```js
 // 修改样式属性  别忘了跟单位
box.style.width = "300px"
box.style.height = "200px"
            
// 多组单词时使用 驼峰命名法
 box.style.backgroundColor = "yellowgreen"
 box.style.border = '10px solid skyblue'
 box.style.borderTop= '10px dashed red'
            
 // 注意：style直接等于的方式就是行内式的效果
 box.style = 'background-color: green' //盒子行内式的样式会被替换
```

### 多个样式-className方式

- 获取类名 ：`元素.className`，得到类名相关字符串
- 设置类名 ：`元素.className = '类名'`
- 注意事项 ：
  - 不能直接使用`元素.class`获取类名， 需要使用`元素.className`获取
  - 设置类名时会覆盖原来的类名

```js
 <body>
        <div class="nav">手牵手一步两步三步四步望着天</div>
        <script>
            const div = document.querySelector("div")
            // 1. 获取类名 ：元素.className
            console.log(div.className) 

            // 2. 添加类名, 会覆盖原来的类名
            div.className = "box"
            div.className = "nav box"
        </script>
 </body>
```

### 多个样式-classList方式

- 获取类名: `元素.classList`，得到的是**伪数组**
- 新增类名: `元素.classList.add('类名')`
- 移除类名: `元素.classList.remove('类名')`
- 切换类名: `元素.classList.toggle('类名')` 切换:  有则移除,无则新增
- 判断类名: `元素.classList.contains('类名')` true:有类名    false:没有
- 两者区别：
  - className ：修改**会覆盖原类名**
  - classList ：修改不会覆盖原类名， 有自己的方法对类名操作更灵活
```js
    //1. 获取类名
    console.log(div.classList)
    
    //2.新增类名: 元素.classList.add('类名')
    div.classList.add("box")
    
    //3.移除类名:   元素.classList.remove('类名')
    div.classList.remove("box")
    
    //4.切换类名:   元素.classList.toggle('类名')
    div.classList.toggle('box') //  在有nav的基础上新增box
    div.classList.toggle('box') // 有box就删掉box
    
    //5.判断类名: 元素.classList.contains('类名')
    console.log(div.classList.contains('nav'));
    console.log(div.classList.contains('box'));
```
## 事件基础

### 事件监听
- DOM L0：`事件源.on事件 = 事件处理函数`
- DOM L2：`事件源.addEventListener(事件，事件处理函数)`
- 区别：
  - on方式重复绑定相同类型事件会覆盖，
  - addEventListener方式可绑定多次，拥有事件更多特性，推荐使用

```js
    <body>
        <button>点击</button>
        <script>
            const btn = document.querySelector("button")
            // 可以重复添加相同事件, 不会干扰
            btn.addEventListener("click", function () {
                alert("呦,写bug呐!")
            })
            btn.addEventListener("click", function () {
                alert("bug2")
            })

            // 不能重复添加相同事件, 最后添加的会覆盖前面添加的事件
            btn.onclick = function () {
                alert("加油哦!")
            }
            btn.onclick = function () {
                alert("不说了, 就是干")
            }
        </script>
    </body>
```

### 事件解绑

- 事件解绑: 取消元素绑定的事件
  - DOM  L0  事件解绑：  `事件源.on事件类型 = null`
  - DOM  L2  事件解绑：  `事件源.removeEventListener(事件类型, 事件处理函数)`
  - 注意:  L2  事件监听使用匿名函数的不能解绑

```js
<body>
    <button>点击</button>
    <script>
      const btn = document.querySelector("button")
      // L0 事件移除解绑
      btn.onclick = function () {
        alert("点击了1")
        btn.onclick = null
      }

      function fn() {
        alert("点击了2")
      }
      btn.addEventListener("click", fn)
      // L2 事件移除解绑
      // 注意: L2事件监听匿名函数的不能解绑
      btn.removeEventListener("click", fn)
    </script>
  </body>
```
## 事件类型
 ### 鼠标事件

> 鼠标事件：鼠标操作相关事件，如单击、双击、移入、移出
>
> 1. click： 单击
> 2. dblclick： 双击（必会引起单击事件）
> 3. mouseenter： 鼠标移入
> 4. mouseleave： 鼠标移出

### 焦点事件

> - focus：  获得焦点
> - blur：     失去焦点

### 键盘事件

> - keydown   键盘按下触发
> - keyup   键盘抬起触发
> - input    文本框输入触发
> - change 内容改变且失去光标

### 页面加载事件

- 介绍：老代码喜欢把 script 写在 head 中，这时候会先加载js,  导致无法获取DOM对象的情况

- 解决方案:  监听页面资源加载情况,  等待加载完毕后再执行相应代码

- 事件名:
> - `load`  ： 等待所有资源(图片、外联CSS和JS等)加载完毕时触发事件
> - `DOMContentLoaded`  ： 当初始的 HTML 文档被完全加载和解析完成之后触发，而无需等待样式表、图像等完全加载
> - DOMContentLoaded一般会比load快

### 元素滚动事件

> - 滚动事件: 滚动条在滚动时持续触发的事件
> - 应用场景: 把页面滚动到某个区域后执行任务，比如固定导航栏，比如显示返回顶部按钮
> - 事件名:   `scroll`

### 页面尺寸事件

> - 页面尺寸事件:  文档视图(页面窗口)调整大小时触发
> - 应用场景: flexible.js移动端适配原理
> - 事件名: `resize`

### 事件对象

- 事件对象:  绑定事件时内置的一个对象，记录了事件触发时相关信息，一般命名为e, ev, event

- 使用场景 可以判断用户按下哪个键，比如按下回车键可以发布新闻 可以判断鼠标点击了哪个元素，从而做相应的操作

- 事件对象语法:

  - 事件回调函数的`第一个形参`
  - 事件回调函数内部 `window.event `

- 常用事件对象信息:

  > 1. `e.type` 当前事件的类型
  > 2. `e.clientX/Y` 光标相对浏览器窗口的位置
  > 3. `e.offsetX/Y` 光标相于当前 DOM 元素的位置
## 事件流

- 事件完整执行过程中的流动路径
- 事件的执行并不是简单的触动元素就执行它对应的事件, 而是触发某个元素时, 会牵涉到他的父子元素的相应事件
- 当某个元素的事件被触发时，事件总是会先经过其祖先才能到达当前元素，然后再由当前元素向祖先传递，事件在流动的过程中遇到相同的事件便会被触发。
- 注意： 事件流只会在父子元素具有相同事件类型时才会产生影响

### 事件阶段

- 事件对象的属性，可以告知具体的事件阶段， 总共有3个

- 语法：`e.eventPhase`

  > - **1**  -捕获阶段   从父到子
  > - **2**  -目标阶段   真正触发事件的元素
  > - **3**  -冒泡阶段   从子到父

- 注意：

  1. 事件可以在捕获阶段被执行，也可以在冒泡阶段被执行
  2. `addEventListener` 第3个参数为  `true` 表示捕获阶段触发，`false` 表示冒泡阶段触发，默认值为 `false`

  <img src="https://img-blog.csdnimg.cn/db4e2e770c7d454790955635f77a6d28.png">



###  捕获阶段

- 事件捕获 : 当触发子元素事件时，从最顶级父元素，一级一级往里，父元素‘同名事件’会触发
- 执行规则： window->document->html->body->父元素->子元素  **从父到子**
- e.eventPhase阶段数值: **1**
- 默认情况下注册事件不显示捕获过程,  展示捕获过程的设置：
  - `元素.addEventListener('事件类型', 事件处理函数, true)`



### 冒泡阶段

- 事件冒泡 :  当触发子元素的事件时候，从子元素开始， 一级一级往外，父元素‘同名事件’会触发
- 执行规则:  子元素->父元素->body->html->document->window,   **从子到父**
- e.eventPhase阶段数值: **3**
- 只要注册事件默认就会有冒泡过程（其中一个原因是早期 IE 不支持捕获）
- 展示设置： 默认就会运行冒泡过程或者第三个参数为false
  - `元素.addEventListener('事件类型', 事件处理函数, false)`

### 事件委托

- 事件委托 : 把子元素要做的事情委托给父元素,  子元素不需要注册事件,  父元素注册一次事件即可
- 原理 : 事件冒泡
- 应用 ： 给动态新增元素注册事件
- 注意 :
  - 不能使用 this ： this指向父元素
  - 需要使用 e.target :   真正点击的子元素（事件触发源）

```html
<body>
    <button class="btn">点我新增一行li元素</button>
    <ul>
      <li>我是班长1</li>
      <li>我是班长2</li>
      <li>我是班长3</li>
      <li>我是班长4</li>
      <li>我是班长5</li>
      <li>我是班长6</li>
    </ul>
    <script>
      //需求: 点击页面每一个li元素(包括新增按钮产生的li)，文字颜色修改为红色
      document.querySelector(".btn").onclick = function () {
        document.querySelector("ul").innerHTML += `<li>我是动态新增li元素</li>`
      }

      // 1. 原始方法: 获取所有li分别注册事件, 新增添的没有注册过程导致无效果
      /*   let liList = document.querySelectorAll("li")
      for (let i = 0; i < liList.length; i++) {
        liList[i].onclick = function () {
          this.style.backgroundColor = "red"
        }
      } */

      // 2. 事件冒泡方法，点击任何li都会冒泡到ul触发ul的事件，所以只需要给ul注册即可
      const ul = document.querySelector("ul")
      ul.addEventListener("click", function (e) {
        console.log(this) // 指向父元素ul
        console.log(e.target) // 指向事件源
        e.target.style.backgroundColor = "red" // 对事件源设置样式
        console.log(e.eventPhase) // 展示事件流的阶段
      })
    </script>
  </body>
```

### 阻止事件流和默认行为

**阻止事件流**

- 冒泡容易导致事件影响到父级元素, 需要阻止事件冒泡, 把事件限制在当前元素内
- 语法：  `e.stopPropagation`
- 注意: 此方法可以阻断事件流动传播，冒泡阶段和捕获阶段均有效

**阻止默认行为**

- 阻止元素默认行为： 阻止 链接的跳转，表单域跳转
- 语法: `e.preventDefault()`



## 记录元素和页面相关数据的属性

### scroll家族-获取 被卷 的大小

- `scrollWidth` / `scrollHeight` : 获取元素'内容'区域高宽(包括padding在内)
- `scrollLeft`  / `scrollTop` : 获取元素内容往左、往上滚出去看不到的距离(记)

```js
<body>
    <div class="box">我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容</div>
    <script>
      let box = document.querySelector(".box")

       // 获取盒子内容高宽(包括padding)
      console.log(box.scrollWidth, box.scrollHeight)
      // 获取盒子内容滚动出去的高度
      console.log(box.scrollLeft, box.scrollTop)

      // 常配合scroll事件获取实时数据
      box.addEventListener("scroll", function () {
        console.log(box.scrollWidth, box.scrollHeight)
        console.log(box.scrollLeft, box.scrollTop)
      })

      // 获取页面滚动出去的高度
      window.addEventListener("scroll", function () {
        //console.log(document.querySelector("html"))
        //console.log(document.documentElement) // 获取html元素新写法

        console.log(document.documentElement.scrollTop)
      })
    </script>
  </body>
```

- 设置‘被卷’的位置
  - `scroll`属性是可读写的,  数值型不加单位
  - 或使用`scrollTo(x,y)`设置滚动距离
- 注意
  - 在scroll事件中,  scrollTop才能实时获取滚动部分数据
  - window没有scrollTop和scrollLeft,  只有scrollX和scrollY
  - 获取数据的语法是dom语法，不是css样式。 错误写法： `元素.style.scrollTop` 正确写法： `元素.scrollTop`

```js
  <script>
        // document.documentElement.scrollTop = 800
        document.documentElement.scrollTo(100,800)
        
        window.addEventListener("scroll", function () {
            // 必须写到scroll事件里
            const n = document.documentElement.scrollTop
            // 得到数字型 不带单位
            console.log(n)
        })
    </script>
```

### offset家族- 获取元素页面中的位置

- `offsetWidth` / `offsetHeight `

   :  获取元素的自身宽高, 包含宽高、padding、border

  - 注意: 获取的是可视宽高, 如果盒子是隐藏的, 获取结果为0

- offsetLeft  / offsetTop

   :  获取元素距离自己定位父级元素的左、上实际距离 (记)

  - 注意是只读属性，不能设置

```js
 <body>
    <div>
      <p></p>
    </div>
    <script>
      const div = document.querySelector("div")
      // console.log(div.offsetWidth, div.offsetHeight)
      console.log(div.offsetLeft, div.offsetTop)

      // 检测盒子的位置  最近一级带有定位的祖先元素
      const p = document.querySelector("p")
      console.log(p.offsetLeft, p.offsetTop)
    </script>
  </body>
```

### client家族-获取元素 可见部分 宽高

- 不包含边框，margin，滚动条等
- `clientWidth` / `clientHeight` : 可见部分大小, 不变(记)
- `clientLeft` / `clientTop` : 可见部分位置（就是左边框 和 上边框 宽度）
- 应用 :  flexible.js源码封装

```js
  <body>
    <div class="box">我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容 我有很多很多内容</div>
    <script>
      const box = document.querySelector(".box")
      // 3. client家族

      console.log(box.clientWidth, box.clientHeight)
      // console.log(box.clientLeft, box.clientTop)
    </script>
  </body>
```

###  获取位置：获取元素大小及相对于视口的位置

- `element.getBoundingClientRect() `

```js
<body>
  <div></div>
  <script>
    const div = document.querySelector('div')
    console.log(div.getBoundingClientRect())
  </script>
</body>
```

## DOM节点介绍

###  父节点

- 父节点: 返回当前DOM元素的父标签
- 语法:  `DOM对象.parentNode`
- 返回最近一级的父节点， 找不到返回为null

```js
<body>
    <div class="yeye">
      <div class="dad">
        <div class="baby">x</div>
      </div>
    </div>
    <script>
      const baby = document.querySelector(".baby")
      console.log(baby) // 返回dom对象 baby
      console.log(baby.parentNode) // 返回dom对象 dad
      console.log(baby.parentNode.parentNode) // 返回dom对象 yeye
    </script>
  </body>
```

### 子节点

- 子节点：元素的所有子内容,  包括子标签、文本节点（空格、换行）、注释节点等（重点）
- 注意:  子节点包括了文本和注释等, 但是children语法获取的只有元素节点
- 语法:
  - 所有元素子节点: `DOM对象.children ()`，得到伪数组

```js
<body>
    <div>
      <p>1</p>
      <h2>2</h2>
      <span>3</span>
      <ul>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
    <script>
      const div = document.querySelector("div")
      //  得到div所有子元素
      console.log(div.children) // [p, h2, span, ul]
      //  得到div里面ul的所有子元素
      console.log(div.children[3].children) // [li, li, li]
    </script>
  </body>
```

###  兄弟节点

- 概念： 当前节点在结构上的上一个和下一个节点
- 上一个兄弟节点: `DOM对象.previousELementSibling`
- 下一个兄弟节点: `DOM对象.nextElementSibling`

```HTML
  <body>
    <div>
      <p>1</p>
      <h2>2</h2>
      <span>3</span>
    </div>
    <script>
      const h2 = document.querySelector('h2')
      console.log(h2.previousElementSibling) // 上一个兄弟
      console.log(h2.nextElementSibling) // 下一个兄弟
    </script>
  </body>
```



## 节点增删改查

### 新建节点

- 概念： 在js中创造节点，不会在页面显示
- 使用场景 :  使用js给页面添加元素,  例如点击发布按钮可以新增一条信息
- 新建方法：
  - 创建节点 : 使用js创建新节点 `document.creatrElement(元素类型)`
  - 克隆节点 : 复制页面已有节点,  默认参数是false `DOM.cloneNode(true)`  ：包含后代节点 `DOM.cloneNode(false)`：不包含后代节点

```js
<body>
    <div><a href="#">我是div</a></div>
    <script>
      // 1. 创建节点
      const span = document.createElement("span")
      span.innerHTML = "我是span"
      console.log(span)


      const div = document.querySelector("div")
      // 2. 克隆节点
      const div1 = div.cloneNode(true)
      console.log(div1)

      const div2 = div.cloneNode()
      console.log(div2)
    </script>
  </body>
```

###  追加节点

- 概念： 将节点追加到页面上成为DOM元素,   渲染到页面上
- 使用场景 :  使用js给页面添加元素,  例如点击发布按钮可以新增一条信息
- 追加方法:
  - `DOM对象.appendChild(节点)`                 作为DOM元素的最后一个子元素
  - `DOM对象.insetBefore(节点, DOM2)`    作为DOM元素的子元素,  位置在DOM2的前面

```js
 <body>
    <div>我是div</div>
    <script>
      const div = document.querySelector("div")
      const span = document.createElement("span")
      span.innerHTML = "我是span"

      // 1  追加最后一个子元素
      div.appendChild(span)
      // 注意: 若节点已经追加到页面上, 再次追加会删掉原追加节点重新添加, 可以实现转移追加位置
      document.documentElement.appendChild(span)

      // 2  指定位置追加子元素
      const h2 = document.createElement("h2")
      h2.innerHTML = "我是h2"
      div.insertBefore(h2, span)
      
    </script>
  </body>
```



###  删除节点

- 概念：使用JS方法删除DOM结构上对应的元素
- 语法:   `父DOM.removeChild(要删除的元素)`
- 注意：
  - 在JS原生DOM操作中，删除元素必须通过父元素删除
  - 如不存在父子关系则删除不成功
  - 删除节点和隐藏节点（display:none）区别： 隐藏是节点页面看不见但结构仍存在，删除是结构中不再有此节点

```js
  <body>
    <button>我是按钮</button>
    <ul>
      <li>没用了1</li>
      <li>没用了2</li>
      <li>没用了3</li>
    </ul>
    <script>
      const button = document.querySelector("button")
      const ul = document.querySelector("ul")

      // 删除节点  父元素.removeChlid(子元素)
      button.addEventListener("click", function () {
        ul.removeChild(ul.children[0])
      })
    </script>
  </body>
```

## 重绘重排

- 页面渲染流程
  1. 解析html绘制DOM树
  2. 解析css绘制CSS树
  3. DOM和CSSOM组合生成render tree（渲染树）
  4. 在渲染树的基础上进行布局，计算每个节点的几何结构, 把每个节点绘制到屏幕上
- 重绘(repaint)
  - 元素外观改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制
  - 外观属性包括界面(背景色...)、文字等
- 重排(reflow)
  - 也叫回流, 当渲染树的一部分更新并且节点的尺寸发生了变化，浏览器会重新构造渲染树。
  - 添加或删除可见的DOM元素, 元素位置、尺寸、内容改变等
- 注意:
  - DOM发生改变的时候触发重排，使DOM重新排列
  - 重绘不一定会重排，但重排一定会发生重绘
  - 重绘和重排都会耗费浏览器的性能，尽量避免。

```HTML
    <script>
            // 创建dom元素并不会影响页面, 不会发生重排重绘
            const div = document.createElement("div")

            // 追加dom元素改变了页面布局, 发生重排重绘
            document.body.appendChild(div)

            // 只修改元素的背景色不影响页面布局, 发生重绘没有重排
            div.style.backgroundColor = 'red'
    </script>
```













