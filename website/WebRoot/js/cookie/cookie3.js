//change the content of the hyperlink
function changeLink(){
	if(chkcookies()){
		document.getElementById('ab1').innerHTML="Logout";
	}
	else{
		document.getElementById('ab1').innerHTML="Login";
	}
}

//check whether the cookie exists	
function chkcookies(){
	var NameOfCookie="userID";
	var c = document.cookie.indexOf(NameOfCookie+"="); 
	if (c != -1){
		return(true);
	}
	else{
		return (false);
	}
}

//get the cookie
function getCookie(c_name){
	if (document.cookie.length>0){	
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1){ 
			c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1)
				c_end=document.cookie.length
				 var a=unescape(document.cookie.substring(c_start,c_end))
				 return a;
		} 
	}
	return ""
}

//delete the cookie
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) 
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function pre(){
	//alert("i have moved over");
	if(chkcookies()){	
		document.getElementById('ab1').href="index.jsp";
		document.getElementById('ab1').target="_parent";
	}
	
	else{
		document.getElementById('ab1').href="login.jsp";
		document.getElementById('ab1').target="iframe";		
	}
}

//change the href attribute of the hyperlink 
function Gotolink(){
	if(chkcookies()){		
		delCookie("userID");			
	}
	
	else{						
		document.getElementById("framecontainer").style.display="";
	    document.getElementById("news").style.display="none";		
	}
}



function post(){
	//alert("i have left");
}