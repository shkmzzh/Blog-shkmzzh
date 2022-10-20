---
title: Webpack
date: 
tags:
- Node
---
# webpack

## 前端工程化

### 实际的前端开发

- 模块化（js 的模块化、css 的模块化、资源的模块化）
- 组件化（复用已有的 UI 结构、样式、行为）
- 规范化（目录结构的划分、编码规范化、接口规范化、文档规范化、Git 分支管理）
- 自动化（自动化构建、自动部署、自动化测试）

### 何为前端工程化

前端工程化即，在企业级的前端项目开发中，把前端开发所需的工具、技术、流程、经验等进行规范化、标准化。这样有利于前端开发自成体系，有一套标准的开发方案和流程。

### 前端工程化解决方案

早期解决方案：

- [grunt](https://gitee.com/link?target=https%3A%2F%2Fwww.gruntjs.net%2F)
- [gulp](https://gitee.com/www.gulpjs.com.cn/)

目前主流方案：

- [webpack](https://gitee.com/link?target=https%3A%2F%2Fwww.webpackjs.com%2F)
- [parcel](https://gitee.com/link?target=https%3A%2F%2Fzh.parceljs.org%2F)
- [vite](https://vitejs.cn)

## webpack简介

<img src="https://img-blog.csdnimg.cn/e1dc4308c45f4bd681832e96535b4212.webp">

 **webpack** 是前端的打包工具
- 打包的工作内容是什么?
- 1.扫描项目，生成整个项目所有模块的依赖关系，根据配置对模块进行合并，生成一个单独的文件。修改html文件，让html文件引用生成后的文件
- 2.将浏览器无法直接识别的（less、sass、ts）文件，转换成浏览器可以实现的内容。
- 3.将浏览器暂时无法支持的JS新的语法转换成浏览器可以支持的语法

### webpack安装

webpack是基于`node.js`的，使用前需要安装node

> `-D` 是 `--save-dev` 的缩写，表示开发时依赖，只在项目开发阶段用到。 `-S` 是 `--save` 的缩写，表示运行时依赖，即项目打包发布运行时要用到。

##### npm初始化

```bash
npm init -y
```

##### 安装webpack

webpack内部还依赖webpack-cli，所以webpack-cli也要安装

```bash
npm install --save-dev webpack webpack-cli
```

### webpack - 打包 js

**配置**

1.创建webpack配置文件 `webpack.config.js`

```js
// 导入path模块
const path = require('path')

// webpack配置
module.exports = {
    // 配置打包入口文件
    entry: path.resolve(__dirname, 'src', 'index.js'),
    // 配置打包输出位置，及文件名
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 输出文件名
        filename: 'bundle.js'
    }
}
```

2.配置webpack执行命令

- webpack需要npm来调用才可以执行，在package.json中的script中进行配置

```json
"script":{
   "dev":"webpack --config webpack.config.js"
}

```

经过以上配置，在控制台运行  `npm run dev `  命令执行 webpack对 js 文件进行打包

### webpack - 打包模式

- webpack有两种打包模式

##### development 开发模式

> 开发模式 :不会对打包生成的文件进行代码压缩和性能优化 打包速度快，适用于开发阶段使用

##### production 生产模式

> 生产模式: 会对打包生成的文件进行代码压缩和性能优化 打包速度很慢，仅适合在项目发布阶段使用*不设置默认*为`production`模式

**配置**

在webpack.config.js中添加一个*mode*配置项

```js
// 导入path模块
const path = require('path')

// webpack配置
module.exports = {
    // ---------------- 打包模式
    mode: 'development',
    
   /* // 配置打包入口文件
    entry: path.resolve(__dirname, 'src', 'index.js'),
    // 配置打包输出位置，及文件名
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 输出文件名
        filename: 'bundle.js'
     */
    }
}
```

### 插件 - html-webpack-plugin

[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)插件可以在每次打包时都创建一个用于测试用的html文件

```bash
npm i --save-dev html-webpack-plugin
```

**自定义模板配置**`webpack.config.js`

- 在默认配置下创建的index.html文件的内容是由html-webpack-html自动生成的。里面除了引入了js外，边最基本的html结构都没有。 

- 可以为html-webpack-html传入一个参数，让html-webpack-html插件，参照某个文件的内容生成html文件

```js
// 导入path模块
const path = require('path')

// 导入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// webpack配置
module.exports = {
    // ...
    // 插件配置
    plugins:[
        // ---------------- 传入配置参数
        new HtmlWebpackPlugin({
            // js插入位置
            inject: 'body',
            // 生成的html文件名
            filename: 'index.html',
            // 指定参照这个html文件进行生成
            template: path.resolve(__dirname, './public/index.html')
        })
    ]

}
```

### webpack - 打包 css

目前为止，仅仅实现了对js文件的打包，这也是webpack默认的功能，还可以对他文件进行打包

[打包css传送门](https://webpack.js.org/guides/asset-management/#loading-css)

#### **loader**

打包不同类型文件，要使用不同的loader，loader的作用：

- 1.读取文件内容。

- 2.对文件内容进行特定的处理。

<img src="https://img-blog.csdnimg.cn/f91ebf29c0a84126b9fd21bbf4bbc283.webp">


#### **下载 style-loader、css-loader**

```bash
npm i style-loader css-loader --save-dev
```

**配置**

css-loader是将css代码从css文件中读取到内存中，而style-loader是将读取到的css代码设置到index.html文件的style标签内

```js
// webpack配置
module.exports = {
    // ...
    
    // 扩展文件加载模块 - css模块加
    module: {
        // 由于可以加载多种文件，每种文件对应一种loader，所以是数组
        rules: [
            // 由于是多种文件，所以使用扩展名进行区分，再应用不同的loader
            {
                // 正则判断文件类型
                test: /\.css$/i,
                // 这种类型文件使用以下loader
                use: ['style-loader', 'css-loader'],
            }
        ]
    }

}
```

### webpack - 打包 less

[打包less传送门](https://webpack.js.org/loaders/less-loader/)

**下载 less-loader**

```bash
npm i less-loader --save-dev
```

**配置**

```js
// webpack配置
module.exports = {
    // ...
    
    // 扩展文件加载模块 - css模块加
    module: {
        // 由于可以加载多种文件，每种文件对应一种loader，所以是数组
        rules: [
            // 由于是多种文件，所以使用扩展名进行区分，再应用不同的loader
            {
                // 正则判断文件类型
                test: /\.css$/i,
                // 这种类型文件使用以下loader
                use: ['style-loader', 'css-loader'],
            },
            {
                // 判断less文件
                test: /\.less$/i,
                // less使用到的loader，
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    }
}
```

### webpack - 打包图片

在webpacke5.0中无需下载安装图片对应的loader(模块)，因为内嵌了对象图片资源处理的模块，可以直接使用内置的资源模块进行处理([asset/modules](https://webpack.docschina.org/guides/asset-modules/)) 内置了四种处理图片的资源模块

1. asset/resource

   > 将图片文件单独打包成一个文件，保存到打包目录，再使用url(file:///d:/xxx/xxx) 就相当于将原图片，复制到了另个新的位置，改了名，url再指向新的位置即可。 之前是通过 `file-loader` 实现

2. asset/inline

   > 将图片读取成base64格式，使用时通过url(data:image/png;base64,xxxxx)进行引用 之前是通过 `url-loader` 实现

3. asset/source

   > 主要用于字体文件 通过 data:font/woff2;base64,xxxxxoxxox 之前是通过 `raw-loader` 实现

4. asset

   > 在asset/resource 与 asset/inline之间自动选择，之前是通过url-loader，并配置资源体积限制实现。

**配置**

```js
// webpack配置
module.exports = {
    // ...
    
    // 扩展文件加载模块 - css模块加
    module: {
        // 由于可以加载多种文件，每种文件对应一种loader，所以是数组
        rules: [
            // 由于是多种文件，所以使用扩展名进行区分，再应用不同的loader
            {
                // 正则判断文件类型
                test: /\.css$/i,
                // 这种类型文件使用以下loader
                use: ['style-loader', 'css-loader'],
            },
            {
                // 判断less文件
                test: /\.less$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                // 加载图片资料模板
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource'
            },
            {
                // 加载字体文件
                test: /\.(eot|ttf|otf|woff2)$/,
                type: 'asset'
            }
        ]
    }
}
```

**测试**

- 1.复制图片资源

  > 创建文件夹 `./src/assets/imgs/` 复制图片到 imgs文件夹内

- 2.测试：在index.js文件中引入一个图片文件

  > `./src/index.js`

```javascript
// 导入css文件
import './assets/css/base.css'

// 导入less文件
import './assets/less/index.less'

// 导入一个图片文件
import timg from './assets/imgs/timg.png'
// 获取页面图片，并设置src属性
document.querySelector('.avatar').src = timg
```

- 3.测试：在css中设置一个背景图片

  > `./src/assets/less/index.less`

```less
body {
  // ...

  // .box 盒子
  .box{
    width: 400px;
    height: 300px;
    border:1px solid rgba(255,255,255,.5);
    margin: 20px auto;
    // 设置背景图片
    background:url(../imgs/duitang.gif) 0 0/contain no-repeat;
  } 

}
```

### webpack - watch模式

- 目前为目，每次调整配置，都需要手动重新打包一次。 
- 为了解决这个麻烦，webpack内置watch模块，通过配置可以实现自动打包。 [传送门：使用watch模式](https://www.webpackjs.com/guides/development/#使用观察模式)

**package.json配置**

```bash
"script":{
   "watch":"webpack --config webpack.config.js"
}
```

通过`npm run watch`命令启动 watch 模式

但是这种方式仍然需要手动打开index.html页面，重新打包后，html 页面也不会自动刷新所以

我们会使用 `webpack-dev-serve` 这个插件来*代替*这种模式

### 插件 - webpack-dev-serve

- 通过webpack的watch模式，已经可以实现自动打包 ，但是这种方式并不完美所以我们将会使用[webpack-dev-serve](https://webpack.js.org/guides/development/#using-webpack-dev-server)这个插件来代替 watch

**下载**

```bash
npm i --save-dev webpack-dev-server
```

**webpack.config.js配置**

```js
// webpack配置
module.exports = {
    // ...
    
    // webpack-dev-server配置
    devServer: {
        // 配置站点根目录，默认为输出位置
        static: path.resolve(__dirname, 'dist'),
        // 设置端口号
        port: 8080,
        // 自动打开浏览器，访问index.html
        open: true
    }
}
```

**package.json配置启动命令** 

```bash
"script":{
   "serve":"webpack --config webpack.config.js"
}
```

**启动**

```bash
npm run serve
```

### HMR

*webpack-dev-server*，还会附带了一个很有用的功能，HMR(hot module replacement) [传送门：模块热替换](https://www.webpackjs.com/concepts/hot-module-replacement/) 在程序运行的过程(不重新启动服务器)，动态的添加，替换删除某个模块，而无需重新加载整个页面。 例如：index.less内容修改了，只对这个less模块重新加载，不影响其他模块

```js
// webpack配置
module.exports = {
    // ...
    
    // webpack-dev-server配置
    devServer: {
        // 配置站点根目录，默认为输出位置
        static: path.resolve(__dirname, 'dist'),
        // 设置端口号
        port: 4201,
        // 自动打开浏览器，访问index.html
        open: true,
        // 热替换配置，true启用，false禁用，默认为true
        
        ---------在这---------
        hot: true
    }

}
```

### webpack - 打包生产代码

> 当一个项目开发完毕后，要对项目的代码进行最终的打包，最终的打包，要以production模式进行。

可以修改webpack.config.js中的mode:'production' 

```js
// webpack配置
module.exports = {
    // 打包模式
    // 生产环境打包模式
    mode: 'production',
}
```

（**推荐**）也可以在`package.json`的 script 中配置打包命令，通过--mode=production来指定

```json
"build":{
   "serve":"webpack --config webpack.config.js --mode=production"
}
```

**打包命令**

```bash
npm run build
```

### source map

打包后的代码与原代码的所在的文件名，位置都不相同了，如果出错，可能会很难追踪到错误和警告在源代码中的原始位置。可以使用[source map](https://www.webpackjs.com/guides/development/#%E4%BD%BF%E7%94%A8-source-map)，source map可以将错误在源代码中的显示给我们。*只在开发阶段使用，上线一定要移除*

```js
// webpack配置
module.exports = {
    // 配置source-map
    devtool: 'source-map',
    
    // ...
}
```

**注意**

生产环境打包之前一定要移除，不然就会被坏人看到代码喽！！！