/*f1002,name:整數指數冪的運算
?型1： a^n=a*a*a... 
1. 2^3 = 8        
2. (1/4)^-2 = 16 
a,均為1至9的數
n為-9至9的整數
若 >4000時;該算式不能取立
?型2： 
a^m*a^n=a^(m+n)
a^m/a^n=a^(m-n)
1. 2^3 x 2^-6 = 2^(3-6) = 1/8       
2. (a^-1)^3 / a^6 = a^3  
a可以是字母或1至9的數
m,n為-9至9的整數
?型3： 
( a^c * b^d )^n = a^cn * b^dn
1. (2a)^3  = 8a^3
2. (a^-1 * b)^3 = b^3 / a^3 
a,b中至少有一個是字母為1至9的數
c,d,n為-9至9的整數
?型4： (a^c*b^d)^n(e^g*f^h)^m=a^cn*b^dn*e^gm*f^hm
1. (c^2 * y^-6) / (c^2 * y^-3) = 1/ y^3
2. (a^-3 * b^4)^-2 * (a b^-3)^4 = a^10 / b^20
a,b,e,f中可以為1至9的數及字母
c,d,n,g,h,m均為-9至9的整數
*/
'use strict';
//保留
var de=false;
function bug(){
  if (typeof module !== 'undefined' && module.exports) { var { UIMathClass } = require('../tmsUIMathClass'); }
}
de&&bug();

if (typeof module !== 'undefined' && module.exports) { var { AFrc, AExps,TmsUts } = require('../utils/tmsUtils');var calc = require("../utils/tmsCalcu").calc; }

const tmsU=new TmsUts();
function GetAROpr(OprRang) //OprRang=["+","-","*","/']
{
  return OprRang[tmsU.Int(100 * tmsU.Rnd()) % OprRang.length];
}
function GetRndInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//tmsU 
//TakeAFrc(k,1 允許整數/2 真分數 )
//TakeARnd(Ta,Tb,Desm=0,SwIs(0,1,2)=1,Tc=0,Td=0)  
//Left, Replace, Int, Rnd, Str, Trim, AllTrim, Right, DcmToFrc, CDbl

//' ------ Tx Tixing  題型
//' -------Tk Random_base -TK..TK ------
function CreatAEq(Tx, Tk, Range) {
    let TE = new AExps();
    let TOp = ["+", "-"];
    switch (Tx) {
        case 1:  //?型1： a^n=a*a*a... 1. 2^3 = 8 2. (1/4)^-2 = 16 a,均為1至9的數 n為-9至9的整數
            Tk=100;
            TE.Nf[0] = tmsU.TakeAFrc(9,  1);
            TE.Nf[1] = tmsU.TakeARnd(-4, 4,0,2,0,0);
            TE.St=TE.Nf[0].St1 + "^{" +TE.Nf[1]+"}";
            let S1=TE.Nf[0].St1 + "^ (" +TE.Nf[1]+")";
            let cc_list = calc.Sytex_cclist(S1);
            let yy = [];
            calc.proc2opt(cc_list, yy);
            TE.CalcVal = calc.exprCalc(yy);
            TE.Val = TE.CalcVal;
            
            let fcc_list = calc.Sytex_cclist(S1);
            let frc_yy = [];
            calc.procfrc2opt(fcc_list, frc_yy);
            TE.FrcVal=calc.exprfrcCalc(frc_yy);
            TE.FrcVal=calc.simplifyFrc(TE.FrcVal);
            TE.St=tmsU.MJaxFmt(TE.St);
            break;
        case 2:
        case 3:
        case 4: //?型2：b/a+c/a=d   |a|,|b|,|c|< 10整?，|a|≠0
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
    return TE;
}
class UIMathClassF1002 extends UIMathClass {
    constructor(){
        super();
        this.Note=
        `
        <div>整數指數冪的運算:</div>
        <div>型1： a^n=a*a*a...</div> 
        <div>1. 2^3 = 8 ; 2. (1/4)^-2 = 16 </div>
        <div>型2：a^m * a^n = a^(m+n); a^m / a^n = a^(m-n)</div>
        <div>1. 2^3 x 2^-6 = 2^(3-6) = 1/8 </div>
        <div>2. (a^-1)^3 / a^6 = a^3  </div>
        `;
    }
    InitQizData(){
      for (let i = 0; i < 1; i++) {
          for(let j=0;j<10;j++){
            let TiXing = i+1;
            let s1 = CreatAEq(TiXing, 0, null)
            console.log(s1);
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
      let ansx= this.AQT[Number(qti)-1][qno-1];
      if(this.IsFraction(qti,qno)){
        return Math.abs(ansx-(AnsZ/AnsM))<0.0001
      }else{
        if((typeof ansx)=="number") return ansx==AnsZ;
        if((typeof ansx)=="string") return ansx==AnsZ;
        if((typeof ansx)=="object") return ansx["F116"]==AnsZ && ansx["G116"]==AnsM;
      }
    }
    GetAns_Num(qti,qno){return this.AQT[Number(qti)-1][qno-1]["F116"];}
    GetAns_Den(qti,qno){return this.AQT[Number(qti)-1][qno-1]["G116"];}
    GetAnsSt(qti,qno) {return this.NTE[Number(qti) - 1][qno - 1].FrcVal;   }
  }
 
function main(){     
  for (let i = 0; i < 1; i++) {
    for(let j=0;j<5;j++){
      let TiXing = i+1;
      let s1 = CreatAEq(TiXing, 0, null)
      console.log(s1.St);
      console.log(s1.Val);
      console.log(s1.CalcVal);
    }
  }
}
//main();
//保留
if (typeof module !== 'undefined' && module.exports) {     module.exports = {    example:main,    CreatAEq:CreatAEq}; }

