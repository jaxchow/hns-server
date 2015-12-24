var Sequelize = require('sequelize');
module.exports = function(sequelize,models){
	var Quest = sequelize.define('Quest',{
		quest_id:{
			type:Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey:true
		},
		questText:Sequelize.STRING,
		questOpt1:Sequelize.STRING,
		questOpt2:Sequelize.STRING,
		questOpt3:Sequelize.STRING,
        questAns:Sequelize.STRING

	},{
		tableName:'quest',
        charset:'utf8',
		instanceMethods: {
		  /*
		  	验证问题是否正确
		   */
	      verifyQuest: function(questAns) {
			return this.questAns===questAns
		  },
	    }
	});

	return models.Quest=Quest;
}
