//表情图片所在路径 默认共135个 从0.gif - 134.gif,可自行修改
var FaceUrl = "editor/images/face/";

//信纸图片所在路径,默认10张  从 1.jpg - 10.jpg,可自行修改 
var BgUrl = "editor/images/bg/"

function $(sID) {
	return document.getElementById(sID)
}
var OnMenu = null;
var FullWin = 0, OldWinW, OldWinH, OldWinBg;
function GetMenu(Num) {
	HtmlEditor.focus();
	var R = self['HtmlEditor'].document.selection.createRange().duplicate();
	Ebody = E.document.getElementsByTagName("BODY")[0];
	var _Text = R.htmlText;
	switch (Num) {
	case 1:
		E.document.execCommand("Bold");
		break;
	case 2:
		E.document.execCommand("Italic");
		break;
	case 3:
		E.document.execCommand("Underline");
		break;
	case 6:
		var _Text = RemoveHTML(_Text);
		_Text = window.prompt('请先输入要加入发光效果的文字:', _Text);
		if (_Text != null)
			R.pasteHTML("<span class='ShowText'>" + _Text + "</span>");
		break;
	case 7:
		E.document.execCommand('CreateLink', true, 'true')
		break;
	case 8:
		if (_Text != '') {
			var _CText = RemoveHTML(_Text);
			Ebody.innerHTML = Ebody.innerHTML.replace(_Text, _CText);
		} else {
			if (confirm('没有选择清除对象,是要清除全部格式,仅保留基本文字?')) {
				Ebody.innerText = Ebody.innerText
			}
		}
		break;
	case 12:
		E.document.execCommand('Justifyleft');
		break;
	case 13:
		E.document.execCommand('Justifycenter');
		break;
	case 14:
		E.document.execCommand('Justifyright');
		break;
	case 15:
		E.document.execCommand('justifyfull');
		break;
	//调试
	case 22:
		var _Obj = parent.document.getElementById("ContentWin");
		if (FullWin == 0) {
			FullWin = 1;
			OldWinW = _Obj.style.width;
			OldWinH = _Obj.style.height;
			OldWinBg = _Obj.style.background;
			_Obj.style.position = "absolute"
			_Obj.style.background = "#ffffff";
			_Obj.style.zIndex = 9999;
			_Obj.style.width = "100%";
			_Obj.style.height = "100%";
			_Obj.style.left = "0px";
			_Obj.style.top = "0px";
			$("FullWinImg").style.background = 'url(ico.gif) -157px -143px';
		} else {
			FullWin = 0;
			_Obj.style.position = "";
			_Obj.style.width = OldWinW;
			_Obj.style.height = OldWinH;
			_Obj.style.background = OldWinBg;
			$("FullWinImg").style.background = 'url(ico.gif) -109px -143px';
		}
		$("BodyFoot").style.height = (document.documentElement.clientHeight - 71)
				+ "px";
		break;
	}
}
//插入
var ColorSNum = 0, xh_bgvalue = "";
function InfoHtml(Value, Types, Text) {
	HtmlEditor.focus();
	var R = self['HtmlEditor'].document.selection.createRange().duplicate();
	switch (Types) {
	case "img":
		R.pasteHTML("<img src='" + Value + "'>");
		break;
	case "textcolor":
		if (ColorSNum == 0) {
			E.document.execCommand('ForeColor', false, Value)
		} else {
			E.document.execCommand('BackColor', false, Value)
		}
		break;
	case "fontsize":
		$("S26_T").innerHTML = Text;
		E.document.execCommand('fontsize', false, Value);
		break;
	case "FontName":
		$("S25_T").innerHTML = Text;
		document.execCommand('FontName', false, Value)
		break;
	case "Bg":
		$("S24_T").innerHTML = Text;
		if (Value == 0) {
			xh_bgvalue = "";
			E.document.body.style.background = "";
		} else {
			xh_bgvalue = Value;
			E.document.body.style.background = "url(" + Value + ")";
		}
		break;
	}
	MenuType(0);
	return false
}

