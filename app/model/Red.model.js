var Sequelize = require('sequelize');
module.exports = function(sequelize,models){
	var Red = sequelize.define('Red',{
		redId:{
			type:Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey:true
		},
		poolId:Sequelize.INTEGER,
		redText:Sequelize.STRING,
		redType:Sequelize.INTEGER,
		redStatus:Sequelize.INTEGER,
		ownerId:Sequelize.INTEGER,
		// 1 拆红包 2 红包雨 3 好友拆红包
		source:Sequelize.INTEGER,
		receiveTime:Sequelize.DATE
	},{
		tableName:'red',
        charset:'utf8',
		instanceMethods:{

		},
		classMethods:{
			/*
				获取池里红包
			 */
			listRedByPool:function(poolId){
				return this.findAll({ where:{
					poolId:poolId
				}});
			},
			/*
				使用红包
			 */
			useRed:function(redId,userId){
				return new Promise(function(resolve,reject){
					Red.findById(redId).then(function(red){
						if(red ==null){
							reject(new Error("红包不存在"));
						}else if(red.redStatus!==2){
							reject(new Error("红包状态不正确"));
						}else{
							resolve(red.update({
								ownerId:userId,
								redStatus:2,
								receiveTime:new Date(),
								source:2
							}));
						}
					});
				})
			},
			/*
				分发一个未使用红包
			 */
			dispatchRed:function(poolId){
				return new Promise(function(resolve,reject){
					Red.find({
						where:{
							redStatus:0,
							poolId:poolId,
						}
					}).then(function(red){
						if(red==null){
							reject(new Error("红包已发完下期再来"));
						}
						resolve(red.update({
							redStatus:1
						}));
					})
				})
			},
			dispatchRedByType:function(poolId,redType,userId){
				return new Promise(function(resolve,reject){
					Red.find({
						where:{
							redStatus:0,
							poolId:poolId,
							redType:redType
						}
					}).then(function(red){
						if(red ==null){
							reject(new Error("红包不存在"));
						}else{
							resolve(red.update({
								ownerId:userId,
								redStatus:2,
								receiveTime:new Date(),
								source:3
							}));
						}
					})
				})
			}

		}
	});

	return models.Red=Red;
}
