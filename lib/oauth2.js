// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');
const config = require('../config');
var records = require('../db/internal_users_records').records;
var redis=require("redis");
var client=redis.createClient();
// [START setup]
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
function encode_key(x) {
    var d = new Date();
    var n = d.getDate();
    var res = String.fromCharCode(n + 64);
    if (n < 10) n = '0' + n;
    var n = n + res;
    return n +  new Buffer(x).toString('base64');
}
function extractProfile (profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  
  return {
    id: profile.id,
    displayName: profile.displayName,
    username: profile.displayName ,
    email: profile.emails[0].value ,
    encode_username: encode_key(profile.displayName),
    image: imageUrl,
    gact: true
  };
}

// Configure the Google strategy for use by Passport.js.
//
// OAuth 2-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Google API on the user's behalf,
// along with the user's profile. The function must invoke `cb` with a user
// object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new GoogleStrategy({
  clientID: config.get('OAUTH2_CLIENT_ID'),
  clientSecret: config.get('OAUTH2_CLIENT_SECRET'),
  callbackURL: config.get('OAUTH2_CALLBACK'),
  accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
  // Extract the minimal profile information we need from the profile object
  // provided by Google
  console.log(profile.emails[0].value);
  if(profile.emails[0].value.indexOf("@mail.mbc.edu.mo")>0){
    //modify by cool
    let profile_=extractProfile(profile);
    let flag=false;
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.id === profile_.id) {
        flag=true;
        break;
      }
    }
    if(!flag) {
      records.push(profile_);
      client.hset("Users",profile_.id,JSON.stringify(profile_).toString(),redis.print);
    }      
    //modify by cool 20200916
  cb(null, profile_);
  }else{
    let errormsg={message:"Pls login this domain User Account!",status:400,stack:"請使用mail.mbc.edu.mo帳戶!"};
    cb(errormsg);
  }
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
// [END setup]

const router = express.Router();

// [START middleware]
// Middleware that requires the user to be logged in. If the user is not logged
// in, it will redirect the user to authorize the application and then return
// them to the original URL they requested.
function authRequired (req, res, next) {
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/auth/login');
  }
  next();
}

// Middleware that exposes the user's profile as well as login/logout URLs to
// any templates. These are available as `profile`, `login`, and `logout`.
function addTemplateVariables (req, res, next) {
  res.locals.profile = req.user;
  res.locals.login = `/auth/login?return=${encodeURIComponent(req.originalUrl)}`;
  res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
  next();
}
// [END middleware]

// Begins the authorization flow. The user will be redirected to Google where
// they can authorize the application to have access to their basic profile
// information. Upon approval the user is redirected to `/auth/google/callback`.
// If the `return` query parameter is specified when sending a user to this URL
// then they will be redirected to that URL when the flow is finished.
// [START authorize]
router.get(
    // Login url
    '/login',

    // Save the url of the user's current page so the app can redirect back to
    // it after authorization
    (req, res, next) => {
        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }
        next();
    },

    // Start OAuth 2 flow using Passport.js
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  // Login url
  '/auth/login',

  // Save the url of the user's current page so the app can redirect back to
  // it after authorization
  (req, res, next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },

  // Start OAuth 2 flow using Passport.js
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
// [END authorize]

// [START callback]
router.get(
  // OAuth 2 callback url. Use this url to configure your OAuth client in the
  // Google Developers console
  '/auth/google/callback',

  // Finish OAuth 2 flow using Passport.js
  passport.authenticate('google'),

  // Redirect back to the original page, if any
  (req, res) => {
    const redirect = req.session.oauth2return || '/internal/';
    delete req.session.oauth2return;
    res.redirect(redirect);
  }
);
// [END callback]

// Deletes the user's credentials and profile from the session.
// This does not revoke any active tokens.
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/internal/');
});

module.exports = {
  extractProfile: extractProfile,
  router: router,
  required: authRequired,
  template: addTemplateVariables
};
