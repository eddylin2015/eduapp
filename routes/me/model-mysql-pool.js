'use strict';

const mysql = require('mysql');
const config = require('../../config');
const options = {
    host: config.get('MoralEduMYSQL_HOST'),
    user: config.get('MoralEduMYSQL_USER'),
    password: config.get('MoralEduMYSQL_PASSWORD'),
    database: config.get('MoralEduMYSQL_DATABASE')
};
//const connection = mysql.createConnection(options);
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

module.exports = {
    createSchema: createSchema,
    listByType: listByType,
    listForFont: listForFont,
    read: read,
    list: list,
    update: update,
    create: create,
    delete:_delete
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
    CREATE TABLE IF NOT EXISTS \`act\`.\`item\` (

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