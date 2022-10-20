---
title: Less
date: 
tags:
 - less
---
## Less

主要的内容，可以去看[Less中文文档](https://less.bootcss.com/)，这里介绍一些常用的

```less
导入 
@import url("./less变量.less"); /*方法一*/
@import "./less嵌套.less"; /*方法二*/
导出
out: ./
在less文件的第一行  // out : 路径
 
如果要禁止导出： 在less文件的第一行// out : false

运算 这里只介绍除,进行除时需要加上括号
line-height: (60px / 2rem);
如果数值都带单位  选择第一个数值的单位
```

### 插件

在vscode中安装 `Easy Less`插件，在保存 less 文件时会自动生成一个css文件

```less
在保存less时生成的css文件，为了防止导出时 css内容的路径不同导致不能引入文件,
为了一劳永逸 可以在 settings.jss中配置如下代码，在当前文件夹生成一个css文件夹,
让保存的less代码,自动放入当中。

"less.compile": {
        "out":"../css/"
 },
```

