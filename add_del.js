function $(x){
    return document.getElementById(x);
}
function add_del_stop(){
    switch (document.getElementById("add_del_jugg").value){
        case "add_stop":
        var add_data_all=[
            $("add_del_name").value.length,
            $("add_x").value.length,
            $("add_y").value.length,
            // $("add_xx").value.length,
            // $("add_yy").value.length,
            $("add_line").value.length,
            $("add_nxt1").value.length,
            $("add_dis1").value.length,
            $("add_nxt2").value.length,
            $("add_dis2").value.length
        ]
        if(add_data_all.indexOf(0)>-1)alert("请填写所有项！");
        do_addstop();
        break;
        case "del_stop":
        do_delstop();
        break;
    }

}

function do_addstop(){
    stops.push($("add_del_name").value);
    var cge_s1=$("add_nxt1").value;
    var cge_s2=$("add_nxt2").value;
    //加站
    var to_add={};
    to_add["to"+$("add_nxt1").value]=Number(parseInt($("add_dis1").value));
    to_add["to"+$("add_nxt2").value]=Number(parseInt($("add_dis2").value));
    to_add["fllwstop"]=[$("add_nxt1").value,$("add_nxt2").value];
    to_add["x"]=Number($("add_x").value);
    to_add["y"]=Number($("add_y").value);
    to_add["trs"]=0;
    to_add["ln"]=[parseInt($("add_line").value)];
    // to_add["xx"]=$("add_xx").value;
    // to_add["yy"]=$("add_yy").value;
    to_add["xx"]=(stopinfo[cge_s1].xx+stopinfo[cge_s2].xx)/2
    to_add["yy"]=(stopinfo[cge_s1].yy+stopinfo[cge_s2].yy)/2
    to_add["nm"]=$("add_del_name").value;

    stopinfo[$("add_del_name").value]=to_add;

    //修改附近站

    to_add["xx"]=(stopinfo[cge_s1].xx+stopinfo[cge_s2].xx)/2
    to_add["yy"]=(stopinfo[cge_s1].yy+stopinfo[cge_s2].yy)/2
    stopinfo[cge_s1]["to"+ cge_s2]=Infinity;
    stopinfo[cge_s2]["to"+ cge_s1]=Infinity;
    stopinfo[cge_s1]["to"+ $("add_del_name").value]=Number($("add_dis1").value);
    stopinfo[cge_s2]["to"+ $("add_del_name").value]=Number($("add_dis2").value);
    for(var i=0;i< stopinfo[cge_s1].fllwstop.length;i++){
        if(stopinfo[cge_s1].fllwstop[i]==cge_s2){
            stopinfo[cge_s1].fllwstop[i]=$("add_del_name").value;
        }
        else continue;
    }
    for(var i=0;i< stopinfo[cge_s2].fllwstop.length;i++){
        if(stopinfo[cge_s2].fllwstop[i]==cge_s1){
            stopinfo[cge_s2].fllwstop[i]=$("add_del_name").value;
        }
        else continue;
    }
alert("添加站点"+"\""+$("add_del_name").value+"\""+"成功！")
}

function do_delstop(){
    var to_del=$("add_del_name").value;
    for(var i=0;i<stops.length;i++){
        if(stops[i]==to_del)stops.splice(i,1);
    }
    var del1=stopinfo[to_del].fllwstop[0];
    var del2=stopinfo[to_del].fllwstop[1];
    var add_dis=Number(stopinfo[del1]["to"+del2])+Number(stopinfo[del1]["to"+del2]);
    stopinfo[del1]["to"+del2]=add_dis;
    stopinfo[del2]["to"+del1]=add_dis;

    stopinfo[del1]["to"+to_del]=Infinity;
    stopinfo[del2]["to"+to_del]=Infinity;

    for(var i=0;i< stopinfo[del1].fllwstop.length;i++){
        if(stopinfo[del1].fllwstop[i]==to_del){
            stopinfo[del1].fllwstop[i]=del2;
        }
        else continue;
    }
    for(var i=0;i< stopinfo[del2].fllwstop.length;i++){
        if(stopinfo[del2].fllwstop[i]==to_del){
            stopinfo[del2].fllwstop[i]=del1;
        }
        else continue;
    }
alert('删除站'+'\"'+$("add_del_name").value+'\"'+'成功！');

}