/**
*file:iJniTool.h
* description: header file for JniTool.cpp
* author: Yue
* version: 2.0
* date: 2013/4/6
* */
#if _MSC_VER &gt; 1000
#pragma once
#endif // _MSC_VER &gt; 1000
#include "jni.h"
#include "wtypes.h"
#include &lt;string&gt;
using namespace std;
class CJniTool
{
    private:
    CJniTool(); // Construction
    public:
    virtual ~CJniTool(); // Destruction
    public:
    static string JStringToCString (JNIEnv *env, jstring str);
    static jstring NewJString(JNIEnv *env, LPCTSTR str);
};
#endif 