if (typeof module !== 'undefined' && module.exports) {
    var { AFrc, AExps, TmsUts } = require('../utils/tmsUtils');
    var { VMCalc } = require("../utils/tmsCalcu");
    var calc = require("../utils/tmsCalcu").calc;
  //  if (typeof(UIMathClass) == 'undefined') {     var {UIMathClass}  =    require("../tmsUIMathClass");}
}
const tmsU = new TmsUts();

//CreatAExp( Tx As Integer,Tk As Single =0 , Range ={} ) As AExps
//' ------ 十字相乘法 Criss-Cross
//' ------ Tx Tixing  題型
//' -------Tk Random_base -TK..TK ------
//' ------ Return AExps -----
function CreatAEq(Tx, Tk, Range) {
    let TE = new AExps();
    let a = 1, b = 1, c = 1, m = 1, p = 1, n = 1, q = 1;
    switch (Tx) {
        case 1:
            p = tmsU.TakeARnd(-10, 10, 0, 1, 0, 0);
            q = tmsU.TakeARnd(-10, 10, 0, 2, 0, -1* p);
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
    TE.St =adjustExp( `${a}x^2+${b}x+${c}`)+"=0";
    Range["F115"] = TE.St
    Range["F116"] = adjustExp(`${m}x+${p}`)
    Range["G116"] = adjustExp(`${n}x+${q}`)
    Range["H116"] = adjustExp(`${m *-1 }x+${p*-1 }`)
    Range["I116"] = adjustExp(`${n *-1 }x+${q*-1 }`)
    Range["L116"] = adjustExp(`${p / m * -1 }`)
    Range["M116"] = adjustExp(`${q / n * -1 }`)
    let hcfp=calc.HCF(p,m)
    Range["N116"] = adjustExp(`${(p * -1)/hcfp}/${m/hcfp}`)
    let hcfq=calc.HCF(q,n)
    Range["O116"] = adjustExp(`${(q * -1)/hcfq}/${n/hcfq}`)    
    
    TE.Val = `(${Range["F116"]})(${Range["G116"]})`;
    TE.CalcVal =TE.Val;
    return TE
}
function adjustExp(data)
{   
    let cc_x=calc.Sytex_cclist_x(data);
    let s1="";
    for(let i=0;i<cc_x.length;i++){
        if(cc_x[i]=='1x') {s1+="x";}
        else if(cc_x[i]=="+" && cc_x[i+1]=="-") {}
        else s1+=cc_x[i];
    }
    return s1;
}
//______MAIN________________________________
function f202_main() {
    if (true) {
        //  TX TiXing[ 1 2 3 4]
        //  TakeARand (Tk,-Tk, 0, 1, 0, 0)
        for (let i = 0; i < 10; i++) {
            let Tk_Arr = [0, 10, 16, 16]
            for (let TiXing = 1; TiXing < 4; TiXing++) {
                let Range = {}
                let s1 = CreatAEq(TiXing, Tk_Arr[TiXing], Range)
                console.log(s1.St)
                console.log(s1.Val);
                console.log(s1.CalcVal);
                //console.log(TiXing," St ",s1.St, "Val ",s1.Val," Val:",calcvm.calc(s1.Val)); // 42
            }
        }
    }
}
class F202_UIMathClass extends UIMathClass {
    genEquData() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 10; j++) {
                let TiXing = i + 1;
                let Range = {}
                let s1 = CreatAEq(TiXing, 9, Range)
                this.QT[i][j] = s1.St;
                this.AQT[i][j] = s1.CalcVal;
                this.AQTR[i][j] = Range;//L M 116
            }
        }
    }
    showEqu(qti, qno) {
        super.showEqu(qti, qno);
        return this.QT[Number(qti) - 1][qno - 1];
    }
    getStAns(qti,qno){
        let ansx = this.AQTR[Number(qti) - 1][qno - 1];
        let x1="",x2="";
        if(ansx["L116"].indexOf(".")>0) {x1=ansx["N116"];}else{x1=ansx["L116"];}
        if(ansx["M116"].indexOf(".")>0) {x2=ansx["O116"];}else{x2=ansx["M116"];}
        return "x1="+x1+"; x2= "+x2;        
    }
    AllTrim(Ss) {
        let s1 = "", s2; 
        for (let i = 0; i < Ss.length; i++) { s2 = Ss[i]; if (s2 != ' ') s1 += s2;  }
        return s1;
    }
    Frc2D(expr){
        expr=this.AllTrim(expr);
        var patt_frc = /^[(]*[+|-]*\d+[/][+|-]*\d+[)]*$/g;
        var patt_dec = /[+|-]*\d+[.]*\d*/g;    
        let r1=expr.match(patt_frc);
        let r2=expr.match(patt_dec);
        if(r1 == null && r2==null){
          throw `ERROR Number FORMAT ${expr}`;
        }else if(r1 == null && r2.length>0 ){
          return Number(r2[0]);
        }else{
          return Number(r2[0]) / Number(r2[1]);
        }
      }
    equalAns(qti, qno, AnsZ, AnsM) {
        let ansx = this.AQTR[Number(qti) - 1][qno - 1];
        let ansxx=[ansx["L116"],ansx["M116"]];
        let ccx=[0,0];
        if( qti==1 || qti==2 ){
           ccx[0]=Number(AnsZ);
           ccx[1]=Number(AnsM);
        }else{
            ccx[0]=this.Frc2D(AnsZ);
            ccx[1]=this.Frc2D(AnsM);
        }
        let flag=[false,false];
        for(let i=0;i<ccx.length;i++){
            for(let j=0;j<2;j++) if(ccx[i]==ansxx[j]) flag[j]=true;
        }
        return flag[0] && flag[1] ;
    }
    //getAnsNum(qti, qno) { return App.AQT[Number(qti) - 1][qno - 1]["F116"]; }
    //getAnsDen(qti, qno) { return App.AQT[Number(qti) - 1][qno - 1]["G116"]; }
    getAnsDen(qti, qno) { return 1.001; }
    isfraction(qti,qno){return true;} 
}
f202_main();
let app=new F202_UIMathClass();
if (typeof module !== 'undefined' && module.exports) { module.exports = { F202_UIMathClass: F202_UIMathClass, f201_main: f201_main, CreatAEq: CreatAEq } }