/**
 *
 *  www         登录注册模块
 *  author       @{author}
 *  modifyTime   @{modifyTime}
 *  version       @{version}
 *  description   登录注册模块私有脚本
 *
 */
require(['jquery'], function() {

	$('.grabRed .getRedpkg').on('click', function() {
		var target=$(this);
		target.removeClass('getRedpkg');
		target.addClass('shake');
		$.ajax({
			url: '/wechat/openpackage.do',
			type: 'get',
			dataType: 'json',
			success: function(res) {
				var giftNum=res.giftNum,
					giftType=res.giftType;
				setTimeout(function(){
					if (!res.exception) {
						target.remove();
						$('.grabRed .opend').removeClass('hide');
						$('.grabRed .opend').addClass('zoom');
						$('.grabRed .red-foot-man').addClass('red-foot-woman');
						$('.giftNum').text(giftNum);
						$('.giftType').text(giftType);
					} else {
						alert('网路出错了！');
					}
				},1000);

			}
		});
	});
	$('.giftBox .btn').on('click',function(e){
		$.ajax({
			url: '/wechat/togetredpkg.do',
			type: 'get',
			dataType: 'json',
			data:{
				redid:$('.giftNum').html()
			},
			success: function(res) {
				var msg=res.msg;
				if (!res.exception) {
					$('#shareMatte').removeClass('hide');
				} else {
					alert('网路出错了！');
				}
			}
		});
	});
	$('#shareMatte').on('touchend',function(e){
        $(this).addClass('hide');
        $('#redModalBox').removeClass('hide');
    });
});
