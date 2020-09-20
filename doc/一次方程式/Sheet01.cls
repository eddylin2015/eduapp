VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "Sheet01"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Option Explicit
' ------------ 檢測滑鼠著點 -------------------------
Private Sub Worksheet_SelectionChange(ByVal Target As Range)
Dim DTm As Single, s1 As String

On Error Resume Next
TZD = "A2"
Select Case Target.Address
Case "$A$1"
   Range(TZD).Select
   ActiveWorkbook.Save
   ActiveWorkbook.Close
Case "$D$5"                                               '設置題型格式
   Fmt_Tx 1
Case "$E$5"
   Fmt_Tx 2
Case "$F$5"
   Fmt_Tx 3
Case "$G$5"
   Fmt_Tx 4
Case "$Q$6"
   Reset
Case "$O$7"                                                ' 【下一題】出題
   TiXing = Range("K5")
   TiHao = Range("M5")
    If Over Or TiXing = 0 Or StdTime(TiXing) = 0 Then
      Sheet01.Shapes.Range(2).TextFrame.Characters.Text = Range("C17")
      Sheet01.Shapes.Range(2).Visible = True
    ElseIf Not SwJie Then
      Sheet01.Shapes.Range(2).TextFrame.Characters.Text = Range("C18")
      Sheet01.Shapes.Range(2).Visible = True
    ElseIf TiHao < 10 Then                                     ' 未滿10題，
      Range("C7:G8") = ""
      Range("I7:M8") = ""
      Range("F10:F11") = ""
      Range("L10:L11") = ""
      Range("D114:K116") = ""
      TiXing = Range("K5")
      TiHao = TiHao + 1
      Range("M5") = TiHao
      ' -----  出題  ------
      Select Case TiXing
      Case 1                                                       ' 整數題型
         s1 = CreatAEq(TiXing, 9)                    '去出題副程式，最大亂數字9
         FmtOut s1, 1
      Case 2                                                        ' 分數題型
         s1 = CreatAEq(TiXing, 9)                    '去出題副程式，最大亂數字9
         FmtOut s1, 2
      Case 3                                                        ' 整數+指數題型
         s1 = CreatAEq(TiXing, 7)                    '去出題副程式，最大亂數字7
         FmtOut s1, 3
      Case 4                                                          ' 分數+指數題型
         s1 = CreatAEq(TiXing, 4)                    '去出題副程式，最大亂數字7
         FmtOut s1, 4
      End Select
      T1 = Timer                                                   ' 記下起始時間
      SwJie = False                                               ' 允許作答(未解答)
    Else
      Over = True
    End If
Case "$O$9"                                                      ' 【確定】
   If SwJie Or TiXing = 0 Or StdTime(TiXing) = 0 Then                            ' 只能作答一次
      Range(TZD).Select
      Exit Sub
   End If
   DTm = Timer - T1
   ToAns TiXing
   CheckAns TiXing, Epslon, DTm
   SwJie = True
   If TiHao = 10 Then ToReport
Case "$C$3:$D$3", "$G$3:$H$3"
      Exit Sub
Case "$L$10", "$L$11"                                                           ' 答題
      If SwJie = False Then Exit Sub
End Select
Range(TZD).Select
End Sub

' ----------------   重置 ------------------------
' ------ 此處僅為例(有理式運算) , 不同課題會有不同的顯示格式 -------
Private Sub Reset()
   Range("C7:G8") = ""
   Range("I7:M8") = ""
   Range("F10:F11") = ""
   Range("L10:L11") = ""
   Range("D114:K116") = ""
' --------------------------------
   Range("O13:Q22") = ""
   Range("O23") = 0
   Range("Q3") = 0
   Range("Q8") = 0
   Range("Q10") = 0
   Range("K3") = Date
   Range("O3") = Time
   Range("P23") = "=Sum(P13:P22)"
   Range("Q23") = "=Sum(Q13:Q22)"
   TiHao = 0
   Range("M5") = TiHao
   TiXing = Range("K5")
   TZD = "A2"
   StdTime(1) = 30
   StdTime(2) = 30
   StdTime(3) = 45
   StdTime(4) = 60
   Epslon = 0.001
   Over = False
   SwJie = True
   Sheet01.Shapes.Range(2).Visible = False
End Sub

