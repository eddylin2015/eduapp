//Option Explicit
'use strict';

class AFrc {
    constructor() {
        this.FenZ = 0;
        this.FenM = 0;
        this.Sgn = 0;
        this.Val = 0;
        this.St = "";
    }
}
class AExps {      
   constructor() {                                                        //  '桶湛宒(郔嗣4砐)腔賦凳
   this.Nf = [new AFrc(),new AFrc(),new AFrc(),new AFrc(),new AFrc()];  //  As AFrc                      ' 跪砐褫眕岆煦杅麼淕杅(fenzㄘ
   this.OPr= ["","","","",""];     // As String   ' 堍呾睫ㄗ嬤說睿硌杅)
   this.Val = 0 ;                    // As Single  algibra statement 
   this.CalcVal=0;                   // As Single  val
   this.St  = "" ;                   // As String   ' 等俴趼揹宒
   }
}
function Val(s) { return Number(s) }
function Int(s) { return Math.floor(s) }
function Str(x) { return x.toString(); }
function Sgn(x) { return Math.sign(x); }
function Abs(x) { return Math.abs(x); }
function Rnd(){ return Math.random();}
function Max(a, b) { return a > b ? a : b; }
function Min(a, b) { return a < b ? a : b; }
function Mid(Sd, a, b) { Sd.substring(a, a + b); }
function Left(Sd, a) { 
    return Sd.substring(0, a); 
}
function InStr(s1, s2) { return s1.indexOf(s2);/* string.indexOf(searchvalue, start)*/ }
function InStr2(Start, Ss, Sa) { return Ss.indexOf(Sa, Start); }
function Right(s1, n) { return s1.substring(s1.length - n); }
function Replace(str,find,replacewith){  var re = new RegExp("["+find+"]", 'g'); return str.replace(re,replacewith);}
function Trim(str){ return str.replace(/^\s+|\s+$/gm,'');}
function CDbl(v){Number(v);}
function AllTrim(Ss) {
    let s1 = "", s2; 
    for (let i = 0; i < Ss.length; i++) { s2 = Ss[i]; if (s2 != ' ') s1 += s2;  }
    return s1;
}
function TakeARnd(Ta, Tb, Desm, SwIs, Tc, Td) //As Single
{
    let r;
    let BL = true;
    //console.log(Ta , Tb , Desm , SwIs , Tc, Td );
    while (BL) {
        r = Math.random() * (Tb - Ta) + Ta;
        r = Int(r * 10 ^ Desm + 0.5) / 10 ^ Desm;
        switch (SwIs) {
            case 0: BL = fasle; break;
            case 1: BL = (r >= Tc) && (r <= Td); break;
            default: BL = (r == Tc) || (r == Td)
        }
    }
    return r;
}

//' ------------- Á½¸öÊýµÄ HCF ------------
//' ------- i, j ¿ÉÒÔÎª¸º¿ÉÒÔÎª0£¬µ«HCF ×ÜÊÇÕýµÄ ------
//Public Function HCF(i As Single, j As Single) As Single
function HCF(i, j) //As Single
{
    let m, n, r, k
    m = Math.abs(i); n = Math.abs(j);
    if (Math.sign(m) * Math.sign(n) == 0) {
        n = 1;
    } else {
        if (m < n) { r = m; m = n; n = r }
        r = m % n;
        k = n
        if (r > 0) { n = HCF(k, r); }
    }
    return n
}

