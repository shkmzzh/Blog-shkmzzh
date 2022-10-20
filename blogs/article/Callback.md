---
title: 回调函数(Callback)
date: 2022-9-07 22:16:25
hideComments: false
categories:
 - article
---


作为JS的核心，回调函数和异步执行是紧密相关的，也是必须跨过去的一道个门槛。

那么究竟什么是回调函数(Callback)，其实回调函数并不复杂，明白两个重点即可：

1. 函数可以作为一个参数在另一个函数中被调用。

2. JS是异步编程语言，这就是说JS代码的执行顺序并不是从上至下按部就班完成的。大多数语言都是同步编程语言，比如现在我们有3行代码，那么系统一定是一行一行按顺序向下执行的，第一行执行完了，执行第二行，紧跟着最后执行第三行，你可能会说这不是废话吗？且慢，在JS里则不尽然，比如有3行代码，并不是排在最前面的代码就是最先执行完毕的，很有可能是最后一行语句最先执行完，然后排在最前面的那行反而是最后执行完毕的，所以我们说JS是异步编程语言。

下面以node.js为例，举一个例子保证你在3步之内搞清楚究竟什么叫回调函数：

**STEP 1**：

```js
var fs = require("fs");
var c

function f(x) {
    console.log(x)
}

function writeFile() {
    fs.writeFile('input.txt', '我是通过fs.writeFile 写入文件的内容', function (err) {
        if (!err) {
            console.log("文件写入完毕!")
            c = 1
        }
    });
}

c = 0
writeFile()
f(c)
```

以上代码不难理解，就是设置一个全局变量c = 0，然后执行writeFile函数（也就是写入一个文件input.txt），这个函数里面有一行c = 1，函数执行完毕之后再跳出来调用f()函数，f()函数很简单，就是把打印一个变量，仅此而已。

按照 “正常” 逻辑，首先c=0，然后调用writeFile函数，该函数里面有一句c = 1，最后再调用f(c)，又因为调用writeFile()是在f(c)之前，所以c=1这条语句肯定是会被执行到，那么结果应该是打印1，但是万万想不到，结果竟然是0，明明我们在writeFile函数里我们重新对c进行了赋值，为什么结果还是0呢？

因为程序运行到writeFile()这一行的时候，是一个比较耗时的IO操作，JS碰到这种操作并不会停在原地一直等待直到函数执行完毕，而是直接运行下一条代码（即f(c)），而此时 c = 1这一行代码其实并没有被执行到，所以打印出来的结果还是0 ! 

那你肯定会说，要解决这个问题还不容易，我们把调用f(c)也放进writeFile函数里面不就行了呗！这样就能保证c = 1之后再调用f(c)了吧？没错，就这么简单：

**STEP 2**：

```js
var fs = require("fs");
var c

function f(x) {
    console.log(x)
}

function writeFile() { 
    fs.writeFile('input.txt', '我是通过fs.writeFile 写入文件的内容', function (err) {
        if (!err) {
            console.log("文件写入完毕!")
            c = 1
            f(c)
        }
    });
}

c = 0
writeFile() 
```

这个代码的逻辑不需要多说了吧，因为实在太简单了，就是把f(c)放进了writeFile()里面，那么c=1必然会被执行到，然后才执行f(c)，不用多说，结果肯定是显示为1。但是改成这样并不完美，因为这么做就相当于将f()"焊死"在writeFile()里了，如果此处我最终想调用的函数不是f()而是别的其他函数咋整？难不成要写几个不同的writeFile()，而他们之间的区别仅仅是最后调用的那个函数不同？这样也太笨了吧，于是今天的主角：“关键字” callback 登场了。（准确地说callback并不真的是Javascript里的关键字，但是鉴于大家都约定成俗把callback这个单词作为回调函数的默认选择了，这里姑且就不严谨地称它为"关键字"吧)

**STEP 3**：

```js
var fs = require("fs");

function f(x) {
    console.log(x)
}

function writeFile(callback) { //callback，表示这个参数不是一个普通变量，而是一个函数
    fs.writeFile('input.txt', '我是通过fs.writeFile 写入文件的内容', function (err) {
        if (!err) {
            console.log("文件写入完毕!")
            c = 1
            callback(c) // 因为我们传进来的函数名是f()，所以此行相当于调用一次f(c)
        }
    });
}
var c = 0
writeFile(f) // 函数f作为一个参数传进writeFile函数
```

经过改造后的代码出现了两次callback，第一个callback出现在writeFile的形参里，起定义的作用，表示这个参数并不是一个普通变量，而是一个函数，也就是前面所说的重点1，即所谓的“以函数为参数”。 第二个callback出现在c = 1下面，表示此处“执行”从形参传递进来的那个函数。这样一来，writeFile()函数在执行完毕之后到底调用哪个函数就变“活”了，如果我们想writeFile()函数执行完之后并不是像第二个例子那样只能调用f()，而是还有别的函数比如说x() y() z()，那么只需要写成 writeFile(x),writeFile(y)... 就行了。

我相信你已经看明白上面的代码，因为实在并不高深，那么我们现在开始用一句话攻略做一个总结：

在大多数编程语言中，函数的形参总是从外向内传递参数，但在JS中，如果形参碰到“关键字” callback 则完全相反，它表示从内向外反向调用某个外部函数。

PS: 此处并不一定非要写为“callback”，你可以任意写成abc, iloveyou...等等随你高兴。callback只是一种约定俗成的写法，它明确地告诉代码阅读者：此处是一个回调函数。

有时候，我们会看到一些函数的形参列表里直接嵌套一个函数的情况，其本质上仍然是回调函数，因为没有了函数名，所以也称匿名函数。

如本例如果要写成这种风格的话就是长成这样了：

```js
var fs = require("fs");

function writeFile(callback) { 
    fs.writeFile('input.txt', '我是通过fs.writeFile 写入文件的内容', function (err) {
        if (!err) {
            console.log("文件写入完毕!")
            c = 1
            callback(c) 
        }
    });
}
var c = 0
writeFile(function (x) {
    console.log(x)
})
```

writeFile()函数不变，只是在调用它的时候，直接将函数体嵌在参数列表里了，其作用跟上一个例子完全一样。其实在本例中，fs.writeFile函数后面也有一个匿名回调函数 function (err) {}，这个函数表示当文件写入完毕后，就回调它，如果在写入过程中出现了错误，则通过变量err携带出来。我相信有了前面的铺垫，您已经肯定能理解它的含义了，事实上这种写法在JS里是出现频率最高的主流风格。

【补充】在JS里，当然也并非所有操作都是异步的，比如for循环，无论这个for循环需要耗时多长，系统也一定会等它转完之后才会执行下面的语句。我所了解的会产生异步执行的操作大概有以下几种：

定时器、建立网络连接、读取网络流数据、向文件写入数据、Ajax提交、请求数据库服务，等等。

如果至此你还是没弄清楚到底什么是回调函数，那么绝不是您的问题，而一定是我的表达有不足之处，欢迎留言探讨！