/**
*file:ENC_Main.cpp
* description: this is the main program for encryption key generation
* author: Yue
* version: 2.0
* date: 2013/4/6
* */
#include "stdafx.h"
#include "atlstr.h"
#include <time.h>
#include "jni_md.h"
#include "JniTool.h"
#include "HMAC_SHA1.h"
#include <sstream>
#include "test_testjni.h"
#include "ECC.h"
#define WIN32_LEAN_AND_MEAN
#define _CRT_SECURE_NO_WARNINGS
#ifdef WIN32
#include <windows.h>
#endif
#include <stdlib.h>
#include <iostream>
#include <string>
#include <CString>
#include "CSHA1.h"
#ifdef _UNICODE
typedef std::wstring tstring;
#define tcout std::wcout
#define tcin std::wcin
#else
typedef std::string tstring;
#define tcout std::cout
#define tcin std::cin
#endif
#include <mpir.h>
#include <mpirxx.h>
using namespace std;

string Hash(string message) // SHA1 Hash Function, this function takes arbitrary input and output 160 bit digest
{
	tstring str= StringToWString(message);
	CSHA1 sha1;
	tstring strReport;
	const size_t uAnsiLen = wcstombs(NULL, str.c_str(), 0) + 1; //tstring to ANSI
	char* pszAnsi = new char[uAnsiLen + 1];
	wcstombs(pszAnsi, str.c_str(), uAnsiLen);
	sha1.Update((UINT_8*)&pszAnsi[0], strlen(&pszAnsi[0]));
	sha1.Final();
	sha1.ReportHashStl(strReport, CSHA1::REPORT_HEX_SHORT);
	delete[] pszAnsi;
	sha1.Reset();
	return WStringToString(strReport);
}
string Hmac(const char* message, BYTE* k)
{
	string output ="";
	BYTE Key[20] ; // input key for HMAC
	BYTE digest[20] ; // output 20 byte digest
	unsigned char *test = (unsigned char*) message ;
	for (int i=0;i<20; i++)
	Key[i] = k[i];
	CHMAC_SHA1 HMAC_SHA1;
	HMAC_SHA1.HMAC_SHA1(test, strlen( (char*) test), Key, sizeof(Key), digest);
	char lookup[] = "0123456789abcdef"; // BYTE* to string conversion
	string s = "";
	for( int i = 0; i < 20; i++ )
	{
		if (digest[i]<0x10)
			tcout<<"0"<<hex<<digest[i];
		else
			tcout<<hex<<digest[i];
	s += lookup[ digest[ i ] >> 4 ];
	s += lookup[ digest[ i ] & 0x0f ];
}
	cout<<endl;
	mpz_class out(s,16); // hex string to decimal mpz_class conversion
	string str;
	stringstream ss (stringstream::in | stringstream::out ); // mpz_class to string
	ss << out;
	ss >> str;
	return str;
}

JNIEXPORT jstring JNICALL Java_test_testjni_getkey(JNIEnv * env, jobject obj,jint t,jstring key,jint id)
// this function defines a JNI interface
// this function calculates the encryption key
// input: t, kiy, id of Kj
{
	string ky = CJniTool::JStringToCString(env, key) ;
	int z =365; // system expire time
	string a ="295E4A54737059DC60AFC7AD95B3D813B115620F";
	string b ="10D5AF16EA3F6A4E62938C4631EB5AF7BDBCDBC3";
	string Ha = Hash(a);
	string Hb = Hash(b);
	for (int i=0;i<t-1;i++)
	{
		Ha = Hash(Ha); // H^t(a)
	}
	for (int j=0;j<z-t-1;j++)
	{
		Hb = Hash(Hb); // H^z-t(b)
	}
	mpz_class H_a(Ha,16);
	mpz_class H_b(Hb,16);
	mpz_class k_y(ky,10);
	mpz_class temp = H_a^H_b^k_y^id; // bit-wise XOR
	string str;
	stringstream ss (stringstream::in | stringstream::out );
	ss << temp;
	ss >> str;
	string out= Hmac(str.c_str());
	return CJniTool::NewJString(env, (const TCHAR*)out.c_str());// return type jstring
}

int main()
{
	system("pause");
}