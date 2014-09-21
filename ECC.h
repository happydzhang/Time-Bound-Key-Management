
/**
*file: ECC.h
* description: this header file defines ECC_Point class
* author: Yue
* version: 2.0
* date: 2013/4/6
* */
#include "stdafx.h"
#include <iostream>
#include <mpir.h>
#include <mpirxx.h>
using namespace std;

class ECC_Point
{
public:
ECC_Point();
ECC_Point(mpz_class,mpz_class);
void setPoint(mpz_class newX, mpz_class newY); //initialize ECC point
void initECC(mpz_class newA,mpz_class newB,mpz_class newQ); //set ECC parameters
const ECC_Point add (ECC_Point otherPoint); //ECC addition
const ECC_Point subtract (ECC_Point p, ECC_Point q); //ECC subtraction
ECC_Point printPoint();//print coordinates
bool checkXY (); //check whether a point is on the curve
void print ();
mpz_class getx();//get x-coordinate
mpz_class gety();//get y-coordinate
private:
mpz_class x;
mpz_class y;
mpz_class a;
mpz_class b;
mpz_class q;
};
ECC_Point::ECC_Point()
{
x="0";
y="0";
}
ECC_Point::ECC_Point(mpz_class newX,mpz_class newY)
{
x=newX;
y=newY;
}
void ECC_Point::setPoint(mpz_class newX,mpz_class newY)
{
x=newX;
y=newY;
}
void ECC_Point::initECC(mpz_class newA,mpz_class newB,mpz_class newQ)
{
a=newA;
b=newB;
q=newQ;
}
bool ECC_Point::checkXY ( )
{
if ((y*y)%q == (x*x*x + a*x+b)%q ||q+(y*y)%q == (x*x*x + a*x+b)%q ||((y*y)%q)-q == (x*x*x + a*x+b)%q )
return 1;
else
return 0;
}
const ECC_Point ECC_Point::add (ECC_Point p)// ECC addition
{
ECC_Point z;
mpz_class s;
mpz_class t;
if(x == p.x && y==p.y) // P+P
{
t = 2*y;
mpz_invert(s.get_mpz_t(),t.get_mpz_t(),q.get_mpz_t()); // Compute the inverse of t modulo q and put the result in s.
s = ((3*x*x+a)*s)%q;
}

else //P+Q
{
t = (p.x-x);
mpz_invert(s.get_mpz_t(),t.get_mpz_t(),q.get_mpz_t());// Compute the inverse of t modulo q and put the result in s.
s = ((p.y-y)*s)%q;
}
z.a = a;
z.b=b;
z.q=q;
z.x=(s*s-x-p.x)%q;
z.y=(s*(x-z.x)-y)%q;
return z;
}

void ECC_Point::print ()
{
if (x>0)
cout<<"X: "<<x<<endl;
else
cout<<"X: "<< x+q<<endl;
if (y>0)
cout<<"Y: "<<y<<endl;
else
cout<<"Y: "<<y+q<<endl;
}

const ECC_Point ECC_Point::subtract (ECC_Point p, ECC_Point q)// ECC substraction
{
q.x = q.x;
q.y = -q.y;
p=p.add(q);
return p;
}

mpz_class ECC_Point::getx()
{
if (x>0)
return x;
else
return x+q; // make sure it returns positive number
}

mpz_class ECC_Point::gety()
{
if (y>0)
return y;
else
return y+q;
}