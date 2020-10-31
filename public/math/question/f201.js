if (typeof module !== 'undefined' && module.exports) {
    var { AFrc, AExps, TmsUts } = require('../utils/tmsUtils');
    var { VMCalc } = require("../utils/tmsCalcu");
    var calc = require("../utils/tmsCalcu").calc;
    //if (typeof(UIMathClass) == 'undefined') { var {UIMathClass}  =    require("../tmsUIMathClass");
     //   }
}
const tmsU = new TmsUts();

//CreatAExp( Tx As Integer,Tk As Single =0 , Range ={} ) As AExps
//' ------ 十字相乘法 Criss-Cross
//' ------ Tx Tixing  題型
//' -------Tk Random_base -TK..TK ------
//' ------ Return AExps -----
function CreatAEq(Tx, Tk, Range, p_=0, q_=0) {
    let TE = new AExps();
    let a = 1, b = 1, c = 1, m = 1, p = 1, n = 1, q = 1;
    
    switch (Tx) {
        case 1:
            p = tmsU.TakeARnd(-10, 10, 0, 1, 0, 0);
            q = tmsU.TakeARnd(-10, 10, 0, 2, 0, -1* p);
            if(q_ != 0) q=q_
            if(p_ != 0) p=p_
            b = p + q; c = p * q;
            break;
        case 2:
            p = tmsU.TakeARnd(-16, 16, 0, 1, 0, 0);
            q = tmsU.TakeARnd(-16, 16, 0, 2, 0, -1*p);
            b = p + q; c = p * q;
            break;
        case 3:
            m = tmsU.TakeARnd(0, 5, 0, 1, 0, 0);
            n = tmsU.TakeARnd(0, 5, 0, 1, 0, 0);
            a = m * n;
            p = tmsU.TakeARnd(-16, 16, 0, 1, 0, 0);
            q = tmsU.TakeARnd(-16, 16, 0, 2, 0, Math.floor(p*n/m));
            b = p * n + q * m; c = p * q;
            break;
        case 4:
            m = tmsU.TakeARnd(-5, 5, 0, 1, 0, 0);
            n = tmsU.TakeARnd(0, 5, 0, 1, 0, 0);
            if(m*n>0){n=-1*n;}
            a = m * n;
            p = tmsU.TakeARnd(-16, 16, 0, 1, 0, 0);
            q = tmsU.TakeARnd(-16, 16, 0, 2, 0, Math.floor(p*n/m));
            b = p * n + q * m; c = p * q;
            break;
    }
    TE.St =adjustExp( `${a}x^2+${b}x+${c}`);
    Range["F115"] = TE.St
    Range["F116"] = adjustExp(`${m}x+${p}`)
    Range["G116"] = adjustExp(`${n}x+${q}`)
    Range["H116"] = adjustExp(`${m *-1 }x+${p*-1 }`)
    Range["I116"] = adjustExp(`${n *-1 }x+${q*-1 }`)    
    TE.Val = `(${Range["F116"]})(${Range["G116"]})`;
    TE.CalcVal =TE.Val;
    return TE
}
function adjustExp(data)
{   
    let cc_x=calc.Sytex_cclist_x(data);
    //console.log(cc_x)
    let s1="";
    for(let i=0;i<cc_x.length;i++){
        if(cc_x[i]=='1x') {s1+="x";}
        else if(cc_x[i]=='+x') {s1+="x";}
        else if(cc_x[i]=='+1x') {s1+="x";}
        else if(cc_x[i]=='-1x') {s1+="-x";}
        else if(cc_x[i]=="+" && cc_x[i+1]=="-") {}
        else s1+=cc_x[i];
    }
    return s1;
}
class F201_UIMathClass extends UIMathClass {
    InitQizData() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 10; j++) {
                let TiXing = i + 1;
                let Range = {}
                let s1 = CreatAEq(TiXing, 9, Range)
                this.NTE[i][j]=s1;
                this.QT[i][j] = s1.St;
                this.AQT[i][j] = s1.CalcVal;
                this.AQTR[i][j] = Range;
            }
        }
    }
    genEquTestData() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 10; j++) {
                let TiXing = i + 1;
                let Range = {}
                let s1 = CreatAEq(TiXing, 9, Range,-2,-1)
                this.QT[i][j] = s1.St;
                this.AQT[i][j] = s1.CalcVal;
                this.AQTR[i][j] = Range;
            }
        }
    }

    GetQizStatement(qti, qno) {
        super.GetQizStatement(qti, qno);
        return this.QT[Number(qti) - 1][qno - 1];
    }
    GetAnsSt(qti,qno){
        return this.AQT[Number(qti) - 1][qno - 1];        
    }
    CheckAns(qti, qno, AnsZ, AnsM) {
        let ansx = this.AQTR[Number(qti) - 1][qno - 1];
        let AnsSt =  this.AQT[Number(qti) - 1][qno - 1];   
        let ansxx=[ansx["F116"],ansx["G116"],ansx["H116"],ansx["I116"]];
        let ccx=calc.Sytex_cclist_x(AnsZ);
        let flag=[false,false,false,false];
        for(let i=0;i<ccx.length;i++){
            let ccxx=ccx[i];
            if (ccxx[0] == "(" && ccxx[ccxx.length-1] == ")") {
                ccxx =ccxx.substring(1, ccxx.length - 1);
            }
            for(let j=0;j<4;j++) if(ccxx==ansxx[j]) flag[j]=true;
        }
        if(flag[0] && flag[1] || flag[2] && flag[3] )
        {
           return true;
        }
        else{
           return calc.RunExprV1(AnsSt,{x:73})==calc.RunExprV1(AnsZ,{x:73})
        };
        /*
        if (this.IsFraction(qti, qno)) {
            return Math.abs(ansx - (AnsZ / AnsM)) < 0.0001
        } else {
            if ((typeof ansx) == "number") return ansx == AnsZ;
            if ((typeof ansx) == "string") return ansx == AnsZ;
            if ((typeof ansx) == "object") return ansx["F116"] == AnsZ && ansx["G116"] == AnsM;
        }*/
    }
    //GetAns_Num(qti, qno) { return App.AQT[Number(qti) - 1][qno - 1]["F116"]; }
    //GetAns_Den(qti, qno) { return App.AQT[Number(qti) - 1][qno - 1]["G116"]; }
}
//______MAIN________________________________
function f201_main() {
    if (true) {
        //  TX TiXing[ 1 2 3 4]
        //  TakeARand (Tk,-Tk, 0, 1, 0, 0)
        for (let i = 0; i < 10; i++) {
            let Tk_Arr = [0, 10, 16, 16]
            for (let TiXing = 1; TiXing < 2; TiXing++) {
                let Range = {}
                let s1 = CreatAEq(TiXing, Tk_Arr[TiXing], Range)
                //console.log(s1.St,s1.Val,s1.CalcVal);
                //console.log(TiXing," St ",s1.St, "Val ",s1.Val," Val:",calcvm.calc(s1.Val)); // 42
            }
        }
        /*
        let testapp=new F201_UIMathClass();
        testapp.genEquTestData();
        console.log(testapp.GetQizStatement(1,2))
        console.log(testapp.GetAnsSt(1,2))
        console.log(testapp.CheckAns(1,2,"（x-2)(x-1)","" ))
        */
    }
}
f201_main();
let app=new F201_UIMathClass();
if (typeof module !== 'undefined' && module.exports) { module.exports = { F201_UIMathClass: F201_UIMathClass, f201_main: f201_main, CreatAEq: CreatAEq } }