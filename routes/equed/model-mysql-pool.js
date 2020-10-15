'use strict';

const mysql = require('mysql');
const config = require('../../config');
const options = {
    host: config.get(    'MATHSMYSQL_HOST'),
    user: config.get(    'MATHSMYSQL_USER'),
    password: config.get('MATHSMYSQL_PASSWORD'),
    database: config.get('MATHSMYSQL_DATABASE')
};
const pool = mysql.createPool(options);

function read(id, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `item` WHERE `id` = ? ', id, (err, results) => {
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

function listForFont(pdate, limit, token, cb) {
    //token = token ? parseInt(token, 100) : 0;
    limit = 100;
    token = 0;
    pool.getConnection(function (err, connection) {
        connection.query(
            "SELECT id,type,item FROM `item` WHERE `item_date` >= ? or `type`='slideimg'  order by id desc LIMIT ? OFFSET ?;",
            [pdate, limit, token],
            (err, results) => {
                if (err) {
                    cb(err);
                    return;
                }
                //const hasMore = results.length === limit ? token + results.length : false;
                const hasMore = true;
                cb(null, results, hasMore);
                connection.release();
            });
    });
}

function listByType(metype, limit, token, cb) {
    //token = token ? parseInt(token, 10) : 0;
    limit = 100;
    token = 0;
    pool.getConnection(function (err, connection) {
        console.log(err);
        connection.query(
            'SELECT * FROM `item` WHERE `type` in (?)  order by id desc LIMIT ? OFFSET ?',
            [metype, limit, token],
            (err, results) => {
                if (err) {
                    cb(err);
                    return;
                }
                //const hasMore = results.length === limit ? token + results.length : false;
                const hasMore = false;
                cb(null, results, hasMore);
                connection.release();
            });
    });
}

function list(limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    console.log(limit, token);
    pool.getConnection(function (err, connection) {
        if (err) { cb(err); return; }
        // Use the connection
        connection.query(
            'SELECT * FROM `item` order by id DESC LIMIT ? OFFSET ?', [limit, token],
            (err, results) => {
                if (err) {
                    cb(err);
                    return;
                }
                const hasMore = results.length === limit ? token + results.length : false;
                cb(null, results, hasMore);
                connection.release();
            }
        );
    });
}

function update(id, data, cb) {
    pool.getConnection(function (err, connection) {
        if (err) { cb(err); return; }
        connection.query(
            'UPDATE `item` SET ? WHERE `id` = ?  ', [data, id], (err) => {
                if (err) {
                    cb(err);
                    return;
                }
                read(id, cb);
                connection.release();
            });
    });
}
function create(data, cb) {
    pool.getConnection(function (err, connection) {
        if (err) { cb(err); return; }
        connection.query('INSERT INTO `item` SET ?', data, (err, res) => {
            if (err) {
                cb(err);
                return;
            }
            read(res.insertId, cb);
            connection.release();
        });
    });
}
function _delete(id, cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query('DELETE FROM `item` WHERE `id` = ?  ',[ id],  cb);
        connection.release();
    });
}

function AddTMSQF(fn, md, jsondata, username, cb) {
    let data = { id: 0, fn: fn, md: md, jsondata: jsondata, username: username };
    console.log(data);
    pool.getConnection(function (err, connection) {
        if (err) { cb(err); return; }
        connection.query('INSERT INTO `reltbl` SET ? ', [data], (err, res) => {
            if (err) {
                cb(err);
                return;
            }
            console.log(res.insertId);
            cb(null, res.insertId);
            connection.release();
        });
    });
}
function TMSQFlistbydate(sd, ed, cb) {
    pool.getConnection(function (err, connection) {
        if (err) { cb(err); return; }
        connection.query('SELECT * FROM reltbl where md >= ? and md <= ? ;', [sd, ed], function (err, rows) {
            if (err) {
                cb(err);
                return;
            }
            cb(null, rows);
            connection.release();
        })
    })
}
module.exports = {
    createSchema: createSchema,
    listByType: listByType,
    listForFont: listForFont,
    read: read,
    list: list,
    update: update,
    create: create,
    delete:_delete,
    AddTMSQF:AddTMSQF,
    TMSQFlistbydate:TMSQFlistbydate,

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
        `CREATE DATABASE IF NOT EXISTS \`maths\`
        CREATE TABLE maths.qiztx
        (
        \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
        \`gid\` varchar(255) CHARACTER SET utf8mb4 NOT NULL,    /* f1001 */
        \`qtitle\` varchar(255) CHARACTER SET utf8mb4 NOT NULL, /* 有理數的運算 */
        \`qgrade\` varchar(255) CHARACTER SET utf8mb4 NOT NULL, /* SG1-SG3,SC1-SC2 */
        \`qfield\` varchar(255) CHARACTER SET utf8mb4 NOT NULL,  /* maths */
        \`tx\` int(1) ,  /* 1-4 */
        \`acnt\` varchar(255),    /* [1,1,2,2] */
        \`atype\` varchar(255),   /* ['num','num','txt','mat']  */
        \`qizcode\` text CHARACTER SET utf8mb4,
        \`anscode\` text CHARACTER SET utf8mb4,
        \`qnote\` text CHARACTER SET utf8mb4,
        \`snote\` text CHARACTER SET utf8mb4,
        \`pflag\` int(1) , /* [0-1] 公布與否 */
        \`pdate\` varchar(255) CHARACTER SET utf8mb4 ,
        \`createbyid\`  varchar(255) CHARACTER SET utf8mb4 ,
        \`createbyname\`  varchar(255) CHARACTER SET utf8mb4 ,
        \`createdate\`  varchar(255) CHARACTER SET utf8mb4 ,
        \`modifybyid\`  varchar(255) CHARACTER SET utf8mb4 ,
        \`modifybyname\`  varchar(255) CHARACTER SET utf8mb4,
        \`modifydate\`  varchar(255) CHARACTER SET utf8mb4 ,
         PRIMARY KEY (\`id\`),
         UNIQUE KEY \`gid_UNIQUE\` (\`gid\`)
        )DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        CREATE TABLE IF NOT EXISTS \`maths\`.\`reltbl\` (
            \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
            \`fn\` VARCHAR(128) NULL,
            \`md\` VARCHAR(14) NULL,
            \`jsondata\` text collate utf8mb4_unicode_ci default NULL,
            \`username\` VARCHAR(128) NULL,
            \`studref\` VARCHAR(8) NULL,
            \`classno\` VARCHAR(4) NULL,
            \`seat\` VARCHAR(2) NULL,
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`fn\` (\`fn\`)
            );        
        `,


        (err) => {
            if (err) {
                throw err;
            }
            console.log('Successfully created schema');
            connection.end();
        }
    );
}