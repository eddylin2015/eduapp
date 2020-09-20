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
//const images = require('./images');
const model = require('./model-mysql');
const images = require('./images');
const oauth2=require('../../db/internalOauth2')
const router = express.Router();

// Use the oauth middleware to automatically get the user's profile
// information and expose login/logout URLs to templates.


// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

/**
 * GET /books
 *
 * Display a page of books (up to ten at a time).
 */
router.get('/', oauth2.required, (req, res, next) => {
    res.render('TMSUI/TmsIndex.pug', {
  });
});
router.get('/math.html', (req, res, next) => {
  res.render('TMSUI/TmsIndex.pug', {profile:req.user,
});
});
router.get('/mathindex.jsp', (req, res, next) => {
  res.render('TMSUI/TmsIndex.pug', {profile:req.user,
});
});
router.post('/AddTMSQF', (req, res, next) => {
  if(!req.user){ res.end("Error: no login user!"); }
  else{
    let username=req.user.username;
    let studref=req.user.email.split('@')[0];
    let fn=req.body.fn;
    let d=new Date();
    let yy=d.getFullYear();let mm=d.getMonth()+1;let dd=d.getDate();
    let HH=d.getHours();let MM=d.getMinutes();let SS=d.getSeconds();
    let md=`${yy}${mm<10?"0":""}${mm}${dd<10?"0":""}${dd}${HH<10?"0":""}${HH}${MM<10?"0":""}${MM}${SS<10?"0":""}${SS}`;
    let fnn=`TMS${studref}_${fn}.txt`;               
    let jsondata=req.body.data;
    model.AddTMSQF(fnn,md,jsondata,username, (err, ins_id) => {
      if(err) {console.log(err);return res.end("error");}
      res.end(`存儲成功. 記錄編號: ${ins_id} .`);
    });
    
  //console.log(fnn,md,jsondata);
  
  //res.end(JSON.stringify(req.body));
  }
});

router.get('/trianing.jsp',(req, res, next) => {
  let ft=req.query.ft;
  let MathTitle=""
  if(ft=="p2"){MathTitle='加減';}
  if(ft=="p5"){MathTitle='方程式';}
  if(ft=="f1"){MathTitle='一元一次方程式';}
  if(ft=="f2"){MathTitle='有理數運算';}
  if(ft=="f201"){MathTitle='十字相乘法 Criss-Cross';}
  if(ft=="f202"){MathTitle='一元二次方程式';}
  console.log(ft,MathTitle)
  res.render('TMSUI/TmsUiTrain.pug', {
    formulajs:ft,
    ft:ft,
    MathTitle:MathTitle,
    profile:req.user
});
});
router.get('/v0trianing.jsp',(req, res, next) => {
  let ft=req.query.ft;
  let MathTitle=""
  if(ft=="p2"){MathTitle='加減';}
  if(ft=="p5"){MathTitle='方程式';}
  if(ft=="f1"){MathTitle='一元一次方程式';}
  if(ft=="f2"){MathTitle='有理數運算';}
  if(ft=="f201"){MathTitle='十字相乘法 Criss-Cross';}
  if(ft=="f202"){MathTitle='一元二次方程式';}
  console.log(ft,MathTitle)
  res.render('TMSUI/TmsUiTrain.o.pug', {
    formulajs:ft,
    ft:ft,
    MathTitle:MathTitle,
    profile:req.user
});
});
router.get('/f1onedimeq',oauth2.required, (req, res, next) => {
  res.render('TMSUI/F1OneDimEqu.pug', {
    MathTitle:'一元一次程式'
});
});

router.get('/f1equ',oauth2.required, (req, res, next) => {
  res.render('TMSUI/g2arithmeticf1.pug', {
    MathTitle:'一元一次程式'
});
});
router.get('/g2arithmetic',oauth2.required, (req, res, next) => {
  res.render('TMSUI/g2arithmetic.pug', {
    MathTitle:'一元一次程式'
});
});
function fmt_now(intdays = 0) {
  var d = new Date();
  if (Math.abs(intdays) > 0) { d = new Date(new Date() - intdays * 3600 * 1000 * 24); }
  var y = d.getFullYear(); var m = d.getMonth() + 1; var d_ = d.getDate();
  return  y + "-" + (m < 10 ? "0" : "") + m + "-" + (d_ < 10 ? "0" : "") + d_;
}
function d2s(x,fix) {
  var d = new Date(x);
  var y = d.getFullYear(); var m = d.getMonth() + 1; var d_ = d.getDate();
  return  y +  (m < 10 ? "0" : "") + m +  (d_ < 10 ? "0" : "") + d_ +fix;
}
router.get('/tmsReportQuery', oauth2.required, (req, Response, next) => {
  Response.render('TMSUI/tmsReportQuery.pug', {
      profile:req.user,
      dt: fmt_now()
 });
});
router.post('/tmsReportQuery', images.multer.array('upload',16),    oauth2.required, (req, Response, next) => {
let sd=d2s(req.body.sd,"000000");
let ed=d2s(req.body.ed,"999999");
let fmt=req.body.fmt;
model.TMSQFlistbydate(sd,ed,(err,maths_data)=>{
  Response.render('TMSUI/tmsReport.pug', {
      profile:req.user,
      data:maths_data
 });
});
});


/**
 * Errors on "/books/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;
