/**
 *
 *  www         登录注册模块
 *  author       @{author}
 *  modifyTime   @{modifyTime}
 *  version       @{version}
 *  description   登录注册模块私有脚本
 *
 */
 
require(['jquery','jquery.validation'], function(jQuery,validation) {
    $('.valiForm').validate({
        errorPlacement: function(error, element) {
            var fieldRow = element.parents(".form-group");
            if (fieldRow.find(".help-block").length > 0) {
                error.appendTo(fieldRow.find(".help-block"));
            } else {
                
            }
        },
        success: function() {
        }
    });
    $('.chioceForm').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url: '/wechat/answerResult.do',
            type: 'get',
            dataType: 'json',
            success: function(res) {
                var state=res.state,
                    ranswer=res.ranswer;
                if (!res.rexception) {
                    if(state){
                        $('#successModalBox').removeClass('hide')
                    }else{
                        $('#failModalBox').removeClass('hide')
                        $('#failModalBox .ranswer').text(ranswer)

                    }
                } else {
                   
                }
                
            }
        })
    });
    $('#district').on('change',function(e){
        var str=$(this).val();
        $('#agency option').each(function(i,optionNode){
            var agencyStr=$(optionNode).text();
           if(agencyStr.indexOf(str)>-1){
                $('#agency').val($(optionNode).val());
                return false;
            }
        })
    });
});
