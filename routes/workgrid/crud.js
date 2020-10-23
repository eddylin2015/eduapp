'use strict';

const express = require('express');
const images = require('./images');
var oauth2 = require('../../db/internalOauth2.js')
var adoauth2 = require('../../db/usersAdGROUP.js')
function getModel () { return require(`./model-mysql-pool`);}
function fmt_title(username, datestr, description) {
    description = description.split("\n")[0];
    datestr = datestr.length > 10 ? datestr.substring(0, 10) : datestr;
    return username + ":" + datestr + ":" + description;
}
function fmt_now() {
    var d = new Date();
    var dstr = d.getFullYear() + "-";
    if (d.getMonth() < 9) dstr += "0";
    dstr += d.getMonth()+1 + "-";
    if (d.getDate() < 10) dstr += "0";
    dstr += d.getDate();
    return dstr;
}
function rotate_weektable(entities) {
    var weekname = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var weekchnname = ["日", "一", "二", "三", "四", "五", "六"];
    var tmp = [
        [null, null,         "", "", "", "", ""],
        ["節", " \\週",      "", "", "", "", ""],
        ["1", "0830~\n0910\n0835~\n0915", "", "", "", ""],
        ["2", "0930~\n1010\n0925~\n1005", "", "", "", ""],
        ["3", "1015~\n1055\n1010~\n1050", "", "", "", ""],
        ["4", "1105~\n1145\n1100~\n1140", "", "", "", ""],
        ["5", "1150~\n1230\n1145~\n1225", "", "", "", ""],
        ["6", "1410~\n1450\n1415~\n1455", "", "", "", ""],
        ["7", "1455~\n1535\n1500~\n1540", "", "", "", ""],
        ["8", "1550~\n1630\n1545~\n1715", "", "", "", ""],
        ["#", "00:00~00:00", "", "", "", ""]
    ];
    var fLen = entities.length;
    for (var i = 0; i < fLen; i++) { tmp[1][i + 2] = weekchnname[entities[i].dw] + " (" + entities[i].logDate + ")"; tmp[0][i + 2] = entities[i].id }
    for (var i = 0; i < fLen; i++) { tmp[2][i + 2] = entities[i].A; }
    for (var i = 0; i < fLen; i++) { tmp[3][i + 2] = entities[i].B; }
    for (var i = 0; i < fLen; i++) { tmp[4][i + 2] = entities[i].C; }
    for (var i = 0; i < fLen; i++) { tmp[5][i + 2] = entities[i].D; }
    for (var i = 0; i < fLen; i++) { tmp[6][i + 2] = entities[i].E; }
    for (var i = 0; i < fLen; i++) { tmp[7][i + 2] = entities[i].F; }
    for (var i = 0; i < fLen; i++) { tmp[8][i + 2] = entities[i].G; }
    for (var i = 0; i < fLen; i++) { tmp[9][i + 2] = entities[i].H; }
    for (var i = 0; i < fLen; i++) { tmp[10][i + 2] = entities[i].I; }
    return tmp;
}
const router = express.Router();
router.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});
/**
 * GET /books/add
 *
 * Display a page of books (up to ten at a time).
 */
router.get('/',  oauth2.required, (req, res, next) => {
    getModel().listWeek(
        null,
        4,
        fmt_now(),
        req.query.pageToken,
        (err, entities, cursor, apiResponse) => {
            if (err) { next(err); return; }
            res.render('workgrid/gridrotateweek.pug', {
                profile: req.user,
                books: rotate_weektable(entities),
                nextPageToken: cursor
            });
        }
    );
});
router.get('/records',  oauth2.required,  (req, res, next) => {
    getModel().list(req.user.id, 10, req.query.pageToken, (err, entities, cursor) => {
        if (err) {
            next(err);
            return;
        }
        res.render('workgrid/grid.pug', {
            profile: req.user,
            books: entities,
            nextPageToken: cursor
        });
    });
});
// Use the oauth2.required middleware to ensure that only logged-in users
// can access this handler.
router.get('/week',  oauth2.required, (req, res, next) => {
    getModel().listWeek(
        req.user.id,
        7,
        fmt_now(),
        req.query.pageToken,
        (err, entities, cursor, apiResponse) => {
            if (err) {
                next(err);
                return;
            }
            res.render('workgrid/gridweek.pug', {
                profile: req.user,
                books: entities,
                nextPageToken: cursor
            });
        }
    );
});
router.get('/weekgrid',  oauth2.required, (req, res, next) => {
    getModel().listWeek(
        req.user.id,
        7,
        fmt_now(),
        req.query.pageToken,
        (err, entities, cursor, apiResponse) => {
            if (err) { next(err); return; }
            res.render('workgrid/gridrotateweek.pug', {
                profile: req.user,
                books: rotate_weektable(entities),
                nextPageToken: cursor
            });
        }
    );
});
// Use the oauth2.required middleware to ensure that only logged-in users
// can access this handler.
router.get('/mine',  oauth2.required, (req, res, next) => {
  getModel().listBy(
    req.user.id,
    10,
    req.query.pageToken,
    (err, entities, cursor, apiResponse) => {
      if (err) {
        next(err);
        return;
      }
      res.render('workgrid/list.pug', {
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
    console.log(req.user);
    res.render('workgrid/form.pug', {
        profile: req.user,
        book: {
            author: req.user.username,
            authorname: req.user.displayName,
            logDate: fmt_now(),
            rootid: 0,
            title: fmt_title(req.user.username, fmt_now(),  'worklog' )
        },
        action: 'Add'
    });
});


/**
 * POST /books/add
 *
 * Create a book.
 */
// [START add]
router.post(
    '/add',
    images.multer.single('image'),
     oauth2.required, 
  (req, res, next) => {
     const data = req.body;
    // If the user is logged in, set them as the creator of the book.
    if (req.user) {
      data.createdBy = req.user.displayName;
      data.createdById = req.user.id;
      data.ModifiedBy = req.user.displayName;
      data.ModifiedById = req.user.id;
    } else {
      data.createdBy = 'Anonymous';
    }
    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    // Save the data to the database.
    //data.title = fmt_title(data.author, data.logDate, data.description)
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
router.get('/:book/edit',   oauth2.required, (req, res, next) => {
    getModel().read(req.user.id, req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
      }
    console.log(entity);
    res.render('workgrid/form.pug', {
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
    images.multer.single('image'),  oauth2.required,
    (req, res, next) => {
        const data = req.body;
        if (req.user) {
            data.ModifiedBy = req.user.displayName;
            data.ModifiedById = req.user.id;
        } else {
            data.ModifiedBy = 'Anonymous';
        }
    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    //if (req.file && req.file.cloudStoragePublicUrl) {
    //  req.body.imageUrl = req.file.cloudStoragePublicUrl;
    //}
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
router.get('/:book',   oauth2.required, (req, res, next) => {
    console.log("read");
  getModel().read(req.user.id, req.params.book, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('workgrid/view.pug', {
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
router.get('/:book/delete',  oauth2.required,  (req, res, next) => {
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
