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
const oauth2 = require('../../../db/internalOauth2');
const model = require('./model-mysql');

const router = express.Router();

// Use the oauth middleware to automatically get the user's profile
// information and expose login/logout URLs to templates.
router.use(oauth2.template);

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
router.get('/', (req, res, next) => {
  model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('act/sportDayBlogs/list.pug', {
      books: entities,
      nextPageToken: cursor,
    });
  });
});

// [START mine]
// Use the oauth2.required middleware to ensure that only logged-in users
// can access this handler.
router.get('/mine', oauth2.required, (req, res, next) => {
  model.listBy(
    req.user.id,
    10,
    req.query.pageToken,
    (err, entities, cursor) => {
      if (err) {
        next(err);
        return;
      }
      res.render('act/sportDayBlogs/list.pug', {
        books: entities,
        nextPageToken: cursor,
      });
    }
  );
});
// [END mine]

/**
 * GET /act/sportDayBlogs/add
 *
 * Display a form for creating a book.
 */
router.get('/add', (req, res) => {
  res.render('act/sportDayBlogs/form.pug', {
    book: {},
    action: 'Add',
  });
});

/**
 * POST /act/sportDayBlogs/add
 *
 * Create a book.
 */
// [START add]
router.post(
  '/add',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    // If the user is logged in, set them as the creator of the book.
    if (req.user) {
      data.createdBy = req.user.displayName;
      data.createdById = req.user.id;
    } else {
      data.createdBy = 'Anonymous';
    }
    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }
    // Save the data to the database.
    model.create(data, (err, savedData) => {
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
 * GET /act/sportDayBlogs/:id/edit
 *
 * Display a book for editing.
 */
router.get('/:book/edit',oauth2.required, (req, res, next) => {
  model.read(req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('act/sportDayBlogs/form.pug', {
      book: entity,
      action: 'Edit',
    });
  });
});
/**
 * POST /act/sportDayBlogs/:id/edit
 *
 * Update a book.
 */
router.post(
  '/:book/edit',oauth2.required,
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    if(req.file && req.file.filename) data.imageUrl=req.file.filename;
    model.update(req.params.book, data, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  }
);
router.post('/:book/imageUploader', oauth2.required, images.multer.any(),   function(req, res) {
  //req.file/req.files
res.send({
  "uploaded": 1,
    "fileName": "IMAGE.PNG",
    "url": "/app_static_file/act/bbs/"+req.files[0].filename
})
})
/**
 * GET /act/sportDayBlogs/:id
 *
 * Display a book.
 */
router.get('/:book', (req, res, next) => {
  model.read(req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('act/sportDayBlogs/view.pug', {
      book: entity,
    });
  });
});

/**
 * GET /act/sportDayBlogs/:id/delete
 *
 * Delete a book.
 */
router.get('/:book/delete', oauth2.required,(req, res, next) => {
  model.delete(req.user.id,req.params.book, err => {
    if (err) {
      next(err);
      return;
    }
    res.redirect(req.baseUrl);
  });
});

/**
 * Errors on "/act/sportDayBlogs/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;
