'use strict';

const express = require('express');
//const images = require('./images');
const dbis = "redis";//mysql
const model = require('./model-mysql-pool');
//const model = require('./model-redis');
const images = require('./images');
var oauth2 = require('../../db/internalOauth2.js')
var oauthAG = require('../../db/usersAdGROUP.js')
const router = express.Router();

function authMathsRequired(req, res, next) {
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/login');
  } else if (req.user.email == "lammou@mail.mbc.edu.mo"
    || profile.email == "sousoiteng@mail.mbc.edu.mo"
    || profile.email == "laitakseng@mail.mbc.edu.mo"
    || profile.email == "ngpuiieng7e3@mail.mbc.edu.mo"
  ) {
    next();
  } else {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/login');
  }
}
function fmt_now() {
  var d = new Date();
  var dstr = d.getFullYear() + "-";
  if (d.getMonth() < 9) dstr += "0";
  dstr += d.getMonth() + 1 + "-";
  if (d.getDate() < 10) dstr += "0";
  dstr += d.getDate();
  return dstr;
}
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

/////////////////
router.get('/',
  oauth2.required,
  (req, res, next) => {
    res.render('equed/index.pug', {
    });
  });

router.get('/list',
  oauth2.required,
  (req, res, next) => {
    console.log();
    model.list(100, req.query.pageToken, (err, entities, cursor) => {
      if (err) {
        next(err);
        return;
      }
      res.render('equed/edit/list.pug', {
        profile: req.user,
        books: entities,
        nextPageToken: cursor
      });
    });
  });


router.get('/ed/add', authMathsRequired, (req, res, next) => {
  let qizcode = ["//定義變量:Tx : [1:9]", "//工具集: tmsU, tmsCalcu", "let TE={St:'',Val:'',ACnt:1, ATyp:'n',Range:[]};//n,t,m",
    'let a=Math.floor(Math.random()*10);',
    'let b=Math.floor(Math.random()*10);',
    'TE.St=`${a} \\\\times ${b}`;',
    'TE.Val=a*b;',
    ''].join('\n');
  let anscode = ["//工具集: tmsU, tmsCalcu \n//定義變量:IAns1,IAns2,TE", "if(TE.ACnt==1 && TE.ATyp=='n') return IAns1==TE.Val;"].join('\n')
  res.render('equed/edit/form.pug', {
    profile: req.user,
    book: {
      id: 0, tx: 1,
      acnt: "[1,1,1,1,1,1,1,1,1,1,1]",
      atype: `["t","t","t","t","t","t","t","t"]`,
      qizcode: qizcode,
      anscode: anscode,
      pflag: 0,
      createbyid: req.user.username,
      createbyname: req.user.displayName,
      createdate: fmt_now()
    }
  });
});
router.post('/ed/add', authMathsRequired, images.multer.single('image'), (req, res, next) => {
  const data = req.body;
  model.create(data, (err, savedData) => {
    if (err) { next(err); return; }
    res.redirect(`${req.baseUrl}/ed/${savedData.id}`);
  });
});

router.get('/ed/:book', authMathsRequired, (req, res, next) => {
  model.read(req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('equed/edit/view.pug', {
      profile: req.user,
      book: entity,
      qiz_code: JSON.stringify(entity.qizcode.split('\n')),
      ans_code: JSON.stringify(entity.anscode.split('\n')),
      action: 'Edit'
    });
  });
});
router.get('/ed/:book/edit', authMathsRequired, (req, res, next) => {
  model.read(req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    if (entity.modifybyid == ""
      || entity.createbyid == req.user.username
      || entity.modifybyid == req.user.username) {
      entity.modifybyid = req.user.username;
      entity.modifybyname = req.user.displayName;
      entity.modifydate = fmt_now();
      res.render('equed/edit/form.pug', {
        profile: req.user,
        book: entity,
        action: 'Edit'
      });
    } else {
      res.end(`belong to ${entity.createbyid} ${entity.modifybyid}.  `)
    }
  });
});
router.post('/ed/:book/edit', authMathsRequired, images.multer.any(), (req, res, next) => {
  const data = req.body;
  model.update(req.params.book, data, (err, savedData) => {
    if (err) { next(err); return; }
    res.redirect(`${req.baseUrl}/ed/${savedData.id}`);
  });
});

router.post('/ed/:book/imageUploader', authMathsRequired, images.multer.any(), function (req, res) {
  //req.file/req.files
  res.send({
    "uploaded": 1,
    "fileName": "IMAGE.PNG",
    "url": "/ckeditorimages/" + req.files[0].filename
  })
});

router.get('/edCode/:book', authMathsRequired, (req, res, next) => {
  model.read(req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    entity.modifybyid = req.user.username;
    entity.modifybyname = req.user.displayName;
    entity.modifydate = fmt_now();
    if (entity.modifybyid == ""
      || entity.createbyid == req.user.username
      || entity.modifybyid == req.user.username) {
      res.render('equed/form.pug', {
        profile: req.user,
        book: entity,
        qiz_code: JSON.stringify(entity.qizcode.split('\n')),
        ans_code: JSON.stringify(entity.anscode.split('\n')),
        action: 'Edit',
        posturl: req.baseUrl + req.url,
      });
    } else {
      res.end(`belong to ${entity.createbyid} ${entity.modifybyid}.  `)
    }
  });

});

router.post('/edCode/:book', authMathsRequired, (req, res, next) => {
  let data = {
    qizcode: req.body.CreatAEqCode,
    anscode: req.body.CheckAnsCode,
    modifybyid: req.user.username,
    modifybyname: req.user.displayName,
    modifydate: fmt_now()
  };
  model.update(req.params.book, data, (err, savedData) => {
    if (err) { next(err); return; }
    res.end(`${savedData.id}`);
  });
  /*
    model.create("f1003", JSON.stringify(data), (err, ins_id) => {
    if (err) { console.log(err); return res.end("error"); }
    res.end(`${ins_id}`);
  });
  */
});
router.get('/edUI/:book', (req, res, next) => {
  model.read(req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('equed/TmsUiTrain.mlx3.pug', {
      profile: req.user,
      CreatAEqCodeBaseLine: 223,
      formulajs: entity.qid,
      ft: entity.gid,
      MathTitle: entity.qtitle,
      CreatAEqCode: entity.qizcode,
      CheckAnsCode: entity.anscode,
      AnsCnt: entity.acnt.match(/[0-9]/g),
      AnsType: entity.atype.match(/[a-z]/g),
      posturl: req.baseUrl + req.url,
      book: entity,
    });
  });
});

router.post('/edUI/:book', (req, res, next) => {
  if (!req.user) { res.end("Error: no login user!"); }
  else {
    res.end("error 使用 TMS/AddTMSQF")
  }
});
///////end

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
