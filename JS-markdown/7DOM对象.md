<a id="mulu">目录</a>
<a href="#mulu" class="back">回到目录</a>
<style>
    .back{width:40px;height:40px;display:inline-block;line-height:20px;font-size:20px;background-color:lightyellow;position: fixed;bottom:50px;right:50px;z-index:999;border:2px solid pink;opacity:0.3;transition:all 0.3s;color:green;}
    .back:hover{color:red;opacity:1}
    img{vertical-align:bottom;}
</style>

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [基础概念](#基础概念)
- [DOM](#dom)
    - [获取DOM对象](#获取dom对象)
      - [根据CSS选择器](#根据css选择器)
      - [get系列方法](#get系列方法)
    - [操作元素内容](#操作元素内容)
    - [操作元素属性](#操作元素属性)
      - [标签属性](#标签属性)
      - [样式属性](#样式属性)
      - [类属性](#类属性)
      - [表单属性](#表单属性)
      - [自定义属性](#自定义属性)
- [定时器](#定时器)
    - [创建](#创建)
    - [暂停](#暂停)
- [事件](#事件)
    - [事件监听](#事件监听)
    - [解绑事件](#解绑事件)
    - [事件对象与环境对象](#事件对象与环境对象)
    - [阻止事件的默认行为](#阻止事件的默认行为)
    - [事件流与事件冒泡](#事件流与事件冒泡)
    - [事件委托](#事件委托)

<!-- /code_chunk_output -->

<!-- 打开侧边预览：f1->Markdown Preview Enhanced: open...
只有打开侧边预览时保存才自动更新目录 -->

### 基础概念
**DOM对象**：浏览器根据HTML标签生成的js对象，包括所有的标签属性；document对象：是DOM里提供的对象，用来访问和操作页面内容，网页的所有内容都在其中
**节点**：构成HTML文档最基本单元，分为4类：
- 文档节点：整个HTML文档
- 元素节点：HTML文档中的标签
- 属性节点：元素的属性
- 文本节点：HTML标签中文本内容

注意：浏览器加载页面时，按照自上而下执行代码。如果将`<script>`标签写到`<body>`上面，在代码执行时，页面还没加载（元素没被创建），代码无法获取到元素，可能会发生错误。因此一般都将`<script>`标签写到`<body>`下面
`onload`事件：在整个页面加载完成后触发，用此事件可以将`<script>`标签写到任意位置而不报错
``` html
<script>
    window.onload = function () {
        var btn = document.getElementById("btn");
        btn.onclick = function () {
            alert("点击了按钮");
        };
    }; //将要执行的js代码写到onload里
</script>
<body>
    <button id="btn">一个按钮</button>
</body>
```
### DOM
##### 获取DOM对象
###### 根据CSS选择器
- `dom.querySelector("CSS选择器")`表示在dom元素中选择第一个符合CSS选择器的元素
- `dom.querySelectorAll("CSS选择器")`表示在dom元素中选择所有符合CSS选择器的元素

一般情况下都是在整个页面中选择，因此常使用`document.querySelector("CSS选择器")`和`document.querySelectorAll("CSS选择器")`。以下都用`document.`来指代dom对象
``` js
const box = document.querySelector('div'); //选择第一个div标签，若没有选择到则返回null
const boxs = document.querySelectorAll('div'); //选择所有的div标签，以NodeList伪数组的形式返回
```
NodeList：有长度和索引，但没有pop和push等方法，可以进行使用与数组相同的方法进行遍历操作
###### get系列方法
``` js
document.getElementById('a'); //获取第一个id为a的元素
document.getElementsByClassName('a'); //获取页面中所有类名为a的元素
document.getElementsByTagName('div'); //获取页面中所有div标签元素
```
##### 操作元素内容
- `对象.innerText属性`该属性只操作于纯文本，不会解析HTML标签
    ``` js
    console.log(box.innerText); //获取文字内容
    box.innerText = "修改box里面的内容"; //直接进行修改
    ```
- `对象.innerHTML属性`该属性会解析HTML标签
    ``` html
    <div class="box">内容</div>
    <script>
        const box = document.querySelector('.box');
        console.log(box.innerHTML); //内容
        box.innerHTML = "<strong>更改内容</strong>"; //会发现有加粗的效果
    </script>
    ```
##### 操作元素属性
###### 标签属性
指标签内自带的属性，如href、title、src等
`对象.属性 = 值`
``` js
const img = document.querySelector('img');
img.src = "new.png";
img.title = "新图片";
```
例：页面刷新时随机更换图片
``` js
const img = document.querySelector('img');
const max = 6, min = 1;
const random = Math.floor(Math.random() * (max - min + 1) + min);
img.src = `${random}.png`;
```
###### 样式属性
指在CSS中可以更改的属性
`对象.style.样式属性 = 值`
``` js
const box = document.querySelector(".box");
box.style.width = "200px"; //注意长度单位要写px
box.style.border = '5px dashed black';
```
对于属性中有“-”的情况，有两种解决方案：
- 将属性写成驼峰命名形式：`box.style.backgroundColor`
- 使用[]来根据key取value：`box.style["background-color"]`

例：设置整个页面的背景图片
``` js
document.body.style.backgroundImage = 'url(xxx.png)';
```
###### 类属性
修改某个元素的类名，适用于修改样式较多的情况
`对象.className = '类名'`
``` html
<style>
    .new_div{
        /*要修改的CSS样式*/
    }
</style>
<body>
    <div class="old_div">div</div>
</body>
<script>
    const div = document.querySelector("div"); //获取元素
    div.className = 'new_div'; //给div新的类名，并覆盖前面的类样式
</script> 
```
如果想继承之前的类名，在之前类CSS样式基础上增加新属性，就需要写成`div.className = 'old_div new_div'`形式，很不方便
通过`classList`控制类名，解决`className`属性易覆盖的问题：
``` js
const div = document.querySelector("div"); //获取元素
div.classList.add('new_div'); //增加类名，相当于div.className = 'old_div new_div'
div.classList.remove('new_div'); //删除类名
div.classList.toggle('old_div'); //切换类名，如果div已经有了old_div就将其删去，没有就把它加上
```
###### 表单属性
``` html
<body>
    <input type="text">
</body>
<script>
    const input = document.querySelector('input');
    console.log(input.value); //获取表单里面的值
    input.value = "新值"; //修改表单里面的数据
    input.type = 'password'; //修改表单属性
</script> 
```
对于表单中添加后有效果、移除后无效果的属性（如disabled checked等），用bool值表示，true表示添加、false表示移除
``` html
<body>
    <input type="checkbox">
</body>
<script>
    const input = document.querySelector('input');
    console.log(input.checked); //判断是否勾选
    input.checked = true; //改变勾选状态
</script> 
```
``` html
<body>
    <button>
</body>
<script>
    const btn = document.querySelector('button');
    console.log(btn.disabled); //按钮是否禁用--为true禁用，为false不禁用（默认）
    btn.disabled = true; //禁用按钮
</script> 
```
###### 自定义属性
标签中以`data-`开头的属性，如`<div data-id="1" data-sm="a">1</div>`
`对象.dataset.自定义属性名`
``` js
const one = document.querySelector('div');
console.log(one.dataset); //输出该标签里面所有的自定义属性（键值对形式）
console.log(one.dataset.id); //获取自定义属性data-id
one.dataset.id = "new"; //改变自定义属性data-id
```
### 定时器
##### 创建
`setInterval(函数,间隔时间)`间隔时间单位为ms，表示隔多长时间执行一次传入函数，返回一个id数字，标记页面中定时器函数序列。打开网页时不会立即执行，而是等待间隔时间后开始第一次执行
有两种传入函数的方式：
- `setInterval(函数名,间隔时间)`常用
- `setInterval('函数名()',间隔时间)`
    ``` js
    function func() {
    console.log("执行了func函数");
    }
    setInterval(func, 1000); //开启定时器
    setInterval('func()', 1000); //也可以
    ```

如果需要传参，就用函数嵌套的方式：
``` js
function func(content) {
    console.log(content);
}
let cont = "abc";
setInterval(function () {
    func(cont);
}, 1000);
```
##### 暂停
`clearInterval(timer_id)`其中timer_id为setInterval函数返回的id数字
``` js
let timer_1 = setInterval(func, 1000); //注意此处不能声明为const，因为后面开启定时器时要对timer_1重新赋值
let timer_2 = setInterval(func, 1500);
console.log(timer_1, timer_2); //1  2
clearInterval(timer_1); //关闭timer_1定时器
clearInterval(timer_2);
timer_2 = setInterval(func, 1500); //开启timer_2定时器  
console.log(timer_2); //3  注意这里不是1，timer_id不是页面中正在运行几个定时器，而是总共启动了几次定时器
```
例：倒计时结束后可点击按钮
``` html
<body>
    <!-- 开始时要把按钮禁用 -->
    <button disabled></button>
</body>
<script>
    const btn = document.querySelector('button');
    let time = 5; //初始值
    btn.innerHTML = `我已阅读用户协议(${time})`;
    let timer = setInterval(function () {
        time--;
        btn.innerHTML = `我已阅读用户协议(${time})`;
        if (time === 0) {
            btn.disabled = false;
            clearInterval(timer); //关闭定时器
            btn.innerHTML = "我已阅读用户协议";
        }
    }, 1000); //每隔1秒更新一次
</script>
```
注意if函数一定要写到定时器函数里面，因为这个判断语句也是要循环运行的。如果写在外面，就只会在最开始执行一次，此时time=5，不会停止定时器
### 事件
常用事件种类：
- 鼠标事件--`click`点击 `mouseenter`鼠标经过 `mouseleave`鼠标离开 
- 焦点事件--`focus`获得焦点 `blur`失去焦点
  鼠标移入输入框时出现光标（获得焦点），鼠标移出时光标消失（失去焦点）
    常见的应用：鼠标移入搜索框时，出现下拉栏用于快捷输入
- 键盘事件--`keydown`按下按键（按下时会一直发送keydown事件信号） `keyup`抬起按键
- 文本事件--`input`用户向表单输入信息，当文本框中内容改变时触发
- 页面事件--`scroll`页面滚动
##### 事件监听
`元素对象.addEventListener('事件类型',要执行的函数)`
三要素：
- 事件源--哪个dom元素被触发了，即上面的元素对象
- 事件类型--用什么方式触发（click等）
- 事件调用的函数--触发后要做什么

例如：
``` js
const btn = document.querySelector("button");
btn.addEventListener('click', function () {
    alert("点击了按钮");
});
btn.addEventListener('mouseover', function () {
    console.log("鼠标经过按钮");
});
```
以前的写法：`btn.onclick = function(){...}`
缺点：如果一个对象同一个事件绑定了多个`function()`，`onclick`属性因为是赋值方式传递，只能执行最后一个`function()`。而用`addEventListener`函数可以为同一对象的同一事件添加多个处理函数
更多的例子：
``` js
const input = document.querySelector('input');
input.addEventListener('focus',function(){
    console.log("获得焦点");
});
input.addEventListener('blur',function(){
    console.log("失去焦点");
});
input.addEventListener('input',function(){ //向表单中输入内容
    console.log(input.value); //内容改变时获取内容
});
```
##### 解绑事件
- 使用on系列方法的事件绑定（如`btn.onclick=...;`），只需重写onclick将之前的覆盖：`btn.onclick = null;`
- `addEventListener`方法的事件，必须使用`元素对象.removeEventListener(事件类型，与事件监听相同的事件处理函数)`的方式。
  因为必须传入同名的事件处理函数，所以使用匿名函数创建的事件监听无法解绑

``` js
function func(){
    console.log("son被点击");
}
son.addEventListener('click', func);
son.removeEventListener('click',func); //解绑事件
```
##### 事件对象与环境对象
**事件对象**：也是一个对象，存储事件触发时的相关信息（如鼠标点击的位置，按下的是哪个键等等）
调用：事件监听绑定的回调函数的第一个参数，如`input.addEventListener('input', function (event) {});`中的`event`就是事件对象
事件对象常用属性：
- `type`--当前的事件类型
- `clientX`/`clientY`--获取光标相对浏览器可见窗口左上角的位置
- `offsetX`/`offsetY`--获取光标相对当前dom元素左上角的位置
- `key`--用户按下键的值
- [更多关于光标位置的属性](https://juejin.cn/post/6883353218319908871)

例：
``` js
const input = document.querySelector('input');
input.addEventListener('input',function(){
    console.log(event.key); //获取按的是哪个键
});
```

---

**环境对象**：每个函数里面都有的`this`，谁调用该函数`this`就是谁
事件监听中传入函数的this就是事件源
##### 阻止事件的默认行为
对于超链接、表单这种网页已经设置它们行为（如提交表单、跳转链接）的标签，可以使用`e.preventDefault()`阻止这种默认行为，其中e为事件对象
例如：
``` html
<body>
    <a href="http://www.baidu.com">百度一下</a>
</body>
<script>
    const a = document.querySelector('a');
    a.addEventListener('click',function(e){
        e.preventDefault(); //阻止默认行为
    });
</script>
```
此时点击链接就不会进行跳转
##### 事件流与事件冒泡
**事件流**：事件完整执行过程中的流动路径，分为捕获和冒泡两个阶段
假设页面中有1个`<div>`：
- 冒泡（常用）：从子元素到父元素--`<div>` -> `<body>` -> `<html>` -> `Document`即当一个元素触发事件后，会依次向上调用索引父级元素的**同名**事件
- 捕获：从父元素到子元素--`Document` -> `<html>` -> `<body>` -> `<div>`

`addEventListener`可传入第三个参数（很少使用）：
- `true`表明事件在捕获阶段触发
- `false`在冒泡阶段触发（默认值）

例：
``` html
<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>
<script>
    const father = document.querySelector('.father');
    const son = document.querySelector('.son');
    document.addEventListener('click', function () { //document表示整个页面
        console.log("document被点击");
    }, true);
    father.addEventListener('click', function () {
        console.log("father被点击");
    }, true);
    son.addEventListener('click', function () {
        console.log("son被点击");
    }, true);
</script>
```
输出：`document被点击`  `father被点击`  `son被点击`
若去掉上述代码`addEventListener`中的`true`，恢复为默认状态，则输出：`son被点击`  `father被点击`  `document被点击`

---

事件冒泡易导致事件影响到父级元素，要想把事件限制在当前元素内，就要**阻止冒泡**
语法：`e.stopPropagation()`其中e为事件对象
此方法可阻断事件流动传播，不仅阻止冒泡，也阻止捕获
更改son的事件监听为：
``` js
    son.addEventListener('click', function (e) { 
        console.log("son被点击");
        e.stopPropagation(); //阻止冒泡
    });
```
此时只输出`son被点击`

---

拓展：鼠标事件中`mouseover-mouseout`与`mouseenter-mouseleave`都可表示鼠标的进入和离开，区别是`mouseover-mouseout`有冒泡的属性，而后者没有。因此`mouseenter-mouseleave`更加常用
``` html
<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <!-- CSS设置father和son的大小不同，son在father内 -->
</body>
<script>
    const father = document.querySelector('.father');
    father.addEventListener('mouseover', function () {
        console.log("鼠标经过father");
    });
    father.addEventListener('mouseout', function () {
        console.log("鼠标离开father");
    });
</script>
```
当鼠标从`<div class="father">`进入`<div class="son">`时，会输出：`鼠标经过father`  `鼠标离开father`  `鼠标经过father`
因为鼠标经过`son`时，虽然`son`没有给出`mouseover`对应的事件函数，但`son`的`mouseover`事件仍会被触发，同时因为冒泡而触发了`father`的`mouseover`事件，所以会又输出一个`鼠标经过father`
而正常情况下不想让鼠标进入son时触发“鼠标经过father”的事件。可以使用阻止冒泡，也可以使用`mouseenter-mouseleave`组替换`mouseover-mouseout`组，此时重复执行上面的操作，只会输出一次`鼠标经过father`
##### 事件委托
