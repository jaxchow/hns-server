var fs = require('fs'),
    path = require('path'),
    lodash = require('lodash');

module.exports = function(sequelize, DataTypes) {
    var db = {};
    fs.readdirSync(path.join(__dirname,"./"))
        .filter(function(file) {
            return (file.indexOf('.spec') !== 0) && (file !== 'index.js') && (file !="connection.js") &&(file.indexOf('.model.js')>=0);
          })
        .forEach(function(file) {
            var model = sequelize.import(path.join(__dirname,"./", file));
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
