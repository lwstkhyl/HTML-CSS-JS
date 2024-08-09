// 监控区域--tab栏切换
(function () {
    const tabs = $(".monitor .tabs"); //tab栏
    const content = $(".monitor .content");  //内容（共两个）
    //事件委托，将点击事件绑在.tabs上
    tabs.on("click", "a", function () {
        $(this).addClass("active").siblings("a").removeClass("active"); //点击后添加active类，其它a移除
        const index = $(this).index(); //点击的是第几个a
        content.eq(index).show().siblings(".content").hide(); //相应的content显示，其它content隐藏
    });
})();
// 监控区域--无缝滚动
(function () {
    const marquee = $(".marquee-view .marquee"); //要滚动的区域（共两个）
    marquee.each(function () { //使用each遍历
        const new_row = $(this).children().clone(); //复制所有的行（marquee子元素）
        $(this).append(new_row); //添加到marquee中
    });
})();