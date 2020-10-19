const TmsUti=require('./public/math/utils/tmsUtils')
const tmsU=new TmsUti.TmsUts();
const tmsCalcu=new TmsUti.TmsCalcu();
console.log(tmsU.TakeAOpr(["+","-","*","/"]))
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
let Vals=[
"5*x^0*y^0*(8*x^(5)* y^(0)+ (2*x^(5)* y^(2))+ (-7*x^(0)* y^(2)))",
"-7*x^0*y^0*(3*x^(0)* y^(6)+ (-6*x^(0)* y^(0))+ (-1*x^(5)* y^(8)))",
"-6*x^0*y^3*(6*x^(0)* y^(0)+ (-2*x^(6)* y^(4))+ (-6*x^(2)* y^(3)))",
"-7*x^0*y^0*(-8*x^(0)* y^(6)+ (7*x^(4)* y^(0))+ (0*x^(3)* y^(6)))",
"-6*x^0*y^0*(4*x^(0)* y^(0)+ (5*x^(6)* y^(2))+ (-4*x^(8)* y^(6)))",
"-2*x^0*y^0*(4*x^(6)* y^(0)+ (5*x^(0)* y^(0))+ (-2*x^(2)* y^(3)))",
"7*x^0*y^5*(5*x^(0)* y^(0)+ (-3*x^(7)* y^(2))+ (0*x^(2)* y^(3)))",
"-7*x^4*y^6*(8*x^(2)* y^(1)+ (3*x^(4)* y^(2))+ (-2*x^(0)* y^(0)))",
"4*x^0*y^0*(-6*x^(0)* y^(6)+ (6*x^(4)* y^(0))+ (-8*x^(3)* y^(4)))",
"7*x^0*y^0*(1*x^(0)* y^(8)+ (3*x^(1)* y^(4))+ (1*x^(2)* y^(0)))",
    ]
Vals.forEach(vst => {
   //console.log( tmsCalcu.RunExpr(vst,{x:1,y:2}));
   let cc_list1 = tmsCalcu.Sytex_cclist_x(vst,{x:1,y:2},true);
   //cc_list1 = tmsU.AdjExpFmtList(cc_list1);
   console.log(cc_list1)
   let yy1 = [];
   tmsCalcu.proc2opt(cc_list1, yy1);
   console.log(yy1)   
});




