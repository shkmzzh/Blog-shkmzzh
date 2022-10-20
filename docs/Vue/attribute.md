---
title: vue基础属性
date: 
tags:
- Vue
---
## 计算属性-computed

### 基本使用

> 计算属性是一个属性，写法上是一个函数，这个函数的返回值就是计算属性最终的值。

1. 计算属性必须定义在 computed 节点中
2. 计算属性必须是一个 function,计算属性必须有返回值
3. 计算属性不能被当作方法调用,当成属性来用

定义计算属性

```React
// 组件的数据： 需要计算的属性
computed: {
  reverseMsg () {
    return this.msg.split('').reverse().join('')
  }
}
```

使用计算属性

```React
<p>{{ reverseMsg }}</p>
```

### 计算属性的缓存的问题

计算属性只要计算了一次，就会把结果缓存起来，以后多次使用计算属性，直接使用缓存的结果，只会计算一次。

计算属性依赖的属性一旦发生了改变，计算属性会重新计算一次，并且缓存

### 计算属性的完整写法

- 计算属性的值可以作为v-model的参数吗？

答：计算属性默认情况下只能获取，不能修改，不能作为v-model的参数，但完整写法可以

```js
computed: {
    full() {},
    full: {
      get() {
        return this.first + ' ' + this.last
      },
      set(value) {

      }
    }
  }
```

使用完整写法实现按钮全选功能

```js
 computed: {
       checkedAll: {
         get () {
        return this.arr.every(item => item.c)
           },
        set (bol) {
           this.arr.forEach(item => {
            item.c = bol
        })
     }
  }
}
```

## 侦听器-watch

### 基本使用

当需要监听某个数据是否发生改变，就要用到watch

```js
/* 
  watch: {
    // 只要属性发生了改变，这个函数就会执行
    属性: function () {

    }
  }
*/
watch: {
  // 参数1： newval    变化后的值
  // 参数2： oldValue  变化前的值  
  msg (newval, oldVal) {
    console.log('你变了', newval, oldVal)
  }
}
```

### 复杂类型的监听

> 如果监听的是复杂数据类型，需要深度监听，需要指定deep为true,需要用到监听的完整的写法

- 1.默认情况下，watch只能监听到简单类型的数据变化,如果监听的是复杂类型，只会监听地址是否发生改变，不会监听对象内部属性的变化。

- 2.需要使用监听的完整写法 是一个对象

```js
watch: {
  // friend (value) {
  //   console.log('你变了', value)
  // }
  friend: {
    // handler 数据发生变化，需要执行的处理程序
    // deep: true  如果true,代表深度监听，不仅会监听地址的变化，还会监听对象内部属性的变化
    // immediate: 立即 立刻  是否立即监听 默认是false  如果是true,代表页面一加载，会先执行一次处理程序
    handler (newVal,oldVal) {
    	newVal:当前值
        oldVal:修改上一刻的值
    },
        
   默认情况下只侦听栈的变化 ，如果希望堆与栈都侦听，deep:true
    deep: true,（默认值为false）
      
     
    immediate: true
   初次定义watch时是否立马执行它的回调函数
   默认值是false,默认初次定义时不执行回调
   true:初次定义watch时就立马执行它的函数
  }
},
```

## 过滤器-filters

- 过滤器常用于文本的格式化，只能用在插值表达式和 `v-bind` 属性绑定。
- 过滤器只在 `vue 2.x` 和 `vue 1.x` 中支持，`vue 3.x` 废弃了过滤器，官方建议使用计算属性或方法代替过滤器。

### 基本使用

```js
<!-- 在 JS 表达式尾部通过管道符进行调用-->
<p>{{ message | capitalize }}</p>

<div :id="rawId | formatId"></div>
// 定义私有过滤器
filters: {
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
// 在 main.js 中定义全局过滤器
Vue.filter('capitalize', (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})
```

如果私有过滤器和全局过滤器冲突，按照就近原则调用私有过滤器。

### 连续调用多个过滤器

过滤器从左往右调用，前一个过滤器的结果交给下一个过滤器继续处理。

```js
<p>{{ text | capitalize | maxLength }}</p>
```

### 过滤器传参

```js
<p>{{ message | myFilter(arg1, arg2) }}</p>
// 第一个参数永远都是管道符前的值
Vue.filter('myFilter', (value, arg1, arg2) => {
  ...
})
```

使用过滤器处理时间

```js
<div id='app'>
        <p>{{time}}</p>
        <p>{{time | newtime}}</p>
    </div>
    <script src='https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js'></script>
    <script src="https://momentjs.bootcss.com/downloads/moment.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                time:new Date()
            },
            filters:{
                newtime(time){
                    return moment(time).format('YYYY-MM-DD HH:mm:ss')
                }
            }
        })
 </script>
```

## 计算属性与watch侦听器与filter过滤器

- 区别
  - **computed**
    - 依赖一个或者多个值产生一个新的值
    - 它产生的值会缓存
  - **watch**
    - 某个值的change事件
    - 基本数据类型与复杂数据数据类型
      - 默认侦听栈的变化
      - 堆与栈都侦听  deep:true
      - immediate:是否初次定义时就执行函数
  - **filter**
    - 字符加工
    - 只能用于{{}} 和v-bind
    - 它内部方法不能用this
- 三个的实际项目常用
- computed:

```js
computed:{
   方法名(){
     return 值
   }
}
computed:{
   方法名:{
      get(){
         return 值
      },
      set(value){....}
   }
}
{{方法名}}
```

-  watch

```js
watch:{
   属性完整写出，去掉this,加引号
   //  obj:{xxx:10}
   "obj.xxx"(newVal,oldVal){
      newVal:当前值
      oldVal:修改上一刻的值
   }
}
watch:{
   "obj.xxx":{
       handler(newVal,oldVal){
       },
       deep:true,
       immediate:true
   }
}
```

- filter

```js
定义
  filters:{
    方法名(形参){
       return 值
    }
  }
 调用：
    {{实参 | 方法名}}
```

