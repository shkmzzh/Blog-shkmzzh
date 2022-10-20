---
title: Axios
date: 
tags:
- Ajax
---
::: info
这里只介绍一些常用的，具体的使用方法请参考axios官方文档
[axios中文网](https://www.axios-http.cn/docs/intro)
:::

- AJAX是一种技术，在不重新加载页面的情况下发送请求给服务器。但是原生的代码晦涩难懂，对于初学者很不友好。
- 有一些人对原生代码进行了封装，简化了原生代码的操作。初学者就可以使用简化后的代码完成ajax操作。
- `axios`是目前最为流行的代码库，在浏览器端是基于`Ajax`封装

### axios - get请求语法

**语法一**

```js
// 无参数
axios.get(url)

// 有参数,参数拼接在URL中
axios.get(url?key=value&key=value)
--------------------------------------
// 1. 无参请求
      axios.get('https://autumnfish.cn/api/joke').then(function(response){
        console.log(response);
      })
   
// 2. 有参数，通过url传递
      axios.get('https://autumnfish.cn/api/joke/list?num=3').then(function(response){
     console.log(response);
```

**语法二(推荐)**

使用 params 发起带参请求

```js
推荐方式
axios({
    method:'GET',
    url:'https://autumnfish.cn/api/joke',
    params:{num:3}
    }).then(function(res){console.log(res)})
```

### axios - post请求

**语法一**

```js
axios.post(url,{key:value,key:value}).then(function(response){
console.log(response)
})
```

**语法二(推荐)**

 `data` 是作为请求体被发送的数据  

- 仅适用  *PUT* ,  *POST* ,  *DELETE* 和  *ATCH* 请求方法

```js
推荐方式
axios({
    method:'POST',
    url:'https://autumnfish.cn/api/user/check',
    data:{name:zs,age:18}
    }).then(function(res){console.log(res)})
```

### 设置content-type 语法

- 如果是人为的使用axios向服务器发送数据，就需要设置相应的 content-type 

- 前端，只会向服务器发送数据，所以只需要设置请求报文的 content-type即可

[具体参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)

**axios 设置 content-type**

> axios 在配置对象中通过 headers 来设置content-type，格式：

```javascript
axios.post(url,data,{headers:{'content-type':'内容格式类型'}})

axios({
    url:'',
    method:'post',
    data:{},
    headers:{
        'content-type':'内容格式类型'
    }
})
```

### 接口中的 content-type

不同接口对于提交数据格式的要求略有不同，咱们结合**3**个测试用接口，来看看如何通过`axios`如何提交不同格式的数据,之后看到类似的需求能够选择对应的格式进行提交

**测试接口**



*1.FormData数据提交 接口*

> - 请求地址：https://autumnfish.cn/api/form/formdata
> - 请求方法：`post`
> - 请求参数：
>   - 说明:`content-type`为 `multipart/form-data`
>   - 提交`FormData`即可

```js
 axios({
          url:'https://autumnfish.cn/api/form/formdata',
          method:'post',
          data:fd,
          headers:{'content-type':'multipart/form-data'}
  })
```



*2.application/json数据提交 接口*

> - 请求地址：[https://autumnfish.cn/api/form/json](https://autumnfish.cn/api/form/json)
> - 请求方法：`post`
> - 请求参数：
>   - 说明:`content-type`为 `application/json`
>   - 提交**JS对象**即可

```js
 axios({
          url:'https://autumnfish.cn/api/form/json',
          method:'post',
          data:{
            name:'thinker',
            age:20,
          },
          headers:{'content-type':'application/json'}
 })
```

*3.application/x-www-form-urlencoded数据提交 接口*

> - 请求地址：[https://autumnfish.cn/api/form/urlencoded](https://autumnfish.cn/api/form/urlencoded)
> - 请求方法：`post`
> - 请求参数：
>   - 说明:`content-type`为 `application/x-www-form-urlencoded`
>   - 通过data提交`key=value&key2=valu2`这种格式

```js
axios({
      url:'https://autumnfish.cn/api/form/urlencoded',
     method:'post',
     data:{
        name:'thinker',
        age:20,
        },
     headers:{'content-type':'application/x-www-form-urlencoded'}
   })
```



### axios默认配置

```js
全局默认请求基地址
axios.defaults.baseURL = 'https://api.example.com';

全局默认token
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

全局默认请求头配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```



### 拦截器

在请求或响应被 then 或 catch 处理前拦截它们。

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

**演示**

```js
axios.interceptors.request.use(function(config){
            console.log('请求拦截器执行了')
            return config
        },function(err){})

        axios.interceptors.response.use(function(res){
            console.log('响应拦截器执行了')
            const a = 'jh'  //设置响应的数据
            return a
        },function(err){})
        axios({
            method:'POST',
            url:'http://ajax-api.itheima.net/register',
            data:{
                username:'ahsdfsdddjkmzzh',
                password:'123456'
            },
            a:(function() {
                console.log('请求')})()
            }
        ).then(function(res){
            console.log('响应')
            console.log(res)
        })
-------------------------------------------
//执行顺序
                    请求
设置拦截器.html:14   请求拦截器执行了
设置拦截器.html:19   响应拦截器执行了
设置拦截器.html:34   响应
设置拦截器.html:35   jh
```

如果你稍后需要移除拦截器，可以这样：

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

可以给自定义的 axios 实例添加拦截器。

```
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

### 错误处理

[请滚去看文档](https://www.axios-http.cn/docs/handling_errors)

```js
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

