var fs = require('fs'),
    path = require('path'),
    lodash = require('lodash');

module.exports = function(sequelize, DataTypes) {
    var db = {};
    fs.readdirSync(path.join(__dirname,"../model/"))
        .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js');
        })
        .forEach(function(file) {
            var model = sequelize.import(path.join(__dirname,"../model/", file));
            db[model.name] = model;
        });
		Object.keys(db).forEach(function(modelName) {
            if ("associate" in db[modelName]) {
                db[modelName].associate(db);
            }
        });
        return lodash.extend({
            sequelize: sequelize
        }, db);
};
