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
var oauth2 = require('../../../db/internalOauth2.js')
function getModel () {
    return require(`./model-mysql-pool`);
}
function fmt_title(username, datestr, description) {
    description = description.split("\n")[0];
    //description = description.length > 10 ? description.substring(0, 10) : description;
    datestr = datestr.length > 10 ? datestr.substring(0, 10) : datestr;
    return username + ":" + datestr + ":" + description;
}
function fmt_now() {
    var d = new Date();
    var dstr = d.getFullYear() + "-";
    if (d.getMonth() < 10) dstr += "0";
    dstr += d.getMonth()+1 + "-";
    if (d.getDate() < 10) dstr += "0";
    dstr += d.getDate();
    return dstr;
}
function checkuser(req){
	if(req.user.email=="lammou@mail.mbc.edu.mo") return true;
	if(req.user.email=="joe853.hong@mail.mbc.edu.mo") return true;
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
/**
 * GET /books/add
 *
 * Display a page of books (up to ten at a time).
 */
router.get('/', (req, res, next) => {
  res.render('act/sportday/index.pug');
});

router.get('/spreg.jsp', (req, res, next) => {
if(req.user){
  let userName=req.user.email.split('@')[0].toUpperCase();
  res.render('act/sportday/spreg.pug', {
            profile: req.user,
            userName:userName
        });
  //let username=req.user.email.split('@')[0].toUpperCase()
  // getModel().read(username, (err, entities) => {
  //    if (err) {next(err); return; }
  //    res.render('act/sportday/spreg.pug', {
  //        profile: req.user,
  //        JRES: entities
  //    });
  //});
}else{
  res.redirect("/internal/login?subpath=sportday");
}
});
// Use the oauth2.required middleware to ensure that only logged-in users
// can access this handler.
router.post('/read', oauth2.required, (req, res, next) => {
  let userName=req.user.email.split('@')[0].toUpperCase();
  getModel().readbyUserName(userName, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    if(entity && entity.length>0){
      let row=entity[0];
      res.write(`${row.stdname}\n${row.classno}_${row.seat}\n\n\n${row.groupid}\n`);
      let rec=row.rec.split(';');
      for(let i=0;i<rec.length;i++)
        res.write(`\nREC,${row.groupid},${rec[i]}`);
      res.end();
    }else{
      res.end(`nothing\n不在登記名單內!`)
    }
    //res.render('act/sportday/view.pug', {
    //  profile: req.user,
    //  book: entity
    //});
  });
});
function ShowGroupName(x)
{
  var GROUP_Name=["男A","男B","男C","男D",,"女A","女B","女C","女D","男E","女E"];
  return GROUP_Name[x];
}
function ShowItemName(rec)
{
  console.log(rec)
  let res="";
  var ITEM_Name = [
    "---", "50M", "60M", "100M", "200M", "400M", "800M", "1000M", "1500M", "3000M", "5000M", "60米欄", "80米欄", "100米欄", "110米欄", "4x50M", "4x100M", "4x400M", "跳高", "跳遠", "三級跳遠", "壘球", "鉛球"];
    let lastdata_=rec.split(';');
    let lastdata_li=lastdata_[lastdata_.length-1];
    console.log(lastdata_li);
    let itemli=lastdata_li.match(/[0-9]+/g);
    console.log(itemli)
    for(let i=0;i<itemli.length;i++ ){
      res+=ITEM_Name[Number(itemli[i])]+"\n";
    }
    return res;
}
router.post('/update',oauth2.required, images.multer.any(),  (req, res, next) => {
  //req.file/req.files
  let userName=req.user.email.split('@')[0].toUpperCase();
  if(userName==req.body.cname){
    let data=req.body;
    console.log(data)
    getModel().updateByUserName(userName, data.fchk.join(","), (err, savedData) => {
      if (err) {
        res.end("沒法更改,超出登記次數!");
        //console.log(err);
        //next(err);
        return;
      }
      res.render('act/sportday/view.pug', {
          profile: req.user,
          books: savedData,
          rec:ShowItemName(savedData[0].rec),
          groupName:ShowGroupName(savedData[0].groupid)
      });
      //res.write(`學生:${savedData[0].stdname}<br>組別:${savedData[0].groupid} | ${savedData[0].groupname}`);
      //res.write("<br>項目如下:");
      //res.write(ShowItemName(savedData[0].rec));
      //res.end("<button onclick='window.history.back()'>返回</button>");
      //res.end(JSON.stringify(savedData));
      //res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
      
  }else{
    res.end("Error!")
  }
});
router.get('/mine', oauth2.required, (req, res, next) => {
  if(!checkuser(req)){ res.end("no right");return;}
  getModel().listBy(
    req.user.id,
    10,
    req.query.pageToken,
    (err, entities, cursor, apiResponse) => {
      if (err) {
        next(err);
        return;
      }
      res.render('act/sportday/list.pug', {
        profile: req.user,
        books: entities,
        nextPageToken: cursor
      });
    }
  );
});
router.post('/:book/imageUploader', images.multer.any(),   function(req, res) {
    //req.file/req.files
	res.send({
		"uploaded": 1,
    	"fileName": "IMAGE.PNG",
    	"url": "/ckeditorimages/"+req.files[0].filename
	})
})
router.get('/searchform', (req, res) => {
	if(!checkuser(req)){ res.end("no right");return;}
    res.render('act/sportday/searchform.pug', {
        profile: req.user,
        book: {
            author: req.user.username,
            logDate: fmt_now(),
            title:""
        },
        action: 'Post'
    });
});
router.post('/searchform', oauth2.required,
    images.multer.single('image'),
    (req, res) => {
		if(!checkuser(req)){ res.end("no right");return;}
        const data = req.body;
        var author = data.author;
    getModel().listTimestampBy(
        req.user.id,
        author,
        data.slogDate,
        data.elogDate,
        10,
        req.query.pageToken,
        (err, entities, cursor, apiResponse) => {
            if (err) {
                next(err);
                return;
            }
            res.render('act/sportday/table.pug', {
                profile: req.user,
                books: entities,
                nextPageToken: cursor
            });
        }
    );
});
/**
 * GET /books/add
 *
 * Display a form for creating a book.
 */
router.get('/add', (req, res) => {
    if(!checkuser(req)){ res.end("no right");return;}
    let formpug='act/sportday/form.pug';
    if(req.query.ckedit) formpug='act/sportday/form.1.pug';
    res.render(formpug, {
        profile: req.user,
        book: {
            author: req.user.username,
            authorname: req.user.displayName,
            logDate: fmt_now(),
            rootid: 0,
            title: fmt_title(req.user.username, fmt_now(), 'worklog'),
            createdById: req.user.id,
            deptlog: 0
        },
        action: 'Add'
    });
});
router.post(
    '/:book/follow',
    images.multer.single('image'),
    (req, res, next) => {
		if(!checkuser(req)){ res.end("no right");return;}
        const data = req.body;        
        // If the user is logged in, set them as the creator of the book.
        if (req.user) {
            data.createdBy = req.user.displayName;
            data.createdById = req.user.id;
        } else {
            data.createdBy = 'Anonymous';
        }
        if (data.rootid > 0 && data.deptlog !== 0) { getModel().updateGroupStatus(data.rootid, data.deptlog); }
        if (data.deptlog == 1) data.deptlog = 2;
        // Was an image uploaded? If so, we'll use its public URL
        // in cloud storage.
        // Save the data to the database.
        data.title = fmt_title(data.author, data.logDate, data.description)
        getModel().create(req.user.id, data, (err, savedData) => {
            if (err) {
                next(err);
                return;
            }
            res.redirect(`${req.baseUrl}/${savedData.id}`);
        });
    }
);

/**
 * POST /books/add
 *
 * Create a book.
 */
// [START add]
router.post(
    '/add',
    images.multer.single('image'),
  (req, res, next) => {
	  if(!checkuser(req)){ res.end("no right");return;}
     const data = req.body;
    // If the user is logged in, set them as the creator of the book.
    if (req.user) {
      data.createdBy = req.user.displayName;
      data.createdById = req.user.id;
    } else {
      data.createdBy = 'Anonymous';
     }
    if (data.deptlog == 1) data.deptlog = 2;
    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    // Save the data to the database.
    data.title = fmt_title(data.author, data.logDate, data.description)
    getModel().create(req.user.id, data, (err, savedData) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  }
);
// [END add]

/**
 * GET /books/:id/edit
 *
 * Display a book for editing.
 */
router.get('/:book/edit', (req, res, next) => {
	if(!checkuser(req)){ res.end("no right");return;}
    getModel().read(req.user.id, req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
      }    
      let formpug='act/sportday/form.pug';
      if(req.query.ckedit) formpug='act/sportday/form.1.pug';
    res.render(formpug, {
      profile: req.user,
      book: entity,
      action: 'Edit'
    });
  });
});

/**
 * POST /books/:id/edit
 *
 * Update a book.
 */
router.post(
    '/:book/edit',
    images.multer.single('image'), oauth2.required,
    (req, res, next) => {
		if(!checkuser(req)){ res.end("no right");return;}
    const data = req.body;
    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    //if (req.file && req.file.cloudStoragePublicUrl) {
    //  req.body.imageUrl = req.file.cloudStoragePublicUrl;
    //}
    if (data.rootid > 0 && data.deptlog !== 0) { getModel().updateGroupStatus(data.rootid, data.deptlog); }
    if (data.deptlog==1) data.deptlog = 2;
        
    data.title = fmt_title(data.author, data.logDate, data.description);
    getModel().update(req.user.id,req.params.book, data, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  }
);
/**
 * GET /books/:id
 *
 * Display a book.
 */
router.get('/:book', (req, res, next) => {
if(!checkuser(req)){ res.end("no right");return;}	

  getModel().read(req.user.id, req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('act/sportday/view.pug', {
      profile: req.user,
      book: entity
    });
  });
});
/**
 * GET /books/:id/delete
 *
 * Delete a book.
 */
router.get('/:book/delete', (req, res, next) => {
	if(!checkuser(req)){ res.end("no right");return;}
    getModel().delete(req.user.id,req.params.book, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect(req.baseUrl);
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