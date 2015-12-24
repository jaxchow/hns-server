
var assert= require('assert'),
	models= require('../../connection/').models;

var AwardPool=models.AwardsPool;
describe('AwardPool 测试', function () {
    before('测试数据库连接',function(done){
		AwardPool.sync({force: true}).then(function(){
			done()
		})
    });
	it('AwardPool 创建对象',function(done){
		AwardPool.create({
			poolName: '2014-12-12 10点红包雨',
		    poolType: 1,
		    poolTotal:123,
			awardsType1:10,
			awardsType2:10,
			awardsType3:10,
			awardsType4:10,
			awardsType5:10,
			awardsType6:10,
			awardsType7:10,
			awardsType11:10,
			awardsType12:10,
			awardsType13:10,
			awardsType14:10,
			awardsType15:10,
			awardsType16:10,
			awardsType21:10,
			awardsType22:10,
			awardsType23:10,
			awardsType24:10,
			awardsType25:10,
			awardsType26:10,
			awardsType31:10,
			awardsType32:10,
			awardsType32:10,
			awardsType34:10,
			awardsType35:10,
			awardsType36:10
		}).then(function(pool){
			pool.initPools()
			done();
		});
	})

	it('获取AwardsPool List',function(done){
		this.timeout(5000);
		AwardPool.findAll().then(function(lists){
			assert.equal(lists.length,1);
			done();
		});
	});
	it('initPools',function(done){
		AwardPool.findById(1).then(function(award){
			award.initPools();
			done();
		});
	})
});
