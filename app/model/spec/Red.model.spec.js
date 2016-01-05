
var assert= require('assert'),
	models= require('../../connection/').models;

var Red=models.Red;
describe('Red 红包 测试', function () {
    before('连接数据库，创建表结构,初始化数据10条',function(done){
			done();
			/*
		Red.sync({force: true}).then(function(){
            for(var i=0;i<10;i++){
                Red.build({
                    poolId:1,
                    redText:'50元折价卷',
                    redType:1,
                    redStatus:0,
        		}).save();
            }
			done();
			});
			*/
    });
	/*
    after('删除Red表数据',function(done){
        Red.drop({force:true}).then(function(){
            done();
        })
    })
	*/
	/*
	it('Red 创建红包对象',function(done){
		Red.create({
            poolId:2,
            redText:'150元折价卷',
            redType:1,
            redStatus:0,
		}).then(function(Red){
			done();
		});
	})

	it('获取 Red 红包 List',function(done){
		Red.findAll().then(function(lists){
			assert.equal(lists.length,11);
			done();
		});
	});

    it('获取指定红包池全部数据',function(done){
        Red.listRedByPool(2).then(function(lists){
            assert.equal(lists.length,1);
            done();
        })
    })

    it('分配一个未使用红包',function(done){
        Red.dispatchRed(2).then(function(red){
            assert.equal(red.redStatus==1,true);
            assert.equal(red.poolId==2,true);
            done();
        });
    });

    it('使用一个红包',function(done){
        Red.useRed(2,1).then(function(r){
            done();
        }).catch(function (error) {
			assert.throws(function() {throw error;}, /红包状态不正确/);
            done();
        });
    });
    it('使用一个已使用红包',function(done){
		Red.useRed(2,1).then(function(r){
            done();
        }).catch(function (error) {
			assert.throws(function() {throw error;}, /红包状态不正确/);
            done();
        });
    });

	it('使用一个不存在红包',function(done){
		Red.useRed(100,1).then(function(r){
            done();
        }).catch(function (error) {
			assert.throws(function() {throw error;}, /红包不存在/);
            done();
        });
    })

	it('好友送红包指定类型',function(done){
		Red.dispatchRedByType(1,1,2).then(function(red){
            assert.equal(red.poolId==1,true);
			assert.equal(red.redStatus==2,true);
            assert.equal(red.source==3,true);
			done();
		})
	});
	it('我的红包列表',function(done){
		Red.redsByUser(2).then(function(reds){
			assert.equal(reds.length,1);
			done();
		});
	});
	*/
	it('获取一个已领取红包',function(done){
		Red.find({
			where:{
				redId:1
			},
			include:[models.User]
		}).then(function(red){
			done()
		});
	});
});
