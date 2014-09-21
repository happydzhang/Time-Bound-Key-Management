		//change the content of the hyperlink
		function changeLink(){
			if(chkcookies()){
				document.getElementById('ab1').innerHTML="Logout"
				//document.getElementById('ab1').href="logout.jsp"
			}
			else{
				document.getElementById('ab1').innerHTML="Login"
				//document.getElementById('ab1').href="login.jsp"
				}
			}
		//check whether the cookie exists	
		function chkcookies(){
  			var NameOfCookie="userID";
  			var c = document.cookie.indexOf(NameOfCookie+"="); 
  			if (c != -1){
    			//alert(document.cookie);
    			return(true);
  			}
  			else{
    			//alert("false");
    
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

		//change the href attribute of the hyperlink 
		function Gotolink(){
			if(chkcookies()){
				alert("You have logged out!");
				//document.getElementById("demo").innerHTML=x;
				delCookie("userID");
				document.getElementById('ab1').href="index.jsp";
			}
			
			else{
				document.getElementById('ab1').href="login.jsp";
				document.getElementById('ab1').target="iframe";				
				document.getElementById("framecontainer").style.display="";
			    document.getElementById("news").style.display="none";

				
			}
		}