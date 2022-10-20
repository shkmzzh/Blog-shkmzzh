---
title: form表单提交数据
date: 
tags:
- form
---

- 真实项目中的数据都是由浏览者输入的，而form表单就是被设计用来收集浏览者输入的数据，form表单不但具有采集数据的作用，还有提交数据的能力(不需要JavaScript)。

- 但原生的提交方式会造成页面跳转，所以这种方式现在几乎不再使用，了解即可。

###  form原生提交

1. form - 原生提交数据的基本配置

   - form标签的action属性用于设置服务器接

     > 用于设置服务器接口 form标签内所有的表单元素都会提交到action指向的url

   - form标签的method属性

     > 用于设置请求的方式 get或post

   - 所有的表单元素必须设置name属性

     > name属性用于设置服务器所接收的数据项的key

   - 提交按钮 submit

**示例**

```js
<body>
     action用于设置表单提交时所请求的接口
     method用于设置请求方式
<form action="请求url 地址" method="请求方式">
       name 属性值 将作为 key
       表单输入的内容 将作为 value
   <input class="username" type="text" placeholder="用户名" name="username">
   <input class="password" type="password" placeholder="密码" name="password">
   <input class="submit" type="submit" value="提交">
</form>
</body>
```
- 真实项目中的数据都是由浏览者输入的，而form表单就是被设计用来收集浏览者输入的数据，form表单不但具有采集数据的作用，还有提交数据的能力(不需要JavaScript)。

- 但原生的提交方式会造成页面跳转，所以这种方式现在几乎不再使用，了解即可。

###  form原生提交

1. form - 原生提交数据的基本配置

   - form标签的action属性用于设置服务器接

     > 用于设置服务器接口 form标签内所有的表单元素都会提交到action指向的url

   - form标签的method属性

     > 用于设置请求的方式 get或post

   - 所有的表单元素必须设置name属性

     > name属性用于设置服务器所接收的数据项的key

   - 提交按钮 submit

**示例**

```js
<body>
     action用于设置表单提交时所请求的接口
     method用于设置请求方式
<form action="请求url 地址" method="请求方式">
       name 属性值 将作为 key
       表单输入的内容 将作为 value
   <input class="username" type="text" placeholder="用户名" name="username">
   <input class="password" type="password" placeholder="密码" name="password">
   <input class="submit" type="submit" value="提交">
</form>
</body>
```

### ajax提交数据

虽然form表单的原生提交数据已成为过去，但我们仍然需要使用form表单来收集数据，而使用ajax提交，来替换原生的提交

**步骤**

1. 阻止默认行为

   > 由于ajax提交，与form表单提交都需要通过点击 提交按钮。而form表单的原生提交属于表单的默认行为，所以需要阻止这个默认行为，而执行js的ajax提交行为

2. 收集表单数据

   > 获取表单数据，组织成 axios 的data 参数

3. 发起ajax请求

   > 按之前的方式发起ajax请求， 选择方法，设置url，稍许的不同在于数据是从表单中获取到的。

**示例**

```js
 <script>
        let oBtn = document.querySelector('.submit')
       // 为按钮 .submit 按钮注册事件
        let oBtn = document.querySelector('.submit')
        oBtn.onclick = function(e){
            // 阻止表单的默认行为
            e.preventDefault()
            
            // 收集表单数据
            let data = {
                username:document.querySelector('.username').value,
                password:document.querySelector('.password').value
            }

            // console.log(data);
            // 发起 ajax 请求
            axios.get("https://autumnfish.cn/api/form/submit",{params:data}).then(function(res){
                console.log(res);
            })

    </script>
```

*但是*：这种方法需要自己 自己构造key:value数据很繁琐

###  form-serialize插件

