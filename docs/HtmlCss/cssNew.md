---
title: CSS3新特性
date: 
sidebarDepth: 2
tags:
 - css3
---

## 背景

CSS3更新了几个新的背景属性用来控制背景元素

- `background-origin`: 规定背景图片的定位区域，可选值如下
  - `padding-box`  背景图像相对内边距定位（默认值）
  - `border-box`   背景图像相对边框定位【以边框左上角为参照进行位置设置】
  - `content-box`  背景图像相对内容区域定位【以内容区域左上角为参照进行位置设置】
  - 默认值为`padding-box`

- `background-clip`: 规定背景的绘制区域，可选值如下
  - `border-box`	 背景被裁切到边框盒子位置 【将背景图片在整个容器中显示】
  - `padding-box`	 背景被裁切到内边距区域【将背景图片在内边距区域（包含内容区域）显示】
  - `content-box`	 背景被裁切到内容区域【将背景图片在内容区域显示】
  - 默认值为`border-box`

- `background-size`: 规定背景图片的尺寸，可选值如下
  - `length`       设置背景图片高度和宽度
  - `percentage`   将计算相对于背景定位区域的百分比
  - `cover`        会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小
  - `contain`      会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。


## 边框

- 边框圆角 `border-radius: 左上 右上 右下 左下`;
  - `border-top-left-radius` 左上
  - `border-top-right-radius` 右上
  - `border-bottom-right-radius` 右下
  - `border-bottom-left-radius` 左下
- 盒子阴影 `box-shadow: h-shadow v-shadow blur spread color inset`;
  - `h-shadow`: 必需的。代表阴影在水平方向的偏移量（正数向右，负数向左）
  - `v-shadow`: 必需的。代表阴影在垂直方向的偏移量（正数代表向下，负数代表向上）
  - `blur`: 可选。模糊距离（不能设置负数）
  - `spread`: 可选。阴影的大小
  - `color`: 可选。阴影的颜色
  - `inset`: 可选。从外层的阴影（开始时）改变阴影内侧阴影

- 边框图片 `border-image: source slice width outset repeat`;
  - `border-image-source`: 设置边框图片
  - `border-image-slice: number|%|fill`: 指定图像的边界向内偏移
  - `border-image-width: number|%|auto`: 边框图片宽度
  - `border-image-outset: length|number`: 指定在边框外部绘制 `border-image-area` 的量
    - length
    - number代表相应的border-width 的倍数
  - `border-image-repeat`: 设置边框图片的平铺方式
    - stretch默认值。拉伸图像来填充区域
    - repeat平铺图像来填充区域
    - round如果无法完整平铺所有图像，则对图像进行缩放以适应区域
    - space如果无法完整平铺所有图像，扩展空间会分布在图像周围

## 阴影效果

- 文本阴影 `text-shadow: h-shadow v-shadow blur color;` 
  - `h-shadow`: 必需的。代表阴影在水平方向的偏移量（正数向右，负数向左）
  - `v-shadow`: 必需的。代表阴影在垂直方向的偏移量（正数代表向下，负数代表向上）
  - `blur`: 可选。模糊距离（不能设置负数）
  - `color`: 可选。阴影的颜色
- 文本溢出 `text-overflow: clip|ellipsis|string;`
  - `clip` 修剪文本
  - `ellipsis` 显示省略符号来代表被修剪的文本
  - `string` 使用给定的字符串来代表被修剪的文本
- 自动换行 `word-wrap: normal|break-word;`
  - `normal` 只在允许的断字点换行（浏览器保持默认处理）
  - `break-word` 在长单词或 URL 地址内部进行换行
- 断行规则 `word-break: normal|break-all|keep-all;`
  - `normal` 使用浏览器默认的换行规则
  - `break-all` 允许在单词内换行
  - `keep-all` 只能在半角空格或连字符处换行

