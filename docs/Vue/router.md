---
title: Vue Router
date: 
tags:
- Vue
---
### 单页面应用程序 SPA

单页面应用程序将所有的功能局限于一个 web 页面中，仅在该 web 页面初始化时加载相应的资源（ HTML、JavaScript 和 CSS）。 一旦页面加载完成了，SPA 不会因为用户的操作而进行页面的重新加载或跳转。而是利用 JavaScript 动态地变换 HTML 的内容，从而实现页面与用户的交互。

SPA 的优点：

- 良好的交互体验
  - 内容的改变不需要重新加载整个页面
  - 数据通过 `Ajax` 异步获取
  - 没有页面跳转，不会出现白屏现象
- 良好的前后盾工作分离模式
  - 后端专注于提供 API 接口，更易实现接口复用
  - 前端专注页面渲染，更利于前端工程化发展
- 减轻服务器压力
  - 服务器只提供数据，不负责页面的合成与逻辑处理，吞吐能力会提高

SPA 的缺点：

- 首屏加载慢：可使用路由懒加载、代码压缩、CDN 加速、网络传输压缩
- 不利于 SEO ：SSR 服务器端渲染

### vue-router 初体验

安装 `vue-router`：

```bash
npm install vue-router@3.5.2 -S
```

创建路由模块，在 `src` 源代码目录下，新建 `router/index.js` 路由模块，初始化代码：

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/component/Home.vue'
import About from '@/component/About.vue'
import Movie from '@/component/Movie.vue'

// 把 VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)

// 路由匹配规则
const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/movie', component: Movie },
]

// 创建路由实例对象
const router = new VueRouter({
  routes,
})

export default router
```

在 `main.js` 文件中导入并挂载路由模块：

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
```

在组件中声明路由链接和占位符：

```vue
<template>
  <div class="app-container">
    <!-- 路由链接 -->
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-link to="/movie">电影</router-link>

    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>
```

注意事项：

- 组件分为路由组件和一般组件，前者放在 `views(或pages)` 文件夹，后者放在 `components` 文件夹
- 每个组件都有 `$route` 属性，存储着组件的路由规则信息 通过 `$route.push` 可以拿到哈希值
- `$router` 是路由器对象，整个 SPA 只有一个

### 声明式导航

`<router-link>` 4 个常用属性：

1. `to` 属性

- 用于指定跳转路由

```vue
<router-link to="/about"></router-link>
```

1. `tag` 属性

- 指明 `<router-link>` 最终被渲染为何种标签，默认是 a 标签
- 渲染为其他标签也会监听点击，触发导航

```vue
<router-link to="/about" tag="li">tag</router-link>
//页面渲染结果
<li>tag</li>
```

1. `replace` 属性

- 路由跳转不会增加新的历史记录，而是替换当前历史记录

```vue
<router-link to="/about" replace>About</router-link>
```

1. `active-class` 属性

- 指明路由被激活时添加的类名，默认为 `router-link-active`
- 详见路由高亮

```vue
<router-link to="/about" active-class="active">About</router-link>
```

### 路由高亮

-  RouterLink会自动给当前的链接添加两个类名 

-  router-link-active: 激活的导航链接   模糊匹配   

-  router-link-exact-active:  激活的导航链接 精确匹配    

-  exact: 必须要精确匹配 

被激活的路由链接，默认会添加 `router-link-active`和` router-link-exact-active`的类名。可据此为激活的路由链接设置高亮的样式：

```css
.router-link-active {
  color: white;
  background-color: pink;
}
```

定义路由模块时可以*修改*默认高亮的类名类名：

```js
const router = new VueRouter({
  // 默认的 router-link-active 会被覆盖
  linkActiveClass: 'active-hello',
  linkExactActiveClass: 'active',
})
```

### 路由重定向

```js
const routes = [
  // 访问 / 跳转到 /home
  { path: '/', redirect: '/home' },
  { path: '/home', component: 'Home' },
  { path: '/about', component: 'About' },
  { path: '/movie', component: 'Movie' },
]

const router = new VueRouter({
  routes,
})

export default router
```

### 嵌套路由

`About` 组件中声明子路由链接和子路由占位符：

