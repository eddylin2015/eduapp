CREATE TABLE qiz
(
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`gid` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`qtitle` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`qfield` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`qgrade` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`qizcode` text CHARACTER SET utf8mb4,
`anscode` text CHARACTER SET utf8mb4,
`qnote` text CHARACTER SET utf8mb4,
`snote` text CHARACTER SET utf8mb4,
`pflag` int(1) CHARACTER SET utf8mb4 NOT NULL,
`pdate` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`createbyid`  varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`createbyname`  varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`createdate`  varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`modifybyid`  varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`modifybyname`  varchar(255) CHARACTER SET utf8mb4 NOT NULL,
`modifydate`  varchar(255) CHARACTER SET utf8mb4 NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `gid_UNIQUE` (`gid`)
)DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;