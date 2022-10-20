---
title: 其他常用方法
date: 
tags:
- JS
---

## Math数学对象

[参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

```js
<script>
            // 1. 生成随机数, [0-1)包括0不包括1
            console.log(Math.random())

            //2. 向上取整
            console.log(Math.ceil(9.1))

            //3. 向下取整
            console.log(Math.floor(9.9))

            //4. 找最大最小数
            console.log(Math.max(1, 8, 4, 2))
            console.log(Math.min(1, -8, 4, 2))

            //5. 幂运算  10的3次幂运算
            console.log(Math.pow(10, 3))

            //6. 绝对值
            console.log(Math.abs(-10.01))
            console.log(Math.abs(10.01))
      
    </script>
```

## Date日期对象

[参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

```js
 <script>
          // Date对象 : 日期对象， 需要先创建当前实例对象
          let d = new Date()

          //1. 获取当前日期和时间
          console.log(d) // 当前日期对象
          console.log(d.toString()) //当前日期字符串
          console.log(d.toLocaleString()) // 转为本地时间格式字符串

          //2. 获取年份
          console.log(d.getFullYear())

          //3. 获取月份(0-11)
          console.log(d.getMonth())

          //4. 获取当前几号(1-31)
          console.log(d.getDate())

          //5. 获取星期几(0-6, 星期天为0)
          console.log(d.getDay())

          //6. 获取时间
          console.log(d.getHours(), d.getMinutes(), d.getSeconds())

          //7. 时间戳：1970年1月1日00时00分00秒起至今的毫秒数，是一种特殊的计量时间的方式。
          //7.1 获取方法一
          console.log(d.getTime())
          
          //7.2 获取方法二
          console.log(+new Date())
            
          //7.3 获取方法三
          console.log(Date.now())
  </script>
```

