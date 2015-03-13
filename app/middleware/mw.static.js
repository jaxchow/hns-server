"use strict";
var express = require("express");
var path = require("path");

module.exports = function(app) {
    app.use('/thirdparty', express.static(path.join(__dirname, '../../thirdparty')));
    app.use('/images', express.static(path.join(__dirname, '../../images')));
    app.use('/js', express.static(path.join(__dirname, '../../js')));
    app.use('/jsc', express.static(path.join(__dirname, '../../jsc')));
    app.use('/css', express.static(path.join(__dirname, '../../css')));
	return app;
};
