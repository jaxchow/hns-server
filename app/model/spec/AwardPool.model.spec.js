
var assert= require('assert'),
	models= require('../../connection/').models;

var AwardPool=models.AwardsPool;
AwardPool.create({
		poolName: '答题红包库',
		poolType: 1,
		poolStatus:0,
		poolTotal:1000,
		startDate:new Date(2016,00,07,12,30,00),
		endDate:new Date(2016,00,09,23,30,00)
}).then(function(pool){
	pool.initPools();
});
/*
describe('AwardPool 测试', function () {
    before('测试数据库连接',function(done){
			AwardPool.sync({force: true}).then(function(){
				done();
			});
    });
	it('AwardPool 创建对象',function(done){

		AwardPool.create({
			poolName: '2016-01-07 测试红包库',
			poolType: 2,
			poolStatus:0,
			poolTotal:200,
			startDate:new Date(2016,00,07,12,30,00),
			endDate:new Date(2016,00,07,12,30,00)
		}).then(function(pool){
			pool.initPools();
			done();
		});

	})
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
*/
