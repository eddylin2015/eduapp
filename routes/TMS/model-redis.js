'use strict';
var reids=require("redis");
var client=reids.createClient();

function list( userId , cb) {
    console.log("LIST");
    client.hgetall("TMS",function(err,result){
        if(err) cb(new Error('TMS List ERROR'));
        console.log(result);
        return cb(null,result);
    });
}
function AddTMSQF(fn,md,jsondata,username,cb){
    let data={id:0,fn:fn,md:md,jsondata:jsondata,username:username};
    console.log(data);
    client.hset("TMS",fn,jsondata,function(err,result){
        if(err) cb(new Error('TMS ADD ERROR'));
        console.log(result);//return 1;
        return cb(null,result);
    });
}

function TMSQFlistbydate(sd,ed,cb) {
    client.hgetall("TMS",function(err,result){
        if(err) cb(new Error('TMS List ERROR'));
        console.log(result);
        return cb(null,result);
    });
 }

function read( id, cb) {
    client.hget("TMS",id.toString(),function(err,result){
        if(err) cb(new Error('TMS ' + id + ' does not exist'));
        //let user=JSON.parse(result);
        return cb(null,result);
    });
}
      
/*      
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
*/
module.exports = {
    AddTMSQF:AddTMSQF,    
    list: list,
    TMSQFlistbydate:TMSQFlistbydate,
    read: read,    
    //listBy: listBy,
    //listMore: listMore,
    //create: create,
    
    //update: update,
    //delete: _delete
};
/*
CREATE TABLE IF NOT EXISTS `bookshelf`.`books` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `author` VARCHAR(255) NULL,
    `publishedDate` VARCHAR(255) NULL,
    `imageUrl` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `createdBy` VARCHAR(255) NULL,
    `createdById` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));
  */