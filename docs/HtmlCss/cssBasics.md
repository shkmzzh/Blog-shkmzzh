---
title: CSS选择器
date: 
tags:
 - CSS
---

### 标签选择器

- 通过标签名选择元素
- 优点：可快速为同类型标签统一设置样式
- 缺点：不能涉及差异化样式，只能选择全部标签

```css
h1 {
  color: #ccc;
}
```

### 类选择器

- 通过类名选择元素

```css
.container {
  color: pink;
}
```

### id 选择器

- 通过元素 id 属性选择元素

```css
#md {
  font-weight: 600;
}
```

### 通配符选择器

- 选择页面所有元素
- 用于清除内外边距

```css
* {
  padding: 0;
  margin: 0;
}
```

### 相邻选择器

- 选择所有指定元素的相邻后一个兄弟节点

```html
<h1>h1-2</h1>
<p>p0 被选中</p>
<div class="container">
  <h1 class="good">h1</h1>
  <p>p1 被选中</p>
  <p>p2</p>
</div>
```

```css
h1 + p {
  text-decoration: underline;
}
```

### 后代选择器

- 在所有后代节点中选

```css
ul li {
  color: blue;
}
```

### 子选择器

- 只在亲儿子中选

```css
div > a {
  color: green;
}
```

### 并集选择器

```css
h1,
h2,
h3 {
  text-align: center;
}
```

### 交集选择器

```css
/* good类的p元素 */
p.good {
  color: yellow;
}
```

### 伪类选择器

- 根据元素状态或所处 DOM 结构选择元素

#### 动态伪类选择器

```css
按这个顺序声明
a:link 链接一开始的样式
a:visited 链接访问后的样式
a:hover 光标经过链接的样式
a:active 链接被按下时的样式

:focus 用于选择获取焦点的表单元素，一般针对表单元素而言
input:focus
textarea:focus
```

#### 结构伪类选择器(C3)

| 选择符           | 含义                  |
| ---------------- | --------------------- |
| E:first-child    | 第一个子元素 E        |
| E:last-child     | 最后一个子元素 E      |
| E:nth-child(n)   | 第 n 个子元素 E       |
| E:first-of-type  | 指定元素 E 的第一个   |
| E:last-of-type   | 指定元素 E 的最后一个 |
| E:nth-of-type(n) | 指定元素 E 的第 n 个  |

- n 可以是数字、关键字（even，odd）、公式（n 从 0 开始）
- nth-child 先找父亲的第 n 个孩子，再看是否为元素 E，是成功，否失败
- nth-of-type 是直接找第 n 个 E，忽略其他非 E 的元素

```html
<div>
  <p>1</p>
  <span>span</span>
  <p>2</p>
  <p>3</p>
  <p>4</p>
</div>
```

```css
/* 啥都选不到 */
div > p:nth-child(2) {
  color: red;
}
/* 选到2号p标签 */
div > p:nth-of-type(2) {
  color: blue;
}
```

### 属性选择器(C3)

| 选择符        | 含义                                          |
| ------------- | --------------------------------------------- |
| E[att]        | 选择具有 att 属性的 E 元素                    |
| E[att="val"]  | 选择具有 att 属性且属性值等于 val 的 E 元素   |
| E[att^="val"] | 选择具有 att 属性且属性值以 val 开头的 E 元素 |
| E[att$="val"] | 选择具有 att 属性且属性值以 val 结尾的 E 元素 |
| E[att*="val"] | 选择具有 att 属性且属性值含有 val 的 E 元素   |

[具体教程参考MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)
## 伪元素选择器(C3)

- 伪元素选择器利用 CSS 创建新标签元素，而不需要 HTML 标签，从而简化 HTML 结构
- before 和 after 创建了一个行内元素，在 DOM 树中无法找到，故为伪元素
- 必须有 content 属性

| 选择器   | 含义                   |
| -------- | ---------------------- |
| ::before | 在元素内部前面插入内容 |
| ::after  | 在元素内部后面插入内容 |

### 伪元素字体图标

```css
p::before {
  content: '\e91e';
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 20px;
}
```

### 伪元素清除浮动

```css
1、额外标签法（隔墙法）
在浮动元素后面添加一个块级标签（如div），并设置 clear: both

<div style="clear:both" ></div>

2、父级元素添加overflow，将其属性值设置为 hidden、 auto 或 scroll

3、父级添加after伪元素
.clearfix:after {
  content: ""; 必须要有content属性
  display: block; 块级元素
  height: 0; 不要看见该元素
  clear: both; 核心代码清除浮动
  visibility: hidden; 不要看见该元素
}
.clearfix { /* IE6、 7 专有 */
  *zoom: 1;
}

4、父级元素添加双伪元素
.clearfix:before,.clearfix:after {
  content:"";
  display:table; 转换为块级元素并一行显示
} .
clearfix:after {
  clear:both;
} .
clearfix {
  *zoom:1;
}
```

[相关链接](https://juejin.cn/post/6976646049456717838)