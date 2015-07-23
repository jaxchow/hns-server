###
	visit http://localhost:3000/www/
###

express = require 'express'
router=express.Router();
models= require('../../model/').models
User= express.Router();

router.use (req,res,next)->
	console.log('/manager')
	next();
	return
router.use "/usermng",require('./user.router');

module.change_code = 1;
module.exports=router
