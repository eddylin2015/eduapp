'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const images = require('./images');

function getModel () {  return require(`./model-mysql-pool`);}
const router = express.Router();
// Automatically parse request body as JSON
router.use(bodyParser.json());
/**
 * GET /api/books
 * Retrieve a page of books (up to ten at a time).
 */
router.get('/', require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
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
 * Create a new book.
 */
router.post('/', require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
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
 * Retrieve a book.
 */
router.get('/:book', require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
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
 * Update a book.
 */
router.put('/:book', require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
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
 * Delete a book.
 */
router.delete('/:book', require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
  getModel().delete(req.user.id,req.params.book, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send('OK');
  });
});
router.get('/searchform', require('connect-ensure-login').ensureLoggedIn(), (req, res, next) => {
    res.render('worknote/searchform.pug', {
        profile: req.user,
    });
});
router.post('/updatebylogdate:book', require('connect-ensure-login').ensureLoggedIn(),(req, res, next) => {
  if(req.user.id==2)
  {
    updatebylogdate
  }else{
    res.end("error. auth!")
  }
});

router.post(
  '/updatebylogdate/:book',
  images.multer.single('image'), require('connect-ensure-login').ensureLoggedIn(),
  (req, res, next) => {
    if(req.user.id !== 2 ) {res.end("error!") ;return;}
      const data = req.body;
      if (req.user) {
          data.ModifiedBy = req.user.displayName;
          data.ModifiedById = req.user.id;
      } else {
          data.ModifiedBy = 'Anonymous';
      }
  getModel().updatebylogdate(req.user.id,req.params.book, data, (err, savedData) => {
    if (err) {
      next(err);
      return;
    }
    res.end(`${savedData.id}`);
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
