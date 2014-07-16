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
    var url = '/suanqian/save_day'
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

function add_day(){
    var mon=document.getElementById('month').value;
    var obj=document.getElementById("day");
    obj.length=0;
    var cnt;
    obj.options.add(new Option("",""));
    if (mon=='')
        cnt=0;
    else if (mon=='2')
        cnt=28;
    else if (mon=='1' || mon=='3' || mon=='5' || mon=='7' || mon=='8' || mon=='10' || mon=='12')
        cnt=31;
    else cnt=30;
    for (var i=1;i<=cnt;i++)
        obj.options.add(new Option(i,i));
}

function get_data() {
    var month = $("#month").val();
    var day = $("#day").val();
    request_data = {
        "year"  : '2014',
        "month" : month ,
        "day"   : day
    }
    var url = '/suanqian/show_data';

    $.ajax({
        url:url,
        method:"POST",
        data: request_data,
        success:function(data){
            info = $.parseJSON(data);
            if (info.msg == 'success'){
                var c1 = 0;
                var c2 = 0;
                var c3 = 0;
                var c4 = 0;
                var c5 = 0;
                $(info.tot).each(function(index,now){
                    if (now.name == '小榕'){
                        c1 += now.cost;
                    }
                    if (now.name == '大波'){
                        c2 += now.cost;
                    }
                    if (now.name == 'JQ'){
                        c3 += now.cost;
                    }
                    if (now.name == 'FYZ'){
                        c4 += now.cost;
                    }
                    if (now.name == '蹭饭者'){
                        c5 += now.cost;
                    }
                });
                show_pie(c1, c2, c3, c4, c5);
            }else{
                alert('惨挂！');
            }
        }
    }).fail(function(){ 
        alert("服务器错误");
    });
    return false;     
}

function show_pie(c1, c2, c3, c4, c5) {
    var title = "2014年";
    var month = $("#month").val()
    var day = $("#day").val()
    if (month != "") {
        title = title + month + '月';
    }
    if (day != "") {
        title = title + day + '日';
    }
    title = title + '饭钱统计'
    $('#container').highcharts({
        chart: {
            backgroundColor : "#aef6ef",
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.y:.1f} RMB'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '饭钱',
            data: [
            ['小榕', c1],
            ['大波', c2],
            {
                name: 'FYZ',
                y: c4,
                sliced: true,
                selected: true
            },
            ['JQ', c3],
            ['蹭饭者', c5]
            ]
        }]
    });
}
