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


function list( userId , cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        // Use the connection
        connection.query(
            'SELECT * FROM `blogs` order by id DESC ',[],
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
            'SELECT *  FROM `blogs` order by id DESC LIMIT ? OFFSET ?', //, DAYOFWEEK(logDate)-1 dw
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
            'SELECT * FROM `blogs` where createdById = ? order by id desc  LIMIT ? OFFSET ?',
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


function create( data, cb) {
    //console.log(data);
    
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query('INSERT INTO `blogs` SET ? ', [data], (err, res) => {
            if (err) {
                cb(err);
                return;
            }
            read( res.insertId, cb);
            //read(res.insertId, cb);
            //cb(null);
            connection.release();
        });
    });
}

function read( id, cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query(
            'SELECT * FROM `blogs` WHERE `id` = ? ', id, (err, results) => {
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
function update( id, data, cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query(
            'UPDATE `blogs` SET ? WHERE `id` = ?  ', [data, id], (err) => {   //and `createdById` = ?
                if (err) {
                    cb(err);
                    return;
                }
                read( id, cb);
                connection.release();
            });
    });
}

function _delete(userid, id ,cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query('DELETE FROM `blogs` WHERE createdById=?  and `id` = ? ',[ userid,id ],  cb);
        connection.release();
    });
}

module.exports = {
    
    list: list,
	listBy: listBy,
    listMore: listMore,
    create: create,
    read: read,    
    update: update,
    delete: _delete
};
/*
CREATE TABLE IF NOT EXISTS `bookshelf`.`blogs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `author` VARCHAR(255) NULL,
    `publishedDate` VARCHAR(255) NULL,
    `imageUrl` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `createdBy` VARCHAR(255) NULL,
    `createdById` VARCHAR(255) NULL,
    `rootid` INT UNSIGNED NULL,
    `parentid` INT UNSIGNED NULL,
  PRIMARY KEY (`id`));
  */