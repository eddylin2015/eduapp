'use strict';

const mysql = require('mysql');
const config = require('../../../config');
const options = {
    host: config.get('ACTMYSQL_HOST'),
    user: config.get('ACTMYSQL_USER'),
    password: config.get('ACTMYSQL_PASSWORD'),
    database: config.get('ACTMYSQL_DATABASE')
};

const pool = mysql.createPool(options);

function readbyUserName(UserName, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `stdsportitem` WHERE `username` = ? ', UserName, (err, results) => {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, results);
                connection.release();
            });
    });
}
function updateByUserName(username, rec_data, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            "UPDATE `stdsportitem` SET logtime=now(),rec= concat(rec,';',?) WHERE `username` = ? ", [rec_data, username], (err) => {
                if (err) {
                    cb(err);
                    return;
                }
                readbyUserName(username, cb);
                connection.release();
            });
    });
}

function list(userId, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `stdsportitem` order by id;', [],
            (err, results) => {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, results);
                connection.release();
            }
        );
    });
}

function listBy(userId, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `stdsportitem` WHERE `createdById` = ? LIMIT ? OFFSET ?',
            [userId, limit, token],
            (err, results) => {
                if (err) {
                    cb(err);
                    return;
                }
                const hasMore = results.length === limit ? token + results.length : false;
                cb(null, results, hasMore);
                connection.release();
            });
    });
}


function listTimestampBy(userId, activity, sdate, edate, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `stdsportitem` WHERE `activity` = ?  and (`logDate` between ? and ? ) order by  id  LIMIT ? OFFSET ?',
            [activity, sdate, edate, limit, token],
            (err, results) => {
                if (err) {
                    cb(err);
                    return;
                }
                const hasMore = results.length === limit ? token + results.length : false;
                cb(null, results, hasMore);
                connection.release();
            });
    });
}

function create(userId, data, cb) {
    console.log(data);
    pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO `stdsportitem` SET ?', data, (err, res) => {
            if (err) {
                cb(err);
                return;
            }
            read(userId, res.insertId, cb);
            connection.release();
        });
    });
}

function read(id, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `stdsportitem` WHERE `id` = ? ', id, (err, results) => {
                if (!err && !results.length) {
                    err = {
                        code: 404,
                        message: 'Not found'
                    };
                }
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, results[0]);
                connection.release();
            });
    });
}

function update(userId, id, data, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'UPDATE `stdsportitem` SET ? WHERE `id` = ?  and `createdById` = ?', [data, id, userId], (err) => {
                if (err) {
                    cb(err);
                    return;
                }
                read(userId, id, cb);
                connection.release();
            });
    });
}
function _delete(userId, id, cb) {
    pool.getConnection(function (err, connection) {
        connection.query('DELETE FROM `stdsportitem` WHERE `id` = ?  and  `createdById` = ?', [id, userId], cb);
        connection.release();
    });
}
//SP//
function SPReadName(si_id, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT s_item,lock_time,name_ctx FROM `sport_item` WHERE `si_id` = ? ', si_id, (err, results) => {
                if (!err && !results.length) {
                    err = {
                        code: 404,
                        message: 'Not found'
                    };
                }
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, results[0]);
                connection.release();
            });
    });
}
function SPReadRC(si_id, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT si_id,s_item,lock_time,rc_ctx FROM `sport_item` WHERE `si_id` = ? ', si_id, (err, results) => {
                if (!err && !results.length) {
                    err = {
                        code: 404,
                        message: 'Not found'
                    };
                }
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, results[0]);
                connection.release();
            });
    });
}

function SPUpdateRC(siid, data, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'UPDATE `sport_item` SET ? WHERE `si_id` = ?  ', [data, siid, userId], (err) => {
                if (err) {
                    cb(err);
                    return;
                }
                read(userId, id, cb);
                connection.release();
            });
    });
}
function SPUpdateName(siid, data, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'UPDATE `sport_item` SET ? WHERE `id` = ? ', [data, siid], (err) => {
                if (err) {
                    cb(err);
                    return;
                }
                read(userId, id, cb);
                connection.release();
            });
    });
}
function SPIndexList(cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT si_id,s_item,lock_time,lock_item FROM `sport_item` order by lock_time desc;', [],
            (err, results) => {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, results);
                connection.release();
            }
        );
    });
}



//SP end//
module.exports = {
    createSchema: createSchema,
    readbyUserName: readbyUserName,
    updateByUserName: updateByUserName,
    list: list,
    listBy: listBy,
    listTimestampBy: listTimestampBy,
    create: create,
    read: read,
    update: update,
    delete: _delete,
    SPReadName:SPReadName,
    SPReadRC:SPReadRC,
    SPIndexList:SPIndexList,
    SPUpdateName:SPUpdateName,
    SPUpdateRC:SPUpdateRC,
};
if (module === require.main) {
    const prompt = require('prompt');
    prompt.start();
    console.log(
        `Running this script directly will allow you to initialize your mysql
    database.\n This script will not modify any existing tables.\n`);
    prompt.get(['user', 'password'], (err, result) => {
        if (err) {
            return;
        }
        createSchema(result);
    });
}
function createSchema(config) {
    const connection = mysql.createConnection(extend({
        multipleStatements: true
    }, config));
    connection.query(
        `CREATE DATABASE IF NOT EXISTS \`act\`
      DEFAULT CHARACTER SET = 'utf8mb4'
      DEFAULT COLLATE 'utf8mb4_unicode_ci';
    USE \`act\`;
    CREATE TABLE IF NOT EXISTS \`act\`.\`stdsportitem\` (
        \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
        \`username\` varchar(255) NOT NULL,
        \`displayname\` varchar(255) DEFAULT NULL,
        \`logtime\` datetime DEFAULT NULL,
        \`rec\` varchar(255) NOT NULL,
        \`classno\` varchar(4) NOT NULL,
        \`seat\` int(11) NOT NULL,
        \`stdname\` varchar(125) NOT NULL,
        \`birthyear\` int(11) DEFAULT NULL,
        \`groupname\` int(11) DEFAULT NULL,
        \`description\` text,
        \`createdTime\` datetime DEFAULT NULL,
        \`createdBy\` varchar(255) DEFAULT NULL,
        \`createdById\` varchar(255) DEFAULT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`username_UNIQUE\` (\`username\`)
      ) ENGINE=InnoDB DEFAULT DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        (err) => {
            if (err) {
                throw err;
            }
            console.log('Successfully created schema');
            connection.end();
        }
    );
}