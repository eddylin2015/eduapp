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
const images = require('./images');
var oauth2 = require('../../db/internalOauth2.js')
function getModel() {
  return require(`./model-mysql-pool`);
}
function fmt_title(username, datestr, description) {
  description = description.split("\n")[0];
  datestr = datestr.length > 10 ? datestr.substring(0, 10) : datestr;
  return username + ":" + datestr + ":" + description;
}
function fmt_now() {
  var d = new Date();
  var dstr = d.getFullYear() + "-";
  if (d.getMonth() < 10) dstr += "0";
  dstr += d.getMonth() + 1 + "-";
  if (d.getDate() < 10) dstr += "0";
  dstr += d.getDate();
  return dstr;
}
function checkuser(req) {
  if (req.user.email == "lammou@mail.mbc.edu.mo") return true;
  if (req.user.email == "joe853.hong@mail.mbc.edu.mo") return true;
  if (req.user.email == "cheongiekchao@mail.mbc.edu.mo") return true;
  if (req.user.email == "fongsioman@mail.mbc.edu.mo") return true;
  return false;
}
const router = express.Router();
// Use the oauth middleware to automatically get the user's profile
// information and expose login/logout URLs to templates.
// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});
function isMobile(x) {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i];
  return toMatch.some((toMatchItem) => {
    return x.match(toMatchItem);
  });
}
router.get('/', (req, res, next) => {
  var source = req.headers['user-agent'];
  let pugtmplt = "index.pug";
  if (isMobile(source)) pugtmplt = "index_mobile.pug";
  let pdate = '2020-09-01';
  getModel().listForFont(pdate, 100, 0, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    let res_ = [];
    for (let i = 0; i < entities.length; i++) {
      let row = entities[i];
      res_.push({ id: row.id, type: row.type, item: row.item })
    }
    res.render(`me/${pugtmplt}`,
      {
        profile: req.user,
        itemsData: JSON.stringify(res_),
        itemsObj: res_
      });
  });

});
router.get('/mobile', (req, res, next) => {
  let pugtmplt = "index_mobile.pug";
  let pdate = '2020-09-01';
  getModel().listForFont(pdate, 100, 0, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    let res_ = [];
    for (let i = 0; i < entities.length; i++) {
      let row = entities[i];
      res_.push({ id: row.id, type: row.type, item: row.item })
    }
    res.render(`me/${pugtmplt}`,
      {
        profile: req.user,
        itemsData: JSON.stringify(res_),
        itemsObj: res_
      });
  });

});

router.get('/main.php', (req, res, next) => {
  let pdate = '2020-06-01';
  getModel().listForFont(pdate, 100, 0, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    let res_ = [];
    for (let i = 0; i < entities.length; i++) {
      let row = entities[i];
      res_.push({ id: row.id, type: row.type, item: row.item })
    }
    res.render('me/index.pug',
      {
        profile: req.user,
        itemsData: JSON.stringify(res_),
        itemsObj: res_
      });
  });

});
router.get('/index.html', (req, res, next) => {
  res.render('me/index_static.pug');
});
router.post('/getitemdata.php', (req, res, next) => {
  let typeSet_ = [req.body.t];
  if (req.body.t == "slideimg") {
    typeSet_ = ["slideimg", "moral1", "moral2", "moral3", "moral4", "moral5", "moral6", "moral7", "moral8", "moral9", "morala"];
  }
  getModel().listByType(typeSet_, 100, 0, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.end(JSON.stringify(entities));
  });
});
router.get('/getitemdata.php', (req, res, next) => {
  getModel().listByType(req.body.t, 100, 0, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.end(JSON.stringify(entities));
  });
});

router.post('/getcontentdata.php', (req, res, next) => {
  getModel().read(req.body.t, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.end("<p><p>" + entities.item + "</p><p>" + entities.detail + "</p><small>" + entities.item_date+"</small>");
  });
});

router.get('/getcontentdata.php', (req, res, next) => {
  getModel().read(req.query.t, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.end("<p><p>" + entities.item + "</p><p>" + entities.detail + "</p><small>" + entities.item_date+"</small>");
  });
});

router.get('/editdatali.php', (req, res, next) => {
  console.log();
  getModel().list(100, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('me/edit/list.pug', {
      profile: req.user,
      books: entities,
      nextPageToken: cursor
    });
  });
});
router.get('/readdata.php/:book', (req, res, next) => {
  getModel().read(req.query.t, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    entities.detail = entities.detail.replace(/[\r\n]/g, "<br>");
    res.end("<p><p>" + entities.item + "<p>" + entities.detail + "<p>" + entities.item_date);
  });
});
router.get('/viewdata/:book', oauth2.required, (req, res, next) => {
  getModel().read(req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('me/edit/view.pug', {
      profile: req.user,
      book: entity,
      action: 'Edit'
    });
  });
});

function fmt_now() {
  var d = new Date();
  var dstr = d.getFullYear() + "-";
  if (d.getMonth() < 9) dstr += "0";
  dstr += d.getMonth() + 1 + "-";
  if (d.getDate() < 10) dstr += "0";
  dstr += d.getDate();
  return dstr;
}
router.get('/editdata/add', oauth2.required, (req, res, next) => {

  let entity = { id: 0 ,item_date:fmt_now() };
  res.render('me/edit/form.pug', {
    profile: req.user,
    book: entity,
    action: 'Edit'
  });
});

router.post('/editdata/add', images.multer.single('image'), oauth2.required, (req, res, next) => {
  const data = req.body;
  getModel().create(data, (err, savedData) => {
    if (err) { next(err); return; }
    res.redirect(`${req.baseUrl}/viewdata/${savedData.id}`);
  });
});

router.get('/editdata/:book', oauth2.required, (req, res, next) => {
  getModel().read(req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('me/edit/form.pug', {
      profile: req.user,
      book: entity,
      action: 'Edit'
    });
  });
});

router.post('/editdata/:book', images.multer.single('image'), oauth2.required, (req, res, next) => {
  const data = req.body;
  getModel().update(req.params.book, data, (err, savedData) => {
    if (err) { next(err); return; }
    res.redirect(`${req.baseUrl}/viewdata/${savedData.id}`);
  });
});

router.post('/editdatapost.php', images.multer.single('image'), oauth2.required, (req, res, next) => {
  const data = req.body;
  getModel().update(req.params.book, data, (err, savedData) => {
    if (err) { next(err); return; }
    res.redirect(`${req.baseUrl}/${savedData.id}`);
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