﻿// Copyright 2017, Google, Inc.
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
const config = require('../../../config');
const options = {
    host: config.get('ACTMYSQL_HOST'),
    user: config.get('ACTMYSQL_USER'),
    password: config.get('ACTMYSQL_PASSWORD'),
    database: config.get('ACTMYSQL_DATABASE')
};
//const connection = mysql.createConnection(options);
const pool = mysql.createPool(options);

function list(userId, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(
            'SELECT * FROM `stdsportitem` order by id DESC LIMIT ? OFFSET ?', [limit, token],
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


function listTimestampBy(userId, activity, sdate,edate, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;

    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM `stdsportitem` WHERE `activity` = ?  and (`logDate` between ? and ? ) order by  id  LIMIT ? OFFSET ?',
            [activity,sdate,edate,limit, token],
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
function _delete(userId,id, cb) {
    pool.getConnection(function (err, connection) {
        connection.query('DELETE FROM `stdsportitem` WHERE `id` = ?  and  `createdById` = ?',[ id, userId ],  cb);
        connection.release();
    });
}

module.exports = {
    createSchema: createSchema,
    list: list,
    listBy: listBy,
    listTimestampBy: listTimestampBy,
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
    `CREATE DATABASE IF NOT EXISTS \`act\`
      DEFAULT CHARACTER SET = 'utf8mb4'
      DEFAULT COLLATE 'utf8mb4_unicode_ci';
    USE \`act\`;
    CREATE TABLE IF NOT EXISTS \`act\`.\`stdsportitem\` (
        \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
        \`username\` varchar(255) NOT NULL,
        \`displayName\` varchar(255) DEFAULT NULL,
        \`logTime\` datetime DEFAULT NULL,
        \`rec\` varchar(255) NOT NULL,
        \`cno\` varchar(4) NOT NULL,
        \`seat\` int(11) NOT NULL,
        \`stdName\` varchar(125) NOT NULL,
        \`description\` text,
        \`createdTime\` datetime DEFAULT NULL,
        \`createdBy\` varchar(255) DEFAULT NULL,
        \`createdById\` varchar(255) DEFAULT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`username_UNIQUE\` (\`username\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
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