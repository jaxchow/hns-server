/**
 *
 *	文件上传middleware 配置
 *
 *
 **/
"use strict";

var path = require("path");
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');

module.exports = function(app) {

    app.use(bodyParser());
	app.use(multiparty({uploadDir: path.join(__dirname, '../../uploads/'), keepExtensions:true}))


    return app;
}
