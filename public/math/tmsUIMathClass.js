//Option Explicit
'use strict';
class UIMathClass {
    constructor() {
      //super();  
      this.NTE =[[], [], [], []]; // TE
      this.Note=null;
      this.QT = [[], [], [], []];//題目
      this.AQT = [[], [], [], []];//答案
      this.AQTR = [[], [], [], []];//答案儲存陣列RANGE[]
      this.QTTime = [[], [], [], []]; //時間

      /*
      Public TiHao             As Integer               ' 題號
      Public TiXing            As Integer                 ' 題型
      Public Epslon            As Single                  ' 允許誤差
      Public T1                  As Single                  ' 起始計時
      Public StdTime(4)     As Single                  ' 標準時間(解題的限定時間)
      Public Over               As Boolean              ' 10題練習完成
      Public SwJie             As Boolean               ' 是否已經解答
      Public TZD               As String                   ' 滑鼠停駐點
      Public TExps             As AExps
      */    
    }
    UpdateMathContent(x) {
        //顯示代數書寫表達樣本
        MathJax.Hub.Config({ tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] } });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "QT00" + x]);
    }
    /*
    ' -------------------  檢測對/錯 ，計算得分 --------------------
    ' -----------  Tx: 題型，Eps 允許誤差，Dt 耗時 -----------
    ' ----- 此處僅為例， 不同課題，有不同的答案形式 ------------
    ' ----- 以耗時與標準時間的相對比率，計算折扣 ---------------
    */
    CheckAns(qti, qno, AnsZ, AnsM) {
        //檢查 比對答案
        let ansx = App.AQT[Number(qti) - 1][qno - 1];
        if ((typeof ansx) == "number") return ansx == AnsZ;
        if ((typeof ansx) == "string") return ansx == AnsZ;
    }
    InitQizData() {
        //構建式子數據
     }
    GetQizStatement(qti, qno) {
        //顯示式子,記下開始時間 Mathjax
        this.QTTime[qti - 1, qno - 1] = Date.now();
    }
    GetQizSt(qti,qno){
      //取得代數表逹式子 ' 單行字串式
      return  this.QT[Number(qti) - 1][qno - 1];
    }
    GetAnsSt(qti,qno){
      //取得式子答案描述,代數表逹式子' 單行字串式
      return "nothing"
    }
    GetQizAns(qti, qno) {
        //取得答案
        this.QTTime[qti - 1, qno - 1] = Date.now() - this.QTTime[qti - 1, qno - 1];
        return App.AQT[Number(qti) - 1][qno - 1];
    }
    GetUseTime(qti, qno) {
        if (this.QTTime[qti - 1, qno - 1] / 1000 > 1200) return 1200;
        return (this.QTTime[qti - 1, qno - 1] / 1000).toFixed(2);
    }
    //取得答案數值
    GetAns_Num(qti, qno) { return App.AQT[Number(qti) - 1][qno - 1]; }
    //取得答案數分母值
    GetAns_Den(qti, qno) { return 1; }
    //昰答案整數或是分數
    IsFraction(qti,qno) { return App.AQT[Number(qti) - 1][qno - 1].toString().indexOf('.')>0;}
}
 
class MathClassG2 extends UIMathClass {
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
class MathClassG4 extends UIMathClass {
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UIMathClass: UIMathClass, MathClassG4: MathClassG4 };
}
