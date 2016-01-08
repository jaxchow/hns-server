var Sequelize = require('sequelize');
Promise=Sequelize.Promise

module.exports = function(sequelize,models){
	var Quest = sequelize.define('Quest',{
		id:{
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
	  	classMethods:{
			verifyQuest: function(questId,questAns) {
				return new Promise(function(resolve,reject){
					Quest.findById(questId).then(function(quest){
						if(quest==null){
							reject(new Error("找不到题库问题"));
						}else{
							resolve(quest.questAns===questAns);
						}
			    })
				})
			},
			randomQuest: function(){
			  return new Promise(function(resolve,reject){
 					 var randomId;
 					 Quest.count().then(function(total){
						 console.log(total);
 						 randomId=Math.ceil(Math.random()*total);
 						 Quest.findById(randomId).then(function(quest){
							 if(quest==null){
								 reject(new Error("找不到题库问题"));
							 }else{
	 							resolve(quest);
							 }
 						 })
 					 })
 				 })
		 	}
	    }
	});

	return models.Quest=Quest;
}