## 渐变
```css
       background-image: linear-gradient(颜色1,颜色2。。。); 
       background-image: linear-gradient(deepskyblue,green); 
       background-image: linear-gradient(渐变角度,颜色1,颜色2。。。); 
       从左到右 */
       background-image: linear-gradient(to right ,deepskyblue,green); 
       background-image: linear-gradient(60deg, deepskyblue, green);
       从上到下 
      background-image: linear-gradient(to bottom,transparent,rgba(0,0,0,.8));
 
      私有前缀
      早期的w3c不支持一些特殊的属性 ，但是浏览器是支持使用的所以各大浏览器就有了对应的前缀
      -webkit-     谷歌和苹果
      -moz-         火狐
      -ms-          ie
      -o-           欧朋

      background-image: -webkit-linear-geadient(top,transparent,raba(0,0,0,.8)); 
```

### 线性渐变
`background: linear-gradient(direction, color-stop1, color-stop2, ...);`
1. 开始颜色和结束颜色
   - 取值可以为关键字、十六进制颜色值、RGBA颜色等
2. 渐变的方向 
   - `to + right | top | bottom | left`
   - 通过角度表示一个方向 0deg(从下向上) 90deg(从左到右)
3. 渐变的范围
   - 可以使用长度单位来控制渐变的开始位置与结束位置，在颜色后面用空格隔开加长度，长度单位可以是px也可以是%等
4. 重复的线性渐变
   - `repeating-linear-gradient()` 函数用于重复线性渐变
   - `repeating-linear-gradient(red, yellow 10%, green 20%);`
### 径向渐变
`background: radial-gradient(position , shape size, start-color, ..., last-color);`
1. 颜色  
   - 颜色可以为关键词、十六进制颜色值、RGBA颜色值等
2. 圆心位置 `postion`
   - `position` 可以为长度值或者关键字
   - 若提供两个参数则第一个参数表示横坐标，第二个参数表示纵坐标
   - 若只提供一个，第二个值默认为50%，即center
3. 圆形状 `shape`
   - `circle` 定义径向渐变为圆形
   - `ellipse` 定义径向渐变为椭圆形
4. 圆大小 `size`  
主要用于定于径向渐变的结束形状大小
   - `closest-side`: 指定径向渐变的半径长度为从圆心到离圆心最近的边
   - `closest-corner`: 指定径向渐变的半径长度为从圆心到离圆心最近的角
   - `farthest-side`: 指定径向渐变的半径长度为从圆心到离圆心最远的边
   - `farthest-corner`: 指定径向渐变的半径长度为从圆心到离圆心最远的角
5. 重复的径向渐变
   - `repeating-radial-gradient` 函数用于重复径向渐变

  ## 2D平面转换

- - **2D**转换是改变标签在二维平面上的位置和形状
  - 移动：**translate**
  - 旋转：**rotate**
  - 缩放：**scale**

 ### translate 位移
```css
  transform: translate(水平方向移动距离，垂直方向移动距离)
  transform: translate(x, y)
   /* 只写一个值 代表水平方向 */
  transform: translate(100px);
  /* 移动指定坐标轴 */
  transform: translateX(100px)
  transfrom: translateY(50px) 
   /* 父盒子宽度的一半 */
  margin-left:50% ;
  /* transform 百分比参照自身的宽高 */
  transform: translate(0,50%);
```
**重点知识点**
- - 2D的移动主要是指水平、垂直方向上的移动
  - translate最大的优点就是**不影响**其他元素的位置
  - translate中的100%单位，是相对于**本身**的宽度和高度来进行计算的
  - translate对于行内标签没有效果

### rotate 旋转

- - 2D旋转指的是让元素在二维平面内顺时针或者逆时针旋转
```css
 rotate语法
.box:hover{
      /* 转换 ：旋转 角度单位 deg */
      transform: rotate(角度);
      角度为**正**时，顺时针，角度为负时，逆时针 默认旋转的中心点是元素的中心点
      /* transform: rotate(100deg);   顺时针 */
      transform: rotate(-100deg); /*逆时针 */
    }
```
- **设置元素旋转的中心点(transform-origin)**

```css
       transform-origin 设置旋转中心点 
       transform-origin: 水平中心点 垂直中心点
       /* 可以给x y 设置像素或者方位名词(top、bottom、left、right、center) */
       transform-origin:right bottom;
       transform-origin:center bottom;
       transform-origin:100px 50px;
       /* 使用百分比参照的是自身 */
       transform-origin: 50% 50%;
```
### scale 缩放

