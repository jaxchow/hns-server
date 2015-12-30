
var assert= require('assert'),
	models= require('../../connection/').models;

var Store=models.Store;
describe('Store 测试', function () {
    before('连接数据库，创建表结构',function(done){
		this.timeout(2000);
		Store.sync({force: true}).then(function(){
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
	it('Store 创建对象',function(done){
		Store.create({
            storename:"杭州元通瑞达",
			username: '0571hzytrd',
            password:'hzytrd@0571',
			city:"杭州",
            idx:1
		}).then(function(user){
			done();
		});
	});

	it('获取 Store List',function(done){
		Store.findAll().then(function(lists){
			assert.equal(lists.length,1);
			done();
		});
	});

	it('Store验证身份通过',function(done){
		Store.verifyPassport('0571hzytrd','hzytrd@0571').then(function(result){
			assert.equal(result,true);
			done();
		});
	});

	it('Store验证身份不通过',function(done){
		Store.verifyPassport('0571hzytrd','hz111ytrd@0571').then(function(result){
			assert.equal(result,false);
			done();
		});
	});

	it('Store验证身份，用户不存在',function(done){
		Store.verifyPassport('0571h11zytrd','hz111ytrd').then(function(result){

		}).catch(function(error){
			assert.throws(function(){throw error;}, /用户不存在/);
			done();
		});
	});
});
