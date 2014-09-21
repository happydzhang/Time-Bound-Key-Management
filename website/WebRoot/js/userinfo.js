
/**
 * send the chosen section to AESEnc servlet
 * receive the response by function showResponse
 */
function use(){
	//get userID
	var userID = getCookie("userID");
	userID = userID.substring(7);
	
	//send to servlet
	var url = 'servlet/UserInfo';
	var params = 'userID='+userID;
	ajaxSubmit(url, 'post', params, showResponse3, true);
}

/**
 * get the response from the AESEnc servelet and display it
 */
function showResponse3(originalRequest) {
	//get response
	var msg = originalRequest.responseText;
	
	//display response
	var text = document.getElementById("text");
	text.innerHTML = msg;
	
}
