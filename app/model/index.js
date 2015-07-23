var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    lodash = require('lodash'),
    sequelize = new Sequelize('database', 'root', 'root', {
        host: "192.168.99.100",
        port: "3306",
        pool: { // If you want to override the options used for the read pool you can do so here
            maxConnections: 20,
            maxIdleTime: 30000
        }
    });
var db = {};
    fs.readdirSync(path.join(__dirname, "."))
        .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js');
        })
        .forEach(function(file) {
            var model = sequelize.import(path.join(__dirname, ".", file));
            db[model.name] = model;
        });
    Object.keys(db).forEach(function(modelName) {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db);
        }
    });

sequelize.authenticate().done(function(err) {
    if (!!err) {
        console.error('Unable to connect to the database:', err);
    } else {
        console.log('Connection has been established successfully.');
    }
});
module.exports = lodash.extend({models:db}, sequelize);
