
express = require 'express'
OAuth = require 'wechat-oauth'
models= require('../../connection/').models
router=express.Router()
Sequelize = require('sequelize')
Promise=Sequelize.Promise
#code=ooDTkjruEx-kDTiH5lLHRp4-DZWs

config = {
  token: 'qd8nj2v1',
  appid: 'wx35230dedc8c4a3fe',
  encodingAESKey: 'v8mZwZ6xwgwHPyie5JoIZNurUiXzNANqAdy4dnXQ4tn',
  appsecret:'afa5a9125864206d9b0d77bc5d207048'
}
client = new OAuth config.appid,config.appsecret
router.use '*.*',(req,res,next)->
  res.addAttr "ctx",""
  ref = req.query.ref || ''
  if req.session.user
    next()
  else
    if req.query.ref is null
      res.redirect("/wechat/apply?ref="+req.query.ref)
    else
      res.redirect("/wechat/apply")

router.use '/oauth',(req,res,next)->

    redirectUrl ='/wechat/apply'
  #  status = req.param 'status'
  #  url = client.getAuthorizeURL(redirectUrl,status,'snsapi_userinfo')
    res.redirect(redirectUrl)
    return

router.all "/index.html",(req,res,next)->
  Red = models.Red
  userId=req.session.uid
  user=req.session.user
  Red.redAnswered(userId).then (count)->
	  res.render "mobile/views/index",{user:user}
  	return

router.all "/gradredpacket.html",(req,res,next)->
  userId=req.session.uid
  User=models.User
  Red=models.Red
  Promise.all([User.findById(userId),Red.redAnswered(userId)])
  .spread (user,count)->
    if count>0
      res.redirect("/wechat/choice.html")
    else
  	  res.render "mobile/views/gradredpacket",{user:user}
    	return

router.all "/redrain.html",(req,res,next)->
  current=new Date()
  AwardsPool=models.AwardsPool
  Red=models.Red
  userId=req.session.uid
  Promise.all([AwardsPool.haveAward(current),Red.countUserByTime(userId,new Date())]).spread (award,count)->
    if award.startDate.valueOf()-current.valueOf()-8*60*60*1000>=0
      	res.render("mobile/views/redRain",{isStart:false,cooldown:award.startDate.valueOf()})
    else
      if count>0
        res.render("mobile/views/redRain",{isStart:false,cooldown:award.endDate.valueOf(),isJoin:true})
      else
      	res.render("mobile/views/redRain",{isStart:true,cooldown:award.endDate.valueOf()})
    return

router.all "/active.html",(req,res,next)->
	res.render "mobile/views/activeRole",{user:"xdixon"}
	return

router.all "/apply",(req,res,next)->
    Store=models.Store
    User=models.User
    ref=req.query.ref
    Promise.all([Store.findAll()]).spread (lists)->
      res.render "mobile/views/apply",{stores:lists,ref:ref}



router.all "/choice.html",(req,res,next)->
    Quest=models.Quest
    Red=models.Red
    userId=req.session.uid
    user=req.session.user
    Promise.all([Quest.randomQuest(),Red.redAnswered(userId)]).spread (quest,count)->
      res.render "mobile/views/choice",{quest:quest,count:count,user:user}
      return

router.all "/mygift.html",(req,res,next)->
  Red = models.Red
  User= models.User
  userId=req.session.uid
  Promise.all([User.findById(userId),Red.redsByUser(userId)]).spread (user,reds)->
  	res.render "mobile/views/mygift",{reds:reds,user:user}
  	return

router.all "/openpackage.do",(req,res,next)->
  Red = models.Red
  Red.dispatchRed(1).then (red)->
    res.json {exception:false,msg:'抽奖成功',giftNum:red.redId,giftType:red.redText}
  	return

router.all "/openRainpackage.do",(req,res,next)->
  Red = models.Red
  Red.dispatchRed(2).then (red)->
    res.json {exception:false,msg:'抽奖成功',giftNum:red.redId,giftType:red.redText}
  	return

router.all "/answer_result.do",(req,res,next)->
    Quest=models.Quest
    Red=models.Red
    userId=req.session.uid
    id= req.query.id
    questAns=req.query.questans
    Promise.all([Quest.findById(id),Red.redAnswered(userId)]).spread (quest,count)->
      if quest.questAns == questAns
        res.json({exception:false,msg: '恭喜你，回答正确',ranswer:''})
      else
        res.json({exception:true,msg:quest.questAns,ranswer:quest.questAns})

router.all "/togetredpkg.do",(req,res,next)->
  Red=models.Red
  redid=req.query.redid
  userId=req.session.uid
  Red.useRed(redid,userId,1)
  .then (red)->
      res.json({exception:false,msg:'抽奖成功'})
      return
  .catch (error)->
      res.json({exception:true,msg:error.toString()})
    	return

router.all "/getpkg.do",(req,res,next)->
  Red=models.Red
  redid=req.query.redid
  userId=req.session.uid
  Red.useRed(redid,userId,2)
  .then (red)->
      res.json({exception:false,msg:'抽奖成功'})
      return
  .catch (error)->
      res.json({exception:true,msg:error.toString()})
    	return

router.all "/signup",(req,res,next) ->
  User=models.User
  username=req.query.username
  mobile=req.query.mobile
  store = req.query.store
  wxid=req.query.wxid
  ref= req.query.ref
  User.signup(wxid,username,mobile,store,ref).then((user)->
    req.session.user=user;
    req.session.uid=user.id
    res.json({exception:false,msg:"报名成功"});)

module.change_code = 1;
module.exports=router
