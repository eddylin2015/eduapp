//Option Explicit
'use strict';
if (typeof module !== 'undefined' && module.exports) { var { AFrc, AExps,TmsUts } = require('../utils/tmsUtils');var calc = require("../utils/tmsCalcu").calc; }
const tmsU=new TmsUts();

function CreatAEq(Tx, Tk, Range) {
    let TE = new AExps();
    let r0 = 10, r1 = 10, r2 = 10;
    switch (Tx) {
        case 1:
            r0 = 10;
            r1 = 10;
            r2 = 10;
            break;
        case 2:
            r0 = 10;
            r1 = 100;
            r2 = 10;
            break;
        case 3:
            r0 = 100;
            r1 = 10;
            r2 = 10;
            break;
        case 4:
            r0 = 100;
            r1 = 100;
            r2 = 100; break;
    }

    let a = Math.floor(Math.random() * r0) + 1;
    let b = Math.floor(Math.random() * r1) + 1;
    let x = Math.floor(Math.random() * r2);
    let opr = "+"
    if (a > b) {
        TE.St = a + "-" + b
        opr = "-"
        TE.Val = a - b
        TE.CalcVal = a - b
    }
    else if ((a + b) < 100) {
        opr = "+"
        TE.St = a + "+" + b;
        TE.Val = a + b
        TE.CalcVal = a + b
    }
    else {
        opr = "-"
        TE.St = b + "-" + a;
        TE.Val = b - a;
        TE.CalcVal = b - a;
    }
    Range["F114"] = a
    Range["G114"] = b
    Range["H114"] = opr
    /*Range["F114"] = a           //                                         ' a/b "x" + c/d = e/f "x" + g/h
     Range["F115"] = b
     Range["G114"] = b
     Range["G115"] = d
     Range["H114"] = e
     Range["H115"] = f
     Range["I114"] = g
     Range["I115"] = h*/
    Range["F116"] = TE.CalcVal
    return TE;
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
if (typeof module !== 'undefined' && module.exports) { module.exports = {    example:main,    CreatAEq:CreatAEq} }