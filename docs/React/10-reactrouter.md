# React 路由

- React 路由介绍
- 路由的基本使用
- 路由的执行过程
- 路由的常用操作

## React 路由介绍

现代的前端应用大多都是 SPA（单页应用程序），也就是只有一个 HTML 页面的应用程序。因为它的用户体验更好、对服务器的压力更小，所以更受欢迎。为了**有效的使用单个页面来管理原来多页面的功能，前端路由应运而生**。前端路由的功能：让用户从一个视图（页面）导航到另一个视图（页面）

- 前端路由是一套**映射规则**，在React中，是 *URL路径* 与 *组件* 的对应关系 
- 使用 React 路由简单来说就是：配置路径和组件（配对）

<img src="images/路由是一套规则1-16297300974362.png" style="width: 800px" />
<img src="images/路由是一套规则2-16297300974363.png" style="width: 800px" />

## React 模拟路由的实现

**目标**：能够模拟路由的简单实现

**内容**：`hashchange` 事件：监听地址栏 hash（哈希）值的改变

**核心代码**：

```jsx
import Home from './pages/Home'
import Search from './pages/Search'
import Comment from './pages/Comment'

import { useEffect, useState } from 'react'

export default function App() {
  // 进入页面时，就拿到当前 hash 值，来作为状态的默认值
  const [path, setPath] = useState(window.location.hash.slice(1))

  useEffect(() => {
    const handleHashChange = () => {
      setPath(window.location.hash.slice(1))
    }

    // 给 window 绑定 hashchange 事件，
    // 来监听浏览器地址栏中 # 后面内容的变化，也就是 hash 改变
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <div>
      <ul>
        <li>
          <a href="#/home">首页</a>
        </li>
        <li>
          <a href="#/comment">评论</a>
        </li>
        <li>
          <a href="#/search">搜索</a>
        </li>
      </ul>

      <div>
        {path === '/home' && <Home></Home>}
        {path === '/search' && <Search></Search>}
        {path === '/comment' && <Comment></Comment>}
      </div>
    </div>
  )
}
```

## 路由基本使用

**目标**：能够使用 react 路由切换页面

**内容**：

- 2021.11月初，react-router 更新到了 v6 版本。
- 注意：v6 版本相比 v5 版本有破坏性更新（使用方式不同了）！
- 我们先学习目前使用最广泛的 v5 版本的使用

