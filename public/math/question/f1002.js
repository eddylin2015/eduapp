/*f1002,name:¾ã¼Æ«ü¼Æ¾­ªº¹Bºâ
?«¬1¡G a^n=a*a*a... 
1. 2^3 = 8        
2. (1/4)^-2 = 16 
a,§¡¬°1¦Ü9ªº¼Æ
n¬°-9¦Ü9ªº¾ã¼Æ
­Y >4000®É;¸Óºâ¦¡¤£¯à¨ú¥ß

?«¬2¡G 
a^m*a^n=a^(m+n)
a^m/a^n=a^(m-n)
1. 2^3 x 2^-6 = 2^(3-6) = 1/8       
2. (a^-1)^3 / a^6 = a^3  
a¥i¥H¬O¦r¥À©ÎŽÍ1¦Ü9ªº¼Æ
m,n¬°-9¦Ü9ªº¾ã¼Æ

?«¬3¡G 
( a^c * b^d )^n = a^cn * b^dn
1. (2a)^3  = 8a^3
2. (a^-1 * b)^3 = b^3 / a^3 
a,b¤¤¦Ü¤Ö¦³¤@­Ó¬O¦r¥À¬°1¦Ü9ªº¼Æ
c,d,n¬°-9¦Ü9ªº¾ã¼Æ

?«¬4¡G (a^c*b^d)^n(e^g*f^h)^m=a^cn*b^dn*e^gm*f^hm
1. (c^2 * y^-6) / (c^2 * y^-3) = 1/ y^3
2. (a^-3 * b^4)^-2 * (a b^-3)^4 = a^10 / b^20
a,b,e,f¤¤¥i¥H¬°1¦Ü9ªº¼Æ¤Î¦r¥À
c,d,n,g,h,m§¡¬°-9¦Ü9ªº¾ã¼Æ
*/
'use strict';
//«O¯d
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
//TakeAFrc(k,Desm=2¯u¤À¼Æ)
//TakeARnd(Ta,Tb,Desm=0,SwIs(0,1,2)=1,Tc=0,Td=0)  
//Left, Replace, Int, Rnd, Str, Trim, AllTrim, Right, DcmToFrc, CDbl

//' ------ Tx Tixing  ÃD«¬
//' -------Tk Random_base -TK..TK ------
function CreatAEq(Tx, Tk, Range) {
    let TE = new AExps();
    let TOp = ["+", "-"];
    switch (Tx) {
        case 1:  //?«¬1¡G a^n=a*a*a... 1. 2^3 = 8 2. (1/4)^-2 = 16 a,§¡¬°1¦Ü9ªº¼Æ n¬°-9¦Ü9ªº¾ã¼Æ
            Tk=100;
            TE.Nf[0] = tmsU.TakeAFrc(Tk,  4);
            TE.Nf[1] = tmsU.TakeAFrc(Tk,  4);
            for (let i = 0; i < 2; i++) {              
              TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 2];
            }
            TE.St=TE.Nf[0].St1 ^ TE.OPr[0]+TE.Nf[1].St1+TE.OPr[1]+TE.Nf[2].St1;
            TE.Val=0;
            TE.CalcVal=0;
            break;
        case 2:
        case 3:
        case 4: //?«¬2¡Gb/a+c/a=d   |a|,|b|,|c|< 10¾ã?¡A|a|¡Ú0
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
class UIMathClassF1002 extends UIMathClass {
    InitQizData(){
      this.Note=`
      <div>¦³²z¼Æªº¹Bºâ: ?«¬1¡Ga+b+c=d ?«¬2¡Gb/a+c/a=d </div>
      <div>eg: -7/8 + -5/8 = -3/2 ;  «ö»¡©ú 2 ¤èªk¬ùÂ²¤À¼Æ§@µª. </div>
      <div>¨BÆJ¡G</div>
      <div>1. ¿ï¾ÜÃD«¬¡C</div>
      <div>2. °µ?¡G</div>
      <div>(1)¡i¤U¤@ÃD¡j¡A</div>
      <div>(2) °µÃD¦}¶}©l­p®É¡A</div>
      <div>(3) ¶ñ?µª®×¡C</div>
      <div>3. ¡i½T©w¡j --- µû§Pµª®×?¥´¤À¡C</div>
      <div>»¡©ú¡G</div>
      <div>1. ¥i¥H¥Î¯Èµ§­pºâ¡A¤]¥i¥H¥Î­pºâ¾¹»²§U¡C</div>
      <div>2. ?¦æ¤À¼Æ?ªk¦p¥k¡A¨Ò¦p¡G?/? ?¦¨ a / b --¤À??¥Î±×?¡C</div>
      <div>3. ?¦æ«ü??ªk¦p¥k¡A¨Ò¦p¡G x2+1 ?¦¨ x^2+1 --¥Î«ü?²Å"^"¡C</div>
      <div>4. ?¦æ®Ú¦¡?ªk¦p¥k¡A¨Ò¦p¡G¡Ô(?+1) ?¦¨ J(x+1) --¤j? J+ ¬A©·¡C</div>
      <div>5. ¨CÃD10¤À¡C¤º³]°ò·Ç®É¶¡¡A´£«e§¹¦¨¥[¤À¡A¶W®É§¹¦¨¦©¤À¡C</div>
      <div>6. ¤@¦¸??¥²?°µº¡10ÃD¡AµM«á‰m?¦Û°Ê¶ñ¼g³øªí¡C</div>
      `;
      for (let i = 0; i < 2; i++) {
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
//«O¯d
if (typeof module !== 'undefined' && module.exports) {     module.exports = {    example:main,    CreatAEq:CreatAEq}; }

