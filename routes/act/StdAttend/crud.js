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
	if(!checkuser(req)){ res.end("no right");return;}
  getModel().list(req.user.id, 10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    //res.render('activityStdAttend/list.pug', {
    res.render('activityStdAttend/list.pug', {
      profile: req.user ,
      books: entities,
      nextPageToken: cursor
    });
  });
});
// Use the oauth2.required middleware to ensure that only logged-in users
// can access this handler.
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
      res.render('activityStdAttend/list.pug', {
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
    res.render('activityStdAttend/searchform.pug', {
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
            res.render('activityStdAttend/table.pug', {
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
    let formpug='activityStdAttend/form.pug';
    if(req.query.ckedit) formpug='activityStdAttend/form.1.pug';
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
      let formpug='activityStdAttend/form.pug';
      if(req.query.ckedit) formpug='activityStdAttend/form.1.pug';
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
    res.render('activityStdAttend/view.pug', {
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