//清除HTML
function RemoveHTML(strText) {
	var regEx = /<[^>]*>/g;
	return strText.replace(regEx, "");
}

var FileName, FileAlign = null;
function InfoFile(TypeName) {
	if (TypeName == 0) {
		var Value = $("FileUrl").value;
		if (Value == "" || Value == "http://") {
			$("FileText").innerHTML = "<font color=red>请输入文件路径!</font>";
			return;
		}
		HtmlEditor.focus();
		var R = self['HtmlEditor'].document.selection.createRange();
		var _Content;
		if (FileName == "图片") {
			_Content = "<img src='" + Value + "'>";
			if (FileAlign == "center") {
				_Content = "<p align='" + FileAlign + "'><img src='" + Value
						+ "'></p>"
			} else if (FileAlign != null) {
				_Content = "<img src='" + Value + "' align='" + FileAlign
						+ "'>"
			}
		} else {
			_Content = InfoFile(2);
			if (FileAlign !== null) {
				_Content = "<p align='" + FileAlign + "'>" + _Content + "</p>"
			}
		}
		R.pasteHTML(_Content);
		$("FileView").innerHTML = "";
		MenuType(0);
		return


	}
if (TypeName==1) {
var Value=$("FileUrl").value;
if (Value==""||Value=="http://") {$("FileText").innerHTML="<font color=red>请输入文件路径!</font>";return;}
	switch (FileName){
		case "图片": $("FileView").innerHTML="<img src='"+Value+"' onerror=\"$('FileView').innerHTML='<p><br><br><font color=red>图片地址错误</font></p>'\">";break;
		case "FLASH动画": $("FileView").innerHTML=InfoFile(2);break;
		case "MP3/WMA音乐": $("FileView").innerHTML=InfoFile(2);break;
		case "WMV视频": $("FileView").innerHTML=InfoFile(2);break;
		}
	return
	}
if (TypeName==2) {
var Value=$("FileUrl").value,_ObjHtml;
	switch (FileName){
		case "FLASH动画": _ObjHtml="<object  classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0' width='195' height='205'><param name='movie' value='"+Value+"'><param name='quality' value='high'><param name='menu' value='false'><param name='wmode' value='transparent'><embed src='"+Value+"' width='195' height='205' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' menu='false' wmode='transparent'></embed></object>";break;
		case "MP3/WMA音乐": _ObjHtml=	"<OBJECT width='250' height='60' ID='showplay' classid='CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6'>"+
					"<param name='URL' value='"+Value+"'>"+
					"<param name='uiMode' value='mini'>"+
					"<param name='PlayCount' value='0'>"+
					"<param name='AutoStart' value='true'>"+
					"<param name='AudioStream' value='-1'>"+
					"<param name='AutoSize' value='-1'>"+
					"</OBJECT>";
		break;
		case "WMV视频": _ObjHtml=	"<OBJECT width='250' height='250' ID='play' classid='CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6'>"+
						"<param name='URL' value='video_url.asp?23'>"+
						"<param name='uiMode' value='"+Value+"'>"+
						"<param name='PlayCount' value='0'>"+
						"<param name='AutoStart' value='true'>"+
						"<param name='AudioStream' value='-1'>"+
						"<param name='AutoSize' value='-1'>"+
						"</OBJECT>";
		break;
		}
	if (FileAlign!=null) {InfoFile="<p align='"+FileAlign+"'>"+_ObjHtml+"</p>"}
	return _ObjHtml;
	}
FileAlign=null;
FileName=TypeName;
var InfoHtml=	"<table width='100%' border=0 cellSpacing=1 style='background:#9CD2FD' cellPadding=0><tr style='background:#EDF6FD'><td style='height:25px;width:60%;text-align:left;padding-left:5px;font-weight:bold;background:#9CD2FD;color:#ffffff;letter-spacing:2px'>插入"+TypeName+"</td>"+
		"<td width='40%' align=center rowspan=3><div id='FileView' style='width:192px;height:200px;overflow:auto;text-align:center'><br><br>"+TypeName+"<br><br>预 览 区</div></td></tr>"+
		"<tr style='background:#ffffff'><td style='height:150px;text-align:left;padding-left:15px;color:#666666' valign=top><div id='FileText'>请输入完整的URL地址,点击确定插入</div><b>URL地址:</b><br><input id='FileUrl' name='FileUrl' size='34' onblur='InfoFile(1)'><br><br><b>对齐方式</b>:<br><input type='radio' onclick='FileAlign=null' name='FA' checked>无　<input name='FA' type='radio' onclick=\"FileAlign='left'\">左对齐　<input type='radio' name='FA' onclick=\"FileAlign='center'\">居中对齐　<input name='FA' type='radio' onclick=\"FileAlign='right'\">右对齐</td></tr>"+
		"<tr style='background:#ffffff'><td style='height:30px'><input value='确定' type='button' class='button' onclick='InfoFile(0)'>　<input value='预览' type='button' class='button' onclick='InfoFile(1)'></td></tr></table>";
return InfoHtml;
}
var DivNoneH,DivNoneT,DivNoneN,OnSMenu;
function ChangeDiv(_DW,_DH) {
if(_DW!=0&&_DH!=0) {
	$("DivNone").innerHTML="<p align=left>请稍候...</p>";
	DivNoneN=0;
	$("DivNone").style.width=_DW+'px';
	$("DivNone").style.height='0px';
	var _L;
	if(OnMenu!=null){_L=$(OnMenu).L-_DW/2}else{_L=$(OnSMenu).L-_DW/2}
	if(_L<5)_L=5;
	var _SeenW=document.body.clientWidth;
	if(_DW+_L>_SeenW) _L=_SeenW-_DW-12;
	$("DivNone").style.left=_L+"px";
	DivNoneH=_DH
}
var _H=$("DivNone").clientHeight;
if (_H<DivNoneH-20){DivNoneN=DivNoneN+20}else{DivNoneN=DivNoneN+1}
if (_H<DivNoneH) {
	$("DivNone").style.height=DivNoneN+"px"
	DivNoneT=window.setTimeout("ChangeDiv(0,0)",10)
	}else{
	if(OnMenu!=null) {
		switch (OnMenu) {
			//表情
			case "S16": var FaceStr="";var ii=1;for(var i=0;i<=134;i++) {
				FaceStr=FaceStr+"<td onmouseover=\"this.style.backgroundColor='#CFE5FE'\" onmouseout=\"this.style.backgroundColor=''\"><img src='"+FaceUrl+i+".gif' onclick=\"InfoHtml(this.src,'img',0)\"></td>";
				ii++;
				if(ii==16&&i<134) {FaceStr=FaceStr+"</tr><tr style='background:#ffffff'>";ii=1}
				}
				$("DivNone").innerHTML="<table class='AllTab' style='height:100%;background:#cccccc' cellSpacing=1 cellPadding=0><tr style='background:#ffffff'>"+FaceStr+"</tr></table>";
				break;
			//图片
			case "S17":$("DivNone").innerHTML=InfoFile("图片");break;
			case "S18":$("DivNone").innerHTML=InfoFile("FLASH动画");break;
			case "S19":$("DivNone").innerHTML=InfoFile("MP3/WMA音乐");break;
			case "S20":$("DivNone").innerHTML=InfoFile("WMV视频");break;
			//大头贴
			//case "S21":	var _PhotoStr=	"开发中...";
			//	$("DivNone").innerHTML=_PhotoStr;
			//	break;
				}
		}else{
		switch (OnSMenu) {
				case "S22": ColorSNum=0;if(ColorSelect==null){ColorSelect=drawCube()}
							$("DivNone").innerHTML=ColorSelect;break;
				case "S23": ColorSNum=1;if(ColorSelect==null){ColorSelect=drawCube()}
							$("DivNone").innerHTML=ColorSelect;break;
				case "S25": var _Html=	"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='宋体'>宋体</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='黑体' style='FONT-FAMILY:黑体'>黑体</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='楷体_GB2312' style='FONT-FAMILY:楷体_GB2312'>楷体_GB2312</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='隶书' style='FONT-FAMILY:隶书'>隶书</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='幼圆' style='FONT-FAMILY:幼圆'>幼圆</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='Verdana' style='FONT-FAMILY:Verdana'>Verdana</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='Arial' style='FONT-FAMILY:Arial'>Arial</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='Impact' style='FONT-FAMILY:Impact'>Impact</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='Courier New' style='FONT-FAMILY:Impact'>Courier New</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='Times New Roman' style='FONT-FAMILY:Times New Roman'>Times New Roman</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(innerText,'FontName',innerText)\"><div class='SizeDiv' title='Georgia' style='FONT-FAMILY:Georgia'>Georgia</div></a>";
				$("DivNone").innerHTML="<div style='line-height:40%'>"+_Html+"</div>";
				break;
				case "S26": var _Html=	"<a href='#' onClick=\"return InfoHtml(1,'fontsize',innerText)\"><div class='SizeDiv' title='1.极小'>1.极小</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(2,'fontsize',innerText)\"><div class='SizeDiv' title='2.特小'>2.特小</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(3,'fontsize',innerText)\"><div class='SizeDiv' title='3.偏小'>3.偏小</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(4,'fontsize',innerText)\"><div class='SizeDiv' title='4.适中'>4.适中</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(5,'fontsize',innerText)\"><div class='SizeDiv' title='5.偏大'>5.偏大</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(6,'fontsize',innerText)\"><div class='SizeDiv' title='6.特大'>6.特大</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml(7,'fontsize',innerText)\"><div class='SizeDiv' title='7.极大'>7.极大</div></a>";
				$("DivNone").innerHTML="<div style='line-height:40%'>"+_Html+"</div>";
				break;
				//信纸
				case "S24": var _Html=	"<a href='#' onClick=\"return InfoHtml(0,'Bg','信纸')\"><div class='SizeDiv' title='移除信纸'>空白</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml('"+BgUrl+"1.jpg','Bg',innerText)\"><div class='SizeDiv' title='信纸01'>信纸01</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml('"+BgUrl+"2.jpg','Bg',innerText)\"><div class='SizeDiv' title='信纸02'>信纸02</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml('"+BgUrl+"3.jpg','Bg',innerText)\"><div class='SizeDiv' title='信纸03'>信纸03</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml('"+BgUrl+"4.jpg','Bg',innerText)\"><div class='SizeDiv' title='信纸04'>信纸04</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml('"+BgUrl+"5.jpg','Bg',innerText)\"><div class='SizeDiv' title='信纸05'>信纸05</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml('"+BgUrl+"6.jpg','Bg',innerText)\"><div class='SizeDiv' title='信纸06'>信纸06</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml('"+BgUrl+"7.jpg','Bg',innerText)\"><div class='SizeDiv' title='信纸07'>信纸07</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml('"+BgUrl+"8.jpg','Bg',innerText)\"><div class='SizeDiv' title='信纸08'>信纸08</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml('"+BgUrl+"9.jpg','Bg',innerText)\"><div class='SizeDiv' title='信纸09'>信纸09</div></a><br>"+
							"<a href='#' onClick=\"return InfoHtml('"+BgUrl+"10.jpg','Bg',innerText)\"><div class='SizeDiv' title='信纸10'>信纸10</div></a>";
				$("DivNone").innerHTML="<div style='line-height:40%'>"+_Html+"</div>";
				break;
				}
		}
	}
}

