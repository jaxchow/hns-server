
var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , sequelize = new Sequelize('database', 'root', 'root',{
      host:"127.0.0.1",
      port:"3306",
      pool: { // If you want to override the options used for the read pool you can do so here
        maxConnections: 20,
        maxIdleTime: 30000
      }
  })
  , db        = require("./connection")(sequelize)
  , manager   = {};
 
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !="connection.js");
  })
  .forEach(function(file) {
    var moduleManager = sequelize.import(path.join(__dirname, file));
    manager[moduleManager.name()] = moduleManager;
  });

sequelize.authenticate().complete(function(err) {
    if ( !! err) {
        console.error('Unable to connect to the database:', err);
    } else {
        console.log('Connection has been established successfully.');
    }
});
module.exports = lodash.extend({
    manager:manager
}, sequelize);

