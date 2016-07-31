
express = require 'express'
OAuth = require 'wechat-oauth'
crypto = require 'crypto'
models= require('../../connection/').models
router=express.Router()
Sequelize = require('sequelize')
Promise=Sequelize.Promise
#code=ooDTkjruEx-kDTiH5lLHRp4-DZWs

config = {
  token: 'ZY0bxbcX',
  appid: 'wxb2fb9812ea274272',
  encodingAESKey: 'JPl7pxlj5q1Fy8p5ELblA9UNo12Zxo9S2PC3gesbgo0',
  appsecret:'ea705e28b780ca065e1f1c94a70a750b'
}
client = new OAuth config.appid,config.appsecret
router.use '*.*',(req,res,next)->
  res.addAttr "ctx",""
  ref = req.query.ref || ''
  next()


router.use '/oauth',(req,res,next)->

    redirectUrl ='http://www.ezoom.cn/wechat/apply'
    status = req.param 'status'
    url = client.getAuthorizeURL(redirectUrl,status,'snsapi_userinfo')
    res.redirect(url)
    return

router.use '/api',(req,res,next)->
	signature = req.query.signature
	timestamp = req.query.timestamp
	nonce = req.query.nonce
	echostr = req.query.echostr
	array = new Array(config.token,timestamp,nonce)
	array.sort()
	str = array.toString().replace(/,/g,"")
	sha1Code = crypto.createHash("sha1")
	code = sha1Code.update(str,'utf-8').digest("hex")
	if code==signature
	  res.send(echostr)
	else
	  res.send("error")
	return

router.all "/index.html",(req,res,next)->
  Red = models.Red
  res.render "mobile/views/index"

router.all "/gradredpacket.html",(req,res,next)->
  #userId=req.session.uid
  userId=81
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
  current=new Date(new Date().valueOf()+(8*60*60*1000))
  AwardsPool=models.AwardsPool
  Red=models.Red
  userId=req.session.uid
  Promise.all([AwardsPool.haveAward(current),Red.countUserByTime(userId,new Date())]).spread (award,count)->
    if award.startDate.valueOf()-current.valueOf()>=0
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
	ref=req.query.ref
	#if req.session.user
	if req.session
	  res.redirect("/wechat/index.html")
	else
	  res.render "mobile/views/apply",{ref:ref}
	return



router.all "/choice.html",(req,res,next)->
    Quest=models.Quest
    Red=models.Red
	#userId=req.session.uid
    userId=81
	#user=req.session.user
    user=null
    Promise.all([Quest.randomQuest(),Red.redAnswerByDaily(userId)]).spread (quest,count)->
      res.render "mobile/views/choice",{quest:quest,count:count,user:user}
      return

router.all "/mygift.html",(req,res,next)->
	Red = models.Red
	User= models.User
#  userId=req.session.uid
	userId=81
	Promise.all([User.findById(userId),Red.redsByUser(userId)]).spread (user,reds)->
		res.render "mobile/views/mygift",{reds:reds,user:user}
		return

router.all "/openpackage.do",(req,res,next)->
  Red = models.Red
  #userId=req.session.uid
  userId=81
  Red.dispatchRed(1,userId).then (red)->
    res.json {exception:false,msg:'抽奖成功',giftNum:red.redId,giftType:red.redText}
  .catch (error)->
    res.json {exception:true,msg:error.toString()}
  	return

router.all "/openRainpackage.do",(req,res,next)->
  Red = models.Red
#userId=req.session.uid
  userId=81
  Red.dispatchRed(2,userId).then (red)->
    res.json {exception:false,msg:'抽奖成功',giftNum:red.redId,giftType:red.redText}
  .catch (error)->
    res.json {exception:true,msg:error.toString()}
    return

router.all "/answer_result.do",(req,res,next)->
    Quest=models.Quest
    Red=models.Red
	#userId=req.session.uid
    userId=81
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
  #userId=req.session.uid
  userId=81
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
  User.signup(wxid,username,mobile,store,ref).then (user)->
	#req.session.user=user
	#req.session.uid=user.id
    res.json({exception:false,msg:"报名成功"})
  .catch (error)->
    res.json({exception:true,msg:error.toString()})
  	return


module.change_code = 1;
module.exports=router
