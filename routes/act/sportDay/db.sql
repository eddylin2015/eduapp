CREATE TABLE `stdsportitem` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
        `username` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `displayname` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
        `logtime` datetime DEFAULT NULL,
        `rec` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT 'REC,',
        `classno` varchar(4) CHARACTER SET utf8mb4 NOT NULL,
        `seat` int(11) NOT NULL,
        `stdname` varchar(125) CHARACTER SET utf8mb4 NOT NULL,
        `sex` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
        `birthyear` int(11) DEFAULT NULL,
        `groupname` int(11) DEFAULT NULL,
        `description` text CHARACTER SET utf8mb4,
        `createdTime` datetime DEFAULT NULL,
        `createdBy` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
        `createdById` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `username_UNIQUE` (`username`)
      ) ENGINE=InnoDB AUTO_INCREMENT=1460 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;