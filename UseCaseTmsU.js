const TmsUti=require('./public/math/utils/tmsUtils')
const tmsU=new TmsUti.TmsUts();
const tmsCalcu=new TmsUti.TmsCalcu();
console.log(tmsU.TakeAOpr(["+","-","*","/"]))
console.log(tmsCalcu.RunFrcExpr("1/2+2/8"))
console.log(tmsCalcu.RunExpr("1/2+2/8"))
let St1="2x+-2/8+4ab+xy"
console.log("RunExpr",tmsCalcu.RunExpr(St1,{a:2,b:3,x:3,y:4}))
let cc_list1 = tmsCalcu.Sytex_cclist_x(St1);
cc_list1 = tmsU.AdjExpFmtList(cc_list1);
console.log(cc_list1)
let yy1 = [];
tmsCalcu.proc2opt(cc_list1, yy1);
console.log(yy1)
console.log(tmsCalcu.exprCalc(yy1));




