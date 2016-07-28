var Sequelize = require('sequelize');
Promise=Sequelize.Promise

module.exports = function(sequelize,models){
	var awardsTypes=[{
		//购车抵价券10
		awardsType:'生态盆栽',
		rate:0.125
	},{
		awardsType:'雨伞',
		rate:0.1
	},{
		awardsType:'丝巾',
		rate:0.02
	},{
		awardsType:'谢谢参与',
		rate:0.74
	}];
	/*
	var awardsTypes=[{
		//购车抵价券10
		awardsType:'288元抵价券',
		rate:0.25
	},{
		awardsType:'388元抵价券',
		rate:0.25
	},{
		awardsType:'488元抵价券',
		rate:0.25
	},{
		awardsType:'588元抵价券',
		rate:0.1
	},{
		awardsType:'688元抵价券',
		rate:0.08
	},{
		awardsType:'788元抵价券',
		rate:0.05
	},{
		//购车抵价券10
		awardsType:'888元抵价券',
		rate:0.02
	}];
	*/

	var AwardsPool = sequelize.define('AwardsPool',{
		id:{
			type:Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey:true
		},
		poolName:Sequelize.STRING,
		// 活动类型
		poolType:Sequelize.INTEGER,
		//总数
		poolTotal:Sequelize.INTEGER,
		//0 未开始 1 已开始 3 已结束
		poolStatus:Sequelize.INTEGER,
		startDate:Sequelize.DATE,
		endDate:Sequelize.DATE,
		// 6s 1
	},{
		tableName:'awards_pool',
    charset:'utf8',
		classMethods:{
				haveAward:function(date){
					return AwardsPool.find({
							where:{
								$or:[{
									startDate:{
										$lte: date
									},
									endDate:{
										$gte: date
									}
								},{
									startDate:{
										$gte: date,
									},
								}],
								poolType:2
							},
							order:[['startDate', 'ASC']]
					});
				}
		},
		instanceMethods:{
			initPools:function(){
				var reds=[];
				var self=this;
				var Red=models.Red;

				// 创建数据并打乱处理
				awardsTypes.forEach(function(award){
					awardsNumber=award.number||Math.ceil(award.rate*self.poolTotal);
					for(i=0,len=awardsNumber;i<len;i++){
						reds.push({redText:award.awardsType,randomValue:Math.random()*100});
					}
				});

				// 随机数排序
				reds=reds.sort(function(a,b){return a.randomValue-b.randomValue})
				//console.log(reds.length);
				reds.forEach(function(red){
					Red.create({
						poolId:1,
						redText:red.redText,
						redStatus:0,
					});
				});

			}
		}
	});

	return models.AwardsPool=AwardsPool;
}
