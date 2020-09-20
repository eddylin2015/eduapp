Attribute VB_Name = "Module1"
Option Explicit
Type AFrc                                      ' 分數的結構
   FenZ     As Single                          ' 分子，正整型數
   FenM    As Single                         ' 分母，正整型數
   Sgn        As Integer                       ' 符號，只取±1
   Val        As Single                         ' 分數的值，單精型數
   St          As String                         ' 分數的單行運算式，字串型
End Type

Public TiHao              As Integer               ' 題號
Public TiXing            As Integer                 ' 題型
Public Epslon            As Single                  ' 允許誤差
Public T1                  As Single                  ' 起始計時
Public StdTime(4)      As Single                  ' 標準時間(解題的限定時間)
Public Over               As Boolean              ' 10題練習完成
Public SwJie             As Boolean               ' 是否已經解答
Public TZD               As String                   ' 滑鼠停駐點
Public TTF1                As AFrc
Public TTF2                As AFrc

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
'  ------亂數的SwIs 是 限制 開關, 0 不限制, 1 限制區域， 2 限制2點
Public Function TakeAFrc(k As Single, SwIs As Integer) As AFrc
Dim a As Single, b As Single, c As Single, r As Integer
Dim f As AFrc, BL As Boolean
   BL = True
   Randomize
   Do While BL                                          '
      a = TakeARnd(-k, k, 0, 1, 0, 0)          '  分子
      b = TakeARnd(1, k, 0, 1, 0, 0)            ' 分母
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
   f.Sgn = Sgn(a)                                    ' 分母總為正, 從分子取得符號
   f.FenZ = Abs(a)                                  ' 取的符號後，分子改為正
   f.FenM = b
   f.Val = f.Sgn * (f.FenZ / f.FenM)
   f.St = Str(f.Sgn * f.FenZ) + "/" + Str(f.FenM)
   TakeAFrc = f
End Function

' ------- 出題 -------------------------------------------
' ------- 題型； Tx ， 係數的最大值: Tk ------
' ------- CreatAEq 和 Qs 的類型 自定，這裡 Variant  是暫時的 --------
Public Function CreatAEq(Tx As Integer, Tk As Single) As String
Dim a As Single, b As Single, c As Single, d As Single, e As Single, f As Single, g As Single, h As Single
Dim k11 As Single, k12 As Single, k21 As Single, k22 As Single, p As Single, AnsZ As Single, AnsM As Single
Dim St As String, s1 As String, s2 As String
Dim Tf1 As AFrc, Tf2 As AFrc, Tf3 As AFrc, Tf4 As AFrc, AnsF As AFrc
Select Case Tx
Case 1                                                               ' 整係數整數解  ax+c = g
   b = 1: d = 1: e = 0: f = 1: h = 1                        '  a/b "x" + c/d = e/f "x" + g/h
   a = TakeARnd(-Tk, Tk, 0, 1, 0, 0)
   c = TakeARnd(-Tk, Tk, 0, 1, 0, 0)
   AnsZ = TakeARnd(-Tk, Tk, 0, 1, 0, 0)
   AnsM = 1
   s1 = PlasticAEq(a, 1, c, 1)
   g = a * AnsZ + c
   s2 = Str(g)
Case 2                                                               ' 整係數分數解 ax+b = c
   b = 1: d = 1: e = 0: f = 1: h = 1                        '  a/b "x" + c/d = e/f "x" + g/h
   a = TakeARnd(-Tk, Tk, 0, 1, 0, 0)
   c = TakeARnd(-Tk, Tk, 0, 1, 0, 0)
   AnsZ = TakeARnd(-Tk, Tk, 0, 1, 0, 0)
   s1 = PlasticAEq(a, 1, c, 1)
   g = AnsZ + c
   s2 = Str(g)
   AnsM = a
   p = HCF(AnsZ, AnsM)
   AnsZ = Sgn(a) * AnsZ / p: AnsM = Sgn(a) * AnsM / p
