window.onload = function(){
	var cr = new Calendar("t");
	cr.pop();
	var cr2 = new Calendar("te");
		cr2.pop();
}
		
function selectsd(){
	var x=document.getElementById("t");
	var y=document.getElementById("startdate");
	y.value=x.value;
	
	var l=document.getElementById("te");
	var m=document.getElementById("expiredate");
	m.value=l.value;
}