[插件下载地址](https://github.com/defunctzombie/form-serialize)

如果form表单内有很多的表单项，取值的代码也会有很多，这一节咱们来学习form-serialize插件来简化取值

**使用步骤**

- 1.引入form-serialize

  > 引入后会在全局注册一个serialize()方法

- 2.调用serialize即可得到表单内所有的数据

  serialize(form标签对象, {hash:true})

  > 表单数据被组织成对象 {key:value, key:value}

  serialize(form标签对象, {hash:false})

  > 表单数据被组织成 key=value&key=value 格式的键值对

  *注意*：表单元素必须有name属性，

**示例**

```js
 <!-- 1. 导入 form-serialize插件 -->
 <script src="./02-其他资料/lib/form-serialize.js"></script>
    <script>
        let oBtn = document.querySelector('.submit')
        oBtn.onclick = function(e){
            e.preventDefault()

            // 2. 调用 form-serialize方法
            let oForm = document.querySelector('form')
            let data = serialize(oForm, { hash: true })
            // console.log(data);

        axios.get("https://autumnfish.cn/api/form/submit",{params:data}).then(function(res){
                console.log(res);
            })
            
        }
 </script>
```



### FormData 基本用法

上一节咱们是通过插件来获取表单数据，JavaScript提供了一个内置对象`FormData`，也可以实现类似效果，而且不仅仅是文本类数据，文件也可以,咱们先尝试**文本类**的数据 

- [这里只介绍了常用的，详细见文档:MDN-FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

####  **简介**

- FormData是浏览器内置的对象，其作用等价于 form-serialize。
- FormData对象内部使用key value形式存储表单数据项
- 能够结合ajax进行操作

#### **基本语法**

- 1.实例化FormData对象

  - new FormData(form标签对象)

  > 由form标签创建FormData对象，在有form标签的情况下

  - new FormData()

  > 创建一个空的FormData对象，在没有form标签的情况下使用

- 2.实例上的方法

  - .get(key)

  > `返回在 FormData` 对象中与给定键关联的第一个值

  - .append(key, value)

  > 向 `FormData` 中添加新的属性值，`FormData` 对应的属性值存在也不会覆盖原值，而是新增一个值，如果属性不存在则新增一项属性值

  - .set(key,value)

  > 给 `FormData` 设置属性值，如果`FormData` 对应的属性值存在则覆盖原值，否则新增一项属性值

**示例**

```js
<script>
        let oBtn = document.querySelector('.submit')
        oBtn.onclick = function(e){
            e.preventDefault()

            // 1. 基于表单 实例化 FormData 对象
            let oForm = document.querySelector('form')
            
            let fd = new FormData(oForm)
            // console.log(fd);
            // 2. 直接将 FormData 实例作为数据传递
         axios.get("https://autumnfish.cn/api/form/submit",{params:fd}).then(function(res){
                console.log(res);
        })    
    }
</script>
```

### 文件上传表单 - 补充

**accept属性**

accept属性用于过滤出指定类型的文件供选择 [MDN传送门](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#%E9%99%90%E5%88%B6%E5%8F%AF%E6%8E%A5%E5%8F%97%E7%9A%84%E6%96%87%E4%BB%B6%E7%B1%BB%E5%9E%8B)

```html
    <input accept="image/png, image/jpg" type="file" name="avatar" placeholder="请选择头像">
    <input accept=".png, .jpg" type="file" name="avatar" placeholder="请选择头像">
```

 **onchange事件**

选择的文件变更时触发此事件

```html
<script>
    // 选择的文件变更时触发此事件
    document.querySelector('input').onchange = function(){
        // console.log('hello');            
    }
</script>
```

**获取文件对象**

```html
<script>
    // 选择的文件变更时触发此事件
    document.querySelector('input').onchange = function(e){
        // console.log('hello');
        // console.log(this.value);         // 获取的是选择的路径名，这一个字符串
        console.log(e.target.files[0]);     // 获取选择的文件对象
    }

</script>
```

**小结**

- accept属性是否可限制用户选择文件

  > 不可以，仅是简单的过滤

- onchange事件什么时候触发

  > 当选择的文件有所变化时

- 如何获取 文件对象

  > e.target.files[0]
