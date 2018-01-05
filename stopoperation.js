function dis_dis(x1, y1, x2, y2) {
  //直线距离
  var k = Math.PI / 180;
  var c =
    Math.cos(y1 * k) * Math.cos(y2 * k) * Math.cos((x1 - x2) * k) +
    Math.sin(y1 * k) * Math.sin(y2 * k);
  var d = 6371008 * Math.acos(c);
  return d;
}
function dis(x1, y1, x2, y2) {
  //曼哈顿距离
  var d1 = dis_dis(x1, y1, x2, y1);
  var d2 = dis_dis(x2, y1, x2, y2);
  return d1 + d2;
}



function minopen(open) {          // sort open
  var minv = stopinfo[open[0]].f;
  var min = 0;
  var minn = stopinfo[open[0]].nm;
  // if(open==0) alert("xxx");
  for (var i = 0; i < open.length; i++) {
    if (stopinfo[open[i]].f < minv) {
      minv = stopinfo[open[i]].f;
      min = i;
      minn = stopinfo[open[i]].nm;
    } else continue;
  }
  open.unshift(minn);
  open.splice(min + 1, 1);
}

function nxtstp(n, i) {                       //下一站
  var next_stp_name=stopinfo[stopinfo[n].fllwstop[i]];
  // return stopinfo[stopinfo[n].fllwstop[i]];
  return next_stp_name;
}


function findpath() {
  clearcan();
  var open = [];
  var close = [];
  // alert(document.getElementById("startstop"));
  var start = document.getElementById("startstop").value;
  var aim = document.getElementById("aimstop").value;
  if(stops.indexOf(start)==-1||stops.indexOf(aim)==-1){
    alert("站名错误");
  }
  open.push(start); //起始节点放入open表
  stopinfo[start].g = 0; //初始化起点的g(x)
  stopinfo[start].h = 0; //初始化起点的h(x)
  stopinfo[start].f = 0; //初始化起点的f(x)
  while (open.length != 0) {
    //open表非空时循环
    n = open.shift(); //当前节点放入open表
    if (n == aim) {
      var result = [];
      //输出

      //document.write(stopinfo[n].nm + "<br>");
      //document.getElementById("pathresult").innerHTML=stopinfo[n].nm + "<br>";
      var xxx = stopinfo[n].nm;
      m_line(stopinfo[xxx].xx,stopinfo[xxx].yy,stopinfo[stopinfo[xxx].father].xx,stopinfo[stopinfo[xxx].father].yy);
      m_circle(stopinfo[xxx].xx,stopinfo[xxx].yy);
      result.unshift("\n"+stopinfo[n].nm);
      while (xxx != start) {

        m_line(stopinfo[xxx].xx,stopinfo[xxx].yy,stopinfo[stopinfo[xxx].father].xx,stopinfo[stopinfo[xxx].father].yy);
        xxx = stopinfo[stopinfo[xxx].father].nm;
        result.unshift("\n"+xxx+"\n↓");
        m_circle(stopinfo[xxx].xx,stopinfo[xxx].yy);
	  }
	  // document.getElementById("show").value=result.join('');
      return;
    } //找到目标节点时退出

    for (var i = 0; i < stopinfo[n].fllwstop.length; i++) {
      //循环m次（m为与此站相邻站点数）
      //下一站站名：nxtstp(n,i).nm
      if (open.indexOf(nxtstp(n, i).nm) > -1) {
        nxtstp(n, i).father = stopinfo[n].nm;
        continue;
      }
      if (close.indexOf(nxtstp(n, i).nm) > -1) continue;
      else {
        nxtstp(n, i).father = stopinfo[n].nm;
        nxtstp(n, i).g = stopinfo[n].g + nxtstp(n, i)["to" + n]; //计算g(x)
        //计算f(x)↓
        nxtstp(n, i).f =
          nxtstp(n, i).g +
          dis(nxtstp(n, i).x, nxtstp(n, i).y, stopinfo[aim].x, stopinfo[aim].y);
        open.push(nxtstp(n, i).nm); //将x插入open表中
      }
    }
    close.push(n); //将节点n插入close表中
    minopen(open); //按f(n)将open表排序
  }
}

