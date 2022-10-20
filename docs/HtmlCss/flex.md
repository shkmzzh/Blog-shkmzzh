---
title: flex布局
date: 
tags:
 - css
---
# Flex布局

### 基本概念

​      采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。

<img src="https://img-blog.csdnimg.cn/01e00a7394084889b1ac41611be8564e.jpeg ">

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

## 容器的属性

以下6个属性设置在容器上

> - justify-content
> - align-items
> - flex-direction
> - flex-wrap
> - flex-flow
> - align-content

###  justify-content属性

**justify-content** 属性定义了项目在主轴上的对齐方式

它可能取6个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右

- `flex-start`（默认值）：左对齐

<img src="https://img-blog.csdnimg.cn/7e61b25133294a3396e58f5260e7327d.png ">

- `flex-end`：右对齐

<img src="https://img-blog.csdnimg.cn/942e14509cfe4306b99dccf0a48f7bdd.png ">

- `center`： 居中

<img src=" https://img-blog.csdnimg.cn/5295c7b5e13545e0920854e879e1f178.png">

- `space-between`：两端对齐，项目之间的间隔都相等

<img src=" https://img-blog.csdnimg.cn/1e0067a9ef1d4ca785e774e200679e47.png">

- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

<img src="https://img-blog.csdnimg.cn/3091f3909d884dea8aa02fbe642eb69f.png ">

- `space-evenly`: 等距分布

<img src="https://img-blog.csdnimg.cn/06ad82015dbe4407b07b9deb5ffd82b9.png">



### align-items属性

**align-items**属性定义项目在交叉轴上如何对齐。 单行侧轴对齐方式

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：交叉轴的中点对齐。
- `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
- `baseline`: 项目的第一行文字的基线对齐。

<img src="https://img-blog.csdnimg.cn/a4f1911149e249feb5c7d1f0db4f5fd5.png ">

### flex-direction属性

**flex-direction**属性决定主轴的方向（即项目的排列方向）

<img src="https://img-blog.csdnimg.cn/b96750cd3d8e4ba19390807449769ad9.png">

它有四个属性值

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。

###  flex-wrap属性

默认情况下，项目都排在一条线（又称"轴线"）上。**flex-wrap** 属性定义，如果一条轴线排不下，如何换行

它有*三个属性值*

- `nowrap`（默认）：不换行

<img src=" https://img-blog.csdnimg.cn/d000ab242f594d10ac4a8e7d6f5d04ad.jpeg">

- `wrap`：换行，第一行在上方

<img src="https://img-blog.csdnimg.cn/0535c3c8886d49469e9371c7ba1a204a.jpeg ">

- `wrap-reverse`：换行，第一行在下方

<img src="https://img-blog.csdnimg.cn/189aa61b3c6a4616b600663e23245186.jpeg ">



###  flex-flow

**flex-flow** 属性是 *flex-direction* 属性和 *flex-wrap* 属性的简写形式，默认值为`row` `nowrap`

```css
.box {
 /* flex-flow: <flex-direction> || <flex-wrap>;*/
 flex-flow: row nowrap;
}
```



###  align-content属性

**align-content**  多行侧轴对齐方式（设置了换行）。如果项目只有一根轴线，该属性不起作用。

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `stretch`（默认值）：轴线占满整个交叉轴。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `space-evenly`: 垂直等距离 分布

<img src="https://img-blog.csdnimg.cn/a30c6453f9434db68e8f77702a611623.png ">



<img src="https://img-blog.csdnimg.cn/c91f569ea9ec4b86a3505f0112401e5e.png ">



## 项目的属性

以下6个属性设置在项目上。

> - `align-self`
> - `order`
> - `flex`
> - `flex-grow`
> - `flex-shrink`
> - `flex-basis`

### align-self属性

**align-self** 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 *align-items* 属性。默认值为*auto*，表示继承父元素的*align-items*属性，如果没有父元素，则等同于 *stretch*

<img src=" https://img-blog.csdnimg.cn/c1f2e2a9ff7d4e2b8cac633ac1a778e9.png">

###  order属性

**order **属性定义项目的排列顺序。数值越小，排列越靠前，默认为0

<img src=" https://img-blog.csdnimg.cn/e25cc5e23bf84176b0bf74791d7cbf7b.png">



###  flex属性

**flex** 属性是 *flex-grow* , *flex-shrink* 和 *flex-basis* 的简写，默认值为`0 1 auto`。后两个属性可选。

其中一个子盒子设置了 该属性 该子盒子会占满 父盒子容器的剩余空间

<img src="https://img-blog.csdnimg.cn/efb3e12212754a77ae1bc1ee9a91fc23.png ">

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值(一般)

[Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)