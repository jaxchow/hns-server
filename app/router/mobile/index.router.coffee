
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

router.all "/signup.do",(req,res,next) ->
	username=req.query.username;
	mobile=req.query.mobile;
	store = req.query.store;
	wxid=req.wxid;
	User.signup(wxid,username,mobile,store).then((user)=>res.json({exception:false,msg:"报名成功"});
	).catch((error)=> res.json({exception:true,msg:'重复报名'}) )

module.change_code = 1;
module.exports=router
