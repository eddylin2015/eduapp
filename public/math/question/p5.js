//Option Explicit
'use strict';
if (typeof module !== 'undefined' && module.exports) { 
     var { AFrc, AExps,TmsUts } = require('../utils/tmsUtils');
     var calc = require("../utils/tmsCalcu").calc; 
     //var { UIMathClass } = require('../tmsUIMathClass'); 
}
const tmsU=new TmsUts();

function  CreatAEq(Tx,Tk,Range){
   let TE=new AExps();
   let r0=10,  r1=10,  r2=10;
    switch(Tx){
       case 1:
           r0=10;
           r1=10;
           r2=10;
       break;
       case 2:
            r0=10;
            r1=100;
            r2=10;    
       break;
       case 3:
            r0=100;
            r1=10;
            r2=10;    
       break;
       case 4:
            r0=100;
            r1=100;
            r2=100;break;
   }
   let a=Math.floor(Math.random()*r0)+1;
   let b=Math.floor(Math.random()*r1)+1;
   let x=Math.floor(Math.random()*r2);
   Range["F114"] = a           //       ' a/b "x" + c/d = e/f "x" + g/h
   Range["F115"] = b
   Range["G114"] = (a*x+b)
  /* Range["G115"] = d
   Range["H114"] = e
   Range["H115"] = f
   Range["I114"] = g
   Range["I115"] = h*/
   Range["F116"] = x;
   Range["G116"] = 1;
   TE.St=a+"x+"+b+"="+(a*x+b);
   TE.Val=x;
   TE.CalcVal=x;
   return TE;
}    
class UIMathClassP5 extends UIMathClass {
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
 
function p5_main(){     
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
p5_main();
if (typeof module !== 'undefined' && module.exports) { module.exports = {    example:main,    CreatAEq:CreatAEq} }