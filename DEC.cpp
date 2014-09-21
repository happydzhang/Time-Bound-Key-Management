/**
*file:DEC.cpp
* description: this is the main program for decryption key generation
* author: Yue
* version: 2.0
* date: 2013/4/6
* */
#include "stdafx.h"
#include "hello.h"
#include &lt;mpirxx.h&gt;
#include &lt;comutil.h&gt;
#include "stdafx.h"
#include "atlstr.h"
#include &lt;time.h&gt;
#pragma comment( lib, "ws2_32.lib")
#include "mysql.h"
#include "HMAC_SHA1.h"
#include &lt;sstream&gt;
#include "ECC.h"
#define WIN32_LEAN_AND_MEAN
#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdlib.h&gt;
#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;CString&gt;
#include "CSHA1.h"
#include &lt;COMUTIL.H&gt;
#ifdef _UNICODE
typedef std::wstring tstring;
#define tcout std::wcout
#define tcin std::wcin
#else
typedef std::string tstring;
#define tcout std::cout
#define tcin std::cin
#endif
#include &lt;mpir.h&gt;
#include &lt;mpirxx.h&gt;
#pragma comment(lib, "comsuppw.lib")
using namespace std;
ECC_Point getRij(int i, int j)
{
    MYSQL *connect;
    MYSQL_RES *result; // SQL result container
    MYSQL_ROW sql_row;
    int res;
    connect=mysql_init(NULL);
    if(!connect)
    {
        fprintf(stderr,"MySQL Initialization Failed");
    }
    connect=mysql_real_connect(connect,"localhost","public","88888888","public",0,NULL,0); // connect to public database
    if(connect){
        printf("Connection Succeeded\n");
    }
    else{
        printf("Connection Failed!\n");
    }
    CString str;
    string ri,rj;
    stringstream s1 (stringstream::in | stringstream::out );
    stringstream s2 (stringstream::in | stringstream::out );
    s1 &lt;&lt; i;
    s1 &gt;&gt; ri;
    s2 &lt;&lt; j;
    s2 &gt;&gt; rj;
    string query = "SELECT * FROM rij_public WHERE i=";
    query = query + ri;
    query = query + " AND j=";
    query = query + rj;
    //cout&lt;&lt;query&lt;&lt;endl;
    str.Format(L"%s",query);
    res = mysql_query(connect,(char*)(LPCTSTR)str);
    if (!res)
    {
        result=mysql_store_result(connect);
        int t=mysql_num_fields(result);
        sql_row=mysql_fetch_row(result); //get query results
        mpz_class rx(sql_row[2],10);
        mpz_class ry(sql_row[3],10);
        mpz_class rx_signed(sql_row[4],10);
        mpz_class ry_signed(sql_row[5],10);
        mpz_class d_x,d_y;
        mpz_class ECC_q("E95E4A5F737059DC60DFC7AD95B3D8139515620F", 16);
        mpz_class ECC_a("340E7BE2A280EB74E2BE61BADA745D97E8F7C300", 16);
        mpz_class ECC_b("1E589A8595423412134FAA2DBDEC95C8D8675E58", 16);
        mpz_class N("1766847064778384329583316500264203817565420544786906750538164132638621787",10);
        mpz_class d("989434356275895224566656421707037232531001311016484460723896714617568665",10);
        mpz_powm(d_x.get_mpz_t(),rx_signed.get_mpz_t(),d.get_mpz_t(),N.get_mpz_t()); // check RSA signature using private key d
        mpz_powm(d_y.get_mpz_t(),ry_signed.get_mpz_t(),d.get_mpz_t(),N.get_mpz_t());
        ECC_Point R;
        R.initECC(ECC_a,ECC_b,ECC_q);
        if (d_x==rx&&d_y==ry)
        {
            R.setPoint(rx,ry);
            mysql_close(connect);
            return R;
        }
    }
}
string dec_KeyGen(int i, string kx,string ky, int j) // this fuction generates the decryption key
{
    int z =365; // system expire time
    int start =1357097471; // set Jan 1 2013 as start time
    time_t now_time; //get current time
    now_time = time(NULL);
    int t= (now_time-start)/(3600*24); //get days passed from Jan 1 2013
    int id=j;
    mpz_class ECC_q("E95E4A5F737059DC60DFC7AD95B3D8139515620F", 16);
    mpz_class ECC_a("340E7BE2A280EB74E2BE61BADA745D97E8F7C300", 16);
    mpz_class ECC_b("1E589A8595423412134FAA2DBDEC95C8D8675E58", 16);
    string a ="295E4A54737059DC60AFC7AD95B3D813B115620F";
    string b ="10D5AF16EA3F6A4E62938C4631EB5AF7BDBCDBC3";
    string Ha = Hash(a);
    string Hb = Hash(b);
    for (int i=0;i&lt;t-1;i++)
    {
        Ha = Hash(Ha);
    }
    for (int j=0;j&lt;z-t-1;j++)
    {
        Hb = Hash(Hb);
    }
    ECC_Point Ki,Kj;
    mpz_class H_a(Ha,16);
    mpz_class H_b(Hb,16);
    mpz_class k_x(kx,10);
    mpz_class k_y(ky,10);
    Ki.initECC(ECC_a,ECC_b,ECC_q);
    Kj.initECC(ECC_a,ECC_b,ECC_q);
    Ki.setPoint(k_x,k_y);
    ECC_Point R= getRij(i,j); // retrieve Rij from public database
    Ki=Ki.add(R);
    mpz_class h[16]; // stores hi in the temper proof device
    mpz_class h_0("666148799220022437413542519415090682106471284229",10);
    mpz_class h_1("888198398960029916551390025886787576141961712305",10);
    mpz_class h_2("1110247998700037395689237532358484470177452140381",10);
    mpz_class h_3("242235926989099068150379097969123884402353194265",10);
    mpz_class h_4("370082666233345798563079177452828156725817380127",10);
    mpz_class h_5("246721777488897199042052784968552104483878253418",10);
    mpz_class h_6("1016753430388455299210143845423033146373035118033",10);
    mpz_class h_7("679210540381199347951062960972249322932088368233",10);
    mpz_class h_8("706521453718205615438605702409944662840196816606",10);
    mpz_class h_9("1316245820145586502841216544386444239342907115825",10);
    mpz_class h_10("1005754069410622111389073999901215343572515468345",10);
    mpz_class h_11("249128819220496196105877690187757490869086821744",10);
    mpz_class h_12("27375978050137908386857911756784548579717997982",10);
    mpz_class h_13("670044406233005024766838089704067820598321993493",10);
    mpz_class h_14("1123705550199431788364258593356769130422027317840",10);
    mpz_class h_15("193682029729169519247990336041392004489106188366",10);
    h[0]=h_0;
    h[1]=h_1;
    h[2]=h_2;
    h[3]=h_3;
    h[4]=h_4;
    h[5]=h_5;
    h[6]=h_6;
    h[7]=h_7;
    h[8]=h_8;
    h[9]=h_9;
    h[10]=h_10;
    h[11]=h_11;
    h[12]=h_12;
    h[13]=h_13;
    h[14]=h_14;
    h[15]=h_15;
    Kj = multiply_kP(h[i],Ki); //Kj = hi(Rij+Ki)
    mpz_class temp = H_a^H_b^Kj.gety()^j;
    string str;
    stringstream ss (stringstream::in | stringstream::out );
    ss &lt;&lt; temp;
    ss &gt;&gt; str;
    string result= Hmac(str.c_str());
    return result;
}
STDMETHODIMP CDEC::dec(VARIANT a, VARIANT b, VARIANT c, VARIANT d, VARIANT* e)
// this function defines a COM interface for ActiveX Control
{
    int i =a.intVal;
    int j =d.intVal;
    BSTR kx=b.bstrVal;
    BSTR ky=c.bstrVal;
    string kx_str = "118017509953161746408305756189126301116819359142";
    string ky_str;
    kx_str= _com_util::ConvertBSTRToString(kx); // BSTR to string conversion
    ky_str =_com_util::ConvertBSTRToString(ky);
    string key =dec_KeyGen(i,kx_str,ky_str,j);
    BSTR bstrText = _com_util::ConvertStringToBSTR(key.c_str());//string to BSTR conversion
    SysFreeString(bstrText);
    VARIANT var;
    var.vt=VT_BSTR; // BSTR to Variant conversion
    var.bstrVal=bstrText;
    *e=var;
    return S_OK; //return decryption key
} 