//' ------ ½¨¹¹Ò»¸öËæ»ú·ÖÊý,  ---------------
//' ----- ·Ö×ÓÎª(-k , k) ÄÚµÄÕûÊý-------
//' ------  ·ÖÊýµÄSwIs £º0  ²»ÔÊÐíÕûÊý£¬1 ÔÊÐíÕûÊý£¬2 Õæ·ÖÊý£¬3 ¼Ù·ÖÊý
//'  ------Ëæ»úÊýµÄSwIs ÊÇ ÏÞÖÆ ¿ª¹Ø, 0 ²»ÏÞÖÆ, 1 ÏÞÖÆÇøÓò£¬ 2 ÏÞÖÆ2µã
// Public Function TakeAFrc(k As Single, SwIs As Integer) As AFrc
// k = tabeARnd    SwIs 0,1,2
function TakeAFrc(k, SwIs)//As AFrc
{
    let a, b, c, r;
    let f = new AFrc, BL = true;
    while (BL) {
        a = TakeARnd(-k, k, 0, 1, 0, 0);
        b = TakeARnd(1, k, 0, 1, 0, 0);
        r = HCF(a, b);
        a = a / r; b = b / r
        switch (SwIs) {
            case 0:
                BL = b == 1; break;
            case 1:
                BL = false; break;
            case 2:
                BL = Math.abs(a) >= AMath.abss(b) || b == 1; break;
            default:
                BL = Math.abs(a) <= Math.abs(b) || b == 1;
        }
    }
    f.Sgn = Math.sign(a)                              //      ' ·ÖÄ¸×ÜÎªÕý, ´Ó·Ö×ÓÈ¡µÃ·ûºÅ
    f.FenZ = Math.abs(a)                              //    ' È¡µÄ·ûºÅáá£¬·Ö×Ó¸ÄÎªÕý
    f.FenM = b
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = (f.Sgn * f.FenZ) + "/" + (f.FenM)
    return f
}
//' ------ ·ÖÊý³Ë·¨ ------
//' ----- ·ÖÊý x ·ÖÊý -------
//Public Function FxF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
function FxF(Tf1, Tf2) {
    let u, v, n, f = new AFrc; //u v as single; n:int; f as AFrc
    if (Tf1.Sgn == 0) Tf1.Sgn = 1
    if (Tf2.Sgn == 0) Tf2.Sgn = 1
    f.Sgn = Tf1.Sgn * Tf2.Sgn
    u = Tf1.FenZ * Tf2.FenZ
    v = Tf1.FenM * Tf2.FenM
    n = HCF(u, v)
    u = u / n
    v = v / n
    f.FenZ = u
    f.FenM = v
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = AllTrim(Str(f.Sgn * f.FenZ) + "/ " + Str(f.FenM))
    return f
}
//' ------ ·ÖÊý³ý·¨ ------
//' ----- ·ÖÊý /·ÖÊý -------
//Public Function FdivF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
function FdivF(Tf1, Tf2) {
    let u, v, n;
    let F1, F2;
    if (Tf1.Sgn == 0) Tf1.Sgn = 1
    if (Tf2.Sgn == 0) Tf2.Sgn = 1
    F2 = Tf2
    u = F2.FenZ
    v = F2.FenM
    F2.FenZ = v
    F2.FenM = u
    return FxF(Tf1, F2)
}

//' ------ Ð¡Êý»¯·ÖÊý£¬ Eps Îó²î ------
//Public Function DcmToFrc(Ta As Double, Eps As Single) As AFrc
function DcmToFrc(Ta, Eps) {
    let F1=new AFrc(), a, b;
    let u, v;
    let i, j, k;
    let s1;
    F1.Sgn = Sgn(Ta)
    a = Abs(Ta)
    if (Abs(Ta - Int(Ta)) <= Eps) {
        F1.FenZ = a
        F1.FenM = 1
        F1.Val = Ta
    } else if (Eps == 0) {
        s1 = Trim(Str(a))
        i = InStr(s1, ".")
        j = Len(Mid(s1, i + 1))
        u = a * 10 ^ j
        v = 10 ^ j
        j = HCF(u, v)
        u = u / j
        v = v / j
        F1.FenZ = u
        F1.FenM = v
        F1.Val = F1.Sgn * (F1.FenZ / F1.FenM)
    } else {

        k = Int(a)
        a = a - k
        u = 1; v = 1
        b = u / v + a
        while (Abs(b - a) > Eps) {
            if (b < a) {
                u = u + 1
            } else {
                v = v + 1
            }
            b = u / v
        }
        F1.FenZ = k * v + u
        F1.FenM = v
        F1.Val = F1.Sgn * F1.FenZ / F1.FenM
        F1.St = Str(F1.Sgn * F1.FenZ) + "/" + Str(F1.FenM)
    }
    return F1
}
//' ------ ·ÖÊý¼Ó·¨ ---------------
//' ------- Ts ÊÇ ¡À ºÅ
//Public Function FPlusF(Tf1 As AFrc, Tf2 As AFrc, Ts As String) As AFrc
function FPlusF(Tf1, Tf2, Ts) {
    let a1, b1, a2, b2;//Int
    let u, v, n, f = new AFrc;  // u,v as single; n as int; f As AFrc
    if (Tf1.Sgn == 0) Tf1.Sgn = 1
    if (Tf2.Sgn == 0) Tf2.Sgn = 1
    a1 = Tf1.Sgn * Tf1.FenZ                                         //     ' ½«·ûºÅ¼Óµ½·Ö×ÓÉÏ
    b1 = Tf1.FenM
    a2 = Tf2.Sgn * Tf2.FenZ
    b2 = Tf2.FenM
    if (Ts == "+") {
        u = a1 * b2 + a2 * b1                                         //         ' Í¨·Ö¼Ó¼õááµÄ·Ö×Ó¼ÆËã
    } else {
        u = a1 * b2 - a2 * b1                                         //         ' Í¨·Ö¼Ó¼õááµÄ·Ö×Ó¼ÆËã
    }
    f.Sgn = Sgn(u)                                                         //         ' ÌáÈ¡ºÍ(²î)µÄ·ûºÅ
    u = Abs(u)
    v = b1 * b2                                                             //         ' Í¨·ÖµÄ·ÖÄ¸
    n = HCF(u, v)
    u = u / n                                                               //              ' Ô¼·Ö
    v = v / n
    f.FenZ = u
    f.FenM = v
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = AllTrim(Str(f.Sgn * f.FenZ) + "/" + Str(f.FenM))
    return f
}
function HCF2(Ts) {
    let m, n, r;
    let Ss = [];
    let s1, s2;
    let i, j, k, sn;
    s1 = Ts
    if (Right(s1, 1) != ",") s1 = s1 + ","
    Sn = 0
    while (s1 != "") {
        i = InStr(s1, ",")
        s2 = Left(s1, i - 1)
        Sn = Sn + 1
        //ReDim Preserve Ss(Sn)
        Ss[Sn] = Abs(Val(s2))
        s1 = Mid(s1, i + 1)
    }
    for (i = 1; i < Sn - 1; i++)
        for (j = i + 1; j < Sn; j++) {
            if (Ss[j] < Ss[i]) { k = Ss[i]; Ss[i] = Ss[j]; Ss[j] = k; }
        }

    n = Ss[1]
    for (i = 2; i < Sn; i++) {
        m = Ss[i]
        if (Sgn(m) * Sgn(n) == 0) { n = 1 }
        else {
            r = m % n
            if (r > 0) n = HCF(n, r)
        }
    }
    return n

}
//' ------ ÕûÀíÒ»´ÎÊ½ £¬³É×Ö´®±í´ïÊ½-----
//' ------ a/b x + c/d ------------
//' ------ 2/3 x + 4/6 ==> 2(x+1)/3
//Public Function PlasticAEq(Ta As Single, Tb As Single, Tc As Single, Td As Single) As String
function PlasticAEq(Ta, Tb, Tc, Td)//As String
{
    let a, b, c, d, k1, k2, p; //as singel
    let s1, s2, Fh; //as string
    a = Ta; b = Tb; c = Tc; d = Td;
    if (b == 1 && d == 1) {
        p = Sgn(a)
        k1 = HCF(a, c)
        a = a / k1 * p; c = c / k1 * p; k1 = k1 * p;
        s1 = Str(c);
        if (c > 0) { s1 = "+" + s1; }
        s1 = "x" + s1
        if (a == -1) {
            s1 = "-" + s1
        } else if (a != 1) { s1 = Str(a) + s1; }

        if (k1 == -1) { s1 = "-" + "(" + s1 + ")" }
        else if (k1 != 1) {
            s1 = Str(k1) + "(" + s1 + ")"
        }
    }
    return AllTrim(s1)
}


