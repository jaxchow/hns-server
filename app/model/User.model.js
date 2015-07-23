var Sequelize = require('sequelize');

module.exports = function(sequelize,models){
	var User = sequelize.define('User',{
		user_id:{
			type:Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey:true
		},
		username:Sequelize.STRING
	},{
		tableName:'user'
	});

	return models.User=User;
}
