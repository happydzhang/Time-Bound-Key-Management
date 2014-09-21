/**
*file:int_Main.cpp
* description: this is the main program for key system initialization
* author: Yue
* version: 2.0
* date: 2013/4/6
* */
#include "stdafx.h"
#include "atlstr.h"
#include &lt;time.h&gt;
#include "mysql.h"
#include "HMAC_SHA1.h"
#include &lt;sys/timeb.h&gt;
#include &lt;sstream&gt;
#include "ECC.h"
#define WIN32_LEAN_AND_MEAN
#define _CRT_SECURE_NO_WARNINGS
#ifdef WIN32
#include &lt;windows.h&gt;
#endif
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
#include &lt;stdlib.h&gt;
#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;CString&gt;
#include "CSHA1.h"
using namespace std;

wstring StringToWString(const string& s) //convert basic_sring to wchart_t
{
    wstring temp(s.length(),L' ');
    copy(s.begin(), s.end(), temp.begin());
    return temp;
}
string WStringToString(const std::wstring& s) //convert wchart_t to basic_sring
{
    string temp(s.length(), ' ');
    copy(s.begin(), s.end(), temp.begin());
    return temp;
}
bool compare(int i, int j) //compare the binary version of i and j
{
    int binary_i[4]={0,0,0,0};
    int binary_j[4]={0,0,0,0};
    while (1) //convert i to binary
    {
        for (int k=0;k&lt;4;k++)
        {
            if(i&gt;1)
            {
                binary_i[k] = i %2;
                i=i/2;
            }
            else
            {
                binary_i[k] =i;
                break;
            }
        }
        break;
    }
    while (1) //convert j to binary
    {
        for (int k=0;k&lt;4;k++)
        {
            if(j&gt;1)
            {
                binary_j[k] = j %2;
                j=j/2;
            }
            else
            {
                binary_j[k] =j;
                break;
            }
        }
        break;
    }
    for (int l=0;l&lt;4;l++) //if any of j’s bit is larger than I, return false
    {
        if (binary_i[l]&lt;binary_j[l])
        return 0;
    }
    return 1;
}
mpz_class Rand_Gen(int i) //random number generator with specified output length
{
    mpz_class random=0;
    mpz_class exp=1;
    timeb timebuffer;
    ftime(&timebuffer);//initialize timebuffer
    srand(timebuffer.millitm);//timebuffer.millitm get milli second as seed
    for (int j=0;j&lt;i;j++)
    {
        random=random+exp*(rand()%2); //each bit can be set 1 or 0
        exp=exp*2;
    }
    return random;
}
ECC_Point multiply_kP(mpz_class k,ECC_Point P) // using fast exponential
{
    ECC_Point z;
    z=P;
    mpz_class e =k;
    mpz_class f=2;
    while(1)
    {
        if (e%2 !=0) P = P.add(z);
        if (e &lt;= 1) return P;
        z = z.add(z);
        mpz_fdiv_q(e.get_mpz_t(), e.get_mpz_t(), f.get_mpz_t()); //divide e by 2, return quotient
    }
}
void genKey()// system initialization
{
    MYSQL *connect;
    connect=mysql_init(NULL);
    if(!connect)
    fprintf(stderr,"MySQL Initialization Failed");
    connect=mysql_real_connect(connect,"localhost","root","88888888","key",0,NULL,0); // connect to database
    if(connect)
    printf("Connection Succeeded\n");
    else
    printf("Connection Failed!\n");
    // the following parameters are set according to rfc5639
    // source: //http://tools.ietf.org/html/rfc5639#page-11
    mpz_class ECC_q("E95E4A5F737059DC60DFC7AD95B3D8139515620F", 16);
    mpz_class ECC_a("340E7BE2A280EB74E2BE61BADA745D97E8F7C300", 16);
    mpz_class ECC_b("1E589A8595423412134FAA2DBDEC95C8D8675E58", 16);
    mpz_class ECC_x("BED5AF16EA3F6A4F62938C4631EB5AF7BDBCDBC3", 16);
    mpz_class ECC_y("1667CB477A1A8EC338F94741669C976316DA6321", 16);
    mpz_class ECC_p("E95E4A5F737059DC60DF5991D45029409E60FC09", 16);
    mpz_class e("1766847064778384329583315038762566486662502341100865108435529847531372641",10);
    mpz_class N("1766847064778384329583316500264203817565420544786906750538164132638621787",10);
    ECC_Point P[16];
    ECC_Point K[16]; // 16 class keys
    ECC_Point R[16][16]; // 16*16 Rij
    mpz_class n[16];
    mpz_class g[16];
    mpz_class h[16];
    ECC_Point Q;
    Q.initECC(ECC_a,ECC_b,ECC_q);
    Q.setPoint(ECC_x,ECC_y);
    mpz_class p = ECC_p;
    int i,j;
    for (i=0;i&lt;16;i++)
    {
        P[i].initECC(ECC_a,ECC_b,ECC_q);
        K[i].initECC(ECC_a,ECC_b,ECC_q);
        mpz_class rand = Rand_Gen(160);
        n[i]= rand; // randomly generate ni
        Sleep(1); // refresh the seed for Rand_Gen()
        g[i]= i+1;
        mpz_invert(h[i].get_mpz_t(),g[i].get_mpz_t(),p.get_mpz_t());
        P[i] = multiply_kP(n[i]-1,Q); // Pi = niQ
        K[i] = multiply_kP(g[i]-1,P[i]); //Ki =giP
        CString str;
        string id,kx,ky;
        string query = "INSERT INTO kitest(ID,Kx,Ky) VALUES"; // SQL Insertion script
        mpz_class x= K[i].getx();
        mpz_class y= K[i].gety();
        stringstream s1 (stringstream::in | stringstream::out ); // mpz_class to string
        stringstream s2 (stringstream::in | stringstream::out );
        stringstream s3 (stringstream::in | stringstream::out );
        s1 &lt;&lt; x; // mpz_class to string
        s1 &gt;&gt; kx;
        s2 &lt;&lt; y;
        s2 &gt;&gt; ky;
        s3 &lt;&lt; i;
        s3 &gt;&gt; id;
        query = query + "(" + id+ "," + kx +","+ky+")";
        str.Format(L"%s",query);
        mysql_query(connect,(char*)(LPCTSTR)str);
    }
    for (i=0;i&lt;16;i++)
    {
        for (j=0;j&lt;16;j++)
        {
            R[i][j].initECC(ECC_a,ECC_b,ECC_q);
            R[i][j] = multiply_kP(g[i]-1,K[j]);
            R[i][j]=R[i][j].subtract(R[i][j],K[i]); // Rij=g[i]Kj-Ki
            CString str;
            string r_i,r_j,rx,ry,rx_signed,ry_signed;
            string query = "INSERT INTO rij_public(i,j,rx,ry,rx_signed,ry_signed) VALUES";
            mpz_class Ex,Ey;
            mpz_class x= R[i][j].getx();
            mpz_class y= R[i][j].gety();
            // RSA signature of Rij, by raising to the power of e modulo N mpz_powm(Ex.get_mpz_t(),x.get_mpz_t(),e.get_mpz_t(),N.get_mpz_t());
            mpz_powm(Ey.get_mpz_t(),y.get_mpz_t(),e.get_mpz_t(),N.get_mpz_t());
            stringstream s1 (stringstream::in | stringstream::out );
            stringstream s2 (stringstream::in | stringstream::out );
            stringstream s3 (stringstream::in | stringstream::out );
            stringstream s4 (stringstream::in | stringstream::out );
            stringstream s5 (stringstream::in | stringstream::out );
            stringstream s6 (stringstream::in | stringstream::out );
            s1 &lt;&lt; x;
            s1 &gt;&gt; rx;
            s2 &lt;&lt; y;
            s2 &gt;&gt; ry;
            s3 &lt;&lt; i;
            s3 &gt;&gt; r_i;
            s4 &lt;&lt; j;
            s4 &gt;&gt; r_j;
            s5 &lt;&lt; Ex;
            s5 &gt;&gt; rx_signed;
            s6 &lt;&lt; Ey;
            s6 &gt;&gt; ry_signed;
            query = query + "(" + r_i+","+r_j+ "," + rx +","+ry+"," + rx_signed +"," + ry_signed + ")";
            str.Format(L"%s",query);
            if (compare(i,j)) //stores Rij only when Ci&gt;Cj mysql_query(connect,(char*)(LPCTSTR)str);
        }
    }
    mysql_close(connect);
}
mpz_class get_largePrime() //this function generates large prime number
{
    mpz_class base =1024;
    mpz_t z ;
    for ( int j = 0 ; j &lt; 5; j++ ) base *= base ; // Square b 5 times, get 2^320
    mpz_init( z ) ;
    mpz_nextprime( z, base.get_mpz_t() ) ; // get the next prime number of base
    mpz_class p(z);
    return p;
}
void RSA_int(int length) //this function sets up the RSA parameters
{
    mpz_class p = Rand_Gen(length); // randomly generate p,q,e base number
    Sleep(1);
    mpz_class q = Rand_Gen(length);
    Sleep(1);
    mpz_class e = Rand_Gen(length);
    mpz_nextprime(p.get_mpz_t(), p.get_mpz_t()); // let p,q,e be the next prime number
    mpz_nextprime(q.get_mpz_t(), q.get_mpz_t());
    mpz_nextprime(e.get_mpz_t(), e.get_mpz_t());
    mpz_class n=p*q;
    mpz_class phi = (p-1)*(q-1);
    mpz_class d;
    mpz_invert(d.get_mpz_t(),e.get_mpz_t(),phi.get_mpz_t()); // calculate d = e^-1 mod phi
}

int main()
{
    long beginTime =clock();
    genKey();
    long endTime=clock();
    cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl; //record running time
    system("pause");
} 