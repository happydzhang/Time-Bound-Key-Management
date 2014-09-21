 
Pretty Printer for PHP, Java, C++, C, Perl, JavaScript, CSS 
This is a source code beautifier (source code formatter), similiar to indent. Please make a backup before you replace your code! 

 
Paste your source here:
 


 Add new lines after "{" and before "}" 
 Add new lines before "{" 
 Remove empty lines. 
 Add comment lines before function. 
 Add new lines after ";" 
 Add new lines after "}" (For .css) (Thanks David) 
 Remove new lines (useful only if you add them again with the other functions above) 
 Add new lines after ";" but not in for loops (Don't check "Remove new lines" but do check "Remove empty lines")(Thanks Chris) (Experimental, uses a heuristic that might fail ) 
 Add new lines after ";" but not in for loops and skip quotes (Don't check "Remove new lines" but do check "Remove empty lines") (Thanks Chris) (Experimental, uses a heuristic that might fail ) 
Reduce whitespace 
Put the code again in the input box above after submit. 
Skip HTML, give me plain code! (Use Save-As function of your browser)     

 
--------------------------------------------------------------------------------

 /**
*file:JniTool.cpp
* description: this file implements two JNI utility for conversion between jstring and * cstring
* author: Yue
* version: 2.0
* date: 2013/4/6
* */
#include "stdafx.h"
#include "JniTool.h"
CJniTool::CJniTool()// Construction
{
}
CJniTool::~CJniTool()// Destruction
{
}
string CJniTool::JStringToCString (JNIEnv *env, jstring str)
// this function converts jstring to c string
{
    if(str==NULL)
    {
        return "";
    }
    int len = env-&gt;GetStringLength(str);
    jchar *w_buffer = new jchar[len+1];
    char *c_buffer = new char[2*len+1];
    ZeroMemory(w_buffer,(len+1)*sizeof(wchar_t));
    const jchar * jcharString = env-&gt;GetStringChars(str, 0);
    wcscpy((wchar_t*)w_buffer,(wchar_t*)jcharString);
    env-&gt;ReleaseStringChars(str,jcharString);
    ZeroMemory(c_buffer,(2*len+1)*sizeof(char));
    len = WideCharToMultiByte(CP_ACP,0,(wchar_t*)w_buffer,len,c_buffer,2*len,NULL,NULL);
    string cstr = c_buffer;
    delete[] w_buffer;
    delete[] c_buffer;
    return cstr;
}
jstring CJniTool::NewJString(JNIEnv *env, LPCTSTR str)
//this function converts c stirng to a jstring
{
    if(!env || !str)
    {
        return 0;
    }
    int slen = strlen((const char*)str);
    jchar* buffer = new jchar[slen];
    int len = MultiByteToWideChar(CP_ACP,0,(const char*)str,strlen((const char*)str),(wchar_t*)buffer,slen);
    if(len&gt;0 && len &lt; slen)
    {
        buffer[len]=0;
    }
    jstring js = env-&gt;NewString(buffer,len);
    delete [] buffer;
    return js;
}  
 