- **scale**的作用：用来控制元素的放大与缩小

```css
      数值代表倍数 不加单位 
      transform: scale: (宽度缩放的倍数，高度缩放的倍数); 
      数值 1 相当于分界线 小于1 相当于缩小 大于1 相当于放大 
      transform: scale(0.6,0.5);
      如果写一个值，代表宽度和高度同时缩放相同倍数
      transform: scale(0.8); 
      scale 最大的优势：可以设置转换中心点缩放，默认以中心点缩放，而且不影响其他盒子
```

**「7. 2D 转换综合写法以及顺序问题」**
- 同时使用多个转换，其格式为 `transform: translate() rotate() scale()`
- 顺序会影响到转换的效果(先旋转会改变坐标轴方向)
- 当我们同时有位置或者其他属性的时候，要将位移放到最前面

```css
div:hover {
  transform: translate(200px, 0) rotate(360deg) scale(1.2)
}
```

## 动画(animation)

「动画」是CSS3中最具颠覆性的特征之一，可通过设置多个节点来精确的控制一个或者一组动画，从而实现复杂的动画效果。

**「动画的使用」**

1. 先**定义**动画
2. 再**调用**定义好的动画

```css
/*1. 定义动画*/
@keyframes 动画名称 {
    0% {
        width: 100px;
    }
    100% {
        width: 200px
    }
}
div {
 /* 调用动画 */
  animation-name: 动画名称;
  /* 持续时间 */
  animation-duration: 持续时间；
}
```

**「动画序列」**

- 0% 是动画的开始，100 % 是动画的完成，这样的规则就是**动画序列**
- 在 **@keyframs**中规定某项 CSS 样式，就由创建当前样式**逐渐**改为新样式的动画效果
- 动画是使元素从一个样式逐渐变化为另一个样式的效果，可以改变任意多的样式任意多的次数
- 用百分比来规定变化发生的时间，或用 `from` 和 `to`，等同于 0% 和 100%

```css
<style>
    div {
      width: 100px;
      height: 100px;
      background-color: aquamarine;
      animation-name: move;
      animation-duration: 0.5s;
    }

    @keyframes move{
      0% {
        transform: translate(0px)
      }
      100% {
        transform: translate(500px, 0)
      }
    }
  </style>
```

**「动画常见属性」**
| 属性                      | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| @keyframes                | 规定动画                                                     |
| animation                 | 所有动画属性的简写，除了animation-play-state属性。           |
| animation-name            | 规定@keyframes动画的名称。（必须的）                         |
| animation-duration        | 规定动画完成一个周期所花费的秒或毫秒，默认是0。（必须的）    |
| animation-timing-function | 规定动画的速度曲线，默认是1，还有infinite                    |
| animation-delay           | 规定动画何时开始，默认是0。                                  |
| animation-iteration-count | 规定动画被播放的次数，默认是1，还有infinite                  |
| animation-direction       | 规定动画是否在下一周期逆向播放，默认是“normal”，alternate逆播放 |
| animation-play-state      | 规定动画是否正在运行或暂停。默认是“running”还有“paused”。    |
| animation-fill-mode       | 规定动画结束后状态，保持forwards回到起始backwards            |

```css
div {
  width: 100px;
  height: 100px;
  background-color: aquamarine;
  /* 动画名称 */
  animation-name: move;
  /* 动画花费时长 */
  animation-duration: 2s;
  /* 动画速度曲线 */
  animation-timing-function: ease-in-out;
  /* 动画等待多长时间执行 */
  animation-delay: 2s;
  /* 规定动画播放次数 infinite: 无限循环 */
  animation-iteration-count: infinite;
  /* 是否逆行播放 */
  animation-direction: alternate;
  /* 动画结束之后的状态 */
  animation-fill-mode: forwards;
}

div:hover {
  /* 规定动画是否暂停或者播放 */
  animation-play-state: paused;
}
```

**「动画简写方式」**

