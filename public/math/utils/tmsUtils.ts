class AFrc {
    FenZ: number;
    FenM: number;
    Sgn: number;
    Val: any;
    St: any;
    St1: any;
    CalVal: any; //tmsCalcu
    //分數的結構 AFrc :   fraction , denominator
    constructor() {
        this.FenZ = 0; //分子 fraction
        this.FenM = 1; //分母 denominator ，正整型數
        this.Sgn = 0;  //符號，+1 -1
        this.Val = 0;  //分數的值，單精型數 decimal Value or 可計算式子
        this.St = "0";  //' 分數的單行運算式，字串
        this.St1 = "0"; //' 分數的單行運算式，字串 ( -1 ) 加括號
        this.CalVal = 0; //Val 式子運計算結果, 或tmsCalcu 運算結果 
    }
}

class AExps {
    //'運算式(最多4項)的結構
    Nf: any;
    OPr: any;
    St: any;
    Val: any;
    CalcVal: any;
    FrcVal: any;
    constructor() {
        this.Nf = [null, null, null, null, null];  //  As AFrc '' 各項可以是分數或整數(fenz）     
        this.OPr = ["", "", "", "", ""];   // As String   ' 操作符' 運運算元（括弧和指數)
        this.St = "";               // As String    ' 代數表逹式子 ' 單行字串式
        this.Val = 0;                // As Single or Decimal  //分數的值，單精型數 decimal Value or 可計算式子
        this.CalcVal = 0; //As Decimal ; Val 式子運計算結果, 或tmsCalcu 運算結果
        this.FrcVal = 0;
    }
}
/*
Module1.bas  Utils
*/
class TmsUts {
    TakeAOpr(TOprRang) {
        return TOprRang[this.Int(100 * this.Rnd()) % TOprRang.length];
    }
    /*
    '------ 建構一個亂數
    '------ 取得[Ta, Tb] 間亂數, 小數位 Desm --------
    '------ 限制範圍 [Tc, Td]
    '------ SwIs 是 限制 開關, 0 不限制, 1 限制區域， 2 限制2點
   * TakeARnd : Take a Rnd
   * rang Ta - Tb    -10..10
   * Desm 10^Desm 取整的進位調整 default=0
   * [SwIs,Tc,Td] 0: ; 1: 非Tc..Td Range; other: not eq (Tc or  Td)
   *         createEqu(Tx,Tk)  Tk 取數範圍 -Tk 至 +Tk
   *         SwIs,Tc,Td
   *         case SwIs=0 ,不需要考慮 Tc,Td 參數
   *         a = tmsU.TakeARnd(-Tk, Tk, 0, 0, 0, 0)
   *         case SwIs=1 ,需要考慮 Tc,Td 參數,不包含Tc,Td 實點範圍內數值
   *         c = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0) //不包含零
   *         case SwIs=2 ,需要考慮 Tc,Td 參數,不等Tc,或Td 數值
   *         e = tmsU.TakeARnd(-Tk, Tk, 0, 2, 0, a) // 不包含零或a值
   */
    TakeARnd(Ta, Tb, Desm = 0, SwIs = 1, Tc = 0, Td = 0) //As Single
    {
        if ((Tb - Ta) == 0) return 0;
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
     ' ------ 分數的SwIs ：0  不允許整數(分母不為1)，1 允許整數，2 真分數，3 假分數, 4 整數
     ' Public Function TakeAFrc(k As Single, SwIs As Integer) As AFrc
     ' k = TakeARnd SwIs defaut = 2
    */
    TakeAFrc(k, SwIs = 2)//As AFrc
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
                case 4:
                    BL = false; b = 1; break;
                    break;
                default:
                    BL = Math.abs(a) <= Math.abs(b) || b == 1;
            }
        }
        f.Sgn = this.Sgn(a)                              //     ' 分母總為正, 從分子取得符號
        f.FenZ = Math.abs(a)                             //     ' 取的符號後，分子改為正
        f.FenM = b
        f.Val = f.Sgn * (f.FenZ / f.FenM)
        f.St = (f.Sgn * f.FenZ) + "/" + (f.FenM)
        if (f.FenM == 1) f.St = (f.Sgn * f.FenZ).toString();
        f.St1 = f.St;
        if (f.Sgn < 0 || f.FenM > 1) f.St1 = "(" + f.St + ")";
        return f
    }
    //調整式子格式: +x/+1x -> x ; -1x-> -x
    AdjExpFmt(St: string) {
        let calc_ = new TmsCalcu();
        let cc_x = calc_.Sytex_cclist_x(St);
        let s1 = "";
        for (let i = 0; i < cc_x.length; i++) {
            if (cc_x[i] == '1x') { s1 += "x"; }
            else if (cc_x[i] == '+x') { s1 += "x"; }
            else if (cc_x[i] == '+1x') { s1 += "x"; }
            else if (cc_x[i] == '-1x') { s1 += "-x"; }
            else if (cc_x[i] == "+" && cc_x[i + 1] == "-") { }
            else s1 += cc_x[i];
        }
        return s1;
    }
    AdjExpFmtList(cc_x: any) {
        let s1 = [];
        for (let i = 0; i < cc_x.length; i++) {
            if (cc_x[i] == '1x') { s1.push("x"); }
            else if (cc_x[i] == '+x') { s1.push("x"); }
            else if (cc_x[i] == '+1x') { s1.push("x"); }
            else if (cc_x[i] == '-1x') { s1.push("-x"); }
            else if (cc_x[i] == "+" && cc_x[i + 1] == "-") { }
            else s1.push(cc_x[i]);
        }
        return s1;
    }
    MJaxFmt(St: string) {
        var patt1 = /[(][-]*\d+[/][-]*\d+[)]/g;
        var result = St.match(patt1);
        if (result == null) { }
        else {
            for (let i = 0; i < result.length; i++) {
                let rstr = this.Replace(result[i], "(", " { ");
                rstr = this.Replace(rstr, ")", " } ");
                rstr = this.Replace(rstr, "/", " \\over ");
                St = St.replace(result[i], rstr);
            }
        }
        St = this.Replace(St, "*", " \\times ");
        St = this.Replace(St, "/", " \\div ");
        return St;
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
    FPlusF(Tf1: AFrc, Tf2: AFrc, Ts: string) {
        let a1: number, b1: number, a2: number, b2: number;//Int
        let u: number, v: number, n: number, f = new AFrc;  // u,v as single; n as int; f As AFrc
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
        let F1 = new AFrc(), a, b;
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
        for (let i = 0; i < Ss.length; i++) { s2 = Ss[i]; if (s2 != ' ') s1 += s2; }
        return s1;
    }
    /*' ----- 從位置 Start 開始，搜索 Ss 中，含Sa 中元素的位置 ----
      ' ------ 與 Instr不同，此處的Sa可含多個單字母元素，例如：“+,-,*,/" 運算子。 */
    InStr(s1, s2) { return s1.indexOf(s2);/* string.indexOf(searchvalue, start)*/ }
    InStr2(Start, Ss, Sa) { return Ss.indexOf(Sa, Start); }
    getRndInteger(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    Val(s) { return Number(s) }
    Int(s) { return Math.floor(s) }
    Str(x) { return x.toString(); }
    Sgn(x) { if (isNaN(x)) return NaN; if (x == -0) return -1; if (x == +0) return +1; if (x > 0) return +1; if (x < 0) return -1; }
    Abs(x) { return Math.abs(x); }
    Rnd() { return Math.random(); }
    Max(a, b) { return a > b ? a : b; }
    Min(a, b) { return a < b ? a : b; }
    Mid(Sd, a, b = -1) { let bb = b == -1 ? Sd.length - a : b; return Sd.substring(a, a + bb); }
    Left(Sd, a) { return Sd.substring(0, a); }
    Len(Sd) { return Sd.length; }
    Right(s1, n) { return s1.substring(s1.length - n); }
    Replace(str, find, replacewith) { var re = new RegExp("[" + find + "]", 'g'); return str.replace(re, replacewith); }
    Trim(str) { return str.replace(/^\s+|\s+$/gm, ''); }
    //轉換為 Double 數值
    CDbl(v) { Number(v); }
}

/////////////////////////Calcu//////////////
var KeySigns = {}
KeySigns['\t'] = 0;
KeySigns['\n'] = 0;
KeySigns['\r'] = 0;
KeySigns[';'] = -1;
KeySigns[' '] = 0;
KeySigns['='] = 1;
KeySigns['^'] = 6;
KeySigns['*'] = 4;
KeySigns['/'] = 5;
KeySigns['+'] = 3;
KeySigns['-'] = 3;
KeySigns[':'] = 2;
KeySigns[','] = 2;
class TmsCalcu {
    RunVMCalc(St) { alert("no implement!"); }
    RunExpr(St, VSet = { x: 1 }, trace = false) {
        let tmsU = new TmsUts();
        let St1 = St.toLowerCase();
        let Vkeys = Object.keys(VSet);
        console.log(Vkeys)
        for (let i = 0; i < Vkeys.length; i++) {
            let xKey = Vkeys[i];
            let xVal = VSet[xKey];
            let r_ = new RegExp(`[0-9]+${xKey}`, 'g');
            let mr_ = St1.match(r_)
            if (mr_)
                for (let j = 0; j < mr_.length; j++) {
                    let r_mr_ = mr_[j].replace(`${xKey}`, `*${xKey}`)
                    St1 = St1.replace(mr_[j], r_mr_)
                }
        }
        for (let i = 1; i < Vkeys.length; i++) {
            let xKey0 = Vkeys[i-1];
            let xKey1 = Vkeys[i];
            let r_ = new RegExp(`${xKey0}[ ]*${xKey1}`, 'g');
            let mr_ = St1.match(r_)
            if (mr_)
                for (let j = 0; j < mr_.length; j++) {
                    let r_mr_ = mr_[j].replace(`${xKey1}`, `*${xKey1}`)
                    St1 = St1.replace(mr_[j], r_mr_)
                }
        }        
        let bkeys = Vkeys.concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
        for (let i = 0; i < bkeys.length; i++) {
            let xKey = bkeys[i];
            let r_ = new RegExp(`${xKey}[(]`, 'g');
            let mr_ = St1.match(r_)
            if (mr_)
                for (let j = 0; j < mr_.length; j++) {
                    let r_mr_ = mr_[j].replace(`${xKey}(`, `${xKey}*(`)
                    St1 = St1.replace(mr_[j], r_mr_)
                }
        }
        for (let i = 0; i < Vkeys.length; i++) {
            let xKey = Vkeys[i];
            let xVal = VSet[xKey];
            let x_r = new RegExp(`${xKey}`, 'g');
            St1 = St1.replace(x_r, `${xVal}`)
        }
        console.log(St1)
        let cc_list1 = this.Sytex_cclist(St1);
        cc_list1 = tmsU.AdjExpFmtList(cc_list1);
        console.log(cc_list1)
        let yy1 = [];
        this.proc2opt(cc_list1, yy1);
        return this.exprCalc(yy1);
        return 0;
    }
    RunFrcExpr(St, VSet = { x: 1 }) {
        console.log(St);
        let cc_list = this.Sytex_cclist(St);
        console.log("cc_list", cc_list);
        let frc_yy = [];
        this.procfrc2opt(cc_list, frc_yy);
        console.log(frc_yy);
        let frc_val = this.exprfrcCalc(frc_yy); console.log("frc_val=", frc_val);
        return frc_val;
        return "-1/2";
    }
    //處理 二目運算符如 = + - * / ( ) 生成樹狀型式//static TreeItem
    proc2opt(l1, prenode) {
        let cnt = 0;
        while (l1.length == 1 && l1[0][0] == "(") {
            l1 = this.Sytex_cclist(l1[0].substring(1, l1[0].length - 1));
            cnt++; if (cnt > 10) break;
        }
        /*
          if(l1[0] == '(' && l1[l1.length - 1] == ')') {
              l1.splice(l1.length - 1, 1);
              l1.splice(0, 1);
          }*/
        if (l1.length <= 1) {
            prenode.push(l1[0]);
            return;
        }
        else {
            let opt_ = [];
            for (let si = 0; si < l1.length; si++) {
                let s = l1[si];
                if (s[0] == '(' && s[s.length - 1] == ')') {
                    this.proc2opt(this.Sytex_cclist(s), prenode);
                } else
                    if (s.length == 1 && Object.keys(KeySigns).indexOf(s) >= 0) {
                        if (opt_.length == 0) {
                            opt_.push(s);
                        }
                        else if (
                            KeySigns[s] <= KeySigns[opt_[opt_.length - 1]]
                        ) {
                            while (KeySigns[s] <= KeySigns[opt_[opt_.length - 1]]) {
                                prenode.push(opt_.pop());
                            }
                            opt_.push(s)

                        } else {
                            opt_.push(s)
                        }
                    }
                    else {
                        prenode.push(s);
                    }
            }
            while (opt_.length > 0) {
                prenode.push(opt_.pop())
            }
        }
    }

    Sytex_cclist(data, VSet = { x: 1 }, trace = false) {
        let cc_list = []
        let lcnt = 0;
        let blockOpt = 0;
        for (let j = 0; j < data.length; j++) {
            let c = data[j];

            switch (c) {
                case '(': ;
                    blockOpt += 10;
                    if (blockOpt == 10) { cc_list[lcnt] = c } else { cc_list[lcnt] += c; }
                    break;
                case ')': ;
                    blockOpt -= 10;
                    cc_list[lcnt] += c;
                    if (blockOpt == 0) {
                        //cc_list[lcnt]=cc_list[lcnt].substring(1,cc_list[lcnt].length - 1);
                        lcnt++;
                    }
                    break;
                case ':': break;
                case ',': break;
                case '\t': break;
                case '\n': break;
                case '\r': break;
                case ';': break;
                case ' ': break;
                case '=': break;
                case '^': ;
                case '*': ;
                case '/': ;
                case '+': ;
                case '-': ;
                    if (blockOpt > 0) { cc_list[lcnt] += c; } else { cc_list[lcnt++] = c; }
                    break;
                case '0': ;
                case '1': ;
                case '2': ;
                case '3': ;
                case '4': ;
                case '5': ;
                case '6': ;
                case '7': ;
                case '8': ;
                case '9': ;
                case '.': ;

                    if (blockOpt > 0) { cc_list[lcnt] += c; }
                    else if (lcnt == 1 && cc_list[lcnt - 1] == "-") {
                        cc_list[lcnt - 1] += c;
                    } else if (lcnt > 1 && cc_list[lcnt - 1] == "-" && cc_list[lcnt - 2] == "(") {
                        cc_list[lcnt - 1] += c;
                    }
                    else if (lcnt > 0 && /\d+|d+[.]|d+[.]d+/.test(cc_list[lcnt - 1])) {          // /\d+|d+[.]d+/.  
                        cc_list[lcnt - 1] += c;
                    } else {
                        cc_list[lcnt++] = c;
                    }
                    break;
                default:
                // cc_list[lcnt++]=c;                
            }
        }
        return cc_list;
    }
    Sytex_cclist_x(data, VSet = { x: 1 }, trace = false) {
        let Vkeys = Object.keys(VSet);
        let cc_list = []
        let lcnt = 0;
        let blockOpt = 0;
        for (let j = 0; j < data.length; j++) {
            let c = data[j];
            switch (c) {
                case '(': ;
                    blockOpt += 10;
                    if (blockOpt == 10) { cc_list[lcnt] = c } else { cc_list[lcnt] += c; }
                    break;
                case ')': ;
                    blockOpt -= 10;
                    cc_list[lcnt] += c;
                    if (blockOpt == 0) {
                        //cc_list[lcnt]=cc_list[lcnt].substring(1,cc_list[lcnt].length - 1);
                        lcnt++;
                    }
                    break;
                case ':': break;
                case ',': break;
                case '\t': break;
                case '\n': break;
                case '\r': break;
                case ';': break;
                case ' ': break;
                case '=': break;
                case '^': ;
                case '*': ;
                case '/': ;
                case '+': ;
                case '-': ;
                    if (blockOpt > 0) { cc_list[lcnt] += c; } else { cc_list[lcnt++] = c; }
                    break;
                case '0': ;
                case '1': ;
                case '2': ;
                case '3': ;
                case '4': ;
                case '5': ;
                case '6': ;
                case '7': ;
                case '8': ;
                case '9': ;
                case '.': ;
                case 'x': ;
                    if (blockOpt > 0) { cc_list[lcnt] += c; }
                    else if (lcnt == 1 && cc_list[lcnt - 1] == "-") {
                        cc_list[lcnt - 1] += c;
                    } else if (lcnt > 1 && cc_list[lcnt - 1] == "-" && cc_list[lcnt - 2] == "(") {
                        cc_list[lcnt - 1] += c;
                    }
                    else if (lcnt > 0 && /\d+|d+[.]|d+[.]d+/.test(cc_list[lcnt - 1])) {          // /\d+|d+[.]d+/.  
                        cc_list[lcnt - 1] += c;
                    } else {
                        cc_list[lcnt++] = c;
                    }
                    break;
                default:
            }
        }
        return cc_list;
    }
    exprCalc(expr) {
        let stuck = [];
        for (let i = 0; i < expr.length; i++) {
            let s = expr[i]
            stuck.push(s)
            if (Object.keys(KeySigns).indexOf(s) >= 0) {
                let opt = stuck.pop();
                let d2 = stuck.pop();
                let d1 = stuck.pop();
                let r = 0;
                switch (opt) {
                    case "+": r = Number(d1) + Number(d2); break;
                    case "-": r = Number(d1) - Number(d2); break;
                    case "*": r = Number(d1) * Number(d2); break;
                    case "/": r = Number(d1) / Number(d2); break;
                    case "^": r = Math.pow(Number(d1), Number(d2)); break;
                }
                stuck.push(r);
            }
        }
        return stuck.pop();
    }
    ///frc
    procfrc2opt(l1, prenode) {
        var patt1 = /^[(][+|-]*\d+[/][+|-]*\d+[)]$/g;
        let cnt = 0;
        while (l1.length == 1 && l1[0][0] == "(") {
            var result = l1[0].match(patt1);
            if (result == null) {
                l1 = this.Sytex_cclist(l1[0].substring(1, l1[0].length - 1));
                cnt++; if (cnt > 10) break;
            } else {
                //console.log(result)
                break;
            }
        }
        if (l1.length <= 1) {
            prenode.push(l1[0]);
            return;
        }
        else {
            let opt_ = [];
            for (let si = 0; si < l1.length; si++) {
                let s = l1[si];
                if (s[0] == '(' && s[s.length - 1] == ')') {
                    var result = s.match(patt1);
                    if (result == null) {
                        this.procfrc2opt(this.Sytex_cclist(s), prenode);
                    } else {
                        prenode.push(s);
                    }
                } else
                    if (s.length == 1 && Object.keys(KeySigns).indexOf(s) >= 0) {
                        if (opt_.length == 0) {
                            opt_.push(s);
                        }
                        else if (
                            KeySigns[s] <= KeySigns[opt_[opt_.length - 1]]
                        ) {
                            while (KeySigns[s] <= KeySigns[opt_[opt_.length - 1]]) {
                                prenode.push(opt_.pop());
                            }
                            opt_.push(s)
                        } else {
                            opt_.push(s)
                        }
                    }
                    else {
                        prenode.push(s);
                    }
            }
            while (opt_.length > 0) {
                prenode.push(opt_.pop())
            }
        }
    }
    Sgn(x) { if (isNaN(x)) return NaN; if (x == -0) return -1; if (x == +0) return +1; if (x > 0) return +1; if (x < 0) return -1; }
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
    TakeAB2Frc_(a: number, b: number, SwIs: number = 1)//As AFrc
    {
        let f = new AFrc();
        if (a == 0) { f.Sgn = 1; f.FenZ = 0; f.FenM = 1; f.Val = 0; f.St = "(0/1)"; return f; }
        let BL = true;
        while (BL) {
            let r = this.HCF(a, b);
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
        f.Sgn = this.Sgn(a * b)                              //      ' ·ÖÄ¸×ÜÎªÕý, ´Ó·Ö×ÓÈ¡µÃ·ûºÅ
        f.FenZ = Math.abs(a)                              //    ' È¡µÄ·ûºÅáá£¬·Ö×Ó¸ÄÎªÕý
        f.FenM = Math.abs(b)
        f.Val = f.Sgn * (f.FenZ / f.FenM)
        f.St = "(" + (f.Sgn * f.FenZ) + "/" + (f.FenM) + ")"
        return f
    }
    D2Frc(expr) {
        var patt_frc = /^[(][+|-]*\d+[/][+|-]*\d+[)]$/g;
        var patt_dec = /[+|-]*\d+/g;
        let r1 = expr.match(patt_frc);
        let r2 = expr.match(patt_dec);
        if (r1 == null && r2 == null) {
            throw `ERROR Number FORMAT ${expr}`;
        } else if (r1 == null && r2.length > 0) {
            let q = this.TakeAB2Frc_(Number(r2[0]), 1);
            return q;
        } else {
            let q = this.TakeAB2Frc_(Number(r2[0]), Number(r2[1]));
            return q;
        }
    }
    FPlusF(Tf1: AFrc, Tf2: AFrc, Ts = "+") {
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
        if (u == 0) { f.Sgn = 1; f.FenZ = 0; f.FenM = 1; f.Val = 0; f.St = "(0/1)"; return f; }
        f.Sgn = this.Sgn(u)                                                         //         ' ÌáÈ¡ºÍ(²î)µÄ·ûºÅ
        u = Math.abs(u)
        v = b1 * b2                                                             //         ' Í¨·ÖµÄ·ÖÄ¸
        n = this.HCF(u, v)
        u = u / n                                                               //              ' Ô¼·Ö
        v = v / n
        f.FenZ = u
        f.FenM = v
        f.Val = f.Sgn * (f.FenZ / f.FenM)
        f.St = "(" + (f.Sgn * f.FenZ) + "/" + f.FenM + ")"
        return f
    }
    FxF(Tf1: AFrc, Tf2: AFrc) {
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
        f.St = "(" + (f.Sgn * f.FenZ) + "/" + f.FenM + ")"
        return f
    }
    FdivF(Tf1: AFrc, Tf2: AFrc) {
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
    FPowN(Tf1: AFrc, Tf2: AFrc) {
        //Tf2.FenM = 1
        let f = new AFrc;
        let powN = Tf2.FenZ;
        if (Tf2.Sgn < 0) {
            let temp = Tf1.FenM;
            Tf1.FenM = Tf1.FenZ;
            Tf1.FenZ = temp;
            Tf2.Sgn = Tf2.Sgn * -1;
        }
        f.FenZ = Math.pow(Tf1.Sgn * Tf1.FenZ, powN)
        f.FenM = Math.pow(Tf1.FenM, powN)
        f.Sgn = this.Sgn(f.FenZ)
        f.FenZ = Math.abs(f.FenZ);
        f.Val = f.Sgn * (f.FenZ / f.FenM)
        f.St = "(" + (f.Sgn * f.FenZ) + "/" + f.FenM + ")"
        return f;
    }
    exprfrcCalc(expr) {
        let stuck = [];
        for (let i = 0; i < expr.length; i++) {
            let s = expr[i]
            stuck.push(s)
            if (Object.keys(KeySigns).indexOf(s) >= 0) {
                let opt = stuck.pop();
                let d2 = stuck.pop();
                let d1 = stuck.pop();
                let d1_ = this.D2Frc(d1);
                let d2_ = this.D2Frc(d2);
                let r = "(0/1)";
                switch (opt) {
                    case "+": r = this.FPlusF(d1_, d2_, "+").St; break;
                    case "-": r = this.FPlusF(d1_, d2_, "-").St; break;
                    case "*": r = this.FxF(d1_, d2_).St; break;
                    case "/": r = this.FdivF(d1_, d2_).St; break;
                    case "^": r = this.FPowN(d1_, d2_).St; break;
                }
                stuck.push(r);
            }
        }
        return stuck.pop();
    }
    simplifyFrc(st) {
        let f = this.D2Frc(st)
        return f.FenM == 1 ? f.Sgn * f.FenZ : st;
    }
    FracMark2Expr(vst, idx) {
        function fracFM(vst, idx) {
            let posi = [-1, -1]
            let lbcnt = 0;
            console.log(idx)
            if (idx > -1)
                for (let i = idx; i < vst.length; i++) {
                    console.log(i, vst[i]);
                    if (vst[i] === '{') { if (lbcnt == 0) { posi[0] = i; }; lbcnt++; }
                    else if (vst[i] === '}') { posi[1] = i; lbcnt--; if (lbcnt == 0) { break; } }
                }
            return ([posi[0], posi[1], vst.substring(posi[0], posi[1] + 1)]);
        }

        let fZ = fracFM(vst, idx + 5);
        console.log(fZ);
        console.log(fZ[1]);
        let fM = fracFM(vst, fZ[1] + 1);
        console.log(fM);
        return [vst.substring(idx, fM[1] + 1), ` ((${fZ[2]}) / (${fM[2]})) `];
    }
}
const calc = new TmsCalcu();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calc: calc, AFrc: AFrc, AExps: AExps, TmsUts: TmsUts, TmsCalcu: TmsCalcu };
}