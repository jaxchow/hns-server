
var assert= require('assert'),
	models= require('../../connection/').models;

var Quest=models.Quest;
describe('Quest 测试', function () {
    before('连接数据库，创建表结构',function(done){
		this.timeout(2000);
		Quest.sync({force: true}).then(function(){
			done()
		})
    });
	/*
    after('删除Quest表数据',function(done){
        Quest.drop({force:true}).then(function(){
            done();
        })
    })
	*/
	it('Quest 创建对象',function(done){
		Quest.create({
            questText:'杭州元通瑞达',
            questOpt1:'我是答案1',
            questOpt2:'我是答案2',
            questOpt3:'我是答案3',
            questAns :'我是答案2',
		}).then(function(Quest){
			done();
		});
	})

	it('获取 Quest List',function(done){
		this.timeout(5000);
		Quest.findAll().then(function(lists){
			assert.equal(lists.length,1);
			done();
		});
	});

    it('答题验证1：答对',function(done){
        Quest.verifyQuest(1,'我是答案2').then(function(result){
            assert.equal(result,true);
            done();
        })
    })

    it('答题验证2:答错',function(done){
        Quest.verifyQuest(1,'我是答案3').then(function(result){
            assert.equal(result,false);
            done();
        })
    });

	it('答题，找不到问题',function(done){
		Quest.verifyQuest(9,'我是答案3').then(function(result){
		}).catch(function (error) {
			assert.throws(function() {throw error;}, /找不到题库问题/);
			done();
		});
	})

	it('随机获取问题',function(done){
		Quest.randomQuest().then(function(quest){
			done();
		})
	})
});
