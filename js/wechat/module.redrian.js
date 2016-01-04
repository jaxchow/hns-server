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
	//alert(12)
    $('.rain').on('click',function(){
    	$('#successModalBox').removeClass('hide');
    	$('.rain').remove();
    	$.ajax({
			url: '/wechat/openpackage.do',
			type: 'get',
			dataType: 'json',
			success: function(res) {
				var giftNum=res.giftNum,
					giftType=res.giftType;
				$('.giftsp').text(giftNum+giftType);
			}
		});
    });
    $('.togetBtn').on('click',function(e){
    	$('#shareMatte').removeClass('hide');
    })
    function formate(d){
		return d>9?d:'0'+d;
	}
    var timeSp=$(".time-down"),
    	coolTime=parseInt(timeSp.data('time'),10),
    	nowTime=new Date(),
    	remaining=nowTime-coolTime;

    function showtime(remaining,timeSp){
    	var mytime,
    		h=Math.floor(remaining/1000/60/60),
      		m=Math.floor(remaining/1000/60%60),
       		s=Math.floor(remaining/1000%60);
       	mytime=formate(h)+':'+formate(m)+':'+formate(s);
       	timeSp.text(mytime)
       	
    }
    showtime(remaining,timeSp);
    var countdown=setInterval(function(){
    	remaining=remaining-1000;
    	showtime(remaining,timeSp);    	
    	if(remaining<1000){
    		clearInterval(countdown);
    	}
    	
    },1000)
    // to do 实现倒计时 格式化后写回 time-down
});
