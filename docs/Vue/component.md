---
title: vue组件基本使用
date: 
tags:
- Vue
---
## 组件的注册

**注册组件有两种注册方式**:  分为“全局注册”和“局部注册”两种

- 被全局注册的组件，可以在任意的组件模板范围中使用 通过`Vue.component()`
- 被局部注册的组件，只能在当前注册的组件模板范围内使用 通过`components`

### 局部注册

把独立的组件封装一个.vue文件中，推荐放到components文件夹

```vue
比如现在 components文件夹中 有一个 HmHeader.vue 组件,现在将他注册到 App.vue 组件中
1.当标签使用  <HmHeader></HmHeader>
2.导入组件  import HmHeader from '@/components/HmHeader'
3.注册组件  components:{ HmHeader }
```

==局部注册的组件只能在当前组件中使用==

### 全局注册组件

```
比如现在 components文件夹中 有一个 HmHeader.vue 组件,现在将他注册为全局的的组件
1.当标签使用  <HmHeader></HmHeader>
2.在main.js中导入组件  import HmHeader from '@/components/HmHeader'
3.注册为全局组件  Vue.component('HmHeader','HmHeader') 
如果HmHeader组件的 'name'的名字为 HmHeader 也可以这样注册
Vue.component(HmHeader.nmae,'HmHeader') 
```

==注意：全局注册的组件 可以在任意的组件中去使用==

## 组件的样式冲突  scoped

> - 加：只管当前组件和子组件的最外层，
>   - 看得到的管得到，看不到的管不到，子组件看得最外层
>   - 一般都要加
> - 不加：全局

默认情况下，写在组件中的样式会`全局生效`，因此很容易造成多个组件之间的样式冲突问题。

组件样式默认会作用到全局, 就会影响到整个 index.html 中的 dom 元素

- `全局样式`: 默认组件中的样式会作用到全局-
- `局部样式`: 可以给组件加上 scoped 属性, 可以让样式只作用于当前组件

```React
<style lang="less" scoped>
div {
  background-color: pink;
}
</style>
```

**原理**:

1. 添加scoped后, 会给当前组件中所有元素, 添加上一个自定义属性

   <img src="https://img-blog.csdnimg.cn/89345007ab354618994832fe5afe573e.png">

2. 添加scoped后,  每个style样式, 也会加上对应的属性选择器

    <img src="https://img-blog.csdnimg.cn/2e7d98f58ef04bf7b10712cc01c15d6a.png">

最终效果: 必须是当前组件的元素, 才会有这个自定义属性, 才会被这个样式作用到

## 组件通信

- 每个组件都有自己的数据, 提供在data中, 每个组件的数据是独立的, 组件数据无法互相直接访问 (合理的)

- 但是如果需要跨组件访问数据, 就需要用到组件通信

- 组件通信的方式有很多: 现在先关注两种, 父传子 子传父

### 父传子 props 传值

**语法**:

- 父组件通过给子组件加属性传值

```vue
<Son price="100" title="不错" :info="msg"></Son>
```

- 子组件中, 通过props属性接收

```js
props: ['price', 'title', 'info']
```

### 关于 props 的注意点

**props 是父传子, 传递给子组件的数据, 为了提高 子组件被使用时 的稳定性, 可以进行props校验**, 验证传递的数据是否符合要求

- 默认的数组形式, 不会进行校验, 如果希望校验, 需要提供对象形式的 props

