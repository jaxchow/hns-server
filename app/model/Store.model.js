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
    idx:Sequelize.INTEGER
	},{
		tableName:'store',
		// 一定要写中文不会出错
		charset:'utf8',
		instanceMethods:{
			verifyPassword:function(pwd){
				return this.password==pwd;
			}
		},
		classMethods:{
			verifyPassport:function(username,password){
				return new Promise(function(resolve,reject){
					Store.find({
						where:{
							username:username
						}
					}).then(function(store){
						if(store==null){
							reject(new Error("门店不存在"));
						}else{
							resolve(store.password==password);
						}
					})
				});
			}
		}

	});

	return models.Store=Store;
}
