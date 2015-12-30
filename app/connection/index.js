
var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , sequelize = new Sequelize('ezoom', 'root', 'root',{
      host:'192.168.99.100',
      port:"32772",
      pool: { // If you want to override the options used for the read pool you can do so here
        maxConnections: 20,
        maxIdleTime: 30000
    },
    dialect: 'mysql',
    define: {
      underscored: false,
      freezeTableName: false,
      //syncOnAssociation: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true
    },
    sync: { force: true },
  })
  , db        = require("../model")(sequelize)
  , manager   = {};

sequelize.authenticate().then(function(err) {
    if ( !! err) {
        console.error('Unable to connect to the database:', err);
    } else {
        console.log('Connection has been established successfully.');
    }
});
module.exports = sequelize;
