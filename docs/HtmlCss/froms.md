---
title: HTML5表单元素
date: 
sidebarDepth: 2
tags:
 - Html5
---

## 表格
**表格标题**caption通常这个标题会被居中且显示于表格之上。caption 标签必须紧随 table 标签之后。这个标签只存在 表格里面才有意义。你是风儿我是沙

```html
<table>
   <caption>我是表格标题</caption>
</table>

```
**「2. 表格结构」**
| 标签名              | 定义           | 说明                                         |
| :------------------ | :------------- | :------------------------------------------- |
| `<table></table>`     | 表格标签       | 就是一个四方的盒子                           |
|` <tr></tr>   `        | 表格行标签     | 行标签要再table标签内部才有意义              |
| `<td></td>`           | 单元格标签     | 单元格标签是个容器级元素，可以放任何东西     |
| `<th></th> `          | 表头单元格标签 | 它还是一个单元格，但是里面的文字会居中且加粗 |
| `<caption></caption>` | 表格标题标签   | 表格的标题，跟着表格一起走，和表格居中对齐   |
| clospan 和 rowspan  | 合并属性       | 跨行合并：rowspan="合并单元格的个数" 跨列合并：colspan="合并单元格的个数"  |


```html
 注意
<thead></thead>:用于定义表格的头部。用来放标题之类的东西。<thead> 内部必须拥有<tr> 标签
<tbody></tbody>:用于定义表格的主体。放数据本体 。
<tfoot></tfoot>: 放表格的脚注之类。
以上标签都是放到table标签中。
```

**「3. 表格属性」**

| 属性名      | 含义                                     | 常用属性值            |
| ----------- | ---------------------------------------- | --------------------- |
| border      | 设置表格的边框（默认border="0"无边框）   | 像素值                |
| cellspacing | 设置单元格与单元格边框之间的空白间距     | 像素值（默认为2像素） |
| cellpadding | 设置单元格内容与单元格边框之间的空白间距 | 像素值（默认为1像素   |
| width       | 设置表格的宽度                           | 像素值                |
| height      | 设置表格的宽度                           | 像素值                |
| align       | 设置表格在网页中的水平对齐方式           | let，center，right    |

## 表单元素
| 属性      | 属性值     | 描述                        |
| --------- | ---------- | --------------------------- |
| type      | text       | 单行文本输入框              |
|           | password   | 密码输入框                  |
|           | radio      | 单选按钮                    |
|           | checkbox   | 复选框                      |
|           | button     | 普通按钮                    |
|           | submit     | 提交按钮                    |
|           | reset      | 重置按钮                    |
|           | image      | 图像形式的提交按钮          |
|           | file       | 文本域名                    |
| name      | 用户自定义 | 控件的名称                  |
| value     | 用户自定义 | input控件中的默认文本值     |
| size      | 正整数     | input控件在页面中的显示宽度 |
| checked   | checked    | 定义选择控件默认被选中的项  |
| maxlength | 正整数     | 控件允许输入的最多字符数    |

**「2.  label标签」**

- label 标签为 input 元素定义标注（标签）。
- label标签主要目的是为了提高用户体验。为用户提高最优秀的服务。

**作用**:用于绑定一个表单元素, 当点击label标签的时候, 被绑定的表单元素就会获得输入焦点。

**如何绑定元素呢**

- 第一种用法就是用label标签直接包含input表单， 适合单个表单选择
- 第二种用法 for 属性规定 label 与哪个表单元素绑定(通过id)。

```html
  第一种
  <label> 用户名： 
    <input type="radio" name="usename" value="请输入用户名">   
  </label>
  
  第二种
  <label for="sex">男</label>
  <input type="radio" name="sex"  id="sex">
```

**「3.  textarea控件(文本域)」**

- 通过textarea控件可以轻松地创建多行文本输入框.
- cols="每行中的字符数" rows="显示的行数"  我们实际开发不用


```
  <textarea >
    文本内容
  </textarea>
```

**文本框和文本域区别**

| 表单              |  名称  |       区别       |                  默认值显示 |             用于场景 |
| :---------------- | :----: | :--------------: | --------------------------: | -------------------: |
| input type="text" | 文本框 | 只能显示一行文本 | 单标签，通过value显示默认值 | 用户名、昵称、密码等 |
| textarea          | 文本域 | 可以显示多行文本 |  双标签，默认值写到标签中间 |               留言板 |

**「4.  select下拉列表」**

- 如果有多个选项让用户选择，为了节约空间，我们可以使用select控件定义下拉列表。
- 在option 中定义selected =" selected "时，当前项即为默认选中项。
- 我们实际开发会用的比较少


```html
<select>
  
  <option>选项1</option>
  <option>选项2</option>
  <option>选项3</option>
  ...
</select>
```
### 新的Input类型


