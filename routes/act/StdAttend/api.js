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
const bodyParser = require('body-parser');

function getModel () {
  return require(`./model-mysql`);
}
const router = express.Router();
// Automatically parse request body as JSON
router.use(bodyParser.json());
/**
 * GET /api/books
 *
 * Retrieve a page of books (up to ten at a time).
 */
function checkuser(req){
	console.error("email",req.user.email);
	if(req.user.email=="1lammou@mail.mbc.edu.mo") return true;
	return false;
}
router.get('/', (req, res, next) => {
  if(!checkuser(req)){ res.end("no right");return;}
  getModel().list(req.user.id,10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.json({
      items: entities,
      nextPageToken: cursor
    });
  });
});

/**
 * POST /api/books
 *
 * Create a new book.
 */
router.post('/', (req, res, next) => {
  if(!checkuser(req)){ res.end("no right");return;}
  getModel().create(req.user.id,req.body, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entity);
  });
});

/**
 * GET /api/books/:id
 *
 * Retrieve a book.
 */
router.get('/:book', (req, res, next) => {
  if(!checkuser(req)){ res.end("no right");return;}
  getModel().read(req.user.id, req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entity);
  });
});

/**
 * PUT /api/books/:id
 *
 * Update a book.
 */
router.put('/:book', (req, res, next) => {
	if(!checkuser(req)){ res.end("no right");return;}
  getModel().update(req.user.id,req.params.book, req.body, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entity);
  });
});

/**
 * DELETE /api/books/:id
 *
 * Delete a book.
 */
router.delete('/:book', (req, res, next) => {
  if(!checkuser(req)){ res.end("no right");return;}
  getModel().delete(req.user.id,req.params.book, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send('OK');
  });
});
router.get('/searchform', (req, res, next) => {
	if(!checkuser(req)){ res.end("no right");return;}
    res.render('actreg/searchform.pug', {
        profile: req.user,
    });
});
/**
 * Errors on "/api/books/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = {
    message: err.message,
    internalCode: err.code
  };
  next(err);
});

module.exports = router;
