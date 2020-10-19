/*f2003,name:因式分解
提公因式
題型1：s1=abxpyq, s2=acxuyv, s3=adxgyh, s1’= bxp-myq-n, s2’= cxu-myv-n, s3’= dxg-myh-n, 
s1 +s2 +s3=axmyn(s1’+ s2’+ s3’) (s1≠s2≠s3), s1 ,s2 ,s3亂序,s和s’的順序相同
(|a|,|b|,|c|,|d|,|k|)<13 整數, -1<(p,q,u,v,g,h)<11整數, (a,b,c)≠0, m=min(p,u,g), n=min(q,v,h), 
(x,y)=(a至z內隨機字母) 或 (a至z內隨機字母 ± a至z內隨機字母) 或 (a至z內隨機字母 ± k), x≠y
例題	答案式樣	數型及範圍	評分標準	時限
1.30x6y2-27x3y7+6x5 1. = 3x3(10x3y2-9y7+2x2)
2.-72x2y3+30x3y2	2. = 6x2y2(-12y+5x)
	(|a|,|b|,|c|,|d|,|k|)<13 整數,
-1<(p,q,u,v,g,h)<11整數, 
(a,b,c)≠0, x≠y,
m=min(p,u,g), n=min(q,v,h),
s1 ,s2 ,s3亂序,s和s’的順序相同,
(x,y)=(a至z內隨機字母) 或 (a至z內隨機字母 ± a至z內隨機字母) 或 (a至z內隨機字母 ± k).	1. 寫對公因式及抽公因式後的項得10分.
2. 寫對公因式得5分.
3. 其他得0分.	40秒
命題方式參考		a,b,c,d,k= 13以內隨機±整數,
	p,q,u,v,g,h=-1至11內隨機整數,
	a,b,c≠0, 
	m=p,u,g中最小的數字, 
	n=q,v,h中最小的數字,
	s1 ,s2 ,s3亂序,s和s’的順序相同,
	x,y=(a至z內隨機字母)或(a至z內隨機字母 ± a至z內隨機字母)或(a至z內隨機字母 ± k)
併項法
題型2：s1=acxz ,s2=adxw ,s3=bcyz, s4=bdyw, s1 +s2 +s3+s4=(ax+by)(cz+dw)= (cz+dw)(ax+by)
(|a|,|b|,|c|,|d|)<13 整數, (a,b,c,d)≠0, (x,y,z,w)= a至z內隨機字母, x≠y≠z≠w, s1 ,s2 ,s3,s4亂序.
例題	答案式樣	數型及範圍	評分標準	時限
1.-15xz+10xw-12yz+8yw 1. = (5x+4y)(-3z+2w), (4y+5x)(2w-3z),
2.30ac-24ad-20bc+16bd	
(5x+4y)(2w-3z),
(4y+5x)(-3z+2w),
(-3z+2w)(5x+4y),
(-3z+2w)(4y+5x),
(2w-3z)(5x+4y),
(2w-3z)(4y+5x).
2. = (3a-2b)(10c-8d),
(3a-2b)(-8d+10c),
(-2b+3a)(10c-8d),
(-2b+3a)(-8d+10c),
(10c-8d)(3a-2b),
(10c-8d)(-2b+3a),
(-8d+10c)(3a-2b),
(-8d+10c)(-2b+3a)	(|a|,|b|,|c|,|d|)<13 整數,
(a,b,c,d)≠0, 
(x,y,z,w)= a至z內隨機字母,
x≠y≠z≠w,
s1 ,s2 ,s3,s4亂序.	1. 寫對兩組括弧得10分.
2. 寫對一組括弧得5分.
3. 其他得0分.	60秒
命題方式參考		a,b,c,d= 13以內隨機±整數,
	a,b,c,d≠0, 
	x,y,z,w= a至z內隨機字母,
	x≠y≠z≠w
	s1 ,s2 , s3, s4亂序.
十字相乘
題型3：x2+bx+c=(x+p)(x+q)
b=p+q, c=pq, (|p|,|q|,|k|) < 16 整數,
x=(a至z內隨機字母) 或 (a至z內隨機字母 ± a至z內隨機字母) 或 (a至z內隨機字母 ± k)
例題	答案式樣	數型及範圍	評分標準	時限
1. x2+13x+22
2. (x+y)2+5(x+y)-24	1. = (x+2)(x+11), (x+11)(x+2)
2. = ((x+y)-3)((x+y)+8), 
(x+y-3)(x+y+8), 
(x+y+8)(x+y-3)
	(|p|,|q|,|k|) < 16 整數,
b=p+q, c=pq,
x=(a至z內隨機字母) 或 (a至z內隨機字母 ± a至z內隨機字母) 或 (a至z內隨機字母 ± k).	1. 寫對兩組括弧得10分.
2. 寫對一組括弧得5分.
3. 其他得0分.	30秒
命題方式參考		p,q,k=16以內隨機±整數,
	b=p+q,
	c=pq,
	x=(a至z內隨機字母)或(a至z內隨機字母 ± a至z內隨機字母)或(a至z內隨機字母 ± k).

題型4：ax2+bx+c=(mx+p)(nx+q)
a=mn, b=mq+np, c=pq, (|p|,|q|,|k|) < 16 整數, (|m|,|n|) < 6 整數,
x=(a至z內隨機字母) 或 (a至z內隨機字母 ± a至z內隨機字母) 或 (a至z內隨機字母 ± k).
例題	答案式樣	數型及範圍	評分標準	時限
1. 8x2+34x+21
2. 5(x+y)2-64(x+y)-13	1. = (2x+7)(4x+3), (4x+3)(2x+7)
2. = ((x+y)-13)(5(x+y)+1), 
(x+y-13)(5x+5y+1),
(5x+5y+1)(x+y-13)
	(|p|,|q|,|k|) < 16 整數,
(|m|,|n|) < 6 整數,
a=mn, b=mq+np, c=pq,
x=(a至z內隨機字母) 或 (a至z內隨機字母 ± a至z內隨機字母) 或 (a至z內隨機字母 ± k).	1. 寫對兩組括弧得10分.
2. 寫對一組括弧得5分.
3. 其他得0分.	60秒
命題方式參考		p,q,k=16以內隨機±整數,
	m,n=6以內隨機±整數,
	a=mn
	b=mq+np,
	c=pq,
	x=(a至z內隨機字母)或(a至z內隨機字母 ± a至z內隨機字母)或(a至z內隨機字母 ± k).
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
  /*題型1：s1=ab x^p y^q, s2=ac x^u y^v, s3= ad x^g y^h, 
  s1’= bx^(p-m)y^(q-n), s2’= cx^(u-m)y^(v-n), s3’= dx^(g-m)y^(h-n), 
  s1 +s2 +s3=axmyn(s1’+ s2’+ s3’) (s1≠s2≠s3), s1 ,s2 ,s3亂序,s和s’的順序相同
	(|a|,|b|,|c|,|d|,|k|)<13 整數,  -1<(p,q,u,v,g,h)<11整數,   (a,b,c)≠0, x≠y,
  m=min(p,u,g), n=min(q,v,h),  x,y=(a至z內隨機字母)或(a至z內隨機字母 ± a至z內隨機字母)或(a至z內隨機字母 ± k)*/
      let a = tmsU.TakeARnd(-9, 9, 0, 2, 0, 0);
      let b = tmsU.TakeARnd(-9, 9, 0, 2, 0, 0);
      let c = tmsU.TakeARnd(-9, 9, 0, 2, 0, 0);
      let d = tmsU.TakeARnd(-9, 9, 0, 0, 0, 0);
      let k = tmsU.TakeARnd(-9, 9, 0, 0, 0, 0);
      let p = tmsU.TakeARnd(-1, 9, 0, 0, 0, 0);
      let q = tmsU.TakeARnd(-1, 9, 0, 0, 0, 0);
      let u = tmsU.TakeARnd(-1, 9, 0, 0, 0, 0);
      let v = tmsU.TakeARnd(-1, 9, 0, 0, 0, 0);
      let g = tmsU.TakeARnd(-1, 9, 0, 0, 0, 0);
      let h = tmsU.TakeARnd(-1, 9, 0, 0, 0, 0);
      let m = p>u?u:p; m=m>g?g:m;
      let n = q>v?v:q; n=n>h?h:n;
      let s1=`${a}${b}x^${p}y^${q}`
      let s2=`${a}${c}x^${u}y^${v}`
      let s3=`${a}${d}x^${g}y^${h}` 
      let s1_= `${b}x^(${p}-${m})y^(${q}-${n})`
      let s2_= `${c}x^(${u}-${m})y^(${v}-${n})`
      let s3_= `${d}x^(${g}-${m})y^(${h}-${n})` 
      TE.St = AdjustExp(`${s1}+${s2}+${s3}`)
      TE.Val =`${a}x${m}y${n}*(${s1_}+ ${s2_}+ ${s3_})`
      TE.CalcVal = 0;
      TE.FrcVal = "";
      //TE.St=tmsU.MJaxFmt(TE.St);
      break;
    case 2:
    case 3: break;
    case 4: break;
  }
  return TE;
}
class UIMathClassF2003 extends UIMathClass {
  constructor() {
    super();
    this.Note =
    `
    <div> 題型1：提公因式      　　</div>
    <div> 1.$30x^6y^2-27x^3y^7+6x^5$ 作答: 3x^(10x^3y^2-9y^7+2x^2)</div>
    <div> 2.$-72x^2y^3+30x^3y^2$ 作答: 6x^2y^2(-12y+5x)</div>
    <div> 題型2：併項法</div>
    <div> 1.$-15xz+10xw-12yz+8yw$ 作答: (5x+4y)(-3z+2w) 或 (4y+5x)(2w-3z) ,...</div>
    <div> 2.$30ac-24ad-20bc+16bd$ 作答: (3a-2b)(10c-8d) 或 (3a-2b)(-8d+10c),...</div>
    <div> 題型3：十字相乘 </div>
    <div> 1.$ x^2+13x+22$ 作答: (x+2)(x+11)</div>
    <div> 2.$ (x+y)2+5(x+y)-24$ 作答:(x+y-3)(x+y+8)</div>
    <div> 題型4</div>
    <div> 1. $8x^2+34x+21$ 作答: (2x+7)(4x+3),(2x+7)(4x+3) </div>
    <div> 2. $5(x+y)^2-64(x+y)-13$ 作答: ((x+y)-13)(5(x+y)+1),(x+y-13)(5x+5y+1),(2x+7)(4x+3),(5x+5y+1)(x+y-13)</div>
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
  for (let i = 0; i < 1; i++) {
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

