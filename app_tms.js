'use strict';
var path = require('path');
var express = require('express');
var config = require('./config');
var favicon = require('serve-favicon');
var routes = require('./routes/index');
var users = require('./routes/users');
// passport
var passport = require('passport');
const session = require('express-session')
var RedisStore = require('connect-redis')(session);
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'), 86400000));
// uncomment after placing your favicon in /public
app.use(session({  
    store: new RedisStore({host:config.get("REDISSTOREHOST"),password:config.get('REDISPASSWORD')}),
    secret: config.get('SECRET'),
    resave: false,
    saveUninitialized: false
}));
// app.use(session({ secret: secretkeyboard, resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));
// OAuth2
app.use(passport.initialize());
app.use(passport.session());
// app.use(require('./db/internalOauth2').router);
// or
app.use(require('./lib/oauth2').router);  //google-Oauth
app.get('/', function (req, res) {
    res.end('local app');
});
app.use('/users', users);
app.use(routes);
app.use('/internal/TMS', require('./routes/TMS/crud'));
app.use('/internal/api/TMS', require('./routes/TMS/api'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', 81);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});