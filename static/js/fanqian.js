//http://json.parser.online.fr/

function average_cal(){
    var cost = parseFloat($("#fanqian").val()).toFixed(1);
    var sum = 0;
    var p_show = "";
    var mark = "";
    if($("#p1").is(":checked")){
        sum += 1;
        p_show += " 大波 ";
        mark += "p1 ";
    }
    if($("#p2").is(":checked")){
        sum += 1;
        p_show += " 小榕 "
        mark += "p2 ";
    }
    if($("#p3").is(":checked")){
        sum += 1;
        p_show += " JQ "
        mark += "p3 ";
    }
    if($("#p4").is(":checked")){
        sum += 1;
        p_show += " FYZ "
        mark += "p4 ";
    }
    if (sum == 0) {
        alert ('人数为0？');
        return false;
    }
    var result = (cost / sum).toFixed(1);
    $("#show").css('display','inline');
    $("#avg_cost").html("本次人均：" + result);
    $("#avg").html(result);
    $("#pp").html("本次吃饭的人：" + p_show);
    $("#mark").html(mark);
}

function clearNoNum(obj){
    //先把非数字的都替换掉，除了数字和.
    obj.value = obj.value.replace(/[^\d.]/g,"");
    //必须保证第一个为数字而不是.
    obj.value = obj.value.replace(/^\./g,"");
    //保证只有出现一个.而没有多个.
    obj.value = obj.value.replace(/\.{2,}/g,".");
    //保证.只出现一次，而不能出现两次以上
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
}
function save() {
    var people = $("#mark").html();
    var avg = parseFloat($("#avg").html()).toFixed(1);
    request_data = {
        "people"    : people    ,
        "avg_cost"  : avg
    }
    var url = '/suanqian/save_day/'
    $.ajax({
        url:url,
        method:"POST",
        data: request_data,
        success:function(data){
            info = $.parseJSON(data);
            if (info.msg == 'ok'){
                alert('保存成功～');
            }else{
                alert('惨挂！');
                alert(info.msg);
            }
        }
    }).fail(function(){ 
        alert("服务器错误");
    });
    return false;     

}
