# 學教應用
## TestMySelf
### 此次設計項目如下:一次艱苦旅程,前不着村,後不着店. 
```js
const tmsItems=
[
{id:'p0005',name:'方程式'},
{id:'f0001',name:'一元一次方程'},
{id:'f0002',name:'有理數運算'},
{id:'f0201',name:'十字相乘法'},
{id:'f0202',name:'一元二次方程'},
{id:'f1001',name:'有理數的運算(符)'},
{id:'f1002',name:'整數指數冪的運算(蘇)'},
{id:'f1003',name:'整式的加減法(符)'},
{id:'f1004',name:'一元一次方程(蘇)'},
{id:'f1005',name:'解二元一次方程組(泉）'},
{id:'f1006',name:'一元一次不等式(蘇)'},
{id:'f1007',name:'一元一次不等式組(蘇)'},
{id:'f1008',name:'整式的乘法(符)'},
{id:'f2001',name:'根式的運算(萍)'},
{id:'f2002',name:'整式的乘法公式(盈)'},
{id:'f2003',name:'因式分解(盈)'},
{id:'f2004',name:'分式的乘除(盈)'},
{id:'f2005',name:'分式的加減(萍)'},
{id:'f2006',name:'分式方程(萍)'},
{id:'f2007',name:'一次函數圖像的性質(健)'},
{id:'f3001',name:'一元二次方程式(泉）'},
{id:'f3002',name:'解可化為一元二次方程的分式方程（泉）'},
{id:'f3003',name:'解二元二次方程組(健)'},
{id:'f3004',name:'二次函數圖像的性質(健)'},
{id:'f3005',name:'解直角三角形(蘇)'}  
]
```
### req.user 結構
```json
profile{
  id: 112081777900361093115,
  displayName: "FirstName, SecondName 20S[C|G][0-3]A[0-9][0-9]",
  username: "7ee0000a",
  email: "7ee0000a@mail.mbc.edu.mo",
  encode_username: "base64_encode(usernaem)",
  image:".jpg"
}
```
### config.js
```js
'use strict';
const nconf = module.exports = require('nconf');
const path = require('path');
nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'DATA_BACKEND',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'INSTANCE_CONNECTION_NAME',
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
    PORT: 8080,
    MATHSMYSQL_HOST: '',
    MATHSMYSQL_USER: '',
    MATHSMYSQL_PASSWORD: '',
    MATHSMYSQL_DATABASE: 'maths',
    MATHS_ImgDir:"",
    ACTMYSQL_HOST: '',
    ACTMYSQL_USER: '',
    ACTMYSQL_PASSWORD: '',
    ACTMYSQL_DATABASE: 'sp',    
    MoralEduMYSQL_HOST: '',
    MoralEduMYSQL_USER: '',
    MoralEduMYSQL_PASSWORD: '',
    MoralEduMYSQL_DATABASE: 'me',        
    MoralEdu_ImgDir:"",
    ITDEPTMYSQL_HOST: '',
    ITDEPTMYSQL_USER: '',
    ITDEPTMYSQL_PASSWORD: '',
    ITDEPTMYSQL_DATABASE: 'deptwork',    
    ITBBSMYSQL_HOST: '',
    ITBBSMYSQL_USER: '',
    ITBBSMYSQL_PASSWORD: '',
    ITBBSMYSQL_DATABASE: 'itbbs',        
    SECRET: ''
  });
```
### UseCase config
```js
const config = require('../../config');
const options = {
    host: config.get('MATHSMYSQL_HOST'),
}
```
### Mysql Init , --console 參數
```
bin\mysqld --initialize --console 
bin\mysqld --defaults-file=my.ini --initialize --console
A temporary password is generated for root@localhost: qk-nm1!hE/4r
```
#### my.ini sql_mode=TRADITIONAL
```ini
[mysqld]
basedir=c:/appserv/mysql
datadir=c:/appserv/mysql/data
[mysqld-8.0]
sql_mode=TRADITIONAL

```
#### run SET SQL_SAFE_UPDATES=0
```
start bin\mysqld --defaults-file=my.ini
```

#### 註意安裝細節. 關鍵: --console 參數, 記得用戶名密碼.
```cmd
C:\MySQL8\bin>mysql -u root -p
Enter password: 
mysql> show databases;
ERROR 1820 (HY000): You must reset your password using ALTER USER statement.
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密碼';
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_pass_word';
mysql> show databases;
mysql> use mysql;
mysql> show tables;
mysql> desc user;
```
### my.ini 優化配置
``` 
[mysqld]
# 設置3306埠
port=3306 
# 設置mysql的安裝目錄
basedir=c:\mysql-8\
# 設置mysql資料庫的資料的存放目錄
datadir=c:\mysql-8\data
# 允許最大連接數
max_connections=200 
# 允許連接失敗的次數。這是為了防止有人從該主機試圖攻擊資料庫系統
max_connect_errors=10 
# 服務端使用的字元集預設為UTF8
character-set-server=utf8
# 創建新表時將使用的預設存儲引擎 default-storage-engine=INNODB
# 默認使用“mysql_native_password”外掛程式認證
default_authentication_plugin=mysql_native_password
[mysql]
# 設置mysql用戶端默認字元集 
default-character-set=utf8
[client]
# 設置mysql用戶端連接服務端時預設使用的埠
port=3306
default-character-set=utf8
``` 
#### 安裝服務
``` 
在MySQL安裝目錄的bin目錄下按shift+右鍵執行“在此處打開命令列視窗”
執行mysqld --install和net start mysql安裝並啟動mysql，如果關閉執行net stop mysql
C:\MySQL8\bin>mysqld --install
Service successfully installed
C:\MySQL8\bin>net start mysql
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密碼';
```
### 更新npm
```cmd
C:\Users\uchome\AppData\Roaming\npm
C:\Users\uchome\AppData\Roaming\npm-cache
npm install -g npm@latest 
```
### Redis
```cmd
https://archiveprogram.github.com/
https://github.com/MicrosoftArchive
https://github.com/microsoftarchive/redis
https://github.com/microsoftarchive/redis/releases
```
### 請使用 PowerShell 執行 Python 套件。
```
以系統管理員的身分啟動 PowerShell。
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
```
### apache run as service
```
httpd -t
syntax ok
httpd -k install -n apache
net start apache
net stop apache
```
### PowerShell copy skip 1
get-content f1003n.js -encoding utf8 | select -skip 1 | set-content f1003.js -encoding utf8
### Extra Links
https://www.npmjs.com/package/math-input
https://f-alonso-vendrell.github.io/math-input/
https://zxing.appspot.com/generator
