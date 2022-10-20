---
title: vue内置指令
date: 
tags:
- Vue
---

[官网传送门](https://cn.vuejs.org/)

> Vue 是动态构建用户界面的渐进式 JavaScript 框架
>
> Vue 借鉴 Angular 的模板和数据绑定技术，React 的组件化和虚拟 DOM 技术

## 插值语法

```vue
 <!-- 变量用法 -->
 <div>今天天气怎么样?{{txt}}</div>
 <!-- 对象用法 -->
 <div>姓名?{{obj.name}}</div>
 <!-- 三元表达式用法 -->
 <div>性别?{{obj.name?"男":"女"}}</div>
```

```js
data() {
  return {
     txt: "这是一个寂寞的天！",
     obj: {
       name: "坤坤",
       sex: "女"
     }
  }
}
```

## v-text指令（类似于innerText）

官网地址：https://v2.cn.vuejs.org/v2/api/#v-text

**用法**： v-text有二种用法，里面的值都可使用一句话的表达式，如 xxx,   xxx+123   ,xxx?"1":"2"   obj.xxx等一句话简短表达式（变量，基本运算，三元表达式）

- v-text=“msg”  ，它会替换当前所在标签里的所有内容，并将msg内容以文本形式显示在标签里，和innerText类似

```js
<!-- 加法运算表达式 -->
<div v-text="msg+123+'xxx'">
--------------------------------
data:{
msg: "第一次使用v-text",
}
```

## v-html指令（类似innerHTML）

- **功能：** v-html和v-text非常相似，会替换当前所在标签的内容，并以html形式展示出来。

- 注：常用于富文本（带有标签元素的字符串如：`<p style="color:red">我是v-html</p>`）

- [官网地址](https://v2.cn.vuejs.org/v2/api/#v-html)

```js
<div v-html="msg"></div>
--------------------------------
 data: {
 txt: "<h1>今天天气很好！</h1>" //这里就是一个富文本，带有标签的字符串
 }
```

## v-model指令

### 基本用法

[官网地址](https://v2.cn.vuejs.org/v2/guide/forms.html)

**用法：** 例:`<input type="text" v-model="msg">`

**功能：** v-model能够实现表单元素值的双向绑定（注：适用范围为：表单元素如：*input*,*textarea*,*select*等）

- 双向绑定通过下面demo有一个很详情的显示，
  - 初始时，input框的值是通过v-model取到了msg的值 ，实现了值的获取
  - 后面，当input框的值改变的过程中，也会影响到msg值的改变从而实现p标签里内容的改变
  - 所谓双向绑定就是msg与input框的值不分彼此，不管哪一个变化 ，另一个都会跟着变。

```js
 <!-- 这里有二个过程来说明这个双向绑定
1：刚开始一打开页面，msg的值通过v-model传递给了input框，让input框显示了hello,这是一个取值过程
2：后面当input框值输入改变时，通过v-model,msg的值也会随之改变，这是一个对msg传值的过程
          在取值与传值 二个过程中，v-model实现了双向绑定        
 -->

<input type="text" placeholder="请输入内容" v-model="msg">
<p>请输入内容：{{msg}}</p>
--------------------------------
data: {
msg: "hello"
}
```

### v-model的修饰符

```vue
<表单元素 v-model.修饰符="数据"></表单元素>
```

- **.number**：
  - 默认情况下，输入的内容拿到的都是字符串，如果做相加会变成拼接，所以可以用这个修饰符转成数字
  - 把输入的内容转换为数值类型（Number类型）

```vue
如果在input输入数字用 .number来修饰 v-model的话需要将 将type改为number
<input type="number" v-model.number='10'/>
```

- **.trim**：
  - 去除首尾空格
- **.lazy**：
  - 加了.lazy 要等输入完才会改变数据的值
    - v-model默认情况下是一边输入一边就会改变数据的值
    - 什么时候是输入完了？按回车或者失去焦点都是输入完了
- 可以同时使用多个，没有顺序之分

### v-model 语法糖

语法糖：v-model本质上是 value属性和input事件的一层包装

v-model的作用：提供数据的双向绑定

- 数据发生了改变，页面会自动变  v-bind:value
- 页面输入改变 ，   数据会自动变化  v-on:input

v-model是语法糖， v-model等价于 给一个input框提供了 :value属性以及 @input事件

很显然如果每次使用input框，都需要提供value和input事件，比较麻烦，所以使用v-model

```vue
<template>
  <div>
    <input type="text" :value="msg" @input="msg = $event.target.value">
      
    <input type="text" v-model="msg"> //使用v-model可以进行简写
  </div>
</template>
```

**给组件使用**

我们经常遇到一种场景：

1. 父组件提供一个数据给子组件使用（父传子）
2. 子组件又需要修改父组件传过来的这个数据，所以需要子传父把值传给父组件。

这种场景可以使用v-model进行简写。



- 1.定义组件的时候，注意接收的值叫value， 子传父触发的事件叫 input

```vue
<template>
  <div>
    <h3>我是子组件</h3>
    <div>我的金钱{{value}}</div>
    <button @click="add">搬砖</button>
  </div>
</template>

<script>
export default {
props:[value],
methods:{
  add(){
    this.$emit('input',this.value+1)
  }
}
}
</script>
```

2.父传子给子组件传递value属性和input事件

```vue
<demo :value="money" @input="money=$event"></demo>
使用v-model语法糖简写
<demo v-model="money"></demo>
```

**注意**

v-model语法糖默认规定，属性名必须为 value 事件名必须为 input

但是假如我们想改变的话，可以在 model中配置如下语句

```js
以下代码在子组件中配置
model:{ prop:'value',event:'input' }
prop:v-model时的传入属性名
event:v-model时绑定的方法名
```

## 事件绑定指令 v-on

[官网地址](https://v2.cn.vuejs.org/v2/guide/events.html)

### v-on 基础用法

```vue
<p>count的值：{{ count }}</p>
<button v-on:click="add">+1</button>

<!-- v-on 缩写形式 -->
<button @click="add">+1</button>
data() {
  return {
    count: 1
  }
},
methods: {
  add() {
    this.count++
  }
}
```

### 事件参数对象

如果事件处理函数没有传参，则默认会传一个时间参数对象 `$event` ，通过它可以获取触发事件的元素，并进行相关操作。

```js
methods: {
  add(e) {
    e.target.style.backgroundColor = 'red'
    this.count++
  }
}
```

如果事件处理函数传递参数了，则默认的 `$event` 会被覆盖，需要手动进行传递。

```js
<button @click="add(2, $event)">+1</button>
methods: {
  add(step, e) {
    e.target.style.backgroundColor = 'red'
    this.count += step
  }
}
```

值得注意的是，在父组件接收子组件传递过来的值时子组件的值会存储在$event中

```vue
<Father @son="getNum"></Father>
在这里我们并不需要用一个参数来接收子组件传递过来的值,它默认存储在了$event中,
所以我们直接在父组件的方法中接收参数就好了
getNum(num){
console.log(num)
}
```

### 事件修饰符

| 事件修饰符   | 说明                                                   |
| ------------ | ------------------------------------------------------ |
| **.prevent** | 阻止默认行为，如 a 链接跳转、表单提交                  |
| **.stop**    | 阻止事件冒泡                                           |
| .once        | 绑定的事件只触发 1 次                                  |
| .capture     | 以捕获模式触发事件处理函数                             |
| .self        | 只有在 `event.target` 是当前元素自身时触发事件处理函数 |
| .passive     | 事件的默认行为立即执行，无需等待事件回调执行完毕       |

```vue
<a href="www.baidu.com" @click.prevent="fn">阻止链接跳转</a>

<div @click.stop="handleClick">阻止事件冒泡</div>

<!-- .passive ：如 `onwheel` 鼠标滚轮事件，是先执行事件的回调再进行滚动。 -->

如果回调比较耗时，那么会等一段时间才发生滚动。 添加 .passive 后，则先进行滚动再执行回调。
```

### 按键修饰符

1. 1.Vue 中常用的按键别名：

- 回车 => enter
- 删除 => delete (捕获“删除”和“退格”键)
- 退出 => esc
- 空格 => space
- 换行 => tab (特殊，必须配合 keydown 去使用)
- 上 => up
- 下 => down
- 左 => left
- 右 => right

1. 2.Vue 未提供别名的按键，可以使用按键原始的 `key` 值去绑定，但注意要转为 kebab-case（短横线命名）
2. 3.系统修饰键（用法特殊）：ctrl、alt、shift、meta（即 win 键）

- 配合 keyup 使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
- 配合 keydown 使用：正常触发事件。

1. 4.可使用 keyCode 去指定具体的按键，此法不推荐，因为 keyCode 以后可能废除
2. 5.`Vue.config.keyCodes.自定义键名 = 键码` ，可以去定制按键别名

```vue
<input type="text" @keyup.enter="submit" />
<input type="text" @keyup.esc="back" />
<input type="text" @keydown.tab="showInfo" />
<input type="text" @keyup.caps-lock="showInfo" />

<input type="text" @keyup.huiche="showInfo" />
<input type="text" @keyup.13="showInfo" />
<script>
  Vue.config.keyCodes.huiche = 13
</script>
```

## v-bind指令

### 基本用法

[官网地址](https://v2.cn.vuejs.org/v2/api/#v-bind)

```vue
v-bind:属性名="属性值" 
简写方法
:属性名="属性值"
//示例
<img v-bind:src="imageSrc" :title="msg">
```

**功能**： 绑定相应属性值后，可以动态控制该属性值，通过控制该属性值让页面满足不同的需求效果。

### 对象用法

[对象用法介绍网址]（https://v2.cn.vuejs.org/v2/guide/class-and-style.html）

> 对象用法(适用于复合属性，有多个值的)
>
> 如class:      v-bind:class="{class类名：boolean值}"

**功能**： 绑定相应属性值后，可以动态控制该属性值，通过控制该属性值让页面满足不同的需求效果。

```js
<button @click="clickEvent">点我换颜色 </button>
        <!-- bol为true,active有效，bol为false时，active无效 -->
<div v-bind:class="{active:bol}">使用class</div>
------------------------------------------------------------
data: {
  bol: false
      },
methods: {
   clickEvent() {
   this.bol = !this.bol
 }
}
```

### v-bind 对于class的增强

v-bind 对于类名操作的增强, 注意点, :class 不会影响到原来的 class 属性

```vue
 <!-- class绑定
       1：字符串（不怎么用）
            :class="'class类名 '"   
       2：对象用法
            :class="{class类名:boolean值,class类名:boolean值}"
       3：数组用法（不怎么用）
            :class='['class类名']'
  -->
    <div id="app">
      <button @click="str='active'">点击改变盒子大小</button>
      <div class="box" :class="str"></div> 
      
      <button @click="bol=!bol">点击改变盒子大小</button>
      <div class="box" :class="{active:bol}"></div> 
      
      <button @click="str='active'">点击改变盒子大小</button>
      <div class="box" :class="[str]"></div>
    </div>
```

```js
new Vue({
        el: '#app',
       data: {
       str: '',
       bol: false
     }
 })
```

### v-bind对于style 的增强

```vue
<!-- 
      v-bind用于style
         对象用法（主流写法）：
             :style="{属性名:值}"
             :style="{width:变量,height:变量}"
         数组写法（了解）：
             :style="[{属性名:值},{属性名:值}]"
             :style="[{width:值},{height:值}]"
  -->

    <div id="app">
       <button @click="num+=10">点击增加宽度</button>
      <div class="box" :style="{width:num+'px'}"></div>

      <button @click="num+=10">点击增加宽度</button>
      <div class="box" :style="[{width:num+'px'}]"></div>
    </div>
```

```js
 new Vue({
     el: '#app',
     data: {
     num: 300
     }
 })
```

## v-for指令

[官网地址](https://v2.cn.vuejs.org/v2/guide/list.html)

**用法：**

- 用于数组 ：   `v-for="(item(数组每一项),index(索引))  in  array"`    （这里index索引也可省略不写）
- 用于对象 ：    ` v-for="(value(对象中的值)，key(对象中的键值)，index(对象中的序号，从0开始) in object)"`(这里key与index可省略,对象的for在实际项目中很少用到。)，了解即可
- 用于数字：`v-for="(item(从1到10的值),index(索引从0开始))  in  10"`，了解即可

**功能：** 对数组与对象进遍历，得到每一项的值，从而进行列表之类的渲染处理。

```vue
<ul>
<!-- 数组有多长它就渲染多少个    第一个值item是代表数组当前项，第二个index值是数组索引-->

<li v-for="(item,index) in arr">索引：{{index}}------值：{{item}}</li>
 <!-- 对对象而言，第一个值value是也是对象的值，第二个是对象的键值key，第三个index是序号 -->
 
<li v-for="(value,key,index) in obj">{{value}}------{{key}}-----{{index}}</li>
</ul>
```

```js
data: {
    arr: [1, 2, 3, 45, 6, 8, 15],
      obj: {
       name: "刘德华",
       age: 15
   }
 }
```

## Key

在使用了v-for指令时，必须要加一个 ：key值，但是他的作用是什么呢？

**`key` 的作用：**

- 当列表的数据变化时，默认情况下，vue 会尽可能的复用已存在的 DOM 元素，从而提升渲染的性能。但这种默认的性能优化策略，会导致有状态的列表无法被正确更新。
- 为了给 vue 一个提示，以便它能跟踪每个节点的身份，从而在保证有状态的列表被正确更新的前提下，提升渲染的性能。此时，需要为每项提供一个唯一的 key 属性。
- `key` 是虚拟 DOM 对象的标识，可提高页面更新渲染的效率。当数据变化时，Vue 会根据新数据生成新的虚拟 DOM，随后进行新旧虚拟 DOM 的差异比较

**比较规则**

- 旧虚拟 DOM 找到和新虚拟 DOM 相同的 key：
  - 若内容没变，直接复用真实 DOM
  - 若内容改变，生成新的真实 DOM，替换旧的真实 DOM
- 旧虚拟 DOM 未找到和新虚拟 DOM 相同的 key：创建新的真实 DOM，渲染到页面

**`key` 的注意事项：**

- key 的值只能是**字符串**或**数字**类型
- key 的值必须具有唯一性（即：key 的值不能重复）
- 建议把数据项 id 属性的值作为 key 的值（因为 id 属性的值具有唯一性）
- 使用 index 的值当作 key 的值没有意义（因为 index 的值不具有唯一性）
- 建议使用 v-for 指令时一定要指定 key 的值（既提升性能、又防止列表状态紊乱）

如果使用index作为值作为key的值，数据是从上面添加的就会造成下面这种状况

<img src="https://img-blog.csdnimg.cn/f744a2d3f09948c18873405c3ee29e89.png">

## v-if,v-else-if,v-else指令

[官网地址](https://v2.cn.vuejs.org/v2/guide/conditional.html)

**用法：**

- v-if="一句话表达式（最后转换成boolean值，如果为真，则进行该语句所在标签渲染，如果为假则不渲染，该标签将不存在）"
- `v-else-if`和`v-if` 是一样用法，它是`v-if`不成立情况下才会走到`v-else-if`这里来
- `v-else`后面无须跟任何语句，当前面`v-if`和`v-if-else`都不成立时，它就会执行，当前面任何一个执行渲染，它就不执行

**功能：** 根据不同条件选择性的渲染某些标签。

```vue
<div id="app">
<input type="text" placeholder="请输入相应成绩！" v-model="score">
<div v-if="score>90">你真优秀</div>
<div v-else-if="score>70">一般般了</div>
<div v-else>得努力了</div>
</div>
```

```js
new Vue({
 el: "#app",
     data: {
     score: 100
 }
 })
```

## v-show指令

**用法：**和v-if类似 如:

> v-show="一句话表达式（最后转换成boolean值，如果为真，则进行该标签显示，如果为假则该标签将display:none隐藏）"

**功能：**进行所在标签的显示与隐藏，但不管显示与隐藏，这标签都会渲染

```vue
 <div id="app">
        <button @click="isShow=!isShow">点我切换</button>
        <!-- v-show只是设置标签的显示与隐藏display:none， 
        input框的值还能保留下来，v-if是不能保留下来这个值的
        -->
        <div v-show="isShow" key="1">
            <p>用户名</p>
            <input type="text" placeholder="请输入姓名">
        </div>
        <div v-show="!isShow">
            <p>密码</p>
            <input type="text" placeholder="请输入密码">
        </div>
 </div>
---------------------------------------------------------
data: {
   isShow: true
 }
```

### v-if与v-show对比

> `v-if`是对标签控制是否进行渲染。如果true 渲染该标签,如果为false 不会渲染该标签 `v-show`只是控制标签的显示与隐藏（display:none）。

**应用场景：**

- 当某些标签需要频繁切换使用时，建议优先考虑`v-show`,主要是在性能方向会更佳一些
- 当某些标签需要判断 条件较多，且切换不太频繁，就优先考虑`v-if`

## 其他内置指令

### v-cloak指令

> 控制vue实例化完成前的dom样式

**用法：**

```HTML
/* 通过属性选择器获取该属性所在标签来改变样式 */
[v-cloak] {
  display: none;
}
 <!-- 给标签加一个v-cloak属性（这时候可通过这个属性控制标签在vue实例化前的样式了），在vue实例化完成之后，v-cloak属性会消失 -->
<div id="#app" v-cloak>
  {{ message }}
</div>
```

**功能：**用于vue进行实例渲染完成前这段时间标签的样式处理，像上面代码就不至于让用户在vue渲染完成前看到{{message}}这些字符

### v-once指令

> 让该标签所有指令只执行一次

**用法：**

```vue
<span v-once>This will never change: {{msg}}</span> 
msg只会渲染一次
```

**功能：**让它所在标签只接受一次渲染，渲染一次后，后面再有值的改变它也不会再变化

### v-pre指令

**功能**：用了v-pre的标签，里面是什么内容，就展示什么内容，对它而言，不存在变量什么的，像上面用法里面例 子，它只会打印出{{message}}   而不会解析出message变量。

- 没有使用插值语法等特殊语法的节点，可用其跳过编译过程，加快编译

```vue
<span v-pre>{{ message }}</span>
```




