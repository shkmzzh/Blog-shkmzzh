---
title: VueX
date: 
tags:
- Vue
---
### vuex基本概念

[vuex官方文档](https://vuex.vuejs.org/zh/guide/)

vuex是vue的状态管理工具，*状态即数据*。 状态管理就是集中管理vue中 *通用的* 一些数据

注意（官方原文）：

- 不是所有的场景都适用于vuex，只有在必要的时候才使用vuex
- 使用了vuex之后，会附加更多的框架中的概念进来，增加了项目的复杂度  （数据的操作更便捷，数据的流动更清晰）

Vuex就像《近视眼镜》, 你自然会知道什么时候需要用它~

#### **vuex的优点: 方便的解决多组件的共享状态**

vuex的作用是解决《多组件状态共享》的问题。

- 它是独立于组件而单独存在的，所有的组件都可以把它当作  *一座桥梁* 来进行通讯。

- 特点：

  - *响应式*： 只要仓库一变化，其他所有地方都更新 （太爽了！！！）
  - 操作更简洁

  代码量非常少, 但是需要熟悉

<img src="https://img-blog.csdnimg.cn/89d9f2d4c1d542a98a56be2827fb65bf.webp">

### 什么数据适合存到vuex中

一般情况下，只有  *多个组件均需要共享的数据* ，才有必要存储在vuex中，

对于某个组件中的私有数据，依旧存储在组件自身的data中。

例如：

- 对于所有组件而言，当前登陆的   *用户信息*  是需要在全体组件之间共享的，则它可以放在vuex中
- 对于文章详情页组件来说，当前的用户浏览的文章列表数据则应该属于这个组件的私有数据，应该要放在这个组件data中。

## vuex 的使用 - 创建仓库

1 安装 vuex, 与vue-router类似，vuex是一个独立存在的插件，如果脚手架初始化没有选 vuex，就需要额外安装。

```bash
npm i vuex@3.4.0
```

2 新建 `store/index.js` 专门存放 vuex

​	为了维护项目目录的整洁，在src目录下新建一个store目录其下放置一个index.js文件。 (和 `router/index.js` 类似)

3 创建仓库 `store/index.js`

```js
// 导入 vue
import Vue from 'vue'
// 导入 vuex
import Vuex from 'vuex'
// vuex也是vue的插件, 需要use一下, 进行插件的安装初始化
Vue.use(Vuex)

// 创建仓库 store
const store = new Vuex.Store()

// 导出仓库
export default store
```

4 在 main.js 中导入挂载到 Vue 实例上

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
```

此刻起, 就成功创建了一个 空仓库!!

### 核心概念 - state 状态

State提供唯一的公共数据源，所有共享的数据都要统一放到Store中的State中存储。

打开项目中的store.js文件，在state对象中可以添加我们要共享的数据。

```js
// 创建仓库 store
const store = new Vuex.Store({
  // state 状态, 即数据, 类似于vue组件中的data,
  // 区别在于 data 是组件自己的数据, 而 state 中的数据整个vue项目的组件都能访问到
  state: {
    count: 101
  }
})
```

问题: 如何在组件中获取count?

1. 插值表达式 =》  `{{  $store.state.count  }}`
2. mapState 映射计算属性 =》  `{{ count  }}`

**1. 原始形式- 插值表达式**

**`App.vue`**

组件中可以使用  *this.$store* 获取到vuex中的store对象实例，可通过*state*属性属性获取*count*， 如下

```vue
<h1>state的数据 - {{ $store.state.count }}</h1>
```

*计算属性* - 将state属性定义在计算属性中 https://vuex.vuejs.org/zh/guide/state.html

```js
// 把state中数据，定义在组件内的计算属性中
  computed: {
    count () {
      return this.$store.state.count
    }
  }
<h1>state的数据 - {{ count }}</h1>
```

但是每次, 都这样一个个的提供计算属性, 太麻烦了, 所以我们需要辅助函数 mapState 帮我们简化语法

#### 2. 辅助函数  - mapState

> mapState是辅助函数，帮助我们把store中的数据映射到 组件的计算属性中, 它属于一种方便的用法

用法 ：

第一步：导入mapState (mapState是vuex中的一个函数)

```js
import { mapState } from 'vuex'
```

第二步：采用数组形式引入state属性

```js
mapState(['count']) 
```

> 上面代码的最终得到的是 *类似于*

```js
count () {
    return this.$store.state.count
}
```

第三步：利用*展开运算符*将导出的状态映射给计算属性

```js
  computed: {
    ...mapState(['count'])
  }
 <div> state的数据：{{ count }}</div>
```

### 核心概念 - mutations

**基本使用**

通过 `strict: true` 可以开启严格模式

> state数据的修改只能通过mutations，并且mutations必须是同步的

**定义mutations**

```js
const store  = new Vuex.Store({
  state: {
    count: 0
  },
  // 定义mutations
  mutations: {
     
  }
})
```

**格式说明**

mutations是一个对象，对象中存放修改state的方法

```js
mutations: {
    // 方法里参数 第一个参数是当前store的state属性
    // payload 载荷 运输参数 调用mutaiions的时候 可以传递参数 传递载荷
    addCount (state) {
      state.count += 1
    }
  },
```

组件中提交 mutations

```js
this.$store.commit('addCount')
```

**解决问题: 两个子组件, 添加操作 add,  addN 实现**

#### 带参数的 mutation

需求: 父组件也希望能改到数据

提交 mutation 是可以传递参数的  `this.$store.commit('xxx',  参数)`

1 提供mutation函数

```js
mutations: {
  ...
  inputCount (state, count) {
    state.count = count
  }
},
```

2 注册事件

```js
<input type="text" :value="count" @input="handleInput">
```

3 提交mutation

```js
handleInput (e) {
  this.$store.commit('inputCount', +e.target.value)
}
```

**小tips: 提交的参数只能是一个, 如果有多个参数要传, 可以传递一个对象**

```js
this.$store.commit('inputCount', {
  count: e.target.value
})
```

解决问题:  addN 的实现

#### 辅助函数 - mapMutations

> mapMutations和mapState很像，它把位于mutations中的方法提取了出来，我们可以将它导入

```js
import  { mapMutations } from 'vuex'
methods: {
    ...mapMutations(['addCount'])
}
```

> 上面代码的含义是将mutations的方法导入了methods中，等价于

```js
methods: {
      // commit(方法名, 载荷参数)
      addCount () {
          this.$store.commit('addCount')
      }
 }
```

此时，就可以直接通过this.addCount调用了

```vue
<button @click="addCount">值+1</button>
```

但是请注意： Vuex中mutations中要求不能写异步代码，如果有异步的ajax请求，应该放置在actions中

### 核心概念-actions

> state是存放数据的，mutations是同步更新数据 (便于监测数据的变化, 更新视图等, 方便于调试工具查看变化)， actions则负责进行异步操作

需求: 一秒钟之后, 要给一个数 去修改state

<img src="https://img-blog.csdnimg.cn/e356d3fe98b1412093dfaa9ae79dcb2c.png">

**定义actions**

```js
actions: {
  setAsyncCount (context, num) {
    // 一秒后, 给一个数, 去修改 num
    setTimeout(() => {
      context.commit('inputCount', num)
    }, 1000)
  }
},
```

**原始调用** - $store (支持传参)

```js
setAsyncCount () {
  this.$store.dispatch('setAsyncCount', 200)
}
```

#### 辅助函数 -mapActions

> actions也有辅助函数，可以将action导入到组件中

```js
import { mapActions } from 'vuex'
methods: {
    ...mapActions(['setAsyncCount'])
}
```

直接通过 this.方法 就可以调用

```vue
<button @click="setAsyncCount(200)">+异步</button>
```

### 核心概念-getters

> 除了state之外，有时我们还需要从state中派生出一些状态，这些状态是依赖state的，此时会用到getters

例如，state中定义了list，为1-10的数组，

```js
state: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
```

组件中，需要显示所有大于5的数据，正常的方式，是需要list在组件中进行再一步的处理，但是getters可以帮助我们实现它

**定义getters**

```js
  getters: {
    // getters函数的第一个参数是 state
    // 必须要有返回值
     filterList:  state =>  state.list.filter(item => item > 5)
  }
```

使用getters

**原始方式** -$store

```vue
<div>{{ $store.getters.filterList }}</div>
```

#### 辅助函数 - mapGetters

```js
computed: {
    ...mapGetters(['filterList'])
}
 <div>{{ filterList }}</div>
```

## 核心概念 - 模块 module (进阶拓展)

> 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

这句话的意思是，如果把所有的状态都放在state中，当项目变得越来越大的时候，Vuex会变得越来越难以维护

由此，又有了Vuex的模块化

<img src="https://img-blog.csdnimg.cn/71c994ef7c7045f5b18d461e10e40746.png">

定义一个模块   *user*

user中管理用户的信息状态  userInfo  `modules/user.js`

```js
const state = {
  userInfo: {
    name: 'zs',
    age: 18
  }
}

const mutations = {}

const actions = {}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
```

使用模块中的数据,  可以直接通过模块名访问 `$store.state.模块名.xxx`  =>  `$store.state.user.title`

也可以通过 mapState 映射

### 命名空间 namespaced

默认情况下，模块内部的 action、mutation 和 getter 是注册在*全局命名空间*的

这句话的意思是 刚才的 user模块 ，它的 action、mutation 和 getter 其实并没有区分，都可以直接通过全局的方式调用, 如下图所示:

<img src="https://img-blog.csdnimg.cn/1730d0b2a1174848bf578a3222ced0b6.png">

但是，如果我们想保证内部模块的高封闭性，我们可以采用namespaced来进行设置

```js
// aaa模块

export default {
   namespaced:true,  // 是否启用命名空间，实际开发基本都是true，它的默认值是false
   state:{
    // 自带了命名空间的
    xxx:'zs'
    // 访问：this.$store.state.模块名.xxx
   },
   // 下面的是默认不带命名空间的
   mutations:{
      setXxx(state,value){
         state.xxx=value
      }
     // 调用mutations:this.$store.commit('模块名/方法名',实参)
   },
   actions:{
       actionsXxx(store){
         // store调用当前模块的mutations方法不需要模块名,访问任意当前模块的东西不需要模块名，只是外部调用需要
         store.commit(“setXxx”，实参值)         
       }
       // 调用actions:this.$store.dispatch('模块名/方法名',实参值)
   },
   getters:{
       getXxx(state){
        return "姓名:"+state.xxx
       }
       // 访问： this.$store.getters['模块名/getters方法名']   ,不用.语法是因为后面命名有/号，不符合命名规范     
   }
}
```

### 模块 map 用法

- mapState在computed中定义，mapGetters在computed中定义
- mapMutations在methods,mapActions在methods中定义
- 快捷批量使用vuex中的东西
- mapState
  - 导入  import {mapState} from 'vuex'

```js
computed:{
   ...mapState('模块名',['属性名'])
}
// 使用：  this.属性名
```

- mapMutations
  - 导入  import {mapMutations} from 'vuex'

```js
methods:{
 ...mapMutations('模块名',['mutations方法名'])
}
// 调用： this.mutations方法名(实参)
```

- mapActions

```js
import {mapActions} from 'vuex'
methods:{
  ...mapActions('模块名',['actions方法名'])
}
// 调用：  this.actions方法名(实参)
```

- mapGetters

```js
import {mapGetters} from 'vuex'
computed:{
  ...mapGetters('模块名',['getters方法名'])
}
//  访问：this.getters方法名
```

### modules下的actions（了解）

```js
// 某一模块下的使用
state:{
   xxx:'zs'
},
actions:{
   xxx(context){
     content:{
      //  这里面有什么呢？
      state:访问当前模块的state数据
          访问：state.属性名
      rootState:访问根模块的state数据
         访问根模块下的state:  rootState.属性名
         访问其它模块下的state: rootState.模块名.属性名
         
      getters:用于访问当前模块的getters
         访问：getters.getters方法名         
      rootGetters:用于访问根模块的getters,通过根模块能访问到所有模块的getters
          访问根模块下的getters:rootGetters.根模块下的getters方法名
          访问其它模块下的getters:rootGetters['模块名/其它模块的getters方法名']
         
      commit:用于调用mutations方法
         调用本模块的mutations方法:commit('本模块的mutations方法名',实参值)
         调用其它模块的mutations方法:
         commit('其它模块的模块名/其它模块的mutations方法名',实参,{root:true})
         
      dispatch:用于调用actions方法
         调用本模块的actions方法 ：dispatch('本模块的actions方法名',实参值)
         调用其它模块的actions方法
         dispatch('其它模块的模块名/其它模块的actions方法名',实参,{root:true})
     }
   }
}
```

### modules下的getters(了解)

```js
getters:{
  方法名(state,getters,rootState,rootGetters){
      state:访问当前模块的state数据
          访问：state.属性名
      rootState:访问根模块的state数据
         访问根模块下的state:  rootState.属性名
         访问其它模块下的state: rootState.模块名.属性名
      getters:用于访问当前模块的getters
         访问：getters.getters方法名         
      rootGetters:用于访问根模块的getters,通过根模块能访问到所有模块的getters
          访问根模块下的getters:rootGetters.根模块下的getters方法名
          访问其它模块下的getters:rootGetters['模块名/其它模块的getters方法名']
  }
}
```