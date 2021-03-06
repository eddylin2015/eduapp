class MathClass {
    constructor() {
        //super(height, width);  
        this.QT = [[], [], [], []];
        this.AQT = [[], [], [], []];
        this.QTTime = [[], [], [], []];
    }
    UpdateMathContent(x) {
        var math = document.getElementById("QT00" + x);
        MathJax.Hub.Config({ tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] } });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "QT00" + x]);
    }
    CheckAns(qti, qno, AnsZ, AnsM) {
        let ansx = App.AQT[Number(qti) - 1][qno - 1];
        if ((typeof ansx) == "number") return ansx == AnsZ;
        if ((typeof ansx) == "string") return ansx == AnsZ;
    }
    InitQizData() { }
    GetQizStatement(qti, qno) {
        this.QTTime[qti - 1, qno - 1] = Date.now();
    }
    GetQizAns(qti, qno) {
        this.QTTime[qti - 1, qno - 1] = Date.now() - this.QTTime[qti - 1, qno - 1];
        return App.AQT[Number(qti) - 1][qno - 1];
    }
    GetUseTime(qti, qno) {
        if (this.QTTime[qti - 1, qno - 1] / 1000 > 1200) return 1200;
        return (this.QTTime[qti - 1, qno - 1] / 1000).toFixed(2);
    }
    GetAns_Num(qti, qno) { return App.AQT[Number(qti) - 1][qno - 1]; }
    
    GetAns_Den(qti, qno) { return 1; }
    IsFraction(qti,qno) { return App.AQT[Number(qti) - 1][qno - 1].toString().indexOf('.')>0;}
}
class MathClassG2 extends MathClass {
    InitQizData(i, r0, r1, r2) {
        for (let i = 1; i < 5; i++) {
            let r0 = 10, r1 = 10, r2 = 10;
            switch (i) {
                case 1:
                    r0 = 10;
                    r1 = 10;
                    r2 = 10;
                    break;
                case 2:
                    r0 = 10;
                    r1 = 100;
                    r2 = 10;
                    break;
                case 3:
                    r0 = 100;
                    r1 = 10;
                    r2 = 10;
                    break;
                case 4:
                    r0 = 100;
                    r1 = 100;
                    r2 = 100; break;
            }
            for (let j = 0; j < 10; j++) {
                let a = Math.floor(Math.random() * r0) + 1;
                let b = Math.floor(Math.random() * r1) + 1;
                let x = Math.floor(Math.random() * r2);
                if (a > b) { this.QT[i][j] = a + ",-," + b; this.AQT[i][j] = a - b; }
                else if ((a + b) < 100) { this.QT[i][j] = a + ",+," + b; this.AQT[i][j] = a + b; }
                else { this.QT[i][j] = b + ",-," + a; this.AQT[i][j] = b - a; }
            }
        }
    }
    GetQizStatement(qti, qno) {
        super.GetQizStatement(qti, qno);
        let q_ = this.QT[Number(qti) - 1][qno - 1].split(',');
        return "$$ " + q_[0] + " " + q_[1] + " " + q_[2] + " $$"
    }
}
class MathClassG4 extends MathClass {
    InitQizData(i, r0, r1, r2) {
        for (let i = 1; i < 5; i++) {
            let r0 = 10, r1 = 10, r2 = 10;
            switch (i) {
                case 1:
                    r0 = 10;
                    r1 = 10;
                    r2 = 10;
                    break;
                case 2:
                    r0 = 10;
                    r1 = 100;
                    r2 = 10;
                    break;
                case 3:
                    r0 = 100;
                    r1 = 10;
                    r2 = 10;
                    break;
                case 4:
                    r0 = 100;
                    r1 = 100;
                    r2 = 100; break;
            }
            for (let j = 0; j < 10; j++) {
                let a = Math.floor(Math.random() * r0) + 1;
                let b = Math.floor(Math.random() * r1) + 1;
                let x = Math.floor(Math.random() * r2);
                this.QT[i][j] = a + "," + b + "," + (a * x + b);
                this.AQT[i][j] = x;
            }
        }
    }
    GetQizStatement(qti, qno) {
        super.GetQizStatement(qti, qno);
        let q_ = this.QT[Number(qti) - 1][qno - 1].split(',');
        return "$$ " + q_[0] + " x + " + q_[1] + " = " + q_[2] + " $$"
    }
}