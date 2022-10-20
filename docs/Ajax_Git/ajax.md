---
title: Ajax
date: 
tags:
- Ajax
---

### 服务器相关概念

**服务器**

简而言之就是在网上提供*服务*的*计算机*，它的本质就是网络上的一台配置非常高的电脑。 我们是看不到的，但我们经常使用它为我们提供的服务，比如： 	微信 	网易云音乐 	*浏览器*

 **客户端(浏览器端)**

简单理解就是我们的个人电脑。个人电脑去访问服务器提供的服务。

**通讯过程**

以咱们用的最多的*浏览器*为例，和服务器通讯的过程就像*聊微信*?

1. 我:---> 你好?在吗?欠我的钱,什么时候还?
2. 他:--->不在!不还!

<img src="https://img-blog.csdnimg.cn/54da1da6b1fd466eb32e019b0326d377.webp">

一次通讯有两部分组成：*请求* 与 *响应*

### url地址格式及作用

**url 格式**

- > 协议名
  >
  > - http:
  > - https:
  > - ftp:

- > 主机名
  >
  > - ip地址
  >
  > -  网络中电脑的唯一标识
  >
  > - 域名：为了方便记忆，例如： [www.baidu.com](http://www.baidu.com)
  >
  >   最终也要转换成ip地址

- 端口号

  - 计算机安装的软件在进行网络通讯时的标识。

<img src="https://img-blog.csdnimg.cn/73b76caa59b64f5ba5a300c1906a218e.webp">

- 请求信息

  > http://www.thinker.com:8080/请求信息 端口号后面的即为请求信息，具有如下含意：

  - 请求服务器上的什么文件，
  - 本次请求给向服务器携带了什么样的数据，
  - 本次请求有什么目的
  - 等等......

  ### AJAX 概念

  认识了服务器之后,咱们来认识以下`ajax`,并且体验以下他能够实现的效果

   **概念**

  AJAX 是异步的 JavaScript 和 XML（**A**synchronous **J**avaScript **A**nd **X**ML）。简单点说，就是使用 `XMLHttpRequest` 对象与服务器通信。 它可以使用 JSON，XML，HTML 和 text 文本等格式发送和接收数据。AJAX 最吸引人的就是它的“异步”特性，也就是说它可以在不重新刷新页面的情况下与服务器通信，交换数据，或更新页面。

  **AJAX 应用最主要的两个特点**：

  - 在不重新加载页面的情况下发送请求给服务器。
  - 接受并使用从服务器发来的数据。
  - 不但要向服务器发起请求，还要能够接收服务器响应的结果。这一点初学者一定要意识到。

## 请求报文&响应报文

### http - 请求报文

浏览器 与 服务器进行通讯时，每次浏览器发出的请求，叫请求报文

**组成 与 查看方法**

> 请求报文组成：
>
> 1. 请求行
> 2. 请求头
> 3. 空行
> 4. 请求体

具体格式如下图：

<img src="https://img-blog.csdnimg.cn/9fdfd44ce4c943ed95c0cc38e26d04ac.webp">

 **小结**

- 请求报文是自动生成，还是人为设置的?
  1. 由浏览器自动生成，也可以人为的修改或添加
- 请求的方法和地址
  - 在请求报文的哪里?
  - 请求行中

### http - 响应报文

**组成 与 查看方法**

浏览器 与 服务器进行通讯时，每次服务器的响应，叫响应报文

> 响应报文由:
>
> 1. 状态行
> 2. 响应头部
> 3. 空行
> 4. 响应体

具体格式如下图：

<img src="https://img-blog.csdnimg.cn/385cae9255c64dc6a084e7007977cc0f.webp">

**小结**

- 响应报文中状态码在哪里?

  *状态行*

- 响应报文中的服务器返回的内容在哪里?

  *响应(主)体*

### http - 响应状态码

服务器响应的内容中除了响应体以外，还有一个需要重点关注的信息，`http状态码`

服务器对本次请求所处理的结果以一个编码进行体现，这个状态码是我们需要关注的。

[传送门:MDN-HTTP状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)  	HTTP response status codes

**概念 与 作用**

- 概念

> 状态码反应了，服务器对本次请求所处理的结果，由三位数字组成。

- 作用

> 状态码会作为前端人员判断请求处理结果的依据。

<img src="https://img-blog.csdnimg.cn/17a73d9e268f496da3348ae0e68c0acb.webp">

**常见的状态码**

不仅仅只有这几个，这里只是列举了常见的

| 状态码 | 状态码描述            | 说明                                               |
| ------ | --------------------- | -------------------------------------------------- |
| 200    | OK                    | 请求成功。                                         |
| 201    | Created               | 资源在服务器端已成功创建。                         |
| 304    | Not Modified          | 资源在客户端被缓存，响应体中不包含任何资源内容！   |
| 400    | Bad Request           | 客户端的请求方式、或请求参数有误导致的请求失败！   |
| 401    | Unauthorized          | 客户端的用户身份认证未通过，导致的此次请求失败！   |
| 404    | Not Found             | 客户端请求的资源地址错误，导致服务器无法找到资源！ |
| 500    | Internal Server Error | 服务器内部错误，导致的本次请求失败！               |

**小结**

状态码很多，但对于前端更多的是关注以下几个状态码：

- 200

  > 请求被成功处理

- 401

  > 在涉及到身份认证操作时，身份认证失败

- 404

  > url地址错误

- 400

  > 请求参数错误

  ## XMLhttpRequest介绍

  Ajax(Asynchronous  JavaScript  and  XML)不是指一种单一的技术，而是有机地利用了一系列相关的技术。虽然其名称包含XML，但实际上数据格式可以由[JSON](https://link.juejin.cn?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2FJSON)代替，进一步减少数据量，形成所谓的AJAJ。为了使用JavaScript向服务器发出 [HTTP](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen%2FHTTP) 请求，需要一个提供此功能的类的实例。这就是XMLHttpRequest的由来。这样的类最初是在Internet Explorer中作为一个名为XMLHTTP的ActiveX对象引入的。然后，Mozilla，Safari和其他浏览器，实现一个XMLHttpRequest类，支持Microsoft的原始ActiveX对象的方法和属性。同时微软也实现了XMLHttpRequest。

  显而易见XMLHttpRequest类是重中之重了。

  ### **XMLhttpRequest属性**

  ##### onreadystatechange

  一个JavaScript函数对象，当readyState属性改变时会调用它。回调函数会在user interface线程中调用。

  ##### readyState

  HTTP 请求的状态.当一个 XMLHttpRequest 初次创建时，这个属性的值从 0 开始，直到接收到完整的 HTTP 响应，这个值增加到 4。

  5 个状态中每一个都有一个相关联的非正式的名称，下表列出了状态、名称和含义：

  | 状态 | 名称          | 描述                                                         |
  | ---- | ------------- | ------------------------------------------------------------ |
  | 0    | Uninitialized | 初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。 |
  | 1    | Open          | open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。 |
  | 2    | Sent          | Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。 |
  | 3    | Receiving     | 所有响应头部都已经接收到。响应体开始接收但未完成。           |
  | 4    | Loaded        | HTTP 响应已经完全接收。                                      |

  readyState 的值不会递减，除非当一个请求在处理过程中的时候调用了 abort() 或 open() 方法。每次这个属性的值增加的时候，都会触发 onreadystatechange 事件句柄。

  ##### responseText

  目前为止为服务器接收到的响应体（不包括头部），或者如果还没有接收到数据的话，就是空字符串。

  如果 readyState 小于 3，这个属性就是一个空字符串。当 readyState 为 3，这个属性返回目前已经接收的响应部分。如果 readyState 为 4，这个属性保存了完整的响应体。

  如果响应包含了为响应体指定字符编码的头部，就使用该编码。否则，假定使用 Unicode UTF-8。

  ##### responseXML

  对请求的响应，解析为 XML 并作为 Document 对象返回。

  ##### status

  由服务器返回的 HTTP 状态代码，如 200 表示成功，而 404 表示 "Not Found" 错误。当 readyState 小于 3 的时候读取这一属性会导致一个异常。

  ##### statusText

  这个属性用名称而不是数字指定了请求的 HTTP 的状态代码。也就是说，当状态为 200 的时候它是 "OK"，当状态为 404 的时候它是 "Not Found"。和 status 属性一样，当 readyState 小于 3 的时候读取这一属性会导致一个异常。

  ### **XMLHttpRequest方法**

  ##### abort()

  取消当前响应，关闭连接并且结束任何未决的网络活动。

  这个方法把 XMLHttpRequest 对象重置为 readyState 为 0 的状态，并且取消所有未决的网络活动。例如，如果请求用了太长时间，而且响应不再必要的时候，可以调用这个方法。

  ##### getAllResponseHeaders()

  把 HTTP 响应头部作为未解析的字符串返回。

  如果 readyState 小于 3，这个方法返回 null。否则，它返回服务器发送的所有 HTTP 响应的头部。头部作为单个的字符串返回，一行一个头部。每行用换行符 "\r\n" 隔开。

  ##### getResponseHeader()

  返回指定的 HTTP 响应头部的值。其参数是要返回的 HTTP 响应头部的名称。可以使用任何大小写来制定这个头部名字，和响应头部的比较是不区分大小写的。

  该方法的返回值是指定的 HTTP 响应头部的值，如果没有接收到这个头部或者 readyState 小于 3 则为空字符串。如果接收到多个有指定名称的头部，这个头部的值被连接起来并返回，使用逗号和空格分隔开各个头部的值。

  ##### open()

  初始化一个请求. 该方法用于JavaScript代码中;如果是本地代码, 使用 [`openRequest()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-cn%2FnsIXMLHttpRequest%23openRequest())方法代替.

  >  **注意:** 在一个已经激活的request下（已经调用open()或者openRequest()方法的request）再次调用这个方法相当于调用了abort（）方法。

  参数

  - `method`

    请求所使用的HTTP方法; 例如 "GET", "POST", "PUT", "DELETE"等. 如果下个参数是非HTTP(S)的URL,则忽略该参数.

  - `url`

    该请求所要访问的URL

  - `async`

    一个可选的布尔值参数，默认为true,意味着是否执行异步操作，如果值为false,则send()方法不会返回任何东西，直到接受到了服务器的返回数据。如果为值为true，一个对开发者透明的通知会发送到相关的事件监听者。这个值必须是true,如果multipart 属性是true，否则将会出现一个意外。

  - `user`

    用户名,可选参数,为授权使用;默认参数为空string.

  - `password`

    密码,可选参数,为授权使用;默认参数为空string.

  ##### send()

  发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。

  ##### setRequestHeader()

  向一个打开但未发送的请求设置或添加一个 HTTP 请求(设置请求头)。

  参数

  - `header`

    将要被赋值的请求头名称

  - `value`

    给指定的请求头赋的值

## Ajax原生实现

1. 实例化 `XMLHttpRequest` 异步对象

   > let xhr = new XMLHttpRequest() XMLHttpRequest 是内置的异步对象

2. 设置 请求方式 与 请求地址

   > xhr.open( 请求方式， 请求地址 ) 相当于axios配置对象里的 url与method

3. 发送请求

   > xhr.send()

4. 注册 处理响应的回调函数

   > xhr.onload = function(){} 相当于then()里的回调函数

### 原生git传参

- get方法如何传递参数
- 直接在url后拼接即可， url?key=value&key=value

```js
<script>
        document.querySelector('button').onclick = function () {
            // 1. 实例化 `XMLHttpRequest` 异步对象
            let xhr = new XMLHttpRequest()

            // 2. 设置 请求方式 与 请求地址
            xhr.open('get', 'https://autumnfish.cn/api/joke?name=zs&age=20')

            // 3. 发送请求
            xhr.send()

            // 4. 注册 处理响应的回调函数
            xhr.onload = function () {
                console.log(xhr.response);
            }
        }
    </script>
```

### 原生post传数据

**语法**

- xhr.send(数据)

  - 用于向服务器发送数据

- xhr.setRequestHeader('content-type', '数据的格式')

  只要是数据就要明确的告诉服务器所发送的数据的格式是什么！ axios会自动根据数据格式，自动设置content-type， 由于是原生语法，所以要手动设置content-type :point_right: setRequestHeader()要在send()之前设置，因为只要执行了send()本次请求就完成了，后面的代码与本次的请求没有任何关系了。

```js
<script>
     document.querySelector('button').onclick = function(){
     let xhr = new XMLHttpRequest()
            
     xhr.open('post', 'https://autumnfish.cn/api/form/urlencoded')
            
     xhr.onload = function(){
     console.log(xhr.response);
     }
    
     // 设置content-type
     xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
     // urlencoded格式
     let data = 'username=thinker&age=20'
     xhr.send(data)
      }
 </script>
```

### 传递 json 格式

- 请求地址：https://autumnfish.cn/api/form/json
- 请求方法：`post`
- 请求参数：
  - 说明:`content-type`为 `application/json`
  - 提交的数据格式为`JSON`
- 测试:
  - 根据接口文档要求通过`setRequestHeader`设置`content-type`请求头
  - 通过`send`方法提交*符合格式*要求的数据,并*确认结果*(可以通过*JSON.stringify*转化格式)

```js
<script>
    document.querySelector('button').onclick = function(){
    let xhr = new XMLHttpRequest()
            
    xhr.open('post', 'https://autumnfish.cn/api/form/json')
            
    xhr.onload = function(){
  // xhr.response接收响应的数据
           console.log(xhr.response);

  // JSON.parse解析接收到的响应数据
            console.log(JSON.parse(xhr.response));
        }
            
 // 设置content-type
    xhr.setRequestHeader('content-type', 'application/json')
 // JSON
   let data = {username:'thinker',age:20};
   let strJSON = JSON.stringify(data)
            
   xhr.send(strJSON)
     }
```

**接收 与 解析**

- 接收

  - 原生ajax请求后，服务器响应的数据要通过 xhr.response来接收

- 解析

  服务器返回的数据也有多种格式之分，现在使用最广泛的就是json，早期还用过xml。 只要是接口返回的数据几乎都是JSON格式。 解析响应数据也就是解析JSON格式的数据，使用JSON.parse()，如果是向服务器传递则使用JSON.stringify()