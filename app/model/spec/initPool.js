var models= require('../../connection/').models;

var AwardPool=models.AwardsPool;
AwardPool.create({
  poolName: '答题红包库',
  poolType: 1,
  poolStatus:0,
  poolTotal:100,
  startDate:new Date(2016,00,07,12,30,00),
  endDate:new Date(2016,00,09,23,30,00)
}).then(function(pool){
  pool.initPools();
});

AwardPool.create({
  poolName: '2016-01-07 测试红包库',
  poolType: 2,
  poolStatus:0,
  poolTotal:100,
  startDate:new Date(2016,00,07,12,30,00),
  endDate:new Date(2016,00,07,12,30,00)
}).then(function(pool){
  pool.initPools();
});

AwardPool.create({
  poolName: '2016-01-07 测试红包库',
  poolType: 2,
  poolStatus:0,
  poolTotal:100,
  startDate:new Date(2016,00,07,19,00,00),
  endDate:new Date(2016,00,07,20,00,00)
}).then(function(pool){
  pool.initPools();
});
