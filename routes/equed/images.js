﻿// attend

'use strict';
const config = require('../../config');
function sendUploadToGCS(req, res, next) {  return next();}
const Multer = require('multer');
var storage = Multer.diskStorage({
    //设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
    destination: config.get("MATHS_ImgDir"),
    //TODO:文件区分目录存放
    //给上传文件重命名
    filename: function (req, file, cb) {
        let filename_ = "MATHS_"+req.params.book+"_"+req.user.id+"_"+file.originalname;
        var fileFormat = (file.originalname).split(".");
        cb(null,filename_);
        //cb(null,req.user.id+"/"+ file.originalname);
        //cb(null, file.fieldname + "." + fileFormat[fileFormat.length - 1]);
    }
});
const multer = Multer({
    storage: storage,
    //limits: {fileSize: 15 * 1024 * 1024   }// no larger than 15mb
});
module.exports = {
    multer
};
