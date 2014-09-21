/**
*file:Test.cpp
* description: this file includes the test codes that we used for testing the key system
* author: Yue
* version: 2.0
* date: 2013/4/6
* */
void SHA1_test() //testing SHA-1
{
    cout&lt;&lt;"The Hash value for \"The quick brown fox jumps over the lazy dog\" is: "&lt;&lt;endl;
    long beginTime =clock();
    Hash("The quick brown fox jumps over the lazy dog");
    long endTime=clock();
    cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
    cout&lt;&lt;"The Hash value for \"Test vector from febooti.com\" is: "&lt;&lt;endl;
    beginTime =clock();
    Hash("Test vector from febooti.com");
    endTime=clock();
    cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
    cout&lt;&lt;"The Hash value for \"\" is: "&lt;&lt;endl;
    beginTime =clock();
    Hash("");
    endTime=clock();
    cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
}
void HMAC_test() //testing HMAC
{
    /* test case 1*/
    BYTE key[20];
    cout&lt;&lt;"The key is 0x0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b "&lt;&lt;endl;
    cout&lt;&lt;"The messgae is \"Hi There\" "&lt;&lt;endl;
    for (int i=0;i&lt;20;i++)
    {
        key[i]=0x0b;
    }
    cout&lt;&lt;"The digest is:";
    long beginTime =clock();
    Hmac("Hi There",key);
    long endTime=clock();
    Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
    /* test case 2*/
    cout&lt;&lt;"The key is 0x0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c "&lt;&lt;endl;
    cout&lt;&lt;"The messgae is \"Test With Truncation\" "&lt;&lt;endl;
    for (int i=0;i&lt;20;i++)
    {
        key[i]=0x0c;
    }
    cout&lt;&lt;"The digest is:";
    beginTime =clock();
    Hmac("Test With Truncation",key);
    endTime=clock();
    cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
    /* test case 3*/
    cout&lt;&lt;"The key is 0x0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0b "&lt;&lt;endl;
    cout&lt;&lt;"The messgae is \"Test With Truncation\" "&lt;&lt;endl;
    for (int i=0;i&lt;19;i++)
    {
        key[i]=0x0c;
    }
    key[19]=0x0b;
    cout&lt;&lt;"The digest is:";
    beginTime =clock();
    Hmac("Test With Truncation",key);
    endTime=clock();
    cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
    /* test case 4*/
    cout&lt;&lt;"The key is 0x0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c "&lt;&lt;endl;
    cout&lt;&lt;"The messgae is \"Test With Truncation!\" "&lt;&lt;endl;
    for (int i=0;i&lt;20;i++)
    {
        key[i]=0x0c;
    }
    cout&lt;&lt;"The digest is:";
    beginTime =clock();
    Hmac("Test With Truncation!",key);
    endTime=clock();
    cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
}
void RNG_test() //testing random number generator
{
    for (int i=0;i&lt;5;i++)
    { long beginTime =clock();
        Rand_Gen(160);
        long endTime=clock();
        cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
        Sleep(1);
    }
    cout&lt;&lt;endl;
    for (int i=0;i&lt;5;i++)
    { long beginTime =clock();
        Rand_Gen(200);
        long endTime=clock();
        cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
        Sleep(1);
    }
}
void xor_test(mpz_class a, mpz_class b)
{ mpz_class c=a^b;
    cout&lt;&lt; "The result is:"&lt;&lt;c&lt;&lt;endl;
}
void RSA_test()
{
    mpz_class M("5657434353564657564217070376864841101648446072389678648457756567",10);
    mpz_class e ("1766847064778384329583315038762566486662502341100865108435529847531372641",10);
    mpz_class d ("989434356275895224566656421707037232531001311016484460723896714617568665",10);
    mpz_class phi("1766847064778384329583315038762566486662502341100865108435529847531372616",10);
    mpz_class n ("1766847064778384329583316500264203817565420544786906750538164132638621787",10);
    mpz_class result,ed;
    /* test case 1*/
    long beginTime =clock();
    cout&lt;&lt;"ed mod phi(n) equals:"&lt;&lt;(e*d)%phi&lt;&lt;endl;
    long endTime=clock();
    cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
    /* test case 2*/
    ed=e*d;
    beginTime =clock();
    mpz_powm(result.get_mpz_t(),M.get_mpz_t(),ed.get_mpz_t(),n.get_mpz_t());
    cout&lt;&lt;"M^ed mod n equals:"&lt;&lt;result&lt;&lt;endl;
    endTime=clock();
    cout&lt;&lt;"Time Elapsed:"&lt;&lt;endTime-beginTime&lt;&lt;" ms"&lt;&lt;endl&lt;&lt;endl;
}
void Ki_check(int i) // testing validity of Ki and Rij
{
    for (int j=0;j&lt;16;j++)
    {
        K[j] = R[i][j].add(K[i]);
        K[j] = multiply_kP(h[i]-1,K[j]);
        R[i][j].print();
    }
}
void ECC__operationTest(mpz_class k) //testing ECC
{ //p-192 parameters provided by NIST http://www.jscoron.fr/cours/mics3crypto/tpdl_ecc.pdf
    mpz_class ECC_q("6277101735386680763835789423207666416083908700390324961279", 10);
    mpz_class ECC_a("-3", 10);
    mpz_class ECC_b("64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1", 16);
    mpz_class ECC_x("188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012", 16);
    mpz_class ECC_y("07192B95FFC8DA78631011ED6B24CDD573F977A11E794811", 16);
    ECC_Point B;
    cout&lt;&lt;"When k = "&lt;&lt;k&lt;&lt;":"&lt;&lt;endl;
    k=k-1;
    B.initECC(ECC_a,ECC_b,ECC_q);
    B.setPoint(ECC_x,ECC_y);
    B= multiply_kP(k,B);
    B.print();
} 