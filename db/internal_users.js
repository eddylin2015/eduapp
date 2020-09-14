var http = require('http');
const config = require('../../config');

var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [{ value: 'jack@example.com' }], encode_username: "" }
    , { id: 2, username: 'lam', password: '123', displayName: 'lam', emails: [{ value: 'lam@mail.mbc.edu.mo' }], encode_username: ""  }
];
function encode_key(x) {
    var d = new Date();
    var n = d.getDate();
    var res = String.fromCharCode(n+64);
    if (n < 10) n = '0' + n;
    var n = n + res;
    return n + new Buffer(x).toString('base64');
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
exports.findByUsernamePassword = function (username, password, cb) {
    process.nextTick(function () {
        http.get(
            {
                hostname: config.get('LOGINCGI_HOST'),
                port: config.get('LOGINCGI_PORT'),
                path: config.get('LOGINCGI_PATH') + "?u=" + username + "&p=" + password + "&r=" + Math.random(),
                method: 'GET',
            },
            (res) => {
                res.on('data', (d) => {
                    var json = JSON.parse(d.toString());
                    if (json.msg.startsWith("Error")) {
                        return cb(null, null);
                    }
                    for (var i = 0, len = records.length; i < len; i++) {
                        var record = records[i];
                        if (record.username === username) {
                            return cb(null, record);
                            break;
                        }
                    }
                    var keyid = records.length + 1;
                    if (! isNaN(Number(username))) {
                        keyid = Number(username);
                    }
                    records.push({ id: keyid, username: username, password: password, displayName: json.user, emails: [{ value: json.user + '@mail.mbc.edu.mo' }], encode_username: encode_key(username) });
                    console.log(records);
                    for (var i = 0, len = records.length; i < len; i++) {
                        var record = records[i];
                        if (record.username === username) {
                            return cb(null, record);
                        }
                    }
                    return cb(null, null);
                });
            }).on('error', (e) => {
                return cb(null, null);
            });
    });
}
