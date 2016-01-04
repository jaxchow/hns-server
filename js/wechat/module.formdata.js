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
        e.stopPropagation();
        e.preventDefault();
        $.ajax({
            url: '/wechat/answer_result.do',
            cache:false,
            type: 'get',
            dataType: 'json',
            data:$(this).serializeArray(),
            success: function(res) {
                if (!res.exception) {
                  $('#successModalBox').removeClass('hide');
                }else{
                  var state=res.state,
                    ranswer=res.ranswer;
                  $('#failModalBox').removeClass('hide');
                  $('#failModalBox .ranswer').text(ranswer);

                }
            }
        });
    });
    $('#district').on('change',function(e){
        var str=$(this).val();
        $('#agency option').each(function(i,optionNode){
            var agencyStr=$(optionNode).text();
           if(agencyStr.indexOf(str)>-1){
                $('#agency').val($(optionNode).val());
                return false;
            }
        });
    });
    $('[name="signup"]').on('submit',function(e){
        e.stopPropagation();
        e.preventDefault();
        $.ajax({
            url: '/wechat/signup.do',
            type: 'get',
            cache:false,
            dataType: 'json',
            data:$(this).serializeArray(),
            success: function(res) {
                if (!res.exception) {
                  location.href="/wechat/index.html";
                }else{
                  alert(res.msg);
                }
            }
        });
    });
});
