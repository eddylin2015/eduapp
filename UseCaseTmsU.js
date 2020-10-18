const TmsUti=require('./public/math/utils/tmsUtils')
const tmsU=new TmsUti.TmsUts();
const tmsCalcu=new TmsUti.TmsCalcu();
console.log(tmsU.TakeAOpr(["+","-","*","/"]))
console.log(tmsCalcu.RunFrcExpr("1/2+2/8"))
console.log(tmsCalcu.RunExpr("1/2+2/8"))



