Attribute VB_Name = "Module1"
Option Explicit
Type AFrc                                      ' 分數的結構
   FenZ     As Long                          ' 分子，正整型數
   FenM    As Long                          ' 分母，正整型數
   Sgn        As Integer                       ' 符號，只取±1
   Val        As Single                         ' 分數的值，單精型數
   St          As String                         ' 分數的單行運算式，字串型
End Type
 
Type AExps                                   '運算式(最多4項)的結構
   Nf(4)       As AFrc                      ' 各項可以是分數或整數(fenz）
   OPr(5)    As String                     ' 運運算元（括弧和指數)
   Val          As Single
   St             As String                    ' 單行字串式
End Type



' ------- Tk 是最大數字 ------
' -------題型   Tx
Public Function CreatAExp(Tk As Single, Tx As Integer) As AExps
Dim TE As AExps, TOp(4) As String, TF As AFrc
Dim TSn(4) As String                                         '單行運算式字串
Dim i As Integer, j As Integer, k As Integer, s1 As String, s2 As String

TOp(0) = "+"
TOp(1) = "-"
TOp(2) = Range("D15")
TOp(3) = Range("E15")
Select Case Tx
Case 1                                                                    '4項整數加減
   For i = 1 To 4
      TE.Nf(i) = TakeAFrc(Tk, 0)
      TE.OPr(i) = TOp(Int(100 * Rnd) Mod 2)         ' 不取乘除, 放在每項之前
      TSn(i) = Str(TE.Nf(i).Sgn * TE.Nf(i).FenZ)
   Next
   s2 = Trim(TE.OPr(1))
   If s1 = "+" Then TE.OPr(1) = ""
   i = Int(100 * Rnd) Mod 4
   Select Case i                                                        ' 隨機選擇括弧狀態（4種)
   Case 0                                                                  ' +1+2+3+4
   Case 1                                                                  ' +(1+2)+3+4
      TE.OPr(1) = TE.OPr(1) + "("
      TE.OPr(3) = ")" + TE.OPr(3)
   Case 2                                                                   ' +1+(2+3)+4
      TE.OPr(2) = TE.OPr(2) + "("
      TE.OPr(4) = ")" + TE.OPr(4)
   Case 3                                                                   ' +1+(2+(3+4))
      TE.OPr(2) = TE.OPr(2) + "("
      TE.OPr(5) = ")" + TE.OPr(5)
      TE.OPr(3) = TE.OPr(3) + "("
      TE.OPr(5) = ")" + TE.OPr(5)
  End Select
   s1 = ""
   For i = 1 To 4
      If i = 1 Then
         If TE.OPr(1) = "-" And TSn(1) < 0 Then TSn(1) = "(" + TSn(1) + ")"
      ElseIf Left(TSn(i), 1) = "-" And Right(TE.OPr(i), 1) <> "(" Then
         TSn(i) = "(" + TSn(i) + ")"
      End If
      s1 = s1 + TE.OPr(i) + TSn(i)
   Next
   s1 = s1 + TE.OPr(5)
   s1 = AllTrim(s1)
Case 2                                                                         ' 3項分數四則
   For i = 1 To 3
      TE.Nf(i) = TakeAFrc(Tk, 0)
      TE.Nf(i).FenZ = TE.Nf(i).Sgn * TE.Nf(i).FenZ
      TE.OPr(i) = TOp(Int(100 * Rnd) Mod 4)              '  放在每項之前
      TSn(i) = "(" + Trim(Str(TE.Nf(i).FenZ) + "/" + Str(TE.Nf(i).FenM)) + ")"
   Next
   TE.OPr(1) = ""
   i = Int(100 * Rnd) Mod 2
   If i = 0 Then TE.OPr(1) = "-"
   i = Int(100 * Rnd) Mod 3
   Select Case i                                                            ' 隨機選擇括弧狀態（4種)
   Case 0                                                                     ' +1+2+3
   Case 1                                                                     ' +(1+2)+3
      TE.OPr(1) = TE.OPr(1) + "("
      TE.OPr(3) = ")" + TE.OPr(3)
   Case 2                                                                     ' +1+(2+3)
      TE.OPr(2) = TE.OPr(2) + "("
      TE.OPr(4) = ") " + TE.OPr(4)
  End Select
   s1 = ""
   For i = 1 To 3
      If Left(TSn(i), 1) = "-" And Right(TE.OPr(i), 1) <> "(" Then TSn(i) = "(" + TSn(i) + ")"
      s1 = s1 + TE.OPr(i) + TSn(i)
   Next
   s1 = s1 + TE.OPr(4)
   s1 = AllTrim(s1)
