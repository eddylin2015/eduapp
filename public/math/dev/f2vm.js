
const calc = require("./tmsCalcu").calc;
const f2 = require("./f2")
const f1 = require("./f1")
for (let i = 0; i < 100; i++) {
    let Tk_Arr = [0, 19, 9, 7, 5]
    for (let TiXing = 1; TiXing < 5; TiXing++) {
        //console.log("TiXing:",TiXing);
        let Range = {}
        Range["D15"] = "*"
        Range["E15"] = "%"
        //  let s1 = CreatAEq(TiXing, 9,Range)
        let s1 = f2.CreateExp(TiXing, Tk_Arr[TiXing], Range)
        console.log(s1.St)
        //console.log(s1.Val);
        //console.log("VM", calc.VMCalc(s1.Val));
        //
        let cc_list = calc.Sytex_cclist(s1.Val)
        let yy = []
        calc.proc2opt(cc_list, yy);
        console.log("EX", calc.exprCalc(yy));
    }
}
data = [
   "=1+2+3+3",
   "=0-12+(-8+(-9+4))",
   "=((-6/7)-(-8/7))/(-1/5)",
   "=0-(-1+5)^3-(-3)-1",
   "=((1/2)*(-3/4))^2+(-1/2)",
   "=5-(-8)-5-3",
   "=(1/7)/((3/8)-(1/8))",
   "=0-(-1-(-1))^3-(-1)+3",
   "=0-((2/3)-(-1/2))^3/(-3/4)",
   "=0-12+(-12+(9+(-1)))",
   "=0-((-4/3)*(-1/4))+(-5/3)",
   "=0-(-2)^4+(-6+(5-5)^2)",
   "=0-((-1/4)-(-4/3))^2+(3/4)",
   "=0-2+(-3+(-4))-1",
   "=(8/7)/((-7/4)-(-3/2))",
   "=0-5^4+(2+(6-(-1))^4)",
   "=0-((1/2))^2+(-1/2)*(1/2)",
   "=0-6+1+7+(-3)",
   "=0-((4/3)/(5/7))/(-1/2)",
   "=(-4)^2-(-2+(-3+(-2))^4)",
   "=((3/2)*(4/3))^2*(4/3)",
   "=0-(-4)-(-12-13)+8",
   "=0-(1/3)*((1/6)/(-8/7))",
   "=0-(-5)-5-(-1)^4+4",
   "=((-3/2))^3+(2/3)+(-1/2)",
   "=0-3+(7+(-7))-(-1)",
   "=((-2/5)*(-1/6))*(-7/8)",
   "=0-(5+(-5))^3+3+(-2)",
   "=0-((-4/3))^3/((-4/3)*(4/3))^2",
   "=0-5+11+(-11)+1",
   "=((2/7)-(3/5))-(-4/3)",
   "=0-(-1)^3+(6-(3+1)^3)",
   "=((-1/2)*(3/2))^3+(-2/3)",
   "=0-18-9+9-7",
   "=((-2/3)+(8/7))*(8/3)",
   "=5+(-5+2)^3-3^3",
   "=((1/4)/(3/2))^3*(-4/3)",
   "=0-1+(-11+(-14+1))",
   "=0-((1/8)-(4/7))/(-1/2)",
   "=0-(-1)^2+(4+(-1-5)^4)",
   "=((1/2)+(2/3))^2+(3/2)",
   "=0-7-(-4+(-9+(-2)))",
   "=0-((4/7)+(2/3))-(5/4)",
   "=(5+(-1))^4-1-(-3)",
   "=((-4/3)-(-1/4))^2+(1/3)",
   "=16-(-13-(9+3))",
   "=((1/4)-(7/5))/(-4/5)",
   "=(-1)-(-3-(-1))^4-(-1)^3",
   "=((3/4))^2*((4/3)-(1/4))^3",
   "=1+4-3-2",
   "=0-((4/3)-(-2/3))/(1/4)",
   "=2^4+(-5-(1-2)^4)",
   "=((-1/3)+(-1/2))^2-(3/4)",
   "=0-(5-(-11))-(-5)-(-15)",
   "=0-((1/8)*(-3/4))+(2/7)",
   "=(-1)+(-4-(-3))^4+1^3",
   "=((-1/4))^2-(-2/3)*(-2/3)    ",
]
for (let i = 0; i < data.length; i++) {
    console.log(data[i])
    //
    //console.log("VM", calc.VMCalc(data[i]));
    //
    let cc_list = calc.Sytex_cclist(data[i])
    let yy = []
    calc.proc2opt(cc_list, yy);
    console.log("ex", calc.exprCalc(yy));
}

f1.example()