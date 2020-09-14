'use strict';
if (typeof module !== 'undefined' && module.exports) {
var { AFrc, AExps,TmsUts } = require('./tmsUtils');
}
const tmsU= new TmsUts();
function CreatAEq(Tx, Tk, Range) //As String
{
   let a, b, c, d, e, f, g, h;
   let k11, k12, k21, k22, p, AnsZ, AnsM; //Single
   let St, s1, s2;                //string
   let Tf1, Tf2, Tf3, Tf4, AnsF;  //as AFrc
   switch (Tx) {
      case 1:                                              //                ' ÕûÏµÊýÕûÊý½â  ax+c = g
         b = 1; d = 1; e = 0; f = 1; h = 1                //    '  a/b "x" + c/d = e/f "x" + g/h
         a = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         c = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         AnsZ = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         AnsM = 1
         s1 = tmsU.PlasticAEq(a, 1, c, 1)
         g = a * AnsZ + c
         s2 = tmsU.Str(g);
         break;
      case 2:                                                 //            ' ÕûÏµÊý·ÖÊý½â ax+b = c
         b = 1; d = 1; e = 0; f = 1; h = 1                      //  '  a/b "x" + c/d = e/f "x" + g/h
         a = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         c = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         AnsZ = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         s1 = tmsU.PlasticAEq(a, 1, c, 1)
         g = AnsZ + c
         s2 = tmsU.Str(g)
         AnsM = a
         p = tmsU.HCF(AnsZ, AnsM)
         AnsZ = tmsU.Sgn(a) * AnsZ / p; AnsM = tmsU.Sgn(a) * AnsM / p
         break;
      case 3:                                                    //           ' ÕûÏµÊýÕûÊý½â  ax+b = cx+d
         b = 1; d = 1; f = 1; h = 1                              //     '  a/b "x" + c/d = e/f "x" + g/h
         a = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         c = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         e = tmsU.TakeARnd(-Tk, Tk, 0, 2, 0, a)
         AnsZ = tmsU.TakeARnd(-Tk, Tk, 0, 1, 0, 0)
         AnsM = 1
         s1 = tmsU.PlasticAEq(a, b, c, d)
         g = (a - e) * AnsZ + c
         s2 = tmsU.PlasticAEq(e, 1, g, 1)
         break;
      case 4:                                                        //        '·ÖÏµÊý·ÖÊý½â  ax+b = cx+d
         // ' ------  ·ÖÊýµÄSwIs £º0  ²»ÔÊÐíÕûÊý£¬1 ÔÊÐíÕûÊý£¬2 Õæ·ÖÊý£¬3 ¼Ù·ÖÊý
         Tf1 = tmsU.TakeAFrc(Tk, 0)                                   //   ' a/b "x" + c/d = e/f "x" + g/h
         Tf2 = tmsU.TakeAFrc(Tk, 0)
         Tf3 = tmsU.TakeAFrc(Tk, 0)
         AnsF = tmsU.TakeAFrc(Tk, 0)
         Tf4 = tmsU.FPlusF(Tf1, Tf3, "-")
         Tf4 = tmsU.FxF(Tf4, AnsF)
         Tf4 = tmsU.FPlusF(Tf4, Tf2, "+")
         a = Tf1.Sgn * Tf1.FenZ
         b = Tf1.FenM
         c = Tf2.Sgn * Tf2.FenZ
         d = Tf2.FenM
         e = Tf3.Sgn * Tf3.FenZ
         f = Tf3.FenM
         g = Tf4.Sgn * Tf4.FenZ
         h = Tf4.FenM
         AnsZ = AnsF.Sgn * AnsF.FenZ
         AnsM = AnsF.FenM
         break;
   }
   Range["F114"] = a           //' a/b "x" + c/d = e/f "x" + g/h
   Range["F115"] = b
   Range["G114"] = c
   Range["G115"] = d
   Range["H114"] = e
   Range["H115"] = f
   Range["I114"] = g
   Range["I115"] = h
   Range["F116"] = AnsZ
   Range["G116"] = AnsM
   return tmsU.AllTrim(s1 + "=" + s2)
}

/*
//' ----- ½«ÌâÄ¿°´³£ÓÃ¸ñÊ½Ñ·Å -------------
Private Sub FmtOut(St As String, Tx As Integer)
Dim a As Single, i As Single, k As Single
Dim s1 As String, s2 As String
Select Case Tx
Case 1, 2, 3
   i = InStr(St, "=")
   s1 = Left(St, i - 1)
   s2 = Mid(St, i + 1)
   Range("C7") = s1
   Range("I7") = s2
Case 4                      'ÌâÐÍ4
   s1 = "x"
   a = Range("F114")
   If a = -1 Then
      s1 = "-" + s1
   ElseIf a <> 1 Then
      s1 = Str(a) + s1
   End If
   Range("E7") = s1
   Range("E8") = Range("F115")
   a = Range("G114")
   If a < 0 Then
      Range("F7") = "-"
   Else
      Range("F7") = "+"
   End If
   Range("G7") = Abs(a)
   Range("G8") = Range("G115")
   a = Range("H114")
   s1 = "x"
   If a = -1 Then
      s1 = "-" + s1
   ElseIf a <> 1 Then
      s1 = Str(a) + s1
   End If
   Range("I7") = s1
   Range("I8") = Range("H115")
   a = Range("I114")
   If a < 0 Then
      Range("J7") = "-"
   ElseIf a > 0 Then
      Range("J7") = "+"
   End If
   If a <> 0 Then
      Range("K7") = Abs(a)
      Range("K8") = Range("I115")
   End If
End Select
End Sub*/
//______MAIN________________________________
function FmtOut(equjson) {
   let arr = ["F", "G", "H", "I"];
   let xarr = ["x", "", "x", ""];
   let equ = `$$`;
   for (let i = 0; i < arr.length; i++) {
      equ += " \\frac{" + equjson[arr[i] + "114"] + '}{' + equjson[arr[i] + "115"] + "} " + xarr[i] + " ";
      if (i == 0 || i == 2) { equ += " + "; }
      else if (i == 1) { equ += " = "; }
   }
   equ += "$$";
   return equ
}
function main() {
   if (true)
      for (let i = 0; i < 100; i++) {
         for (let TiXing = 1; TiXing < 5; TiXing++) {
            let Range = {}
            let s1 = CreatAEq(TiXing, 9, Range)
            if (TiXing < 4) {
               console.log(s1, "  x=", Range["F116"], "/", Range["G116"]);
            } else {
               console.log(FmtOut(Range), "  x=", Range["F116"], "/", Range["G116"]);
            }
         }
      }
}

if (typeof module !== 'undefined' && module.exports) {
module.exports = {   example: main,   CreatAEq: CreatAEq,   formatEqu2ML:FmtOut}
}