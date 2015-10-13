###
  代理远程服务器应用
  proxy 配置 package.json config.proxy
###

httpProxy = require 'http-proxy'
proxy = httpProxy.createProxyServer({})
proxyAddress =  process.env.npm_package_config_proxyaddress
module.exports = (app) ->
  app.use (req,res,next)->
    if process.env.npm_package_config_proxy
      proxy.web(req, res, {target: proxyAddress})
    else
      next()