Case 3                                                                 ' 整係數整數解  ax+b = cx+d
   b = 1: d = 1:  f = 1: h = 1                                   '  a/b "x" + c/d = e/f "x" + g/h
   a = TakeARnd(-Tk, Tk, 0, 1, 0, 0)
   c = TakeARnd(-Tk, Tk, 0, 1, 0, 0)
   e = TakeARnd(-Tk, Tk, 0, 2, 0, a)
   AnsZ = TakeARnd(-Tk, Tk, 0, 1, 0, 0)
   AnsM = 1
   s1 = PlasticAEq(a, b, c, d)
   g = (a - e) * AnsZ + c
   s2 = PlasticAEq(e, 1, g, 1)
Case 4                                                                  '分係數分數解  ax+b = cx+d
' ------  分數的SwIs ：0  不允許整數，1 允許整數，2 真分數，3 假分數
   Tf1 = TakeAFrc(Tk, 0)                                      ' a/b "x" + c/d = e/f "x" + g/h
   Tf2 = TakeAFrc(Tk, 0)
   Tf3 = TakeAFrc(Tk, 0)
   AnsF = TakeAFrc(Tk, 0)
   Tf4 = FPlusF(Tf1, Tf3, "-")
   Tf4 = FxF(Tf4, AnsF)
   Tf4 = FPlusF(Tf4, Tf2, "+")
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
End Select
Range("F114") = a                                                    ' a/b "x" + c/d = e/f "x" + g/h
Range("F115") = b
Range("G114") = c
Range("G115") = d
Range("H114") = e
Range("H115") = f
Range("I114") = g
Range("I115") = h
Range("F116") = AnsZ
Range("G116") = AnsM
CreatAEq = AllTrim(s1 + "=" + s2)
End Function

' ------ 整理一次式 ，成字串運算式-----
' ------ a/b x + c/d ------------
' ------ 2/3 x + 4/6 ==> 2(x+1)/3
Public Function PlasticAEq(Ta As Single, Tb As Single, Tc As Single, Td As Single) As String
Dim a As Single, b As Single, c As Single, d As Single, k1 As Single, k2 As Single, p As Single
Dim s1 As String, s2 As String, Fh As Integer
a = Ta: b = Tb: c = Tc: d = Td
If b = 1 And d = 1 Then                       ' 整式
   p = Sgn(a)
   k1 = HCF(a, c)
   a = a / k1 * p: c = c / k1 * p: k1 = k1 * p
   s1 = Str(c): If c > 0 Then s1 = "+" + s1
   s1 = "x" + s1
   If a = -1 Then
      s1 = "-" + s1
   ElseIf a <> 1 Then
      s1 = Str(a) + s1
   End If
   If k1 = -1 Then
      s1 = "-" + "(" + s1 + ")"
   ElseIf k1 <> 1 Then
      s1 = Str(k1) + "(" + s1 + ")"
   End If
Else                                                       ' 分式
   

End If
PlasticAEq = AllTrim(s1)
End Function


' ------ 分數加法 ---------------
' ------- Ts 是 ± 號
Public Function FPlusF(Tf1 As AFrc, Tf2 As AFrc, Ts As String) As AFrc
Dim a1 As Integer, b1 As Integer, a2 As Integer, b2 As Integer
Dim u As Single, v As Single, n As Integer, f As AFrc
   If Tf1.Sgn = 0 Then Tf1.Sgn = 1
   If Tf2.Sgn = 0 Then Tf2.Sgn = 1
   a1 = Tf1.Sgn * Tf1.FenZ                                              ' 將符號加到分子上
   b1 = Tf1.FenM
   a2 = Tf2.Sgn * Tf2.FenZ
   b2 = Tf2.FenM
   If Ts = "+" Then
      u = a1 * b2 + a2 * b1                                                  ' 通分加減後的分子計算
   Else
      u = a1 * b2 - a2 * b1                                                  ' 通分加減後的分子計算
   End If
   f.Sgn = Sgn(u)                                                                  ' 提取和(差)的符號
   u = Abs(u)
   v = b1 * b2                                                                      ' 通分的分母
   n = HCF(u, v)
   u = u / n                                                                             ' 約分
   v = v / n
   f.FenZ = u
   f.FenM = v
   f.Val = f.Sgn * (f.FenZ / f.FenM)
   f.St = AllTrim(Str(f.Sgn * f.FenZ) + "/" + Str(f.FenM))
   FPlusF = f
