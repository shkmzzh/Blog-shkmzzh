---
title: Express
date: 
tags:
- Node
---
> 基于 Node.js 平台，快速、开放、极简的 Web 开发框架 [官网传送门](https://www.expressjs.com.cn/)

Express 是用于快速创建服务器的第三方模块。

## Express 初体验

### 基本使用

安装 Express：

```bash
npm install express
```

创建服务器，监听客户端请求，并返回内容：

```js
const express = require('express')
// 创建 web 服务器
const app = express()

// 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  res.send({ name: 'zs', age: 20, gender: '男' })
})
app.post('/user', (req, res) => {
  res.send('请求成功')
})

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```

### query对象

**获取 URL 中携带的查询参数**

通过 `req.query`对象，可以访问到客户端通过 *查询字符串* 的形式，发送到服务器的参数：

```js
app.get('/',(request,response) =>{
 # request.query 默认是一个空对象
 # 客户端使用 ?name=zs&age=20 这种查询字符串形式，发送到服务器的参数
 # 可以通过 request.query 对象访问到,例如
 # req.query.name  req.query.age
    console.log(req.query)
})
------------------------------------------
```

### params对象

**获取 URL 中的动态参数**

通过 req.params 对象，可以访问到 URL 中，通过 `:` 匹配到的 *动态参数*

```js
// 这里的 :id :username是动态的参数
# URL地址中，可以通过 : 参数名的形式，匹配到动态参数：
app.get('/user/:id/:username', (request, respones) => {
  # request.params 默认是一个空对象
  # 里面存放着通过 ： 动态匹配到的参数值
  console.log(request.params)
})
```

## 托管静态资源

**1.express.static()**

express 提供了一个非常好用的函数，叫做 `express.static()`通过它，我们可以非常方便地创建一个静态资源服务器

- 例如，通过如下代码就可以将 public 目录下的图片，css文件，js文件 对外公开访问了。不需要向之前用 `request.url`来指定路径啦

```js
app.use(express.static('public'))
----------------------------------
/*可直接访问 public 目录下的静态资源
http://localhost:3000/images/bg.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/login.js*/
```

- *注意*：Express 在指定的静态目录中查找文件，并对外提供资源的访问路径，因此存放在静态文件的目录名不会出现在 URL 中

**2.托管多个静态资源目录**

如果要托管多个静态资源目录，请多次调用 `express.static()`函数：

```js
app.use(express.static('public'))
app.use(express.static('./clock'))
```

- 访问静态资源文件时，express.static() 函数会根据目录的添加*顺序*查找所需的文件

**3.挂载路径前缀**

如果希望在托管的 *静态资源访问路径*之前，挂载路径前缀，则可以使用如下方式：

```js
app.use('/pubilc',express.static('public'))
```

> 现在，你就可以通过带有 `/public` 前缀地址来访问 public 目录中的文件了：
>
> ```js
> http://localhost:3000/public/images/bg.jpg
> http://localhost:3000/public/css/style.css
> http://localhost:3000/public/js/login.js
> ```
>
> 

## Express 路由

在 Express 中，路由指的是 客户端的请求与服务器处理函数之间的映射关系。

Express 中的路由分 3 部分组成，分别是 *请求的类型*，*请求的URL地址*，*处理函数*，格式如下

> app.METHOD(PATH,HANDLER)

Express中的路由例子

```js
 匹配 GET 请求，且请求 URL 为 /
app.get('/',function(req,res){
res.send('Hello World')
})
-------------------------------------
匹配 GET 请求，且请求 URL 为 /post
app.post('/post',function(req,res){
res.send('Hello World')
})
```

*注意：*如果挂载的路由变多，就不推荐使用这种方式了，实际开发中更推荐下面这种

**模块化路由**

为了方便对路由进行模块化的管理，Express不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模块，我们可以创建 `express.Router`路由对象，将路由挂载到上面，实现， 模块化路由。

*创建路由模块*：

```js
index.js

// 1.导入express
const express = require('express')
// 2.创建路由对象
const router = express.Router()

// 3.挂载具体路由
router.get('/user/list', (req, res) => {
  res.send('Get user list.')
})
router.post('/user/add', (req, res) => {
  res.send('Add new user.')
})

// 4.向外导出路由对象
module.exports = router
```

*注册路由模块*：

```js
const express = require('express')
const app = express()
//导入路由
const router = require('./index.js')
// 注册路由模块
//app.use(router)
可以添加访问前缀，访问URL时就得加上 /api 了
app.use('/api', router)

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

## Express 中间件

### 中间件的概念与格式

**概念**

- 中间件是指流程的中间处理环节

当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行*预处理*

<img src='https://img-blog.csdnimg.cn/fa79be40e9da405dbad952c4fe465e48.png'>

- 上一个中间件的输出会作为下一个中间件的输入
- 而 *next函数*是实现 多个中间件连续调用 的关键，它表示把流转关系转交给*下一个中间件或路由*。

**格式**

Express的中间件，本质上就是一个 `function 处理函数`,Express中间件的格式·如下

<img src='https://img-blog.csdnimg.cn/aed096ef030748b7b2149c6b7b9679c3.png'>

*注意*：中间件函数的形参列表中，必须包含 `next`函数，而路由处理函数中只包含 request 和response

**定义中间件函数**

可以通过如下的方式，定义一个最简单的中间件函数：

```js
// 常量 mw 所指向的，就是一个中间件函数
const mw =function(req,res,next){
 console.log('这是一个最简单的中间件函数')
    next()
 注意：在当前中间件的业务处理完毕以后，必须调用 next()函数
 表示把流转关系转交给下一个中间件或路由
}
```

### 全局中间件

- 客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局中间件。
- 通过调用 app.use(`中间件函数`)， 即可定义一个全局生效的中间件，示例代码如下：

```js
// 常量 mw 所指向的，就是一个中间件函数
const mw =function(req,res,next){
 console.log('这是一个最简单的中间件函数')
    next()
}
// 全局生效的中间件
app.use(mw)
```

**中间件的作用**

多个中间件之间，共享*同一份 req 和 res*，基于这样的特性，我们可以在上游的中间件中，*统一*为req或res对象添加自定义属性或方法，供下游的中间件或路由进行使用。

<img src='https://img-blog.csdnimg.cn/30f110d84f7640f4a691e2fd47700322.png'>

##### 代码示例

```js
cosnt express = require('express')
const app = express()
 通过简写的方式将中间件挂载到 app.use 上
app.use(function(req,res,next){
//获取请求到达服务器的时间
const time = Date.now()
为 req 对象,挂载自定义属性，从而把时间共享给后面的所有路由
req.startTime =time
//next()函数要写在最后面
next()
})

app.get('/', (req, res) => {
  res.send('User page.'+req.startTime)
})

app.get('/user', (req, res) => {
  res.send('User page.'+req.startTime)
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

**定义多个全局全局中间件**

可以使用app.use() 连续定义多个全局中间件，客户端请求到达服务器之后，会按照中间件*定义的先后顺序*依次进行调用：示例代码如下：

```js
const express = require('express')
const app = express()

// 定义第一个全局中间件
app.use((req, res, next) => {
  console.log('调用了第1个全局中间件')
  next()
})
// 定义第二个全局中间件
app.use((req, res, next) => {
  console.log('调用了第2个全局中间件')
  next()
})

// 调用该路由之后会依次输出两个中间件内容
app.get('/user', (req, res) => {
  res.send('User page.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

### 中间件的五个注意事项

- 1.一定要在 路由之前 注册中间件
- 2.客户端发送过来的请求，可以连续调用多个中间件进行处理
- 3.执行完中间件的业务代码之后，不要忘记调用 next() 函数
- 4.为了防止代码逻辑混乱，一定要在最后调用 next() 函数
- 5.连续调用多个中间件时，多个中间件之间，共享 request 和 response 对象

### 局部中间件

不使用 app.use() 定义的中间件，叫做局部生效的中间件，示例代码如下：

```js
// 定义中间件函数
const mw1 = (req, res, next) => {
  console.log('调用了第一个局部生效的中间件 
  next()
}
// mw1 这个中间件只在 '当前路由中生效'，这种用法属于 '局部生效的中间件'
app.get('/',mw1,function(req,res){
res.send('Home page.')
})
//mw1 这个中间件不会影响下面这个路由 
app.get('/user',function(req,res){ res.send('Home page.') })
```

#### **定义多个局部中间件**

可以在路由中，通过如下两种 *等价*的方式，使用多个局部中间件 ：

```js
const express = require('express')
const app = express()

// 定义中间件函数
const mw1 = (req, res, next) => {
  console.log('调用了第一个局部生效的中间件')
  next()
}

const mw2 = (req, res, next) => {
  console.log('调用了第二个局部生效的中间件')
  next()
}

//以下两种写法是完全 '等价的',可根据自己的喜好，选择任意一种方式
app.get('/hello', mw2, mw1, (req, res) => res.send('hello page.'))
app.get('/about', [mw1, mw2], (req, res) => res.send('about page.'))

app.get('/user', (req, res) => res.send('User page.'))

app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```

### 中间件分类

**应用级别的中间件**

- 通过 `app.use()` 或 `app.get()` 或 `app.post()` ，绑定到 `app` 实例上的中间件

**路由级别的中间件**

- 绑定到 `express.Router()` 实例上的中间件，叫做路由级别的中间件。用法和应用级别中间件没有区别。应用级别中间件是绑定到 `app` 实例上，路由级别中间件绑定到 `router` 实例上。

```js
const app = express()
const router = express.Router()

router.use(function (req, res, next) {
  console.log(1)
  next()
})

app.use('/', router)
```

**错误级别的中间件**

- 用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题
- 错误级别中间件的处理函数中，必须有 4 个形参，形参顺序从前到后分别是 `(err, req, res, next)` 。
- 错误级别的中间件必须注册在所有路由之后

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  throw new Error('服务器内部发生了错误！') //抛出一个自定义错误
  res.send('Home page.')
})

// 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error：' + err.message)  //向客户端响应错误内容
})

app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```

**Express 内置中间件**

自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

- `express.static` 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
- `express.json` 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
- `express.urlencoded` 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```js
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
```

5. 第三方中间件

## CORS 跨域资源共享

### cors 中间件解决跨域

- 安装中间件：`npm install cors`
- 导入中间件：`const cors = require('cors')`
- 配置中间件：`app.use(cors())`

### CORS

- CORS（Cross-Origin Resource Sharing，跨域资源共享）解决跨域，是通过 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源
- 浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可解除浏览器端的跨域访问限制
- CORS 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了 CORS 的接口。
- CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。

### CORS 常见响应头

- `Access-Control-Allow-Origin`：制定了允许访问资源的外域 URL

```js
res.setHeader('Access-Control-Allow-Origin', 'http://bruceblog.io')
res.setHeader('Access-Control-Allow-Origin', '*')
```

- `Access-Control-Allow-Headers`
- 默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头：`Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）`
- 如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 A`ccess-Control-Allow-Headers` 对额外的请求头进行声明，否则这次请求会失败！

```js
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header')
```

- `Access-Control-Allow-Methods`
- 默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 `Access-Control-Alow-Methods` 来指明实际请求所允许使用的 HTTP 方法

```js
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
res.setHEader('Access-Control-Allow-Methods', '*')
```

### CORS 请求分类

#### 简单请求

- 请求方式：GET、POST、HEAD 三者之一
- HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值 application/x-www-formurlencoded、multipart/form-data、text/plain）

#### 预检请求

- 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
- 请求头中包含自定义头部字段
- 向服务器发送了 application/json 格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据