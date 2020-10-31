# 學教應用
## TestMySelf

get-content f1003n.js -encoding utf8 | select -skip 1 | set-content f1003.js -encoding utf8

https://www.npmjs.com/package/math-input

https://f-alonso-vendrell.github.io/math-input/

clone the repo, npm install, npm run watch, and open the index.html page

https://zxing.appspot.com/generator
```
  -var p0data=[],f0data=[],f1data=[ ],f2data=[ ],f3data=[ ];
  -p0data.push({id:'p2',name:'加減'});
  -p0data.push({id:'p5',name:'方程式'});
  -f0data.push({id:'f1',name:'一元一次方程'});
  -f0data.push({id:'f2',name:'有理數運算'});
  -f0data.push({id:'f201',name:'十字相乘法'});
  -f0data.push({id:'f202',name:'一元二次方程'});
  -f1data.push({id:'f1001',name:'有理數的運算(符)'});
  -f1data.push({id:'f1002',name:'整數指數冪的運算(蘇)'});
  -f1data.push({id:'f1003',name:'整式的加減法(符)'});
  -f1data.push({id:'f1004',name:'一元一次方程(蘇)'});
  -f1data.push({id:'f1005',name:'解二元一次方程組(泉）'});
  -f1data.push({id:'f1006',name:'一元一次不等式(蘇)'});
  -f1data.push({id:'f1007',name:'一元一次不等式組(蘇)'});
  -f1data.push({id:'f1008',name:'整式的乘法(符)'});
  -f2data.push({id:'f2001',name:'根式的運算(萍)'});
  -f2data.push({id:'f2002',name:'整式的乘法公式(盈)'});
  -f2data.push({id:'f2003',name:'因式分解(盈)'});
  -f2data.push({id:'f2004',name:'分式的乘除(盈)'});
  -f2data.push({id:'f2005',name:'分式的加減(萍)'});
  -f2data.push({id:'f2006',name:'分式方程(萍)'});
  -f2data.push({id:'f2007',name:'一次函數圖像的性質(健)'});
  -f3data.push({id:'f3001',name:'一元二次方程式(泉）'});
  -f3data.push({id:'f3002',name:'解可化為一元二次方程的分式方程（泉）'});
  -f3data.push({id:'f3003',name:'解二元二次方程組(健)'});
  -f3data.push({id:'f3004',name:'二次函數圖像的性質(健)'});
  -f3data.push({id:'f3005',name:'解直角三角形(蘇)'}  );

mysql> desc reltbl;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| fn       | varchar(128) | YES  | UNI | NULL    |                |
| md       | char(14)     | YES  |     | NULL    |                |
| jsondata | text         | YES  |     | NULL    |                |
| username | varchar(128) | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
5 rows in set (0.06 sec)
                                                                                  mysql>show create table reltbl;
CREATE TABLE `reltbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fn` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `md` char(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jsondata` text COLLATE utf8mb4_unicode_ci,
  `username` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fn` (`fn`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

profile{
  id: 112081777900361093115,
  displayName: "FirstName, SecondName(20SC3A01)",
  username: "FirstName, SecondName(20SC3A01)",
  email: "7ee0000a@mail.mbc.edu.mo",
  encode_username: "base64_encode()",
  image:".jpg"
}

```
config.js
```
'use strict';
const nconf = module.exports = require('nconf');
const path = require('path');
nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'NODE_ENV',
    'PORT',
    'SECRET'
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  // 4. Defaults
  .defaults({
    MYSQL_USER: '',
    MYSQL_PASSWORD: '',
    PORT: 81,
    MATHSMYSQL_HOST: '127.0.0.1',
    MATHSMYSQL_USER: '',
    MATHSMYSQL_PASSWORD: '',
    MATHSMYSQL_DATABASE: 'maths',
    // Set this a secret string of your choosing
    SECRET: 'catcat',
    REDISSTOREHOST:'127.0.0.1',
    REDISPASSWORD:'',
  });

```
C:\Users\uchome\AppData\Roaming\npm
C:\Users\uchome\AppData\Roaming\npm-cache
npm install -g npm@latest 
https://archiveprogram.github.com/
https://github.com/MicrosoftArchive
https://github.com/microsoftarchive/redis
https://github.com/microsoftarchive/redis/releases
```
有理數運算190401
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
```

