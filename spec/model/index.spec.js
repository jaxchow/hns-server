var assert = require('assert');
var models= require('../../app/model/').models;
var User=models.User

describe('connect database ',function(){
	before('user create table sync',function(done){
			User.sync({force:true}).then(function(){
				done();
			});
	});
	it('User insert data',function(done){
		User.create({
			"username":"jaxchow"
		}).then(function(){
			done();
		});
	});
	it('user query All',function(done){
		User.findAll().then(function(list){
			console.log(JSON.stringify(list));
			done();
		})
	})
	it('User find username is jaxchow',function(done){
		User.find({
			where:{
				username:'jaxchow'
			}
		}).then(function(user){
			assert.equal('jaxchow',user.getDataValue('username'))
			done();
		})
	});
	it('User delete id 1 data',function(done){
		User.findById(1).then(function(user){
			user.destroy()
			done();
		})
	})
});
