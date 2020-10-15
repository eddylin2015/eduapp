CREATE TABLE qiztx
(
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`gid` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`qtitle` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`qgrade` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`qfield` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`tx`:int(1) unsigned ,
`acnt`:varchar(255),    /* [1,1,2,2 ] */
`atype`:varchar(255),   /* ['num','num','txt','mat']  */
`qizcode` text CHARACTER SET utf8mb4,
`anscode` text CHARACTER SET utf8mb4,
`qnote` text CHARACTER SET utf8mb4,
`snote` text CHARACTER SET utf8mb4,
`pflag` int(1) CHARACTER SET utf8mb4 ,
`pdate` varchar(255) CHARACTER SET utf8mb4 ,
`createbyid`  varchar(255) CHARACTER SET utf8mb4 ,
`createbyname`  varchar(255) CHARACTER SET utf8mb4 ,
`createdate`  varchar(255) CHARACTER SET utf8mb4 ,
`modifybyid`  varchar(255) CHARACTER SET utf8mb4 ,
`modifybyname`  varchar(255) CHARACTER SET utf8mb4,
`modifydate`  varchar(255) CHARACTER SET utf8mb4 ,
 PRIMARY KEY (`id`),
 UNIQUE KEY `gid_UNIQUE` (`gid`)
)DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;