End Function

' ------ 分數乘法 ------
' ----- 分數 x 分數 -------
Public Function FxF(Tf1 As AFrc, Tf2 As AFrc) As AFrc
Dim u As Single, v As Single, n As Integer, f As AFrc
   If Tf1.Sgn = 0 Then Tf1.Sgn = 1
   If Tf2.Sgn = 0 Then Tf2.Sgn = 1
   f.Sgn = Tf1.Sgn * Tf2.Sgn
   u = Tf1.FenZ * Tf2.FenZ
   v = Tf1.FenM * Tf2.FenM
   n = HCF(u, v)
   u = u / n
   v = v / n
   f.FenZ = u
   f.FenM = v
   f.Val = f.Sgn * (f.FenZ / f.FenM)
   f.St = AllTrim(Str(f.Sgn * f.FenZ) + "/ " + Str(f.FenM))
   FxF = f
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
Dim u As Long, v As Long
Dim i As Integer, j As Integer, k As Integer
Dim s1 As String

F1.Sgn = Sgn(Ta)
a = Abs(Ta)
If Abs(Ta - Int(Ta)) <= Eps Then
   F1.FenZ = a
   F1.FenM = 1
   F1.Val = Ta
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

' ------------- 兩個數的 HCF ------------
' ------- i, j 可以為負可以為0，但HCF 總是正的 ------
Public Function HCF(i As Single, j As Single) As Single
Dim m As Long, n As Long, r As Single, k As Single
m = Abs(CLng(i)): n = Abs(CLng(j))
If Sgn(m) * Sgn(n) = 0 Then
   n = 1
Else
   If m < n Then r = m: m = n: n = r
   r = m Mod n
   k = n
   If r > 0 Then n = CLng(HCF(k, r))
End If
HCF = n
End Function

' ------ 多個數的HCF ------
Public Function HCF2(Ts As String) As Single
Dim m As Single, n As Single, r As Single
Dim Ss() As Single, s1 As String, s2 As String
Dim i As Integer, j As Integer, k As Integer, Sn As Integer
s1 = Ts
If Right(s1, 1) <> "," Then s1 = s1 + ","
Sn = 0
Do While s1 <> ""
   i = InStr(s1, ",")
   s2 = Left(s1, i - 1)
   Sn = Sn + 1
   ReDim Preserve Ss(Sn)
   Ss(Sn) = Abs(Val(s2))
   s1 = Mid(s1, i + 1)
Loop
For i = 1 To Sn - 1
   For j = i + 1 To Sn
     If Ss(j) < Ss(i) Then k = Ss(i): Ss(i) = Ss(j): Ss(j) = k
   Next
Next
n = Ss(1)
For i = 2 To Sn
   m = Ss(i)
   If Sgn(m) * Sgn(n) = 0 Then
      n = 1
   Else
      r = m Mod n
      If r > 0 Then n = HCF(n, r)
   End If
Next
HCF2 = n
End Function

' ------ Max ------
Public Function Max(a As Single, b As Single) As Single
Max = a
If a < b Then Max = b
End Function

' ------ Min ------
Public Function Min(a As Single, b As Single) As Single
Min = a
If a > b Then Max = b
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
' ------ 與 Instr不同，此處的Sa可含多個單字母元素，例如：“+,-,*,/" 運算子。
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




