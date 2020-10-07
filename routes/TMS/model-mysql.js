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

function list( userId , cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query(
            'SELECT * FROM `reltbl` order by id DESC ',[],
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
function listMore( limit,  token, cb) {
    token = token ? parseInt(token, 10) : 0;
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query(
            'SELECT *  FROM `localnews` order by id DESC LIMIT ? OFFSET ?', //, DAYOFWEEK(logDate)-1 dw
            [ limit, token],
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
function listBy(id, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query(
            'SELECT * FROM `localnews` where createdById = ? order by id desc  LIMIT ? OFFSET ?',
            [ id,limit, token],
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
function AddTMSQF(fn,md,jsondata,username,cb){
    let data={id:0,fn:fn,md:md,jsondata:jsondata,username:username};
    console.log(data);
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query('INSERT INTO `reltbl` SET ? ', [data], (err, res) => {
            if (err) {
                cb(err);
                return;
            }
            console.log(res.insertId);
            cb(null,res.insertId);
            connection.release();
        });
    });
}
function TMSQFlistbydate(sd,ed,cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query('SELECT * FROM reltbl where md >= ? and md <= ? ;',[sd,ed], function (err, rows) {
            if (err) {
                cb(err);
                return;
            }
            cb(null, rows);
            connection.release();
        })
      })
      }
function create(userid, data, cb) {
  
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query('INSERT INTO `localnews` SET ? ', [data], (err, res) => {
            if (err) {
                cb(err);
                return;
            }
            read(userid, res.insertId, cb);
            //read(res.insertId, cb);
            //cb(null);
            connection.release();
        });
    });
}

function read(userid, id, cb) {

   // console.log(id);
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query(
            'SELECT * FROM `localnews` WHERE `id` = ? ', id, (err, results) => {
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
function update(userid, id, data, cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query(
            'UPDATE `localnews` SET ? WHERE `id` = ?  ', [data, id], (err) => {   //and `createdById` = ?
                if (err) {
                    cb(err);
                    return;
                }
                read(userid, id, cb);
                connection.release();
            });
    });
}

function _delete(userid,id ,cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query('DELETE FROM `localnews` WHERE `id` = ? ',[ id ],  cb);
        connection.release();
    });
}

module.exports = {
    AddTMSQF:AddTMSQF,    
    TMSQFlistbydate:TMSQFlistbydate,
    list: list,
	listBy: listBy,
    listMore: listMore,
    create: create,
    read: read,    
    update: update,
    delete: _delete
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