/*
'use strict';

class AFrc_ {
    //分數的結構 AFrc :   fraction , denominator
    constructor(){}
    FenZ = 0; //分子 fraction
    FenM = 0; //分母 denominator ，正整型數
    Sgn = 0;  //符號，+1 -1
    Val = 0;  //分數的值，單精型數 decimal Value or 可計算式子
    St = "";  //' 分數的單行運算式，字串
    St1=""; //' 分數的單行運算式，字串 ( -1 ) 加括號
    CalVal=0; //Val 式子運計算結果, 或tmsCalcu 運算結果 //以分式表示結果
}
var KeySigns = {}
KeySigns['\t'] = 0;
KeySigns['\n'] = 0;
KeySigns['\r'] = 0;
KeySigns[';'] = -1;
KeySigns[' '] = 0;
KeySigns['='] = 1;
KeySigns['^'] = 6;
KeySigns['*'] = 4;
KeySigns['/'] = 5;
KeySigns['+'] = 3;
KeySigns['-'] = 3;
KeySigns[':'] = 2;
KeySigns[','] = 2;
class TmsCalcu{
    VMCalc(ValSt) {}
//處理 二目運算符如 = + - * / ( ) 生成樹狀型式//static TreeItem
 proc2opt(l1, prenode) {
    let cnt = 0;
    while (l1.length == 1 && l1[0][0] == "(") {
        l1 = this.Sytex_cclist(l1[0].substring(1, l1[0].length - 1));
        cnt++; if (cnt > 10) break;
    }
    
      //if(l1[0] == '(' && l1[l1.length - 1] == ')') {
      //    l1.splice(l1.length - 1, 1);
      //    l1.splice(0, 1);
      //}
    if (l1.length <= 1) {
        prenode.push(l1[0]);
        return;
    }
    else {
        let opt_ = [];
        for (let si = 0; si < l1.length; si++) {
            let s = l1[si];
            if (s[0] == '(' && s[s.length - 1] == ')') {
                this.proc2opt(this.Sytex_cclist(s), prenode);
            } else
                if (s.length == 1 && Object.keys(KeySigns).indexOf(s) >= 0) {
                    if (opt_.length == 0) {
                        opt_.push(s);
                    }
                    else if (
                        KeySigns[s] <= KeySigns[opt_[opt_.length - 1]]
                    ) {
                        while (KeySigns[s] <= KeySigns[opt_[opt_.length - 1]]) {
                            prenode.push(opt_.pop());
                        }
                        opt_.push(s)

                    } else {
                        opt_.push(s)
                    }
                }
                else {
                    prenode.push(s);
                }
        }
        while (opt_.length > 0) {
            prenode.push(opt_.pop())
        }
    }
}

 Sytex_cclist(data) {
    let cc_list = []
    let lcnt = 0;
    let blockOpt = 0;
    for (let j = 0; j < data.length; j++) {
        let c = data[j];

        switch (c) {
            case '(': ;
                blockOpt += 10;
                if (blockOpt == 10) { cc_list[lcnt] = c } else { cc_list[lcnt] += c; }
                break;
            case ')': ;
                blockOpt -= 10;
                cc_list[lcnt] += c;
                if (blockOpt == 0) {
                    //cc_list[lcnt]=cc_list[lcnt].substring(1,cc_list[lcnt].length - 1);
                    lcnt++;
                }
                break;
            case ':': break;
            case ',': break;
            case '\t': break;
            case '\n': break;
            case '\r': break;
            case ';': break;
            case ' ': break;
            case '=': break;
            case '^': ;
            case '*': ;
            case '/': ;
            case '+': ;
            case '-': ;
                if (blockOpt > 0) { cc_list[lcnt] += c; } else { cc_list[lcnt++] = c; }
                break;
            case '0': ;
            case '1': ;
            case '2': ;
            case '3': ;
            case '4': ;
            case '5': ;
            case '6': ;
            case '7': ;
            case '8': ;
            case '9': ;
            case '.': ;
            
                if (blockOpt > 0) { cc_list[lcnt] += c; }
                else if (lcnt == 1 && cc_list[lcnt - 1] == "-") {
                    cc_list[lcnt - 1] += c;
                } else if (lcnt > 1 && cc_list[lcnt - 1] == "-" && cc_list[lcnt - 2] == "(") {
                    cc_list[lcnt - 1] += c;
                }
                else if (lcnt > 0 && /\d+|d+[.]|d+[.]d+/.test(cc_list[lcnt - 1])) {          // /\d+|d+[.]d+/.  
                    cc_list[lcnt - 1] += c;
                } else {
                    cc_list[lcnt++] = c;
                }
                break;
            default:
            // cc_list[lcnt++]=c;                
        }
    }
    return cc_list;
}
Sytex_cclist_x(data) {
    let cc_list = []
    let lcnt = 0;
    let blockOpt = 0;
    for (let j = 0; j < data.length; j++) {
        let c = data[j];

        switch (c) {
            case '(': ;
                blockOpt += 10;
                if (blockOpt == 10) { cc_list[lcnt] = c } else { cc_list[lcnt] += c; }
                break;
            case ')': ;
                blockOpt -= 10;
                cc_list[lcnt] += c;
                if (blockOpt == 0) {
                    //cc_list[lcnt]=cc_list[lcnt].substring(1,cc_list[lcnt].length - 1);
                    lcnt++;
                }
                break;
            case ':': break;
            case ',': break;
            case '\t': break;
            case '\n': break;
            case '\r': break;
            case ';': break;
            case ' ': break;
            case '=': break;
            case '^': ;
            case '*': ;
            case '/': ;
            case '+': ;
            case '-': ;
                if (blockOpt > 0) { cc_list[lcnt] += c; } else { cc_list[lcnt++] = c; }
                break;
            case '0': ;
            case '1': ;
            case '2': ;
            case '3': ;
            case '4': ;
            case '5': ;
            case '6': ;
            case '7': ;
            case '8': ;
            case '9': ;
            case '.': ;
            case 'x': ;
                if (blockOpt > 0) { cc_list[lcnt] += c; }
                else if (lcnt == 1 && cc_list[lcnt - 1] == "-") {
                    cc_list[lcnt - 1] += c;
                } else if (lcnt > 1 && cc_list[lcnt - 1] == "-" && cc_list[lcnt - 2] == "(") {
                    cc_list[lcnt - 1] += c;
                }
                else if (lcnt > 0 && /\d+|d+[.]|d+[.]d+/.test(cc_list[lcnt - 1])) {          // /\d+|d+[.]d+/.  
                    cc_list[lcnt - 1] += c;
                } else {
                    cc_list[lcnt++] = c;
                }
                break;
            default:
            // cc_list[lcnt++]=c;                
        }
    }
    return cc_list;
}
exprCalc(expr) {
    let stuck = [];
    for (let i = 0; i < expr.length; i++) {
        let s = expr[i]
        stuck.push(s)
        if (Object.keys(KeySigns).indexOf(s) >= 0) {
            let opt = stuck.pop();
            let d2 = stuck.pop();
            let d1 = stuck.pop();
            let r = 0;
            switch (opt) {
                case "+": r = Number(d1) + Number(d2); break;
                case "-": r = Number(d1) - Number(d2); break;
                case "*": r = Number(d1) * Number(d2); break;
                case "/": r = Number(d1) / Number(d2); break;
                case "^": r = Math.pow(Number(d1), Number(d2)); break;
            }
            stuck.push(r);
        }
    }
    return stuck.pop();
}
///frc
procfrc2opt(l1,prenode){
    var patt1 = /^[(][+|-]*\d+[/][+|-]*\d+[)]$/g;
    let cnt = 0;
    while (l1.length == 1 && l1[0][0] == "(") {
        var result = l1[0].match(patt1);
        if(result == null){
        l1 = this.Sytex_cclist(l1[0].substring(1, l1[0].length - 1));
        cnt++; if (cnt > 10) break;
        }else{
            //console.log(result)
            break;
        }
    }
    
    //  if(l1[0] == '(' && l1[l1.length - 1] == ')') {
    //      l1.splice(l1.length - 1, 1);
    //      l1.splice(0, 1);
     // }
    if (l1.length <= 1) {
        prenode.push(l1[0]);
        return;
    }
    else {
        let opt_ = [];
        for (let si = 0; si < l1.length; si++) {
            let s = l1[si];
            if (s[0] == '(' && s[s.length - 1] == ')') {
                var result = s.match(patt1);
                if(result == null){
                    this.procfrc2opt(this.Sytex_cclist(s), prenode);
                }else{
                    prenode.push(s);
                }
            } else
                if (s.length == 1 && Object.keys(KeySigns).indexOf(s) >= 0) {
                    if (opt_.length == 0) {
                        opt_.push(s);
                    }
                    else if (
                        KeySigns[s] <= KeySigns[opt_[opt_.length - 1]]
                    ) {
                        while (KeySigns[s] <= KeySigns[opt_[opt_.length - 1]]) {
                            prenode.push(opt_.pop());
                        }
                        opt_.push(s)
                    } else {
                        opt_.push(s)
                    }
                }
                else {
                    prenode.push(s);
                }
        }
        while (opt_.length > 0) {
            prenode.push(opt_.pop())
        }
    }
}
Sgn(x) { if(isNaN(x))return NaN; if(x==-0) return -1;if(x==+0) return +1;if(x>0) return +1; if(x<0) return -1; }
HCF(i, j) //As Single
{
    let m, n, r, k
    m = Math.abs(i); n = Math.abs(j);
    if (this.Sgn(m) * this.Sgn(n) == 0) {
        n = 1;
    } else {
        if (m < n) { r = m; m = n; n = r }
        r = m % n;
        k = n
        if (r > 0) { n = this.HCF(k, r); }
    }
    return n
}
TakeAB2Frc_(a, b,SwIs=1)//As AFrc_
{
    let r;
    let f = new AFrc_;
    if(a==0) {f.Sgn=1;f.FenZ=0;f.FenM=1;f.Val=0;f.St="(0/1)";return f;}
    let BL =  true;
    while (BL) {
        r = this.HCF(a, b);
        a = a / r; b = b / r
        switch (SwIs) {
            case 0:
                BL = b == 1; break;
            case 1:
                BL = false; break;
            case 2:
                BL = Math.abs(a) >= Math.abs(b) || b == 1; break;
            default:
                BL = Math.abs(a) <= Math.abs(b) || b == 1;
        }
    }
    f.Sgn = this.Sgn(a * b)                              //      ' ·ÖÄ¸×ÜÎªÕý, ´Ó·Ö×ÓÈ¡µÃ·ûºÅ
    f.FenZ = Math.abs(a)                              //    ' È¡µÄ·ûºÅáá£¬·Ö×Ó¸ÄÎªÕý
    f.FenM = Math.abs(b)
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = "(" + (f.Sgn * f.FenZ) + "/" + (f.FenM) + ")"
    return f
}  
D2Frc(expr){
  var patt_frc = /^[(][+|-]*\d+[/][+|-]*\d+[)]$/g;
  var patt_dec = /[+|-]*\d+/g;    
  let r1=expr.match(patt_frc);
  let r2=expr.match(patt_dec);
  if(r1 == null && r2==null){
    throw `ERROR Number FORMAT ${expr}`;
  }else if(r1 == null && r2.length>0 ){
    return this.TakeAB2Frc_(Number(r2[0]),1);
  }else{
      console.log(r2);
    return this.TakeAB2Frc_(Number(r2[0]),Number(r2[1]));
  }
}
FPlusF(Tf1,Tf2,Ts="+"){
    //console.log("f plus f:",Tf1,Tf2,Ts)
    let a1, b1, a2, b2;//Int
    let u, v, n, f = new AFrc_;  // u,v as single; n as int; f As AFrc
    if (Tf1.Sgn == 0) Tf1.Sgn = 1
    if (Tf2.Sgn == 0) Tf2.Sgn = 1
    a1 = Tf1.Sgn * Tf1.FenZ                                         //     ' ½«·ûºÅ¼Óµ½·Ö×ÓÉÏ
    b1 = Tf1.FenM
    a2 = Tf2.Sgn * Tf2.FenZ
    b2 = Tf2.FenM
    if (Ts == "+") {
        u = a1 * b2 + a2 * b1                                         //         ' Í¨·Ö¼Ó¼õááµÄ·Ö×Ó¼ÆËã
    } else {
        u = a1 * b2 - a2 * b1                                         //         ' Í¨·Ö¼Ó¼õááµÄ·Ö×Ó¼ÆËã
    }
    if(u==0){f.Sgn=1;f.FenZ=0;f.FenM=1;f.Val=0;f.St="(0/1)";return f;}
    f.Sgn = this.Sgn(u)                                                         //         ' ÌáÈ¡ºÍ(²î)µÄ·ûºÅ
    u = Math.abs(u)
    v = b1 * b2                                                             //         ' Í¨·ÖµÄ·ÖÄ¸
    n = this.HCF(u, v)
    u = u / n                                                               //              ' Ô¼·Ö
    v = v / n
    f.FenZ = u
    f.FenM = v
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = "("+(f.Sgn * f.FenZ) + "/" + f.FenM+")"
    //console.log(f.St)
    return f
}
FxF(Tf1,Tf2){
    let u, v, n, f = new AFrc_; //u v as single; n:int; f as AFrc
    if (Tf1.Sgn == 0) Tf1.Sgn = 1
    if (Tf2.Sgn == 0) Tf2.Sgn = 1
    f.Sgn = Tf1.Sgn * Tf2.Sgn
    u = Tf1.FenZ * Tf2.FenZ
    v = Tf1.FenM * Tf2.FenM
    n = this.HCF(u, v)
    u = u / n
    v = v / n
    f.FenZ = u
    f.FenM = v
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = "("+(f.Sgn * f.FenZ) + "/" + f.FenM+")"
    return f
}
FdivF(Tf1,Tf2){
    let u, v, n;
    let F1, F2;
    if (Tf1.Sgn == 0) Tf1.Sgn = 1
    if (Tf2.Sgn == 0) Tf2.Sgn = 1
    F2 = Tf2
    u = F2.FenZ
    v = F2.FenM
    F2.FenZ = v
    F2.FenM = u
    return this.FxF(Tf1, F2)
}
FPowN(Tf1,Tf2){
    console.log("FPOWN 0",Tf1)
    let f = new AFrc_;
    let powN=Tf2.FenZ;
    if(Tf2.Sgn<0) { 
        let temp=Tf1.FenM;
        Tf1.FenM=Tf1.FneZ;
        Tf1.FenZ=temp;
        Tf2.Sgn=Tf2.Sgn*-1;
    }


    f.FenZ=Math.pow( Tf1.Sgn   * Tf1.FenZ, powN)
    f.FenM=Math.pow( Tf1.FenM, powN)
    f.Sgn = this.Sgn( f.FenZ )   
    f.FenZ=Math.abs(f.FenZ);
    f.Val = f.Sgn * (f.FenZ / f.FenM)
    f.St = "("+(f.Sgn * f.FenZ) + "/" + f.FenM+")"
    console.log("FPOWN 1",f)
    return f;
}
exprfrcCalc(expr){
    let stuck = [];
    for (let i = 0; i < expr.length; i++) {
        let s = expr[i]
        stuck.push(s)
        if (Object.keys(KeySigns).indexOf(s) >= 0) {
            let opt = stuck.pop();
            let d2 = stuck.pop();
            let d1 = stuck.pop();
            console.log(d1,d2,opt)
            let d1_ = this.D2Frc(d1);
            console.log("D2frc",d1_);
            let d2_ = this.D2Frc(d2);
            let r = "(0/1)";
            switch (opt) {
                case "+": r = this.FPlusF(d1_,d2_,"+").St; break;
                case "-": r = this.FPlusF(d1_,d2_,"-").St; break;
                case "*": r = this.FxF(d1_,d2_).St; break;
                case "/": r = this.FdivF(d1_,d2_).St; break;
                case "^": r = this.FPowN(d1_,d2_).St; break;
            }
            
            stuck.push(r);
        }
    }
    return stuck.pop();
}
simplifyFrc(st)
{
    let f=this.D2Frc(st)
    return f.FenM==1? f.Sgn*f.FenZ :st;
}
///
}


/////////
function VMCalc(ValSt) {
    if (typeof module !== 'undefined' && module.exports) {
    } else {
        return "No VM!";
    }
    const vm = require('vm');
    let sandbox = { x: 0 };
    if (ValSt.indexOf('^') < 1) {
        vm.createContext(sandbox);
        let code = 'x ' + ValSt;
        vm.runInContext(code, sandbox);
        return sandbox.x;
    } else {
        let blockopt = 0;
        let blockoptposi = [-1, -1, -1, -1, -1];
        for (let i = 0; i < ValSt.length; i++) {
            let s = ValSt[i]
            if (s == "(") {
                blockoptposi[Number(blockopt)] = i; blockopt += 1;
            }
            if (s == ")") {
                blockopt -= 1;
                if (i < ValSt.length - 2 && ValSt[i + 1] == "^") {
                    let posi = blockoptposi[blockopt];
                    ValSt = ValSt.substring(0, posi) + "Math.pow(" + ValSt.substring(posi + 1, i) + "," + ValSt[i + 2] + ")" + ValSt.substring(i + 3);
                    blockoptposi = [-1, -1, -1, -1, -1];
                }
            }
        }
        for (let i = 0; i < ValSt.length; i++) {
            let s = ValSt[i]
            if (s == "^") {
                ValSt = ValSt.substring(0, i - 1) + "Math.pow(" + ValSt.substring(i - 1, i) + "," + ValSt[i + 1] + ")" + ValSt.substring(i + 2);
            }
        }
        vm.createContext(sandbox);
        let code = 'x ' + ValSt;
        vm.runInContext(code, sandbox);
        return sandbox.x;
    }
}




////////////
const calc=new TmsCalcu();
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calc:calc, VMCalc: VMCalc }
} else {
}
*/