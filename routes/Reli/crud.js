'use strict';

const express = require('express');
const images = require('./images');
var oauth2 = require('../../db/internalOauth2.js')
function getModel() {
    return require(`./model-mysql-pool`);
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
function fmt_time() {
    var d = new Date();
    var dstr = d.getFullYear() + "-";
    if (d.getMonth() < 10) dstr += "0";
    dstr += d.getMonth() + 1 + "-";
    if (d.getDate() < 10) dstr += "0";
    dstr += d.getDate();
    dstr += " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() +
        ":" + d.getMilliseconds()
    return dstr;
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
    if (req.user) {
        let username = req.user.email.split('@')[0].toUpperCase()
        getModel().read(username, (err, entities) => {
            if (err) {
                next(err);
                return;
            }
            res.render('RELI/index.pug', {
                profile: req.user,
                JRES: entities
            });
        });
    } else {
        res.redirect("/internal/login?subpath=RELI");
    }
});
router.post('/reli2021_term_start_post.php',oauth2.required,  images.multer.single('image'), (req, res, next) => {
    if (!req.user) { res.end(JSON.stringify(req.body)); return; }
    let fieldnames = [
        "stud_ref",
        "modified_date",
        "name",
        "classno",
        "seat",
        "性別",
        "年齡",
        "宗教信仰",
        "信主年數",
        "教會",
        "返教會次數",
        "洗浸禮",
        "返聖堂次數",
        "其他信仰",
        "父信仰",
        "父其他信仰",
        "母信仰",
        "母其他信仰",
        "A1信主原因",
        "A2其他原因",
        "A3JOIN活動",
        "A4活動",
        "A5其他活動",
        "A6活動時段",
        "A7其他時段",
        "A8JOIN事奉",
        "A9事奉",
        "AA其他事奉",
        "ABJOIN協助",
        "AC協助",
        "AD其他協助",
        "AEJOIN培訓",
        "AE培訓",
        "AE其他培訓",
        "AF聖經科",
        "AF建議",
        "AG喜歡福音活動聚會",
        "AG建議",
        "AG其他",
        "AF希望從神得到",
        "B1信仰印象",
        "B2其他印象",
        "B3未信原因",
        "B4其他原因",
        "B5JOIN活動",
        "B6活動",
        "B7其他活動",
        "B8活動時段",
        "B9其他時段",
        "BA喜歡福音活動聚會",
        "BA建議",
        "BA其他",
        "BB聖經科"
    ];
    let data = req.body;
    let fn = ["A1信主原因",
        "A4活動",
        "A6活動時段",
        "A9事奉",
        "AC協助",
        "AE培訓",
        "AG喜歡福音活動聚會",
        "B1信仰印象",
        "B3未信原因",
        "B6活動",
        "B8活動時段",
        "BA喜歡福音活動聚會",
    ];
    for (let i = 0; i < fn.length; i++) {
        let temp = fn[i];
        if (data[temp]) { data[temp] = data[temp].join(";"); }
    }
    for (let i = 3; i < fieldnames.length; i++) {
        let temp = fieldnames[i];
        if (!data[temp]) { data[temp] = ""; }
    }
    let username = req.user.email.split('@')[0].toUpperCase();
    getModel().update(username, req.body, (err, sData) => {
        if (err) {
            next(err);
            return;
        }
        //res.end(JSON.stringify(sData));
        let ERRMSG = "";
        if (sData["宗教信仰"] == "基督教" || sData["宗教信仰"] == "天主教") {
            let reli = ["A1信主原因", "A3JOIN活動", "A6活動時段", "A8JOIN事奉", "ABJOIN協助", "AEJOIN培訓", "AF聖經科", "AG喜歡福音活動聚會"];
            for (let i = 0; i < reli.length; i++) {
                if (!sData[reli[i]] || sData[reli[i]] == "") { ERRMSG += `A .${(i + 1)} <br>`; }
            }
        } else {
            let none_reli = ["B1信仰印象", "B3未信原因", "B5JOIN活動", "B8活動時段", "BA喜歡福音活動聚會", "BB聖經科"];
            for (let i = 0; i < none_reli.length; i++) {
                if (!sData[none_reli[i]] || sData[none_reli[i]] == "") { ERRMSG += `B . ${i + 1} .<br>`; }
            }
        }
        if (ERRMSG == "") { res.end("OK! 資料更新, Updated Data."); }
        else {
            res.end(`${ERRMSG}<br>請填寫以上欄位!`);
        }
        //console.log(`${req.baseUrl}/${savedData.id}`);
        //res.redirect(`${req.baseUrl}/${req.params.book.substring(0, 2)}`);
    });
});

router.get('/info.php', oauth2.required, (req, res, next) => {
    if (req.user) {
        let username = req.user.email.split('@')[0].toUpperCase()
        getModel().read(username, (err, entities) => {
            if (err) {
                next(err);
                return;
            }
            let msg = "<table>";
            let keys = Object.keys(entities);
            for (let i = 0; i < keys.length; i++) {
                msg += `<tr><td>${keys[i]}</td><td>${entities[keys[i]]}</td></tr>`;
            }
            msg += "<table>";
            res.end(msg);
        });
    } else {
        res.end("end.");
    }
});

router.get('/grid.php',oauth2.required,  (req, res, next) => {
    if (req.user && req.user.username == "TEACHER") {
        getModel().list(req.user.id, (err, entities) => {
            if (err) {
                next(err);
                return;
            }
            res.render('RELI/grid.pug', {
                profile: req.user,
                books: entities
            });
        });
    } else {
        res.end("structing");
    }
});


/**
 * Errors on "/RELI/*" routes.
 */
router.use((err, req, res, next) => {
    // Format error and forward to generic error handler for logging and
    // responding to the request
    err.response = err.message;
    next(err);
});
module.exports = router;
