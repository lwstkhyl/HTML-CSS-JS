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
    - [顶级对象](#顶级对象)
    - [DOM对象和jQuery对象](#dom对象和jquery对象)
    - [入口函数](#入口函数)
- [基本使用](#基本使用)
    - [选择器](#选择器)
      - [基础选择器](#基础选择器)
      - [筛选选择器](#筛选选择器)
      - [父/子/兄弟选择器](#父子兄弟选择器)
    - [排他思想](#排他思想)
    - [链式编程](#链式编程)
    - [样式操作](#样式操作)
      - [css()](#css)
      - [设置标签的类](#设置标签的类)

<!-- /code_chunk_output -->

<!-- 打开侧边预览：f1->Markdown Preview Enhanced: open...
只有打开侧边预览时保存才自动更新目录 -->

### 基础概念
##### 顶级对象
`$`是`jQuery`的别称，在代码中它们是等价的，但一般为了方便都使用`$`。
`$`是jQuery库中顶级对象，相当于原生JS中的window，使用`$`将元素转为jQuery对象，进而使用jQuery库的方法
##### DOM对象和jQuery对象
使用原生JS获取的对象是DOM对象，用jQuery函数获取的对象是jQuery对象，本质上是用`$`把DOM对象进行封装
```
const div_dom = document.querySelector('div'); //DOM对象
const div_jquery = $('div'); //jquery对象
console.log(div_dom); //div.box
console.log(div_jquery); //ce.fn.init {0: div.box, length: 1, prevObject: ce.fn.init}
```
注意：jQuery对象只能使用jQuery库中的属性方法，DOM对象只能使用原生JS的属性方法
***
这两种对象有时需要相互转换：原生JS比jQuery更大，原生JS的一些属性方法jQuery没有
- DOM->jQuery：`$(DOM对象)`
    ```
    const div_dom = document.querySelector('div'); //DOM对象
    const div_jquery = $(div_dom); //jquery对象
    ```
- jQuery->DOM：`jQuery对象[index]`或`jQuery对象.get(index)`其中index为索引号，因为jQuery对象是一个伪数组，可以通过索引获取其中的元素
    ```
    const div_jquery = $('div'); //jquery对象
    let div_dom = div_jquery[0]; //因为只有1个div，所以index=0
    div_dom = div_jquery.get(0);
    div_dom.style.display = 'none';
    ```
##### 入口函数
如果想在HTML标签前写入JS，就需要等待页面DOM元素加载完成后执行代码，可以使用jQuery的入口函数：
- `$(function(){ /*要执行的代码*/ });`
- `$(document).ready(function(){ /*要执行的代码*/ });`

相当于原生JS中的DOMContentLoaded，但这个事件是等页面文档、外部JSCSS文件、图片等都加载完成才触发；
而jQuery提供的这种方式是等DOM结构渲染完成就可执行，不必等所有外部资源都加载，因此效率更高执行更快。
### 基本使用
##### 选择器
###### 基础选择器
`$('CSS选择器')`：其中选择器形式与`document.querySelector('CSS选择器')`相同，如
- `$('*')`选中全部元素
- `$('div')`标签选择器
- `$('.box')`类选择器
- `$('#back')`id选择器
- `$('div,p,li')`并集选择器
- `$('div.box')`交集选择器
- ...

注意：jQuery选择器默认选中全部符合条件的元素，将这些元素存入伪数组中，可以通过索引获取，类似于`document.querySelectorAll()`
***
**隐式迭代**：当使用jQuery对象进行更改标签CSS样式等操作时，jQuery库函数会自动遍历jQuery对象进行更改，不需我们写循环手动迭代，如：
```
//有4个div标签，需要改变它们的样式
$('div').css("background","pink");
```
###### 筛选选择器
| 筛选选择器 | 用法            | 描述                                                |
| ---------- | --------------- | --------------------------------------------------- |
| :first     | `$('li:first')` | 获取第一个li                                        |
| :last      | `$('li:last')`  | 获取最后一个li                                      |
| :eq(index) | `$('li:eq(2)')` | 在获取到的li中，选择索引号为2的元素（index从0开始） |
| :odd       | `$('li:odd')`   | 在获取到的li中，选择索引号为奇数的元素              |
| :even      | `$('li:even')`  | 在获取到的li中，选择索引号为偶数的元素              |

可与基础选择器联用，如`$('ul li:first')`就是选中ul标签下的第1个li。以下提到的所有选择器都是可以联用的
###### 父/子/兄弟选择器
| 父/子/兄弟选择器   | 用法                             | 描述                                                                                      |
| ------------------ | -------------------------------- | ----------------------------------------------------------------------------------------- |
| parent()           | `$("li").parent()`               | 查找父级                                                                                  |
| children(selector) | `$("ul").children("li")`         | 相当于`$("ul>li")`，选择最近**子级**的li                                                  |
| find(selector)     | `$("ul").find("li")`             | 相当于`$("ul li")`，**后代**选择器（包括所有子孙元素）                                    |
| siblings(selector) | `$(".first").siblings("li")`     | 选中所有符合selector的兄弟节点，不包括自己本身                                            |
| nextAll([expr])    | `$(".first").nextAll()`          | 查找当前元素之后所有的同辈元素                                                            |
| prevtAll([expr])   | `$(".last").prevAll()`           | 查找当前元素之前所有的同辈元素                                                            |
| hasClass(class)    | `$('div').hasClass("protected")` | 检查当前的元素是否含有某个特定的类，如果有则返回true                                      |
| eq(index)          | `$("li").eq(2)`                  | 相当于`$("li:eq(2)")`，index从0开始 ，更推荐这种方法，因为`2`写到引号外，可用变量直接替代 |

常用`parent()` `children()` `find()` `siblings()` `eq()`
##### 排他思想
例：有多个按钮，点击其中一个按钮就让它改变背景颜色，其它按钮去掉背景颜色
```
$('button').click(function () { //隐式迭代，给所有的按钮都绑定了点击事件
    $(this).css('background', "pink"); //点击的元素改变背景颜色
    $(this).siblings('button').css('background', ""); //它其它的兄弟按钮清除背景颜色
});
```
相比于原生JS的排他思想，不仅写法更简单，而且也不用额外添加初始状态有无active类的判断
***
另一个案例：鼠标经过左侧盒子中某个小li，就让右侧内容区盒子显示相对应的图片，其它图片隐藏。
分析：
1. 需得到当前li的索引号，使用jq中的`$(this).index()`方法
2. 通过eq(index)方法选择图片展示
3. jq提供了显示隐藏函数`show()`和`hide()`不需操作CSS样式

```
$("#left li").mouseover(function () { //鼠标经过左侧的小li 
    $(this).css('background', "pink"); //经过的小li改变背景颜色
    $(this).siblings('li').css('background', ""); //它其它的li清除背景颜色
    const index = $(this).index(); //获取当前小li的索引号
    $("#content div").eq(index).show(); //右侧的盒子相应索引号的图片显示出来
    $("#content div").eq(index).siblings().hide(); //让其余的图片（就是其他的兄弟）隐藏起来
});
```    
[查看案例源码](./10-tab栏切换-1/淘宝精品服饰案例.html)
##### 链式编程
jq中有一些函数（如改变元素CSS样式的`css()show()hide()`等）返回它的调用者，如`$(this).css()`返回`$(this)`，这使得我们可用在`css()`之后继续调用`$(this)`。
可以将多条以同个jq对象开头的语句合为一句，如上面例子中的：
```
$("#content div").eq(index).show();
$("#content div").eq(index).siblings().hide();
```
它们都以`$("#content div").eq(index)`这个jq对象开头，于是可以写成：
```
$("#content div").eq(index).show().siblings().hide();
```
其中`$("#content div").eq(index).show()`返回`$("#content div").eq(index)`，给`siblings().hide()`继续调用。
同理，
```
    $(this).css('background', "pink"); //经过的小li改变背景颜色
    $(this).siblings('li').css('background', ""); //它其它的li清除背景颜色
```
也可以写成：
```
$(this).css('background', "pink").siblings('li').css('background', "");
```
注意：链式编程可以减少代码量，但应在保证代码可读性的前提下进行
##### 样式操作
###### css()
`jq对象.css('属性名','属性值')`
1. 参数只写属性名时，返回属性值（以字符串形式）
    如`$('div').css('width')`返回div的宽度
2. 参数中的属性名/值以`,`分隔，其中属性名必须加引号;
属性值如果是数字可以不写引号，如果是以px为单位的像素值也可以省略引号和px，如`css('width', 100)`就是修改宽度为100px
3. 参数可以是对象（字典）的形式，`css({'属性名1':'属性值1','属性名2':'属性值2'})`属性名/值用`:`隔开，每组样式用','隔开，属性名可以不加引号，属性值规定同上。
注意：当属性名不加引号时，复合属性必须用驼峰命名法（同原生JS）`'background-color'`->`backgroundColor`。
如：`$('div').css({ width: 100, 'height': 100, backgroundColor: 'red' });`
###### 设置标签的类
相当于原生JS中的`classList`，注意类名前不要加`.`
1. 添加类：`jq对象.addClass("类名")`
2. 删除类：`jq对象.removeClass("类名")`
    ```
    $('div').click(function () { //点击后变为active状态
        $(this).addClass('active');
    });
    $('div').dblclick(function () { //双击后变为正常状态
        $(this).removeClass('active');
    });
    ```
3. 切换类：`jq对象.toggleClass("类名")`如果有就去掉该类，如果没有就加上
    ```
    $('div').click(function () { //点击后切换状态
    $(this).toggleClass('active');
    });
    ```
***
例：tab栏切换
```
$(".tab_list li").click(function () {
    $(this).addClass("current").siblings().removeClass("current"); //当前li添加current类，其余兄弟移除类
    const index = $(this).index(); //得到当前li的索引号
    $(".tab_con .item").eq(index).show().siblings().hide(); //让下部里面相应索引号的item显示，其余的item隐藏
});
```
[查看案例源码](./10-tab栏切换-2/16-tab栏切换.html)
***
jq中类操作与className的区别：
原生JS中`className="xxx"`会覆盖原有的类名，而`addClass`是追加类名，不影响原有类名
