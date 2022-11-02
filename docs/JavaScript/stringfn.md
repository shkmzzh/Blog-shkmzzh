---
title: 字符串常用方法
date: 
tags:
- JS
---
[具体的字符串方法请参考MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
<hr>

**操作方法**

我们也可将字符串常用的操作方法归纳为增、删、改、查，需要知道字符串的特点是一旦创建了，就不可变

## 增

这里增的意思并不是说直接增添内容，而是创建字符串的一个副本，再进行操作

除了常用`+`以及`${}`进行字符串拼接之外，还可通过`concat`

### concat

`concat()`方法用于将一个或多个字符串拼接成一个新字符串。 (不影响原字符串)

```js
let stringValue = "hello ";
let result = stringValue.concat("world");
console.log(result); // "hello world"
console.log(stringValue); // "hello"
```

## 删

这里的删的意思并不是说删除原字符串的内容，而是创建字符串的一个副本，再进行操作

常见的有：

> - slice()
> - substr() （不推荐使用将被移除）
> - substring()

这三个方法都返回调用它们的字符串的一个子字符串，而且都接收一或两个参数。

```js
let stringValue = "hello world";
console.log(stringValue.slice(3)); // "lo world"
console.log(stringValue.substring(3)); // "lo world"
console.log(stringValue.substr(3)); // "lo world"
console.log(stringValue.slice(3, 7)); // "lo w"
console.log(stringValue.substring(3,7)); // "lo w"
console.log(stringValue.substr(3, 7)); // "lo worl"
```

### slice()

**`slice()`** 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。

```js
const str = 'The quick brown fox jumps over the lazy dog.';

console.log(str.slice(31));
// expected output: "the lazy dog."

console.log(str.slice(4, 19));
// expected output: "quick brown fox"

console.log(str.slice(-4));
// expected output: "dog."

console.log(str.slice(-9, -5));
// expected output: "lazy"
```

### substring()

**`substring()`** 方法返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引直到字符串的末尾的一个子集。

**参数**：

`indexStart`:需要截取的第一个字符的索引，该索引位置的字符作为返回的字符串的首字母。

`indexEnd`:可选。一个 0 到字符串长度之间的整数，以该数字为索引的字符不包含在截取的字符串内。

```js
var anyString = "Mozilla";
// 输出 "Moz"
console.log(anyString.substring(0,3));
console.log(anyString.substring(3,0));
console.log(anyString.substring(3,-3));
console.log(anyString.substring(3,NaN));
console.log(anyString.substring(-2,3));
console.log(anyString.substring(NaN,3));
```

## 改

这里改的意思也**不是改变原字符串**，而是创建字符串的一个副本，再进行操作

常见的有：

> - trim()、trimLeft()、trimRight()
> - repeat()
> - padStart()、padEnd()
> - toLowerCase()、 toUpperCase()

### trim()、trimStart()、trimEnd()

**`trim()`** 方法会从一个字符串的两端删除空白字符。

`trimStart()` 方法从字符串的开头删除空格。`trimLeft()` 是此方法的别名。

`trimEnd()` 方法从一个字符串的末端移除空白字符。`trimRight() `是这个方法的别名。

删除前、后或前后所有空格符，再返回新的字符串

```js
const greeting = '   Hello world!   ';

console.log(greeting);
// expected output: "   Hello world!   ";

console.log(greeting.trim());
// expected output: "Hello world!";
```

### repeat()

接收一个整数参数，表示要将字符串复制多少次，然后返回拼接所有副本后的结果

```js
let stringValue = "na ";
let copyResult = stringValue.repeat(2) // na na 
```

### padStart()、padEnd()

**`padStart()`** 方法用另一个字符串填充当前字符串（如果需要的话，会重复多次），以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。

```js
let stringValue = "foo";
console.log(stringValue.padStart(6)); // "   foo"
console.log(stringValue.padStart(9, ".")); // "......foo"
```

**`padEnd()`** 方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

```js
const str1 = 'Breaded Mushrooms';
console.log(str1.padEnd(25, '.'));
// expected output: "Breaded Mushrooms........"
const str2 = '200';
console.log(str2.padEnd(5));
// expected output: "200  "
```

### toLowerCase()、 toUpperCase()

**`toLowerCase()`** 会将调用该方法的字符串值转为小写形式，并返回。

**`toUpperCase()`** 方法将调用该方法的字符串转为大写形式并返回（如果调用该方法的值不是字符串类型会被强制转换）。

**大小写转化**

```js
let stringValue = "Hello WorlD";
console.log(stringValue.toLowerCase()); // "hello world" 统一转小写
console.log(stringValue.toUpperCase()); // "HELLO WORLD" 统一转大写
```

## 查

除了通过索引的方式获取字符串的值，还可通过：

> - chatAt()
> - indexOf()
> - startWith()
> - includes()

### charAt()

返回给定索引位置的字符，由传给方法的整数参数指定，如果没有提供索引，charAt() 将使用 0。

```js
let message = "abcde";
console.log(message.charAt(2)); // "c"
```

### indexOf()

从字符串开头去搜索传入的字符串，并返回位置（如果没找到，则返回 -1 ）

```js
let stringValue = "hello world";
console.log(stringValue.indexOf("o")); // 4
```

### startWith()

**`startsWith()`** 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 `true` 或 `false`。（后面的参数为搜索开始的位置）

```js
const str1 = 'Saturday night plans';

console.log(str1.startsWith('Sat'));
// expected output: true

console.log(str1.startsWith('Sat', 3));
// expected output: false
```



### includes()

**`includes()`** 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。

**注**：后面的参数表示从当前字符串的哪个索引位置开始搜寻子字符串，默认值为 `0`。（区分大小写）

```js
let message = "foobarbaz";
console.log(message.includes("bar")); // true
console.log(message.includes("bar",6)); // false
区分大小写
'Blue Whale'.includes('blue'); //  false
```

## 转换方法

### split

`split`方法把字符串按照指定的分割符，**拆分成数组**中的每一项

```js
let str = "12+23+34"
let arr = str.split("+") // [12,23,34]
```

## 模板匹配方法

针对正则表达式，字符串设计了几个方法：

> - match()
> - search()
> - replace()

### match()

接收一个参数，可以是一个正则表达式字符串，也可以是一个`RegExp`对象，返回数组

```js
let text = "cat, bat, sat, fat";
let pattern = /.at/;
let matches = text.match(pattern);
console.log(matches[0]); // "cat"
```

### search()

接收一个参数，可以是一个正则表达式字符串，也可以是一个`RegExp`对象，找到则返回匹配索引，否则返回 -1

```js
let text = "cat, bat, sat, fat";
let pos = text.search(/at/);
console.log(pos); // 1
```

### replace()

接收两个参数，第一个参数为匹配的内容，第二个参数为替换的元素（可用函数）

```js
let text = "cat, bat, sat, fat";
let result = text.replace("at", "ond");
console.log(result); // "cond, bat, sat, fat"
```

