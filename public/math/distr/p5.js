//import { AExps, AFrc, Left, Replace, TakeAFrc, Int, Rnd, Str, Trim, AllTrim, Right, DcmToFrc, CDbl } from './vba.js';
   
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
       Range["F114"] = a           //                                         ' a/b "x" + c/d = e/f "x" + g/h
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
    //export {CreatAEq    }