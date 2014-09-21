/**
 * Try to Link servlet
 */
function a(){
	alert("into function a");
	var enKey = "pssst...?on't tell anyone!";
	var msg = "This is a Test.";
	//msg = d(msg,enKey);
	alert("The message is:"+msg);
	var url = 'servlet/Enc';
	var params = 'method=Test';
	params += "&msg="+msg;
	params += "&enKey="+enKey;
	ajaxSubmit(url, 'post', params, showResponse, true);
	/*
	alert("Hi!");
	LinkForm.action="servlet/Enc";
	LinkForm.submit();
	*/
}

function showResponse(originalRequest) {
	var msg = originalRequest.responseText;
	alert("The message is successful back: "+msg);
	var msg2 = c(msg);
	alert("The decrypted message is: "+msg2);
}

function c(msg){
	alert("into c");
	var enKey = "pssst...?on't tell anyone!";
	var msg2=Aes.Ctr.decrypt(msg, enKey, 256);
	return msg2;
}