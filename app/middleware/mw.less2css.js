"use strict";

var expressLess = require('express-less'),
    path = require("path");
module.exports = function(app) {
    app.use("/css/", expressLess(path.join(__dirname, '../../css')));

    return app;
}