```css
/* animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 起始与结束状态 */
animation: name duration timing-function delay iteration-count direction fill-mode
```

**知识要点**

- 简写属性里面不包含 `animation-paly-state`
- 暂停动画 `animation-paly-state: paused`; 经常和鼠标经过等其他配合使用
- 要想动画走回来，而不是直接调回来：`animation-direction: alternate`
- 盒子动画结束后，停在结束位置：`animation-fill-mode: forwards`

```css
animation: move 2s linear 1s infinite alternate forwards;
```

**「速度曲线细节」**

`animation-timing-function`: 规定动画的速度曲线，默认是**ease**

| 值        | 描述                                           |
| --------- | ---------------------------------------------- |
| linear    | 动画从头到尾的速度是相同的。匀速               |
| ease      | 默认。动画以低速开始，然后加快，在结束前变慢。 |
| ease-in   | 动画以低速开始。                               |
| ease-out  | 动画以低速结束。                               |
| ease-out  | 动画以低速开始和结束。                         |
| steps（） | 指定了事件函数中的间隔数量（步长）             |


## 过渡 transition 

通过过渡**transition**，可以让web前端开发人员不需要javascript就可以实现简单的动画交互效果。

> `深入理解CSS过渡transition`
> https://www.cnblogs.com/xiaohuochai/p/5347930.html

**「定义」**过渡transition是一个复合属性，包括**transition-property**、**transition-duration**、**transition-timing-function**、**transition-delay**这四个子属性。通过这四个子属性的配合来完成一个完整的过渡效果。

```css
transition-property: 过渡属性(默认值为all)
transition-duration: 过渡持续时间(默认值为0s)
transiton-timing-function: 过渡函数(默认值为ease函数)
transition-delay: 过渡延迟时间(默认值为0s)
.test{
    height: 100px;
    width: 100px;
    background-color: pink;
    transition-duration: 3s;
/*     以下三值为默认值，稍后会详细介绍 */
    transition-property: all;
    transition-timing-function: ease;
    transition-delay: 0s;
}    
.test:hover{
    width: 500px;
}
~~~html
<div class="test"></div>
```
- **注意:**

- - transition的这四个子属性之间不能用逗号隔开，只能用空格隔开。因为逗号隔开的代表不同的属性(transition属性支持多值，多值部分稍后介绍)；而空格隔开的代表不同属性的四个关于过渡的子属性。

```css
.test{
    height: 100px;
    width: 100px;
    background-color: pink;
/*代表持续时间为2s，延迟时间为默认值0s*/
    transition: 2s;

/*代表持续时间为1s，延迟时间为2s*/
    transition: 1s 2s;
}    
.test:hover{
    width: 500px;
}
<div class="test"></div>
```
**「过渡属性」**


```css
  none: 没有指定任何样式
  all: 默认值，表示指定元素所有支持transition-property属性的样式
  <transition-property>: 可过渡的样式，可用逗号分开写多个样式
```

**「过渡持续时间」**

- 初始值: 0s
- 应用于: 所有元素
- 继承性: 无
- [注意]该属性不能为负值
- [注意]若该属性为0s则为默认值，若为0则为无效值。所以必须**带单位**
- [注意]该值为单值时，即所有过渡属性都对应同样时间；该值为多值时，过渡属性按照顺序对应持续时间

```css
/*DEMO中的过渡属性值*/
transition-property: width,background;
```


**「过渡时间函数」**

**过渡时间函数**用于定义元素过渡属性随时间变化的过渡速度变化效果

- 初始值: **ease**
- 应用于: 所有元素
- 继承性: 无

**「取值」** 过渡时间函数共三种取值，分别是**关键字**、**steps函数**和**bezier函数**

**「关键字」**其实是bezier函数或steps函数的特殊值

```css
ease: 开始和结束慢，中间快。
linear: 匀速。
ease-in: 开始慢。
ease-out: 结束慢。
ease-in-out: 和ease类似，但比ease幅度大。
```

------

## 3D转换

**「3D的特点」**近大远小，物体和面遮挡不可见

**「三维坐标系」**

