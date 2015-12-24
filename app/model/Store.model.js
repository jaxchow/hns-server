var Sequelize = require('sequelize');

module.exports = function(sequelize,models){
	var Store = sequelize.define('Store',{
		id:{
			type:Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey:true
		},
		storename:Sequelize.STRING,
        username:Sequelize.STRING,
		password:Sequelize.STRING,
		city:Sequelize.STRING,
        index:Sequelize.INTEGER
	},{
		tableName:'store',
		// 一定要写中文不会出错
		charset:'utf8',
		classMethods:{
		}
	});

	return models.Store=Store;
}
