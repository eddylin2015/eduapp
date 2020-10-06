if (typeof module !== 'undefined' && module.exports) { var UIMathClass = require('../tmsUIMathClass').UIMathClass; }
/*f2003,name:整式的加減法
题型1：( mx+p)+(nx+q) = ax + b  |p|,|q| < 10 整数
1. x+x+x        答案式样1. = 3x  ，
2. (x +7)-(x-9) 答案式样2. = 16 ，
|m|,|n| < 10 整数 |p|,|q| < 10 整数
命题方式参考	m=1, n=1;	p, q = 10以内随机±整数;  a=m+n，  b=p+q 
题型2：( mx2+px)+(nx2+qx) = ax2 + bx  |p|,|q| < 16 整数
1. 2x2 -5x-x2+12x       答案式样1. = x2 + 7x  
2. (x2 +11x)+(3x2+3x)	答案式样2. =4 x2 + 14x   	
|p|,|q| < 16 整数
命题方式参考	p, q = 16以内随机±整数	 a=m+n,    b=p∙q 
1. 双括号对得10分；
2. 单括号对得5分；
3. 其他得0分；	60秒
*/
'use strict';
if (typeof module !== 'undefined' && module.exports) { var { AFrc, AExps, TmsUts } = require('../utils/tmsUtils'); var calc = require("../utils/tmsUtils").calc; }
const tmsU = new TmsUts();
function GetAROpr(OprRang) //OprRang=["+","-","*","/']
{
  return OprRang[tmsU.Int(100 * tmsU.Rnd()) % OprRang.length];
}
function GetRndInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function AdjustExp(data)
{   
    let cc_x=calc.Sytex_cclist_x(data);
    //console.log(cc_x)
    let s1="";
    for(let i=0;i<cc_x.length;i++){
        if(cc_x[i]=='1x') {s1+="x";}
        else if(cc_x[i]=='+x') {s1+="x";}
        else if(cc_x[i]=='+1x') {s1+="x";}
        else if(cc_x[i]=='-1x') {s1+="-x";}
        else if(cc_x[i]=="+" && cc_x[i+1]=="-") {}
        else s1+=cc_x[i];
    }
    return s1;
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
    case 1:
      //题型1：( mx+p)+(nx+q) = ax + b  |p|,|q| < 10 整数
      //1. x+x+x        答案式样1. = 3x  ，
      //2. (x +7)-(x-9) 答案式样2. = 16 ，
      //|m|,|n| < 10 整数 |p|,|q| < 10 整数
      //命题方式参考	m=1, n=1;	p, q = 10以内随机±整数;  a=m+n，  b=p+q 
      for (let i = 0; i < 5; i++) {
        TE.Nf[i] = tmsU.TakeARnd(-9, 9, 0, 0, 0, 0);
        TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 2];
      }
      TE.St = AdjustExp(`(${TE.Nf[0]}x  + ${TE.Nf[1]} ) + ( ${TE.Nf[2]}x  + ${TE.Nf[3]} )`);
      TE.Val =AdjustExp( `${TE.Nf[0]+TE.Nf[2]}x+${TE.Nf[1]+TE.Nf[3]}`);
      TE.CalcVal = 0;
      TE.FrcVal = "";
      //TE.St=tmsU.MJaxFmt(TE.St);
      break;
    case 2:
    //题型2：( mx2+px)+(nx2+qx) = ax2 + bx  |p|,|q| < 16 整数
    //1. 2x2 -5x-x2+12x       答案式样1. = x2 + 7x  
    //2. (x2 +11x)+(3x2+3x)	答案式样2. =4 x2 + 14x   	
    //|p|,|q| < 16 整数
    //命题方式参考	p, q = 16以内随机±整数	 a=m+n,    b=p∙q 
    for (let i = 0; i < 5; i++) {
      TE.Nf[i] = tmsU.TakeARnd(-9, 9, 0, 0, 0, 0);
      TE.OPr[i] = TOp[tmsU.Int(100 * tmsU.Rnd()) % 2];
    }
    TE.St = AdjustExp(`(${TE.Nf[0]}x^2  + ${TE.Nf[1]}x ) + ( ${TE.Nf[2]}x^2  + ${TE.Nf[3]}x )`);
    TE.Val =AdjustExp( `${TE.Nf[0]+TE.Nf[2]}x^2 +${TE.Nf[1]+TE.Nf[3]}x`);
    TE.CalcVal = 0;
    TE.FrcVal = "";

    case 3: break;
    case 4: break;
  }
  return TE;
}
class UIMathClassF20031 extends UIMathClass {
  constructor() {
    super();
    this.Note =
      `
      <div> 題型5</div>
      <div> 1. \(12x^2-21xy+9y^2\)  作答:3(4x-3y)(x-y)</div>
      <div> 2. \(-2(x+y)^2-8a(x+y)+10a^2\) 作答:2((x+y)+5a)(-(x+y)+a),2(x+y+5a)(-x-y+a),2(-x-y+a)(x+y+5a)</div>
      <div> 題型6：運用乘法公式</div>
      <div> 1. \(36x^2-9y^2\) 作答:9(2x-y)(2x+y),9(2x+y)(2x-y)</div>
      <div> 2. \((x+y)^2-49\) 作答:(x+y+7)(x+y-7),(x+y-7)(x+y+7),(x+y+7)(x+y-7)</div>
      <div> 題型7：</div>
      <div> 1. \(64x^2+48xy+9y^2\) 作答:(8x+3y)^2</div>
      <div> 2. \((x+y)^4-2(x+y)^2z^2+z^4\) 作答:((x+y)^2-z^2)^2, (x+y+z)^2(x+y-z)^2</div>
      `;
  }
  InitQizData() {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        let TiXing = i + 1;
        let s1 = CreatAEq(TiXing, 0, null)
        console.log(s1);
        this.NTE[i][j] = s1;
        this.QT[i][j] = s1.St;
        this.AQT[i][j] = s1.CalcVal;
      }
    }
  }
  GetQizStatement(qti, qno) {
    super.GetQizStatement(qti, qno);
    return tmsU.Replace(tmsU.MJaxFmt(this.NTE[Number(qti) - 1][qno - 1].St), "/", " \\div ");;
  }
  CheckAns(qti, qno, AnsZ, AnsM) {
    let ansx = this.AQT[Number(qti) - 1][qno - 1];
    if (this.IsFraction(qti, qno)) {
      return Math.abs(ansx - (AnsZ / AnsM)) < 0.0001
    } else {
      if ((typeof ansx) == "number") return ansx == AnsZ;
      if ((typeof ansx) == "string") return ansx == AnsZ;
      if ((typeof ansx) == "object") return ansx["F116"] == AnsZ && ansx["G116"] == AnsM;
    }
  }
  GetAns_Num(qti, qno) { return this.AQT[Number(qti) - 1][qno - 1]["F116"]; }
  GetAns_Den(qti, qno) { return this.AQT[Number(qti) - 1][qno - 1]["G116"]; }
  GetAnsSt(qti, qno) { return this.NTE[Number(qti) - 1][qno - 1].FrcVal; }
}

function main() {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 5; j++) {
      let TiXing = i + 1;
      let s1 = CreatAEq(TiXing, 0, null)
      console.log(s1.St);
      console.log(s1.Val);
      console.log(s1.CalcVal);
      console.log(s1.FrcVal);
    }
  }
}
main();
if (typeof module !== 'undefined' && module.exports) { module.exports = { example: main, CreatAEq: CreatAEq }; }

