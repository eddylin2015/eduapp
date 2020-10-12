'use strict';

const express = require('express');
//const images = require('./images');
const dbis = "redis";//mysql
//const model = require('./model-mysql');
const model = require('./model-redis');
const images = require('./images');
var oauth2 = require('../../db/internalOauth2.js')
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
router.get('/',
  oauth2.required,
  (req, res, next) => {
    res.render('equed/index.pug', {
    });
  });
router.get('/add', (req, res, next) => {
  res.render('equed/form.pug', {
    profile: req.user,
  });
});
router.post('/saveequ', (req, res, next) => {
  let data={"EQ":req.body.CreatAEqCode,"AN":req.body.CheckAnsCode};
  model.SaveEqu("f1003", JSON.stringify(data), (err, ins_id) => {
    if (err) { console.log(err); return res.end("error"); }
    res.end(`${ins_id}`);
  });
});

router.get('/trianing.mlx2.jsp', (req, res, next) => {
  let ft = req.query.ft;
  let MathTitle = ""
  model.ReadEqu(ft,(err, data) => {
    let obj=JSON.parse(data);
    //let data={"EQ":req.body.CreatAEqCode,"AN":req.body.CheckAnsCode};
    res.render('equed/TmsUiTrain.mlx3.pug', {
      formulajs: ft,
      ft: ft,
      MathTitle: MathTitle,
      CreatAEqCode:obj.EQ,
      CheckAnsCode:obj.AN,
      profile: req.user
    });
  })
});

router.get('/mathindex.jsp', (req, res, next) => {
  res.render('equed/TmsIndex.pug', {
    profile: req.user,
  });
});
router.post('/AddTMSQF', (req, res, next) => {
  if (!req.user) { res.end("Error: no login user!"); }
  else {
    let username = req.user.username;
    let studref = req.user.email.split('@')[0];
    let fn = req.body.fn;
    let d = new Date();
    let yy = d.getFullYear(); let mm = d.getMonth() + 1; let dd = d.getDate();
    let HH = d.getHours(); let MM = d.getMinutes(); let SS = d.getSeconds();
    let md = `${yy}${mm < 10 ? "0" : ""}${mm}${dd < 10 ? "0" : ""}${dd}${HH < 10 ? "0" : ""}${HH}${MM < 10 ? "0" : ""}${MM}${SS < 10 ? "0" : ""}${SS}`;
    let fnn = `TMS${studref}_${fn}.txt`;
    let jsondata = req.body.data;
    model.AddTMSQF(fnn, md, jsondata, username, (err, ins_id) => {
      if (err) { console.log(err); return res.end("error"); }
      res.end(`存儲成功. 記錄編號: ${ins_id} .`);
    });
  }
});
function fmt_now(intdays = 0) {
  var d = new Date();
  if (Math.abs(intdays) > 0) { d = new Date(new Date() - intdays * 3600 * 1000 * 24); }
  var y = d.getFullYear(); var m = d.getMonth() + 1; var d_ = d.getDate();
  return y + "-" + (m < 10 ? "0" : "") + m + "-" + (d_ < 10 ? "0" : "") + d_;
}
function d2s(x, fix) {
  var d = new Date(x);
  var y = d.getFullYear(); var m = d.getMonth() + 1; var d_ = d.getDate();
  return y + (m < 10 ? "0" : "") + m + (d_ < 10 ? "0" : "") + d_ + fix;
}
router.get('/tmsReportQuery', oauth2.required, (req, Response, next) => {
  Response.render('equed/tmsReportQuery.pug', {
    profile: req.user,
    dt: fmt_now()
  });
});
router.post('/tmsReportQuery', images.multer.array('upload', 16),
  oauth2.required, (req, Response, next) => {
    let sd = d2s(req.body.sd, "000000");
    let ed = d2s(req.body.ed, "999999");
    let fmt = req.body.fmt;
    if (dbis === "redis") {
      Response.redirect('/internal/TMS/tmsMyReport');
    }else{
    model.TMSQFlistbydate(sd, ed, (err, maths_data) => {
      Response.render('equed/tmsReport.pug', {
        profile: req.user,
        data: maths_data
      });
    });
  }
  });
let isArray = (data) => {
  return (Object.prototype.toString.call(data) === "[object Array]");
}
router.get('/tmsMyReport', oauth2.required, (req, Response, next) => {
  model.list(null, (err, maths_data) => {
    if (err) console.log(err);
    if (dbis === "redis") {
      if (!maths_data) { Response.end("<button onclick='window.history.back();'>no thing! return</button>"); return; }
      let keys_ = Object.keys(maths_data);
      let mdata = [];
      for (let i = 0; i < keys_.length; i++)
        mdata.push({ fn: keys_[i], jsondata: maths_data[keys_[i]] })
      console.log(mdata)  ;
      Response.render('equed/tmsReport.pug', {
        profile: req.user,
        data: mdata
      });
    } else {
      console.log(maths_data);
      Response.render('equed/tmsReport.pug', {
        profile: req.user,
        data: maths_data
      });
    }
  });
});
router.get('/QizEx', (req, res, next) => {
  res.render('equed/QizExIndex.pug', {});
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