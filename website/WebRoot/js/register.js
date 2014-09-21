function calhash(){
		
		var x=document.getElementById("realpassword");
		var y=document.getElementById("password");
		y.value=hashCode(x.value);
		
}