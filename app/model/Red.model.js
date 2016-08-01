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
					return '专属红包雨';
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
              User.findById(userId).then(function(user){
                if(user==null){
                  reject(new Error("用户不存在"))
                }else{
                  if(source==1 && (user.ref!=null)){
                    Red.dispatchRedByType(1,red.redText,user.ref)
                  }
                  resolve(red.update({
                    ownerId:userId,
                    redStatus:2,
                    receiveTime:new Date(new Date().valueOf()+(8*60*60*1000)),
                    source:source
                  }));
                }

              })
						}
					});
				});
			},
			/*
				分发一个未使用红包
			 */
			dispatchRed:function(poolId,userId){
				return new Promise(function(resolve,reject){
          Promise.all([
            Red.count({
              where:{
                poolId:poolId,
                ownerId:userId,
                redStatus:2,
                receiveTime:{
                  $gte: new Date(new Date().valueOf()+(7*60*60*1000))
                }
              }
            }),
            Red.find({
              where:{
                poolId:poolId,
                $or:[{
                  $and:{
                    redStatus:1,
                    ownerId:userId
                  }
                },{
                  redStatus:0,
                }]
              }
            })
          ]).spread(function(count,red){
            if(count>0){
              reject(new Error("本场活动您已领取下场再来"));
            }
            if(red==null){
              reject(new Error("红包已发完下期再来"));
            }
            resolve(red.update({
              redStatus:1,
              ownerId:userId
            }));
          })
				});
			},
      dispatchRedUsed:function(poolId,userId){
        daily=new Date()
        daily.setHours(0)
        daily.setMinutes(0)
        dailyAgo=new Date(daily);
        return new Promise(function(resolve,reject){
          Promise.all([
            Red.count({
              where:{
                poolId:poolId,
                ownerId:userId,
                redStatus:2,
                receiveTime:{
                  $gte: dailyAgo
                }
              }
            }),
            Red.find({
              where:{
                poolId:poolId,
                $or:[{
                  $and:{
                    redStatus:1,
                    ownerId:userId
                  }
                },{
                  redStatus:0,
                }]
              }
            })
          ]).spread(function(count,red){
            if(count>0){
                reject(new Error("你已获取红包"));
            }
            resolve(red.update({
              redStatus:2,
              receiveTime:new Date(new Date().valueOf()+(8*60*60*1000)),
              ownerId:userId
            }));
          })
				});
      },
			/**
			 * 好友送好包
			 * @param  {[type]} poolId  [description]
			 * @param  {[type]} redType [description]
			 * @param  {[type]} userId  [description]
			 * @return {[type]}         [description]
			 */
			dispatchRedByType:function(poolId,redText,wxid){
				return new Promise(function(resolve,reject){
					Red.find({
						where:{
							redStatus:0,
							poolId:poolId,
							redText:redText
						}
					}).then(function(red){
						if(red ==null){
							reject(new Error("红包不存在"));
						}else{
              User.find({
                where:{
                  wxid:wxid
                }
              }).then(function(user){
                if(user==null)
                  reject(new Error("用户不存在"))
                else
                  resolve(red.update({
                    ownerId:user.id,
                    redStatus:2,
                    receiveTime:new Date(new Date().valueOf()+(8*60*60*1000)),
                    source:3
                  }));
              })
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
        var hourAgo=new Date(new Date().valueOf()+(7*60*60*1000));
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
      },
      redAnswerByDaily:function(userId){
        daily=new Date()
        daily.setHours(0)
        daily.setMinutes(0)
        var dailyAgo=new Date(daily);
        return Red.count({
          where:{
            ownerId:userId,
            receiveTime:{
              $gte:dailyAgo
            },
            redStatus:2
          }
        })
      }

		}
	});

	return models.Red=Red;
}
