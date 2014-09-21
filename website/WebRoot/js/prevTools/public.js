/**
 * Ajax Submit
 * @param {Object} mymethod		get or post
 * @param {Object} myparams		key=value
 * @param {Object} mycomplete	functionName
 * @param {Object} flag			true:asyn,false:unAsyn
 */
function ajaxSubmit(myurl, mymethod, myparams, mycomplete, flag) {
	var myAjax = new Ajax.Request(myurl, {
		method : mymethod,
		parameters : myparams,
		onComplete : mycomplete,
		asynchronous : flag
	});
}