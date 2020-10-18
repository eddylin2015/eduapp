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