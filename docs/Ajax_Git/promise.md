---
title: promise
date: 
tags:
- Promise
---
### promise-介绍

`Promise`，译为承诺，是异步编程的一种解决方案，比传统的解决方案（回调函数）更加合理和更加强大

- 在以往我们如果处理多层异步操作，我们往往会像下面那样编写我们的代码

```js
setTimeout(function(){
            console.log('第1步');
            setTimeout(function(){
                console.log('第2步');
                setTimeout(function(){
                    console.log('第3步');
                    setTimeout(function(){
                        console.log('第4步');
                    },1000)
                },3000)
            },2000)
        },4000)
```

- 阅读上面代码，是不是很难受，上述形成了经典的回调地狱

- 现在通过`Promise`的改写上面的代码

```js
new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('第 1 步')
            }, 3000)
        }).then(function (res) {      // 属于第1个new Promise实例
            console.log(res);  //返回上一个执行成功的数据
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve('第 2 步')
                }, 2000)
            })
        }).then(function (res) {
            console.log(res);
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve('第 3 步')
                }, 5000)
            })
        }).then(function (res) {
            console.log(res)
        })
```

瞬间感受到`promise`解决异步操作的优点：

- 链式操作减低了编码难度
- 代码可读性明显增强

下面我们正式来认识 *promise*：

### Promise - 基本语法