function MenuType(DivId,Num,_W,_H) {
if (DivId==0) {
	$("DivNone").innerHTML="";
	$("DivNone").style.display="none";
	if($(OnMenu)!=null) {$(OnMenu).className='M4'}
	OnMenu=null;
	OnSMenu=null;
	return;
	}
switch (Num) {
	case 0: $(DivId).className='M4on';break;
	case 1: if(OnMenu!=DivId) {$(DivId).className='M4'}
		break;
	case 2: $(DivId).className='M4down';break;
	case 3: $(DivId).className='M4on';
		if(OnMenu!=DivId) {
			if(OnMenu!=null) MenuType(0);
			OnMenu=DivId;
			$("DivNone").style.display='';
			$("DivNone").style.top="52px";
			ChangeDiv(_W,_H)
			}else{
			OnMenu=null;
			$("DivNone").style.display="none"
			}
		break;
	case 4: if(OnMenu!=null) MenuType(0);
		if(OnSMenu==DivId) {$("DivNone").style.display='none';OnSMenu=null;return}
		$("DivNone").style.display='';
		var _WT=52;
		if(DivId!="S22"&&DivId!="S23") _WT=4;
		$("DivNone").style.top=_WT+"px";
		OnSMenu=DivId;
		ChangeDiv(_W,_H)
		break;
	}
}

