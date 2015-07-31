###
	web context router
###
express = require 'express'
router = express.Router();
www =express.Router();

router.use "/",(req, res, next) ->
  next()
  return

router.use "/www",require('./www/index.router')
router.use "/demo",require('./demo/index.router')


module.change_code = 1;
module.exports=router