- [v6 文档](https://reactrouter.com/)
- [v5 文档](https://v5.reactrouter.com/)、 [v5 中文文档](https://react-router.docschina.org/web/guides/philosophy)

**步骤**：

1. 安装：`yarn add react-router-dom@5.3.0`
2. 导入路由的三个核心组件：Router / Route / Link
3. 使用 Router 组件包裹整个应用
4. 使用 Link 组件作为导航菜单（路由入口）
5. 使用 Route 组件配置路由规则和要展示的组件（路由出口）

**核心代码**：

```jsx
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const First = () => <p>页面一的页面内容</p>

const App = () => {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            {/*
              to属性：浏览器地址栏中的pathname（location.pathname）
            */}
            <Link to="/first">页面一</Link>
          </li>
        </ul>
        
        {/*
          path属性：路由规则
          component属性：展示的组件
          Route 组件写在哪，渲染出来的组件就展示在哪
        */}
        <Route path="/first" component={First}></Route>
      </div>
    </Router>
 	)
}
```

## Router的说明

**目标**：能够知道 react 路由有两种模式

**内容**：

+ Router 组件：包裹整个应用，一个 React 应用只需要使用一次
+ 两种常用 Router：`HashRouter` 和 `BrowserRouter`  
+ HashRouter：使用 URL 的哈希值实现（http://localhost:3000/#/first）
  - 原理：监听 window 的 `hashchange` 事件来实现的
+ （推荐）**BrowserRouter**：使用 H5 的 history.pushState() API 实现（http://localhost:3000/first）
  - 原理：监听 window 的 `popstate` 事件来实现的

## Link组件的说明

**目标**：能够使用 Link 组件实现路由跳转

**内容**：

`Link` 组件：用于指定导航链接，会渲染成 a 标签

+ `to` 属性，将来会渲染成 a 标签的 href 属性

```jsx
<Link to="/first">页面一</Link>

// 渲染为：
<a href="/first">页面一</a>
```

除了 Link 组件外，路由库中还提供了 `NavLink` 组件，可以在路由匹配时获得一个高亮类名，从而指定高亮效果（样式需要自己手动指定）

- 使用方式同 Link 组件，只是额外获得一个高亮类名

+ `activeClassName` 属性：用于指定高亮的类名，默认 `active`
+ `exact` 属性：精确匹配，表示必须精确匹配（to 属性值和浏览器地址栏中的 pathname 相同），类名才生效
  + 默认情况下，React 路由中的 NavLink 的 to 属性在匹配的时候，默认是 **模糊匹配**
  + **模糊匹配**，表示：只要 浏览器地址栏中的 patchname（比如：/search/a）是以  NavLink to（/search） 属性的值开头的，此时，就会匹配成功

```jsx
<NavLink to="/first">页面一</NavLink>

// 渲染为：
<a href="/first" class="active">页面一</a>


// ---
// Link 的模糊匹配和精确匹配

// 模糊匹配：
// 浏览器地址栏中的 pathname 为：/search/a
// 匹配成功的 to 属性为：
// 1 /search 		==> 模糊匹配成功
// 2 /search/a	==> 完全相同，匹配成功
// 3 /sear			==> 匹配失败，因为 /search 是一块完整的内容，必须要出现这一整块内容才可以

// 精确匹配：
// 浏览器地址栏中的 pathname 为：/search/a
// 注意：添加 exact 属性后，变为精确匹配，此时，这个 NavLink 只能匹配 /search 这一个 patchname 了
// React 中如果属性是 布尔值 可以只写属性名称，不用写后面的 = 等内容
<NavLink exact to="/search">search 页面</NavLink>

// 等价于：
<NavLink exact={true} to="/search">search 页面</NavLink>
```

## Route组件的说明

**目标**：能够使用 Route 组件配置路由规则

**内容**：

`Route` 组件：用来配置路由规则

- `path` 属性，指定路由规则
- `component` 属性，指定要渲染的组件
- `children` 子节点，指定要渲染的组件

```jsx
// 用法一：使用 component 属性指定要渲染的组件
<Route path="/search" component={Search} />

// 用法二：使用 children 指定要渲染的组件
<Route path="/search">
	<Search />
</Route>
```

注意：对于 Route 来说，如果路由规则匹配成功，那么，就会渲染对应组件；否则，渲染 null 或者说不渲染任何内容

对于 Route 组件来说，`path` 属性是可选的：

- 如果 Route 组件没有 path 属性，表示：该路由永远匹配成功，一定会渲染该组件

```jsx
<Route>
	<SomeComponent />
</Route>
```

## 路由匹配模式

**目标**：能够说出路由的两种匹配模式

**内容**：

路由有两种匹配模式：1 模糊匹配（默认） 2 精确匹配

模糊匹配

- 问题：当 Link组件的 to 属性值为 “/login”时，为什么 默认路由 也被匹配成功? 
- 默认情况下，React 路由是**模糊匹配**模式
- 模糊匹配规则：只要 pathname（浏览器地址栏中的地址） 以 path 开头就会匹配成功

```jsx
<Link to="/login">登录页面</Link>
<Route path="/" component={Home} /> 匹配成功

// pathname 代表Link组件的to属性（也就是 location.pathname）
// path 代表Route组件的path属性
```

| path   | 能够匹配的pathname（浏览器地址栏）   |
| ------ | ------------------------------------ |
| /      | 所有 pathname                        |
| /first | /first 或 /first/a 或 /first/a/b/... |

精确匹配

- 问题：默认路由任何情况下都会展示，如何避免这种问题?
- 给 Route 组件添加 `exact` 属性，让其变为**精确匹配**模式
- 精确匹配：只有当 path 和 pathname 完全匹配时才会展示该路由

```jsx
// 此时，该组件只能匹配 pathname=“/” 这一种情况 
<Route exact path="/" component=... />
```

推荐：给默认路由（'/'）添加 exact 属性

## 路由的执行过程

**目标**：能够说出 react 路由切换页面的执行过程

**内容**：

切换页面时，执行过程如下：

1. 点击 Link 组件（a标签），修改了浏览器地址栏中的 url
2. React 路由监听到地址栏 url 的变化  hashchange  popstate
3. React 路由内部遍历所有 Route 组件，使用路由规则（path）与 pathname（hash）进行匹配
4. 当路由规则（path）能够匹配地址栏中的 pathname（hash） 时，就展示该 Route 组件的内容

注意：默认情况下，**React 路由可以同时匹配成功多个**，只要匹配成功，该路由组件对应的内容就会渲染到页面中

## Switch组件与404页面

**目标**：能够通过路由配置 404 页面

**内容**：

`Switch` 组件：包裹 Route 组件，**只会渲染第一个匹配的组件**，即使有多个路由都可以匹配成功

+ 在实际开发时，通常会用 `Switch` 组件包裹 `Route` 组件

+ 通过 `Switch` 组件非常容易的就能实现 404 页面功能：

```jsx
<Switch>
  <Route exact path="/">
  	<Home />
  </Route>
  <Route path="/about">
  	<About />
  </Route>
  <Route path="/user">
  	<User />
  </Route>
  // 即使这个也可以匹配成功 /user/a 但是因为 Switch 组件的存在，这个路由对应的组件内容是不会渲染的
  <Route path="/user/a">
  	<User1 />
  </Route>

	{/* 以上路由规则全都不匹配时，展示 404 页面 */}
  {/* 注意：这个路由需要放在最后，兜底 */}
  <Route>
  	<NoMatch />
  </Route>
</Switch>
```

## 编程式导航

**目标**：能够按钮的点击事件中跳转路由

**内容**：

+  场景：点击登录按钮，登录成功后，通过代码跳转到后台首页，如何实现？
+  编程式导航：通过 JS 代码来实现页面跳转
+  可以通过 `useHistory` hook 来拿到路由提供的 history 对象，用于获取浏览器历史记录的相关信息。常用操作：
   +  `push(path)`：跳转到某个页面，参数 path 表示要跳转的路径
   +  `replace(patch)`：跳转到某个页面，会替换当前的历史记录
   +  `go(n)`： 前进或后退到某个页面，参数 n 表示前进或后退页面数量（比如：-1 表示后退到上一页）

```jsx
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  
	const onLogin = () => {
    // ...
    history.push('/home')
  }
  return (
  	<button onClick={onLogin}>登录</button>
  )
}
```

`push(path)`和 `replace(path)` 跳转路由的区别：

浏览器会自动记录访问过来的页面路径，可以简单的把理解为通过一个 数组 来记录的。

比如：我们访问了 3 个页面：['/login', '/home', '/search']，当前所在页面为：'/search'

1. 此时，如果我们又通过 `push('/a')` 方法访问了一个新页面：'/a'，此时，就相当于往数组中 push 了一条数据，
   - 那么，访问该页面后，浏览器中的记录为：['/login', '/home', '/search', '/a']

2. 此时，如果我们又通过 `replace('/a')` 方法访问了一个新页面：'/a'，此时，就相当于把当前页面地址，替换为 '/a'
   - 那么，访问该页面后，浏览器中的记录为：['/login', '/home', '/a']