- [风格指南](https://v2.cn.vuejs.org/v2/style-guide/#Prop-)定义必要

props 提供了多种数据验证方案，例如：

- 基础的类型检查  Number
- 多个可能的类型 [String, Number]
- 必填项校验   required: true
- 默认值 default: 100
- 自定义验证函数

官网语法: [地址](https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证)

```js
{
  props: {
    // 基础的类型检查
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
  /* default:不传入时的默认值
        基本数据类型：直接定义默认值
        复杂数据类型(对象，function,Array)：()=>{return 复杂数据类型}*/
  // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    arr: {
      // 默认值是复杂数据类型
      type: Array,
      default: () => {
        return []
      }
}

  // -------------------------------------------------------------------------
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
```

**注意**：

- 在vue中需要遵循单向数据流原则  

- 父组件的数据发生了改变，子组件会自动跟着变  

- 子组件不能直接修改父组件传递过来的props  props是只读的

  

**拓展**（了解）

- props:['属性名']
- 单向数据流：本意，一个公共组件所有子组件都可随便修改数据，后面出现问题，不好确定谁改的，找bug会麻烦，定位问题会很麻烦
- 单向数据流（作者是希望什么都不要在子组件内改）
  - 实际开发时，经常是使用:堆随便修改，栈不可修改
  - 基本数据类型(栈)：不可修改
  - 复杂数据类型：只要不修改它的引用地址，它的值随便修改
    - Object
    - Array
    - Function
    - 什么是修改引用地址，什么是修改值？
      - 引用地址存储地堆还是栈中？栈
      - 值是存储在哪里的？  堆
      - 堆随便修改，栈不可修改



### 子传父 emit

- 1.子组件可以通过 this.$emit('事件名', 参数1, 参数2, ...) 触发事件的同时传参的

```js
this.$emit('sayPrice', 2)
```

- 2.父组件给子组件注册一个自定义事件

```vue
<my-product 
  ...
  @sayPrice="sayPrice">
</my-product>
```

父组件并提供对应的函数接收参数

```js
methods: {
  sayPrice (num) {
    console.log(num)
  }
}
```

**$event**

> $event代表方法触发时的默认传参值

- 原生事件中：代表事件对象

```js
  <button @click="btnClick($event)">按钮</button>
  这里的$event代表事件对象，就是原生事件的e
```

- 组件标签事件绑定中：代表子组件触发父组件方法时传入的参数值

```js
<组件标签  @xxx方法="fn($event)"  />
这里的$event代表组件在触发该方法时传入的实参值
this.$emit('xxx方法',实参值)
```

#### 还有一种 v-model语法糖的写法

- 父组件提供一个数据给子组件使用（父传子）
- 子组件又需要修改父组件传过来的这个数据，所以需要子传父把值传给父组件。

- 这种场景可以使用v-model进行简写。

- **但要注意**：

- 1.定义组件的时候，注意接收的值叫value， 子传父触发的事件叫 input
- 具体用法 在笔记  *v-mode指令* 用法里面记录了

## ref 和 $refs

- 利用 ref 和 $refs 可以用于获取 dom 元素, 或者组件实例

- 每个 vue 的组件实例上，都包含一个$refs 对象，里面存储着对应的DOM 元素或组件的引用。

1 .给需要获取的 dom 元素或者组件, 添加 ref 属性

```vue
<div>
    在dom元素中使用
  <div ref="box">我是div盒子</div>
    在组件中使用
  <JaCk ref="jack"></Jack>
  <button @click="fn">按钮</button>
</div>
```

2 .通过 `this.$refs.xxx` 获取, 放在普通标签上可以拿到当前Dom元素，写在组件标签上拿到组件可以调用组件的 Data中的属性和methods中的方法

```React
import Jack from './jack.vue'
export default {
  methods: {
    fn () {
      console.log(this.$refs.box)
      console.log(this.$refs.jack)
      this.$refs.jack.sayHi() //调用父组件中的sayHi方法
    }
  },
  components: {
    Jack
  }
}
```

## $nextTick

- 语法：`this.$nextTick(回调函数)`
- 作用：在下一次 DOM 更新结束后执行其指定的回调
- 什么时候用：当改变数据后，要基于更新后的 DOM 进行操作时，要在 `nextTick` 指定的回调函数中执行
- 组件的 `$nextTick(callback)` 方法，会把 callback 回调推迟到下一个 DOM 更新周期之后执行，即在 DOM 更新完成后再执行回调，从而保证 callback 回调可以获取最新的 DOM 元素

```vue
<template>
  <div>
    <!-- 需求: 点击按钮, 切换显示输入框 -->
    <input ref="inp" type="text" v-if="isShowInput">
    <button @click="fn" v-else>点此搜索</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowInput: false
    }
  },
  methods: {
    fn () {
      this.isShowInput = true 
  //this.isShowInput = true 执行完时, 实际的 dom 还没渲染出来
      this.$nextTick(() => {
  //nextTick 会等组件的DOM 刷新之后，再执行 callback 回调函数
        this.$refs.inp.focus()
      })
    }
  }
}
</script>
```

## 动态组件

- 什么是动态组件:   让多个组件使用同一个挂载点，并动态切换，这就是动态组件

**用法**：

> <component  :is="'标签名'"  />
>
> - is的值是什么，它就是什么组件
> - is的值一定要绑定，一定要加:

```vue
<template>
  <div>
    <h3>动态组件的演示</h3>
    <!-- 动态组件 => 多个组件使用同一个挂载点, 并可以动态的切换展示 -->
    <button @click="comName = 'my-swiper'">swiper</button>
    <button @click="comName = 'my-nav'">nav</button>
    
    <!-- 
      <my-nav></my-nav>
      <my-swiper></my-swiper> 
    -->
    <component :is="comName"></component>
  </div>
</template>

<script>
import MyNav from './my-nav.vue'
import MySwiper from './my-swiper.vue'
export default {
  data () {
    return {
      comName: 'my-nav'
    }
  },
  components: {
    MyNav,
    MySwiper
  }
}
</script>
```
## Keep-alive

默认情况下，切换动态组件时无法保持组件的状态。此时可以使用 vue 内置的 `<keep-alive>` 组件保持动态组件的状态，对被包裹的组件进行状态缓存。

被 `<keep-alive>` 包裹的组件会多出两个生命周期函数：当组件被激活时，触发 `activated` 钩子；当组件被缓存时，触发 `deactivated` 钩子。

```vue
<keep-alive>
  <component :is="comName"></component>
</keep-alive>
```

`<keep-alive>` 的 `include` 和 `exclude` 属性，分别用于指明哪些组件要缓存、哪些组件不要缓存。

```vue
<keep-alive include="Left, Right">
  <component :is="comName"></component>
</keep-alive>

<keep-alive :include="['News', 'Message']">
  <router-view></router-view>
</keep-alive>
```


## 自定义指令

> - [自定义指令](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#ad)
> - 私有自定义指令：在组件的 `directives` 节点声明
> - 全局自定义指令：在 `main.js` 文件中声明

除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。 `v-xxx`

注意，代码复用和抽象的主要形式是组件。

然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。
### 钩子函数

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新（VNode：Vue 编译生成的虚拟节点）。

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。

- `unbind`：只调用一次，指令与元素解绑时调用。

#### **钩子函数参数**

指令钩子函数会被传入以下参数：（el,binding,vonde,oldvnode)

- `el`：指令所绑定的元素，可以用来直接操作 DOM。


- binding：一个对象，包含以下 property：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。


- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://v2.cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。（通过vonde.context.属性 可以拿到指令所在组件的 Data 属性值）
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

### 完整写法示例

```vue
<input type="text" v-focus="鸡你太美"/>
```

```js
directives: {
     自定义一个局部指令
    focus: {
      bind(el, binding, vnode) {
        // 在bind函数中可以对元素进行一些初始化的设置,但不能操作该元素
        el.style.color = 'yellow'
        el.value = binding.value
      },
      inserted(el, binding, vnode) {
        // 在inserted函数中元素已经渲染到模板当中,此时可以操作该DOM元素
        el.focus()
      },
      update(el, binding, vnode) {
        // 当指令所在模板结构被重新解析时,update函数会被调用,此时指令的值可能没改变
        console.log('update')
        el.value = binding.value
      },
      componentUpdated(el, binding, vnode) {
          // 指令所在模板的值全部更新完毕 
        console.log('update')
        el.value = binding.value
      },
      unbind(el, binding, vnode) {
          // 只调用一次，指令解绑时调用 
        console.log('update')
        el.value = binding.value
      },
    }
}
-------------------------------------------------------------------
全局写法:在main.js中声明一个全局自定义指令
Vue.directive('focus', {
  bind(el, binding) {
    el.value = binding.value
  }
  inserted(el, binding) {
    el.focus()
  }
  update(el, binding) {
    el.value = binding.value
  }
})
```

### 简写形式

- 当 `bind` 函数和 `update` 函数里的逻辑完全相同时，可以简写
- 不需要定义`inserted` 函数操作Dom元素时 才使用简写形式
- 因此简写形式的调用时机：初次绑定和 DOM 更新（指令所在模板被重新解析）

```vue
<h2 v-color="'red'">简写形式</h2>
```

```js
directives: {
  color(el, binding) {
    el.style.color = binding.value
  }
}

// 全局写法
Vue.directive('color', (el, binding) => {
  el.style.color = binding.value
}))
```

### 注意事项

- 自定义指令使用时需要添加 `v-` 前缀
- 指令名如果是多个单词，要使用 `kebab-case` 短横线命名方式，不要用 `camelCase` 驼峰命名

```vue
<span v-big-number="n"></span>
```

```js
data() {
  return {
    n: 1
  }
},
directives: {
  // 添加引号才是对象键名完整写法
  // 平时不加引号都是简写形式
  // 遇到短横线的键名就必须添加引号
  'big-number': {
    bind(el, binding) {
      console.log(this) // Window
      el.innerText = binding.value * 10
    }
  }
}
```

## 插槽

**何为插槽**

- 插槽可以理解为组件封装期间，为用户预留的*内容占位符*。它是 vue 为组件封装者提供的能力，允许开发者在封装组件时，把*不确定的、希望由用户指定的部分*定义为插槽。

**插槽作用**:

- 用于实现组件的内容分发, 通过 slot 标签, 可以接收到写在组件标签内的内容**

- 插槽：slot  作用：占位置

### 默认插槽

**基础使用**：

```vue
<!-- 子组件中预留插槽 -->
<template>
  <div class="contianer">
    <h1>这是子组件</h1>
    <slot></slot>
  </div>
</template>

<!-- 父组件使用子组件时，向插槽填充内容 -->
<child-comp>
  <p>填充到插槽的内容</p>
</child-comp>
```

如果子组件*没有预留插槽*，那么父组件填充给子组件的自定义内容会被丢弃：

```vue
<!-- 子组件没有预留插槽 -->
<template>
  <div class="contianer">
    <h1>这是子组件</h1>
  </div>
</template>

<!-- 父组件的自定义内容会被丢弃 -->
<child-comp>
  <p>这段自定义内容会被丢弃</p>
</child-comp>
```

子组件可以为插槽提供*后备内容*，当父组件没有提供自定义内容时，后备内容就会生效。

```vue
<!-- 子组件提供后备内容 -->
<template>
  <div class="contianer">
    <h1>这是子组件</h1>
    <slot>这是后备内容，父组件没有提供自定义内容就会生效</slot>
  </div>
</template>

<!-- 父组件没有提供自定义内容 -->
<child-comp> </child-comp>
```

### 具名插槽

##### **插槽的分类**:

- 1 .默认插槽(匿名插槽)

  - `<slot></slot>` 只要没有具体分发的内容, 都会给到默认插槽

  - `<slot name="default"></slot>` 是默认插槽完整的写法 和 `<slot></slot>` 完全等价

- 2..具名插槽: 具有名字的插槽 (配置了名字),  可以实现定向分发
  - 一旦配置了名字, 只会接收对应的内容, 不是分发给他的, 就不要

```vue
<!-- 子组件预留多个具名插槽 -->
<template>
  <div class="contianer">
    <h1>这是子组件</h1>

    <slot name="title">title 具名插槽</slot>
    <hr />
    <slot name="content">content 具名插槽</slot>>
    <hr />
 ----------------------------------------------
    <slot>没有设置 name 名称则默认为 default</slot>
    <slot name="default"></slot>
  </div>
</template>
```

**父组件向具名插槽提供自定义内容**

- 新的写法：包裹一个 `<template>` 标签，同时在 `<template>` 中通过 `v-slot:名称` 指明插槽的名称。简写形式为 `#名称` ，且 `v-slot` 只能使用在 `<template>` 和组件标签上，普通 HTML 标签不行
- 旧的写法：`slot="名称"` 指明插槽名称
- 如果不指定插槽名称，那么自定义内容会被填充到所有的 `default` 插槽当中
- 同一插槽填充多个内容，是追加不是覆盖

```vue
<!-- 父组件向具名插槽提供自定义内容 -->
<child-comp>
    旧写法
  <h1 slot="title">《赠汪伦》</h1>
-------------------------------------------
  <template v-slot:title>
    <h1>《静夜思》</h1>
  </template>

  <!-- 简写形式 -->
  <template #content>
    <p>床前明月光，疑是地上霜。</p>
    <p>举头望明月，低头思故乡。</p>
  </template>

  <template>
    <p>这段内容没有指定名称，会被填充到所有 default 插槽中。</p>
  </template>
</child-comp>
```

### 作用域插槽

默认插槽和具名插槽都可以传递参数

**默认插槽传值**

```vue
子组件插槽传值
...
<slot xxx="123"><slot>
...
父组件接收
<template v-slot="Xx">{{Xx}}</template>
//Xx拿到得数据会被一个对象包裹 { "xxx": 123 } 所以需要 Xx.xxx才可以拿到123
```

**具名插槽传值**

*子组件* 给 slot 标签, 以 添加属性的方式传值

```vue
<slot name="bottom" :yes="yes" :no="no" money="100"></slot>
```

所有添加的属性, 都会被收集到一个对象中

```js
{ yes: '确认', no: '取消', money: '100' }
```

*父组件接收* 在template中, 通过  `v-slot:插槽名= "obj"` 接收

```vue
<template #bottom="obj">
  <!-- {{ obj }} -->
  <button>{{ obj.yes }}</button>
  <button>{{ obj.no }}</button>
  <button>{{ obj.money }}</button>
</template>
```

**补充**

> - 因为 bottom={ yes: '确认', no: '取消', money: '100' }
> - 所以可以解构为 { yes , no , money } = bottom
>
> *注意* :  只有具名插槽才可以这样解构

```vue
<template #bottom="{ yes, no, money }">
  <button>{{ yes }}</button>
  <button>{{ no }}</button>
  <button>{{ money }}</button>
</template>
```

