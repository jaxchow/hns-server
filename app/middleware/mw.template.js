"use strict";

var velocity = require('velocity-view');
var path = require("path");

module.exports = function(app) {
    app.engine('.html', velocity.__express);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '../../views'));
    app.set('macros', "/macro/common.vm")
    return app;
}
