var Sequelize = require('sequelize');
module.exports = function(sequelize,models){
	var AwardsPool = sequelize.define('AwardsPool',{
		pool_id:{
			type:Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey:true
		},
		poolName:Sequelize.STRING,
		poolType:Sequelize.INTEGER,
		poolTotal:Sequelize.INTEGER,
		awardsType1:Sequelize.INTEGER,
		awardsType2:Sequelize.INTEGER,
		awardsType3:Sequelize.INTEGER,
		awardsType4:Sequelize.INTEGER,
		awardsType5:Sequelize.INTEGER,
		awardsType6:Sequelize.INTEGER,
		awardsType7:Sequelize.INTEGER,
		awardsType11:Sequelize.INTEGER,
		awardsType12:Sequelize.INTEGER,
		awardsType13:Sequelize.INTEGER,
		awardsType14:Sequelize.INTEGER,
		awardsType15:Sequelize.INTEGER,
		awardsType16:Sequelize.INTEGER,
		awardsType21:Sequelize.INTEGER,
		awardsType22:Sequelize.INTEGER,
		awardsType23:Sequelize.INTEGER,
		awardsType24:Sequelize.INTEGER,
		awardsType25:Sequelize.INTEGER,
		awardsType26:Sequelize.INTEGER,
		awardsType31:Sequelize.INTEGER,
		awardsType32:Sequelize.INTEGER,
		awardsType33:Sequelize.INTEGER,
		awardsType34:Sequelize.INTEGER,
		awardsType35:Sequelize.INTEGER,
		awardsType36:Sequelize.INTEGER
	},{
		tableName:'awards_pool',
        charset:'utf8',
		instanceMethods:{
			initPools:function(){
				var pools=[];
				console.log(this.dataValues.awardsType1);
				console.log("init pools");
			}
		}
	});

	return models.AwardsPool=AwardsPool;
}
