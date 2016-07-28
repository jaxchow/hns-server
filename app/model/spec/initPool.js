var models= require('../../connection/').models;

var AwardPool=models.AwardsPool;
AwardPool.create({
  poolName: '答题红包库',
  poolType: 1,
  poolStatus:0,
  poolTotal:2000,
  startDate:new Date(2016,00,13,12,30,00),
  endDate:new Date(2016,00,14,23,30,00)
}).then(function(pool){
  pool.initPools();
});

/*
AwardPool.create({
  poolName: '2016-01-07 测试红包库',
  poolType: 2,
  poolStatus:0,
  poolTotal:1000,
  startDate:new Date(2016,00,12,12,30,00),
  endDate:new Date(2016,00,12,13,30,00)
}).then(function(pool){
  pool.initPools();
});
*/

/*
AwardPool.create({
  poolName: '2016-01-07 测试红包库',
  poolType: 2,
  poolStatus:0,
  poolTotal:0,
  startDate:new Date(2016,00,11,19,00,00),
  endDate:new Date(2016,00,11,20,00,00)
}).then(function(pool){
  pool.initPools();
});
*/
