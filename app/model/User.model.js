var Sequelize = require('sequelize');
module.exports = function(sequelize,models){
	var User = sequelize.define('User',{
		id:{
			type:Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey:true
		},
		username:Sequelize.STRING,
		wxname:Sequelize.STRING,
		wxid:Sequelize.STRING,
		mobile:Sequelize.STRING,
		store:Sequelize.STRING,
	},{
		tableName:'user',
		// 一定要写中文不会出错
		charset:'utf8',
		classMethods:{
			signup:function(wxid,wxname,username,mobile,store){
				var self=this;
				return new Promise(function(resolve,reject){
					User.count({where : {mobile : mobile}}).then(function(i){
	   					if(i<0){
	   						 reject(function(){throw Error("用户已重复报名")});
	   					}
	   					resolve(
							User.create({wxid:wxid,
		   						username:username,
		   						wxname:wxname,
		   						mobile:mobile,
		   						store:store
							})
						)
					})
				})
			}
		}
	});

	return models.User=User;
}