<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="java.sql.*"%>
<%
Connection con;
Statement sql;
ResultSet rs;
try{Class.forName("com.mysql.jdbc.Driver").newInstance();}
catch(Exception e){out.print(e);}
try{
    String uri="jdbc:mysql://jp1.coder17.com:3306/metro";
    con=DriverManager.getConnection(uri,"bwuser","sykiechen1994");
    sql=con.createStatement();
    rs=sql.executeQuery("SELECT context FROM stations");
    out.print("<script> stopinfo = {");
    while(rs.next()){
        out.print(rs.getString(1)+",");
    }
    out.print("} </script>");
    con.close();
}
catch(SQLException e1){out.print(e1);}
%>

<html>
<head>
<meta charset="utf-8">
<title>Metro Beijing</title>
<link rel="stylesheet" href="//cdn.bootcss.com/weui/0.4.0/style/weui.min.css"/>
<link href="jquery-ui.css" rel="stylesheet">

<style>  
body::after{
    background: url(bgpic.jpg)no-repeat;
    top:46;
    left: -10;
    right: 0;
    bottom:0;
    width:1200px;
    height:735px;
    position:absolute;
    content:"";
    background-size: contain;
    z-index:-1;
    overflow: hidden;
}</style>
</head>



<body style="padding:0;margin:0">
    <table>
    <tr>
        <td>起点：</td>
        <td>
        <input type="text" value="太阳宫" id="startstop"/>
        </td>
        <td>终点：</div></td>
        <td><input type="text" value="宣武门" id="aimstop"/></td>
        <td><button class="weui_btn weui_btn_primary" onclick="findpath()" type="button">确定</button></td>
        <td><button class="weui_btn weui_btn" onclick="window.location.reload(true);"  type="button">重置</button></td>
    </tr>
    </table>

    <p style="text-indent:0;"><canvas id="can" width="1300" height="800" style="margin-left:-170;"></canvas></p>


<div id="accordion">
<h3>站点更改 </h3>
<table>
<tr>
    <td>加减站：</td>
        <td><select name="ways" style='margin-left:30px;width:100px;height:30px' id='add_del_jugg'>
            <option value="add_stop" selected="selected">加站</option>
            <option value="del_stop">删站</option>
        </select></td>
    <td>站名：</td>
    <td><input style='margin-left:30px' value='首经贸' id='add_del_name'/></td>
    </tr>
    <tr>
    <td>x坐标：</td>
    <td><input style='margin-left:30px' value='116.3202059269' id='add_x'/></td>
    <td>y坐标：</td>
    <td><input style='margin-left:30px' value='39.8444483875' id='add_y'/></td>
    <td>所在线路：</td>
    <td><input style='margin-left:30px' value='10' id='add_line'/></td>
    </tr>
    <tr>
    <td>相邻站1：</td>
    <td><input style='margin-left:30px' value='丰台站' id='add_nxt1'/>   </td>
    <td>距离1：</td>
    <td><input style='margin-left:30px' value='1717' id='add_dis1'/></td>
    <td>相邻站2：</td>
    <td><input style='margin-left:30px' value='纪家庙' id='add_nxt2'/>   </td>
    <td>距离2：</td>
    <td><input style='margin-left:30px' value='1143' id='add_dis2'/></td>
    </tr>
    <tr>
    <td><button onclick="add_del_stop()" type="button" style='margin-left:300px'>确定</button></td>
    </tr>
</table>
</div>
<script src="//cdn.bootcss.com/jquery/3.1.0/jquery.js"></script>
<script src="stops.js"></script>
<script src="add_del.js"></script>
<script src="stopoperation.js"></script>
<script src="draw.js"></script>
<script src="accordion.js"></script>

<script src="jquery-ui.js"></script>
<script>
$(function() {
    $( "#accordion" ).accordion({
      collapsible: true
    });
  });
</script>
</body>
</html>