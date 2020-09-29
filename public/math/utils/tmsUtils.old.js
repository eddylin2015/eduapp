var AFrc = /** @class */ (function () {
    function AFrc() {
        this.FenZ = 0;
        this.FenM = 0;
        this.Sgn = 0;
        this.Val = 0;
        this.St = "";
    }
    return AFrc;
}());
var AExps = /** @class */ (function () {
    function AExps() {
        this.Nf = [new AFrc(), new AFrc(), new AFrc(), new AFrc(), new AFrc()]; //  As AFrc                      ' 跪砐褫眕岆煦杅麼淕杅(fenzㄘ
        this.OPr = ["", "", "", "", ""]; // As String   ' 堍呾睫ㄗ嬤說睿硌杅)
        this.Val = 0; // As Single 
        this.St = ""; // As String   ' 等俴趼揹宒
    }
    return AExps;
}());
var TmsUts = /** @class */ (function () {
    function TmsUts() {
    }
    TmsUts.prototype.Val = function (s) { return Number(s); };
    TmsUts.prototype.Int = function (s) { return Math.floor(s); };
    TmsUts.prototype.Str = function (x) { return x.toString(); };
    TmsUts.prototype.Sgn = function (x) { if (isNaN(x))
        return NaN; if (x == -0)
        return -1; if (x == +0)
        return +1; if (x > 0)
        return +1; if (x < 0)
        return -1; };
    TmsUts.prototype.Abs = function (x) { return Math.abs(x); };
    TmsUts.prototype.Rnd = function () { return Math.random(); };
    TmsUts.prototype.Max = function (a, b) { return a > b ? a : b; };
    TmsUts.prototype.Min = function (a, b) { return a < b ? a : b; };
    TmsUts.prototype.Mid = function (Sd, a, b) {
        if (b === void 0) { b = -1; }
        var bb = b == -1 ? Sd.length - a : b;
        return Sd.substring(a, a + bb);
    };
    TmsUts.prototype.Left = function (Sd, a) { return Sd.substring(0, a); };
    TmsUts.prototype.Len = function (Sd) { return Sd.length; };
    TmsUts.prototype.InStr = function (s1, s2) { return s1.indexOf(s2); /* string.indexOf(searchvalue, start)*/ };
    TmsUts.prototype.InStr2 = function (Start, Ss, Sa) { return Ss.indexOf(Sa, Start); };
    TmsUts.prototype.Right = function (s1, n) { return s1.substring(s1.length - n); };
    TmsUts.prototype.Replace = function (str, find, replacewith) { var re = new RegExp("[" + find + "]", 'g'); return str.replace(re, replacewith); };
    TmsUts.prototype.Trim = function (str) { return str.replace(/^\s+|\s+$/gm, ''); };
    TmsUts.prototype.CDbl = function (v) { Number(v); };
    TmsUts.prototype.AllTrim = function (Ss) {
        var s1 = "", s2;
        for (var i = 0; i < Ss.length; i++) {
            s2 = Ss[i];
            if (s2 != ' ')
                s1 += s2;
        }
        return s1;
    };
    /*
    * TakeARnd : Take a Rnd
    * rang Ta - Tb    -10..10
    * Desm 10^Desm 取整的進位調整 default=0
    * [SwIs,Tc,Td] 0: ; 1: 非Tc..Td Range; other: not eq (Tc or  Td)
    *         a = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
    *         c = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
    *         e = tmsU.TakeARnd(-Tk, Tk, 0, 2, 0, a)
    */
    TmsUts.prototype.TakeARnd = function (Ta, Tb, Desm, SwIs, Tc, Td) {
        if ((Tb - Ta) == 0)
            return 0;
        var r;
        var BL = true;
        while (BL) {
            r = Math.random() * (Tb - Ta) + Ta;
            r = this.Int(r * 10 ^ Desm + 0.5) / 10 ^ Desm;
            switch (SwIs) {
                case 0:
                    BL = false;
                    break;
                case 1:
                    BL = (r >= Tc) && (r <= Td);
                    break;
                default: BL = (r == Tc) || (r == Td);
            }
        }
        return r;
    };
    //' ------------- Á½¸öÊýµÄ HCF ------------
    //' ------- i, j ¿ÉÒÔÎª¸º¿ÉÒÔÎª0£¬µ«HCF ×ÜÊÇÕýµÄ ------
    //Public Function HCF(i As Single, j As Single) As Single
    TmsUts.prototype.HCF = function (i, j) {
        var m, n, r, k;
        m = Math.abs(i);
        n = Math.abs(j);
        if (this.Sgn(m) * this.Sgn(n) == 0) {
            n = 1;
        }
        else {
            if (m < n) {
                r = m;
                m = n;
                n = r;
            }
            r = m % n;
            k = n;
            if (r > 0) {
                n = this.HCF(k, r);
            }
        }
        return n;
    };
    //' ------ ½¨¹¹Ò»¸öËæ»ú·ÖÊý,  ---------------
    //' ----- ·Ö×ÓÎª(-k , k) ÄÚµÄÕûÊý-------
    //' ------  ·ÖÊýµÄSwIs £º0  ²»ÔÊÐíÕûÊý£¬1 ÔÊÐíÕûÊý£¬2 Õæ·ÖÊý£¬3 ¼Ù·ÖÊý
    //'  ------Ëæ»úÊýµÄSwIs ÊÇ ÏÞÖÆ ¿ª¹Ø, 0 ²»ÏÞÖÆ, 1 ÏÞÖÆÇøÓò£¬ 2 ÏÞÖÆ2µã
    // Public Function TakeAFrc(k As Single, SwIs As Integer) As AFrc
    // k = tabeARnd    SwIs 0,1,2
    TmsUts.prototype.TakeAFrc = function (k, SwIs) {
        var a, b, c, r;
        var f = new AFrc, BL = true;
        while (BL) {
            a = this.TakeARnd(-k, k, 0, 1, 0, 0);
            b = this.TakeARnd(1, k, 0, 1, 0, 0);
            r = this.HCF(a, b);
            a = a / r;
            b = b / r;
            switch (SwIs) {
                case 0:
                    BL = b == 1;
                    break;
                case 1:
                    BL = false;
                    break;
                case 2:
                    BL = Math.abs(a) >= Math.abs(b) || b == 1;
                    break;
                default:
                    BL = Math.abs(a) <= Math.abs(b) || b == 1;
            }
        }
        f.Sgn = this.Sgn(a); //      ' ·ÖÄ¸×ÜÎªÕý, ´Ó·Ö×ÓÈ¡µÃ·ûºÅ
        f.FenZ = Math.abs(a); //    ' È¡µÄ·ûºÅáá£¬·Ö×Ó¸ÄÎªÕý
        f.FenM = b;
        f.Val = f.Sgn * (f.FenZ / f.FenM);
        f.St = (f.Sgn * f.FenZ) + "/" + (f.FenM);
        return f;
    };
    //' ------ ·ÖÊý³Ë·¨ ------
    //' ----- ·ÖÊý x ·ÖÊý -------
    //Public Function FxF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
    TmsUts.prototype.FxF = function (Tf1, Tf2) {
        var u, v, n, f = new AFrc; //u v as single; n:int; f as AFrc
        if (Tf1.Sgn == 0)
            Tf1.Sgn = 1;
        if (Tf2.Sgn == 0)
            Tf2.Sgn = 1;
        f.Sgn = Tf1.Sgn * Tf2.Sgn;
        u = Tf1.FenZ * Tf2.FenZ;
        v = Tf1.FenM * Tf2.FenM;
        n = this.HCF(u, v);
        u = u / n;
        v = v / n;
        f.FenZ = u;
        f.FenM = v;
        f.Val = f.Sgn * (f.FenZ / f.FenM);
        f.St = this.AllTrim(this.Str(f.Sgn * f.FenZ) + "/ " + this.Str(f.FenM));
        return f;
    };
    //' ------ ·ÖÊý³ý·¨ ------
    //' ----- ·ÖÊý /·ÖÊý -------
    //Public Function FdivF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
    TmsUts.prototype.FdivF = function (Tf1, Tf2) {
        var u, v, n;
        var F1, F2;
        if (Tf1.Sgn == 0)
            Tf1.Sgn = 1;
        if (Tf2.Sgn == 0)
            Tf2.Sgn = 1;
        F2 = Tf2;
        u = F2.FenZ;
        v = F2.FenM;
        F2.FenZ = v;
        F2.FenM = u;
        return this.FxF(Tf1, F2);
    };
    //' ------ Ð¡Êý»¯·ÖÊý£¬ Eps Îó²î ------
    //Public Function DcmToFrc(Ta As Double, Eps As Single) As AFrc
    TmsUts.prototype.DcmToFrc = function (Ta, Eps) {
        var F1 = new AFrc(), a, b;
        var u, v;
        var i, j, k;
        var s1;
        F1.Sgn = this.Sgn(Ta);
        a = this.Abs(Ta);
        if (this.Abs(Ta - this.Int(Ta)) <= Eps) {
            F1.FenZ = a;
            F1.FenM = 1;
            F1.Val = Ta;
        }
        else if (Eps == 0) {
            s1 = this.Trim(this.Str(a));
            i = this.InStr(s1, ".");
            j = this.Len(this.Mid(s1, i + 1));
            u = a * 10 ^ j;
            v = 10 ^ j;
            j = this.HCF(u, v);
            u = u / j;
            v = v / j;
            F1.FenZ = u;
            F1.FenM = v;
            F1.Val = F1.Sgn * (F1.FenZ / F1.FenM);
        }
        else {
            k = this.Int(a);
            a = a - k;
            u = 1;
            v = 1;
            b = u / v + a;
            while (this.Abs(b - a) > Eps) {
                if (b < a) {
                    u = u + 1;
                }
                else {
                    v = v + 1;
                }
                b = u / v;
            }
            F1.FenZ = k * v + u;
            F1.FenM = v;
            F1.Val = F1.Sgn * F1.FenZ / F1.FenM;
            F1.St = this.Str(F1.Sgn * F1.FenZ) + "/" + this.Str(F1.FenM);
        }
        return F1;
    };
    //' ------ ·ÖÊý¼Ó·¨ ---------------
    //' ------- Ts ÊÇ ¡À ºÅ
    //Public Function FPlusF(Tf1 As AFrc, Tf2 As AFrc, Ts As String) As AFrc
    TmsUts.prototype.FPlusF = function (Tf1, Tf2, Ts) {
        var a1, b1, a2, b2; //Int
        var u, v, n, f = new AFrc; // u,v as single; n as int; f As AFrc
        if (Tf1.Sgn == 0)
            Tf1.Sgn = 1;
        if (Tf2.Sgn == 0)
            Tf2.Sgn = 1;
        a1 = Tf1.Sgn * Tf1.FenZ; //     ' ½«·ûºÅ¼Óµ½·Ö×ÓÉÏ
        b1 = Tf1.FenM;
        a2 = Tf2.Sgn * Tf2.FenZ;
        b2 = Tf2.FenM;
        if (Ts == "+") {
            u = a1 * b2 + a2 * b1; //         ' Í¨·Ö¼Ó¼õááµÄ·Ö×Ó¼ÆËã
        }
        else {
            u = a1 * b2 - a2 * b1; //         ' Í¨·Ö¼Ó¼õááµÄ·Ö×Ó¼ÆËã
        }
        f.Sgn = this.Sgn(u); //         ' ÌáÈ¡ºÍ(²î)µÄ·ûºÅ
        u = this.Abs(u);
        v = b1 * b2; //         ' Í¨·ÖµÄ·ÖÄ¸
        n = this.HCF(u, v);
        u = u / n; //              ' Ô¼·Ö
        v = v / n;
        f.FenZ = u;
        f.FenM = v;
        f.Val = f.Sgn * (f.FenZ / f.FenM);
        f.St = this.AllTrim(this.Str(f.Sgn * f.FenZ) + "/" + this.Str(f.FenM));
        return f;
    };
    TmsUts.prototype.HCF2 = function (Ts) {
        var m, n, r;
        var Ss = [];
        var s1, s2;
        var i, j, k, sn;
        s1 = Ts;
        if (this.Right(s1, 1) != ",")
            s1 = s1 + ",";
        var Sn = 0;
        while (s1 != "") {
            i = this.InStr(s1, ",");
            s2 = this.Left(s1, i - 1);
            Sn = Sn + 1;
            //ReDim Preserve Ss(Sn)
            Ss[Sn] = this.Abs(this.Val(s2));
            s1 = this.Mid(s1, i + 1);
        }
        for (i = 1; i < Sn - 1; i++)
            for (j = i + 1; j < Sn; j++) {
                if (Ss[j] < Ss[i]) {
                    k = Ss[i];
                    Ss[i] = Ss[j];
                    Ss[j] = k;
                }
            }
        n = Ss[1];
        for (i = 2; i < Sn; i++) {
            m = Ss[i];
            if (this.Sgn(m) * this.Sgn(n) == 0) {
                n = 1;
            }
            else {
                r = m % n;
                if (r > 0)
                    n = this.HCF(n, r);
            }
        }
        return n;
    };
    //' ------ ÕûÀíÒ»´ÎÊ½ £¬³É×Ö´®±í´ïÊ½-----
    //' ------ a/b x + c/d ------------
    //' ------ 2/3 x + 4/6 ==> 2(x+1)/3
    //Public Function PlasticAEq(Ta As Single, Tb As Single, Tc As Single, Td As Single) As String
    TmsUts.prototype.PlasticAEq = function (Ta, Tb, Tc, Td) {
        var a, b, c, d, k1, k2, p; //as singel
        var s1, s2, Fh; //as string
        a = Ta;
        b = Tb;
        c = Tc;
        d = Td;
        if (b == 1 && d == 1) {
            p = this.Sgn(a);
            k1 = this.HCF(a, c);
            a = a / k1 * p;
            c = c / k1 * p;
            k1 = k1 * p;
            s1 = this.Str(c);
            if (c > 0) {
                s1 = "+" + s1;
            }
            s1 = "x" + s1;
            if (a == -1) {
                s1 = "-" + s1;
            }
            else if (a != 1) {
                s1 = this.Str(a) + s1;
            }
            if (k1 == -1) {
                s1 = "-" + "(" + s1 + ")";
            }
            else if (k1 != 1) {
                s1 = this.Str(k1) + "(" + s1 + ")";
            }
        }
        return this.AllTrim(s1);
    };
    //' ------ ÔÚSsÖÐÑ°ÕÒs1, Èç¹ûs1Ç°ÃæÒ»¸ö·ûºÅÔÚs2ÖÐ£¬ÔòÔÚs1Ç°²åÈëSk ---
    //' ------ Àý£º Ss="3x+1", ÒªÔÚxÇ°²åÈëÒ»¸ö"*"
    //' ------ s2="0,1,2,3,4,5,6,7,8,9,"
    //' ------ Ss=IntoStr(Ss,"x","*",s2)   ==> Ss = 3*x+1    (ÓÉ²»¿ÉÔËËã±ä³É¿ÉÔËËã)
    TmsUts.prototype.IntoStr = function (Ss, s1, Sk, s2) {
        var i, j, Sd, St;
        try {
            Sd = Ss;
            i = 1;
            j = 0;
            while (i > 0) {
                i = this.InStr2(j + 1, Sd, s1);
                if (i > 1) {
                    St = this.Mid(Sd, i - 1, 1) + ",";
                    if (this.InStr(s2, St) > 0)
                        Sd = this.Left(Sd, i - 1) + Sk + this.Mid(Sd, i);
                }
                j = i + 1;
            }
            return Sd;
        }
        catch (e) { }
    };
    TmsUts.prototype.getRndInteger = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };
    return TmsUts;
}());
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AFrc: AFrc, AExps: AExps, TmsUts: TmsUts };
}
