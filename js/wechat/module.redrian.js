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
	$('.rain').on('click',function(){
		$('#unpackage')[0].play();
        $('#successModalBox').removeClass('hide');
        $('.rain').remove();
        $.ajax({
            url: '/wechat/openRainpackage.do',
            type: 'get',
            data:{
                type:'rian'
            },
            dataType: 'json',
            success: function(res) {
                if (!res.exception) {
                    var giftNum=res.giftNum,
                        giftType=res.giftType;
                    $('.giftNum').text(giftNum);
                    $('.giftsp').text(giftType);
                }else{
                     alert('网络出错了！');
                }
            }
        });
    });
    $('.togetBtn').on('click',function(e){
        $.ajax({
            url: '/wechat/getpkg.do',
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
                    alert('网络出错了！');
                }
            }
        });
    });
    function formate(d){
		return d>9?d:'0'+d;
	}
    var timeSp=$(".time-down"),
    	coolTime=parseInt(timeSp.data('time'),10),
    	nowTime=new Date(),
    	remaining=coolTime-nowTime-8*60*60*1000;
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
            window.location.reload();
    	}

    },1000)
    // to do 实现倒计时 格式化后写回 time-down
});
