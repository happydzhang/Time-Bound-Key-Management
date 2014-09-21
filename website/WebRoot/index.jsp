<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Newspapters subscription</title>

		<script type="text/javascript" language="JavaScript"
			src="js/algorithm/aes.js"></script>
		<script src="js/prevTools/prototype-1.4.0.js" type="text/javascript"></script>
		<script src="js/prevTools/public.js" type="text/javascript"></script>
		<script src="js/cookie/cookie3.js" type="text/javascript"></script>
		<script src="js/news.js" type="text/javascript"></script>
		<script src="js/userinfo.js" type="text/javascript"></script>
		<link rel="stylesheet" type="text/css" href="css/index.css">


		<script>
		
		function showframe(){
			document.getElementById("framecontainer").style.display="";
			document.getElementById("news").style.display="none";
		
		//alert(document.getElementById("div").style.display)
		}
		
		function shownews(){
			document.getElementById("framecontainer").style.display="none";
			document.getElementById("news").style.display="";
		
		//alert(document.getElementById("div").style.display)
		}		

		</script>
		

	</head>

	<body onLoad="changeLink(),load('1')">

		<div id="pagewrap"
			style="background-color: #98bf21; margin: 0 auto; width: 918px; padding: 0">

			<div id="header"
				style="background-image: url('image/headbackground.jpg'); width: 916px; height: 204px; padding: 0;">
			</div>

			<div id="menu"
				style="border-style: solid; border-width: 1px; border-color: white; width: 916px; height: 30px;">


				<div id="leftmenu" style="float: left;">
					<ul class="menu">
						<li class="menu">
							<a href="index.jsp">Read</a>
						</li>
						<li class="menu">
							<a onClick="use();shownews()" href="#home">UserInfor</a>
						</li>

						<li class="menu">
							<a onClick="showframe()" href="purchase.jsp" target="iframe">Subscribe</a>
						</li>

						<li class="menu">
							<a onClick="showframe()" href="about.jsp" target="iframe">About</a>
						</li>


					</ul>
				</div>
				<div id="rightmenu" style="float: right;">
					<ul class="menu">
						<li class="menu">
							<a onClick="showframe()" href="register.jsp" target="iframe">Register</a>
						</li>
						<li class="menu">
							<a href="login.jsp" onclick="Gotolink()" onmouseover="pre()" onmouseout="post()" id="ab1" target="iframe">Login</a>

						</li>

					</ul>

				</div>
			</div>

			<div id="news" style="width: 918px; height: 700 paddding :  0">
				<div id="sidebar"
					style="border-style: solid; border-width: 1px; border-color: white; background-color: 98bf21; height: 698px; width: 198px; float: left;">
					<br />
					<br />
					<br />



					<ul>
						<li>
							<a onclick="load('1')" href="#news">News</a>
						</li>
						<li>
							<a onclick="load('2')" href="#finance">Finance</a>
						</li>
						<li>
							<a onclick="load('3')" href="#sports">Sports</a>
						</li>
						<li>
							<a onclick="load('4')" href="#movies">Movies</a>
						</li>
					</ul>


				</div>

				<div id="content"
					style="border-style: solid; border-width: 1px; border-color: white; background-color: #EEEEEE; height: 698px; width: 716px; float: left;">


					<div id="Title"
						style="float: left; width: 716px; height: 50px; background: #A0EA56;">
					</div>
					<br>
					<div id="text"
						style="float: left; width: 716px; height: 648px; background: #A0EA56; overflow: auto;">
					</div>
				</div>

			</div>

			<div id="framecontainer"
				style="border-style: solid; border-width: 1px; border-color: white; width: 918px; height: 700 paddding :   0; display: none">

				<iframe id="iframe" name="iframe" src="" width="916" ; height="700"
					frameborder="0">

				</iframe>

			</div>



			<input type="hidden" id="sectionID" name="sectionID" value="This">

			<div id="footer"
				style="border-style: solid; border-width: 1px; border-color: white; background-color: #98bf21; clear: both; text-align: center; width: 916px;">
				Copyright@PURDUE CERIAS
			</div>

		</div>

	</body>
</html>