//' ------ ÔÚSsÖÐÑ°ÕÒs1, Èç¹ûs1Ç°ÃæÒ»¸ö·ûºÅÔÚs2ÖÐ£¬ÔòÔÚs1Ç°²åÈëSk ---
//' ------ Àý£º Ss="3x+1", ÒªÔÚxÇ°²åÈëÒ»¸ö"*"
//' ------ s2="0,1,2,3,4,5,6,7,8,9,"
//' ------ Ss=IntoStr(Ss,"x","*",s2)   ==> Ss = 3*x+1    (ÓÉ²»¿ÉÔËËã±ä³É¿ÉÔËËã)
function IntoStr(Ss, s1, Sk, s2) {
    let i, j, Sd, St;
    try {
        Sd = Ss
        i = 1
        j = 0
        while (i > 0) {
            i = InStr(j + 1, Sd, s1)
            if (i > 1) {
                St = Mid(Sd, i - 1, 1) + ","
                if (InStr(s2, St) > 0) Sd = Left(Sd, i - 1) + Sk + Mid(Sd, i)
            }
            j = i + 1
        }
        return Sd
    } catch (e) { }
}
function getRndInteger(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min;}
/*
module.exports = {
    AFrc: AFrc,
    AExps: AExps,
    Val: Val,
    Int: Int,
    Str: Str,
    Sgn: Sgn,
    Abs: Abs,
    Max: Max,
    Min: Min,
    Rnd:Rnd,
    Mid:Mid,
    Trim:Trim,
    Replace:Replace,
    Left: Left,
    InStr:InStr,
    InStr2:InStr2,
    Right:Right,
    CDbl:CDbl,
    AllTrim:AllTrim,
    IntoStr:IntoStr,
    FdivF:FdivF,
    FPlusF:FPlusF,
    PlasticAEq:PlasticAEq,
    HCF:HCF,
    HCF2:HCF2,
    FxF:FxF,
    TakeARnd:TakeARnd,
    TakeAFrc:TakeAFrc,
    DcmToFrc:DcmToFrc,
  };
*/
/*
export {
     AFrc,
     AExps,
     Val,
     Int,
     Str,
     Sgn,
     Abs,
     Max,
     Min,
    Rnd,
    Mid,
    Trim,
    Replace,
     Left,
    InStr,
    InStr2,
    Right,
    CDbl,
    AllTrim,
    IntoStr,
    FdivF,
    FPlusF,
    PlasticAEq,
    HCF,
    HCF2,
    FxF,
    TakeARnd,
    TakeAFrc,
    DcmToFrc,
}
*/