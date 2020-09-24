'use strict';
/*
一次方程式
*/
if (typeof module !== 'undefined' && module.exports) { 
   var { AFrc, AExps,TmsUts } = require('../utils/tmsUtils'); 
   //var { UIMathClass } = require('../tmsUIMathClass'); 
}

const tmsU= new TmsUts();
/*
' ------- 出題 -------------------------------------------
' ------- 題型； Tx ， 係數的最大值: Tk ------
' ------- CreatAEq 和 Qs 的類型 自定，這裡 Variant  是暫時的 --------*/
function CreatAEq(Tx, Tk, Range) //As AExps
{
   let TE=new AExps();
   let a, b, c, d, e, f, g, h;
   let k11, k12, k21, k22, p, AnsZ, AnsM; //Single
   let St, s1, s2;                //string
   let Tf1, Tf2, Tf3, Tf4, AnsF;  //as AFrc
   switch (Tx) {
      case 1:                                              //' 整係數整數解  ax+c = g
         b = 1; d = 1; e = 0; f = 1; h = 1                //    '  a/b "x" + c/d = e/f "x" + g/h
         a = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         c = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         AnsZ = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         AnsM = 1
         s1 = tmsU.PlasticAEq(a, 1, c, 1)
         g = a * AnsZ + c
         s2 = tmsU.Str(g);
         break;
      case 2:                                                 //    ' 整係數分數解 ax+b = c
         b = 1; d = 1; e = 0; f = 1; h = 1                      //  '  a/b "x" + c/d = e/f "x" + g/h
         a = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         c = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         AnsZ = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         s1 = tmsU.PlasticAEq(a, 1, c, 1)
         g = AnsZ + c
         s2 = tmsU.Str(g)
         AnsM = a
         p = tmsU.HCF(AnsZ, AnsM)
         AnsZ = tmsU.Sgn(a) * AnsZ / p; AnsM = tmsU.Sgn(a) * AnsM / p
         break;
      case 3:                                                    //           ' 整係數整數解  ax+b = cx+d
         b = 1; d = 1; f = 1; h = 1                              //     '  a/b "x" + c/d = e/f "x" + g/h
         a = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         c = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         e = tmsU.TakeARnd(-Tk, Tk, 0, 2, 0, a)
         AnsZ = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         AnsM = 1
         s1 = tmsU.PlasticAEq(a, b, c, d)
         g = (a - e) * AnsZ + c
         s2 = tmsU.PlasticAEq(e, 1, g, 1)
         break;
      case 4:                                                        //        '分係數分數解  ax+b = cx+d
         // ' - ------  分數的SwIs ：0  不允許整數，1 允許整數，2 真分數，3 假分數
         Tf1 = tmsU.TakeAFrc(Tk, 0)                                   //   ' a/b "x" + c/d = e/f "x" + g/h
         Tf2 = tmsU.TakeAFrc(Tk, 0)
         Tf3 = tmsU.TakeAFrc(Tk, 0)
         AnsF = tmsU.TakeAFrc(Tk, 0)
         Tf4 = tmsU.FPlusF(Tf1, Tf3, "-")
         Tf4 = tmsU.FxF(Tf4, AnsF)
         Tf4 = tmsU.FPlusF(Tf4, Tf2, "+")
         a = Tf1.Sgn * Tf1.FenZ
         b = Tf1.FenM
         c = Tf2.Sgn * Tf2.FenZ
         d = Tf2.FenM
         e = Tf3.Sgn * Tf3.FenZ
         f = Tf3.FenM
         g = Tf4.Sgn * Tf4.FenZ
         h = Tf4.FenM
         AnsZ = AnsF.Sgn * AnsF.FenZ
         AnsM = AnsF.FenM
         break;
   }
   Range["F114"] = a           //                                         ' a/b "x" + c/d = e/f "x" + g/h
   Range["F115"] = b
   Range["G114"] = c
   Range["G115"] = d
   Range["H114"] = e
   Range["H115"] = f
   Range["I114"] = g
   Range["I115"] = h
   Range["F116"] = AnsZ
   Range["G116"] = AnsM
   TE.St=tmsU.AllTrim(s1 + "=" + s2);
   if(Tx==4){
      TE.St=` { ${a} \\over ${b} } x + { ${c} \\over ${d} } =  { ${e} \\over ${f} } x + { ${g} \\over ${h} }  `  //$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$
   }
   TE.Val= AnsZ + "/" + AnsM
   TE.CalcVal=Number( AnsZ ) / Number(AnsM)
   return TE
}
class UIMathClassF1 extends UIMathClass {
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

//______MAIN________________________________
//' ----- 將題目按常用格式佈放 -------------
function FmtOut(equjson) {
   let arr = ["F", "G", "H", "I"];
   let xarr = ["x", "", "x", ""];
   let equ = `$$`;
   for (let i = 0; i < arr.length; i++) {
      equ += " \\frac{" + equjson[arr[i] + "114"] + '}{' + equjson[arr[i] + "115"] + "} " + xarr[i] + " ";
      if (i == 0 || i == 2) { equ += " + "; }
      else if (i == 1) { equ += " = "; }
   }
   equ += "$$";
   return equ
}
function f1_main() {
   if (true)
      for (let i = 0; i < 100; i++) {
         for (let TiXing = 1; TiXing < 5; TiXing++) {
            let Range = {}
            let s1 = CreatAEq(TiXing, 9, Range)
            if (TiXing < 4) {
               console.log(s1, "  x=", Range["F116"], "/", Range["G116"]);
            } else {
               console.log(FmtOut(Range), "  x=", Range["F116"], "/", Range["G116"]);
            }
         }
      }
}
if (typeof module !== 'undefined' && module.exports) { module.exports = {   f1_main: f1_main,   CreatAEq: CreatAEq,  FmtOut:FmtOut} }