###
	web context router
###
express = require 'express'
OAuth=require 'wechat-oauth'

router = express.Router()
www =express.Router()

config = {
  token: 'qd8nj2v1',
  appid: 'wx35230dedc8c4a3fe',
  encodingAESKey: 'v8mZwZ6xwgwHPyie5JoIZNurUiXzNANqAdy4dnXQ4tn'
};

router.use "/",(req, res, next) ->
  next()
  return

router.use "/www",require('./www/index.router')
router.use "/manager",require('./manager/index.router')
router.use "/demo",require('./demo/index.router')
router.use "/wechat",require('./mobile/index.router')


module.change_code = 1;
module.exports=router