Case 3                                                                       ' 四項整數+指數
   For i = 1 To 4
      TE.Nf(i) = TakeAFrc(Tk, 0)
      TE.OPr(i) = TOp(Int(100 * Rnd) Mod 2)         ' 不取乘除, 放在每項之前
      TSn(i) = Trim(Str(TE.Nf(i).Sgn * TE.Nf(i).FenZ))
   Next
   s1 = Trim(TE.OPr(1))
   If s1 = "+" Then TE.OPr(1) = ""
   i = Int(100 * Rnd) Mod 4
   j = 2 + Int(100 * Rnd) Mod 3                             ' 指數範圍 (2,3,4)
   k = 2 + Int(100 * Rnd) Mod 3                             ' 指數範圍 (2,3,4)
   Select Case i                                                        ' 隨機選擇括弧狀態（4種)
   Case 0                                                                 ' +1+2+3^j+4
      k = 1 + Int(100 * Rnd) Mod 4                          ' 第 k 項加指數
      TE.OPr(k + 1) = "^" + Str(j) + TE.OPr(k + 1)
   Case 1                                                                 ' +(1+2)^j+3+4
      TE.OPr(1) = TE.OPr(1) + "("
      TE.OPr(3) = ")^" + Str(j) + TE.OPr(3)
   Case 2                                                                 ' +1+(2+3)^j+4^k
      TE.OPr(2) = TE.OPr(2) + "("
      TE.OPr(4) = ")^" + Str(j) + TE.OPr(4)
      TE.OPr(5) = "^" + Str(k) + TE.OPr(5)
   Case 3                                                                 ' +1^j+(2+(3+4)^k)
      TE.OPr(2) = "^" + Str(j) + TE.OPr(2) + "("
      TE.OPr(5) = ")^" + Str(k)
      TE.OPr(3) = TE.OPr(3) + "("
      TE.OPr(5) = TE.OPr(5) + ")"
   End Select
   s1 = ""
   For i = 1 To 4
      If Left(TSn(i), 1) = "-" And Right(TE.OPr(i), 1) <> "(" Then TSn(i) = "(" + TSn(i) + ")"
      s1 = s1 + TE.OPr(i) + TSn(i)
   Next
   s1 = s1 + TE.OPr(5)
   s1 = AllTrim(s1)
Case 4                                                                        ' 3項分數四則+指數
   For i = 1 To 3
      TE.Nf(i) = TakeAFrc(Tk, 0)
      TE.Nf(i).FenZ = TE.Nf(i).Sgn * TE.Nf(i).FenZ
      TE.OPr(i) = TOp(Int(100 * Rnd) Mod 4)              '  放在每項之前
      TSn(i) = Trim(Str(TE.Nf(i).FenZ) + "/" + Str(TE.Nf(i).FenM))
   Next
   If TE.OPr(1) <> "-" Then TE.OPr(1) = ""
   j = 2 + Int(100 * Rnd) Mod 2                                  ' 指數範圍 (2,3)
   k = 5 - j                                                                   ' j,k 各取2,3
   i = Int(100 * Rnd) Mod 3
   Select Case i                                                            ' 隨機選擇括弧狀態（4種)
   Case 0                                                                     ' +1^j+2+3
      TE.OPr(1) = TE.OPr(1) + "("
      TE.OPr(2) = ")^" + Str(j) + TE.OPr(2)
   Case 1                                                                     ' +(1+2)^j+3
      TE.OPr(1) = TE.OPr(1) + "("
      TE.OPr(3) = ")^" + Str(j) + TE.OPr(3)
   Case 2                                                                     ' +1^j+(2+3)^k
      TE.OPr(1) = TE.OPr(1) + "("
      TE.OPr(2) = ")^" + Str(j) + TE.OPr(2) + "("
      TE.OPr(4) = ")^" + Str(k)
  End Select
   s1 = ""
   For i = 1 To 3
      s1 = s1 + TE.OPr(i) + "(" + TSn(i) + ")"
   Next
   s1 = s1 + TE.OPr(4)
   s1 = AllTrim(s1)
End Select
TE.St = s1
If Left(s1, 1) = "-" Then s1 = "0" + s1
s1 = Replace(s1, Range("D15"), "*")
s1 = Replace(s1, Range("E15"), "/")
Range("F115") = s1
Range("F116") = "=" + s1
TE.Val = Range("F116")
If Tx = 2 Or Tx = 4 Then
   TF = DcmToFrc(CDbl(TE.Val), 0.000001)
   Range("K115") = TF.Sgn * TF.FenZ
   Range("K116") = TF.FenM
