
var assert= require('assert'),
	models= require('../../connection/').models;

var User=models.User;
describe('user 测试', function () {
    before('连接数据库，创建表结构',function(done){
		this.timeout(2000);
		User.sync({force: true}).then(function(){
			done()
		})
    });
	/*
    after('删除User表数据',function(done){
        User.drop({force:true}).then(function(){
            done();
        })
    })
	*/
	it('User 创建对象',function(done){
		User.create({
			username: '0571hzytrd',
			wxid:"2erj3oiuwou32",
			wxname:"小号呀",
			mobile:"13900000000",
			store:"宁波店",
		}).then(function(user){
			done();
		});
	})

	it('获取 User List',function(done){
		this.timeout(5000);
		User.findAll().then(function(lists){
			assert.equal(lists.length,1);
			done();
		});
	});

	it('用户报名',function(done){
		User.signup( '0571hzytrd', "2erj3oiuwou32", "小号呀", "13911111111", "宁波店" ).then(function(user){
			done();
		}).catch(function(error){
			assert.throws(function() {
				throw new Error("用户已重复报名");
				done();
			}, Error);
		});
	});
	it('重复用户报名',function(done){
		User.signup( '0571hzytrd', "2erj3oiuwou32", "小号呀", "13900000000", "宁波店"
		).then(function(user){
			done();
		}).catch(function(error){
			assert.throws(function() {
				throw new Error("用户已重复报名");
				done();
			}, Error);
		});
	})
});
