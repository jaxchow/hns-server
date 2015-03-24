/* ========================================================================
 * Bootstrap: modal.js v3.3.2
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== 
    author: yingjj
    time  : 2015-03-18


 */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Message = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.message')
        }, this))
    }
  }
  Message.VERSION  = '3.3.2'

  Message.TRANSITION_DURATION = 300
  Message.BACKDROP_TRANSITION_DURATION = 150

  Message.DEFAULTS = $.extend({}, $.fn.modal.Constructor.DEFAULTS, {
    backdrop: true,
    keyboard: true,
    show: true,
    title:'提示',
    content:'提示内容',
    template: '<div class="modal fade bs-example-modal-sm in" tabindex="-1" role="dialog" aria-hidden="false" style="display: block; padding-right: 17px;">'+
                '<div class="modal-dialog modal-sm">'+
                  '<div class="modal-content">'+
                    '<div class="modal-header">'+
                      '<button type="button" class="close" data-dismiss="message" aria-label="Close"><span aria-hidden="true">×</span></button>'+
                      '<h4 class="modal-title"></h4>'+
                    '</div>'+
                    '<div class="modal-body text-center"></div>'+
                    '<div class="modal-footer">'+
                      '<button type="button" class="btn btn-default executeBtn" data-dismiss="message">确定</button>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '</div>',
    type:'alert',
    handler:[{
        text:"确定",
        handler:function(){
            
        }
        
    },{
        text:"取消",
        handler:function(){
            
        }
    }]
  });
  Message.prototype = $.extend({}, $.fn.modal.Constructor.prototype)
  Message.prototype.show = function (_relatedTarget) {
    var that = this
    var $msg = this.msg();
    
    that.$element=$msg;
    this.setContent()
    if(that.options.type=='confirm'){
      this.addBtn();      
    }
    var e    = $.Event('show.bs.message', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    if(that.options.type=='confirm'){
      this.$body.addClass('modal-open')
    }
    
    
    this.setScrollbar()
    this.escape()
    this.$element.on('click.dismiss.bs.message', '[data-dismiss="message"]',$.proxy(this.hide, this))
    
    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.message', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })   
    this.clickEvent()
  }
  Message.prototype.clickEvent=function(){
    if(this.options.type=='confirm'){
      this.$element.find('.executeBtn').on('click.bs.message',$.proxy(this.execute, this))
      this.$element.find('.cancelBtn').on('click.bs.message',$.proxy(this.cancel, this))
    }
  }
  Message.prototype.execute=function(){
    this.options.handler[0].handler();
  }
  Message.prototype.cancel=function(){
   this.options.handler[1].handler();
  }
  Message.prototype.addBtn=function(){
    this.$element.find('.executeBtn').text(this.options.handler[0].text)
    $('<button type="button" class="btn btn-default cancelBtn" data-dismiss="message">'+this.options.handler[1].text+'</button>').appendTo(this.$element.find('.modal-footer'));
  }

  Message.prototype.msg = function () {
    return (this.$msg = this.$msg || $(this.options.template))
  }
  Message.prototype.setContent = function () {
    var $msg  = this.msg()
    var info = this.info
    

    $msg.find('.modal-title')[this.options.title ? 'html' : 'text'](this.options.title)
    $msg.find('.modal-body')[this.options.content ? 'html' : 'text'](this.options.content)
    $msg.removeClass('fade in top bottom left right')
  }
  Message.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.message')
    });
  }

  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.message')
      var options = $.extend({}, Message.DEFAULTS, $this.data(), typeof option == 'object' && option)

      console.log(data);
      $this.data('bs.message', (data = new Message(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.message

  $.fn.message             = Plugin
  $.fn.message.Constructor = Message


  // MODAL NO CONFLICT
  // =================

  $.fn.message.noConflict = function () {
    $.fn.message = old
    return this
  }
  $(document).on('click.bs.message.data-api', '[data-toggle="message"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.message') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.message', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if message will actually get shown
      $target.one('hidden.bs.message', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })
}(jQuery);
