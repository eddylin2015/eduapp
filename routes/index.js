'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var oauth2=require('../db/internalOauth2.js')
/* GET home page. */

router.get('/internal', function (req, res) {   
        var smu = require('./sidebar_menu_item');
        res.render('index', { title: '浸信中學教學應用網頁 主頁', profile: req.user, mnu0: smu.m0, mnu1: smu.m1, mnu2: smu.m2, mnu3: smu.m3, mnu4: smu.m4 });        
});
router.get('/internal/about', function (req, res) {
    res.render('about', { title: '浸信中學教學應用網頁 關於', profile: req.user });
});
router.get('/internal/contact', function (req, res) {
    res.render('contact', { title: '浸信中學教學應用網頁 聯絡方式', profile: req.user });
});
//
// Define routes.
router.get('/internal/home',
    function (req, res) {
        res.render('home', { profile: req.user   });
    });
router.get('/login',
    function (req, res) {
        res.render('login');
    });
router.get('/internal/login',
    function (req, res) {
        res.render('login');
    });

router.get('/internal/logout',
    function (req, res) {
        req.logout();
        res.redirect('/internal/');
    });

router.get('/internal/profile',
    oauth2.required,
    function (req, res) {
        res.render('profile', { profile: req.user, profilestr: JSON.stringify(req.user) });
    });

var staticlogfile = function (filename, mimetype, res) {
    const fs = require('fs');
    console.log(filename);
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }

        res.writeHead(200, { 'Content-Type': mimetype });
        res.write(data);
        return res.end();
    });
}
//
module.exports = router;
