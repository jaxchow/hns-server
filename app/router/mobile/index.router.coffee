
express = require 'express'
models= require('../../connection/').models;
User=models.User;
router=express.Router();

router.use (req,res,next)->
	res.addAttr "ctx",""
	next();
	return

router.all "/index.html",(req,res,next)->
	res.render "mobile/views/index",{user:"xdixon"}
	return

router.all "/gradredpacket.html",(req,res,next)->
	res.render "mobile/views/gradredpacket",{user:"xdixon"}
	return

router.all "/redrain.html",(req,res,next)->
	res.render "mobile/views/redRain",{user:"xdixon"}
	return

router.all "/active.html",(req,res,next)->
	res.render "mobile/views/activeRole",{user:"xdixon"}
	return

router.all "/apply.html",(req,res,next)->
	res.render "mobile/views/apply",{user:"xdixon"}
	return

router.all "/choice.html",(req,res,next)->
	res.render "mobile/views/choice",{user:"xdixon"}
	return

router.all "/mygift.html",(req,res,next)->
	res.render "mobile/views/mygift",{user:"xdixon"}
	return

router.all "/openpackage.do",(req,res,next)->
	result ={
		exception:false,
		msg:'抽奖成功',
		giftNum:'200元',
		giftType:'购物抵价券'
	}
	res.json(result)
	return

router.all "/answerResult.do",(req,res,next)->
	result ={
		exception:false,
		msg:'',
		state:false,
		ranswer:'aaaaaa'
	}
	res.json(result)
	return

router.all "/togetredpkg.do",(req,res,next)->
	result ={
		exception:false,
		msg:'抽奖成功'
	}
	res.json(result)
	return

router.all "/signup.do",(req,res,next) ->
	username=req.query.username;
	mobile=req.query.mobile;
	store = req.query.store;
	wxid=req.wxid;
	User.signup(wxid,username,mobile,store)
		.then((user)=>res.json({exception:false,msg:"报名成功"});)
		.catch((error)=> res.json({exception:true,msg:'重复报名'}) )

module.change_code = 1;
module.exports=router
