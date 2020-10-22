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
router.get('/', require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
	if(!checkuser(req)){ res.end("no right");return;}
    getModel().list(req.user.id, 10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    //res.render('worknote/list.pug', {
    res.render('worknote/list.pug', {
      profile: req.user ,
      books: entities,
      nextPageToken: cursor
    });
  });
});
// Use the oauth2.required middleware to ensure that only logged-in users
// can access this handler.
router.get('/mine', require('connect-ensure-login').ensureLoggedIn(), require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
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
      res.render('worknote/list.pug', {
        profile: req.user,
        books: entities,
        nextPageToken: cursor
      });
    }
  );
});
router.post('/:book/imageUploader', require('connect-ensure-login').ensureLoggedIn(), images.multer.any(),   function(req, res) {
    //req.file/req.files
	res.send({
		"uploaded": 1,
    	"fileName": "IMAGE.PNG",
    	"url": "/ckeditorimages/"+req.files[0].filename
	})
})
router.get('/searchform', (req, res) => {
	if(!checkuser(req)){ res.end("no right");return;}
    res.render('worknote/searchform.pug', {
        profile: req.user,
        book: {
            author: req.user.username,
            logDate: fmt_now(),
            title:""
        },
        action: 'Post'
    });
});
router.post('/searchform', require('connect-ensure-login').ensureLoggedIn(),
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
            res.render('worknote/table.pug', {
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
    let formpug='worknote/form.pug';
    if(req.query.ckedit) formpug='worknote/form.1.pug';
    res.render(formpug, {
        profile: req.user,
        book: {
            author: req.user.username,
            authorname: req.user.displayName,
            logDate: fmt_now(),
            rootid: 0,
            parentid:0,
            title: fmt_title(req.user.username, fmt_now(), 'worklog'),

            createdById: req.user.id,
            deptlog: 0
        },
        action: 'Add'
    });
});
router.get('/:book/follow', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
	if(!checkuser(req)){ res.end("no right");return;}
    res.render('worknote/form.pug', {
        profile: req.user,
        book: {
            deptlog: 0,
            author: req.user.username,
            authorname: req.user.displayName,
            logDate: fmt_now(),
            parentid: req.params.book,
            rootid: req.query.rid,
            title: fmt_title(req.user.username, fmt_now(), 'worklog'),
            description: req.query.t,
            createdById : req.user.id
        },
        action: 'Follow'
    });
});
router.post(
    '/:book/follow', require('connect-ensure-login').ensureLoggedIn(),
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
router.get('/followlist', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
	if(!checkuser(req)){ res.end("no right");return;}
    getModel().listByParentid(
        req.user.id,
        req.query.rid,
        10,
        req.query.pageToken,
        (err, entities, cursor, apiResponse) => {
            if (err) {
                next(err);
                return;
            }
            res.render('worknote/table.pug', {
                profile: req.user,
                books: entities,
                nextPageToken: cursor
            });
        }
    );
});

/**
 * POST /books/add
 *
 * Create a book.
 */
// [START add]
router.post(
    '/add', require('connect-ensure-login').ensureLoggedIn(),
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
router.get('/:book/edit', require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
	if(!checkuser(req)){ res.end("no right");return;}
    getModel().read(req.user.id, req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
      }    
      let formpug='worknote/form.pug';
      if(req.query.ckedit) formpug='worknote/form.1.pug';
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
    images.multer.single('image'), require('connect-ensure-login').ensureLoggedIn(),
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
router.get('/:book', require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
if(!checkuser(req)){ res.end("no right");return;}	

  getModel().read(req.user.id, req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('worknote/view.pug', {
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
router.get('/:book/delete', require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
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
