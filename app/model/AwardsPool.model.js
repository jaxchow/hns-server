var Sequelize = require('sequelize');
Promise=Sequelize.Promise

module.exports = function(sequelize,models){
	var awardsTypes=[{
		awardsType:"iphone6s",
		number:'0'
	},{
		awardsType:"公仔",
		number:'4'
	},{
		awardsType:"车团长限定头枕、腰枕",
		number:'2'
	},{
		awardsType:"丝巾",
		number:'6'
	},{
		awardsType:"坚果礼包",
		number:'30'
	},{
		//购车抵价券10
		awardsType:'购车抵价券10',
		rate:0.5*0.3
	},{
		awardsType:'购车抵价券20',
		rate:0.5*0.3
	},{
		awardsType:'购车抵价券50',
		rate:0.5*0.2
	},{
		awardsType:'购车抵价券100',
		rate:0.5*0.1
	},{
		awardsType:'购车抵价券200',
		rate:0.5*0.07
	},{
		awardsType:'购车抵价券500',
		rate:0.5*0.03
	},{
		//购车抵价券10
		awardsType:'保险抵用券10',
		rate:0.1*0.3
	},{
		awardsType:'保险抵用券20',
		rate:0.1*0.3
	},{
		awardsType:'保险抵用券50',
		rate:0.1*0.2
	},{
		awardsType:'保险抵用券100',
		rate:0.1*0.1
	},{
		awardsType:'保险抵用券200',
		rate:0.1*0.07
	},{
		awardsType:'保险抵用券500',
		rate:0.1*0.03
	},{
		//购车抵价券10
		awardsType:'售后抵用券10',
		rate:0.1*0.3
	},{
		awardsType:'售后抵用券20',
		rate:0.1*0.3
	},{
		awardsType:'售后抵用券50',
		rate:0.1*0.2
	},{
		awardsType:'售后抵用券100',
		rate:0.1*0.1
	},{
		awardsType:'售后抵用券200',
		rate:0.1*0.07
	},{
		awardsType:'售后抵用券500',
		rate:0.1*0.03
	},{
		awardsType:'谢谢参与',
		rate:0.3
	}];

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
						poolId:self.id,
						redText:red.redText,
						redStatus:0,
					});
				});

			}
		}
	});

	return models.AwardsPool=AwardsPool;
}
