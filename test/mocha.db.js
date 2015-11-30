
var assert= require('assert'),
	manager= require("../app/manager");
	Sequelize=require('Sequelize');
	Promise=Sequelize.Promise;

var User=manager.models['user'];

var isPromise = function(v) {
  return v !== null && typeof v === 'object' && typeof v.then === 'function';
};
var resolveAsync = function(object, callback, count, options) {
  if (!object || typeof object !== 'object') {
    return callback(null, object);
  }

  if (count === 0) {
    return callback(new Error('Max promises (' + options.maxPromise + ') reached'));
  }

  if (isPromise(object)) {
    return object.then(function(result) {

      if (isPromise(result)) {
        resolveAsync(result, callback, count - 1, options);
      } else {
        callback(result);
      }
    }, function(err) {
      callback(err);
    });
  }
}

describe('User 测试', function () {
    it('测试数据库连接',function(done){
		this.timeout(5000);
		User.sync({force: true}).then(function () {
		  // Table created
		  return User.create({
			user_id:"1",
			username: 'Hancock'
		  }).then(function(){
			done();
		  });
		});
    });

	it('获取User List',function(done){
		this.timeout(5000);
		User.findAll().then(function(lists){
			assert.equal(lists.length,1);
			done();
		});
	});
	it('sefe',function(done){
			this.timeout(5000);
		return Promise.coroutine(function* (done) {
			console.log(done)
			done();
			var list=User.findAll();
			console.log(yield list)
		});
	});
	it('ser',function(done){
		this.timeout(5000);
		var data;
		var list=User.findAll();
		done();
		/*
		var a=resolveAsync(list,function(ls,cb){
			result=JSON.stringify(ls);
			done();
			return result;
		},10);
		*/
	   /*
	   Promise.props({
			list: list,
		}).then(function(result) {
			console.log(JSON.stringify(result.list));
			done();
		});
		*/
	});

});
