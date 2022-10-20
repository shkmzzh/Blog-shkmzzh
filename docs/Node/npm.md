---
title: npm&yarn
date: 
tags:
- Node
---
## npm
### npm是什么
 `npm`（node  package  manage）node 包 管理器。管理node包的工具。

> **npm 是 管理（下载、卸载、发布）第三方模块的工具。**

npm这个工具，在安装 node 的时候，就已经安装到你的计算机中了。（捆绑安装）

命令行中执行： `npm -v` ，如果看到**版本号**，说明安装成功了。

### npm的使用

npm的使用整体分两大部分：初始化 与 使用

**初始化**

> 1.`npm init -y`			无需人工参与，所有信息采用默认，**绝大多数使用这个**
>
> 2.`npm  init`				需要人工参与，提供一些信息 人工输入，需要提供以下信息，了解

```json
{
"name": "包名",				// 默认取文件夹名
"version": "0.0.1",			// 版本号
"description": "desc",		// 描述
"main": "index.js",			// 包的入口文件
"scripts": {
"test": "rn"						// 脚本命令
},
"keywords": [
"getsum"							// 包的关键词
],
"author": "dong",				// 包的作者
"license": "ISC"					// 开源协议
}
```

> 会创建文件(package.json)，用于记录录入的相关信息 以及后期下载的文件信息。

**使用**

### 下载第三方模块

> `npm install ` 完整命令
>
> `npm i`     简化命令
>
> 从集中保存第三方模块的服务器上下载模块，并保存到固定的文件夹(node_modules)中。
>
> `npm i 模块名  模块名  模块名`
>
> `npm i 模块名@版本号`

### 卸载第三方模块

> 1.`npm uninstall 模块名`
>
> 
>
> 2.`npm un 模块名`
>
> 
>
> 3.`npm un 模块名  模块名  模块名`

### nrm全局模块介绍

1. npm是用于下载项目开发时需要用到的模块的，npm默认是从国外的服务器下载，国外的服务器由于各种原因下载很慢，经常会由于慢而下载不成功。
2. 这样就有一些国内的大公司在国内创建了服务器，将npm服务器上的资源下载到国内的服务器上，而且会频繁与国外的服务器进行更新，保持时国内服务器上的资料最新，这种服务器也称之为 **镜像服务器**。

- **nrm使用**

  - 先安装 nrm 全局模块

  - > npm i -g nrm

**nrm命令**

> 全局模块安装后就可以在终端通过命令来使用全局模块了
>
> 查看可以用的镜像服务器
>
> `nrm ls`
>
> 测试镜像服务器速度，可以找出最快的
>
> `nrm test`
>
> 切换镜像服务器 为 taobal
>
> `nrm use taobao`
>
> 切换镜像服务器 为 npm
>
> `nrm use npm`
>
> 查看当前镜像
>
>  `npm get registry` 

## yarn 包管理器

> yarn也是一个比较流行的node包管理工具 [yarn下载地址](https://yarn.bootcss.com/docs/install/#windows-stable)

- **区别**  ：npm是node官方的 yarn是第三方开发的

### 安装

- window

```bash
npm i yarn -g
```

- mac

```bash
sudo npm i yarn -g
```

### 基本命令  

```bash
# 1. 初始化
  yarn init  /  yarn init -y


# 2. 添加依赖
  yarn add [package]
  yarn add [package]@[version]


# 3. 移除包
  yarn remove [package]
    
    
# 4. 安装项目全部依赖            
  yarn 或者 yarn install


# 5. 全局
  安装: yarn global add [package]
  卸载: yarn global remove [package]
```