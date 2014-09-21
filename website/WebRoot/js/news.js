
/**
 * send the chosen section to AESEnc servlet
 * receive the response by function showResponse
 */
function load(flag){
	//update the section selected
	var ID = document.getElementById("sectionID");
	ID.value = flag;
	//send to servlet
	var url = 'servlet/AESEnc';
	var params = 'method=Title';
	params += "&flag="+flag;
	ajaxSubmit(url, 'post', params, showResponse, true);
	
}

/**
 * get the response from the AESEnc servelet and display it
 */
function showResponse(originalRequest) {
	//get response
	var msg = originalRequest.responseText;
	
	//display response
	var text = document.getElementById("text");
	text.innerHTML = msg;
}

/**
 * get newsID of the chosen news, userID, and the section of hte chosen news
 * send them to AESEnc servlet
 * receive the response by function showResponse2
 */
function read(newsID){
	
	var text = document.getElementById("text");
	text.innerHTML = newsID;
	
	//get userID
	var userID = getCookie("userID");
	userID = userID.substring(7);	
	//get section the news belongs to
	var flag = document.getElementById("sectionID").value;
	
	//send to serlvet
	var url = 'servlet/AESEnc';
	var params = 'method=read';
	params += "&newsID="+newsID;
	params += "&userID="+userID;
	params += "&flag="+flag;
	ajaxSubmit(url, 'post', params, showResponse2, true);
}

/**
 * get the response from the AESEnc servelet and display it
 */
function showResponse2(originalRequest) {
	//get response
	var msg = originalRequest.responseText;

	//get areas to be updated
	var Title = document.getElementById("Title");
	var text = document.getElementById("text");
	
	/*
	 * split the response into two part
	 * the first part is the Title
	 * the second part is the encrypted content
	 */
	var spltResponse = msg.split("<br>");
	
	if(spltResponse[0]=="Success"){
		//update the Title
		Title.innerHTML = "<h2>"+spltResponse[1]+"</h2>";
		
		//decrypt the encrypted content
		var encKey = test_str_modify();
		spltResponse[2] = AESDecrypt(spltResponse[2],encKey);
		
		//update the content
		text.innerHTML = "<p>"+spltResponse[2]+"<p>";
	}else{
		Title.innerHTML = "<h2>"+spltResponse[0]+"</h2>";
		text.innerHTML = "<p>"+spltResponse[1]+"<p>";
	}
	
}

/**
 * AES Decryption function
 * it get an encrypted message and return the original message back
 * @param msg
 * @return
 */
function AESDecrypt(msg,keyjt){
	//alert("Begin Decryption");
	var enKey = keyjt;
	var msg2=Aes.Ctr.decrypt(msg, enKey, 256);
	return msg2;
}

function test_str_modify()
{
	var ID = document.getElementById("sectionID").value;
	var keyj = Math.pow(2,(ID-1));
	var Kx = getCookie("Kx");
	Kx = Kx.substring(3);
	var Ky = getCookie("Ky");
	Ky = Ky.substring(3);
	var privilegeCateloge = getCookie("privilegeCateloge");
	privilegeCateloge = privilegeCateloge.substring(18);
	//alert("Kx:"+Kx+", Ky:"+Ky+", Ki:"+privilegeCateloge+"kj:"+keyj);
	try {
		var mytestobj = new ActiveXObject("testobj.1"); 
		var i = parseInt(privilegeCateloge);
		var j = parseInt(keyj);
		var result = mytestobj.dec(i,Kx,Ky,j);
		//alert(result);
		return result;
		
	} catch (e) {
		alert("JS ERROR: " + e.message);
	}
}