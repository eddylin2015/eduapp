'use strict';

const mysql = require('mysql');
const config = require('../../config');
const options = {
        host: config.get('DEPTWORKMYSQL_HOST'),
        user: config.get('DEPTWORKMYSQL_USER'),
    password: config.get('DEPTWORKMYSQL_PASSWORD'),
    database: config.get('DEPTWORKMYSQL_DATABASE')
};

//const connection = mysql.createConnection(options);
const pool = mysql.createPool(options);

function list(userId, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(
            'SELECT * FROM `worknote` order by id DESC LIMIT ? OFFSET ?', [limit, token],
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

function listBy(userId, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `worknote` WHERE `createdById` = ? LIMIT ? OFFSET ?',
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


function listTimestampBy(userId, author, sdate,edate, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;

    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `worknote` WHERE `author` = ?  and (`logDate` between ? and ? ) order by if(rootid = 0, id, rootid),parentid  LIMIT ? OFFSET ?',
            [author,sdate,edate,limit, token],
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

function listByParentid(userId, rootid, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;

    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `worknote` WHERE id=? or `rootid` = ? or `parentid` = ?  LIMIT ? OFFSET ?',
            [rootid, rootid, rootid, limit, token],
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
        connection.query('INSERT INTO `worknote` SET ?', data, (err, res) => {
            if (err) {
                cb(err);
                return;
            }
            read(userId,res.insertId, cb);
            connection.release();
        });
    });
}

function read(userId, id, cb) {
    console.log(userId);
    console.log(id);
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `worknote` WHERE `id` = ? ', id, (err, results) => {
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
            'UPDATE `worknote` SET ? WHERE `id` = ?  and `createdById` = ?', [data, id, userId], (err) => {
                if (err) {
                    cb(err);
                    return;
                }
                read(userId, id, cb);
                connection.release();
            });
    });
}
function updateGroupStatus(rootid, status) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'UPDATE `worknote` SET deptlog = ? WHERE id = ? or rootid= ? ', [status, rootid, rootid], (err) => {
                if (err) {
                    cb(err);
                    return;
                }
                connection.release();
            });
    });
}
function _delete(userId,id, cb) {
    pool.getConnection(function (err, connection) {
        connection.query('DELETE FROM `worknote` WHERE `id` = ?  and  `createdById` = ?',[ id, userId ],  cb);
        connection.release();
    });
}

module.exports = {
    createSchema: createSchema,
    list: list,
    listBy: listBy,
    listTimestampBy: listTimestampBy,
    listByParentid: listByParentid,
    updateGroupStatus: updateGroupStatus,
    create: create,
    read: read,
    update: update,
    delete: _delete
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
        `CREATE DATABASE IF NOT EXISTS \`deptwork\`
      DEFAULT CHARACTER SET = 'utf8'
      DEFAULT COLLATE 'utf8_general_ci';
    USE \`bookshelf\`;
    CREATE TABLE IF NOT EXISTS \`deptwork\`.\`worknote\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`title\` VARCHAR(255) NULL,
      \`author\` VARCHAR(255) NULL,
      \`authorname\` VARCHAR(255) NULL,
      \`toStaf\` VARCHAR(255) NULL,
      \`toName\` VARCHAR(255) NULL,
      \`logDate\` VARCHAR(255) NULL,
      \`description\` TEXT NULL,
      \`deptlog\` int(11) 0,
      \`scholog\` int(11) 0,
      \`createdBy\` VARCHAR(255) NULL,
      \`createdById\` VARCHAR(255) NULL,
      \`rootid\` INT UNSIGNED NULL,
      \`parentid\` INT UNSIGNED NULL,
    PRIMARY KEY (\`id\`));`,
        (err) => {
            if (err) {
                throw err;
            }
            console.log('Successfully created schema');
            connection.end();
        }
    );
}