//改变CSS
function C(Obj,Cname) {if($(Obj)) $(Obj).className=Cname}

var xh_content;
function BlankHtml() {
var header =	"<html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"blank.css\" /></head>";
if (xh_bgvalue!=""){
	header=header+"<body style='background:url("+xh_bgvalue+")'>";
	}else{
	header=header+"<body>";
	}
var footer =	"</body></html>";
return header+xh_content+footer;

}

//色块
var s = "";
var hex = new Array(6)
hex[0] = "FF"
hex[1] = "CC"
hex[2] = "99"
hex[3] = "66"
hex[4] = "33"
hex[5] = "00"
function drawCell(red, green, blue) {
	var color = '#' + red + green + blue;
	s += '<TD BGCOLOR="' + color + '">';
	s += '<IMG src="b.gif" class="ColorGif" onmouseover=\'this.className="ColorGifOn"\' onmouseout=\'this.className="ColorGif"\' onclick=\'InfoHtml("'+color+'","textcolor")\'>';
	s += '</TD>';
}
function drawRow(red, blue) {
	s += '<TR>';
	for (var i = 0; i < 6; ++i) {
		drawCell(red, hex[i], blue)
	}
	s += '</TR>';
}
function drawTable(blue) {
	s += '<TABLE CELLPADDING=0 CELLSPACING=0 border=0>';
	for (var i = 0; i < 6; ++i) {
		drawRow(hex[i], blue)
	}
	s += '</TABLE>';
}
function drawCube() {
	s += '<TABLE border=0 CELLPADDING=0 CELLSPACING=0><TR>';
	for (var i = 0; i < 3; ++i) {
		s += '<TD BGCOLOR="#FFFFFF">';
		drawTable(hex[i])
		s += '</TD>';
	}
	s += '</TR><TR>';
	for (var i = 3; i < 6; ++i) {
		s += '<TD BGCOLOR="#FFFFFF">';
		drawTable(hex[i])
		s += '</TD>';
	}
	s += '</TR></TABLE>';
	return s;
}
//获取URL参数
function GetUrlParms() {
var args=new Object();
var query=location.search.substring(1);
var pairs=query.split("&");
for(var i=0;i<pairs.length;i++) {   
	var pos=pairs[i].indexOf('=');
	if(pos==-1) continue;
	var argname=pairs[i].substring(0,pos);
	var value=pairs[i].substring(pos+1);
	args[argname]=unescape(value);
	}
return args;
}
var args = new Object();
args = GetUrlParms();
//加载完毕事件
var ColorSelect=null,ContentId,E,Ebody,BgId,WinId;


//父窗口表单提交
function setLinkedField() {
	if (! ContentId) return ;
	var oForm = ContentId.form ;
	if (!oForm) return ;
	oForm.attachEvent("onsubmit", AttachSubmit);
	oForm.attachEvent("onreset", AttachReset);
}
// 提交
function AttachSubmit() {
	var html = E.document.getElementsByTagName("BODY")[0].innerHTML;
	if ( (html.toLowerCase() == "<br>&nbsp;") || (html.toLowerCase() == "<br>") ){
		html = "";
	}
	alert(html);
	//ContentId.value = html;
	//BgId.value = xh_bgvalue;
} 
// Reset事件
function AttachReset() {
	E.document.getElementsByTagName("BODY")[0].innerHTML = ContentId.value;
}