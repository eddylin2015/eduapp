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

function read(username,  cb) {
   // console.log(id);
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query(
            'SELECT * FROM `studreligion` WHERE `user` = ? ', username, (err, results) => {
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
                //console.log(results);
                if(results.length>0){
                    cb(null, results[0]);
                }else{
                    err = {
                        code: 404,
                        message: 'Not found'
                    };
                    cb(err);
                }
                connection.release();
            });
    });
}
function update(id, data, cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query(
            'UPDATE `studreligion` SET ? WHERE `user` = ?  ', [data, id], (err) => {   //and `createdById` = ?
                if (err) {
                    cb(err);
                    return;
                }
                read(id,  cb);
                connection.release();
            });
    });
}
function list( userId , cb) {
    pool.getConnection(function (err, connection) {
        if(err){cb(err);return;}
        connection.query(
            'SELECT * FROM `studreligion` order by classno,seat;',[],
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

module.exports = {
    list: list,
    read: read,    
    update: update,
};
