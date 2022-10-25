---
title: vue-cli配置&生命周期
date: 
tags:
- Vue
---

[官网传送门](https://gitee.com/link?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2F)

## 创建 Vue 项目

- 全局安装 vue 脚手架：`npm i -g @vue/cli`
- 创建项目：`vue create project-name`
- 运行项目：`npm run serve`
- 打包项目：`npm run build`

## Vue 脚手架项目结构

```
├── node_modules
├── public
│ ├── favicon.ico: 页签图标
│ └── index.html: 主页面
├── src
│ ├── assets: 存放静态资源
│ │ └── logo.png
│ │── component: 存放组件
│ │ └── HelloWorld.vue
│ │── App.vue: 汇总所有组件
│ │── main.js: 入口文件
├── .gitignore: git 版本管制忽略的配置
├── babel.config.js: babel 的配置文件
├── package.json: 应用包配置文件
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

`index.html` 代码分析：

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <!-- 针对IE浏览器的一个特殊配置，含义是让IE浏览器以最高的渲染级别渲染页面 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- 开启移动端的理想视口 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <!-- <%= BASE_URL %> 表示 public 文件夹路径 -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <!-- 拿 package-lock.json 的 name 作为标题 -->
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <!-- 当浏览器不支持js时noscript中的元素就会被渲染 -->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <!-- 容器 -->
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

### 自定义配置脚手架

- 选项

```JavaScript
Vue CLI v5.0.4
? Please pick a preset: (Use arrow keys)
  Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
> Manually select features      选自定义
```

- 手动选择功能

<img src="https://img-blog.csdnimg.cn/5d54c63f08eb48ff87d979f4adcc75dc.png"/>

- 选择vue的版本

```React
  3.x
> 2.x
```

- 是否使用history模式

<img src="https://img-blog.csdnimg.cn/19682e290f3742c090c760024299cd36.png"/>

- 选择css预处理

<img src="https://img-blog.csdnimg.cn/b0414cac76a149828cad6aec361a0b08.png"/>

- 选择eslint的风格 （eslint 代码规范的检验工具，检验代码是否符合规范）
- 比如：const age = 18;   =>  报错！多加了分号！后面有工具，一保存，全部格式化成最规范的样子

<img src="https://img-blog.csdnimg.cn/c7d1bdc974754a4aa4a1ad5b927fc8a5.png"/>

- 选择校验的时机 （直接回车）

<img src="https://img-blog.csdnimg.cn/8507ca3e6b454869be8bed0f4efde4cd.png"/>

- 选择配置文件的生成方式 （直接回车）

<img src="https://img-blog.csdnimg.cn/91112fcce41a465fb37ae956f5b9ec4e.png"/>

- 是否保存预设，下次直接使用？  =>   不保存，输入 N

<img src="https://img-blog.csdnimg.cn/14597838756247d4b3b049f97e103117.png"/>

- 等待安装，项目初始化完成

<img src=""/>

## 使用图形化界面
[官网地址](https://cli.vuejs.org/zh/guide/creating-a-project.html#使用图形化界面)

你也可以通过 `vue ui` 命令以图形化界面创建和管理项目：

```
vue ui
```
<img src="https://img-blog.csdnimg.cn/beab9f30eb874938862da3889615ee18.png"/>


## vue生命周期

[官网地址](https://v2.cn.vuejs.org/v2/guide/instance.html#)生命周期图示

> **生命周期**:是指vue实例从创建到销毁的过程，这个过程中是分成很多个阶段的 所有的生命周期都是一个函数，它是自动会触发，不需要去调用（不能调用），到了相应时间点，它就会自行执行



### 创建期

- **beforeCreate**: 创建前，实例化还没有完成，还不能访问data与methods

- **created**: 创建后，实例化已完成，可以访问data与methods,  vue内部的dom还没有渲染，常用于进入页面接口请求

### 渲染期 

- **beforeMount**: 渲染前，读取了template需要渲染的部分，但是还没有完成渲染，还是不能访问vue渲染后的dom
- **mounted**: 渲染后，vue内的dom已渲染完成，可以访问vue渲染后的dom,进入页面需要有dom操作就在这里进行
  -   *上面的四个生命周期都只会执行一次*

### 更新期(几乎不用)

- 有条件的：vue内部使用(html)的相关数据已修改，它才会执行该时期
- **beforeUpdate**: 更新前，vue内部使用的相关数据已修改，但还没有完成相应数据的渲染
- **updated**: 更新后，vue内部使用的相关数据已修改,且完成相应数据的渲染
  - *上面二个生命周期可以执行多次，但是有条件*

### 销毁期

-  **beforeDestroy**: 销毁前，还没有销毁，所以什么都可以访问，常用于做一些善后工作
-  **destroyed**: 销毁后，销毁实际就是中断渲染，这时候还是可以访问data与methods,只是不能访问vue渲染后的dom,它也可以做一些善后工作



<img src="https://img-blog.csdnimg.cn/e64b351c90304045a8d5ac7e6fd98492.png"/>



<img src="https://img-blog.csdnimg.cn/41930805e1d340fa855decfeafaeaceb.png"/>

