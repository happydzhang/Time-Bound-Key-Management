<%@ page language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>

<html>
	<head>
		<title>JSP for PurchaseForm form</title>
		<script type="text/javascript" src="js/calendar.js"></script>
		<link rel="stylesheet" type="text/css" href="css/calendar.css"></link>
		<script type="text/javascript" src="js/purchase.js"></script>
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
	font-size: 11px;
	color: #666666;
	margin-bottom: 20px;
	border-bottom: solid 1px #b7ddf2;
	padding-bottom: 10px;
}

#stylized label {
	display: block;
	font-weight: bold;
	text-align: right;
	width: 140px;
	float: left;
}

#stylized input {
	float: left;
	font-size: 12px;
	padding: 4px 2px;
	border: solid 1px #aacfe4;
	width: 200px;
	margin: 2px 0 20px 10px;
}

#stylized select {
	float: left;
	font-size: 12px;
	padding: 4px 2px;
	border: solid 1px #aacfe4;
	width: 200px;
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
			<html:form action="/purchase">
				<h1 align="center">
					Welcome to subscribe newspapers
				</h1>
				<label>
					section
				</label>

				<html:select property="section">
					<html:option value="1">NEWS</html:option>
					<html:option value="2">FINANCE</html:option>
					<html:option value="3">SPORTS</html:option>
					<html:option value="4">MOVIES</html:option>
				</html:select>



				<label>
					startdate
				</label>
				<input type="hidden" name="startdate" id="startdate">

				<div id="cs" style="">
					<input id="t">
				</div>


				<label>
					expiredate
				</label>
				<input type="hidden" name="expiredate" id="expiredate">

				<div id="ce" style="">
					<input id="te">
				</div>




				<button id="submit" type="submit" name="submit" class="submit"
					onmouseover="selectsd()">
					Sign Up
				</button>
			</html:form>
		</div>

		<%
			String errMsg = (String) session.getAttribute("errMsg");
		%>
		<div class="myform"><h3>Subscription information:</h3><p><%=errMsg%></p></div>

		<%
			session.invalidate();
		%>
	</body>
</html>

