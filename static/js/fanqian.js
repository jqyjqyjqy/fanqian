//http://json.parser.online.fr/
$(function(){
    if($("#p5").is(":checked")){
        $("#cf").css('display','inline');
    }
    $("#p5").click(function(){
        if($("#p5").is(":checked")){
            $("#cf").css('display','inline');
        }else{
            $("#cf").css('display','none');
        }
    });
    $('#container').highcharts({
        chart: {
            backgroundColor : "#aef6ef",
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '饭钱统计demo'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} RMB'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '饭钱',
            data: [
            ['小榕', 20.0],
            ['大波', 15.8],
            {
                name: 'FYZ',
                y: 32.8,
                sliced: true,
                selected: true
            },
            ['JQ', 32.8],
            ['蹭饭者', 20.7]
            ]
        }]
    });
});

function average_cal(){
    if ($("#fanqian").val() == "") {
        alert("请输入饭钱，好么？");
        return false;
    }
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
    if($("#p5").is(":checked")){
        if ($("#cf_num") == "") {
            var cf_num = 1;
        }else{
            var cf_num = parseInt($("#cf_num").val());
        }
        sum += cf_num;
        p_show += " 蹭饭者";
        mark += "p5";
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
    if ($("#cf_num").val() == ""){
        var other = 1;
    }else{
        var other = parseInt($("#cf_num").val());
    }
    request_data = {
        "people"    : people,
        "other_sum" : other ,
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
