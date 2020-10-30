'use strict';

const express = require('express');
const images = require('./images');
var oauth2 = require('../../../db/internalOauth2.js');
const { json } = require('body-parser');
function getModel() {
  return require(`./model-mysql-pool`);
}
function fmt_now_(intdays = 0) {
  var d = new Date();
  if (Math.abs(intdays) > 0) { d = new Date(new Date() - intdays * 3600 * 1000 * 24); }
  var y = d.getFullYear(); var m = d.getMonth() + 1; var d_ = d.getDate();
  return y + "-" + (m < 10 ? "0" : "") + m + "-" + (d_ < 10 ? "0" : "") + d_;
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
function fmt_now_time() {
  var d = new Date();
  var dstr = d.getFullYear() + "-";
  if (d.getMonth() < 9) dstr += "0";
  dstr += d.getMonth() + 1 + "-";
  if (d.getDate() < 10) dstr += "0";
  dstr += d.getDate();
  dstr+=" ";
  if(d.getHours()<10) dstr+="0"
  dstr+=d.getHours()+":" 
  if(d.getMinutes()<10) dstr+="0" 
  dstr+=d.getMinutes()+":" 
  if(d.getSeconds()<10) dstr+="0"
  dstr+=d.getSeconds()
  console.log(dstr)
  return dstr;
}
function fmt_title(username, datestr, description) {
  description = description.split("\n")[0];
  datestr = datestr.length > 10 ? datestr.substring(0, 10) : datestr;
  return username + ":" + datestr + ":" + description;
}

function checkuser(req) {
  if (req.user.email == "lammou@mail.mbc.edu.mo") return true;
  if (req.user.email == "joe853.hong@mail.mbc.edu.mo") return true;
  if (req.user.email == "cheongiekchao@mail.mbc.edu.mo") return true;
  if (req.user.email == "fongsioman@mail.mbc.edu.mo") return true;
  if (req.user.email == "leitinman@mail.mbc.edu.mo") return true;
  return false;
}
const router = express.Router();

router.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

router.get('/', (req, res, next) => {

  res.render('act/sportday/index.pug', {
    profile: req.user,
  });

});


router.get('/rclist', (req, res, next) => {
  getModel().SPIndexList(fmt_now_(4),(err, entities) => {
    if (err) {
      next(err);
      return;
    }
    res.render('act/sportday/spindex.pug', {
      profile: req.user,
      spitems: entities,
    });
  });
});

router.get('/name/:siid', (req, res, next) => {
  getModel().SPReadName(req.params.siid, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('act/sportday/report.pug', {
      profile: req.user,
      datahtml: entity.name_ctx,
    });
  });
});

router.get('/rc/:siid', (req, res, next) => {
  getModel().SPReadRC(req.params.siid, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('act/sportday/report.pug', {
      profile: req.user,
      datahtml: entity.rc_ctx,
    });

  });
});

router.post('/api/updaterc/:siid', 
images.multer.single('image'),
  (req, res, next) => {
    if(!req.user) {res.end("error!") ;return;}
    if(req.user && req.user.id !== 2 ) {res.end("error!") ;return;}
    const data = req.body;
    data.lock_time=fmt_now_time();
    console.log(data.lock_time)
  getModel().SPUpdateRC(req.params.siid, data, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.end(JSON.stringify(entity));
  });
});

router.get('/statisc', (req, res, next) => {
  res.render('act/sportday/statisc.pug', {
    profile: req.user,
  });
});

router.get('/charter', (req, res, next) => {
  res.render('act/sportday/charter.pug', {
    profile: req.user,
  });
});

router.get('/spreg.jsp', (req, res, next) => {
  if (req.user) {
    let userName = req.user.email.split('@')[0].toUpperCase();
    res.render('act/sportday/spreg.pug', {
      profile: req.user,
      userName: userName
    });
  } else {
    res.redirect("/internal/login?subpath=sportday");
  }
});

router.post('/read', oauth2.required, (req, res, next) => {
  let userName = req.user.email.split('@')[0].toUpperCase();
  getModel().readbyUserName(userName, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    if (entity && entity.length > 0) {
      let row = entity[0];
      res.write(`${row.stdname}\n${row.classno}_${row.seat}\n\n\n${row.groupid}\n`);
      let rec = row.rec.split(';');
      for (let i = 0; i < rec.length; i++)
        res.write(`\nREC,${row.groupid},${rec[i]}`);
      res.end();
    } else {
      res.end(`nothing\n不在登記名單內!`)
    }
  });
});

function ShowGroupName(x) {
  var GROUP_Name = ["男A", "男B", "男C", "男D", "女A", "女B", "女C", "女D", "男E", "女E"];
  return GROUP_Name[x];
}
function ShowItemName(rec) {
  console.log(rec)
  let res = "";
  var ITEM_Name = [
    "---", "50M", "60M", "100M", "200M", "400M", "800M", "1000M", "1500M", "3000M", "5000M", "60米欄", "80米欄", "100米欄", "110米欄", "4x50M", "4x100M", "4x400M", "跳高", "跳遠", "三級跳遠", "壘球", "鉛球"];
  let lastdata_ = rec.split(';');
  let lastdata_li = lastdata_[lastdata_.length - 1];
  console.log(lastdata_li);
  let itemli = lastdata_li.match(/[0-9]+/g);
  console.log(itemli)
  for (let i = 0; i < itemli.length; i++) {
    res += ITEM_Name[Number(itemli[i])] + "\n";
  }
  return res;
}

router.post('/update', oauth2.required, images.multer.any(), (req, res, next) => {
  let userName = req.user.email.split('@')[0].toUpperCase();
  if (userName == req.body.cname) {
    let data = req.body;
    console.log(data)
    getModel().updateByUserName(userName, data.fchk.join(","), (err, savedData) => {
      if (err) {
        res.end("沒法更改,超出登記次數!");
        return;
      }
      res.render('act/sportday/view.pug', {
        profile: req.user,
        books: savedData,
        rec: ShowItemName(savedData[0].rec),
        groupName: ShowGroupName(savedData[0].groupid)
      });
      //res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  } else {
    res.end("Error!")
  }
});

router.get('/datagrid', (req, res) => {
  if (!checkuser(req)) { res.end("no right"); return; }
  getModel().list(req.user.id, (err, entities) => {
    if (err) {
      next(err);
      return;
    }
    res.render('act/sportday/grid.pug', {
      profile: req.user,
      books: entities
    });
  });
});
/**
 * Errors on "/sportday/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});
module.exports = router;