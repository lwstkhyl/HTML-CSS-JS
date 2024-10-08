<a id="mulu">目录</a>
<a href="#mulu" class="back">回到目录</a>
<style>
    .back{width:40px;height:40px;display:inline-block;line-height:20px;font-size:20px;background-color:lightyellow;position: fixed;bottom:50px;right:50px;z-index:999;border:2px solid pink;opacity:0.3;transition:all 0.3s;color:green;}
    .back:hover{color:red;opacity:1}
    img{vertical-align:bottom;}
</style>

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [rem](#rem)
    - [一些基本概念](#一些基本概念)
    - [rem与媒体查询](#rem与媒体查询)
    - [flexible.js](#flexiblejs)
- [vw和vh](#vw和vh)
- [媒体查询](#媒体查询)
    - [基本使用](#基本使用)
    - [完整写法](#完整写法)
    - [引入外部CSS](#引入外部css)
- [calc函数](#calc函数)
- [CSS中使用变量](#css中使用变量)
    - [声明](#声明)
    - [读取](#读取)
    - [拼接](#拼接)
    - [作用域](#作用域)
    - [应用--响应式布局](#应用-响应式布局)

<!-- /code_chunk_output -->

<!-- 打开侧边预览：f1->Markdown Preview Enhanced: open...
只有打开侧边预览时保存才自动更新目录 -->

### rem
##### 一些基本概念
**分辨率**：横纵方向上的像素点数，单位是px
通常情况下有两种分辨率：
- **物理分辨率**：指设备出厂设置中固定的硬件分辨率
- **逻辑分辨率**：由软件/驱动决定的、可调节的分辨率，是实际显示出来的分辨率

网页制作中的分辨率都是指逻辑分辨率

---

**视口**：显示HTML网页的区域，用来约束HTML尺寸
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- `width=device-width`：指定视口宽度=设备宽度（横向逻辑分辨率）
- `initial-scale=1.0`：缩放1倍（不缩放）

这行代码是vscode自动生成的，不用自己写，一般情况下也不用改

---

**二倍图**：设计稿里面每个元素的尺寸是实际呈现页面的2倍，是为了防止图片在高分辨率下模糊失真。比如页面逻辑分辨率是375\*667，设计稿中分辨率就是750\*1334

---

**适配方案**：为了使网页能在各种尺寸的页面上正常显示，需要根据页面尺寸对网页进行更改，通常有两种方法
- 宽度适配：高度固定，宽度自适应
  - 百分比布局（使用%为单位指定盒子宽度，如一个父盒子内有4个子盒子横向排列，每个子盒子的width就为25%，高度仍使用px单位）
  - flex布局
- 等比适配：宽高都等比缩放（常用）
  - rem
  - vw/vh
##### rem与媒体查询
rem是一个相对单位，1rem=1HTML标签字号大小
```html
<style>
    /* 首先给HTML标签指定字号 */
    html {
        font-size: 30px;
    }
    /* 使用rem单位 */
    .box {
        width: 5rem;
        height: 3rem;
        background-color: pink;
    }
</style>
<body>
    <div class="box"></div>
</body>
```
![rem1](rem1.png){:width=150 height=150}
盒子实际宽度=5\*30=150px 实际高度=3\*30=90px
但这样写，盒子的宽高仍是固定的，无法实现盒子大小根据页面大小缩放的效果
解决思路：根据页面尺寸更改HTML标签字号
方法：使用**媒体查询**

---

媒体查询能够检测视口宽度，编写差异化的CSS样式。当某个条件成立时，执行对应的CSS
写法：
```
@media (媒体特性) {
  选择器 {
    CSS属性
  }
}
```
常用的媒体特性：
- `width:375px`当视口宽度为375px时
- `max-width:375px`当视口宽度≤375px时
- `min-width:375px`当视口宽度≥375px时

一个关键问题：页面宽度不同，HTML标签字号应设置成多少？
目前通常将网页等分成10份，HTML标签字号为视口宽度的1/10
例如：
```css
/* 使用媒体查询，给不同视口的HTML标签指定字号 */
@media (width:320px) {
    html {
        font-size: 32px;
    }
}
@media (width:375px) {
    html {
        font-size: 37.5px;
    }
}
@media (width:414px) {
    html {
        font-size: 41.4px;
    }
}
.box {
    width: 5rem;
    height: 3rem;
    background-color: pink;
}
```
![rem2](rem2.png){:width=200 height=200}![rem3](rem3.png){:width=200 height=200}![rem4](rem4.png){:width=200 height=200}
##### flexible.js
`flexible.js`是一个用于适配移动端/页面不同尺寸的js库，核心原理就是根据不同的视口宽度给网页中HTML标签设置不同的font-size
```html
<!-- 尽量在body标签之后/body标签中的最后面引入 -->
<script src="flexible.js"></script>
```
引入后就不需要自己写媒体查询进行适配了
![rem5](rem5.png){:width=300 height=300}
如图，`flexible.js`自动将font-size设为了视口宽度的1/10
如果我们想将font-size设为了视口宽度的1/n，就将`flexible.js`中这部分代码中的10改成n即可
![rem6](rem6.png){:width=150 height=150}

---

**在设计稿中使用rem**：
如果一个盒子在设计稿中尺寸是68px，总宽度是375px，则1rem=37.5px，在CSS中，这个盒子的尺寸应为68/37.5≈1.81rem
这样计算过于麻烦，可以使用vscode的的`cssrem`插件（[使用教程](https://www.cnblogs.com/ldq678/p/13424090.html)）
下载`cssrem`插件后，找到cssrem的扩展设置，修改`Cssrem: Root Font Size`为37.5，这是修改了cssrem插件基准值为37.5px（即37.5px对应1rem）
![cssrem](cssrem.png){:width=600 height=600}
这样我们在写CSS时，输入68px，就会自动出现`68px->1.8133rem`的提示
### vw和vh
vw(viewport width)和vh(viewport height)是相对视口尺寸的单位
- 1vw=1/100视口宽度（常用）
- 1vh=1/100视口高度

```html
<style>
    /* 这里以vw为例，vh使用方法相同 */
    .box {
        width: 50vw;
        height: 30vw;
        background-color: pink;
    }
</style>
<body>
    <div class="box"></div>
</body>
```
![vw和vh](vw和vh.png){:width=200 height=200}
高度412/100\*30=123.6 宽度=412/100\*50=206
vw和vh可以更容易实现盒子尺寸随页面尺寸变化的效果：
![vw和vh1](vw和vh1.png){:width=200 height=200}![vw和vh2](vw和vh2.png){:width=200 height=200}

---

**在设计稿中使用vw**：`vw单位的尺寸`=`px单位数值`/`1/100视口宽度`
**能否将vw和vh混用**：通常是不能的，因为vh是1/100视口高度，有些设备视口高度较大，如果混用可能导致盒子变形（每种设备的宽高比不同）
### 媒体查询
##### 基本使用
前面已经简单介绍过媒体查询的基本写法
```
@media (媒体特性) {
  选择器 {
    CSS属性
  }
}
```
**常用的媒体特性**：
- `width`当视口宽度为375px时
- `max-width:375px`最大宽度（当视口宽度≤375px时）
- `min-width:375px`最小宽度（当视口宽度≥375px时）

在响应式网页中，通常使用max-width和min-width判断页面尺寸
例：宽度≤768px时网页背景色是粉色，≥1200px时背景色是绿色
```css
@media (max-width:768px) {
    body {
        background-color: pink;
    }
}
@media (min-width:1200px) {
    body {
        background-color: green;
    }
}
```
**媒体查询的书写顺序**：媒体查询也是CSS样式，也遵循后面的覆盖前面的规则
例：
- 默认网页背景色是灰色
- 屏幕宽度≥768px--粉色
- 屏幕宽度≥992px--绿色
- 屏幕宽度≥1200px--蓝色

分析：因为是`≥`，所以使用`min-width`。假设现在的宽度是1300px，则应为蓝色，此时这几个媒体查询都会被触发，因此`min-width:1200px`应放在最后，用于覆盖前面的媒体查询
**规律**：
- 使用`min-width`时，应按尺寸从小到大书写
- 使用`max-width`时，应按尺寸从大到小书写

```css
body {
    background-color: gray;
}
@media (min-width:768px) {
    body {
        background-color: pink;
    }
}
@media (min-width:992px) {
    body {
        background-color: green;
    }
}
@media (min-width:1200px) {
    body {
        background-color: blue;
    }
}
```
例：网页宽度≤768px时隐藏左侧粉色盒子，该盒子固定宽度300px
![媒体查询1](媒体查询1.png){:width=300 height=300}
思路：一左一右使用flex，先给left设置宽度300px，为防止right挤压left，给它设置`flex:1`，指定它占用剩余宽度
```html
<style>
    .box {
        display: flex;
    }
    .box .left {
        width: 300px;
        height: 500px;
        background-color: pink;
    }
    .box .right {
        flex: 1;
        height: 500px;
        background-color: blue;
    }
    @media (max-width:768px) {
        .box .left {
            display: none;
        }
    }
</style>
<body>
    <div class="box">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</body>
```
##### 完整写法
```
@media 关键词 媒体类型 and (媒体特性) {
  选择器 {
    CSS属性
  }
}
```
**关键词**（逻辑操作符）：
- and与（默认值）：表示需要同时满足and前后的两个条件，才会执行对应的媒体查询语句。例如`@media screen and (max-width: 480px) and (min-width: 360px)`就表示同时满足“是屏幕设备”、“屏幕宽度大于360px”、“屏幕宽度小于480px”三个条件时执行
- only或：通常用于表示“支持媒体查询语法就使用对应媒体查询语法，不支持就忽略”的意思。例如`@media only screen and (max-width: 360px)`
- not非：通常只放在`@media`后。例如`@media not screen and (max-width: 360px)`表示屏幕宽度大于360px时执行

补充：另一种“或”的表示方法
如果想要设定条件为：当屏幕的宽度小于360px，或者屏幕的宽度大于480px时执行，可以这样写
```css
@media 
    screen and (max-width: 360px) ,  
    /* 多个或的条件使用逗号隔开，与CSS选择器类似 */
    screen and (min-width: 480px) {
        div {
            color: green;
            font-weight: bolder;
        }
    }
```
[参考文章](https://segmentfault.com/a/1190000040498705)
**媒体类型**：用于区分设备类型，如屏幕设备（手机、电脑）、打印设备等
![媒体查询2](媒体查询2.png){:width=150 height=150}
**媒体特性**：用来描述媒体类型的具体特征
![媒体查询3](媒体查询3.png){:width=150 height=150}
**通常情况下不需要完整写法**
##### 引入外部CSS
即在满足某个媒体查询条件时，引入其它的CSS文件。解用于当一个媒体查询中CSS样式过多的情况
```html
<!-- 完整写法 -->
<link rel="stylesheet" media="逻辑符 媒体类型 and (媒体特性)" href="xx.css">
<!-- 通常使用 -->
<link rel="stylesheet" media="(媒体特性)" href="xx.css">
```
例：当视口宽度≤768px，背景色为粉色；≥1200px为绿色
```html
<link rel="stylesheet" media="(max-width: 768px)" href="./pink.css">
<link rel="stylesheet" media="(min-width: 1200px)" href="./green.css">
<body>
    <div class="box"></div>
</body>
```
pink.css：
```css
body {
    background-color: pink;
}
```
green.css：
```css
body {
    background-color: green;
}
```
注意link标签中media属性取值中的小括号不能省略
### calc函数
[参考文章](https://blog.csdn.net/snowball_li/article/details/130523284)
`calc()`是一个用于计算CSS属性值的函数，可以使用数学表达式（包括加减乘除以及括号改变优先级），实现动态计算属性值的效果
注意：
- 运算符前后都需要保留一个空格，例如`width: calc(100% - 10px)`
- 可以计算任何长度值
- 使用标准的数学运算优先级规则

**例1**：
```css
div {
  width: calc(100% - 20px);
  height: calc(16px / 4);
}
```
设置div元素的宽度为父容器的宽度减20px，高度为16px/4=4px。当浏览器窗口大小发生变化时，div元素的宽度会自动重新计算，以适应新的窗口大小
**例2**：
```css
div {
  padding: calc(10px + 2%) calc(20px - 5%);
}
```
设置div元素的上下内边距为10px加父容器宽度的2%，左右内边距为20px减父容器宽度的5%
**嵌套使用**：
```css
div {
  width: calc((50% + 100px) * 20px);
}
```
**多种单位混合计算是允许的**：
```css
div {
  height: calc(100vh - 168rem - 30px);
}
```

---

CSS中其它运算函数：
<table>
    <tbody>
        <tr>
            <th>函数</th>
            <th>描述</th>
            <th>例子</th>
        </tr>
        <tr>
            <td>min()</td>
            <td>返回一组值中的最小值</td>
            <td>width: min(50%, 400px);</td>
        </tr>
        <tr>
            <td>max()</td>
            <td>返回一组值中的最大值</td>
            <td>height: max(200px, 50vh);</td>
        </tr>
        <tr>
            <td>clamp()</td>
            <td>实现在某个范围内的值的自适应响应式设计 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/clamp" target="_blank">更多信息</a></td>
            <td>font-size: clamp(16px, 2.5vw, 24px);</td>
        </tr>
    </tbody>
</table>

### CSS中使用变量
[参考文章](https://blog.csdn.net/JackieDYH/article/details/115064171)
##### 声明
CSS中的变量名前面要加**两根连词线`--`**
```css
body {
  --foo: #7F583F;
  --bar: #F7EFD2;
}
```
这段代码在body选择器内声明了`--foo`和`--bar`两个变量，它们与`color`、`font-size`等正式属性格式相同，只是没有默认含义
因此CSS中的变量又称**CSS自定义属性**，它与CSS中其它普通属性其实是一样的
**变量名大小写敏感**，`--header-color`和`--Header-Color`是两个不同变量

---

各种值都可以放入CSS变量，包括时间、颜色、自定义字符串、计算函数、字符串属性值等等
```css
:root{
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --transition-duration: .35s;
  --header-height: 68px;
  --content-padding: 10px 20px;
  --logo-border-color: rebeccapurple;
  --margin-top: calc(2vh + 20px);
  --base-line-height: 1.428571429;
  --external-link: "external link";
}
```
注意：**如果变量值带有单位，就不能写成字符串**
```css
/* 无效↓ */
.foo {
  --foo: '20px';
  font-size: var(--foo);
}
/* 有效↓ */
.foo {
  --foo: 20px;
  font-size: var(--foo);
}
```
##### 读取
**使用var函数**：`var(变量名)`
```css
a {
  color: var(--foo);
  text-decoration-color: var(--bar);
}
```
该函数还可以使用第二个参数，表示变量的默认值（如果该变量不存在，就会使用这个默认值）：`var(变量名, 默认值)`
```css
a {
  color: var(--foo, #7F583F);
}
```
第二个参数不处理内部的逗号或空格，第一个参数后的内容都视作第二个参数
```css
a {
  font-family: var(--font-stack, "Roboto", "Helvetica");
  /* 默认字体为"Roboto","Helvetica" */
  padding: var(--pad, 10px 15px 20px);
  /* 默认padding为10px 15px 20px */
}
```

---

var函数还可以用在变量的声明中：
```css
:root {
  --primary-color: red;
  --logo-text: var(--primary-color);
}
```
注意，变量值只能用作属性值，不能用作属性名
```css
.foo {
  --side: margin-top;
  /* 无效 */
  var(--side): 20px;
}
```
##### 拼接
如果变量值是一个字符串，可以与其他字符串拼接
```css
:root {
  --bar: 'hello';
  --foo: var(--bar)' world';
  /* --foo: 'hello world' */
}
```
如果变量值是数值，不能与数值单位直接拼接
```css
.foo {
  --gap: 20;
  /* 无效 */
  margin-top: var(--gap)px;
}
```
必须使用`calc()`函数，将它们连接
```css
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```
##### 作用域
同一个CSS变量可以在多个选择器内声明，读取的时，优先级最高的声明生效（与CSS的其它普通属性规律相同）
```html
<style>
  :root { --color: blue; }
  div { --color: green; }
  #alert { --color: red; }
  * { color: var(--color); }
</style>
<body>
    <p>蓝色</p>
    <div>绿色</div>
    <div id="alert">红色</div>
</body>
```
上面的例子中，三个选择器都声明了`--color`。不同元素读取这个变量的时候，会采用对自己优先级最高的变量。这三段文字都被选择器`* { color: var(--color); }`选中，使用对自己优先级最高的`--color`，颜色不同
**变量的作用域就是它所在选择器的有效范围**
```css
body {
  --foo: #7F583F;
}
.content {
  --bar: #F7EFD2;
}
```
上面的例子中，变量`--foo`的作用域是body选择器的生效范围，`--bar`的作用域是.content选择器的生效范围
因此，全局的变量通常放在根元素`:root`里面，确保任何选择器都可以读取它们
```css
:root {
  --main-color: #06c;
}
```
##### 应用--响应式布局
将对某个标签的选择器写在媒体查询外，而将变量声明在媒体查询内。当媒体查询被触发时，变量被修改，使用此变量的属性也就发生了改变
```css
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}
@media screen and (min-width: 768px) {
  body {
    --primary:  #F7EFD2;
    --secondary: #7F583F;
  }
}
a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}
```
body内的颜色是默认颜色，而媒体查询内的颜色是页面≥768px时的颜色

---

更多关于CSS变量兼容性和JS使用CSS变量的内容，详见上面的[参考文章](https://blog.csdn.net/JackieDYH/article/details/115064171)
