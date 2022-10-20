---
title: 基础
date: 
tags:
- JS
---

详细文档 [JS基础](https://www.wolai.com/2nG521Ne9V1c68AyHVug4s)
<hr>

### 输入与输出语句

输出语句1 : 在网页弹出一个提示框，输出数据

```javascript
//输出语句1:弹出一个提示框，通常用于提示用户，也可以用于调试
alert("hello world");
```

输出语句2：在控制台打印某个数据

```javascript
//输出语句2:打印某个数据的值，查看数据是否成功
//这个写法不是给用户看的，而是给程序员自己调试看的
console.log("哎呦,你干嘛！");
```

输出语句3：将数据显示到网页

```javascript
//输出语句3:将数据显示到网页，相当于给body添加内容
document.write("大家好,我是练习时长两年半的前端练习生");
```

输入语句1：在网页弹出一个输入框，让用户输入数据

```javascript
//输入语句1：弹出一个输入框，可以用来输入数据
prompt("深圳的前端平均薪资是多少呀？");
```

输入语句2：在网页弹出一个确认框，让用户输入 确认/取消 二选一

```javascript
//输入语句2：在网页弹出一个确认框，让用户输入 确认/取消 二选一
confirm("准备好要学习大前端了吗？");
```

## 数据类型

### typeof 检测数据类型

```js
<script>
        //作用：得到一个字符串来告诉你这个数据是什么类型。 
        //(1) typeof 数据   
        console.log(typeof 123); // number
        console.log(typeof '123'); //string
        console.log(typeof undefined);

        //(2) typeof (数据)
        console.log(typeof (123)); // number
        console.log(typeof ('123')); //string
        console.log(typeof (undefined));
</script>
```



### 简单数据类型

**Number 类型**

```js
<script>
         // 1. number数字类型: 数学中的数字, 包括正数,负数,小数
         // 负责数据运算
          console.log(100)
          console.log(-100)
          console.log(-99.99)
          console.log(Infinity) //无穷的
</script>
```

**String 类型**

```js
 <script>
          /* 2. string字符串类型: 由单引号,双引号,反引号包裹的内容
           展示文本信息
           注意:
                字符串要成对出现
                字符串嵌套时, 内外不能使用相同引号
                如果需要解析引号, 前面加 \(反斜杠)  */
           console.log('单引号')
           console.log("双引号")
           console.log(`反引号, 1的左边`)
           console.log("这是一个'寂寞'的天")
           console.log(`这是一个\`寂寞\`的天`)
</script>
```

**Boolean 布尔类型**

```js
  <script>
           /*  布尔类型 Boolean : true/真  false/假
            作用: 做判断  */
            console.log(true)
            console.log(false)
  </script>
```

**Undefined**

```js
 <script>
         // 未定义类型undefined: undefined, 变量声明但未赋值时为undefined
         // 经常应用在判断变量是否有值的场景上
         let num
         console.log(num)
         console.log(undefined)
 </script>
```

**Null**

```js
  <script>
            //  null空类型: null, 变量已声明已赋值， 但值为空
            let gender = null
            console.log(gender)
  </script>
```

**Symbol**

Symbol （符号）是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险

```js
let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();
console.log(genericSymbol == otherGenericSymbol); // false

