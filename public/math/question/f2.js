//Option Explicit
///////////
//有理數運算
///////////
'use strict';
if (typeof module !== 'undefined' && module.exports) {
    var { AFrc, AExps, TmsUts } = require('../utils/tmsUtils'); 
    var { VMCalc } = require("../utils/tmsCalcu"); 
    var calc = require("../utils/tmsCalcu").calc;
    //var { UIMathClass } = require('../tmsUIMathClass'); 
}
const tmsU = new TmsUts();

//Left, Replace, tmsU.TakeAFrc, Int, Rnd, Str, Trim, AllTrim, Right, DcmToFrc, CDbl
//' ------ Tx Tixing  題型
//' -------Tk Random_base -TK..TK ------
//Public Function CreatAExp( Tx As Integer,Tk As Single, Tx As Integer) As AExps
function CreatAEq(Tx, Tk, Range) {
    let TE = new AExps();
    let TOp = ["", "", "", ""];
    let TF = new AFrc();
    let TSn = ["", "", "", ""];
    let i = 0, j = 0, k = 0, s1 = "", s2 = "";
    TOp[0] = "+";
    TOp[1] = "-";
    TOp[2] = Range["D15"];
    TOp[3] = Range["E15"];
    switch (Tx) {
        case 1:
            for (i = 0; i < 4; i++) {
                TE.Nf[i] = tmsU.TakeAFrc(Tk, 0);
                TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 2];
                TSn[i] = tmsU.Str(TE.Nf[i].Sgn * TE.Nf[i].FenZ);
            }
            s1 = tmsU.Trim(TE.OPr[0]);
            if (s1 == "+") TE.OPr[0] = "";
            i = tmsU.Int(100 * tmsU.Rnd()) % 4;
            switch (i) {
                case 0:                    // ' +1+2+3+4
                    break;
                case 1://' +(1+2)+3+4
                    TE.OPr[0] = TE.OPr[0] + "(";
                    TE.OPr[2] = ")" + TE.OPr[2];
                    break;
                case 2:// ' +1+(2+3)+4
                    TE.OPr[1] = TE.OPr[1] + "(";
                    TE.OPr[3] = ")" + TE.OPr[3];
                    break;
                case 3://  ' +1+(2+(3+4))
                    TE.OPr[1] = TE.OPr[1] + "(";
                    TE.OPr[4] = ")" + TE.OPr[4];
                    TE.OPr[2] = TE.OPr[2] + "(";
                    TE.OPr[4] = ")" + TE.OPr[4];
                    break;
            }
            s1 = ""
            for (i = 0; i < 4; i++) {
                if (i == 0) {
                    if (TE.OPr[i] == '-' && TSn[i] < 0) TSn[i] = "(" + TSn[i] + ")";
                } else if (tmsU.Left(TSn[i], 1) == "-" && tmsU.Right(TE.OPr[i], 1) != "(") {
                    TSn[i] = "(" + TSn[i] + ")";
                }
                s1 = s1 + TE.OPr[i] + TSn[i];
            }
            s1 = s1 + TE.OPr[4];
            s1 = tmsU.AllTrim(s1);
            break;
        case 2:
            for (i = 0; i < 3; i++) {
                TE.Nf[i] = tmsU.TakeAFrc(Tk, 0);
                TE.Nf[i].FenZ = TE.Nf[i].Sgn * TE.Nf[i].FenZ;
                TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 4];
                TSn[i] = "(" + tmsU.Trim(tmsU.Str(TE.Nf[i].FenZ) + "/" + tmsU.Str(TE.Nf[i].FenM)) + ")";
            }
            TE.OPr[0] = "";
            i = tmsU.Int(100 * tmsU.Rnd()) % 2;
            if (i == 0) TE.OPr[0] = "-";
            i = tmsU.Int(100 * tmsU.Rnd()) % 3;
            switch (i) {
                case 0:// ' +1+2+3
                case 1:// ' +(1+2)+3
                    TE.OPr[0] = TE.OPr[0] + "(";
                    TE.OPr[2] = ")" + TE.OPr[2];
                    break;
                case 2:// ' +1+(2+3)
                    TE.OPr[1] = TE.OPr[1] + "(";
                    TE.OPr[3] = ") " + TE.OPr[3];
                    break;
            }
            s1 = ""
            for (i = 0; i < 3; i++) {
                if ((tmsU.Left(TSn[i], 1) == "-") && (tmsU.Right(TE.OPr[i], 1) != "(")) { TSn[i] = "(" + TSn[i] + ")"; }
                s1 = s1 + TE.OPr[i] + TSn[i];
            }
            s1 = s1 + TE.OPr[3];
            s1 = tmsU.AllTrim(s1);
            break;
        case 3:
            for (i = 0; i < 4; i++) {
                TE.Nf[i] = tmsU.TakeAFrc(Tk, 0) ;           //
                TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 2]; //        ' ²»È¡³Ë³ý, ·ÅÔÚÃ¿ÏîÖ®Ç°
                TSn[i] = tmsU.Trim(tmsU.Str(TE.Nf[i].Sgn * TE.Nf[i].FenZ));  //
            }
            s1 = tmsU.Trim(TE.OPr[0]);
            if (s1 == "+") TE.OPr[0] = "";
            i = tmsU.Int(100 * tmsU.Rnd()) % 4 ;                          //
            j = 2 + tmsU.Int(100 * tmsU.Rnd()) % 3  ;                     //      ' Ö¸Êý·¶Î§ (2,3,4)
            k = 2 + tmsU.Int(100 * tmsU.Rnd()) % 3  ;                     //      ' Ö¸Êý·¶Î§ (2,3,4)
            switch (i) {
                case 0:// ' +1+2+3^j+4
                    k = 1 + tmsU.Int(100 * tmsU.Rnd()) % 4;
                    TE.OPr[k] = "^" + tmsU.Str(j) + TE.OPr[k];
                    break;
                case 1:// ' +1+(2+3)^j+4^k
                    TE.OPr[0] = TE.OPr[0] + "(";
                    TE.OPr[2] = ")^" + tmsU.Str(j) + TE.OPr[2];
                    break;
                case 2://  ' +1+(2+3)^j+4^k
                    TE.OPr[1] = TE.OPr[1] + "(";
                    TE.OPr[3] = ")^" + tmsU.Str(j) + TE.OPr[3];
                    TE.OPr[4] = "^" + tmsU.Str(k) + TE.OPr[4];
                    break;
                case 3:  //  ' +1^j+(2+(3+4)^k)
                    TE.OPr[1] = "^" + tmsU.Str(j) + TE.OPr[1] + "(";
                    TE.OPr[4] = ")^" + tmsU.Str(k);
                    TE.OPr[2] = TE.OPr[2] + "(";
                    TE.OPr[4] = TE.OPr[4] + ")";
                    break;
            }
            s1 = "";
            for (i = 0; i < 4; i++) {
                if (tmsU.Left(TSn[i], 1) == "-" && tmsU.Right(TE.OPr[i], 1) != "(") { TSn[i] = "(" + TSn[i] + ")"; }
                s1 = s1 + TE.OPr[i] + TSn[i];
            }
            s1 = s1 + TE.OPr[4];
            s1 = tmsU.AllTrim(s1);
            break;
        case 4:
            for (i = 0; i < 3; i++) {
                TE.Nf[i] = tmsU.TakeAFrc(Tk, 0);
                TE.Nf[i].FenZ = TE.Nf[i].Sgn * TE.Nf[i].FenZ;
                TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 4];              //'  ·ÅÔÚÃ¿ÏîÖ®Ç°
                TSn[i] = tmsU.Trim(tmsU.Str(TE.Nf[i].FenZ) + "/" + tmsU.Str(TE.Nf[i].FenM));
            }
            if (TE.OPr[0] != "-") TE.OPr[0] = "";
            j = 2 + tmsU.Int(100 * tmsU.Rnd()) % 2;                             //     ' Ö¸Êý·¶Î§ (2,3)
            k = 5 - j ;                                               //                   ' j,k ¸÷È¡2,3
            i = tmsU.Int(100 * tmsU.Rnd()) % 3;
            switch (i)//                ' Ëæ»úÑ¡ÔñÀ¨»¡×´Ì¬£¨4ÖÖ)
            {
                case 0:                        //                    ' +1^j+2+3
                    TE.OPr[0] = TE.OPr[0] + "(";
                    TE.OPr[1] = ")^" + tmsU.Str(j) + TE.OPr[1];
                    break;
                case 1:           //                    ' +(1+2)^j+3
                    TE.OPr[0] = TE.OPr[0] + "(";
                    TE.OPr[2] = ")^" + tmsU.Str(j) + TE.OPr[2];
                    break;
                case 2:      //                     ' +1^j+(2+3)^k
                    TE.OPr[0] = TE.OPr[0] + "(";
                    TE.OPr[1] = ")^" + tmsU.Str(j) + TE.OPr[1] + "(";
                    TE.OPr[3] = ")^" + tmsU.Str(k);
                    break;
            }
            s1 = "";
            for (i = 0; i < 3; i++) {
                s1 = s1 + TE.OPr[i] + "(" + TSn[i] + ")";
            }
            s1 = s1 + TE.OPr[3];
            s1 = tmsU.AllTrim(s1);
            break;
    }
    TE.St = s1;
    var patt1 = /[(][-]*\d+[/][-]*\d+[)]/g;
    var result = s1.match(patt1);
    if (result == null) { }
    else {
        for (let i = 0; i < result.length; i++) {
            let rstr = tmsU.Replace(result[i], "(", " { ");
            rstr = tmsU.Replace(rstr, ")", " } ");
            rstr = tmsU.Replace(rstr, "/", " \\over ");
            TE.St = TE.St.replace(result[i], rstr);
        }
    }
    TE.St = tmsU.Replace(TE.St, Range["D15"], " \\times ");
    TE.St = tmsU.Replace(TE.St, Range["E15"], " \\div ");
    if (tmsU.Left(s1, 1) == "-") { s1 = "0" + s1 }
    s1 = tmsU.Replace(s1, Range["D15"], "*");
    s1 = tmsU.Replace(s1, Range["E15"], "/");
    Range["F115"] = s1;
    Range["F116"] = "=" + s1;
    TE.Val = Range["F116"];
    if (Tx == 2 || Tx == 4) {
        TF = tmsU.DcmToFrc(tmsU.CDbl(TE.Val), 0.000001)
        Range["K115"] = TF.Sgn * TF.FenZ;
        Range["K116"] = TF.FenM;
    }
    let cc_list = calc.Sytex_cclist(TE.Val);
    let yy = [];
    calc.proc2opt(cc_list, yy);
    TE.CalcVal = calc.exprCalc(yy);
    return TE
}
//______MAIN________________________________
function calc_expr(expr){
    /*
    let cc_list = calc.Sytex_cclist(expr);
    let yy = [];
    calc.proc2opt(cc_list, yy);
    let val=calc.exprCalc(yy); 
    let vmval=VMCalc(expr);
    if(Math.abs(val-vmval)>0.000001) throw `${val} ${vmval} ERROR VM`;
    return val;
    */
   return false;
}
function calc_frc_expr(expr){
    console.log(expr);
    let cc_list = calc.Sytex_cclist(expr);
    console.log("cc_list",cc_list);
    let frc_yy = [];
    calc.procfrc2opt(cc_list, frc_yy);
    console.log(frc_yy);
    let frc_val=calc.exprfrcCalc(frc_yy); console.log("frc_val=", frc_val);
    return frc_val;
}

