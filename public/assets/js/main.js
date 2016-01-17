(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  init: function() {
    var $body, $screen, $signup_button, $signup_cancel, $signup_form, closeOverlay, open;
    $body = $('body');
    $signup_button = $('[data-signup]');
    $signup_cancel = $('[data-cancel-signup]');
    $signup_form = $('#signup');
    $screen = null;
    open = false;
    closeOverlay = function() {
      $signup_form.velocity({
        translateY: ['200%', '0%']
      }, [250, 20]);
      $screen.velocity({
        opacity: 0
      }, {
        complete: function() {
          return $screen.remove();
        }
      });
      return open = false;
    };
    $signup_form.on('click', '[data-close]', function() {
      closeOverlay();
      return $signup_button.replaceWith('<p>Thanks for signing up!</p>');
    });
    $signup_cancel.on('click', closeOverlay);
    $signup_button.on('click', function() {
      var translate;
      translate = open ? ['200%', '0%'] : ['0%', '200%'];
      $signup_form.velocity({
        translateY: translate
      }, [250, 20]);
      if (open) {
        $screen.velocity({
          opacity: 0
        }, {
          complete: function() {
            return $screen.remove();
          }
        });
      } else {
        $screen = $('<div class="signup-form__overlay-screen"></div>');
        $screen.on('click', closeOverlay);
        $screen.css({
          opacity: 0
        });
        $body.append($screen);
        $screen.velocity({
          opacity: 1
        });
      }
      return open = !open;
    });
    return $signup_form.on('submit', function(e) {
      var $button, $form, $form_pieces, data, url;
      e.preventDefault();
      $form = $(this);
      $button = $form.find('button[type=submit] .top');
      $form_pieces = $form.find('.stagger-out');
      $button.text('Sending your info...');
      url = $form.attr('action');
      data = $form.serialize();
      return $.ajax({
        url: url,
        data: data,
        dataType: 'jsonp'
      }).done(function(data) {
        if (data.result === 'success') {
          return $form_pieces.velocity("transition.slideUpBigOut", {
            stagger: 100,
            complete: function() {
              var $replacement;
              $replacement = $("<p class='signup-form__success'>" + data.msg + "</p><button data-close class='primary-button'><div class='top'>Close</div><div class='bottom'></div></button>");
              $replacement.css({
                opacity: 0
              });
              $form.empty().append($replacement);
              return $replacement.velocity({
                opacity: [1, 0]
              });
            }
          });
        } else {
          return $button.text('There was an error. Try again.');
        }
      });
    });
  }
};



},{}],2:[function(require,module,exports){
var Signup;

Signup = require('./lib/signup');

$(function() {
  return Signup.init();
});



},{"./lib/signup":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qZGFrL3dlcmsvaXZhbi9hbm5pX2xwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamRhay93ZXJrL2l2YW4vYW5uaV9scC9zb3VyY2UvYXNzZXRzL2pzL2xpYi9zaWdudXAuY29mZmVlIiwiL1VzZXJzL2pkYWsvd2Vyay9pdmFuL2FubmlfbHAvc291cmNlL2Fzc2V0cy9qcy9tYWluLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxJQUFBLEVBQU0sU0FBQTtBQUNKLFFBQUE7SUFBQSxLQUFBLEdBQVEsQ0FBQSxDQUFFLE1BQUY7SUFDUixjQUFBLEdBQWlCLENBQUEsQ0FBRSxlQUFGO0lBQ2pCLGNBQUEsR0FBaUIsQ0FBQSxDQUFFLHNCQUFGO0lBQ2pCLFlBQUEsR0FBZSxDQUFBLENBQUUsU0FBRjtJQUNmLE9BQUEsR0FBVTtJQUNWLElBQUEsR0FBTztJQUVQLFlBQUEsR0FBZSxTQUFBO01BQ2IsWUFBWSxDQUFDLFFBQWIsQ0FBc0I7UUFBQSxVQUFBLEVBQVksQ0FBQyxNQUFELEVBQVMsSUFBVCxDQUFaO09BQXRCLEVBQWtELENBQUUsR0FBRixFQUFPLEVBQVAsQ0FBbEQ7TUFDQSxPQUFPLENBQUMsUUFBUixDQUFpQjtRQUFBLE9BQUEsRUFBUyxDQUFUO09BQWpCLEVBQTZCO1FBQUUsUUFBQSxFQUFVLFNBQUE7aUJBQUcsT0FBTyxDQUFDLE1BQVIsQ0FBQTtRQUFILENBQVo7T0FBN0I7YUFDQSxJQUFBLEdBQU87SUFITTtJQUtmLFlBQVksQ0FBQyxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLGNBQXpCLEVBQXlDLFNBQUE7TUFDdkMsWUFBQSxDQUFBO2FBQ0EsY0FBYyxDQUFDLFdBQWYsQ0FBMkIsK0JBQTNCO0lBRnVDLENBQXpDO0lBSUEsY0FBYyxDQUFDLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsWUFBM0I7SUFFQSxjQUFjLENBQUMsRUFBZixDQUFrQixPQUFsQixFQUEyQixTQUFBO0FBQ3pCLFVBQUE7TUFBQSxTQUFBLEdBQWUsSUFBSCxHQUFhLENBQUMsTUFBRCxFQUFTLElBQVQsQ0FBYixHQUFpQyxDQUFDLElBQUQsRUFBTyxNQUFQO01BQzdDLFlBQVksQ0FBQyxRQUFiLENBQXNCO1FBQUEsVUFBQSxFQUFZLFNBQVo7T0FBdEIsRUFBNkMsQ0FBRSxHQUFGLEVBQU8sRUFBUCxDQUE3QztNQUNBLElBQUcsSUFBSDtRQUNFLE9BQU8sQ0FBQyxRQUFSLENBQWlCO1VBQUEsT0FBQSxFQUFTLENBQVQ7U0FBakIsRUFBNkI7VUFBRSxRQUFBLEVBQVUsU0FBQTttQkFBRyxPQUFPLENBQUMsTUFBUixDQUFBO1VBQUgsQ0FBWjtTQUE3QixFQURGO09BQUEsTUFBQTtRQUdFLE9BQUEsR0FBVSxDQUFBLENBQUUsaURBQUY7UUFDVixPQUFPLENBQUMsRUFBUixDQUFXLE9BQVgsRUFBb0IsWUFBcEI7UUFDQSxPQUFPLENBQUMsR0FBUixDQUFZO1VBQUEsT0FBQSxFQUFTLENBQVQ7U0FBWjtRQUNBLEtBQUssQ0FBQyxNQUFOLENBQWEsT0FBYjtRQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCO1VBQUEsT0FBQSxFQUFTLENBQVQ7U0FBakIsRUFQRjs7YUFRQSxJQUFBLEdBQU8sQ0FBQztJQVhpQixDQUEzQjtXQWFBLFlBQVksQ0FBQyxFQUFiLENBQWdCLFFBQWhCLEVBQTBCLFNBQUMsQ0FBRDtBQUN4QixVQUFBO01BQUEsQ0FBQyxDQUFDLGNBQUYsQ0FBQTtNQUNBLEtBQUEsR0FBUSxDQUFBLENBQUUsSUFBRjtNQUNSLE9BQUEsR0FBVSxLQUFLLENBQUMsSUFBTixDQUFXLDBCQUFYO01BQ1YsWUFBQSxHQUFlLEtBQUssQ0FBQyxJQUFOLENBQVcsY0FBWDtNQUNmLE9BQU8sQ0FBQyxJQUFSLENBQWEsc0JBQWI7TUFDQSxHQUFBLEdBQU0sS0FBSyxDQUFDLElBQU4sQ0FBVyxRQUFYO01BQ04sSUFBQSxHQUFPLEtBQUssQ0FBQyxTQUFOLENBQUE7YUFFUCxDQUFDLENBQUMsSUFBRixDQUNFO1FBQUEsR0FBQSxFQUFLLEdBQUw7UUFDQSxJQUFBLEVBQU0sSUFETjtRQUVBLFFBQUEsRUFBVSxPQUZWO09BREYsQ0FJQSxDQUFDLElBSkQsQ0FJTSxTQUFDLElBQUQ7UUFDSixJQUFHLElBQUksQ0FBQyxNQUFMLEtBQWUsU0FBbEI7aUJBQ0UsWUFBWSxDQUFDLFFBQWIsQ0FBc0IsMEJBQXRCLEVBQWtEO1lBQUMsT0FBQSxFQUFTLEdBQVY7WUFBZSxRQUFBLEVBQVUsU0FBQTtBQUN6RSxrQkFBQTtjQUFBLFlBQUEsR0FBZSxDQUFBLENBQUUsa0NBQUEsR0FBbUMsSUFBSSxDQUFDLEdBQXhDLEdBQTRDLCtHQUE5QztjQUNmLFlBQVksQ0FBQyxHQUFiLENBQWlCO2dCQUFDLE9BQUEsRUFBUyxDQUFWO2VBQWpCO2NBQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBQSxDQUFhLENBQUMsTUFBZCxDQUFxQixZQUFyQjtxQkFDQSxZQUFZLENBQUMsUUFBYixDQUFzQjtnQkFBQSxPQUFBLEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFUO2VBQXRCO1lBSnlFLENBQXpCO1dBQWxELEVBREY7U0FBQSxNQUFBO2lCQVFFLE9BQU8sQ0FBQyxJQUFSLENBQWEsZ0NBQWIsRUFSRjs7TUFESSxDQUpOO0lBVHdCLENBQTFCO0VBaENJLENBQU47Ozs7OztBQ0RGLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxjQUFSOztBQU1ULENBQUEsQ0FBRSxTQUFBO1NBQ0EsTUFBTSxDQUFDLElBQVAsQ0FBQTtBQURBLENBQUYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBcbiAgaW5pdDogLT5cbiAgICAkYm9keSA9ICQoJ2JvZHknKVxuICAgICRzaWdudXBfYnV0dG9uID0gJCgnW2RhdGEtc2lnbnVwXScpXG4gICAgJHNpZ251cF9jYW5jZWwgPSAkKCdbZGF0YS1jYW5jZWwtc2lnbnVwXScpXG4gICAgJHNpZ251cF9mb3JtID0gJCgnI3NpZ251cCcpXG4gICAgJHNjcmVlbiA9IG51bGxcbiAgICBvcGVuID0gZmFsc2VcbiAgXG4gICAgY2xvc2VPdmVybGF5ID0gLT5cbiAgICAgICRzaWdudXBfZm9ybS52ZWxvY2l0eSB0cmFuc2xhdGVZOiBbJzIwMCUnLCAnMCUnXSwgWyAyNTAsIDIwIF1cbiAgICAgICRzY3JlZW4udmVsb2NpdHkgb3BhY2l0eTogMCwgeyBjb21wbGV0ZTogLT4gJHNjcmVlbi5yZW1vdmUoKSB9XG4gICAgICBvcGVuID0gZmFsc2VcbiAgXG4gICAgJHNpZ251cF9mb3JtLm9uICdjbGljaycsICdbZGF0YS1jbG9zZV0nLCAtPlxuICAgICAgY2xvc2VPdmVybGF5KClcbiAgICAgICRzaWdudXBfYnV0dG9uLnJlcGxhY2VXaXRoKCc8cD5UaGFua3MgZm9yIHNpZ25pbmcgdXAhPC9wPicpO1xuICBcbiAgICAkc2lnbnVwX2NhbmNlbC5vbiAnY2xpY2snLCBjbG9zZU92ZXJsYXlcbiAgXG4gICAgJHNpZ251cF9idXR0b24ub24gJ2NsaWNrJywgLT5cbiAgICAgIHRyYW5zbGF0ZSA9IGlmIG9wZW4gdGhlbiBbJzIwMCUnLCAnMCUnXSBlbHNlIFsnMCUnLCAnMjAwJSddXG4gICAgICAkc2lnbnVwX2Zvcm0udmVsb2NpdHkgdHJhbnNsYXRlWTogdHJhbnNsYXRlLCBbIDI1MCwgMjAgXVxuICAgICAgaWYgb3BlblxuICAgICAgICAkc2NyZWVuLnZlbG9jaXR5IG9wYWNpdHk6IDAsIHsgY29tcGxldGU6IC0+ICRzY3JlZW4ucmVtb3ZlKCkgfVxuICAgICAgZWxzZVxuICAgICAgICAkc2NyZWVuID0gJCgnPGRpdiBjbGFzcz1cInNpZ251cC1mb3JtX19vdmVybGF5LXNjcmVlblwiPjwvZGl2PicpXG4gICAgICAgICRzY3JlZW4ub24gJ2NsaWNrJywgY2xvc2VPdmVybGF5XG4gICAgICAgICRzY3JlZW4uY3NzIG9wYWNpdHk6IDBcbiAgICAgICAgJGJvZHkuYXBwZW5kKCRzY3JlZW4pXG4gICAgICAgICRzY3JlZW4udmVsb2NpdHkgb3BhY2l0eTogMVxuICAgICAgb3BlbiA9ICFvcGVuXG4gIFxuICAgICRzaWdudXBfZm9ybS5vbiAnc3VibWl0JywgKGUpIC0+XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkZm9ybSA9ICQodGhpcylcbiAgICAgICRidXR0b24gPSAkZm9ybS5maW5kKCdidXR0b25bdHlwZT1zdWJtaXRdIC50b3AnKVxuICAgICAgJGZvcm1fcGllY2VzID0gJGZvcm0uZmluZCgnLnN0YWdnZXItb3V0JylcbiAgICAgICRidXR0b24udGV4dCAnU2VuZGluZyB5b3VyIGluZm8uLi4nXG4gICAgICB1cmwgPSAkZm9ybS5hdHRyICdhY3Rpb24nXG4gICAgICBkYXRhID0gJGZvcm0uc2VyaWFsaXplKClcblxuICAgICAgJC5hamF4XG4gICAgICAgIHVybDogdXJsLCBcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgICAgLmRvbmUgKGRhdGEpIC0+XG4gICAgICAgIGlmIGRhdGEucmVzdWx0IGlzICdzdWNjZXNzJ1xuICAgICAgICAgICRmb3JtX3BpZWNlcy52ZWxvY2l0eShcInRyYW5zaXRpb24uc2xpZGVVcEJpZ091dFwiLCB7c3RhZ2dlcjogMTAwLCBjb21wbGV0ZTogLT5cbiAgICAgICAgICAgICRyZXBsYWNlbWVudCA9ICQoXCI8cCBjbGFzcz0nc2lnbnVwLWZvcm1fX3N1Y2Nlc3MnPiN7ZGF0YS5tc2d9PC9wPjxidXR0b24gZGF0YS1jbG9zZSBjbGFzcz0ncHJpbWFyeS1idXR0b24nPjxkaXYgY2xhc3M9J3RvcCc+Q2xvc2U8L2Rpdj48ZGl2IGNsYXNzPSdib3R0b20nPjwvZGl2PjwvYnV0dG9uPlwiKVxuICAgICAgICAgICAgJHJlcGxhY2VtZW50LmNzcyh7b3BhY2l0eTogMH0pO1xuICAgICAgICAgICAgJGZvcm0uZW1wdHkoKS5hcHBlbmQoJHJlcGxhY2VtZW50KVxuICAgICAgICAgICAgJHJlcGxhY2VtZW50LnZlbG9jaXR5IG9wYWNpdHk6IFsxLCAwXVxuICAgICAgICAgIH0pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAkYnV0dG9uLnRleHQgJ1RoZXJlIHdhcyBhbiBlcnJvci4gVHJ5IGFnYWluLiciLCJTaWdudXAgPSByZXF1aXJlKCcuL2xpYi9zaWdudXAnKVxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRE9NIEluaXRcbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4kIC0+XG4gIFNpZ251cC5pbml0KClcblxuIl19
