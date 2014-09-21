<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Insert title here</title>
<script language='javascript' type='text/javascript'> 
var secs =3; //
var URL ; 
function Load(url){ 
URL =url; 
for(var i=secs;i>=0;i--) 
{ 
window.setTimeout('doUpdate(' + i + ')', (secs-i) * 1000); 
} 
} 
function doUpdate(num) 
{ 
document.getElementById('ShowDiv').innerHTML = 'Go to index '+num+' seconds.' ; 
if(num == 0) { window.top.location.href=URL } 
} 
</script> 
</head>
<body>
<div id="ShowDiv"></div> 
<script language="javascript"> 

parent.location.href='index.jsp';
</script> 
<p>Congratulations! You can enjoy our service now.</p>


</body>
</html>