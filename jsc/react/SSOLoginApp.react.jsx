/**
 *
 * @param  {[type]} factory [description]
 * @return {[type]}         [description]
 */
!function (factory) {

    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // [1] commonjs/node.js
    // [1] 支持在module.exports.abc,或者直接exports.abc
        var target = module['exports'] || exports; // module.exports is for node.js
        module.exports = factory(target, require);
    } else if (typeof define === 'function' && define['amd']) {
    // [2] amd anonymous module
        define(['exports', 'require'], factory);
    } else {
    // [3]browser globals:
        factory(window['exports'] = {});
    }
}(function (exports, require) {
    var React = require('react'),
        ReactBootstrap=require('react-bootstrap');

    var Modal=ReactBootstrap.Modal,
		TabbedArea=ReactBootstrap.TabbedArea,
		TabPane=ReactBootstrap.TabPane;

	React.createElement(Modal);
	React.createElement(TabbedArea);
	React.createElement(TabPane);

	var RegisterForm = React.createClass({
        displayName: "registerForm",
        render: function() {
            return (
					<form role="form" className="form-horizontal ssovalidateForm" method="post" action="http://www.ihoms.com/www/registerpop.do" novalidate="novalidate">
						<input type="hidden" name="preurl" value="http://iasp.ihoms.com/www/index.do" />
						<div className="form-group err-group">
							<div className="col-md-12">
								<div className="err-block"></div>
							</div>
						</div>
						<div className="form-group">
							<label className="form-label icons-label-username"></label>
							<div className="col-md-12">
								<input type="text" className="form-control userfield" name="mobile" placeholder="手机" data-rule-mobileto=".sendValidCode1" data-msg-mobileto="手机格式不正确！" data-rule-required="true" data-msg-required="手机不可为空！" data-rule-remotetomodal="http://www.ihoms.com/www/register/checkmobilejsonp.do" data-msg-remotetomodal="用户名已被占用，请重新输入！" />
							</div>
						</div>
						<div className="form-group">
							<label className="form-label icons-label-password"></label>
							<div className="col-md-12">
								<input type="password" id="password" name="password" className="form-control" placeholder="密码" data-msg-remote="密码需6~16位！" data-rule-rangelength="[6,16]" data-msg-rangelength="密码需6~16位！" data-rule-required="true" data-rule-password="true" data-msg-required="密码不可为空！" />
							</div>
						</div>
						<div className="form-group">
							<label className="form-label icons-label-password"></label>
							<div className="col-md-12">
								<input type="password" name="againpassword" className="form-control" data-rule-equalto="#password" data-msg-equalto="输入的密码不一致，请重新输入！" placeholder="重复密码" data-rule-required="true" data-rule-password="false" data-msg-required="确认密码不可为空！" />
								</div>
							</div>
						<div className="form-group">
							<label className="form-label icons-label-verify"></label>
							<div className="col-md-12">
								<div className="input-group">
									<input type="text" className="form-control" name="valicode" placeholder="请输入验证码" data-rule-maxlength="6" data-msg-maxlength="验证码长度不能超过6位！" data-rule-required="true" data-msg-required="验证码不可为空！" />
									<span className="input-group-btn">
										<button type="button" disabled="disabled" className="btn btn-default sendValidCode1" data-url="/www/register/sendValidCodejsonp.do">
											<span className="input-group-btn">获取手机验证码</span>
										</button>
									</span>
								</div>
							</div>
						</div>
						<div className="form-group checkbox">
							<div className="col-md-12">
								<input name="agree" type="checkbox" checked="checked" value="agree" data-rule-required="true" data-msg-required="请阅读并接受IHOMS用户协议！"/>
								我已阅读并接受
								<a href="http://www.ihoms.com/www/protocol.do" target="_blank">《IHOMS用户协议》</a>
							</div>
						</div>
						<div className="form-group">
							<div className="col-md-12">
    							<input type="submit" className="btn btn-primary btn-block" value="注册"/>
                            </div>
						</div>
                    </form>
            );
        }
    });

    var LoginForm = React.createClass({
        displayName: "loginForm",
		componentDidMount: function() {
			var self=this;
			jQuery(self.getDOMNode()).find("#passwordStatus").on('change',self.handlerPasswordStatus);
		},
		handlerPasswordStatus:function(e){
			var $currentTarget=jQuery(e.currentTarget);
			var $parentForm=$currentTarget.parents('.ssovalidateForm');
			if($currentTarget.attr('checked')){
				$parentForm.find(".normalbar").addClass("hide");
				$parentForm.find(".normalbar .pswdfield").attr('disabled',true);
				$parentForm.find('.dynamicbar').removeClass('hide');
				$parentForm.find('.dynamicbar .pswdfield').attr('disabled',false);
			}else{
				$parentForm.find(' .dynamicbar').addClass('hide');
				$parentForm.find(' .dynamicbar .pswdfield').attr('disabled',true);
				$parentForm.find('.normalbar').removeClass('hide');
				$parentForm.find('.normalbar .pswdfield').attr('disabled',false);
			}
			$parentForm.find('.err-block .error').hide();
		},
        render: function() {
            return (
					<form role="form" className="form-horizontal ssovalidateForm" method="post" action="http://www.ihoms.com/www/loginpop.do" noValidate="novalidate" autoComplete="off">
						<input type="hidden" name="preurl" value="http://iasp.ihoms.com/www/index.do" />
						<div className="form-group err-group">
							<div className="col-md-12">
								<div className="err-block"></div>
							</div>
						</div>
						<div className="form-group">
							<label className="form-label icons-label-username"></label>
							<div className="col-md-12">
								<input type="text" className="form-control userfield" name="username" data-rule-required="true" data-msg-required="账号不能为空！" data-rule-maxlength="100" data-msg-maxlength="账号不能超过100位" id="exampleUsername" placeholder="账号" value="" disabled="disabled" />
							</div>
						</div>
						<div className="form-group">
							<label className="form-label icons-label-password"></label>
							<div className="col-md-12 normalbar">
								<input type="password" name="password" className="form-control pswdfield" data-rule-required="true" data-msg-required="密码不能为空！" data-rule-maxlength="16" data-rule-minlength="6" data-msg-maxlength="密码不能超过16位" data-msg-minlength="密码不能少于6位" id="exampleInputPassword1" placeholder="密码" value="" autoComplete="off" />
							</div>
							<div className="col-md-12 dynamicbar hide">
								<div className="input-group">
									<input type="text" className="form-control pswdfield" name="passwordDynamic" placeholder="密码" data-rule-required="true" data-msg-required="密码不可为空！" />
									<span className="input-group-btn">
										<button type="button" disabled="disabled" className="btn btn-default sendValidCode1 pswdfield" data-url="/www/get_dynamic_password.do">获取手机验证码</button>
									</span>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="col-md-12 text-left">
								<label className="chkLoginLab">
									<input type="checkbox" className="passwordStatus" id="passwordStatus" name="passwordStatus" value="2" autoComplete="off" />使用手机动态密码</label>
								</div>
							</div>
						<div className="form-group">
							<label className="form-label icons-label-verify"></label>
							<div className="col-md-12">
								<div className="input-group">
									<input type="text" className="form-control" name="verify" data-rule-required="true" data-msg-required="验证码不能为空！" data-rule-maxlength="4" data-rule-remotetomodal="http://www.ihoms.com/www/vali_capt.do" data-msg-remotetomodal="验证码不正确！" data-msg-maxlength="验证码不能超过4位" id="exampleInputVerify" placeholder="请输入验证码" />
									<span className="input-group-btn">
										<img id="validatePic" src="http://www.ihoms.com/www/captcha.do?s=1433739765099" height="42" onclick="this.src='http://www.ihoms.com/www/captcha.do?time='+new Date().valueOf()" title="看不清，换一张" alt="看不清，换一张" />
									</span>
								</div>
							</div>
						</div>
						<div className="form-group btn-fix">
							<div className="col-md-12">
								<input type="submit" className="btn btn-primary btn-block" value="登录" />
							</div>
						</div>
						<div className="form-group">
							<div className="checkbox row">
								<label className="remeberme col-md-6">
									<input type="checkbox" value="remember-me" name="rememberme" />下次自动登录
								</label>
								<a href="http://www.ihoms.com/www/forget.do" id="psw-forget" className="pull-right">忘记密码?</a>
							</div>
						</div>
					</form>
            );
        }
    });

    var SSOLoginModal=React.createClass({
        render:function(){
            return (
				<div className='static-modal' id="SSOLogin">
					<Modal
					  backdrop={false}
					  animation={false}
                      onRequestHide={true} >
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">&nbsp;</h4>
                      </div>
					  <div className='modal-body'>
						   <TabbedArea defaultActiveKey={2}>
							<TabPane eventKey={1} tab='登录'>
								<LoginForm />
							</TabPane>
							<TabPane eventKey={2} tab='注册'>
								<RegisterForm />
							</TabPane>
						  </TabbedArea>
						</div>
					</Modal>
				</div>
            )
        }
    });

    var SSOLoginApp = React.createClass({
		componentDidMount: function() {
			var self=this;
			jQuery(document).on('click','.ssoLogin',self.showSSOLoginHandler);
		},
		showSSOLoginHandler:function(event){
            var self=this;
			jQuery(self.getDOMNode("#SSOLoginModel")).show();
			event.preventDefault();
			event.stopPropagation();
		},
        render: function() {
            return(
				<SSOLoginModal />
            )
        }
    });
    // 多对象返回
    //exports.downeditor=downeditor;
    //exports.markdowneditor=markdowneditor;

    //单一返回组件
    return SSOLoginApp;
});