- [传送门:MDN-Promise基本示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise#基础示例) 

- [传送门:MDN-Promise.prototype.then](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 

- [传送门:MDN-Promise.prototype.catch](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)



**概念**

​	Promise是一个对象，内部执行指定异步任务，并在成功后失败时执行预定的处理代码。

**基本语法**

​	Promise相关的有三要素：所有执行异步任务，成功后的代码，失败后的代码，这三要素都要体现在语法里。

##### 语法格式

> 1. 1.Promise是一个对象
>
>    *new Promise()*
>
> 2. 2.Promise实例化时必须传递一个回调函数
>
>    new Promise( *function(){}* )
>
> 3. 3.回调函数必须有两从此参数
>
>    new Promise( function(*resolve*, *reject*){ })

##### 回调函数的使用原则

> 1. 1.回调函数内部主要用于执行异步操作(时间不确定的操作)
>
>    new Promise( function( resolve,  reject ){ 	// 这里执行异步操作   })
>
> 2. 2.根据异步操作结果的选择性的调用resolve 或 reject
>
>    new Promise( function(*resolve*, *reject*){
>
>     	let 结果 = 这里执行异步操作 	
>
>    if(结果成功){ 
>
>    ​		resolve(结果) 
>
>    ​	}else{ 	
>
>    ​	reject(失败) } 
>
>    })

 这里一定要注意，异步操作虽然在回调函数内部执行，但回调函数的结果并不在回调函数内处理。

##### 分情况处理结果

> new Promise( function(resolve, reject){ 	
>
> let 结果 = 这里执行异步操作 
>
> ​	if(成功){ 	
>
> ​	resolve(结果) 
>
> ​	}else{ 	
>
> ​	reject(失败) 
>
> ​	}
>
>  }).*then*( function(data){ 	
>
> // resolve会跳到then里执行，data就是resolve()传递过来的数据
>
>  }).*catch*( function(err){ 	
>
> // reject会跳到catch里执行，err就是reject()传递过来的错误
>
>  })

##### 说明：

- new Promise()

  > 创建对象，执行异步任务，根据结果选择性执行resolve(数据) 或 reject(错误) resolve()与reject()并不是处理结果，只是通过这种语法将成功情况的代码，与失败情况的代码放到Promise回调函数的外面进行处理，由此减少了一层函数的嵌套。

- *then()*   成功时的处理

  > Promise回调函数，执行异步任务时，如果异步结果是失败的，将会使用reject，将错误 导向catch代码块 进行处理。

- *catch()*   失败时的处理

  > Promise的catch方法，用于处理reject传递过来的错误，

- *finally()* 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

- > promise
  > .then(result => {···})
  > .catch(error => {···})
  > .finally(() => {···});

可以这样理解，通过 Prmoise 来执行异步函数，可以在回调函数外部处理异步操作的结果

##### 示例代码

```js
<script>
    let pro = new Promise(function(resolve,reject){
        // setTimeout代表一个异步操作
        setTimeout(function(){
            // 模拟异步操作产生的数据
            let v = Math.floor(Math.random()*10 + 1);
            // 将成功或失败的发送到其他代码块
            if(v % 2 ==0){
                resolve('成功的数据')
            }else{
                reject('失败的原因')
            }
        })
    })

    pro.then(function(data){
        // 成功时处理的代码块
        console.log('成功 then被执行');
    }).catch(function(err){
        // 失败时处理的代码块
        console.log('失败 catch被执行');
    })
</script>
```

##### **小结**

- 1.如何理解Promise?

  > Promise本质就是一个对象，用于执行指定的异步任务的工具代码。

- 2.Promise语法两部分？

  > 创建对象并指派任务 分情况处理结果

- 3.创建Promise对象时相关的参数要求？

  > 提供回调函数，回调函数里定义两个参数resolve与reject

- 4.resolve与reject分别什么时候调用？

  > resolve成功时调用，传递数据 reject失败时调用，传递错误信息

- 5.resolve、reject与then、catch的关系？

  > resolve对应then reject对应catch

### Promise - 链式调用

- **语法**

  > new Promise().then().then().then()...

```js
<script>
        new Promise(function(resolve,reject){
            resolve('hello 1')
        }).then(function(res){      // 属于第1个new Promise实例
            console.log(res);
            return new Promise(function(resolve,reject){
                resolve('hello 2')
            })
        }).then(function(res){
            console.log(res);
            return new Promise(function(resolve,reject){
                resolve('hello 3')
         })
        }).then(function(res){
            console.log(res);
        })
    </script>
```

**小结**

- then()属于哪个Promise对象
  - 前面的最近的then里的return 的Promise实例对象

### Promise的三种状态

在Promise执行的过程中，内部会经历三种状态：`pendding`、`fulfilled`、`rejected` .[传送门:MDN-Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise#描述)

<img src="https://img-blog.csdnimg.cn/8f22b784053a4e278ceba74deccc745e.webp">

- 小结：三种状态

  1. *pendding* :初始状态，等待结果 对应的代码为new Promise()

  1. *fulfilled*  :收到结果，结果是成功 对应的代码为resolve()

  1. *rejected*  :收到结果，结果是失败 对应的代码为reject()

实际开发中，我们更多使用的是别人提取好的，例如： axios

## promise- 构造函数方法

`Promise`构造函数存在以下方法：

> - all()
> - race()
> - allSettled()
> - resolve()
> - reject()
> - try()

### Promise.all

Promise除了按顺序一次一个一次一个的执行异步任务外，还可以一次执行多个异步任务。 [传送门:Promise.all](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

- all是静态方法   静态方法是通过函数 点 出来的方法
- **语法**：

```javascript
Promise.all( [ promise1, promise2 , ... ] ).then(function(data){

}).catch(function(err){

})
```

**说明**

- 1.用数组存储多个promise实例，每个实例指派了一个异步任务，再把这个数组传递给all方法，这样就开始带着多个任务执行

- 2.`Promise.all` 等待 所有都成功 或 任何一个失败

  - 全部成功：then接收到的数据是所有的promise实例resolve的数据，是一个数组 
  - 只要有1个失败：catch接收到的是第1个失败的reject的错误.

  *注意：*最算有失败的出现，每一个promise实例也要执行

**示例代码**

```javascript
<script>
    let proa = new Promise(function (resolve, reject) {
        resolve('proa resolve的结果');
        // reject('proba reject的错误')
    })
    let prob = new Promise(function (resolve, reject) {
        resolve('prob resolve的结果');
        // reject('prob reject的错误')
    })
    let proc = new Promise(function (resolve, reject) {
        resolve('proc resolve的结果');
        // reject('proc reject的错误')
    })

    // 传递多个 promise实例给 Promise.all()
    Promise.all([proa, prob, proc]).then(function (data) {
        console.log(data);
    }).catch(function (err) {
        console.log(err);
    })
</script>
```

### Promise.race

用于同时指派多个异步任务时使用，取第1个有结果的异步任务的结果作为Promise.race的结果。[传送门:Promise.race](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

**语法**：

```javascript
Promise.race([ promise1, promise2, ... ]).then(function(data){
}).catch(function(err){
})
```

**说明**

- 用数组存储多个promise实例，每个实例指派了一个异步任务，再把这个数组传递给race方法，这样就开始带着多个任务执行

- `Promise.race` 取*第1个有结果的异步的结果作为Promise.race的结果*。

  也就是第1个执行了resolve或reject的promise。注意不是传递的第1个，由于Promise里的异步任务完成的时间是不同的，哪个Promise有结果，就取哪个结果作为Promise.race的结果

**示例代码**

```js
let proa = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('proa resolve的结果');
        // reject('proa reject的结果');
    }, 2000)
})
let prob = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('prob resolve的结果');
        // reject('prob reject的结果');
    }, 1000)
})
let proc = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('proc resolve的结果');
        // reject('proc reject的结果');
    }, 3000)
})

// 传递多个 promise实例给 Promise.race()
Promise.race([proa, prob, proc]).then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.log(err);
})
```

- Promise.all 与 Promise.race的区别，及应用场景

  - Promise.all

    > 所有的都成功，或要有1个失败 应用场景：页面的渲染需要多个接口的数据

  - Promise.race

    > 等待第1个有结果的异步任务 应用场景：一个数据有多个接口可以获取，等待最快的。

### allSettled()

`Promise.allSettled()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例

只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result.status)));
// 结果
// "fulfilled"
// "rejected"
```

### resolve()

将现有对象转为 `Promise`对象

```javascript
Promise.resolve('foo')
// 等价于
new Promise(function(resolve){
    resolve('foo')
})
```

参数可以分成四种情况，分别如下：

- 参数是一个 Promise 实例，`promise.resolve`将不做任何修改、原封不动地返回这个实例
- 参数是一个`thenable`对象，`promise.resolve`会将这个对象转为 `Promise`对象，然后就立即执行`thenable`对象的`then()`方法
- 参数不是具有`then()`方法的对象，或根本就不是对象，`Promise.resolve()`会返回一个新的 Promise 对象，状态为`resolved`
- 没有参数时，直接返回一个`resolved`状态的 Promise 对象

### reject()

`Promise.reject(reason) `方法也会返回一个新的 Promise 实例，该实例的状态为 rejected

```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (err) {  // null代表没有执行成功
  console.log(err)
});
// 出错了
```

`Promise.reject()`方法的参数，会原封不动地变成后续方法的参数

```js
Promise.reject('出错了')
.catch(e => {
  console.log(e === '出错了')
})
// true
```

### 使用场景

将图片的加载写成一个`Promise`，一旦加载完成，`Promise`的状态就发生变化

```javascript
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

通过链式操作，将多个渲染数据分别给个`then`，让其各司其职。或当下个异步请求依赖上个请求结果的时候，我们也能够通过链式操作友好解决问题

```js
// 各司其职
getInfo().then(res=>{
    let { bannerList } = res
    //渲染轮播图
    console.log(bannerList)
    return res
}).then(res=>{
    
    let { storeList } = res
    //渲染店铺列表
    console.log(storeList)
    return res
}).then(res=>{
    let { categoryList } = res
    console.log(categoryList)
    //渲染分类列表
    return res
})
```

通过`all()`实现多个请求合并在一起，汇总所有请求结果，只需设置一个`loading`即可

```js
function initLoad(){
    // loading.show() //加载loading
    Promise.all([getBannerList(),getStoreList(),getCategoryList()]).then(res=>{
        console.log(res)
        loading.hide() //关闭loading
    }).catch(err=>{
        console.log(err)
        loading.hide()//关闭loading
    })
}
//数据初始化    
initLoad()
```

通过`race`可以设置图片请求超时

```js
//请求某个图片资源
function requestImg(){
    var p = new Promise(function(resolve, reject){
        var img = new Image();
        img.onload = function(){
           resolve(img);
        }
        //img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"; 正确的
        img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg1";
    });
    return p;
}

//延时函数，用于给请求计时
function timeout(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('图片请求超时');
        }, 5000);
    });
    return p;
}

Promise
.race([requestImg(), timeout()])
.then(function(results){
    console.log(results);
})
.catch(function(reason){
    console.log(reason);
});
```

如何保证一个promise失败之后，promise.all还能正常收到结果

```js
const promise1 = Promise.resolve(3);
const promise2 = Promise.reject(new Error());
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3].map(p=>p.catch(e=>e))).then((values) => {
  console.log(values);
});
```

## async函数 与 await

- Promise已经可以很好的解决回调嵌套问题啦,咋又来一个?他的作用是简化Promise调用时的写法,把最后一层then也给拿掉，使用 = 来接收异步的结果 

- 简单粗暴的理解方式就是：不再使用 .then(function(数据){})，而直接使用 = 来接收数据 [传送门:async函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

### async 函数基本使用

**语法**

```js
async function 函数名(){
     
}
```

- **说明**

  - 使用async修饰的函数就是async函数

  - async函数与普通函数区在于返回值

  - async函数会隐匿返回一个Promise对象，所以async函数调用后可以直接进行 .then() 操作 而函数内部的return则会将数据 传递给 then的回调函数

- **原理**
- ​     可以理解async函数内有两个return，隐式的return，显示的return

- ​     隐式的return返回一个Promise对象，用于调用后面的thne 而显示的return返回数据给then内的回调函数

**代码示例**

```js
<script>
    /* 
        // 定义一个async函数
        async function fn() {

        }

        // async 会隐式返回一个Promise对象
        console.log(fn());

        // 所以可以调用后面的 then(function(res){})
        fn().then(function (res) {
            console.log('then被调用了');
        })
    */

    async function fn() {
    // 显示return一个数据
    return 100
    }

    fn().then(function(res){
        // 显示return的数据会传递给 then的回调函数的参数res
        console.log(res);
    })
</script>
```

### async函数与await

- async函数 与 await，配合使用可以简化Promise的resolve数据的接收

**语法格式**

```js
<script>
  async function fn(){
      let 变量 = await Promise对象
  }    
</script>
```

**语法格式**

```js
<script>

    // async函数 与 await，配合使用可以简化Promise的resolve数据的接收
    // Promise resolve的数据 默认接收方式
    new Promise(function(resolve,reject){
        resolve('hello')
    }).then(function(res){          // promise内的resolve数据需要使用 .then进行接收
        console.log(res);
    })

    // async 与 await简化接收方式
    async function fn1(){
        let res = await new Promise(function(resolve,reject){
            resolve('hello')
        })
        console.log(res);
    }

    fn1();
</script>
```

### async 异常捕获

- Promise有两种结果：resolve结果，与reject结果
- 上一小节中讲解了使用async函数简化了Promise实例的resolve结果，那么reject的结果如何处理呢？
- 解决办法使用，使用try ... catch 代替 .catch()

```js
    // 异常处理语法回顾
    try{

    }catch(e){
        
    }
    try ... catch 可以将try块内发现的异常捕获到catch块内进行处理
```

**代码示例**

```js
<script>

    // async可以使用 await 来处理Promise内部resolve的数据
    // 但 Promise的reject的情况如何来处理呢？
    
    // async 与 await简化接收方式
    async function fn1(){
        try {
            let res = await new Promise(function(resolve,reject){
                if(Math.floor(Math.random()*10) % 2 == 0){
                    resolve('成功')
                }else{
                    reject('失败')
                }
            })
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    fn1();
</script>
```

- **小结重点**：

- async函数里的错误(promise实例reject的错误)可以使用什么捕获？

  > try ... catch 是通用的异常处理语法，所有的异常都可以捕获 而.catch只能捕获 Promise的异常