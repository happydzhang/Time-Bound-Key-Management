<%@ page language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>


<html>
	<head>
		<title>JSP for UserForm form</title>
		<link rel="stylesheet" type="text/css" href="css/login.css">
		<script src="js/hashCode.js" type="text/javascript"></script>
		<script src="js/register.js" type="text/javascript"> </script>


		<script>
			function refresh()  
			{  
				document.getElementById("authImg").src="authImg?now="+new Date();  
			} 
		</script>

		<style>
body {
	font-family: "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial,
		Helvetica, sans-serif;
	font-size: 12px;
	overflow-y: hidden;
}

h1,form,button {
	border: 0;
	margin: 0;
	padding: 0;
}

/* ----------- My Form ----------- */
.myform {
	margin: 0 auto;
	width: 460px;
	padding: 14px;
}

#namediv h1 {
	font-size: 15px;
	font-weight: bold;
	margin-bottom: 8px;
}

#namediv p {
	font-size: 13px;
}

#namediv label {
font-size: 13px;
	display: block;
	font-weight: bold;
	text-align: right;
	width: 200px;
	float: left;
}

#namediv input {
	float: left;
	font-size: 12px;
	padding: 4px 2px;
	border: solid 1px #aacfe4;
	width: 200px;
	margin: 2px 0 20px 10px;
}
#namediv a {
	float: left;
	font-size: 12px;
	
	border: solid 1px #aacfe4;
	
	margin: 2px 0 20px 10px;
}

#namediv button {
	clear: both;
	margin-left: 180px;
	width: 96px;
	height: 24px;
	background-color: #98bf21;
	text-align: center;
	vertical-align: center;
	color: #FFFFFF;
	font-size: 14px;
	font-weight: bold;
}
</style>
	</head>
	<body style="overflow-y: hidden; background: #A0EA56">

		<div id="namediv" class="myform">
			<h1 align="center">
				Welcome to sign up to our System
			</h1>
			<html:form action="/user">

				<label>
					Username
				</label>
				<input type="text" name="username" />



				<label>
					Password
				</label>
				<input type="password" name="realpassword" id="realpassword" />
				<input type="hidden" name="password" id="password" />



				<label>
					Validation Code
				</label>
				<input type="text" name="valcode" id="valcode" />
				
				<label>Validation Img</label>
				<a href="#" onclick="refresh();authimg()"><img alt=""
						src="authImg" id="authImg"> </a>


				<button id="submit" type="submit" name="submit"
					onmouseover="calhash()" />
					Log in
				</button>



			</html:form>
		</div>

	</body>
</html>

