function confirun(){
	var x=document.getElementById("confirmpassword");
	var y=document.getElementById("realpassword");	
	if (x.value==y.value){
		document.getElementById("ConfirmedValidate").innerHTML="";
	}
	else{
		document.getElementById("ConfirmedValidate").innerHTML="Password is not consistent";
	}
}

function checkform(){

	var validation= true;
	
	//validate username
	if ( userform.username.value=="" ){
		//alert("You must enter a username");
		//document.getElementById("password").focus();
		document.getElementById("usernameValidate").innerHTML="Not a valid username";
		validation= false;  				
	}
	else{
		document.getElementById("usernameValidate").innerHTML="";

	}
	
	//validate password
	if ( userform.realpassword.value=="" ){
		//alert("You must enter a username");
		//document.getElementById("password").focus();
		document.getElementById("passwordValidate").innerHTML="Not a valid username";
		validation= false;
	
	}
	else{
		document.getElementById("passwordValidate").innerHTML="";
	}
	
	
	//validate confirmed password
	if ( userform.confirmpassword.value=="" ){
		//alert("You must enter a username");
		//document.getElementById("password").focus();
		document.getElementById("ConfirmedValidate").innerHTML="Not a valid username";
		validation= false;
	
	}
	else{
		document.getElementById("ConfirmedValidate").innerHTML="";
	}
	
	//validate age
	if ( userform.age.value=="" ){
		//alert("You must enter a username");
		//document.getElementById("password").focus();
		document.getElementById("ageValidate").innerHTML="Not a valid age";
		validation= false;  				
	}
	else{
		document.getElementById("ageValidate").innerHTML="";
	}
	
	
	//validate gender
	if ( userform.gender.value=="" ){
		//alert("You must enter a username");
		//document.getElementById("password").focus();
		document.getElementById("genderValidate").innerHTML="Not a valid gender";
		validation= false;  				
	}
	else{
		document.getElementById("genderValidate").innerHTML="";
	}

	//validate birth
	if ( userform.birth.value=="" ){
		//alert("You must enter a username");
		//document.getElementById("password").focus();
		document.getElementById("birthValidate").innerHTML="Not a valid birth";
		validation= false;  				
	}
	else{
		document.getElementById("birthValidate").innerHTML="";
	}
	
	
	//validate email address
	var x=document.getElementById("email").value;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	if ( atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length ){
		//alert("Not a valid e-mail address");
		// document.getElementById("password").focus();
		document.getElementById("mailValidate").innerHTML="Not a valid e-mail";
		validation= false;
	}
	else{
		document.getElementById("mailValidate").innerHTML="";
	}

	return validation;
}