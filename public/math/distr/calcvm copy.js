'use strict';
const sandbox = { x: 0 };
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
//處理 二目運算符如 = + - * / ( ) 生成樹狀型式//static TreeItem
function proc2opt(l1, prenode) {
    let cnt = 0;
    while (l1.length == 1 && l1[0][0] == "(") {
        l1 = Sytex_cclist(l1[0].substring(1, l1[0].length - 1));
        cnt++; if (cnt > 10) break;
    }
    /*
      if(l1[0] == '(' && l1[l1.length - 1] == ')') {
          l1.splice(l1.length - 1, 1);
          l1.splice(0, 1);
      }*/
    if (l1.length <= 1) {
        prenode.push(l1[0]);
        return;
    }
    else {
        let opt_ = [];
        for (let si = 0; si < l1.length; si++) {
            let s = l1[si];
            if (s[0] == '(' && s[s.length - 1] == ')') {
                proc2opt(Sytex_cclist(s), prenode);
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

function Sytex_cclist(data) {
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
function exprCalc(expr) {
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
const calc={}
calc.exprCalc=exprCalc;
calc.Sytex_cclist=Sytex_cclist;
calc.proc2opt=proc2opt;
//export  {     exprCalc,     proc2opt,     Sytex_cclist}
//export default calc;
/*
module.exports = {
    exprCalc: exprCalc,
    proc2opt: proc2opt,
    Sytex_cclist: Sytex_cclist
}
*/