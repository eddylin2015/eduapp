'use strict';
var path = require('path');
var express = require('express');
var config = require('./config');
var routes = require('./routes/index');
var users = require('./routes/users');
// passport
var passport = require('passport');
const session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
// view engine setup
app.disable('etag');
app.use(require('morgan')('combined'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', true);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//default false
// uncomment after placing your favicon in /public

var RedisStore = require('connect-redis')(session);
app.use(session({  
    store: new RedisStore({host:config.get("REDISSTOREHOST"),password:config.get('REDISPASSWORD')}),
    secret: config.get('SECRET'),
    resave: false,
    saveUninitialized: false
}));
//app.use(session({ secret: "secretkeyboard", resave: false, saveUninitialized: false }));
// OAuth2
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./db/internalOauth2').router);
// or
//app.use(require('./lib/oauth2').router);  //google-Oauth
app.get('/', function (req, res) {
    if
    res.redirect('/internal/TMS');
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