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
module.exports = {
    AddTMSQF:AddTMSQF,    
    list: list,
    TMSQFlistbydate:TMSQFlistbydate,
    read: read
};      