```vue
<template>
  <div class="about-container">
    <!-- 要把父路由寫上 -->
    <router-link to="/about/tab1">tab1</router-link>
    <router-link to="/about/tab2">tab2</router-link>

    <router-view></router-view>
  </div>
</template>
```

通过 `children` 属性声明子路由规则：

```js
const routes = [
  {
    path: '/about',
    component: 'About',
    children: [
      { path: 'tab1', component: Tab1 },
      { path: 'tab2', component: Tab2 },
    ],
  },
]
```

### 编程式导航

声明式导航：

- 通过点击链接实现导航
- 如普通网页点击 `a` 链接，`vue` 点击 `<router-link>`

编程式导航：

- 通过调用 API 实现导航
- 普通网页通过 `location.href` 的方式跳转页面也是编程式导航
- 

`vue-router` 中实现编程式导航的 API ：

- `this.$router.push('hash地址')` ：跳转到指定页面，并增加一条历史记录
- `this.$router.replace('hash地址')` ：跳转页面，但不会新增历史记录，而是替换当前的历史记录
- `this.$router.go(数值)` ：历史记录前进或后退，相当于点击浏览器前进后退箭头
- `this.$router.forward()` ：前进一步
- `this.$router.back()` ：后退一步

### $router与$route

- $router:路由的实例化对象，主要用于路由的跳转
- $route:用于获取当前路由的基本信息
  - 比如路由的传参，路由的path之类

## 路由传参

- `$route`对象中的属性参数
- 在 hash 地址中，`/ `后面的参数项，叫做 '路径' ，可以通过 this.$route.params 来访问 *路径参数*
- 在 hash 地址中，`？`后面的参数项，叫做 ‘查询参数’ ，可以通过 this.$route.query 来访问 *查询参数*
- 在 this.$route 中，`path `只是路径部分， `fullPath` 是完整的地址（包括 路径和查询参数）

<img src="https://img-blog.csdnimg.cn/05885c2f09524c9cb1d257a30e7b2579.png"/>

### query参数

> - 传
>   - this.$router.push('/xxx?参数名=值')
>   - this.$router.push({path:'/xxx',query:{参数名:值}})
> - 收
>   - this.$route.query.参数名

```js
传 
 this.$router.push('/play?id=' + id)
 this.$router.push(`/home/detail?id=${id}&title=${title}`)
 this.$router.push({ path: '/home/detail', query: { id: 1, title: '你干嘛' } })
-------------------------------------------------------------------------------
收
this.$route.query.id
this.$route.query.title
```

### params 参数（动态路由）

- 动态路由是把 Hash 地址中可变的部分定义为参数项，从而提高路由规则的复用性。

- 动态参数后面的 如果*不加* `?`代表必须要传参，*加*了`?` 代表可传可不传

> - params:动态路由匹配
>   - 路由配制
>
> ```js
> {
>   path:'/xxx/:id?',component:()=>import ('@/views/xxx.vue')
> }
> ```
>
> - 传
>   - this.$router.push('/xxx/123')
> - 收
>   - this.$route.params.id

```js
传
this.$router.push(`/movie/1/21/id=${id}`)
this.$router.push({ name: 'movie', params: { id: 1, age: 21 }, query: { school: 'love' } })
收
-------------------------------------------------------
<template>
  <div class="movie-container">
    <h1>Movie组件，参数值：{{ $route.params.id }}</h1>
  </div>
</template>
```

**动态参数使用场景**

```js
// 定义动态路由参数,此时只要写一个路由规则就可以匹配多个导航
{ path: '/movie/:id/:msg', component: ()=>import('@/views/move') }
---------------------------------------------------------------------
如果有路由组件在一个路由参数的不同的情况下要显示不同的页面，就可以使用动态参数
<router-link to="/movie/1/快点亲亲我吖"></router-link>
<router-link to="/movie/2/小蔡头喵喵喵"></router-link>
<router-link to="/movie/3/香草少女"></router-link>
```

### props接收参数（了解）

