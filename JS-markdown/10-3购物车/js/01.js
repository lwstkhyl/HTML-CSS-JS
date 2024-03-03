//全选按钮模块
$(".checkall").change(function () {
    $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
    if ($(this).prop("checked")) {
        $(".cart-item").addClass("check-cart-item");
    } else {
        $(".cart-item").removeClass("check-cart-item");
    }
});
$(".j-checkbox").change(function () {
    if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
        $(".checkall").prop("checked", true);
    } else {
        $(".checkall").prop("checked", false);
    }
    if ($(this).prop("checked")) {
        $(this).parents(".cart-item").addClass("check-cart-item");
    } else {
        $(this).parents(".cart-item").removeClass("check-cart-item");
    }
});
//改变数量按钮+小计模块
//思路：点击"-""+"让它的兄弟文本框值改变，因为只改变点击的那个按钮对应的文本框的值
let old_val_increment, old_val_decrement, single_price, total_price;
$(".increment").click(function () { //加号
    old_val_increment = parseInt($(this).siblings(".itxt").val()); //获取点击之前的值，注意类型转换
    $(this).siblings(".itxt").val(old_val_increment + 1); //改变值
    single_price = $(this).parents(".p-num").siblings(".p-price").html().substr(1); //获取单价，substr(1)把价格前面的￥删掉
    total_price = single_price * (old_val_increment + 1); //总价=单价*数量
    $(this).parents(".p-num").siblings(".p-sum").html(`￥${total_price.toFixed(2)}`); //保留2位小数
});
$(".decrement").click(function () { //减号--注意如果当前值是1就不能再减了
    old_val_decrement = parseInt($(this).siblings(".itxt").val());
    if (old_val_decrement <= 1) return false;
    $(this).siblings(".itxt").val(old_val_decrement - 1);
    single_price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
    total_price = single_price * (old_val_decrement - 1);
    $(this).parents(".p-num").siblings(".p-sum").html(`￥${total_price.toFixed(2)}`);
})
//数量输入框+小计模块
$(".itxt").change(function () {
    single_price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
    total_price = single_price * $(this).val();
    $(this).parents(".p-num").siblings(".p-sum").html(`￥${total_price.toFixed(2)}`);
})