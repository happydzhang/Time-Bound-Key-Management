<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>

		<title>JSP for UserForm form</title>
		<script src="js/hashCode.js" type="text/javascript"></script>
		<script src="js/register.js" type="text/javascript"> </script>

		<script src="js/validate/registerValidate3.js" type="text/javascript"> </script>
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

.spacer {
	clear: both;
	height: 1px;
}

/* ----------- My Form ----------- */
.myform {
	margin: 0 auto;
	width: 460px;
	padding: 14px;
}

/* ----------- stylized ----------- */
#stylized {
	margin-top: 60px;
	border: solid 3px black;
	padding-top: 30px;
	padding-right: 25px;
	padding-bottom: 30px;
	border-radius: 15px;
	vertical-align: middle;
}

#stylized h1 {
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 8px;
}

#stylized p {
	color: #666666;
	margin-bottom: 20px;
	border-bottom: solid 1px #b7ddf2;
	padding-bottom: 10px;
}

#stylized label {
	display: block;
	font-weight: bold;
	text-align: right;
	width: 200px;
	float: left;
}

#stylized .small {
	color: #666666;
	display: block;
	font-size: 11px;
	font-weight: normal;
	text-align: right;
	width: 200px;
}

#stylized input {
	float: left;
	font-size: 12px;
	padding: 4px 2px;
	border: solid 1px #aacfe4;
	width: 200px;
	margin: 2px 0 20px 10px;
}

#stylized a {
	float: left;
	font-size: 12px;
	border: solid 1px #aacfe4;
	margin: 2px 0 20px 10px;
}

.submit {
	clear: both;
	margin-left: 180px;
	width: 96px;
	height: 24px;
	background: #98bf21;
	text-align: center;
	vertical-align: center;
	color: #FFFFFF;
	font-size: 14px;
	font-weight: bold;
}

.submit:hover {
	background: #7A991A;
}
</style>
	</head>
	<body style="background: #A0EA56">
		<div id="stylized" class="myform">
			<h1 align="center">
				Welcome to sign up to our System
			</h1>

			<form id="form" name="userform" method="POST"
				action="servlet/registeredAction" onsubmit="return checkform();">

				<label>
					Username
					<span class="small" id="usernameValidate">Add your username</span>
				</label>
				<input type="text" name="username" id="username">

				<label>
					Password
					<span class="small" id="passwordValidate">Add your password</span>
				</label>
				<input type="password" name="realpassword" id="realpassword">
				<input type="hidden" name="password" id="password">

				<label>
					Confirm Password
					<span class="small" id="ConfirmedValidate">Confirm your
						password</span>
				</label>
				<input type="password" name="confirmpassword" id="confirmpassword"
					onkeyup="confirun()">

				<label>
					Age
					<span class="small" id="ageValidate">Add your age</span>
				</label>
				<input type="text" name="age" id="age">


				<label>
					Gender
					<span class="small" id="genderValidate">Add your gender</span>
				</label>
				<input type="text" name="gender" id="gender">



				<label>
					Birth
					<span class="small" id="birthValidate">Add your birth</span>
				</label>
				<input type="text" name="birth" id="birth">



				<label>
					E-mail
					<span class="small" id="mailValidate">Add your e-mal addr.</span>
				</label>
				<input type="text" name="email" id="email">



				<label>
					Validation code
					<span class="small"> </span>
				</label>
				<input type="text" name="vercode" size="10" />
				
				<label>
					Validation Img
					<span class="small"> </span>
				</label>
				<a href="#" onclick="refresh();authimg()"><img alt=""
						src="authImg" id="authImg"> </a>


				<button id="submit" type="submit" name="submit" class="submit"
					onmouseover="calhash()">
					Sign Up
				</button>
			</form>

		</div>

	</body>
</html>
