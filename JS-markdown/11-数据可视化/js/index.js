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
// 全国用户总量统计--柱状图
(function () {
    const my_echart = echarts.init(document.querySelector(".users .bar")); //实例化echarts对象
    const item = {
        name: "", //柱子的名称
        value: 1200, //柱子的值
        itemStyle: {
            color: "#254065" //柱子的颜色
        },
        emphasis: { //鼠标移入时不高亮显示
            itemStyle: {
                color: "#254065" //设为与柱子的颜色相同即可
            }
        },
        tooltip: { //鼠标移入时不显示提示框
            extraCssText: "opacity: 0" //将提示框的opacity设为0即可
        }
    };
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
                data: [
                    "上海",
                    "广州",
                    "北京",
                    "深圳",
                    "合肥",
                    "",
                    "......",
                    "",
                    "杭州",
                    "厦门",
                    "济南",
                    "成都",
                    "重庆"
                ],
                axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                axisLabel: {
                    color: "#4c9bfd"
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(0, 240, 255, 0.3)"
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                axisLabel: {
                    color: "#4c9bfd"
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(0, 240, 255, 0.3)"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(0, 240, 255, 0.3)"
                    }
                }
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [
                    2100,
                    1900,
                    1700,
                    1560,
                    1400,
                    item,
                    item,
                    item,
                    900,
                    750,
                    600,
                    480,
                    240
                ]
            }
        ]
    }; //配置项
    my_echart.setOption(option); //指定配置项
    window.addEventListener("resize", function () { //窗口尺寸改变，刷新图表大小
        my_echart.resize();
    });
})();
// 订单模块--tab栏切换
(function () {
    const tabs = $(".order .filter"); //tab栏
    const content = $(".order .data");  //内容（共4个）
    //事件委托，将点击事件绑在.tabs上
    tabs.on("click", "a", function () {
        $(this).addClass("active").siblings("a").removeClass("active"); //点击后添加active类，其它a移除
        const index = $(this).index(); //点击的是第几个a
        content.eq(index).show().siblings(".data").hide(); //相应的content显示，其它content隐藏
    });
})();
// 销售额统计--折线图
(function () {
    const data = { //数据
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    };
    const my_echart = echarts.init(document.querySelector(".sales .line")); //实例化echarts对象
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            right: '10%',
            textStyle: {
                color: '#4c9bfd'
            },
            data: ['Email', 'Union Ads']
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true,
            borderColor: '#012f4a',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            boundaryGap: true,
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a'
                }
            }
        },
        color: ['#00f2f1', 'ed3f35'],
        series: [
            {
                name: '预期销售额',
                type: 'line',
                smooth: true,
                data: data.year[0]
            },
            {
                name: '实际销售额',
                type: 'line',
                smooth: true,
                data: data.year[1]
            }
        ]
    }; //配置项
    my_echart.setOption(option); //指定配置项
    window.addEventListener("resize", function () { //窗口尺寸改变，刷新图表大小
        my_echart.resize();
    });
})();