```js
{ path: '/movie/:mid', component: ()=>import('@/views/move'), query:true}
---------------------------------------------------------------------
如果有路由组件在一个路由参数的不同的情况下要显示不同的页面，就可以使用动态参数
<router-link to="/movie/1"></router-link>
<router-link to="/movie/2></router-link>
<router-link to="/movie/3></router-link>
当我切换不同的导航时,想要拿到动态id的值
我们可以通过 this.$route.params.id 拿到 
-------------------------------------------
movie组件中 通过
声明：props:['mid']
然后通过 this.mid 拿到 ，在标签中可以通过 {{mid}} 拿到 
注意：如果想通过这种方式拿到 需要在路由规则中 开启  query:true
```

## 路由的补充

### 路由元

- 配制路由时加入meta:{key:值}

```js
{
 path:'/xxx',
 component:...,
 meta:{
    title:标题,
    xxx:....
 }
}
```

- 路由元可以通过当前路由的this.$route.meta获取到
  - 比如：this.$route.meta.title

使用方法

```js
 // 在当前路由页面使用 
 created(){
    document.title=this.$route.meta.title
  },
```

### 路由 - 模式设置

> 目标: 修改路由在地址栏的模式

hash路由例如:  http://localhost:8080/#/home

history路由例如: http://localhost:8080/home  (以后上线需要服务器端支持)

https://router.vuejs.org/zh/guide/essentials/history-mode.html#服务器配置示例

router/index.js

```JavaScript
const router = new VueRouter({
  routes,
  mode: "history" // 打包上线后需要后台支持, 默认是hash
})
```

### alias:别名

```js
{
   path:'/',
   alias:'/home' // 别名  飞哥  董浩飞
   // 上面二路由path是一样的了
}
```

### 路由配制的二种path写法

```js
{
  path: '/layout',
  // alias: '/', // 路由别名
  // redirect: '/',
  component: Layout,
  children: [
    {
      path: '/layout/home',
      component: Home
    },
     
    {
       这样写和上面的写法一样
      path: 'user',
      component: User
    },
    {
      path: 'permission',
      // path以开头的叫绝对写法，意思 ：写什么路由的path是什么最后就是什么   /xxx===/xxx
      // path也可以不以/开头，这种叫相对写法，相对于自己的父级path   xxx===/layout/xxx
      component: Permission
    }
  ]
}
```

### 路由配制的components写法

```js
<router-view  name="default" />
<router-view  name="xxx" />

{
  path:'/xxx',
  component:xxx组件
  等效于
  components:{
     default:default的组件
     xxx:xxx组件
     // 实际很少用，了解就可以了
  }
}
```



## 路由守卫

> 作用：对路由进行权限控制。
>
> 分类：全局守卫、独享守卫、组件内守卫

### 全局守卫

- 全局前置守卫：`beforeEach()`
- 全局后置守卫：`afterEach()`

守卫回调函数 3 个形参：

- `to` ：将要访问的路由的信息对象，即 `$route`
- `from` ：将要离开的路由的信息对象
- `next` ：放行函数（后置守卫没有）

`next` 函数 3 种调用方式：

- 直接放行：`next()`
- 强制跳转到其他路由：`next(/login)`
- 阻止本次跳转：`next(false)`

```js
const router = new VueRouter({...})

router.beforeEach((to, from, next) => {
  if(to.path === '/main') {
    const token = localStorage.getItem('token')

    if(token) {
      next()
    } else {
      next('/login')
    }
  } else {
      next()
  }
})

router.afterEach((to,from) => {
  if(to.meta.title) {
    // 修改网页标题
    document.title = to.meta.title
  } else {
    document.title = 'vue_test'
  }
})
```

### 独享路由守卫

- 某一条路由规则独享的守卫
- 独享守卫只一个

```js
{
  path: 'about',
  component: About,
  beforeEnter(to, from ,next) {
    ...
  }
}
```

### 组件内路由守卫

```js
export default {
  name: 'About',

  // 进入守卫：通过路由规则，进入该组件时被调用
  beforeRouteEnter(to, from, next) {
    ...
  }

  // 离开守卫：通过路由规则，离开该组件时被调用
  beforeRouteLeave (to, from, next) {
    ...
  }
}
```

### 各个守卫执行顺序

从 `About` 组件通过路由规则进入 `Home` 组件：

```js
About-beforeRouteLeave
beforeEach
Home-beforeEnter
Home-beforeRouteEnter
afterEach
Home组件生命周期开始
```