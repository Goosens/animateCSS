/*! animateCSS - v1.1.5 - 2014-10-31
* https://github.com/craigmdennis/animateCSS
* Copyright (c) 2014 Craig Dennis; Licensed MIT */

(function() {
  'use strict';
  var $;

  $ = jQuery;

  $.fn.extend({
    animateCSS: function(effect, options) {
      var addClass, animate, callback, complete, init, removeClass, setDuration, settings, transitionEnd, unhide;
      settings = {
        effect: effect,
        delay: 0,
        animationClass: 'animated',
        infinite: false,
        callback: options,
        debug: false,
        duration: 1
      };
      transitionEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      settings = $.extend(settings, options);
      init = function(element) {
        return animate(element);
      };
      animate = function(element) {
        if (settings.infinite === true) {
          settings.animationClass += ' infinite';
        }
        return setTimeout(function() {
          setDuration(element);
          unhide(element);
          addClass(element);
          return complete(element);
        }, settings.delay);
      };
      setDuration = function(element) {
        return element.css({
          'webkit-animation-duration': settings.duration + 's',
          'animation-duration': settings.duration + 's'
        });
      };
      addClass = function(element) {
        return element.addClass(settings.effect + ' ' + settings.animationClass + ' ');
      };
      unhide = function(element) {
        if (element.css('visibility') === 'hidden') {
          element.css('visibility', 'visible');
        }
        if (element.is(':hidden')) {
          return element.show();
        }
      };
      removeClass = function(element) {
        return element.removeClass(settings.effect + ' ' + settings.animationClass);
      };
      callback = function(element) {
        if (settings.infinite === false) {
          removeClass(element);
        }
        if (typeof settings.callback === 'function') {
          return settings.callback.call(element);
        }
      };
      complete = function(element) {
        return element.one(transitionEnd, function() {
          return callback(element);
        });
      };
      return this.each(function() {
        return init($(this));
      });
    }
  });

}).call(this);
