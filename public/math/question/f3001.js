/*
【项目】ax2 + bx + c =0  即( mx+p)(nx+q)=0的解一元二次方程式

题型1：a=1, |p|,|q| < 10 整数
例题	答案式样	数型及范围	评分标准	时限
1. x2 –5 x – 6 =0
2. x2 – 2x – 15=0	1. = 6 ，-1
2. = 5，-3  	a = 1
|p|,|q| < 10 整数
	1. 二個答案对得10分；
2. 只有一個答案对得5分；
3. 其他得0分；	50秒
命题方式参考		a=1, m=1, n=1;
	p, q = 10以内随机±整数
	  b=p+q,    c=p∙q 

题型2：a=1, |p|,|q| < 15 整数
例题	答案式样	数型及范围	评分标准	时限
1. x2 -6x – 55=0 
2. x2 + 23x+132=0 	1. = 11，-5 
2. = -11，-12 	a=1
|p|,|q| < 15 整数
	1. 二個答案对得10分；
2. 只有一個答案对得5分；
3. 其他得0分；	70秒
命题方式参考		a=1, m=1, n=1;
	p, q = 15以内随机±整数
	 b=p+q,    c=p∙q 

题型3：m, n <5 正整数, |p|,|q| < 10 整数
例题	答案式样	数型及范围	评分标准	时限
1. 6x2 + x – 12=0 

2. 3x2 -7x –6=0	1. = -  ，  
2. =-  ，3
m, n < 5 整数
|p|,|q| < 10 整数
	1. 二個答案对得10分；
2. 只有一個答案对得5分；
3. 其他得0分；	110秒
命题方式参考		m, n <5 正整数;  p, q = 10以内随机±整数
	a=m∙n, 
	 b=p∙n+q∙m,    c=p∙q 


题型4： m, n < 5整数,  mn < 0 , |p|,|q| < 10 整数
例题	答案式样	数型及范围	评分标准	时限
1. -6x2 + 5x +6=0 

2. -3x2 –10x –8=0
	 	1. =   ，  
2. =   ，-2
m, n < 5 整数
m∙n<0 
|p|,|q| < 10 整数
	1. 二個答案对得10分；
2. 只有一個答案对得5分；
3. 其他得0分；	120秒
命题方式参考	m, n < 5±整数; m∙n<0 ；p, q = 10以内随机±整数
	a=m∙n, 
	 b=p∙n+q∙m,    c=p∙q 
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
  let TOp = ["+", "-"];
  let TE = new AExps();
  let a = 1, b = 1, c = 1, m = 1, p = 1, n = 1, q = 1;
  switch (Tx) {
    case 1:
        p = tmsU.TakeARnd(-10, 10, 0, 1, 0, 0);
        q = tmsU.TakeARnd(-10, 10, 0, 2, 0, -1* p);
        b = p + q; c = p * q;
        break;
    case 2:
        p = tmsU.TakeARnd(-15, 15, 0, 1, 0, 0);
        q = tmsU.TakeARnd(-15, 15, 0, 2, 0, -1*p);
        b = p + q; c = p * q;
        break;
    case 3:
        m = tmsU.TakeARnd(0, 5, 0, 1, 0, 0);
        n = tmsU.TakeARnd(0, 5, 0, 1, 0, 0);
        a = m * n;
        p = tmsU.TakeARnd(-10, 10, 0, 1, 0, 0);
        q = tmsU.TakeARnd(-10, 10, 0, 2, 0, Math.floor(p*n/m));
        b = p * n + q * m; c = p * q;
        break;
    case 4:
        m = tmsU.TakeARnd(-5, 5, 0, 1, 0, 0);
        n = tmsU.TakeARnd(0, 5, 0, 1, 0, 0);
        if(m*n>0){n=-1*n;}
        a = m * n;
        p = tmsU.TakeARnd(-10, 10, 0, 1, 0, 0);
        q = tmsU.TakeARnd(-10, 10, 0, 2, 0, Math.floor(p*n/m));
        b = p * n + q * m; c = p * q;
        break;
  }
  TE.St =AdjustExp( `${a}x^2+${b}x+${c}`)+"=0";
  Range["F115"] = TE.St
  Range["F116"] = AdjustExp(`${m}x+${p}`)
  Range["G116"] = AdjustExp(`${n}x+${q}`)
  Range["H116"] = AdjustExp(`${m *-1 }x+${p*-1 }`)
  Range["I116"] = AdjustExp(`${n *-1 }x+${q*-1 }`)
  Range["L116"] = AdjustExp(`${p / m * -1 }`)
  Range["M116"] = AdjustExp(`${q / n * -1 }`)
  let hcfp=calc.HCF(p,m)
  Range["N116"] = AdjustExp(`${(p * -1)/hcfp}/${m/hcfp}`)
  let hcfq=calc.HCF(q,n)
  Range["O116"] = AdjustExp(`${(q * -1)/hcfq}/${n/hcfq}`)    
  
  TE.Val = `(${Range["F116"]})(${Range["G116"]})`;
  TE.CalcVal =TE.Val;
  return TE
}
class UIMathClassF3001 extends UIMathClass {
  constructor() {
    super();
    this.Note =
      `
      <h4>ax^2+bx+c=0 即( mx+p)(nx+q)=0的解一元二次方程式</h4>
      <div> 題型1：</div>
      <div> 1. $x^2–5x–6=0$ 作答: 6 ， -1 </div>
      <div> 2. $x^2–2x–15=0$	 作答: 5 ， -3 </div>
      <div> 題型2：</div>
      <div> 1. $x^2-6x–55=0$ 	作答: 11，-5 </div>
      <div> 2. $x^2+23x+132=0$ 	作答: -11，-12 </div>
      <div> 題型3：</div>
      <div> 1. $6x^2+x–12=0$ 作答: -3/2, 4/3 註: -a/b 表示分數</div>
      <div> 2. $3x^2-7x–6=0$ 作答: -2/3 , 3</div>
      <div> 題型4：</div>
      <div> 1. $-6x^2 +5x+6=0$ 作答: 3/2 , -2/3</div>
      <div> 2. $-3x^2 –10x –8=0$ 作答: -4/3, -2</div>
        `;
  }
  InitQizData() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 10; j++) {
        let TiXing = i + 1;
        let Range={}
        let s1 = CreatAEq(TiXing, 0, Range)
        console.log(s1);
        this.NTE[i][j] = s1;
        this.QT[i][j] = s1.St;
        this.AQT[i][j] = s1.CalcVal;
        this.AQTR[i][j] = Range;
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
      let Range={}
      let s1 = CreatAEq(TiXing, 0, Range)
      console.log(s1.St);
      console.log(s1.Val);
      console.log(s1.CalcVal);
      console.log(s1.FrcVal);
      console.log(Range);
    }
  }
}
main();
if (typeof module !== 'undefined' && module.exports) { module.exports = { example: main, CreatAEq: CreatAEq }; }

