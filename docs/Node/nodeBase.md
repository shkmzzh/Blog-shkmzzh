---
title: Node基础
date: 
tags:
- Node
---
## 初识Node

> 首先搞清楚Node.js是什么？是一门语言么？不!!! 它不是一门语言。[传送门：V8 JavaScript引擎](https://www.nodeapp.cn/)

##### node能干啥

`Node.js` 是JavaScript的运行环境，这个环境提供了非常齐全的原生的功能以及API。更重要的是一些公司或个人对这些原生的功能进行封装，形成了很多强大的工具以及框架

1. [Express 框架]((http://www.expressjs.com.cn/)，)/[Koa 框架](https://www.koajs.com.cn/) 可以快速构建web应用
2. [Electron 框架](https://electronjs.org/) 可以构建跨平台的桌面应用
3. [Crawler 框架](https://www.npmjs.com/package/crawler) 可以快速开发爬虫应用
4. 操作数据库
5. 创建实用的命令行工具辅助前端开发
6. etc ...

总之，Node.js 是大前端时代的“大宝剑”，有了 Node.js 这个超级 buff的加持，前端程序员的行业竞争力会越来越强！

 ##### 如果 power shell 无法执行 Node，可尝试使用以下方式解决

在powershell命令行下执行   `get-ExecutionPolicy`，如果显示的是Restricted说明他是禁止的。 接下来就要执行   `set-ExecutionPolicy RemoteSigned`   回车，输入A 然后回车就好了。 如果出现问题就以管理员身份打开powershell，再运行以上命令



## Buffer 缓冲区

> [Buffer 缓冲区文档](https://www.nodeapp.cn/buffer.html)

- Buffer 的结构与数组类似，操作方法也与数组类似
- 数组不能存储二进制文件，Buffer 是专门存储二进制数据的
- Buffer 存储的是二进制数据，显示时以 16 进制的形式显示
- Buffer 每一个元素范围是 00~ff，即 0~255、00000000~11111111
- 每一个元素占用一个字节内存
- Buffer 是对底层内存的直接操作，因此大小一旦确定就不能修改

Buffer 常用方法：

- `Buffer.from(str[, encoding])`：将一个字符串转换为 Buffer
- `Buffer.alloc(size)`：创建指定大小的 Buffer
- `Buffer.alloUnsafe(size)`：创建指定大小的 Buffer，可能包含敏感数据（分配内存时不会清除内存残留的数据）
- `buf.toString()`：将 Buffer 数据转为字符串

```js
var str = 'Hello前端'

var buf = Buffer.from(str)

// 占用内存的大小，一个汉字3字节 13
console.log(buf.length)
// 字符串的长度 7
console.log(str.length)
// 8进制输出第一个元素 145
console.log(buf[1].toString(8))

//创建一个10个字节的buffer
var buf2 = Buffer.alloc(10)
//通过索引，来操作buf中的元素
buf2[0] = 88
buf2[1] = 255
buf2[2] = 0xaa
buf2[3] = 255

var buf3 = Buffer.allocUnsafe(10)
console.log(buf3)
```



## global - 全局变量

在Node.js中一个js文件就是一个模块。 所谓的全局变量或对象就是，当Node.js执行任何一个js文件之前，会向这个文件中注入一些变量、方法、对象 ...，方便程序员使用 [全局变量传送门](https://www.nodeapp.cn/globals.html)

### 全局变量

当Node.js执行某个js文件之前，会向这个文件中注入如下一些全局变量。



> __dirname    ：获取当前文件(模块)所在的目标名，绝对路径



> __filename   ：获取当前文件名(模块名)



> console     ：console.log()  打印输出

### 全局对象

当Node.js执行某个js文件之前，会向这个文件中注入如下一些全局对象。

- global对象

类似于window对象，这个对象上有如下方法

> - setInterval()
> - clearInterval()
> - setTimeout()
> - clearTimeout()

- 这些方法的访问也不需要加 global

- Node.js中不再有window、DOM、BOM，Node.js环境从v8中剔除了这些用不到的内容。

>  require()  导入模块



> exports  今天混个脸熟，后续会使用



> module  今天混个脸熟，后续会使用

**小结**：以上全局注入的，不需要定义，直接使用即可，在任何一个文件中都可以直接使用。



## fs 文件系统模块

- fs 模块中所有的操作都有两种形式可供选择:同步和异步
- 同步文件系统会阻塞程序的执行，也就是除非操作完毕，否则不会向下执行代码
- 异步文件系统不会阻塞程序的执行，而是在操作完成时，通过回调函数将结果返回

[Fs模块文档](https://www.nodeapp.cn/fs.html)

打开模式：

| 模式 | 说明                                     |
| ---- | ---------------------------------------- |
| r    | 读取文件，文件不存在抛异常               |
| r+   | 读写文件，文件不存在抛异常               |
| rs   | 同步模式下打开文件用于读取               |
| rs+  | 同步模式下打开文件用于读写               |
| w    | 写文件，不存在则创建，存在则覆盖原有内容 |
| wx   | 写文件，文件存在打开失败                 |
| w+   | 读写文件，不存在创建，存在截断           |
| wx+  | 读写，存在打开失败                       |
| a    | 追加，不存在创建                         |
| ax   | 追加，存在失败                           |
| a+   | 追加和读取，不存在创建                   |
| ax+  | 追加和读取，存在失败                     |

### 读取文件

#### 简单文件读取

语法格式：

```js
fs.readFile(path[, options], callback)
#or
fs.readFileSync(path[, options])
```

- `path`：文件路径
- `options`：配置选项，若是字符串则指定编码格式
  - `encoding`：编码格式
  - `flag`：打开方式
- `callback`：回调函数
  - `err`：错误信息
  - `data`：读取的数据，如果未指定编码格式则返回一个 Buffer

```js
const fs = require('fs')

fs.readFile('./files/1.txt', 'utf-8', function(err, data) => {
  if(err) {
    return console.log('failed!' + err.message)
  }
  console.log('content:' + data)
})
# or
const file = fs.readFileSync(path , 'utf-8')
-------------------------------------------
// 复制文件内容
fs.readFile("C:/Users/笔记.mp3", function(err, data) {
	if(!err) {
		console.log(data);
		// 将data写入到文件中
		fs.writeFile("C:/Users/hello.jpg", data, function(err){
			if(!err){
				console.log("文件写入成功");
			}
		} );
	}
});
```

#### 流式文件读取

- 简单文件读取的方式会一次性读取文件内容到内存中，若文件较大，会占用过多内存影响系统性能，且读取速度慢
- 大文件适合用流式文件读取，它会分多次将文件读取到内存中

```js
var fs = require('fs')

// 创建一个可读流
var rs = fs.createReadStream('C:/Users/笔记.mp3')
// 创建一个可写流
var ws = fs.createWriteStream('a.mp3')

// 监听流的开启和关闭
// 这几个监听不是必须的
rs.once('open', function () {
  console.log('可读流打开了~~')
})

rs.once('close', function () {
  console.log('可读流关闭了~~')
  //数据读取完毕，关闭可写流
  ws.end()
})

ws.once('open', function () {
  console.log('可写流打开了~~')
})

ws.once('close', function () {
  console.log('可写流关闭了~~')
})

//要读取一个可读流中的数据，要为可读流绑定一个data事件，data事件绑定完毕自动开始读取数据
rs.on('data', function (data) {
  console.log(data)
  //将读取到的数据写入到可写流中
  ws.write(data)
})
```

简便方式：

```js
var fs = require('fs')

var rs = fs.createReadStream('C:/Users/lilichao/Desktop/笔记.mp3')
var ws = fs.createWriteStream('b.mp3')

// pipe()可以将可读流中的内容，直接输出到可写流中
rs.pipe(ws)
```

### 写入文件

#### 简单文件写入

语法格式：

```js
fs.writeFile(file, data[, options], callback)
# or
fs.writeFileSync(file, data[, options])
```

- `file`：文件路径
- `data`：写入内容
- `options`：配置选项，包含 `encoding, mode, flag`；若是字符串则指定编码格式
- `callback`：回调函数

```js
const fs = require('fs')
fs.writeFile('./files/2.txt', 'Hello Nodejs', function (err) {
  if (err) {
    return console.log('failed!' + err.message)
  }
  console.log('success!')
})

fs.writeFileSync('b.txt','唱跳rep篮球')

---------------------------------------------

fs.writeFile('C:/Users/hello.txt', '通过 writeFile 写入的内容', { flag: 'w' }, function (err) {
  if (!err) {
    console.log('写入成功！')
  } else {
    console.log(err)
  }
})
```

#### 流式文件写入

```js
// 同步、异步、简单文件的写入都不适合大文件的写入，性能较差，容易导致内存溢出
var fs = require('fs')

// 创建一个可写流
var ws = fs.createWriteStream('hello3.txt')

ws.once('open', function () {
  console.log('流打开了~~')
})

ws.once('close', function () {
  console.log('流关闭了~~')
})

// 通过ws向文件中输出内容
ws.write('通过可写流写入文件的内容')
ws.write('1')
ws.write('2')
ws.write('3')
ws.write('4')

// 关闭流
ws.end()
```

### 路径动态拼接问题 `__dirname`

- 在使用 fs 模块操作文件时，如果提供的操作路径是以 `./` 或 `../` 开头的相对路径时，容易出现路径动态拼接错误的问题
- 原因：代码在运行的时候，会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径
- 解决方案：在使用 fs 模块操作文件时，直接提供完整的路径，从而防止路径动态拼接的问题
- `__dirname` 获取文件所处的绝对路径

```js
fs.readFile(__dirname + '/files/1.txt', 'utf8', function(err, data) {
  ...
})
```

### 其它操作

验证路径是否存在：

- `fs.exists(path, callback)`
- `fs.existsSync(path)`

获取文件信息：

- `fs.stat(path, callback)`
- `fs.stat(path)`

删除文件：

- `fs.unlink(path, callback)`
- `fs.unlinkSync(path)`

列出文件：

- `fs.readdir(path[,options], callback)`
- `fs.readdirSync(path[, options])`

截断文件：

- `fs.truncate(path, len, callback)`
- `fs.truncateSync(path, len)`

建立目录：

- `fs.mkdir(path[, mode], callback)`
- `fs.mkdirSync(path[, mode])`

删除目录：

- `fs.rmdir(path, callback)`
- `fs.rmdirSync(path)`

重命名文件和目录：

- `fs.rename(oldPath, newPath, callback)`
- `fs.renameSync(oldPath, newPath)`

监视文件更改：

- `fs.watchFile(filename[, options], listener)`

## path 路径模块

path 模块是 Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。[Path模块文档](https://www.nodeapp.cn/path.html)
- path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。

### 路径拼接 `path.join()`

```js
const path = require('path')
const fs = require('fs')

// 注意 ../ 会抵消前面的路径
// ./ 会被忽略
const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')
console.log(pathStr) // \a\d\e

fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function (err, dataStr) {
  if (err) {
    return console.log(err.message)
  }
  console.log(dataStr)
})
```

### 获取路径中文件名 `path.basename()`

使用 `path.basename()` 方法，可以获取路径中的最后一部分，常通过该方法获取路径中的文件名

```js
path.basename(path[, ext])
```

- path: 文件路径
- ext: 文件扩展名

```js
const path = require('path')

// 定义文件的存放路径
const fpath = '/a/b/c/index.html'

const fullName = path.basename(fpath)
console.log(fullName) // index.html

const nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt) // index
```

### 获取路径中文件扩展名 `path.extname()`

```js
const path = require('path')

const fpath = '/a/b/c/index.html'

const fext = path.extname(fpath)
console.log(fext) // .html
```

## http 模块

http 模块是 Node.js 官方提供的、用来创建 web 服务器的模块。[http模块文档](https://www.nodeapp.cn/http.html)

### 创建基本 Web 服务器

```js
const http = require('http')

// 创建 web 服务器实例
const server = http.createServer()

// 为服务器实例绑定 request 事件，监听客户端的请求
server.on('request', function (request, response) {
  const url = request.url
  const method = request.method
  const str = `Your request url is ${url}, and request method is ${method}`
  console.log(str)

  // 设置 Content-Type 响应头，解决中文乱码的问题
  response.setHeader('Content-Type', 'text/html; charset=utf-8')
  // 向客户端响应内容
  response.end(str)
})

server.listen(8080, function () {
  console.log('server running at http://127.0.0.1:8080')
})
```

### 请求对象 与 响应对象

> [传送门:request](http://nodejs.cn/api/http.html#http_request_method) [传送门:response](http://nodejs.cn/api/http.html#http_class_http_serverresponse)

- `server.on('request', ()=>{})` 		注册request事件
- 上面这条语句的作用是，只要有请求发过来，首先会触发request事件。request事件会 `将请求对象` 与 `响应对象` 传递给后面的回调函数。
- *请求对象*

​     服务器会将请求的相关信息保存到request对象上，我们可以通过request对象读取所有需要的请求信息。

- *响应对象*

  当处理结束后，通过response响应对象，向客户端响应数据。

### 请求对象常用的属性

- **headers**

  > 获取所有请求头的信息

- **method**

  > 获取请求方式

- **url**

  > 请求的url中的信息

```javascript
const http = require('http')

const server = http.createServer()

server.on('request', (request, response)=>{
  // console.log('注意有新请求');
    /* 
    request为请求对象，请求对象可以帮助我们获取请求的方式，与请求的url信息
        request.method          获取请求方式
        request.url             获取请求的url
        request.headers         获取请求头信息
    
    */
    console.log('本次请求方式为:', request.method);
    console.log('本次请求的url为:', request.url);
    console.log('本次请求的请求头信息为:', request.headers);

})

server.listen(4201, ()=>{
  console.log('server is running ...');
})
```

### 响应对象常用的属性

- 响应行设置

  - **statusCode**

    > 用于设置响应的状态码

  - **statusMessage**

    > 用于设置响应的描述信息，如果不设置，会根据 statusCode自动设置，不能直接设置汉字

- 响应头设置

  - **setHeader(header,value)**

    > 用于设置响应头信息

- 综合性设置

  - **writeHead(statusCode, statusMessage, options)**

    > 综合性的设置响应，同时设置状态码、状态描述、响应头 相当于 statusCode + statusMessage + setHeader

- 响应数据

  - **write(data)**

    > 设置向浏览器响应的数据，可以连续设置多次

- 结束响应

  - **end()**

    > 通知浏览器，所有的响应头和响应体都已发送完毕，本次请求处理完毕。

  - **end(data)**

    > 通知浏览器，所有的响应头和响应体都已发送完毕，本次请求处理完毕，同时还可以响应最后一次数据。

 *注意*：响应头，状态码，状态描述，要在write之前设置，否则无效果。

```javascript
const http = require('http')

const server = http.createServer()

server.on('request', (request, response)=>{
  // console.log('注意有新请求');
    /* 
    reponse为响应对象，响应对象可以帮助我们向客户端进行各种响应
        // 设置响应行
        response.statusCode     设置状态码
        response.statusMessage  设置状态描述，不设置会根据状态码自动生成

        // 设置响应头
        response.setHeader(header,value)    设置响应头
        
        // 综合设置
        response.writeHead()                设置状态码，状态描述，响应头
            功能相当于 statusCode statusMessage setHeader()
        
        // 响应数据
        response.write(数据)

        // 结束响应
        response.end()
        response.end(数据)
    
    */
    /* 
    // 设置响应行
    response.statusCode = 401
    response.statusMessage = encodeURI('认证失败')
    response.end('hello');
    */

    /* 
    // 设置响应头
    // response.setHeader('Content-type','text/html;charset=utf8')
    response.setHeader('Content-type','text/plain;charset=utf8')
    response.write('<table border="1"><tr><td>姓名</td><td>年龄</td></tr></table>')
    response.end();
    */

    /* 
    综合性设置
    */
    response.writeHead(200,'success',{'content-type':'text/html;charset=utf8'})
    response.write('<table border="1"><tr><td>姓名</td><td>年龄</td></tr></table>')
    response.end('<h1>hello</h1>');

})

server.listen(4201, ()=>{
  console.log('server is running ...');
})
```

## 模块化

### 模块化概念

- 模块化是指解决一个复杂问题时，自顶向下逐层把系统划分为若干模块的过程，模块是可组合、分解和更换的单元。
- 模块化可提高代码的复用性和可维护性，实现按需加载。
- 模块化规范是对代码进行模块化拆分和组合时需要遵守的规则，如使用何种语法格式引用模块和向外暴露成员。

### Node.js 中模块的分类

- 内置模块
- 自定义模块
- 第三方模块

### Node.js 中的模块作用域

- 和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域
- 防止全局变量污染

### 模块作用域的成员

- 自定义模块中都有一个 `module` 对象，存储了和当前模块有关的信息
- 在自定义模块中，可以使用 `module.exports` 对象，将模块内的成员共享出去，供外界使用。导入自定义模块时，得到的就是 `module.exports` 指向的对象。
- 默认情况下，`exports` 和 `module.exports` 指向同一个对象。最终共享的结果，以 `module.exports` 指向的对象为准。

### CommonJS 模块化规范

- 每个模块内部，`module` 变量代表当前模块
- `module` 变量是一个对象，`module.exports` 是对外的接口
- 加载某个模块即加载该模块的 `module.exports` 属性

### 模块加载机制

模块第一次加载后会被缓存，即多次调用 `require()` 不会导致模块的代码被执行多次，提高模块加载效率。

#### 内置模块加载

内置模块加载优先级最高。

#### 自定义模块加载

加载自定义模块时，路径要以 `./` 或 `../` 开头，否则会作为内置模块或第三方模块加载。

导入自定义模块时，若省略文件扩展名，则 Node.js 会按顺序尝试加载文件：

- 按确切的文件名加载
- 补全 `.js` 扩展名加载
- 补全 `.json` 扩展名加载
- 补全 `.node` 扩展名加载
- 报错

#### 第三方模块加载

- 若导入第三方模块， Node.js 会从**当前模块的父目录**开始，尝试从 `/node_modules` 文件夹中加载第三方模块。
- 如果没有找到对应的第三方模块，则移动到再**上一层父目录**中，进行加载，直到**文件系统的根目录**。

例如，假设在 `C:\Users\bruce\project\foo.js` 文件里调用了 `require('tools')`，则 Node.js 会按以下顺序查找：

- `C:\Users\bruce\project\node_modules\tools`
- `C:\Users\bruce\node_modules\tools`
- `C:\Users\node_modules\tools`
- `C:\node_modules\tools`

#### 目录作为模块加载

当把目录作为模块标识符进行加载的时候，有三种加载方式：

- 在被加载的目录下查找 `package.json` 的文件，并寻找 `main` 属性，作为 `require()` 加载的入口
- 如果没有 `package.json` 文件，或者 `main` 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 `index.js` 文件。
- 若失败则报错