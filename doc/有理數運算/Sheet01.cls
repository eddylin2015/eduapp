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
      s1 = Range("C17")
      Sheet01.Shapes.Range(2).TextFrame.Characters.Text = s1
      Sheet01.Shapes.Range(2).Visible = True
    ElseIf Not SwJie Then
      s1 = Range("C18")
      Sheet01.Shapes.Range(2).TextFrame.Characters.Text = s1
      Sheet01.Shapes.Range(2).Visible = True
    ElseIf TiHao < 10 Then                                     ' 未滿10題，
      Range("C7:I8") = ""
      Range("K10:L11") = ""
      Range("K7:L8") = ""
      TiXing = Range("K5")
      TiHao = TiHao + 1
      Range("M5") = TiHao
      ' -----  出題  ------
      Select Case TiXing
      Case 1                                                       ' 整數題型
         TExps = CreatAExp(19, 1)                     ' 最大19
         FmtOut TExps, 1
      Case 2                                                       ' 分數題型
         TExps = CreatAExp(9, 2)
         FmtOut TExps, 2
      Case 3                                                        ' 整數+指數題型
         TExps = CreatAExp(7, 3)
         FmtOut TExps, 3
      Case 4                                                         ' 分數+指數題型
         TExps = CreatAExp(5, 4)
         FmtOut TExps, 4
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
Case "$K$7:$L$7", "$K$8:$L$8", "$K$7:$L$8"                                        ' 答題
      If SwJie = False Then Exit Sub
End Select
Range(TZD).Select
End Sub

' ----------------   重置 ------------------------
' ------ 此處僅為例(有理式運算) , 不同課題會有不同的顯示格式 -------
Private Sub Reset()
   Application.DisplayAlerts = False
   Range("C7:I8").UnMerge
   Range("K7:L8").UnMerge
   Range("K10:L11").UnMerge
   Range("C7:I8") = ""
   Range("K7:L8") = ""
   Range("K10:L11") = ""
   Range("K115:L116") = ""
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
   StdTime(2) = 60
   StdTime(3) = 60
   StdTime(4) = 60
   Epslon = 0.001
   Over = False
   SwJie = True
   Sheet01.Shapes.Range(2).Visible = False
'   Application.DisplayAlerts = True
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
Select Case Tx
Case 1, 3
   Range("C7:I8").Merge
   Range("K7:L8").Merge
   Range("K10:L11").Merge
   If Tx = 1 Then
      Range("D5").Interior.ColorIndex = 20
   Else
      Range("F5").Interior.ColorIndex = 20
   End If
   Range("C7:I8").HorizontalAlignment = xlRight
Case 2, 4
   Range("K7:L7").Merge
   Range("K8:L8").Merge
   Range("K10:L10").Merge
   Range("K11:L11").Merge
   Range("C7:C8").Merge
   Range("E7:E8").Merge
   Range("G7:G8").Merge
   Range("I7:I8").Merge
   If Tx = 2 Then
      Range("E5").Interior.ColorIndex = 20
   Else
      Range("G5").Interior.ColorIndex = 20
   End If
   For i = 1 To 3
      Ad = Chr(66 + 2 * i) + "7"
      Range(Ad).Borders(xlEdgeBottom).Weight = 3
   Next
   Range("K7:L7").Borders(xlEdgeBottom).Weight = 3
   Range("K10:L10").Borders(xlEdgeBottom).Weight = 3
   Range("D7:H8").HorizontalAlignment = xlCenter
   Range("C7").HorizontalAlignment = xlRight
   Range("I7").HorizontalAlignment = xlLeft
   Range("K7:L8").HorizontalAlignment = xlCenter
   Range("K10:L11").HorizontalAlignment = xlCenter
End Select
End Sub

' ----- 將題目按常用格式佈放 -------------
' ------ 不同課題會有不同的佈放格式 -------
Private Sub FmtOut(TExp As AExps, Tx As Integer)
Dim s1 As String, s2 As String, s3 As String, s4 As String, Ad As String
Dim a As Single, b As Single, c As Single
Dim i As Integer, j As Integer, k As Integer
Dim TF As AFrc, Sn(4) As Integer
Application.DisplayAlerts = False
Select Case Tx
Case 1, 3                     '題型1
   Range("C7:I8").Merge
   Range("K7:L8").Merge
   Range("K10:L11").Merge
