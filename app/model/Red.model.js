var Sequelize = require('sequelize');
Promise=Sequelize.Promise


module.exports = function(sequelize,models){
  var User;
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
		source:{
			type:Sequelize.INTEGER,
			get : function()  {
	      var source = this.getDataValue('source');
				if(source===1){
					return '拆红包';
				}else if(source===2){
					return '红包雨';
				}else if(source===3){
					return '好友拆红包';
				}
	    }
		},
		receiveTime:Sequelize.DATE
	},{
		tableName:'red',
    charset:'utf8',
		classMethods:{
			associate:function(models){
				User=models.User;
				Red.belongsTo(models.User,{foreignKey:'ownerId'});
			},
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
			useRed:function(redId,userId,source){
				return new Promise(function(resolve,reject){
					Red.findById(redId).then(function(red){
						if(red ==null){
							reject(new Error("红包不存在"));
						}else if(red.redStatus!==1){
							reject(new Error("红包状态不正确"));
						}else{
							resolve(red.update({
								ownerId:userId,
								redStatus:2,
								receiveTime:new Date(),
								source:source
							}));
						}
					});
				});
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
					});
				});
			},
			/**
			 * 好友送好包
			 * @param  {[type]} poolId  [description]
			 * @param  {[type]} redType [description]
			 * @param  {[type]} userId  [description]
			 * @return {[type]}         [description]
			 */
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
					});
				});
			},
			redsByUser:function(userId){
				return Red.findAll({
					where:{
						ownerId:userId,
						redStatus:2
					},
					include:[User]
				});
			},
      countUserByTime:function(userId,date){
        var hourAgo=new Date(date-60*60*1000);
        return Red.count({
          where:{
            ownerId:userId,
            receiveTime:{
              $gte:hourAgo
            },
            redStatus:2,
            source:2
          }
        })
      },
      /**
       * 已参于答题
       * @param  {[type]} userId [description]
       * @return {[type]}        [description]
       */
      redAnswered:function(userId){
        return Red.count({
          where:{
            ownerId:userId,
            source:1
          }
        })
      }

		}
	});

	return models.Red=Red;
}
