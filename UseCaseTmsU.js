const TmsUti = require('./public/math/utils/tmsUtils')
const tmsU = new TmsUti.TmsUts();
const tmsCalcu = new TmsUti.TmsCalcu();
console.log(tmsU.TakeAOpr(["+", "-", "*", "/"]))
console.log(tmsCalcu.RunFrcExpr("1/2+2/8"))
console.log(tmsCalcu.RunExpr("1/2+2/8"))
/*
let St1="2x+-2/8+4ab+xy"
console.log("RunExpr",tmsCalcu.RunExpr(St1,{a:2,b:3,x:3,y:4}))
let cc_list1 = tmsCalcu.Sytex_cclist_x(St1);
cc_list1 = tmsU.AdjExpFmtList(cc_list1);
console.log(cc_list1)
let yy1 = [];
tmsCalcu.proc2opt(cc_list1, yy1);
console.log(yy1)
console.log(tmsCalcu.exprCalc(yy1));
*/
let Vals = [
    "-1*x^3*y^0*(8*x^(0)* y^(2)+ (2*x^(3)* y^(0))+ (8*x^(4)* y^(1)))",
    "\\frac{x^{2} + 3x}{x + 3}",
    "1+\\mleft(5\\times5\\mright?",
    "\\mleft(a\\mleft(b+c\\mright?\\mright?",
    "7\\mleft(2x^6y^4-42x^2y^5-1\\mright)",
    "xy",
    "-8x^3 y^2+-2x^6 y^0+-18x^7y^1",
    "-2x^3\\mleft(4y^2+2x^3+9x^5y\\mright?+ 4\\times5\\div3+xy",


]
function fracMark2Expr(vst, idx) {
    function fracFM(vst, idx) {
        let posi = [-1, -1]
        let lbcnt = 0;
        console.log(idx)
        if (idx > -1)
            for (let i = idx; i < vst.length; i++) {
                console.log(i, vst[i]);
                if (vst[i] === '{') { if (lbcnt == 0) { posi[0] = i; }; lbcnt++; }
                else if (vst[i] === '}') { posi[1] = i; lbcnt--; if (lbcnt == 0) { break; } }
            }
        return ([posi[0], posi[1], vst.substring(posi[0], posi[1] + 1)]);
    }
    let fZ = fracFM(vst, idx + 5);
    console.log(fZ);
    console.log(fZ[1]);
    let fM = fracFM(vst, fZ[1] + 1);
    console.log(fM);
    return [vst.substring(idx, fM[1] + 1), ` ((${fZ[2]}) / (${fM[2]})) `];
}
Vals.forEach(vst => {
    //console.log( tmsCalcu.RunExpr(vst,{x:1,y:2}));
    let IAns1=vst;
    console.log(1,IAns1);
    IAns1 = IAns1.replace(/\\times/g, "*")
    IAns1 = IAns1.replace(/\\times/g, "*")
    IAns1 = IAns1.replace(/\\div/g, "/")
    IAns1 = IAns1.replace(/\\mleft/g, "")
    IAns1 = IAns1.replace(/\\mright[?|)]/g, ")")
    console.log(2,IAns1);
    let FenZ = "";
    let FenM = "";
    let idx = IAns1.indexOf('\\frac')
    while(idx>-1){
       let res=fracMark2Expr(IAns1,idx);
       console.log(res)
       IAns1=IAns1.replace(res[0],res[1]);
       idx= IAns1.indexOf('\\frac')
    }
    console.log(3,IAns1);

    
    
    
    let cc_list1 = tmsCalcu.Sytex_cclist_x(IAns1,{x:1,y:2},true);
    cc_list1 = tmsU.AdjExpFmtList(cc_list1);
    console.log(cc_list1)
    let yy1 = [];
    tmsCalcu.proc2opt(cc_list1, yy1);
    console.log(yy1)   
    console.log(1,tmsCalcu.exprCalc(yy1 ,{x:1,y:2}))
    console.log(2,tmsCalcu.RunExpr(IAns1,{x:1,y:2}))
    
});



