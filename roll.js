/* 
* @Author: GZWZC
* @Date:   2017-04-01 17:15:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-04-22 15:32:11
*/

(function ($) {
    var Roll = function(el, opt) {
        this.$element = el,
        this.defaults = {
            speed:1
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //Roll
    Roll.prototype = {
        move:function($container,speed){
            var container_width = $container.width();
            if(parseInt($container.css("left")) + container_width>0){
                $container.css({left:parseInt($container.css("left")) - speed + "px"});
            }else{
                $container.css({left:parseInt(container_width) + "px"});
            }
        },
        init: function() {
            var options = this.options;
            var speed= (document.all) ? options.speed : Math.max(1,options.speed-1);
            if (this == null) return ; 
            var $container = this.$element;
            var init_width = this.$element.width();
            $container.css({left:parseInt(init_width) + "px"});
            var This = this;
            var time = setInterval(function(){This.move($container,speed);},20); //    setInterval会改变this指向，即使加了This=this，也要用匿名函数封装，这里调试了n久
            $container.bind("mouseover",function()
            {
                clearInterval(time);
            });
            $container.bind("mouseout",function()
            {
                time = setInterval(function(){This.move($container,speed);},20);
            });
        }
    }

    $.fn.roll = function (options) {
        //Roll
        var roll = new Roll(this, options);
        //调用其方法
        return roll.init();
    };
})(jQuery);