Case 2, 4
   Range("K7:L7").Merge
   Range("K8:L8").Merge
   Range("K10:L10").Merge
   Range("K11:L11").Merge
   Range("C7:C8").Merge
   Range("E7:E8").Merge
   Range("G7:G8").Merge
   Range("I7:I8").Merge
End Select
Select Case Tx
Case 1                      '題型1
   s1 = TExp.St
   Range("C7") = s1
Case 2                      '題型2
   For i = 1 To 3
     Cells(7, 1 + 2 * i) = TExp.OPr(i)
     Cells(7, 2 + 2 * i) = TExp.Nf(i).FenZ
     Cells(8, 2 + 2 * i) = TExp.Nf(i).FenM
   Next
   Cells(7, 9) = TExp.OPr(4)
Case 3                      '題型3
   s1 = TExps.St
   Range("C7") = s1
   i = 1
   k = 0
   Do While i > 0
      i = InStr(i, s1, "^")
      If i > 0 Then
         k = k + 1
         s1 = Left(s1, i - 1) + Mid(s1, i + 1)
         Sn(k) = Str(i)
      End If
   Loop
   Range("C7") = s1
   For i = 1 To k
      a = Val(Sn(i))
      Range("C7").Characters(a, 1).Font.Superscript = True         '上標字
   Next
Case 4                      '題型4
   For i = 1 To 4
      s1 = AllTrim(TExp.OPr(i))
      If Left(s1, 1) = "^" Then
         TExp.OPr(i - 1) = TExp.OPr(i - 1) + "("
         s1 = ")" + s1
      End If
      j = InStr(s1, "^")
      If j > 0 Then
         If Mid(s1, j - 1, 1) <> ")" Then
            TExp.OPr(i - 1) = TExp.OPr(i - 1) + "("
            Cells(7, 2 * i - 1) = TExp.OPr(i - 1)
            s1 = Left(s1, j - 1) + ")" + Mid(s1, j + 1)
            j = j + 1
         Else
            s1 = Left(s1, j - 1) + Mid(s1, j + 1)
         End If
      End If
      Cells(7, 2 * i + 1) = s1
      If j > 0 Then Cells(7, 2 * i + 1).Characters(j, 1).Font.Superscript = True      '上標字
      If i < 4 Then
         Cells(7, 2 + 2 * i) = TExp.Nf(i).FenZ
         Cells(8, 2 + 2 * i) = TExp.Nf(i).FenM
      End If
   Next
End Select
Application.DisplayAlerts = True
End Sub

' ------------ 給出參考答案 ------------------------
Private Sub ToAns(Tx)
Dim a As Single, s1 As String
Select Case Tx
Case 1, 3
   Range("K10") = Range("F116")
Case 2, 4
   Range("K10") = Range("K115")
   a = Range("K116")
   If a <> 1 Then Range("K11") = Range("K116")
End Select
End Sub
' -------------------  檢測對/錯 ，計算得分 --------------------
' -----------  Tx: 題型，Eps 允許誤差，Dt 耗時 --------
' ----- 此處僅為例， 不同課題，有不同的答案形式 ------------
Private Function CheckAns(Tx As Integer, Eps As Single, Dt As Single) As Single
Dim s1  As String, s2 As String, Mark As Single
Dim i As Integer, j As Integer, k As Single, t As Single
Dim a As Single, b As Single, c As Single, d As Single
On Error GoTo eeee
If Eps = 0 Then Eps = 0.001
k = 1
t = 1 + (StdTime(Tx) - Dt) / StdTime(Tx)               '以耗時與標準時間的相對比率，計算折扣
If t < 0.1 Then t = 0.1
If t > 2 Then t = 2
k = k * t
a = Range("F116")
If Range("K7") = "" Then
   b = -9999
ElseIf Tx = 1 Or Tx = 3 Then
   b = Range("K7")
Else
   s1 = Range("K7") + "/" + Range("K8")
   Range("K20") = "=" + s1
   b = Range("K20")
End If
If Abs(a - b) < Eps Then                           ' 兩種答案的誤差 < Eps, 算對
    Mark = 10 * k                                      ' 形態不同，未約分打 k 折
    Cells(12 + TiHao, 15) = Range("D16")
    Range("O23") = Range("O23") + 1
Else
eeee:
    Mark = 0
    Cells(12 + TiHao, 15) = Range("E16")
End If
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



