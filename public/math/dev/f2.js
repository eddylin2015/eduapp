//Option Explicit
'use strict';
const { AExps, AFrc, TmsUts  } = require('./tmsUtils');
const tmsU=new TmsUts();
//Left, Replace, tmsU.TakeAFrc, Int, Rnd, Str, Trim, AllTrim, Right, DcmToFrc, CDbl
//' ------ Tx Tixing  題型
//' -------Tk Random_base -TK..TK ------
//Public Function CreatAExp( Tx As Integer,Tk As Single, Tx As Integer) As AExps
function CreateExp(Tx, Tk, Range) {
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
                TE.Nf[i] = tmsU.TakeAFrc(Tk, 0)
                TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 2]
                TSn[i] = tmsU.Str(TE.Nf[i].Sgn * TE.Nf[i].FenZ)
            }
            s1 = tmsU.Trim(TE.OPr[0])
            if (s1 == "+") TE.OPr[0] = ""
            i = tmsU.Int(100 * tmsU.Rnd()) % 4
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
                } else if (tmsU.Left(TSn[i], 1) == "-" && tmsU.Right(TE.OPr[i], 1) != "(") {
                    TSn[i] = "(" + TSn[i] + ")"
                }
                s1 = s1 + TE.OPr[i] + TSn[i];
            }
            s1 = s1 + TE.OPr[4]
            s1 = tmsU.AllTrim(s1)
            break;
        case 2:
            for (i = 0; i < 3; i++) {
                TE.Nf[i] = tmsU.TakeAFrc(Tk, 0)
                TE.Nf[i].FenZ = TE.Nf[i].Sgn * TE.Nf[i].FenZ
                TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 4]
                TSn[i] = "(" + tmsU.Trim(tmsU.Str(TE.Nf[i].FenZ) + "/" +tmsU. Str(TE.Nf[i].FenM)) + ")"
            }
            TE.OPr[0] = ""
            i = tmsU.Int(100 * tmsU.Rnd()) % 2
            if (i == 0) TE.OPr[0] = "-"
            i = tmsU.Int(100 * tmsU.Rnd()) % 3
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
                if ((tmsU.Left(TSn[i], 1) == "-") && (tmsU.Right(TE.OPr[i], 1) != "(")) { TSn[i] = "(" + TSn[i] + ")"; }
                s1 = s1 + TE.OPr[i] + TSn[i]
            }
            s1 = s1 + TE.OPr[3]
            s1 = tmsU.AllTrim(s1)
            break;
        case 3:
            for (i = 0; i < 4; i++) {
                TE.Nf[i] = tmsU.TakeAFrc(Tk, 0)            //
                TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 2] //        ' ²»È¡³Ë³ý, ·ÅÔÚÃ¿ÏîÖ®Ç°
                TSn[i] = tmsU.Trim(tmsU.Str(TE.Nf[i].Sgn * TE.Nf[i].FenZ))  //
            }
            s1 = tmsU.Trim(TE.OPr[0])
            if (s1 == "+") TE.OPr[0] = ""
            i = tmsU.Int(100 * tmsU.Rnd()) % 4                           //
            j = 2 + tmsU.Int(100 * tmsU.Rnd()) % 3                       //      ' Ö¸Êý·¶Î§ (2,3,4)
            k = 2 + tmsU.Int(100 * tmsU.Rnd()) % 3                       //      ' Ö¸Êý·¶Î§ (2,3,4)
            switch (i) {
                case 0:// ' +1+2+3^j+4
                    k = 1 + tmsU.Int(100 * tmsU.Rnd()) % 4
                    TE.OPr[k] = "^" + tmsU.Str(j) + TE.OPr[k]
                    break;
                case 1:// ' +1+(2+3)^j+4^k
                    TE.OPr[0] = TE.OPr[0] + "("
                    TE.OPr[2] = ")^" + tmsU.Str(j) + TE.OPr[2]
                    break;
                case 2://  ' +1+(2+3)^j+4^k
                    TE.OPr[1] = TE.OPr[1] + "("
                    TE.OPr[3] = ")^" + tmsU.Str(j) + TE.OPr[3]
                    TE.OPr[4] = "^" + tmsU.Str(k) + TE.OPr[4]
                    break;
                case 3:  //  ' +1^j+(2+(3+4)^k)
                    TE.OPr[1] = "^" + tmsU.Str(j) + TE.OPr[1] + "("
                    TE.OPr[4] = ")^" + tmsU.Str(k)
                    TE.OPr[2] = TE.OPr[2] + "("
                    TE.OPr[4] = TE.OPr[4] + ")"
                    break;
            }
            s1 = ""
            for (i = 0; i < 4; i++) {
                if (tmsU.Left(TSn[i], 1) == "-" && tmsU.Right(TE.OPr[i], 1) != "(") { TSn[i] = "(" + TSn[i] + ")"; }
                s1 = s1 + TE.OPr[i] + TSn[i]
            }
            s1 = s1 + TE.OPr[4]
            s1 = tmsU.AllTrim(s1)
            break;
        case 4:
            for (i = 0; i < 3; i++) {
                TE.Nf[i] = tmsU.TakeAFrc(Tk, 0)
                TE.Nf[i].FenZ = TE.Nf[i].Sgn * TE.Nf[i].FenZ
                TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 4]              //'  ·ÅÔÚÃ¿ÏîÖ®Ç°
                TSn[i] = tmsU.Trim(tmsU.Str(TE.Nf[i].FenZ) + "/" + tmsU.Str(TE.Nf[i].FenM))
            }
            if (TE.OPr[0] != "-") TE.OPr[0] = ""
            j = 2 + tmsU.Int(100 * tmsU.Rnd()) % 2                             //     ' Ö¸Êý·¶Î§ (2,3)
            k = 5 - j                                                //                   ' j,k ¸÷È¡2,3
            i = tmsU.Int(100 * tmsU.Rnd()) % 3
            switch (i)//                ' Ëæ»úÑ¡ÔñÀ¨»¡×´Ì¬£¨4ÖÖ)
            {
                case 0:                        //                    ' +1^j+2+3
                    TE.OPr[0] = TE.OPr[0] + "("
                    TE.OPr[1] = ")^" + tmsU.Str(j) + TE.OPr[1]
                    break;
                case 1:           //                    ' +(1+2)^j+3
                    TE.OPr[0] = TE.OPr[0] + "("
                    TE.OPr[2] = ")^" + tmsU.Str(j) + TE.OPr[2]
                    break;
                case 2:      //                     ' +1^j+(2+3)^k
                    TE.OPr[0] = TE.OPr[0] + "("
                    TE.OPr[1] = ")^" + tmsU.Str(j) + TE.OPr[1] + "("
                    TE.OPr[3] = ")^" + tmsU.Str(k)
                    break;
            }
            s1 = ""
            for (i = 0; i < 3; i++) {
                s1 = s1 + TE.OPr[i] + "(" + TSn[i] + ")"
            }
            s1 = s1 + TE.OPr[3]
            s1 = tmsU.AllTrim(s1)
            break;
    }
    TE.St = s1
    if (tmsU.Left(s1, 1) == "-") { s1 = "0" + s1 }
    s1 = tmsU.Replace(s1, Range["D15"], "*")
    s1 = tmsU.Replace(s1, Range["E15"], "/")
    Range["F115"] = s1
    Range["F116"] = "=" + s1
    TE.Val = Range["F116"]
    if (Tx == 2 || Tx == 4) {
        TF = tmsU.DcmToFrc(tmsU.CDbl(TE.Val), 0.000001)
        Range["K115"] = TF.Sgn * TF.FenZ
        Range["K116"] = TF.FenM
    }
    return TE
}
//______MAIN________________________________
function main(){
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
            //console.log(s1.St)
            console.log(s1.Val);
            //console.log(TiXing," St ",s1.St, "Val ",s1.Val," Val:",calcvm.calc(s1.Val)); // 42
        }
    }
}
}
main();
module.exports = {    example:main,    CreateExp:CreateExp,}
