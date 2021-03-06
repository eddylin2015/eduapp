﻿var http = require('http');
const config = require('../config');

var records = [
    { id: 1, username: 'jack', password: '123', displayName: 'Jack', email: 'jack@example.com' , encode_username: "" }
    , { id: 2, username: 'cool', password: '123', displayName: 'lammou SC6E09', email: 'lammou@mail.mbc.edu.mo' , encode_username: "" }
    , { id: 2, username: 'sp', password: '470388', displayName: 'lammou SC6E09', email: 'lammou@mail.mbc.edu.mo' , encode_username: "" }
];
function encode_key(x) {
    var d = new Date();
    var n = d.getDate();
    var res = String.fromCharCode(n+64);
    if (n < 10) n = '0' + n;
    var n = n + res;
    return n + new Buffer.from(x).toString('base64');
}
exports.findById = function (id, cb) {
    process.nextTick(function () {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.id === id) {
                return cb(null, record);
            }
        }
        cb(new Error('User ' + id + ' does not exist'));
    });
}

exports.findByUsername = function (username, cb) {
    process.nextTick(function () {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.username === username) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    });
}

