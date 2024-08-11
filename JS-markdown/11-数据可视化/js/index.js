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
// 点位分布统计--南丁格尔玫瑰图
(function () {
    const my_echart = echarts.init(document.querySelector(".point .pie")); //实例化echarts对象
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        series: [
            {
                name: '点位统计',
                type: 'pie',
                radius: ['10%', '80%'],
                center: ['50%', '50%'],
                roseType: 'radius',
                data: [
                    { value: 20, name: "云南" },
                    { value: 26, name: "北京" },
                    { value: 24, name: "山东" },
                    { value: 25, name: "河北" },
                    { value: 20, name: "江苏" },
                    { value: 25, name: "浙江" },
                    { value: 30, name: "四川" },
                    { value: 42, name: "湖北" }
                ],
                label: {
                    fontSize: 10,
                },
                labelLine: {
                    length: 6,
                    length2: 8
                }
            }
        ]
    }; //配置项
    my_echart.setOption(option); //指定配置项
    window.addEventListener("resize", function () { //窗口尺寸改变，刷新图表大小
        my_echart.resize();
    });
})();
//全国用户总量统计--柱状图
(function () {
    const my_echart = echarts.init(document.querySelector(".users .bar")); //实例化echarts对象
    let option = {
        color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1, //从(x1,y1)->(x2,y2)进行渐变
            [
                { offset: 0, color: '#00fffb' }, //起始颜色
                { offset: 1, color: '#0061ce' } //结束颜色
            ]
        ),
        tooltip: {
            trigger: 'item',
        },
        grid: {
            left: '0%',
            right: '3%',
            bottom: '3%',
            top: '3%',
            containLabel: true, //要显示刻度，不能溢出
            show: true, //显示坐标系矩阵边框
            borderColor: 'rgba(0, 240, 255, 0.3)' //设置边框颜色
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    }; //配置项
    my_echart.setOption(option); //指定配置项
    window.addEventListener("resize", function () { //窗口尺寸改变，刷新图表大小
        my_echart.resize();
    });
})();
