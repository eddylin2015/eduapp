const TmsUti = require('./public/math/utils/tmsUtils')
const fs=require('fs')
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
var GROUP_Name = ["男A", "男B", "男C", "男D",, "女A", "女B", "女C", "女D", "男E", "女E"];

let temp_=fs.readFileSync('export.csv').toString();
 temp_=temp_.split("\n");
 temp_.push("0,1,2,3,4,5,6,x^2-1,(-x-8)(-x^2+2),9+x");

for(let i=0;i<temp_.length;i++)
{
    let row=temp_[i].split(",");
    if(row.length==10 && row[9].indexOf('x')>-1)
    {
        let St=row[7].replace(/"/g,"");
        let Ans=row[8].replace(/"/g,"");
        let SAns=row[9].replace(/"/g,"");
        //if(Ans.indexOf('x')>-1)
        {
        //if(v0!=undefined && row[4].indexOf("-x-12")>-1)

        let v0=tmsCalcu.RunExpr(St,{x:11})
        let v1=tmsCalcu.RunExpr(Ans,{x:11})
        let v2=tmsCalcu.RunExpr(SAns,{x:11})
        let v3=tmsCalcu.RunExprV1(St,{x:11})
        let v4=tmsCalcu.RunExprV1(Ans,{x:11})
        let v5=tmsCalcu.RunExprV1(SAns,{x:11})
        if(isNaN(v4) ){}
        else if(v0==v3 && v1==v4 && v2==v5)
        {
        }
        else{
          tmsCalcu.RunExprV1(Ans,{x:11},true)
          console.log(v0,v1,v2,v3,v4,v5,   row[4],St,Ans,SAns);
        }
    }
    }
}

let eSt1="-58/35"
let eSt2="(-58/35)"
let eStv1=tmsCalcu.RunExpr(eSt1,{x:1});
let eStv2=tmsCalcu.RunExpr(eSt2,{x:1});
console.log(eSt1,eStv1,eSt2,eStv2,eStv1==eStv2);