### 請使用 PowerShell 執行 Python 套件。
```
尋找已安裝的 PowerShell。
以滑鼠右鍵按一下 PowerShell 的捷徑，然後以系統管理員的身分啟動 PowerShell。
在專案外部的目錄中建立獨立的 Python 環境，並啟動該環境：
virtualenv env
env\Scripts\activate
前往專案目錄並安裝依附元件：
cd YOUR_PROJECT
pip install -r requirements.txt
執行應用程式：
python main.py
在網路瀏覽器中，輸入下列網址：
http://localhost:8080

httpd -t
syntax ok
httpd -k install -n apache
net start apache
net stop apache

mysqld --initialize --console 
  bin\mysqld --defaults-file=my.ini --initialize --console

my.ini

[mysqld]
basedir=c:/appserv/mysql
datadir=c:/appserv/mysql/data
[mysqld-8.0]
sql_mode=TRADITIONAL

run.bat
cd c:\code\mysql\
start bin\mysqld --defaults-file=my.ini

註意安裝細節
mysql-8.0.11 不再有 my.ini 設定檔了. 通過mysqld --initialize --console 自動生成MYSQL的初始化配置(data檔目錄等).
用戶名密碼: 這一步才是關鍵!!! 記得加上 --console 參數!
C:\Program Files\MySQL\MySQL Server 8.0\bin>mysqld --initialize --console
2018-05-24T18:31:49.968235Z 0 [System] [MY-013169] [Server] 
C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe (mysqld 8.0.11) 
initializing of server in progress as process 34224
2018-05-24T18:31:56.947634Z 5 [Note] [MY-010454] [Server] 
A temporary password is generated for root@localhost: qk-nm1!hE/4r
2018-05-24T18:32:00.694848Z 0 [System] [MY-013170] [Server] 
C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe (mysqld 8.0.11) 
initializing of server has completed
使用日誌中列印的密碼: qk-nm1!hE/4r
命令列登陸 mysql 終端:
C:\Program Files\MySQL\MySQL Server 8.0\bin>mysql -uroot -p
Enter password: ************
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.11
mysql>
在執行SQL腳本之前,會讓你先改密碼:
mysql>
mysql> show databases;
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.
登陸後執行下麵SQL .
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密碼';
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
Query OK, 0 rows affected (0.03 sec)
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.02 sec)

mysql> use mysql;

mysql> show tables;
+---------------------------+
| Tables_in_mysql           |
+---------------------------+
| columns_priv              |
| component                 |
| db                        |
| default_roles             |
| engine_cost               |
| func                      |
| general_log               |
| global_grants             |
| gtid_executed             |
| help_category             |
| help_keyword              |
| help_relation             |
| help_topic                |
| innodb_index_stats        |
| innodb_table_stats        |
| password_history          |
| plugin                    |
| procs_priv                |
| proxies_priv              |
| role_edges                |
| server_cost               |
| servers                   |
| slave_master_info         |
| slave_relay_log_info      |
| slave_worker_info         |
| slow_log                  |
| tables_priv               |
| time_zone                 |
| time_zone_leap_second     |
| time_zone_name            |
| time_zone_transition      |
| time_zone_transition_type |
| user                      |
+---------------------------+
33 rows in set (0.00 sec)

mysql> desc user;
+------------------------+-----------------------------------+------+-----+-----------------------+-------+
| Field                  | Type                              | Null | Key | Default               | Extra |
+------------------------+-----------------------------------+------+-----+-----------------------+-------+
| Host                   | char(60)                          | NO   | PRI |                       |       |
| User                   | char(32)                          | NO   | PRI |                       |       |
| Select_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Insert_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Update_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Delete_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Create_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Drop_priv              | enum('N','Y')                     | NO   |     | N                     |       |
| Reload_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Shutdown_priv          | enum('N','Y')                     | NO   |     | N                     |       |
| Process_priv           | enum('N','Y')                     | NO   |     | N                     |       |
| File_priv              | enum('N','Y')                     | NO   |     | N                     |       |
| Grant_priv             | enum('N','Y')                     | NO   |     | N                     |       |
| References_priv        | enum('N','Y')                     | NO   |     | N                     |       |
| Index_priv             | enum('N','Y')                     | NO   |     | N                     |       |
| Alter_priv             | enum('N','Y')                     | NO   |     | N                     |       |
| Show_db_priv           | enum('N','Y')                     | NO   |     | N                     |       |
| Super_priv             | enum('N','Y')                     | NO   |     | N                     |       |
| Create_tmp_table_priv  | enum('N','Y')                     | NO   |     | N                     |       |
| Lock_tables_priv       | enum('N','Y')                     | NO   |     | N                     |       |
| Execute_priv           | enum('N','Y')                     | NO   |     | N                     |       |
| Repl_slave_priv        | enum('N','Y')                     | NO   |     | N                     |       |
| Repl_client_priv       | enum('N','Y')                     | NO   |     | N                     |       |
| Create_view_priv       | enum('N','Y')                     | NO   |     | N                     |       |
| Show_view_priv         | enum('N','Y')                     | NO   |     | N                     |       |
| Create_routine_priv    | enum('N','Y')                     | NO   |     | N                     |       |
| Alter_routine_priv     | enum('N','Y')                     | NO   |     | N                     |       |
| Create_user_priv       | enum('N','Y')                     | NO   |     | N                     |       |
| Event_priv             | enum('N','Y')                     | NO   |     | N                     |       |
| Trigger_priv           | enum('N','Y')                     | NO   |     | N                     |       |
| Create_tablespace_priv | enum('N','Y')                     | NO   |     | N                     |       |
| ssl_type               | enum('','ANY','X509','SPECIFIED') | NO   |     |                       |       |
| ssl_cipher             | blob                              | NO   |     | NULL                  |       |
| x509_issuer            | blob                              | NO   |     | NULL                  |       |
| x509_subject           | blob                              | NO   |     | NULL                  |       |
| max_questions          | int(11) unsigned                  | NO   |     | 0                     |       |
| max_updates            | int(11) unsigned                  | NO   |     | 0                     |       |
| max_connections        | int(11) unsigned                  | NO   |     | 0                     |       |
| max_user_connections   | int(11) unsigned                  | NO   |     | 0                     |       |
| plugin                 | char(64)                          | NO   |     | caching_sha2_password |       |
| authentication_string  | text                              | YES  |     | NULL                  |       |
| password_expired       | enum('N','Y')                     | NO   |     | N                     |       |
| password_last_changed  | timestamp                         | YES  |     | NULL                  |       |
| password_lifetime      | smallint(5) unsigned              | YES  |     | NULL                  |       |
| account_locked         | enum('N','Y')                     | NO   |     | N                     |       |
| Create_role_priv       | enum('N','Y')                     | NO   |     | N                     |       |
| Drop_role_priv         | enum('N','Y')                     | NO   |     | N                     |       |
| Password_reuse_history | smallint(5) unsigned              | YES  |     | NULL                  |       |
| Password_reuse_time    | smallint(5) unsigned              | YES  |     | NULL                  |       |
+------------------------+-----------------------------------+------+-----+-----------------------+-------+
49 rows in set (0.00 sec)

[mysqld]
# 設置3306埠
port=3306 # 設置mysql的安裝目錄
basedir=F:\software\eclipse J2EE\mysql-8.0.11-winx64\
# 設置mysql資料庫的資料的存放目錄
datadir=F:\software\eclipse J2EE\mysql-8.0.11-winx64\data
# 允許最大連接數
max_connections=200 # 允許連接失敗的次數。這是為了防止有人從該主機試圖攻擊資料庫系統
max_connect_errors=10 # 服務端使用的字元集預設為UTF8
character-set-server=utf8
# 創建新表時將使用的預設存儲引擎 default-storage-engine=INNODB
# 默認使用“mysql_native_password”外掛程式認證
default_authentication_plugin=mysql_native_password
[mysql]
# 設置mysql用戶端默認字元集 default-character-set=utf8
[client]
# 設置mysql用戶端連接服務端時預設使用的埠
port=3306
default-character-set=utf8
注意，裡面的 basedir 是我本地的安裝目錄，datadir 是我資料庫資料檔案要存放的位置，各項配置需要根據自己的環境進行配置。

3、初始化資料庫
在MySQL安裝目錄的 bin 目錄下執行命令：
mysqld --initialize --console
執行完成後，會列印 root 使用者的初始預設密碼，在執行輸出結果裡面有一段：
[Note] [MY-010454] [Server] A temporary password is generated for root@localhost: rI5rvf5x5G,E 其中root@localhost:
後面的“rI5rvf5x5G,E”就是初始密碼（不含首位空格）。在沒有更改密碼前，需要記住這個密碼，後續登錄需要用到。
要是你手賤，關快了，或者沒記住，那也沒事，刪掉初始化的 datadir 目錄，再執行一遍初始化命令，又會重新生成的。

4、安裝服務
在MySQL安裝目錄的bin目錄下按shift+右鍵執行“在此處打開命令列視窗”
執行mysqld --install和net start mysql安裝並啟動mysql，如果關閉執行net stop mysql
C:\Program Files\MySQL\bin>mysqld --install
Service successfully installed
C:\Program Files\MySQL\bin>net start mysql

5、登錄
在MySQL安裝目錄的bin目錄下按shift+右鍵執行“在此處打開命令列視窗”
執行mysql -u root -p，輸入密碼。

6、修改密碼
登陸後執行下麵命令。
ALTER USER ``'root'``@``'localhost' IDENTIFIED WITH mysql_native_password BY ``'新密碼'``;
```

