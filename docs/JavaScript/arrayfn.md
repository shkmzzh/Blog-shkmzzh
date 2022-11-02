---
title: 数组常用方法
date: 
tags:
- JS
---
[具体的数组方法请参考MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
<hr>

**操作方法**

数组基本操作可以归纳为 增、删、改、查，需要留意的是哪些方法会对原数组产生影响，哪些方法不会

下面对数组常用的操作方法做一个归纳

## 增

下面前三种是对原数组产生影响的增添方法，第四种则不会对原数组产生影响

> - push() - 影响原数组
> - unshift() - 影响原数组
> - splice() - 影响原数组
> - concat() - 不影响原数组

### push()

**`push()`** 方法将一个或多个元素添加到数组的**末尾**，并返回该数组的**新长度**。(影响原数组)

```js
let colors = []; // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
console.log(count) // 2
```

### unshift()

**`unshift()`** 方法将一个或多个元素添加到数组的**开头**，并返回该数组的**新长度**。(影响原数组)

```js
let colors = new Array(); // 创建一个数组
let count = colors.unshift("red", "green"); // 从数组开头推入两项
alert(count); // 2
```

### splice()

`splice()`方法传入三个参数，分别是开始位置、0（要删除的元素数量）、插入的元素，返回空数组

```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(1, 0, "yellow", "orange")
console.log(colors) // red,yellow,orange,green,blue
console.log(removed) // []
```

### concat()

首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组

```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

## 删

下面三种都会影响原数组，最后一项不影响原数组：

> - pop()： 删除数组的最后一项
> - shift()： 删除数组的第一项
> - splice()
> - slice()

### pop()

`pop()` 方法用于删除数组的最后一项，同时减少数组的`length` 值，返回被删除的项

```js
let colors = ["red", "green"]
let item = colors.pop(); // 取得最后一项
console.log(item) // green
console.log(colors.length) // 1
```

### shift()

`shift()`方法用于删除数组的第一项，同时减少数组的`length` 值，返回被删除的项

```js
let colors = ["red", "green"]
let item = colors.shift(); // 取得第一项
console.log(item) // red
console.log(colors.length) // 1
```

### splice()

传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组

```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(0,1); // 删除第一项
console.log(colors); // green,blue
console.log(removed); // red，只有一个元素的数组
```

### slice()

`slice() `用于创建一个包含原有数组中一个或多个元素的新数组，(不会影响原始数组)

```js
let colors = ["red", "green", "blue", "yellow", "purple"];
let colors2 = colors.slice(1);
let colors3 = colors.slice(1, 4);
console.log(colors)   // red,green,blue,yellow,purple
concole.log(colors2); // green,blue,yellow,purple
concole.log(colors3); // green,blue,yellow
```

## 改

即修改原来数组的内容，常用`splice`

### splice()

传入三个参数，分别是开始位置，要删除元素的数量，要插入的任意多个元素，返回删除元素的数组，对原数组产生影响 (改变原数组)

```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(1, 1, "red", "purple"); // 插入两个值，删除一个元素
console.log(colors); // red,red,purple,blue
console.log(removed); // green，只有一个元素的数组
```

### fill()

**`fill()`** 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

**参数**  `value ` 用来填充数组元素的值, `start `(可选)起始索引，默认值为 0,`end`（可选）终止索引，默认值为 arr.length。

```js
const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```



## 查

即查找元素，返回元素坐标或者元素值

> - indexOf()
> - includes()
> - find()

### indexOf()

**`indexOf()`** 方法返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回 -1。

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.indexOf(4) // 3
```

### includes()

**`includes()`** 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.includes(4) // true
const pets = ['cat', 'dog', 'bat'];
console.log(pets.includes('cat')); //true
```

### find()

**`find()`** 方法返回数组中满足提供的测试函数的**第一个匹配**元素的值。否则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

```js
const people = [
    {
        name: "Matt",
        age: 27
    },
    {
        name: "Nicholas",
        age: 29
    }
];
let a =people.find((element, index, array) => element.age < 28)  
a // {name: "Matt", age: 27}
如果改变 a 的值将会改变原数组的值 例：
a.name='zs'
console.log(people) //[{name: "zs", age: 27},{name: "Nicholas", age: 29}]
```

### findIndex()

`findIndex()`方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1。

```js
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```

## 排序方法

数组有两个方法可以用来对元素重新排序：

> - reverse()
> - sort()

### reverse()

**`reverse()`** 方法将数组中元素的位置颠倒，并返回该数组，该方法会改变原数组

```js
let values = [1, 2, 3, 4, 5];
values.reverse();
alert(values); // 5,4,3,2,1
------------------------------------------------
const array1 = ['one', 'two', 'three'];
const reversed = array1.reverse();
Array ["three", "two", "one"]
```

### sort()

`sort()`方法接受一个比较函数，用于判断哪个值应该排在前面

```js
function compare(a,b) {
    if (a < b)  (在某些排序规则中，a 小于 b){
        return -1;
    } else if (a > b) (在这一排序规则下，a 大于 b){
        return 1;
    } else {
         a 一定等于 b
        return 0;
    }
}
let values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); // 0,1,5,10,15
```

## 转换方法

常见的转换方法有：

### join()

**`join()`** 方法将一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#使用类数组对象_array-like_objects)）的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔。如果数组只有一个元素，那么将返回该元素而不使用分隔符。

```js
let colors = ["red", "green", "blue"];
alert(colors.join(",")); // red,green,blue
alert(colors.join("||")); // red||green||blue
```

## 迭代方法

常用来迭代数组的方法（都不改变原数组）有如下：

> - some()
> - every()
> - forEach()
> - filter()
> - map()

### some()

对数组每一项都运行传入的测试函数，如果至少有1个元素返回 true ，则这个方法返回 true

**注**：如果用一个空数组进行测试，在任何情况下它返回的都是 false。

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let someResult = numbers.some((item, index, array) => item > 2);
console.log(someResult) // true
```

### every()

对数组每一项都运行传入的测试函数，如果所有元素都返回 true ，则这个方法返回 true

**注**： 若收到一个空数组，此方法在任何情况下都会返回 `true`。

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers.every((item, index, array) => item > 2);
console.log(everyResult) // false
```

### forEach()

对数组每一项都运行传入的函数，没有返回值

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.forEach((item, index, array) => {
    // 执行某些操作
});
```

### filter()

对数组每一项都运行传入的函数，函数返回 `true` 的项会组成数组之后返回

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers.filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3
```



### map()

对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let mapResult = numbers.map((item, index, array) => item * 2);
console.log(mapResult) // 2,4,6,8,10,8,6,4,2
```

### reduce()

`reducer` 方法逐个遍历数组元素，每一步都将当前元素的值与上一步的计算结果相加（上一步的计算结果是当前元素之前所有元素的总和）——直到没有更多的元素被相加。

**参数**

一个“reducer”函数，包含四个参数：

- `previousValue`：上一次调用 `callbackFn` 时的返回值。在第一次调用时，若指定了初始值 `initialValue`，其值则为 `initialValue`，否则为数组索引为 0 的元素 `array[0]`。
- `currentValue`：数组中正在处理的元素。在第一次调用时，若指定了初始值 `initialValue`，其值则为数组索引为 0 的元素 `array[0]`，否则为 `array[1]`。
- `currentIndex`：数组中正在处理的元素的索引。若指定了初始值 `initialValue`，则起始索引号为 0，否则从索引 1 起始。
- `array`：用于遍历的数组。

**求和**

```js
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 10
```



## 静态数组方法

### from()

**`Array.from()`** 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

**注**：常用于伪数组转换为真数组

```js
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```