function f2_main() {
    if (true) {
        //  TX TiXing[  1 2 3 4]
        //  TakeARand (Tk,-Tk)
        for (let i = 0; i < 10; i++) {
            let Tk_Arr = [0, 19, 9, 7, 5];
            for (let TiXing = 1; TiXing < 5; TiXing++) {
                //console.log("TiXing:",TiXing);
                let Range = {};
                Range["D15"] = "*";
                Range["E15"] = "%";
                let s1 = CreatAEq(TiXing, Tk_Arr[TiXing], Range);
                let val=calc_expr(s1.Val);
                if(val.toString().indexOf(".")>0){
                    console.log(s1.Val);
                    console.log("---val is fraction---")
                    let frc_st=calc_frc_expr(s1.Val);
                    let frc_val=calc_expr("="+frc_st);
                    if(Math.abs(frc_val-val)>0.000001){
                        console.log(frc_val,val);
                        throw `FrC ERROR  ${val}  != ${frc_val}`;
                    }
                }
            }
        }
    }
}
f2_main();
class UIMathClassF2 extends UIMathClass {
    InitQizData(){
      for (let i = 0; i < 4; i++) {
          for(let j=0;j<10;j++){
            let TiXing = i+1;
            let Range = {};
            Range["D15"] = "*";
            Range["E15"] = "%";
            let s1 = CreatAEq(TiXing, 9, Range);
            this.NTE[i][j]=s1;
            this.QT[i][j]=s1.St;
            this.AQT[i][j]=s1.CalcVal;
            this.AQTR[i][j] = Range;
            console.log(Range);
          }
        }
    }     
    GetQizStatement(qti,qno)
    {
      super.GetQizStatement(qti,qno);
      return this.QT[Number(qti)-1][qno-1] ;   
    }
    GetQizSt(qti,qno)
    {
        return this.AQTR[Number(qti)-1][qno-1]["F116"]
        //return  this.QT[Number(qti) - 1][qno - 1];
    }
    GetAnsSt(qti,qno)
    {
        let res="";
        if(this.IsFraction(qti,qno)){
            res= this.AQTR[Number(qti)-1][qno-1]["F116"]
            let frc_st=calc_frc_expr(res);
            res= `=${frc_st}`;        
        }else{
            res+= `=(${this.AQT[Number(qti) - 1][qno - 1]})`;        
        }
        return res;        
    }
    CheckAns(qti,qno, AnsZ,AnsM)
    {
      let ansx= App.AQT[Number(qti)-1][qno-1];
      if(this.IsFraction(qti,qno)){
        return Math.abs(ansx-(AnsZ/AnsM))<0.0001
      }else{
        if((typeof ansx)=="number") return ansx==AnsZ;
        if((typeof ansx)=="string") return ansx==AnsZ;
        if((typeof ansx)=="object") return ansx["F116"]==AnsZ && ansx["G116"]==AnsM;
      }
    }
    GetAns_Num(qti,qno){return App.AQT[Number(qti)-1][qno-1]["F116"];}
    GetAns_Den(qti,qno){return App.AQT[Number(qti)-1][qno-1]["G116"];}
}
if (typeof module !== 'undefined' && module.exports) { module.exports = { f2_main: f2_main, CreatAEq: CreatAEq } }
