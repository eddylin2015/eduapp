/*f1002,name:��ƫ��ƾ����B��
?��1�G a^n=a*a*a... 
1. 2^3 = 8        
2. (1/4)^-2 = 16 
a,����1��9����
n��-9��9�����
�Y >4000��;�Ӻ⦡�������

?��2�G 
a^m*a^n=a^(m+n)
a^m/a^n=a^(m-n)
1. 2^3 x 2^-6 = 2^(3-6) = 1/8       
2. (a^-1)^3 / a^6 = a^3  
a�i�H�O�r���Ύ�1��9����
m,n��-9��9�����

?��3�G 
( a^c * b^d )^n = a^cn * b^dn
1. (2a)^3  = 8a^3
2. (a^-1 * b)^3 = b^3 / a^3 
a,b���ܤ֦��@�ӬO�r����1��9����
c,d,n��-9��9�����

?��4�G (a^c*b^d)^n(e^g*f^h)^m=a^cn*b^dn*e^gm*f^hm
1. (c^2 * y^-6) / (c^2 * y^-3) = 1/ y^3
2. (a^-3 * b^4)^-2 * (a b^-3)^4 = a^10 / b^20
a,b,e,f���i�H��1��9���ƤΦr��
c,d,n,g,h,m����-9��9�����
*/
'use strict';
//�O�d
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
//TakeAFrc(k,Desm=2�u����)
//TakeARnd(Ta,Tb,Desm=0,SwIs(0,1,2)=1,Tc=0,Td=0)  
//Left, Replace, Int, Rnd, Str, Trim, AllTrim, Right, DcmToFrc, CDbl

//' ------ Tx Tixing  �D��
//' -------Tk Random_base -TK..TK ------
function CreatAEq(Tx, Tk, Range) {
    let TE = new AExps();
    let TOp = ["+", "-"];
    switch (Tx) {
        case 1:  //?��1�G a^n=a*a*a... 1. 2^3 = 8 2. (1/4)^-2 = 16 a,����1��9���� n��-9��9�����
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
        case 4: //?��2�Gb/a+c/a=d   |a|,|b|,|c|< 10��?�A|a|��0
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
      <div>���z�ƪ��B��: ?��1�Ga+b+c=d ?��2�Gb/a+c/a=d </div>
      <div>eg: -7/8 + -5/8 = -3/2 ;  ������ 2 ��k��²���Ƨ@��. </div>
      <div>�B�J�G</div>
      <div>1. ����D���C</div>
      <div>2. ��?�G</div>
      <div>(1)�i�U�@�D�j�A</div>
      <div>(2) ���D�}�}�l�p�ɡA</div>
      <div>(3) ��?���סC</div>
      <div>3. �i�T�w�j --- ���P����?�����C</div>
      <div>�����G</div>
      <div>1. �i�H�ίȵ��p��A�]�i�H�έp�⾹���U�C</div>
      <div>2. ?�����?�k�p�k�A�Ҧp�G?/? ?�� a / b --��??�α�?�C</div>
      <div>3. ?���??�k�p�k�A�Ҧp�G x2+1 ?�� x^2+1 --�Ϋ�?��"^"�C</div>
      <div>4. ?��ڦ�?�k�p�k�A�Ҧp�G��(?+1) ?�� J(x+1) --�j? J+ �A���C</div>
      <div>5. �C�D10���C���]��Ǯɶ��A���e�����[���A�W�ɧ��������C</div>
      <div>6. �@��??��?����10�D�A�M��m?�۰ʶ�g����C</div>
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
//�O�d
if (typeof module !== 'undefined' && module.exports) {     module.exports = {    example:main,    CreatAEq:CreatAEq}; }