' -------- 設定各種題型的顯示格式 和基準時間 ---------------
' ------ 此處僅為例(有理式運算) , 不同課題會有不同的顯示格式 -------
Private Sub Fmt_Tx(Tx As Integer)
Dim Ad As String, i As Integer
Range(TZD).Select
Reset
TiXing = Tx
Range("K5") = TiXing
Range("D5").Interior.ColorIndex = 33
Range("E5").Interior.ColorIndex = 33
Range("F5").Interior.ColorIndex = 33
Range("G5").Interior.ColorIndex = 33
Range("C7:G8") = ""
Range("I7:M8") = ""
Range("C7:G8").UnMerge
Range("I7:M8").UnMerge
Select Case Tx
Case 1, 2, 3
   If Tx = 1 Then
      Range("D5").Interior.ColorIndex = 20
   ElseIf Tx = 2 Then
      Range("E5").Interior.ColorIndex = 20
   Else
      Range("F5").Interior.ColorIndex = 20
   End If
   Range("C7:G8").Merge
   Range("I7:M8").Merge
   Range("C7:G8").HorizontalAlignment = xlRight
   Range("I7:M8").HorizontalAlignment = xlLeft
Case 4
   Range("G5").Interior.ColorIndex = 20
   Range("F7:F8").Merge
   Range("J7:J8").Merge
   Range("F7").Font.Size = 22
   Range("J7").Font.Size = 22
   Range("C7:G8").HorizontalAlignment = xlCenter
   Range("I7:M8").HorizontalAlignment = xlCenter
   Range("E7").Borders(xlEdgeBottom).Weight = 3
   Range("G7").Borders(xlEdgeBottom).Weight = 3
   Range("I7").Borders(xlEdgeBottom).Weight = 3
   Range("K7").Borders(xlEdgeBottom).Weight = 3
End Select
End Sub

' ----- 將題目按常用格式佈放 -------------
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
Case 4                      '題型4
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
End Sub

' ------------ 給出正確答案 ------------------------
Private Sub ToAns(Tx)
Dim a As Single, f As AFrc
Select Case Tx
Case 1, 3
   Range("F10") = Range("F116")
Case 2, 4
   Range("F10") = Range("F116")
   a = Range("G116")
   If a <> 1 Then Range("F11") = a
End Select

End Sub
' -------------------  檢測對/錯 ，計算得分 --------------------
' -----------  Tx: 題型，Eps 允許誤差，Dt 耗時 --------
' ----- 此處僅為例， 不同課題，有不同的答案形式 ------------
Private Function CheckAns(Tx As Integer, Eps As Single, Dt As Single) As Single
Dim s1  As String, s2 As String, Mark As Single
Dim i As Integer, j As Integer, k As Single, t As Single, m As Single
Dim a As Single, b As Single, c As Single, d As Single
On Error GoTo eeee
If Eps = 0 Then Eps = 0.0001
k = 1
t = 1 + (StdTime(Tx) - Dt) / StdTime(Tx)        '以耗時與標準時間的相對比率，計算折扣
If t < 0.1 Then t = 0.1
If t > 1.9 Then t = 1.9
k = k * t
c = Range("F116"): d = Range("G116")
a = c / d
c = Val(Range("L10")): d = Val(Range("L11"))
If d = 0 Then d = 1
b = c / d
m = 0
If Abs(a - b) < Eps Then m = m + 0.5
c = Range("F116")
d = Val(Range("L10"))
If Abs(c) = Abs(d) Then m = m + 0.5
m = m * k
If m = 0 Then
    Cells(12 + TiHao, 15) = Range("E16")
ElseIf m < 1 Then
    Cells(12 + TiHao, 15) = Range("D16") + Range("E16")
    Range("O23") = Range("O23") + 1
Else
    Cells(12 + TiHao, 15) = Range("D16")
    Range("O23") = Range("O23") + 1
End If
eeee:
Mark = 10 * m
Cells(12 + TiHao, 16) = Dt
Cells(12 + TiHao, 17) = Mark
Range("Q8") = Range("P23")
Range("Q10") = Range("Q23")
a = Range("Q10")
If a > 90 Then
   c = 4
ElseIf a > 70 Then
   c = 3
ElseIf a > 50 Then
   c = 2
Else
   c = 1
End If
Range("Q3") = c
CheckAns = Mark
End Function

' ---------- 填寫報表 -------
Private Sub ToReport()
Dim i As Integer, s1 As String
s1 = "*"
Do While s1 <> ""
  i = i + 1
  s1 = Cells(2 + i, 23)
Loop
Cells(2 + i, 22) = Range("C3")
Cells(2 + i, 23) = Range("G3")
Cells(2 + i, 24) = Range("K3")
Cells(2 + i, 25) = Range("O3")
Cells(2 + i, 26) = Range("Q10")
Cells(2 + i, 27) = Range("Q8")
Cells(2 + i, 28) = Range("K5")
Cells(2 + i, 29) = Range("O23")
Cells(2 + i, 30) = Range("Q3")
End Sub

