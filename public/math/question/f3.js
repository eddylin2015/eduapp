//Option Explicit
'use strict';
if (typeof module !== 'undefined' && module.exports) { var { AFrc, AExps,TmsUts } = require('../utils/tmsUtils');var { VMCalc } = require("../utils/tmsCalcu");var calc = require("../utils/tmsCalcu").calc; }
const tmsU=new TmsUts();

//Left, Replace, tmsU.TakeAFrc, Int, Rnd, Str, Trim, AllTrim, Right, DcmToFrc, CDbl
//' ------ Tx Tixing  題型
//' -------Tk Random_base -TK..TK ------
//Public Function CreatAExp( Tx As Integer,Tk As Single, Tx As Integer) As AExps
function CreatAEq(Tx, Tk, Range) {
    let TE = new AExps();
    let a=1,b=1,c=1,m=1,p=1,n=1,q=1;
    switch(Tx){
        case 1:
        p=tmsU.TakeARnd(-10, 10, 0, 1, 0, 0);
        q=tmsU.TakeARnd(-10, 10, 0, 1, 0, 0);
        b=p+q;c=p*q;
        TE.St=`x^2+${b}x+${c}`;
        break;
        case 2:
                p=tmsU.TakeARnd(-16, 16, 0, 1, 0, 0);
                q=tmsU.TakeARnd(-16, 16, 0, 1, 0, 0);
                b=p+q;c=p*q;    
                TE.St=`x^2+${b}x+${c}`;
        break;
        case 3:
                m=tmsU.TakeARnd(0, 5, 0, 1, 0, 0);
                n=tmsU.TakeARnd(0, 5, 0, 1, 0, 0);
                a=m*n;
                p=tmsU.TakeARnd(-16, 16, 0, 1, 0, 0);
                q=tmsU.TakeARnd(-16, 16, 0, 1, 0, 0);
                b=p*n+q*m;c=p*q; 
                TE.St=`${a}x^2+${b}x+${c}`;
        break;
        case 4:
            TE.St="";
            
            break;
    }
    //TE.St=s1;
    Range["F115"] = TE.St
    Range["F116"] = "=" + `(${m}x+${p})(${n}x+${q})`
    TE.Val = Range["F116"]
    TE.CalcVal=Range["F116"]
    return TE
}
//______MAIN________________________________
function f201_main(){
if (true) {
    //  TX TiXing[  1 2 3 4]
    //  TakeARand (Tk,-Tk)
    for (let i = 0; i < 10; i++) {
        let Tk_Arr = [0, 19, 9, 7, 5]
        for (let TiXing = 1; TiXing < 4; TiXing++) {
            //console.log("TiXing:",TiXing);
            let Range = {}
            Range["D15"] = "*"
            Range["E15"] = "%"
            //  let s1 = CreatAEq(TiXing, 9,Range)
            let s1 = CreatAEq(TiXing, Tk_Arr[TiXing], Range)
            console.log(s1.St)
            console.log(s1.Val);
   
            //console.log(TiXing," St ",s1.St, "Val ",s1.Val," Val:",calcvm.calc(s1.Val)); // 42
        }
    }
}
}
f201_main();
if (typeof module !== 'undefined' && module.exports) { module.exports = {    f201_main:f201_main,    CreatAEq:CreatAEq} }
