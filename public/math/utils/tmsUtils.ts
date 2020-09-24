
class AFrc {
    //分數的結構 AFrc :   fraction , denominator
    constructor(){}
    St = "";  //' 分數的單行運算式，字串

    Val = 0;  //分數的值，單精型數 decimal Value or 可計算式子
 
    CalVal=0; //Val 式子運計算結果, 或tmsCalcu 運算結果
    
    //以分式表示結果
    FenZ = 0; //分子 fraction
    FenM = 0; //分母 denominator ，正整型數
    Sgn = 0;  //符號，+1 -1
}
class AExps {      
   //'運算式(最多4項)的結構
   constructor() {        }   
   Nf = [new AFrc(),new AFrc(),new AFrc(),new AFrc(),new AFrc()];  //  As AFrc '' 各項可以是分數或整數(fenz）     
   OPr= ["","","","",""];   // As String   ' 操作符' 運運算元（括弧和指數)
   St  = "" ;               // As String    ' 代數表逹式子 ' 單行字串式
   Val = 0 ;                // As Single or Decimal  //分數的值，單精型數 decimal Value or 可計算式子
   CalcVal = 0; //As Decimal ; Val 式子運計算結果, 或tmsCalcu 運算結果
}
/*
Module1.bas  Utils
*/
class TmsUts{
 /*
 '------ 建構一個亂數
 '------ 取得[Ta, Tb] 間亂數, 小數位 Desm --------
 '------ 限制範圍 [Tc, Td]
 '------ SwIs 是 限制 開關, 0 不限制, 1 限制區域， 2 限制2點
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
/*
 ' ------ 建構一個隨機分數,  ---------------
 ' -----  分子為(-k , k) 內的整數-------
 ' ------ 分數的SwIs ：0  不允許整數，1 允許整數，2 真分數，3 假分數
 '  ------註: 亂數的SwIs 是 限制 開關, 0 不限制, 1 限制區域， 2 限制2點
 ' Public Function TakeAFrc(k As Single, SwIs As Integer) As AFrc
 ' k = TakeARnd SwIs 0,1,2
*/
TakeAFrc(k, SwIs)//As AFrc
{
    let a, b, c, r;
    let f = new AFrc, BL = true;
    while (BL) {
        a = this.TakeARnd(-k, k, 0, 1, 0, 0); //' 分子
        b = this.TakeARnd(1, k, 0, 1, 0, 0);  //' 分母
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
    f.Sgn = this.Sgn(a)                              //     ' 分母總為正, 從分子取得符號
    f.FenZ = Math.abs(a)                             //     ' 取的符號後，分子改為正
    f.FenM = b
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = (f.Sgn * f.FenZ) + "/" + (f.FenM)
    return f
}
/*
' ------ 整理一次式 ，成字串運算式-----
' ------ a/b x + c/d ------------
' ------ 2/3 x + 4/6 ==> 2(x+1)/3
'Public Function PlasticAEq(Ta As Single, Tb As Single, Tc As Single, Td As Single) As String
*/
PlasticAEq(Ta, Tb, Tc, Td)//As String
{
    let a, b, c, d, k1, k2, p; //as singel
    let s1, s2, Fh; //as string
    a = Ta; b = Tb; c = Tc; d = Td;
    if (b == 1 && d == 1) {    //' 整式
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
    } // else  ' 分式
    return this.AllTrim(s1)
}

/*
' ------ 分數加法 ---------------
' ------- Ts 是 ± 號
//Public Function FPlusF(Tf1 As AFrc, Tf2 As AFrc, Ts As String) As AFrc
*/
FPlusF(Tf1, Tf2, Ts) {
    let a1, b1, a2, b2;//Int
    let u, v, n, f = new AFrc;  // u,v as single; n as int; f As AFrc
    if (Tf1.Sgn == 0) Tf1.Sgn = 1
    if (Tf2.Sgn == 0) Tf2.Sgn = 1
    a1 = Tf1.Sgn * Tf1.FenZ                                         //     '   ' 將符號加到分子上
    b1 = Tf1.FenM
    a2 = Tf2.Sgn * Tf2.FenZ
    b2 = Tf2.FenM
    if (Ts == "+") {
        u = a1 * b2 + a2 * b1                                         //       ' 通分加減後的分子計算
    } else {
        u = a1 * b2 - a2 * b1                                         //        ' 通分加減後的分子計算
    }
    f.Sgn = this.Sgn(u)                                                         //      ' 提取和(差)的符號
    u = this.Abs(u)
    v = b1 * b2                                                             //        ' 通分的分母
    n = this.HCF(u, v)
    u = u / n                                                               //             ' 約分
    v = v / n
    f.FenZ = u
    f.FenM = v
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = this.AllTrim(this.Str(f.Sgn * f.FenZ) + "/" + this.Str(f.FenM))
    return f

}
/*
' ------ 分數乘法 ------
' ----- 分數 x 分數 -------
//Public Function FxF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
*/
 FxF(Tf1, Tf2) {
    let u, v, n, f = new AFrc; //u v as single; n:int; f as AFrc
    if (Tf1.Sgn == 0) Tf1.Sgn = 1
    if (Tf2.Sgn == 0) Tf2.Sgn = 1
    f.Sgn = Tf1.Sgn * Tf2.Sgn  //
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
/*
' ------ 分數除法 ------
' ----- 分數 /分數 -------
//Public Function FdivF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
*/
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

/*' ------ 小數化分數， Eps 誤差 ------
Public Function DcmToFrc(Ta As Double, Eps As Single) As AFrc
*/
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
' ------ 在Ss中尋找s1, 如果s1前面一個符號在s2中，則在s1前插入Sk ---
' ------ 例： Ss="3x+1", 要在x前插入一個"*"
' ------ s2="0,1,2,3,4,5,6,7,8,9,"
' ------ Ss=IntoStr(Ss,"x","*",s2)   ==> Ss = 3*x+1    (由不可運算變成可運算)
*/
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
/*
' ------------- 兩個數的 HCF 最大公約數------------
' ------- i, j 可以為負可以為0，但HCF 總是正的 ------
Public Function HCF(i As Single, j As Single) As Single
*/
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
//' ------ 多個數的HCF ------
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
//' ------- 排除字串前後、中間的所有空格 -------
AllTrim(Ss) {
    let s1 = "", s2; 
    for (let i = 0; i < Ss.length; i++) { s2 = Ss[i]; if (s2 != ' ') s1 += s2;  }
    return s1;
}
/*' ----- 從位置 Start 開始，搜索 Ss 中，含Sa 中元素的位置 ----
  ' ------ 與 Instr不同，此處的Sa可含多個單字母元素，例如：“+,-,*,/" 運算子。 */ 
 InStr(s1, s2) { return s1.indexOf(s2);/* string.indexOf(searchvalue, start)*/ }
 InStr2(Start, Ss, Sa) { return Ss.indexOf(Sa, Start); }
 getRndInteger(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min;}
 Val(s) { return Number(s) }
 Int(s) { return Math.floor(s) }
 Str(x) { return x.toString(); }
 Sgn(x) { if(isNaN(x))return NaN; if(x==-0) return -1;if(x==+0) return +1;if(x>0) return +1; if(x<0) return -1; }
 Abs(x) { return Math.abs(x); }
 Rnd(){ return Math.random();}
 Max(a, b) { return a > b ? a : b; }
 Min(a, b) { return a < b ? a : b; }
 Mid(Sd, a, b=-1) { let bb = b == -1 ? Sd.length - a : b; return Sd.substring(a, a + bb); }
 Left(Sd, a) { return Sd.substring(0, a); }
 Len(Sd){return Sd.length;}
 Right(s1, n) { return s1.substring(s1.length - n); }
 Replace(str,find,replacewith){  var re = new RegExp("["+find+"]", 'g'); return str.replace(re,replacewith);}
 Trim(str){ return str.replace(/^\s+|\s+$/gm,'');}
 //轉換為 Double 數值
 CDbl(v){Number(v);}
}
if (typeof module !== 'undefined' && module.exports) {
module.exports = {    AFrc: AFrc,   AExps: AExps, TmsUts:TmsUts     };
}