- x 轴：水平向右  -- `注意：x 轴右边是正值，左边是负值`
- y 轴：垂直向下  -- `注意：y 轴下面是正值，上面是负值`
- z 轴：垂直屏幕  --  `注意：往外边的是正值，往里面的是负值`

**1. 3D 转换知识要点**

- `3D` 位移：`translate3d(x, y, z)`
- `3D` 旋转：`rotate3d(x, y, z)`
- `透视` ：`perspctive`
- `3D`呈现 `transfrom-style`

  ### 3D位移 translate3d

- `3D` 移动就是在 `2D` 移动的基础上多加了一个可以移动的方向，就是 z 轴方向
- `transform: translateX(100px)`：仅仅是在 x 轴上移动
- `transform: translateY(100px)`：仅仅是在 y 轴上移动
- `transform: translateZ(100px)`：仅仅是在 z 轴上移动
- `transform: translate3d(x, y, z)`：其中x、y、z 分别指要移动的轴的方向的距离
- `注意：x, y, z 对应的值不能省略，不需要填写用 0 进行填充`

```css
  transform: translate3d(100px, 100px, 100px)
  /* 注意：x, y, z 对应的值不能省略，不需要填写用 0 进行填充 */
  transform: translate3d(100px, 100px, 0)
```

### 透视 perspective

- 知识点讲解

- - 如果想要网页产生 `3D` 效果需要透视(理解成 `3D` 物体投影的 `2D` 平面上)
  - 实际上模仿人类的视觉位置，可视为安排一只眼睛去看
  - 透视也称为视距，所谓的视距就是人的眼睛到屏幕的距离
  - 距离视觉点越近的在电脑平面成像越大，越远成像越小
  - 透视的单位是像素

- 知识要点

- - **透视需要写在被视察元素的父盒子上面**
  - 注意下方图片
  - d：就是视距，视距就是指人的眼睛到屏幕的距离
  - z：就是 z 轴，z 轴越大(正值)，我们看到的物体就越大

```css
body {
  /*透视需要写在被视察元素的父盒子上面 */
  perspective: 1000px;
}
translateZ与perspective的区别
```

- `perspecitve` 给父级进行设置视距的，`translateZ` 给 子元素进行设置不同的大小

### 3D 旋转 rotate

**3D 旋转**指可以让元素在三维平面内沿着 x 轴、y 轴、z 轴 或者自定义轴进行旋转

- `语法：`

- - **transform: rotateX(45deg)** -- 沿着 x 轴正方向旋转 45 度 正值打下巴 负值打头
  - **transform: rotateY(45deg)** -- 沿着 y 轴正方向旋转 45 度 正值打左脸 负值打右脸
  - **transform: rotateZ(45deg)** -- 沿着 z 轴正方向旋转 45 度 z轴旋转和2d旋转rotate效果一样
  - **transform: rotate3d(x, y, z, 45deg)** -- 沿着自定义轴旋转 45 deg 为角度

- `左手法则：`

- - 左手的手拇指指向 x 轴的正方向
  - 其余手指的弯曲方向就是该元素沿着 x 轴旋转的方向



 ### 3D旋转 rotate3d

- **transform: rotate3d(x, y, z, deg)** -- 沿着自定义轴旋转 deg 为角度

- x, y, z 表示旋转轴的矢量，是标识你是否希望沿着该轴进行旋转，最后一个标识旋转的角度

- - **transform: rotate3d(1, 1, 0, 180deg)** -- 沿着对角线旋转 45deg
  - **transform: rotate3d(1, 0, 0, 180deg)** -- 沿着 x 轴旋转 45deg

```css
div {
  perspective: 500px;
}

img {
  display: block;
  margin: 100px auto;
  transition: all 1s;
}

img:hover {
  transform: rotate3d(1, 1, 0, 180deg)
}
```

### 3D呈现transform-style

- 控制子元素是否开启三维立体环境
- `transform-style: flat` 代表子元素不开启 `3D` 立体空间，默认的
- `transform-style: preserve-3d` 子元素开启立体空间
- 代码写给父级，但是影响的是子盒子
