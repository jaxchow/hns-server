
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
		this.timeout(2000);
        Quest.findById(1).then(function(quest){
            assert.notEqual(quest.verifyQuest("我是答案3"),true);
            assert.equal(quest.verifyQuest("我是答案2"),true);
            done();
        })
    })

    it('答题验证2:答错',function(done){
		this.timeout(2000);
        Quest.findById(1).then(function(quest){
            assert.equal(quest.verifyQuest("我是答案3"),false);
            done();
        })
    })
});
