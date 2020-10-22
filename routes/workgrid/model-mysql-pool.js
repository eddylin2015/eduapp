// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const mysql = require('mysql');

const config = require('../../config');
const options = {
        host: config.get('ITDEPTMYSQL_HOST'),
        user: config.get('ITDEPTMYSQL_USER'),
    password: config.get('ITDEPTMYSQL_PASSWORD'),
    database: config.get('ITDEPTMYSQL_DATABASE')
};
//const connection = mysql.createConnection(options);
const pool = mysql.createPool(options);

function list(userId, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(
            'SELECT * , DAYOFWEEK(logDate)-1 dw FROM `workgrid` where title=? order by logDate', ['bookcomproom'],
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
function listWeek(userId, limit, datestr, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    console.log(limit);
    console.log(datestr);
    console.log(token);

    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT *, DAYOFWEEK(logDate)-1 dw  FROM `workgrid` WHERE `logDate` >= ? order by `logDate` LIMIT ? OFFSET ?',
            [datestr, limit, token],
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



function create(userId, data, cb) {
    console.log(data);
    
    pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO `workgrid` SET ?', data, (err, res) => {
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
            'SELECT * FROM `workgrid` WHERE `id` = ? ', id, (err, results) => {
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
            'UPDATE `workgrid` SET ? WHERE `id` = ?  ', [data, id], (err) => {   //and `createdById` = ?
                if (err) {
                    cb(err);
                    return;
                }
                read(userId, id, cb);
                connection.release();
            });
    });
}
function updatebylogdate(userId, id, data, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'UPDATE `workgrid` SET ? WHERE `logdate` = ?  ', [data, id], (err) => {   //and `createdById` = ?
                if (err) {
                    cb(err);
                    return;
                }
                read(userId, id, cb);
                connection.release();
            });
    });
}
function _delete(userId,id, cb) {
    pool.getConnection(function (err, connection) {
        connection.query('DELETE FROM `workgrid` WHERE `id` = ?  and  `createdById` = ?',[ id, userId ],  cb);
        connection.release();
    });
}

module.exports = {
    createSchema: createSchema,
    list: list,
    listBy: listBy,
    listWeek: listWeek,
    create: create,
    read: read,
    update: update,
    updatebylogdate:updatebylogdate,
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
      USE \`deptwork\`;
    CREATE TABLE IF NOT EXISTS \`deptwork\`.\`workgrid\` (
    \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`title\` VARCHAR(255) NULL,
    \`author\` VARCHAR(255) NULL,
    \`authorname\` VARCHAR(255) NULL,
    \`logDate\` VARCHAR(255) NULL,
    \`A\` TEXT NULL,
    \`B\` TEXT NULL,
    \`C\` TEXT NULL,
    \`D\` TEXT NULL,
    \`E\` TEXT NULL,
    \`F\` TEXT NULL,
    \`G\` TEXT NULL,
    \`H\` TEXT NULL,
    \`I\` TEXT NULL,
    \`J\` TEXT NULL,
    \`createdBy\` VARCHAR(255) NULL,
    \`createdById\` VARCHAR(255) NULL,
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


