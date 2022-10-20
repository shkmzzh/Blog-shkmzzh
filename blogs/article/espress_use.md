---
title: express中app.use和app.get的区别及解析
date: 2022-10-5 22:16:25
hideComments: false
categories:
 - article
---

# express中app.use和app.get的区别及解析

写在前面：最近研究nodejs及其web框架express，对app.use和app.get没理解清，以致踩了坑浪费不少时间.

结论
先说我发现的结论：

> app.use(path,callback)中的callback既可以是router对象又可以是函数
>
> app.get(path,callback)中的callback只能是函数

结论说完，让我们先看个栗子

### 例子

app.js

```js
var express = require('express');
var app = express();

var index = require('./routes/index');

//1⃣️
app.use('/test1',function(req,res,next){
    res.send('hello test1');

});

//2⃣️
app.get('/test2',function(req,res,next){
    res.send('hello test2');

});

//3⃣️
app.get('/test3',index);

//4⃣️
app.use('/test4',index);
```

index是一个路由对象，结果，例1、2、4结果都能正确显示，而例3却报404。index.js很简单，如下：

```js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('hello world!');
});

module.exports = router;
```

### 两者关系

这说明，给app.get(app.post、app.put同理)赋个路由对象是不行的，其实，可以将app.get()看作app.use的特定请求(get)的简要写法。即

```js
var express = require('express');
var app = express();
app.get('/hello',function(req,res,next){
    res.send('hello test2');

});
```

等同于：

```js
var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('hello world!');
});
app.use('/hello',router);
```

### 什么时用

- 那么，什么时用app.use，什么时用app.get呢？

- 路由规则是app.use(path,router)定义的，router代表一个由express.Router()创建的对象，在路由对象中可定义多个路由规则。可是如果我们的路由只有一条规则时，可直接接一个回调作为简写，也可直接使用`app.get`或`app.post`方法。即

> 当一个路径有多个匹配规则时，使用app.use，否则使用相应的app.method(get、post)

对express路由的解析可参考Express.js 4.0 的路由（Router）功能用法教學,觉得比官网说的清楚。