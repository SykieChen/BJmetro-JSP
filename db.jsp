<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="java.sql.*"%>
<html>
<body>
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
    rs=sql.executeQuery("SELECT * FROM websites");
    out.print("<table border=2>");
    out.print("<tr>");
    out.print("<th width=100>"+"name");
    out.print("<th width=100>"+"url");
    out.print("<th width=100>"+"alexa");
    out.print("<th width=100>"+"country");
    out.print("</tr>");
    while(rs.next()){
        out.print("<tr>");
        out.print("<td>"+rs.getString(1)+"</td>");
        out.print("<td>"+rs.getString(2)+"</td>");
        out.print("<td>"+rs.getString(3)+"</td>");
        out.print("<td>"+rs.getString(4)+"</td>");
        out.print("</tr>");
    }
    out.print("</table>");
    con.close();
}
catch(SQLException e1){out.print(e1);}
%>
</body>
</html>