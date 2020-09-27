//f1001,name:有理數的運算(符)
/*
有理數的運算:
题型1：a+b+c=d  |a|,|b|,|c|< 100 整数
例题1	
1. 39+(-20)-10
2. 25-11-(-2)
答案式样	
1. = 9 ，
2. = 16 ，	
数型及范围
|a|,|b|,|c|< 100 整数	
评分标准	
1. 双括号对得10分；
2. 单括号对得5分；
3. 其他得0分；
时限	30秒
命题方式参考	 a,b,c= 100以内随机±整数

题型2：b/a+c/a=d   |a|,|b|,|c|< 10整数，|a|≠0
例题	
1. 1/5-3/5
2. 1/3+(-1/3)	
答案式样	
1. = -2/5
2. =0   	
数型及范围	
|a|,|b|,|c|< 10整数，|a|≠0
评分标准
1. 双括号对得10分；
2. 单括号对得5分；
3. 其他得0分；
时限
60秒
命题方式参考	 a,b,c,= 10以内随机±整数|a|≠0
*/

//Option Explicit
'use strict';
//保留
if (typeof module !== 'undefined' && module.exports) { var { AFrc, AExps,TmsUts } = require('../utils/tmsUtils');var calc = require("../utils/tmsCalcu").calc; }
//if (typeof module !== 'undefined' && module.exports) { var { UIMathClass } = require('../tmsUIMathClass'); }
const tmsU=new TmsUts();
function GetAROpr(OprRang) //OprRang=["+","-","*","/']
{
  return OprRang[tmsU.Int(100 * tmsU.Rnd()) % OprRang.length];
}
function GetRndInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//tmsU 
//TakeAFrc(k,Desm=2真分數)
//TakeARnd(Ta,Tb,Desm=0,SwIs(0,1,2)=1,Tc=0,Td=0)  
//Left, Replace, Int, Rnd, Str, Trim, AllTrim, Right, DcmToFrc, CDbl


//' ------ Tx Tixing  題型
//' -------Tk Random_base -TK..TK ------
function CreatAEq(Tx, Tk, Range) {
    let TE = new AExps();
    let TOp = ["+", "-"];
    let TSn = ["", "", "", ""];
    let a = 1, b = 1, c = 1, d=1; 
    switch (Tx) {
        case 1:  //题型1：a+b+c=d  |a|,|b|,|c|< 100 整数
            Tk=100;
            for (let i = 0; i < 3; i++) {
              TE.Nf[i] = tmsU.TakeAFrc(Tk,  4);
              TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 2];
              //TSn[i] = tmsU.Str(TE.Nf[i].Sgn * TE.Nf[i].FenZ);
            }
            TE.St=TE.Nf[0].St1+TE.OPr[0]+TE.Nf[1].St1+TE.OPr[1]+TE.Nf[2].St1;
            TE.Val=0;
            TE.CalcVal=0;
            break;
        case 2:
        case 3:
        case 4: //题型2：b/a+c/a=d   |a|,|b|,|c|< 10整数，|a|≠0
            Tk=10
            for (let i = 0; i < 2; i++) {
              TE.Nf[i] = tmsU.TakeAFrc(Tk, 2);
              TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 2];
            }
            TE.St=TE.Nf[0].St1+TE.OPr[0]+TE.Nf[1].St1
            TE.Val=0;
            TE.CalcVal=0;
            break;
    }
    
    let cc_list = calc.Sytex_cclist(TE.St);
    let yy = [];
    calc.proc2opt(cc_list, yy);
    TE.CalcVal = calc.exprCalc(yy);
    TE.Val = TE.CalcVal;

    let fcc_list = calc.Sytex_cclist(TE.St);
    let frc_yy = [];
    calc.procfrc2opt(fcc_list, frc_yy);
    TE.FrcVal=calc.exprfrcCalc(frc_yy);
    TE.FrcVal=calc.simplifyFrc(TE.FrcVal);
    TE.St=tmsU.MJaxFmt(TE.St);
    return TE;
}
class UIMathClassF1001 extends UIMathClass {
    InitQizData(){
      for (let i = 0; i < 4; i++) {
          for(let j=0;j<10;j++){
            let TiXing = i+1;
            let s1 = CreatAEq(TiXing, 0, null)
            this.NTE[i][j]=s1;
            this.QT[i][j]=s1.St;
            this.AQT[i][j]=s1.CalcVal;
          }
        }
    }     
    GetQizStatement(qti,qno)
    {
      super.GetQizStatement(qti,qno);
      return  tmsU.Replace(this.QT[Number(qti)-1][qno-1], "/", " \\div "); ;   
    }
    CheckAns(qti,qno, AnsZ,AnsM){
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
    GetAnsSt(qti,qno) {return this.NTE[Number(qti) - 1][qno - 1].FrcVal;   }
  }
 
function main(){     
  for (let i = 0; i < 2; i++) {
    for(let j=0;j<10;j++){
      let TiXing = i+1;
      let s1 = CreatAEq(TiXing, 0, null)
      console.log(s1.St);
      console.log(s1.Val);
      console.log(s1.CalcVal);
    }
  }
}
main();
//保留
if (typeof module !== 'undefined' && module.exports) {     module.exports = {    example:main,    CreatAEq:CreatAEq}; }
