# 學教應用網頁
## Maths TestMySelf

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