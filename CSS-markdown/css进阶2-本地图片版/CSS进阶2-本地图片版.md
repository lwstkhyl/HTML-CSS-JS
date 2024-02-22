<a id="mulu">目录</a>
<a href="#mulu" class="back">回到目录</a>
<style>
    .back{width:40px;height:40px;display:inline-block;line-height:20px;font-size:20px;background-color:lightyellow;position: fixed;bottom:50px;right:50px;z-index:999;border:2px solid pink;opacity:0.3;transition:all 0.3s;color:green;}
    .back:hover{color:red;opacity:1}
    img{vertical-align:bottom;}
</style>

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [平面转换transform](#平面转换transform)
    - [平移](#平移)
    - [旋转](#旋转)
    - [改变转换原点](#改变转换原点)
    - [多重转换](#多重转换)
    - [缩放](#缩放)

<!-- /code_chunk_output -->

<!-- 打开侧边预览：f1->Markdown Preview Enhanced: open...
只有打开侧边预览时保存才自动更新目录 -->

### 平面转换transform
平面转换也称2D转换，改变盒子在平面内的形态（位移、旋转、缩放、倾斜等），一般与过渡配合使用，从而为元素添加动态效果。
约定平面内坐标轴如图：
![平面内坐标轴](平面内坐标轴.png "平面内坐标轴"){:width=150px height=150px}
即水平X轴正向为右侧，垂直Y轴正向为下侧
##### 平移
`transform:translate(X轴移动距离,Y轴移动距离)`
两个移动距离的取值：
- px单位
- 百分比（参照盒子自身尺寸）
- 可正可负

例：鼠标移入父盒子，子盒子改变位置
```
<style>
    .father {
        width: 500px;
        height: 300px;
        border: 1px solid black;
    }
    .son {
        width: 200px;
        height: 100px;
        background-color: pink;
        transition: all 0.5s;
    }
    .father:hover .son { /*父盒子hover，改变子盒子属性*/
        transform: translate(200px, 100px);
    }
</style>
<body>
    <div class="father">
        <div class="son">我是小盒子</div>
    </div>
</body>
```
效果：当鼠标进入父盒子后，子盒子移动；鼠标出父盒子，子盒子再移回原来的位置。
![平移效果1](平移效果1.png "平移效果1"){:width=100px height=100px} -> ![平移效果2](平移效果2.png "平移效果2"){:width=100px height=100px}
其中`transform: translate(200px, 100px);`表示向右移动200px，向下移动100px，设置为负就是往反方向；
`transform: translate(50%, 100%);`表示向右移动自身宽度的50%，向下移动自身高度的100%，设置为负就是往反方向；
***
`translate()`也可以只传入一个值，表示沿X轴移动的距离，取值同上；
也可以单独设置X和Y轴移动距离：`translateX()`和`translateY()`，取值同上。
***
例：双开门效果--两张图片横向放置：![双开门1](双开门1.png "双开门1"){:width=50px height=50px}
鼠标放上去时，两张图片分别向左/右移动：![双开门2](双开门2.png "双开门2"){:width=50px height=50px}
最后显示出下层图片：![双开门3](双开门3.png "双开门3"){:width=50px height=50px}
鼠标移走后图片又自动恢复原来的状态。
布局：父子结构，父级是下层的大图，子级是上层的两张小图。初始状态下子级图片会自动覆盖父级图片。
其中两张小图的资源图片是精灵图，即尺寸与大图相同，能正好覆盖两个小盒子，需要设置右子盒子的background-position，使它显示精灵图的右半部分
```
<style>
    *{
        margin: 0;
        padding: 0;
    }
    .box {
        display: flex; /*弹性布局，自动使两张小图左右排列*/
        margin: 50px auto; /*水平居中*/
        width: 1366px;
        height: 600px;
        background-image: url(./bg.jpg);
        overflow: hidden; /*超出部分隐藏，让移动后两张小图超出大图的部分消失*/
    }
    .box .left,
    .box .right{
        width: 50%; /*宽度是父级的一半*/
        height: 100%; /*高度与父级相同*/
        background-image: url(./fm.jpg);
        transition: all .5s; /*.5s相当于0.5s*/
    }
    .box .right{
        background-position: right 0; /*right表示取图片的右侧，0就是上下位置不变*/
    }
    .box:hover .left{
        transform: translate(-100%); /*往左移动一倍的自身宽度*/
    }
    .box:hover .right{
        transform: translateX(100%); /*往右移动一倍的自身宽度*/
    }
</style>
<body>
    <div class="box">
        <div class="left"></div>
        <div class="right"></div>
    </div>
</body>
```
##### 旋转
`transform:rotate(旋转角度)`
角度单位是`deg`（就是°），取值正负均可，**正--顺**时针旋转、**负--逆**时针旋转。
常与transition联用，以形成旋转的动画。
如`transform:rotate(360deg)`就是顺时针旋转一圈
##### 改变转换原点
默认情况下，所有转换的原点都是盒子中心点，如旋转是绕中心旋转。
有些时候需要改变转换原点，如时钟的秒/分/时针就是以端点为旋转中心：
`transform-origin:水平原点位置 垂直原点位置`
取值：
- 方位名词(left top right bottom center)
- px
- 百分比

常用方位名词，如`transform-origin:right bottom`表示以图片（盒子）的右下角端点旋转
***
例：时钟，已有初始状态如下
![时钟初始](时钟初始.png "时钟初始"){:width=100px height=100px}
需要将三根表针以它们的正下端旋转：
```
transform-origin: center bottom; /*改变转换原点*/
transform: rotate(360deg);
transition: all 60s; /*转一圈60s*/
```
[查看源码](./时钟.html)
##### 多重转换
即同时进行平移和旋转
注意：要先平移再旋转
`transform:translate() rotate()`
例：滚动的轮胎
![滚动的轮胎](滚动的轮胎.png "滚动的轮胎"){:width=70px height=70px}
设大盒子宽度为800px，轮胎宽度200px，则滚动距离应为600px
```
img{
    transition: all 5s;
}
.box:hover img {
    transform: translate(600px) rotate(360deg);
}
```
[查看源码](./滚动的轮胎.html)
***
为什么必须先平移再旋转：
`transform`以第一种转换形态的坐标轴为准，而旋转会改变坐标轴方向，而`translate(600px)`是以x轴为平移方向，x轴方向改变，平移方向也改变，导致图片螺旋运动。
为什么不能分开写两个`transform`属性：
旋转平移都是transform属性，后面的transform会覆盖前面的。
##### 缩放
实现图片放大效果：正常状态下--
![缩放1](缩放1.png "缩放1"){:width=150px height=150px}
当鼠标移到图片上时--
![缩放2](缩放2.png "缩放2"){:width=150px height=150px}
（鼠标移出时图片复原）
使用：`transform:scale(缩放倍数)`表示XY轴均按此倍数等比例缩放，也可单独设置：
`transform:scale(X轴缩放倍数,Y轴缩放倍数)`
取值大于1表示放大，小于1表示缩小，等于1则不变；
默认以中心点为原点进行缩放
```
.box {
    overflow: hidden; /*超出部分隐藏，保证总大小不变*/
}
.box img {
    transition: all 0.5s;
}
.box:hover img {
    transform: scale(1.1); /*放大1.1倍
}
```
[查看源码](./缩放.html)
如果使用width和height进行设置，则是图片以左上角为原点缩放，向右下方扩大，不好看
***
