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

const tmsU=new TmsUts();
//tmsU 
//TakeAFrc(k,Desm=2真分數)
//TakeARnd(Ta,Tb,Desm=0,SwIs(0,1,2)=1,Tc=0,Td=0)  
//Left, Replace, Int, Rnd, Str, Trim, AllTrim, Right, DcmToFrc, CDbl

function GetAROpr(OprRang) //OprRang=["+","-","*","/']
{
   
}
//' ------ Tx Tixing  題型
//' -------Tk Random_base -TK..TK ------
function CreatAEq(Tx, Tk, Range) {
    let TE = {St:null, Val: 0, CalcVal: 0};
    let a = 1, b = 1, c = 1, d=1; 
    let expr=[]	;
    let opr =[]	;
    switch (Tx) {
        case 1:  //题型1：a+b+c=d  |a|,|b|,|c|< 100 整数
            a = tmsU.TakeARnd(-100,100);
            b = tmsU.TakeARnd(-100,100);
            c = tmsU.TakeARnd(-100,100);
            break;
        case 2: //题型2：b/a+c/a=d   |a|,|b|,|c|< 10整数，|a|≠0
            a = tmsU.TakeARnd(-10,10);
            b = tmsU.TakeARnd(-10,10);
            c = tmsU.TakeARnd(-10,10);
            break;
        case 3:
            break;
        case 4:
            break;
    }
    let a = Math.floor(Math.random() * r0) + 1;
    let b = Math.floor(Math.random() * r1) + 1;
    let x = Math.floor(Math.random() * r2);
    let opr = "+";
    if (a > b) {
        TE.St = a + "-" + b;
        opr = "-";
        TE.Val = a - b;
        TE.CalcVal = a - b;
    }
    else if ((a + b) < 100) {
        opr = "+";
        TE.St = a + "+" + b;
        TE.Val = a + b;
        TE.CalcVal = a + b;
    }
    else {
        opr = "-";
        TE.St = b + "-" + a;
        TE.Val = b - a;
        TE.CalcVal = b - a;
    }
    Range["F114"] = a;
    Range["G114"] = b;
    Range["H114"] = opr;
    Range["F116"] = TE.CalcVal;
    return TE;
}
class UIMathClassF1001 extends UIMathClass {
    InitQizData(){
      for (let i = 0; i < 4; i++) {
          for(let j=0;j<10;j++){
            let TiXing = i+1;
            let Range = {}
            Range["D15"] = "*"
            Range["E15"] = "%"
            let s1 = CreatAEq(TiXing, 9, Range)
            this.QT[i][j]=s1.St;
            this.AQT[i][j]=s1.CalcVal;
            console.log(Range)
          }
        }
    }     
    GetQizStatement(qti,qno)
    {
      super.GetQizStatement(qti,qno);
      return this.QT[Number(qti)-1][qno-1] ;   
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
    GetAnsSt(qti,qno) {return this.AQT[Number(qti) - 1][qno - 1];   }
  }
 
function p2_main(){     
    for (let i = 0; i < 100; i++) {
        let TiXing = i % 4 +1;
        let Range = {};
        Range["D15"] = "*";
        Range["E15"] = "/";
        let s1 =CreatAEq(TiXing, 9, Range);
        console.log(s1.St);
        console.log(s1.Val);
        console.log(s1.CalcVal);
    }
}
p2_main();
//保留
if (typeof module !== 'undefined' && module.exports) {     module.exports = {    example:main,    CreatAEq:CreatAEq}; }