<br>
    <fieldset>
        <legend>新的表单控件</legend> <br>
        邮箱 type="email" <input placeholder="输入合法的邮箱地址" type="email" /> <br><br>
        url type="url" <input placeholder="输入合法的网址" type="url" /> <br><br>
        search type="search" <input placeholder="输入搜索内容" type="search" /> <br><br>
        数字 type="number" <input placeholder="只能输入数字" type="number" /> <br><br>
        电话 type="tel" <input placeholder="输入合法的电话" type="tel" /> <br><br>
        滑块 type="range" <input type="range" /> <br><br>
        颜色 type="color" <input placeholder="" type="color" /> <br><br>
        日期 type="date" <input placeholder="" type="date" /> <br><br>
        选择一个日期（UTC 时间） type="datetime" <input placeholder="" type="datetime" /> <br><br>
        选择一个日期和时间 (无时区) type="datetime-local" <input placeholder="" type="datetime-local" /> <br><br>
        月份 type="month" <input placeholder="" type="month" /> <br><br>
        周 type="week" <input placeholder="" type="week" /> <br><br>
        时间 type="time" <input placeholder="" type="time" /> <br><br>
    </fieldset>

| 属性值        | 说明                        |
| ------------- | --------------------------- |  
| type="email"  | 限制用户输入必须为Email类型 |
| type="url"    | 限制用户输入必须为URL类型   |
| type="date"   | 限制用户输入必须为日期类型  |
| type="time"   | 限制用户输入必须为时间类型  |
| type="month"  | 限制用户输入必须为月类型    |
| type="week"   | 限制用户输入必须为周类型    |
| type="number" | 限制用户输入必须为数字类型  |
| type="tel"    | 手机号码                    |
| type="search" | 搜索框                      |
| type="color"  | 生成一个颜色表单            |



### 修改表单控件中的默认提示信息
1. 表单验证触发`oninvalid`事件
2. 通过`setCustomValidity`方法设置修改内容
```html
		<input type="text" name="uname" pattern="^\d{4,11}" required class="uname">
		<input type="submit" name="">
<script>
  var input = document.querySelector(".uname");
  input.oninvalid=function(){   	
    if(this.validity.patternMismatch===true){
      this.setCustomValidity("请输入4到11位数字");
    }else{
      this.setCustomValidity("");
    }
  }
</script>
```

### datalist元素
input 元素使用 datalist 预定义值

<input list="browsers">
<datalist id="browsers">
  <option value="Internet Explorer"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>

```html
<input list="browsers">
<datalist id="browsers">
  <option value="Internet Explorer"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>
```
### output元素

<br>
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
<input type="range" id="a" value="50">100 +
<input type="number" id="b" value="50">=
<output name="x" for="a b"></output>
</form>

```html
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
    <input type="range" id="a" value="50">100 +
    <input type="number" id="b" value="50">=
    <output name="x" for="a b"></output>
</form>
```
### keygen元素

`<keygen>`元素的作用是提供一种验证用户的可靠方法。

`<keygen>`标签规定用于表单的密钥对生成器字段。

当提交表单时，会生成两个键，一个是私钥，一个公钥。

私钥（private key）存储于客户端，公钥（public key）则被发送到服务器。公钥可用于之后验证用户的客户端证书（client certificate）。

## 表单新属性

### form
- autocomplete = on | off          自动完成
- novalidate = true | false        是否关闭校验
 
### input
- autofocus : 自动获取焦点
- required : 规定必须在提交之前填写输入域（不能为空）
- placeholder
  - 占位符
  - 适用于以下类型的input标签: text, search, url, telephone, email 以及 password。
- multiple
  - 规定是否可选择多个值
  - 适用于以下类型的input标签: email 和 file。
- autocomplete : 
  - 规定输入字段是否应该启用自动完成功能
  - 适用于以下类型的input标签: text, search, url, telephone, email, password, datepickers, range 以及 color。
- form : 规定输入域所属的一个或多个(用空格分隔)表单
- formaction : 
  - 用于描述表单提交的URL地址
  - 与 `type="submit"` 和 `type="image"` 配合使用
  - 会覆盖`<form>`元素中的 `action` 属性
- formenctype : 
  - 属性描述了表单提交到服务器的数据编码
  - 与 `type="submit"` 和 `type="image"` 配合使用
  - 会覆盖 `form` 元素的 `enctype` 属性
- formmethod : 
  - 定义了表单提交的方式
  - 覆盖了 `<form>` 元素的的 `method` 属性
  - 与 `type="submit"` 和 `type="image"` 配合使用
- formnovalidate : 
  - 描述了 `<input>` 元素在表单提交时无需被验证
  - 会覆盖 `<form>` 元素的`novalidate`属性
  - 与`type="submit"`一起使用  
- formtarget : 
  - 指定一个名称或一个关键字来指明表单提交数据接收后的展示
  - 覆盖 `<form>` 元素的 `target` 属性
  - 与 `type="submit"` 和 `type="image"` 配合使用
- pattern (regexp)
  - 描述了一个正则表达式用于验证 `<input>` 元素的值
  - 适用于以下类型的input标签: text, search, url, tel, email, 以及 password
- list
  - 规定输入域的 datalist
  - 值为 datalist 的 id
- height and width
  - 规定用于 `image` 类型的 `<input>` 标签的图像高度和宽度。
  - 与 `type="image"` 配合使用
- min 、max
  - 适用于以下类型的input标签: datepickers、number 以及 range。
- step
  - 为输入域规定合法的数字间隔
  - 适用于以下类型的input标签: number, range, date, datetime, datetime-local, month, time 以及 week。