let fooSymbol = Symbol('foo');
let otherFooSymbol = Symbol('foo');
console.log(fooSymbol == otherFooSymbol); // false
```

### 引用数据类型

**Object**

创建`object`常用方式为对象字面量表示法，属性名可以是字符串或数值

```js
let person = {
    name: "Nicholas",
    "age": 29,
    5: true
};
```

**Array**

`JavaScript`数组是一组有序的数据，但跟其他语言不同的是，数组中每个槽位可以存储任意类型的数据。并且，数组也是动态大小的，会随着数据添加而自动增长

```js
let colors = ["red", 2, {age: 20 }]
colors.push(2)
```

**Function**

函数实际上是对象，每个函数都是 `Function`类型的实例，而 `Function`也有属性和方法，跟其他引用类型一样

函数存在三种常见的表达方式：

- 函数声明

```js
// 函数声明
function sum (num1, num2) {
    return num1 + num2;
}
```

- 函数表达式

```js
let sum = function(num1, num2) {
    return num1 + num2;
};
```

- 箭头函数

函数声明和函数表达式两种方式

```js
let sum = (num1, num2) => {
    return num1 + num2;
};
```

### 其他引用类型

除了上述说的三种之外，还包括`Date`、`RegExp`、`Map`、`Set`等......

## 运算符

### 关系运算符

```js
    <script>
        /* 
        1. 关系(比较)运算符:  比较两个数据的关系是否成立, 成立为true, 不成立为false
        2. 符号:  <  >   <=   >=    ==(相等)  !=(不等)  ===(全等)  !==(不全等)
        3. 关系表达式: 结果都为布尔类型
        */

        console.log(10 >= 10); //true
        console.log(10 <= 5); //false

        /* 
        =    赋值, 将右边的值赋给左侧变量
        ==   只比较值, 不比较数据类型
        ===  不仅仅比较值, 还要比较数据类型
        */

        console.log(10 == '10'); //true
        //console.log(10 != '10'); //false
        console.log(10 === '10'); //false
        //console.log(10 !== '10'); //true
    </script>
```

### 逻辑运算符

```js
    <script>
       /*
          1. 逻辑运算符: 多个条件是否成立
              1.1 逻辑与: 并且&&  找假
              1.2 逻辑或: 或者||  找真
              1.3 逻辑非: 取反!   取反
          2. 逻辑表达式:  条件1  逻辑运算符   条件2   逻辑运算符   条件3 ...  */
          
        //判断 num >5 并且 num<10
        let num = 8
        //5<num<10  错误写法
        num > 5 && num < 10

        /*  1.1 逻辑与: 并且&&   一假则假, 找假
                条件1  &&  条件2    结果
                true       true    true
                true       false   false
                false      true    false
                false      false   false
                
            严格的丈母娘:  有房吗?  &&  有车吗 &&  有存款吗? */
        console.log(30 > 18 && 161 > 155 && 1 > 2) // false

        /*  1.2 逻辑或: 或者||   一真则真, 找真
                条件1  ||  条件2    结果
                true       true    true
                true       false   true
                false      true    true
                false      false   false 

        //宽松丈母娘:  有房吗?  ||  有车吗  ||  有存款吗? */
        console.log(1 < 10 || 1 < 0) //true  || false

        //  1.3 逻辑非: 取反!
        //不在乎丈母娘: 只要不是女的就行
        console.log(!(1 > 0)) //false
    </script>
```

### 运算符优先级

- 目标：掌握运算符优先级，能判断运算符执行的顺序
  - 一元运算符里面的逻辑非优先级很高
  - 逻辑与比逻辑或优先级高
  - 实际开发中不需要刻意记忆。想让哪个式子先计算，使用小括号 () 包起来即可

| 优先级 |   运算符   |       顺序        |
| ------ | :--------: | :---------------: |
| 1      |   小括号   |        ( )        |
| 2      | 一元运算符 |    ++   --   !    |
| 3      | 算数运算符 | 先 * / % 后 +  -  |
| 4      | 关系运算符 |   >   >=  <  <=   |
| 5      | 相等运算符 | ==  !=   ===  !== |
| 6      | 逻辑运算符 |  先 && 后  \|\|   |
| 7      | 赋值运算符 |         =         |
| 8      | 逗号运算符 |        ，         |

## 数据类型转换

### 显式转换为number类型

```js
       <script>
            // 将string boolean undefined null 这四种类型转为数值类型
            // 1. 字符串转数字类型: parseInt(), parseFloat()
            // 2. 非字符串转数字类型: Number()

            // 1. 字符串转数字类型: 从前往后转换, 到不能转换为止
            // parseInt() :  转整数
            console.log(parseInt('88a')) //88
            console.log(parseInt("9.9a")) //9
            // parseFloat() :  转小数, 只能识别第一个小数点
            console.log(parseFloat('88a')) //88
            console.log(parseFloat("9.9a")) //9.9

            // 2. 非字符串转数字类型: Number()
            //  可以解析整数和小数
            console.log(Number("5.5")) //5.5
            console.log(Number("5.5")) //5.5
            //  有非数字字符就是NaN，0或者1
            console.log(Number("9.9a")) //NaN
            console.log(Number(undefined)) //NaN
            console.log(Number(null)) //0
            console.log(Number(true)) //1
            console.log(Number(false)) //0
            
            // 思考, 单独字符串使用+号时, 是默认那种方法转为数字?
            let num = +'11'
            console.log(num);
            console.log(typeof num);
        </script>
