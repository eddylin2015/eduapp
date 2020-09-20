//分數
class AFrc {
    constructor(){}
    FenZ = 0;   // 分數的結構
    FenM = 0;    // 分子，正整型數
    Sgn = 0;     //' 符號，只取±1
    Val = 0;     //  ' 分數的值，單精型數
    St = "";    //     ' 分數的單行運算式，字串
}
//'運算式(最多4項)的結構
class AExps {      
   constructor() {   }
   Nf = [new AFrc(),new AFrc(),new AFrc(),new AFrc(),new AFrc()];  //  As AFrc ' 各項可以是分數或整數(fenz）                    ' 跪砐褫眕岆煦杅麼淕杅(fenzㄘ
   OPr= ["","","","",""];     // As String   ' 操作符' 運運算元（括弧和指數)
   Val = 0 ;                  // As Single   ' 值
   St  = "" ;                 // As String   ' 代數表逹式子 ' 單行字串式
}
/*
Public TiHao             As Integer               ' 題號
Public TiXing            As Integer                 ' 題型
Public Epslon            As Single                  ' 允許誤差
Public T1                  As Single                  ' 起始計時
Public StdTime(4)     As Single                  ' 標準時間(解題的限定時間)
Public Over               As Boolean              ' 10題練習完成
Public SwJie             As Boolean               ' 是否已經解答
Public TZD               As String                   ' 滑鼠停駐點
Public TExps             As AExps
*/
//計算公具
class TmsUts{
 Val(s) { return Number(s) }  //文字轉數值
 Int(s) { return Math.floor(s) } //取整數
 Str(x) { return x.toString(); } //轉文字
 //數值的符號 +1 ,-1;
 Sgn(x) { if(isNaN(x))return NaN; if(x==-0) return -1;if(x==+0) return +1;if(x>0) return +1; if(x<0) return -1; }
 Abs(x) { return Math.abs(x); }
 Rnd(){ return Math.random();}
 Max(a, b) { return a > b ? a : b; }
 Min(a, b) { return a < b ? a : b; }
 Mid(Sd, a, b=-1) { let bb = b == -1 ? Sd.length - a : b; return Sd.substring(a, a + bb); }
 Left(Sd, a) { return Sd.substring(0, a); }
 Len(Sd){return Sd.length;}
 InStr(s1, s2) { return s1.indexOf(s2);/* string.indexOf(searchvalue, start)*/ }
 InStr2(Start, Ss, Sa) { return Ss.indexOf(Sa, Start); }
 Right(s1, n) { return s1.substring(s1.length - n); }
 Replace(str,find,replacewith){  var re = new RegExp("["+find+"]", 'g'); return str.replace(re,replacewith);}
 Trim(str){ return str.replace(/^\s+|\s+$/gm,'');}
 CDbl(v){Number(v);}
 AllTrim(Ss) {
    let s1 = "", s2; 
    for (let i = 0; i < Ss.length; i++) { s2 = Ss[i]; if (s2 != ' ') s1 += s2;  }
    return s1;
}
/*

 '------ 取得[Ta, Tb] 間亂數, 小數位 Desm --------
 ' ------ 限制範圍 [Tc, Td]
 ' ------SwIs 是 限制 開關, 0 不限制, 1 限制區域， 2 限制2點

* TakeARnd : Take a Rnd
* rang Ta - Tb    -10..10
* Desm 10^Desm 取整的進位調整 default=0
* [SwIs,Tc,Td] 0: ; 1: 非Tc..Td Range; other: not eq (Tc or  Td)
*         a = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
*         c = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
*         e = tmsU.TakeARnd(-Tk, Tk, 0, 2, 0, a)
*/
TakeARnd(Ta, Tb, Desm, SwIs, Tc, Td) //As Single
{
    if((Tb-Ta) == 0) return 0;
    let r;
    let BL = true;
    while (BL) {
        r = Math.random() * (Tb - Ta) + Ta;
        r = this.Int(r * 10 ^ Desm + 0.5) / 10 ^ Desm;
        switch (SwIs) {
            case 0: BL = false; break;
            case 1: BL = (r >= Tc) && (r <= Td); break;
            default: BL = (r == Tc) || (r == Td)
        }
    }
    return r;
}

//' ------------- 最大公約數 ------------
//' ------- i, j HCF  ------
//Public Function HCF(i As Single, j As Single) As Single
HCF(i, j) //As Single
{
    let m, n, r, k
    m = Math.abs(i); n = Math.abs(j);
    if (this.Sgn(m) * this.Sgn(n) == 0) {
        n = 1;
    } else {
        if (m < n) { r = m; m = n; n = r }
        r = m % n;
        k = n
        if (r > 0) { n = this.HCF(k, r); }
    }
    return n
}
/*
 ' ------ 建構一個隨機分數,  ---------------
 ' ----- 分子為(-k , k) 內的整數-------
 ' ------  分數的SwIs ：0  不允許整數，1 允許整數，2 真分數，3 假分數
*/
// Public Function TakeAFrc(k As Single, SwIs As Integer) As AFrc
// k = TakeARnd    SwIs 0,1,2
 TakeAFrc(k, SwIs)//As AFrc
{
    let a, b, c, r;
    let f = new AFrc, BL = true;
    while (BL) {
        a = this.TakeARnd(-k, k, 0, 1, 0, 0);// '  分子
        b = this.TakeARnd(1, k, 0, 1, 0, 0);//    ' 分母
        r = this.HCF(a, b);
        a = a / r; b = b / r
        switch (SwIs) {
            case 0:
                BL = b == 1; break;
            case 1:
                BL = false; break;
            case 2:
                BL = Math.abs(a) >= Math.abs(b) || b == 1; break;
            default:
                BL = Math.abs(a) <= Math.abs(b) || b == 1;
        }
    }
    f.Sgn = this.Sgn(a)                              //    ' 分母總為正, 從分子取得符號
    f.FenZ = Math.abs(a)                              //    ' 取的符號後，分子改為正
    f.FenM = b
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = (f.Sgn * f.FenZ) + "/" + (f.FenM)
    return f
}
//' ------ ·ÖÊý³Ë·¨ ------
//' ----- ·ÖÊý x ·ÖÊý -------
//Public Function FxF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
 FxF(Tf1, Tf2) {
    let u, v, n, f = new AFrc; //u v as single; n:int; f as AFrc
    if (Tf1.Sgn == 0) Tf1.Sgn = 1
    if (Tf2.Sgn == 0) Tf2.Sgn = 1
    f.Sgn = Tf1.Sgn * Tf2.Sgn
    u = Tf1.FenZ * Tf2.FenZ
    v = Tf1.FenM * Tf2.FenM
    n = this.HCF(u, v)
    u = u / n
    v = v / n
    f.FenZ = u
    f.FenM = v
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = this.AllTrim(this.Str(f.Sgn * f.FenZ) + "/ " + this.Str(f.FenM))
    return f
}
//' ------ ·ÖÊý³ý·¨ ------
//' ----- ·ÖÊý /·ÖÊý -------
//Public Function FdivF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
 FdivF(Tf1, Tf2) {
    let u, v, n;
    let F1, F2;
    if (Tf1.Sgn == 0) Tf1.Sgn = 1
    if (Tf2.Sgn == 0) Tf2.Sgn = 1
    F2 = Tf2
    u = F2.FenZ
    v = F2.FenM
    F2.FenZ = v
    F2.FenM = u
    return this.FxF(Tf1, F2)
}

//' ------ Ð¡Êý»¯·ÖÊý£¬ Eps Îó²î ------
//Public Function DcmToFrc(Ta As Double, Eps As Single) As AFrc
 DcmToFrc(Ta, Eps) {
    let F1=new AFrc(), a, b;
    let u, v;
    let i, j, k;
    let s1;
    F1.Sgn = this.Sgn(Ta)
    a = this.Abs(Ta)
    if (this.Abs(Ta - this.Int(Ta)) <= Eps) {
        F1.FenZ = a
        F1.FenM = 1
        F1.Val = Ta
    } else if (Eps == 0) {
        s1 = this.Trim(this.Str(a))
        i = this.InStr(s1, ".")
        j = this.Len(this.Mid(s1, i + 1))
        u = a * 10 ^ j
        v = 10 ^ j
        j = this.HCF(u, v)
        u = u / j
        v = v / j
        F1.FenZ = u
        F1.FenM = v
        F1.Val = F1.Sgn * (F1.FenZ / F1.FenM)
    } else {

        k = this.Int(a)
        a = a - k
        u = 1; v = 1
        b = u / v + a
        while (this.Abs(b - a) > Eps) {
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
        F1.St = this.Str(F1.Sgn * F1.FenZ) + "/" + this.Str(F1.FenM)
    }
    return F1
}
/*
' ------ 分數加法 ---------------
' ------- Ts 是 ± 號
//' ------- Ts ÊÇ ¡À ºÅ
*/
//Public Function FPlusF(Tf1 As AFrc, Tf2 As AFrc, Ts As String) As AFrc
 FPlusF(Tf1, Tf2, Ts) {
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
    f.Sgn = this.Sgn(u)                                                         //         ' ÌáÈ¡ºÍ(²î)µÄ·ûºÅ
    u = this.Abs(u)
    v = b1 * b2                                                             //         ' Í¨·ÖµÄ·ÖÄ¸
    n = this.HCF(u, v)
    u = u / n                                                               //              ' Ô¼·Ö
    v = v / n
    f.FenZ = u
    f.FenM = v
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = this.AllTrim(this.Str(f.Sgn * f.FenZ) + "/" + this.Str(f.FenM))
    return f

}
 HCF2(Ts) {
    let m, n, r;
    let Ss = [];
    let s1, s2;
    let i, j, k, sn;
    s1 = Ts
    if (this.Right(s1, 1) != ",") s1 = s1 + ","
    let Sn = 0
    while (s1 != "") {
        i = this.InStr(s1, ",")
        s2 = this.Left(s1, i - 1)
        Sn = Sn + 1
        //ReDim Preserve Ss(Sn)
        Ss[Sn] = this.Abs(this.Val(s2))
        s1 = this.Mid(s1, i + 1)
    }
    for (i = 1; i < Sn - 1; i++)
        for (j = i + 1; j < Sn; j++) {
            if (Ss[j] < Ss[i]) { k = Ss[i]; Ss[i] = Ss[j]; Ss[j] = k; }
        }

    n = Ss[1]
    for (i = 2; i < Sn; i++) {
        m = Ss[i]
        if (this.Sgn(m) * this.Sgn(n) == 0) { n = 1 }
        else {
            r = m % n
            if (r > 0) n = this.HCF(n, r)
        }
    }
    return n

}
//' ------ ÕûÀíÒ»´ÎÊ½ £¬³É×Ö´®±í´ïÊ½-----
//' ------ a/b x + c/d ------------
//' ------ 2/3 x + 4/6 ==> 2(x+1)/3
//Public Function PlasticAEq(Ta As Single, Tb As Single, Tc As Single, Td As Single) As String
 PlasticAEq(Ta, Tb, Tc, Td)//As String
{
    let a, b, c, d, k1, k2, p; //as singel
    let s1, s2, Fh; //as string
    a = Ta; b = Tb; c = Tc; d = Td;
    if (b == 1 && d == 1) {
        p = this.Sgn(a)
        k1 = this.HCF(a, c)
        a = a / k1 * p; c = c / k1 * p; k1 = k1 * p;
        s1 = this.Str(c);
        if (c > 0) { s1 = "+" + s1; }
        s1 = "x" + s1
        if (a == -1) {
            s1 = "-" + s1
        } else if (a != 1) { s1 = this.Str(a) + s1; }

        if (k1 == -1) { s1 = "-" + "(" + s1 + ")" }
        else if (k1 != 1) {
            s1 = this.Str(k1) + "(" + s1 + ")"
        }
    }
    return this.AllTrim(s1)
}
//' ------ ÔÚSsÖÐÑ°ÕÒs1, Èç¹ûs1Ç°ÃæÒ»¸ö·ûºÅÔÚs2ÖÐ£¬ÔòÔÚs1Ç°²åÈëSk ---
//' ------ Àý£º Ss="3x+1", ÒªÔÚxÇ°²åÈëÒ»¸ö"*"
//' ------ s2="0,1,2,3,4,5,6,7,8,9,"
//' ------ Ss=IntoStr(Ss,"x","*",s2)   ==> Ss = 3*x+1    (ÓÉ²»¿ÉÔËËã±ä³É¿ÉÔËËã)
 IntoStr(Ss, s1, Sk, s2) {
    let i, j, Sd, St;
    try {
        Sd = Ss
        i = 1
        j = 0
        while (i > 0) {
            i = this.InStr2(j + 1, Sd, s1)
            if (i > 1) {
                St = this.Mid(Sd, i - 1, 1) + ","
                if (this.InStr(s2, St) > 0) Sd = this.Left(Sd, i - 1) + Sk + this.Mid(Sd, i)
            }
            j = i + 1
        }
        return Sd
    } catch (e) { }
}
 getRndInteger(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min;}
}
if (typeof module !== 'undefined' && module.exports) {
module.exports = {    AFrc: AFrc,   AExps: AExps, TmsUts:TmsUts     };
}