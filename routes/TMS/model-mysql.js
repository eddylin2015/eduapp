'use strict';

const mysql = require('mysql');
const config = require('../../config');
const options = {
    host: config.get('MATHSMYSQL_HOST'),
    user: config.get('MATHSMYSQL_USER'),
    password: config.get('MATHSMYSQL_PASSWORD'),
    database: config.get('MATHSMYSQL_DATABASE')
};
const pool = mysql.createPool(options);

function listQizTx(cb) {
    pool.getConnection(function (err, connection) {
        if (err) { cb(err); return; }
        connection.query(
            'SELECT id,gid,qgrade,qtitle,snote FROM `qiztx` where pflag=1 order by gid ', [],
            (err, results) => {
                if (err) { cb(err); return;  }
                cb(null, results);
                connection.release();
            });
    });
}
function list(userId, cb) {
    pool.getConnection(function (err, connection) {
        if (err) { cb(err); return; }
        connection.query(
            'SELECT * FROM `reltbl` order by id DESC ', [],
            (err, results) => {
                if (err) {  cb(err); return; }
                cb(null, results);
                connection.release();
            });
    });
}
function listByUser(username, limit,token,cb) {
    token = token ? parseInt(token, 10) : 0;
    pool.getConnection(function (err, connection) {
        if (err) { cb(err); return; }
        connection.query(
            'SELECT * FROM `reltbl` where username=? order by id DESC LIMIT ? OFFSET ?', [username, limit, token],
            (err, results) => {
                if (err) {  cb(err);  return;  }
                const hasMore = results.length === limit ? token + results.length : false;
                cb(null, results, hasMore);
                connection.release();
            });
    });
}

function AddTMSQF(fn, md, jsondata, username,dname,grade,classname,seat, cb) {
    let data = { id: 0, fn: fn, md: md, jsondata: jsondata, username: username,displayname:dname,grade:grade,classno:classname,seat:seat };
    pool.getConnection(function (err, connection) {
        if (err) { cb(err); return; }
        connection.query('INSERT INTO `reltbl` SET ? ', [data], (err, res) => {
            if (err) {   cb(err);return;  }
            cb(null, res.insertId);
            connection.release();
        });
    });
}
function TMSQFlistbydate(sd, ed,classname,limit,token, cb) {
    token = token ? parseInt(token, 10) : 0;
    pool.getConnection(function (err, connection) {
        if (err) { cb(err); return; }
        let sql=`SELECT * FROM reltbl where md >= ? and md <= ?  order by id DESC  LIMIT ? OFFSET ?;`
        if(classname&&classname.length>3)  sql=`SELECT * FROM reltbl where classno='${classname}' and md >= ? and md <= ?  order by id DESC LIMIT ? OFFSET ?;`
        else if(classname&&classname.length>2)  sql=`SELECT * FROM reltbl where grade='${classname}' and md >= ? and md <= ?  order by id DESC LIMIT ? OFFSET ?;`
        connection.query(sql, [sd, ed,limit,token], function (err, results) {
            if (err) {cb(err);return; }
            const hasMore = results.length === limit ? token + results.length : false;
            cb(null, results, hasMore);
            connection.release();
        })
    })
}

module.exports = {
    AddTMSQF: AddTMSQF,
    TMSQFlistbydate: TMSQFlistbydate,
    list: list,
    listByUser: listByUser,
    listQizTx:listQizTx,
};
/*
CREATE TABLE IF NOT EXISTS `maths`.`reltbl` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `fn` VARCHAR(128) NULL,
    `md` VARCHAR(14) NULL,
    `jsondata` text collate utf8mb4_unicode_ci default NULL,
    `username` VARCHAR(128) NULL,
    `studref` VARCHAR(8) NULL,
    `classno` VARCHAR(4) NULL,
    `seat` VARCHAR(2) NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `fn` (`fn`)
    );
*/
