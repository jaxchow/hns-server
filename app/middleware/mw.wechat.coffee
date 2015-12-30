###
    wechat
###
wechat = require 'wechat'
config = {
  token: 'qd8nj2v1',
  appid: 'wx35230dedc8c4a3fe',
  encodingAESKey: 'v8mZwZ6xwgwHPyie5JoIZNurUiXzNANqAdy4dnXQ4tn',
  appsecret:'afa5a9125864206d9b0d77bc5d207048'
};

module.exports = (app) ->
    app.use('/wechatapi',wechat config,(req, res, next) ->
        res.reply('hehe')
        return
    )
	#return app