End If
CreatAExp = TE
End Function

 '------ 取得[Ta, Tb] 間亂數, 小數位 Desm --------
 ' ------ 限制範圍 [Tc, Td]
 ' ------SwIs 是 限制 開關, 0 不限制, 1 限制區域， 2 限制2點
Public Function TakeARnd(Ta As Single, Tb As Single, Desm As Integer, SwIs As Integer, Tc As Single, Td As Single) As Single
Dim r As Single, BL As Boolean
Randomize
BL = True
Do While BL
 r = Ta + (Tb - Ta) * Rnd
 r = Int(r * 10 ^ Desm + 0.5) / 10 ^ Desm
   Select Case SwIs
   Case 0
 BL = False
   Case 1
      BL = (r >= Tc) And (r <= Td)
   Case Else
      BL = (r = Tc) Or (r = Td)
   End Select
Loop
TakeARnd = r
End Function


 ' ------ 建構一個隨機分數,  ---------------
 ' ----- 分子為(-k , k) 內的整數-------
 ' ------  分數的SwIs ：0  不允許整數，1 允許整數，2 真分數，3 假分數
Public Function TakeAFrc(k As Single, SwIs As Integer) As AFrc
Dim a As Single, b As Single, c As Single, r As Integer
Dim F As AFrc, BL As Boolean
 BL = True
 Randomize
Do While BL                                          '
   a = TakeARnd(-k, k, 0, 1, 0, 0)           '  分子
   b = TakeARnd(1, k, 0, 1, 0, 0)             ' 分母
   r = HCF(a, b)
   a = a / r: b = b / r
   Select Case SwIs
   Case 0
      BL = b = 1
      Case 1
      BL = False
   Case 2
      BL = Abs(a) >= Abs(b) Or b = 1
   Case Else
      BL = Abs(a) <= Abs(b) Or b = 1
   End Select
Loop
 F.Sgn = Sgn(a)                                  ' 分母總為正, 從分子取得符號
 F.FenZ = Abs(a)                                ' 取的符號後，分子改為正
 F.FenM = b
F.Val = F.Sgn * (F.FenZ / F.FenM)
F.St = Str(F.Sgn * F.FenZ) + "/" + Str(F.FenM)
TakeAFrc = F
End Function

Public Function HCF(Ta As Single, Tb As Single) As Single
Dim m As Long, n As Long, r As Single, k As Single
m = Abs(CLng(Ta)): n = Abs(CLng(Tb))
If Sgn(m) * Sgn(n) = 0 Then
   n = 1
Else
   If m < n Then r = m: m = n: n = r
 r = m Mod n
 k = n
   If r > 0 Then n = HCF(k, r)
End If
HCF = n
End Function

 ' ------ 分數加法 ---------------
 ' ------- Ts 是 ± 號
Public Function FPlusF(Tf1 As AFrc, Tf2 As AFrc, Ts As String) As AFrc
Dim a1 As Integer, b1 As Integer, a2 As Integer, b2 As Integer
Dim u As Single, v As Single, n As Integer, F As AFrc
If Tf1.Sgn = 0 Then Tf1.Sgn = 1
If Tf2.Sgn = 0 Then Tf2.Sgn = 1
a1 = Tf1.Sgn * Tf1.FenZ                                            ' 將符號加到分子上
b1 = Tf1.FenM
a2 = Tf2.Sgn * Tf2.FenZ
b2 = Tf2.FenM
If Ts = "+" Then
   u = a1 * b2 + a2 * b1                                                   ' 通分加減後的分子計算
Else
   u = a1 * b2 - a2 * b1                                                   ' 通分加減後的分子計算
End If
F.Sgn = Sgn(u)                                                                ' 提取和(差)的符號
u = Abs(u)
v = b1 * b2                                                                    ' 通分的分母
n = HCF(u, v)
u = u / n                                                                           ' 約分
v = v / n
F.FenZ = u
F.FenM = v
F.Val = F.Sgn * (F.FenZ / F.FenM)
If F.FenZ = 0 Then
   F.St = "0"
ElseIf F.FenM = 1 Then
   F.St = AllTrim(Str(F.Sgn * F.FenZ))
Else
   F.St = AllTrim(Str(F.Sgn * F.FenZ) + "/" + Str(F.FenM))
End If
FPlusF = F
End Function


 ' ------ 分數乘法 ------
 ' ----- 分數 x 分數 -------