```

### 显式转换为string类型

```js
 <script>
            // 将number boolean undefined null 这四种类型转为字符串类型
            // 1. String()  日常使用
            console.log(String(200)) //'200'
            console.log(typeof String(200)) //string
            console.log(String(true)) //'true'
            console.log(String(false)) //'false'
            console.log(String(undefined)) //'undefined'
            console.log(String(null)) //'null'

            // 2. 变量.toString()
            // 2.1  undefined和null 不能使用, 会报错
            let num = 200
            console.log(num.toString()) // '200'
            //console.log(undefined.toString()) // 报错
            //console.log(null.toString()) // 报错

            // 2.2 使用场景: 转换进制
            console.log(num.toString(16)) // c8
            console.log(num.toString(2)) // 11001000
    </script>
```

### 显示转换为 boolean 类型

```js
 <script>
           /* Boolean(数据)
            1. false ：   0, -0, false, '', null, undefined, NaN
            2. true:  剩下所有内容转换为布尔类型都为true   */
            // 以下结果均为false
            console.log(Boolean(0))
            console.log(Boolean(-0))
            console.log(Boolean(false))
            console.log(Boolean(null))
            console.log(Boolean(undefined))
            console.log(Boolean(NaN))
            console.log(Boolean("")) //空字符串中间不能有空格

            //以下结果均为true
            console.log(Boolean("  "))
            console.log(Boolean(1))
            console.log(Boolean("你好"))
    </script>
```

### 隐式转换

```js
  <script>
    /* 显示转换：程序员主动做的, 阅读性高
            转数字: Number() parseInt() parseFloat()
            转字符串: String()
            转布尔: Boolean()

       隐式转换：当数据不能直接计算, 或者运算符两边的‘数据类型不一致’的时候，编译器会转成一致后运算
            (1)转换数字 ： 算术运算符 - * / %        
            (2)转换字符串 ： 连接符+  (+号两边只要有一边是字符串，此时+就是连接符)         
            (3)转换布尔: 逻辑非 !    
       */
            console.log("5" * "10") // 50   Number('5') * Number('10')
            console.log("5a" * "10") // NaN   Number('5') * Number('10')

            // (1)转换数字 ： 算术运算符 + - * / %
            console.log("50" - 5) // 45

            //(2)转换字符串 ： 连接符+  (+号两边只要有一边是字符串，此时+就是连接符)
            console.log("50" + 5) //'505'

            // (3)转换布尔: 逻辑非 !
            console.log(!0) //true

            let num1 = +prompt("请输入数字一")
            let num2 = +prompt("请输入数字二")
            console.log(num1 + num2) //3
        </script>
```

### 补充number类型特殊值NaN

```js
<script>
            //1. NaN : number类型中一个特殊值
            //         not a number, 不是数字, 如果你的运算得不到一个数字, 此时就会得到NaN
            //   作用 : NaN表示错误的运算, 产生的原因一般是代码出bug
            console.log(Number("123a")) //NaN
            //   例子 : 声明num不赋值, 则为undefined, 此时+1运算得到就是NaN
            let num
            console.log(num + 1) //NaN

            //2. NaN特点： 不能参与任何运算。 结果一律是NaN
            console.log(NaN + 1) //NaN
            console.log(NaN - 1) //NaN
            console.log(NaN * 0) //NaN

            // 3. 需要判断得到的数据是否为NaN的情况
            // isNaN(数据) 返回true, 意味着数据为NaN,  返回false, 说明数据正常
            // 注意,会有隐式转换, 数据会先用Number()转为数值类型再去判定
            console.log(isNaN("123")) // Number('123') => 123  结果为fasle
            console.log(isNaN("abc")) // Number('abc') => NaN  结果为true
            console.log(isNaN("字符串")) // Number('字符串') => NaN  结果为true
            console.log(isNaN(NaN)) // true
            console.log(isNaN("123abc" - "123")) //得到的结果为NaN, 返回true
</script>
```