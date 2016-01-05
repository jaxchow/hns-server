
var assert= require('assert'),
	models= require('../../connection/').models;

var AwardPool=models.AwardsPool;
describe('AwardPool 测试', function () {
    before('测试数据库连接',function(done){
			AwardPool.sync({force: false}).then(function(){
				done();
			});
    });
		/*
	it('AwardPool 创建对象',function(done){
		AwardPool.create({
			poolName: '2014-12-12 红包雨',
		    poolType: 1,
			poolStatus:0,
		    poolTotal:100,
		}).then(function(pool){
			pool.initPools();
			done();
		});
	})
	*/

	it('获取AwardsPool List',function(done){
		AwardPool.findAll().then(function(lists){
			assert.equal(lists.length,1);
			done();
		});
	});
	it('获取当前活动信息',function(done){
		var now=new Date();
		AwardPool.haveAward(now1).then(function(award){
			done();
		});
	});
});