Public Function FxF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
Dim u As Single, v As Single, n As Integer, F As AFrc
If Tf1.Sgn = 0 Then Tf1.Sgn = 1
If Tf2.Sgn = 0 Then Tf2.Sgn = 1
F.Sgn = Tf1.Sgn * Tf2.Sgn
u = Tf1.FenZ * Tf2.FenZ
v = Tf1.FenM * Tf2.FenM
n = HCF(u, v)
u = u / n
v = v / n
F.FenZ = u
F.FenM = v
F.Val = F.Sgn * (F.FenZ / F.FenM)
F.St = AllTrim(Str(F.Sgn * F.FenZ) + "/ " + Str(F.FenM))
FxF = F
End Function

 ' ------ 分數除法 ------
 ' ----- 分數 /分數 -------
Public Function FdivF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
Dim u As Single, v As Single, n As Integer
Dim F1 As AFrc, F2 As AFrc
If Tf1.Sgn = 0 Then Tf1.Sgn = 1
If Tf2.Sgn = 0 Then Tf2.Sgn = 1
F2 = Tf2
u = F2.FenZ
v = F2.FenM
F2.FenZ = v
F2.FenM = u
FdivF = FxF(Tf1, F2)
End Function



' ------ 小數化分數， Eps 誤差 ------
Public Function DcmToFrc(Ta As Double, Eps As Single) As AFrc
Dim F1 As AFrc, a As Double, b As Double
Dim u As Single, v As Single
Dim i As Integer, j As Integer, k As Integer
Dim s1 As String
F1.Sgn = Sgn(Ta)
a = Abs(Ta)
If Abs(Ta - Int(Ta)) <= Eps Then
   F1.FenZ = Abs(Ta)
   F1.FenM = 1
ElseIf Eps = 0 Then
   s1 = Trim(Str(a))
   i = InStr(s1, ".")
   j = Len(Mid(s1, i + 1))
   u = a * 10 ^ j
   v = 10 ^ j
   j = HCF(u, v)
   u = u / j
   v = v / j
   F1.FenZ = u
   F1.FenM = v
   F1.Val = F1.Sgn * (F1.FenZ / F1.FenM)
Else
   k = Int(a)
   a = a - k
   u = 1: v = 1
   b = u / v + a
   Do While Abs(b - a) > Eps
      If b < a Then
         u = u + 1
      Else
         v = v + 1
      End If
      b = u / v
   Loop
   F1.FenZ = k * v + u
   F1.FenM = v
   F1.Val = F1.Sgn * F1.FenZ / F1.FenM
   F1.St = Str(F1.Sgn * F1.FenZ) + "/" + Str(F1.FenM)
End If
DcmToFrc = F1
End Function


' ------ 在Ss中尋找s1, 如果s1前面一個符號在s2中，則在s1前插入Sk ---
' ------ 例： Ss="3x+1", 要在x前插入一個"*"
' ------ s2="0,1,2,3,4,5,6,7,8,9,"
' ------ Ss=IntoStr(Ss,"x","*",s2)   ==> Ss = 3*x+1    (由不可運算變成可運算)
Public Function IntoStr(Ss As String, s1 As String, Sk As String, s2 As String) As String
Dim i As Integer, j As Integer, Sd As String, St As String
On Error Resume Next
Sd = Ss
i = 1
j = 0
Do While i > 0
  i = InStr(j + 1, Sd, s1)
  If i > 1 Then
     St = Mid(Sd, i - 1, 1) + ","
     If InStr(s2, St) > 0 Then Sd = Left(Sd, i - 1) + Sk + Mid(Sd, i)
  End If
  j = i + 1
Loop
IntoStr = Sd
End Function


' ------- 排除字串前後、中間的所有空格 -------
Public Function AllTrim(Ss As String) As String
Dim i As Integer
Dim s1 As String, s2 As String
s1 = ""
For i = 1 To Len(Ss)
   s2 = Mid(Ss, i, 1)
   If s2 <> " " Then s1 = s1 + s2
Next
AllTrim = s1
End Function

' ----- 從位置 Start 開始，搜索 Ss 中，含Sa 中元素的位置 ----
' ------ 與 Instr不同，此處的Sa可含多個單字母元素，例如：“+,-,*,/" 運運算元。
Public Function Instr2(Start As Integer, Ss As String, Sa As String) As Integer
Dim i As Integer, St As String
i = Start
Do While i < Len(Ss) + 1
   St = Mid(Ss, i, 1) + ","
   If InStr(Sa, St) > 0 Then Exit Do
   i = i + 1
Loop
If i > Len(Ss) Then i = 0
Instr2 = i
End Function



' ----- 文字框捉模彈跳 ----------
Sub TextBox1_Click()
Range("A2").Select
End Sub
' ----------  代替MsgBox ----------
Sub TextBox2_Click()
Sheet01.Shapes.Range(2).Visible = False
Range("A2").Select
End Sub


