<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type"
			content="text/html; charset=ISO-8859-1">
		<title>about</title>
		<style>
p {
	font-size: 18px;
}

#contact input {
	float: left;
	font-size: 12px;
	padding: 4px 2px;
	border: solid 1px #aacfe4;
	width: 275px;
}

#contact select {
	float: left;
	font-size: 12px;
	padding: 4px 2px;
	border: solid 1px #aacfe4;
	width: 280px;
}

.submit {
	clear: both;
	height: 24px;
	background: #98bf21;
	text-align: center;
	vertical-align: center;
	font-size: 14px;
	font-weight: bold;
}

.submit:hover {
	background: #7A991A;
}
</style>
	</head>
	<body
		style="background: #A0EA56; overflow-y: hidden; margin: 0 auto; width: 750px; margin-top: 60px;">
		<div id="container">
			<div id="about">
				<h3>
					<center>
						<a>Introduction</a>
					</center>
				</h3>
				<p>
					In electronic subscription and pay TV systems, data can be
					organized and encrypted using symmetric key algorithms according to
					predefined time periods and user privileges and then broadcast to
					users. This requires an efficient way of managing the encryption
					keys. In this scenario, time-bound key management schemes for a
					hierarchy were proposed by Tzeng and Chien in 2002 and 2005,
					respectively. Both schemes are insecure against collusion attacks.
					In this paper, we propose a new key assignment scheme for access
					control, which is both efficient and secure. Elliptic-curve
					cryptography is deployed in this scheme. We also provide the
					analysis of the scheme with respect to security and efficiency
					issues.
				</p>
			</div>
			<div id="contact">
				<h3>
					<center>
						<a>Contact us</a>
					</center>
				</h3>
				<form NAME="T1" method="post">
					<input type="hidden" name="table" value="ETest" />
					<table border="1">
						<tbody>
							<tr>
								<td>
									The title
								</td>
								<td>
									<input type="text" id="title" name="title" value="" />
								</td>
								<td>
									Your Tel.
								</td>
								<td>
									<input type="text" id="author" name="author" value="" />
								</td>
							</tr>
							<tr>
								<td>
									Your email
								</td>
								<td>
									<input type="text" id="email" name="email" value="" />
								</td>

								<td>
									Your favorite
								</td>
								<td>
									<select name="select" id="options">
										<option name="Section" value="Section">
											Section
										</option>
										<option name="kms" value="Key Management Scheme">
											Key Management Scheme
										</option>
										<option name="feeling" value="User Interface">
											User Interface
										</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>
									Message:
								</td>
								<td colspan="3">
									<textarea wrap="off" name="message" id="text" rows="10" cols="60" style="overflow-x:hidden;overflow-y:hidden;width: 680px;"  ></textarea>
								</td>
							</tr>
						</tbody>
					</table>
					</br>
					<center>
						<button type="button" onclick="submitComment()" value="submit"
							id="submit" class="submit" />
							Submit
						</button>
					</center>
				</form>
			</div>
		</div>
	</body>
</html>