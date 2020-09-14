'use strict';
//import calc from './calcvm.js'
//import { AExps, AFrc, Left, Replace, TakeAFrc, Int, Rnd, Str, Trim, AllTrim, Right, DcmToFrc, CDbl } from './vba.js';
//' ------ Tx Tixing  題型
//' -------Tk Random_base -TK..TK ------
//Public Function CreatAExp( Tx As Integer,Tk As Single, Tx As Integer) As AExps
function CreatAEq(Tx, Tk, Range) {
    let TE = new AExps();
    let TOp = ["", "", "", ""];
    let TF = new AFrc();
    let TSn = ["", "", "", ""];
    let i = 0, j = 0, k = 0, s1 = "", s2 = "";
    TOp[0] = "+"
    TOp[1] = "-"
    TOp[2] = Range["D15"]
    TOp[3] = Range["E15"]
    switch (Tx) {
        case 1:
            for (i = 0; i < 4; i++) {
                TE.Nf[i] = TakeAFrc(Tk, 0)
                TE.OPr[i] = TOp[Int(100 * Rnd()) % 2]
                TSn[i] = Str(TE.Nf[i].Sgn * TE.Nf[i].FenZ)
            }
            s1 = Trim(TE.OPr[0])
            if (s1 == "+") TE.OPr[0] = ""
            i = Int(100 * Rnd()) % 4
            switch (i) {
                case 0:                    // ' +1+2+3+4
                    break;
                case 1://' +(1+2)+3+4
                    TE.OPr[0] = TE.OPr[0] + "("
                    TE.OPr[2] = ")" + TE.OPr[2]
                    break;
                case 2:// ' +1+(2+3)+4
                    TE.OPr[1] = TE.OPr[1] + "("
                    TE.OPr[3] = ")" + TE.OPr[3]
                    break;
                case 3://  ' +1+(2+(3+4))
                    TE.OPr[1] = TE.OPr[1] + "("
                    TE.OPr[4] = ")" + TE.OPr[4]
                    TE.OPr[2] = TE.OPr[2] + "("
                    TE.OPr[4] = ")" + TE.OPr[4]
                    break;
            }
            s1 = ""
            for (i = 0; i < 4; i++) {
                if (i == 0) {
                    if (TE.OPr[i] == '-' && TSn[i] < 0) TSn[i] = "(" + TSn[i] + ")";
                } else if (Left(TSn[i], 1) == "-" && Right(TE.OPr[i], 1) != "(") {
                    TSn[i] = "(" + TSn[i] + ")"
                }
                s1 = s1 + TE.OPr[i] + TSn[i];
            }
            s1 = s1 + TE.OPr[4]
            s1 = AllTrim(s1)
            break;
        case 2:
            for (i = 0; i < 3; i++) {
                TE.Nf[i] = TakeAFrc(Tk, 0)
                TE.Nf[i].FenZ = TE.Nf[i].Sgn * TE.Nf[i].FenZ
                TE.OPr[i] = TOp[Int(100 * Rnd()) % 4]
                TSn[i] = "(" + Trim(Str(TE.Nf[i].FenZ) + "/" + Str(TE.Nf[i].FenM)) + ")"
            }
            TE.OPr[0] = ""
            i = Int(100 * Rnd()) % 2
            if (i == 0) TE.OPr[0] = "-"
            i = Int(100 * Rnd()) % 3
            switch (i) {
                case 0:// ' +1+2+3
                case 1:// ' +(1+2)+3
                    TE.OPr[0] = TE.OPr[0] + "("
                    TE.OPr[2] = ")" + TE.OPr[2]
                    break;
                case 2:// ' +1+(2+3)
                    TE.OPr[1] = TE.OPr[1] + "("
                    TE.OPr[3] = ") " + TE.OPr[3]
                    break;
            }
            s1 = ""
            for (i = 0; i < 3; i++) {
                if ((Left(TSn[i], 1) == "-") && (Right(TE.OPr[i], 1) != "(")) { TSn[i] = "(" + TSn[i] + ")"; }
                s1 = s1 + TE.OPr[i] + TSn[i]
            }
            s1 = s1 + TE.OPr[3]
            s1 = AllTrim(s1)
            break;
        case 3:
            for (i = 0; i < 4; i++) {
                TE.Nf[i] = TakeAFrc(Tk, 0)            //
                TE.OPr[i] = TOp[Int(100 * Rnd()) % 2] //        ' ²»È¡³Ë³ý, ·ÅÔÚÃ¿ÏîÖ®Ç°
                TSn[i] = Trim(Str(TE.Nf[i].Sgn * TE.Nf[i].FenZ))  //
            }
            s1 = Trim(TE.OPr[0])
            if (s1 == "+") TE.OPr[0] = ""
            i = Int(100 * Rnd()) % 4                           //
            j = 2 + Int(100 * Rnd()) % 3                       //      ' Ö¸Êý·¶Î§ (2,3,4)
            k = 2 + Int(100 * Rnd()) % 3                       //      ' Ö¸Êý·¶Î§ (2,3,4)
            switch (i) {
                case 0:// ' +1+2+3^j+4
                    k = 1 + Int(100 * Rnd()) % 4
                    TE.OPr[k] = "^" + Str(j) + TE.OPr[k]
                    break;
                case 1:// ' +1+(2+3)^j+4^k
                    TE.OPr[0] = TE.OPr[0] + "("
                    TE.OPr[2] = ")^" + Str(j) + TE.OPr[2]
                    break;
                case 2://  ' +1+(2+3)^j+4^k
                    TE.OPr[1] = TE.OPr[1] + "("
                    TE.OPr[3] = ")^" + Str(j) + TE.OPr[3]
                    TE.OPr[4] = "^" + Str(k) + TE.OPr[4]
                    break;
                case 3:  //  ' +1^j+(2+(3+4)^k)
                    TE.OPr[1] = "^" + Str(j) + TE.OPr[1] + "("
                    TE.OPr[4] = ")^" + Str(k)
                    TE.OPr[2] = TE.OPr[2] + "("
                    TE.OPr[4] = TE.OPr[4] + ")"
                    break;
            }
            s1 = ""
            for (i = 0; i < 4; i++) {
                if (Left(TSn[i], 1) == "-" && Right(TE.OPr[i], 1) != "(") { TSn[i] = "(" + TSn[i] + ")"; }
                s1 = s1 + TE.OPr[i] + TSn[i]
            }
            s1 = s1 + TE.OPr[4]
            s1 = AllTrim(s1)
            break;
        case 4:
            for (i = 0; i < 3; i++) {
                TE.Nf[i] = TakeAFrc(Tk, 0)
                TE.Nf[i].FenZ = TE.Nf[i].Sgn * TE.Nf[i].FenZ
                TE.OPr[i] = TOp[Int(100 * Rnd()) % 4]              //'  ·ÅÔÚÃ¿ÏîÖ®Ç°
                TSn[i] = Trim(Str(TE.Nf[i].FenZ) + "/" + Str(TE.Nf[i].FenM))
            }
            if (TE.OPr[0] != "-") TE.OPr[0] = ""
            j = 2 + Int(100 * Rnd()) % 2                             //     ' Ö¸Êý·¶Î§ (2,3)
            k = 5 - j                                                //                   ' j,k ¸÷È¡2,3
            i = Int(100 * Rnd()) % 3
            switch (i)//                ' Ëæ»úÑ¡ÔñÀ¨»¡×´Ì¬£¨4ÖÖ)
            {
                case 0:                        //                    ' +1^j+2+3
                    TE.OPr[0] = TE.OPr[0] + "("
                    TE.OPr[1] = ")^" + Str(j) + TE.OPr[1]
                    break;
                case 1:           //                    ' +(1+2)^j+3
                    TE.OPr[0] = TE.OPr[0] + "("
                    TE.OPr[2] = ")^" + Str(j) + TE.OPr[2]
                    break;
                case 2:      //                     ' +1^j+(2+3)^k
                    TE.OPr[0] = TE.OPr[0] + "("
                    TE.OPr[1] = ")^" + Str(j) + TE.OPr[1] + "("
                    TE.OPr[3] = ")^" + Str(k)
                    break;
            }
            s1 = ""
            for (i = 0; i < 3; i++) {
                s1 = s1 + TE.OPr[i] + "(" + TSn[i] + ")"
            }
            s1 = s1 + TE.OPr[3]
            s1 = AllTrim(s1)
            break;
    }
    TE.St=s1;
    var patt1 = /[(][-]*\d+[/][-]*\d+[)]/g;
    var result = s1.match(patt1);
    if(result==null) {}
    else{
       for(let i=0;i<result.length;i++){
           let rstr=Replace(result[i],"("," { ");
           rstr=Replace(rstr,")"," } ");
           rstr=Replace(rstr,"/"," \\over ");
           TE.St=TE.St.replace(result[i],rstr)
       }
    }
    TE.St =Replace( TE.St , Range["D15"], " \\times ")
    TE.St =Replace( TE.St , Range["E15"], " \\div ")
    if (Left(s1, 1) == "-") { s1 = "0" + s1 }
    s1 = Replace(s1, Range["D15"], "*")
    s1 = Replace(s1, Range["E15"], "/")
    Range["F115"] = s1
    Range["F116"] = "=" + s1
    TE.Val = Range["F116"]
    if (Tx == 2 || Tx == 4) {
        TF = DcmToFrc(CDbl(TE.Val), 0.000001)
        Range["K115"] = TF.Sgn * TF.FenZ
        Range["K116"] = TF.FenM
    }
    let cc_list = calc.Sytex_cclist(TE.Val)
    let yy = []
    calc.proc2opt(cc_list, yy);
    TE.CalcVal  = calc.exprCalc(yy);
    return TE
}
//______MAIN________________________________
function Main() {
    if (true) {
        //  TX TiXing[  1 2 3 4]
        //  TakeARand (Tk,-Tk)
        for (let i = 0; i < 100; i++) {
            let Tk_Arr = [0, 19, 9, 7, 5]
            for (let TiXing = 1; TiXing < 5; TiXing++) {
                //console.log("TiXing:",TiXing);
                let Range = {}
                Range["D15"] = "*"
                Range["E15"] = "%"
                //  let s1 = CreatAEq(TiXing, 9,Range)
                let s1 = CreateExp(TiXing, Tk_Arr[TiXing], Range)
                console.log(s1.St)
                console.log(s1.Val);
                //
                let cc_list = calc.Sytex_cclist(s1.Val)
                let yy = []
                calc.proc2opt(cc_list, yy);
                console.log("ex", calc.exprCalc(yy));
                //console.log(TiXing," St ",s1.St, "Val ",s1.Val," Val:",calcvm.calc(s1.Val)); // 42
            }
        }
    }
}
//CreatAEq=CreateExp 
//xport {CreateExp,CreateExp as CreatAEq }