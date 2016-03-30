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
var Signup, easingEq;

Signup = require('./lib/signup');

easingEq = [0.19, 1, 0.22, 1];

$(function() {
  Signup.init();
  $(".header").velocity({
    opacity: 1,
    top: 0
  }, {
    duration: 1600,
    easing: easingEq
  });
  return $(".hero_content").velocity({
    opacity: 1,
    top: 0
  }, {
    duration: 1600,
    delay: 200,
    easing: easingEq
  });
});



},{"./lib/signup":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9pY3J1ei9QZXJzb25hbC9Bbm5pL0xhbmRpbmcgUGFnZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWNydXovUGVyc29uYWwvQW5uaS9MYW5kaW5nIFBhZ2Uvc291cmNlL2Fzc2V0cy9qcy9saWIvc2lnbnVwLmNvZmZlZSIsIi9Vc2Vycy9pY3J1ei9QZXJzb25hbC9Bbm5pL0xhbmRpbmcgUGFnZS9zb3VyY2UvYXNzZXRzL2pzL21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLElBQUEsRUFBTSxTQUFBO0FBQ0osUUFBQTtJQUFBLEtBQUEsR0FBUSxDQUFBLENBQUUsTUFBRjtJQUNSLGNBQUEsR0FBaUIsQ0FBQSxDQUFFLGVBQUY7SUFDakIsY0FBQSxHQUFpQixDQUFBLENBQUUsc0JBQUY7SUFDakIsWUFBQSxHQUFlLENBQUEsQ0FBRSxTQUFGO0lBQ2YsT0FBQSxHQUFVO0lBQ1YsSUFBQSxHQUFPO0lBRVAsWUFBQSxHQUFlLFNBQUE7TUFDYixZQUFZLENBQUMsUUFBYixDQUFzQjtRQUFBLFVBQUEsRUFBWSxDQUFDLE1BQUQsRUFBUyxJQUFULENBQVo7T0FBdEIsRUFBa0QsQ0FBRSxHQUFGLEVBQU8sRUFBUCxDQUFsRDtNQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCO1FBQUEsT0FBQSxFQUFTLENBQVQ7T0FBakIsRUFBNkI7UUFBRSxRQUFBLEVBQVUsU0FBQTtpQkFBRyxPQUFPLENBQUMsTUFBUixDQUFBO1FBQUgsQ0FBWjtPQUE3QjthQUNBLElBQUEsR0FBTztJQUhNO0lBS2YsWUFBWSxDQUFDLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsY0FBekIsRUFBeUMsU0FBQTtNQUN2QyxZQUFBLENBQUE7YUFDQSxjQUFjLENBQUMsV0FBZixD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QUFsQjtHQURaLEVBRUk7SUFBQSxRQUFBLEVBQVUsSUFBVjtJQUNBLE1BQUEsRUFBTyxRQURQO0dBRko7U0FLQSxDQUFBLENBQUUsZUFBRixDQUNFLENBQUMsUUFESCxDQUNZO0lBQUMsT0FBQSxFQUFTLENBQVY7SUFBYSxHQUFBLEVBQUssQ0FBbEI7R0FEWixFQUVJO0lBQUEsUUFBQSxFQUFVLElBQVY7SUFDQSxLQUFBLEVBQU8sR0FEUDtJQUVBLE1BQUEsRUFBTyxRQUZQO0dBRko7QUFSQSxDQUFGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gXG4gIGluaXQ6IC0+XG4gICAgJGJvZHkgPSAkKCdib2R5JylcbiAgICAkc2lnbnVwX2J1dHRvbiA9ICQoJ1tkYXRhLXNpZ251cF0nKVxuICAgICRzaWdudXBfY2FuY2VsID0gJCgnW2RhdGEtY2FuY2VsLXNpZ251cF0nKVxuICAgICRzaWdudXBfZm9ybSA9ICQoJyNzaWdudXAnKVxuICAgICRzY3JlZW4gPSBudWxsXG4gICAgb3BlbiA9IGZhbHNlXG4gIFxuICAgIGNsb3NlT3ZlcmxheSA9IC0+XG4gICAgICAkc2lnbnVwX2Zvcm0udmVsb2NpdHkgdHJhbnNsYXRlWTogWycyMDAlJywgJzAlJ10sIFsgMjUwLCAyMCBdXG4gICAgICAkc2NyZWVuLnZlbG9jaXR5IG9wYWNpdHk6IDAsIHsgY29tcGxldGU6IC0+ICRzY3JlZW4ucmVtb3ZlKCkgfVxuICAgICAgb3BlbiA9IGZhbHNlXG4gIFxuICAgICRzaWdudXBfZm9ybS5vbiAnY2xpY2snLCAnW2RhdGEtY2xvc2VdJywgLT5cbiAgICAgIGNsb3NlT3ZlcmxheSgpXG4gICAgICAkc2lnbnVwX2J1dHRvbi5yZXBsYWNlV2l0aCgnPHA+VGhhbmtzIGZvciBzaWduaW5nIHVwITwvcD4nKTtcbiAgXG4gICAgJHNpZ251cF9jYW5jZWwub24gJ2NsaWNrJywgY2xvc2VPdmVybGF5XG4gIFxuICAgICRzaWdudXBfYnV0dG9uLm9uICdjbGljaycsIC0+XG4gICAgICB0cmFuc2xhdGUgPSBpZiBvcGVuIHRoZW4gWycyMDAlJywgJzAlJ10gZWxzZSBbJzAlJywgJzIwMCUnXVxuICAgICAgJHNpZ251cF9mb3JtLnZlbG9jaXR5IHRyYW5zbGF0ZVk6IHRyYW5zbGF0ZSwgWyAyNTAsIDIwIF1cbiAgICAgIGlmIG9wZW5cbiAgICAgICAgJHNjcmVlbi52ZWxvY2l0eSBvcGFjaXR5OiAwLCB7IGNvbXBsZXRlOiAtPiAkc2NyZWVuLnJlbW92ZSgpIH1cbiAgICAgIGVsc2VcbiAgICAgICAgJHNjcmVlbiA9ICQoJzxkaXYgY2xhc3M9XCJzaWdudXAtZm9ybV9fb3ZlcmxheS1zY3JlZW5cIj48L2Rpdj4nKVxuICAgICAgICAkc2NyZWVuLm9uICdjbGljaycsIGNsb3NlT3ZlcmxheVxuICAgICAgICAkc2NyZWVuLmNzcyBvcGFjaXR5OiAwXG4gICAgICAgICRib2R5LmFwcGVuZCgkc2NyZWVuKVxuICAgICAgICAkc2NyZWVuLnZlbG9jaXR5IG9wYWNpdHk6IDFcbiAgICAgIG9wZW4gPSAhb3BlblxuICBcbiAgICAkc2lnbnVwX2Zvcm0ub24gJ3N1Ym1pdCcsIChlKSAtPlxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJGZvcm0gPSAkKHRoaXMpXG4gICAgICAkYnV0dG9uID0gJGZvcm0uZmluZCgnYnV0dG9uW3R5cGU9c3VibWl0XSAudG9wJylcbiAgICAgICRmb3JtX3BpZWNlcyA9ICRmb3JtLmZpbmQoJy5zdGFnZ2VyLW91dCcpXG4gICAgICAkYnV0dG9uLnRleHQgJ1NlbmRpbmcgeW91ciBpbmZvLi4uJ1xuICAgICAgdXJsID0gJGZvcm0uYXR0ciAnYWN0aW9uJ1xuICAgICAgZGF0YSA9ICRmb3JtLnNlcmlhbGl6ZSgpXG5cbiAgICAgICQuYWpheFxuICAgICAgICB1cmw6IHVybCwgXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICAgIC5kb25lIChkYXRhKSAtPlxuICAgICAgICBpZiBkYXRhLnJlc3VsdCBpcyAnc3VjY2VzcydcbiAgICAgICAgICAkZm9ybV9waWVjZXMudmVsb2NpdHkoXCJ0cmFuc2l0aW9uLnNsaWRlVXBCaWdPdXRcIiwge3N0YWdnZXI6IDEwMCwgY29tcGxldGU6IC0+XG4gICAgICAgICAgICAkcmVwbGFjZW1lbnQgPSAkKFwiPHAgY2xhc3M9J3NpZ251cC1mb3JtX19zdWNjZXNzJz4je2RhdGEubXNnfTwvcD48YnV0dG9uIGRhdGEtY2xvc2UgY2xhc3M9J3ByaW1hcnktYnV0dG9uJz48ZGl2IGNsYXNzPSd0b3AnPkNsb3NlPC9kaXY+PGRpdiBjbGFzcz0nYm90dG9tJz48L2Rpdj48L2J1dHRvbj5cIilcbiAgICAgICAgICAgICRyZXBsYWNlbWVudC5jc3Moe29wYWNpdHk6IDB9KTtcbiAgICAgICAgICAgICRmb3JtLmVtcHR5KCkuYXBwZW5kKCRyZXBsYWNlbWVudClcbiAgICAgICAgICAgICRyZXBsYWNlbWVudC52ZWxvY2l0eSBvcGFjaXR5OiBbMSwgMF1cbiAgICAgICAgICB9KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgJGJ1dHRvbi50ZXh0ICdUaGVyZSB3YXMgYW4gZXJyb3IuIFRyeSBhZ2Fpbi4nIiwiU2lnbnVwID0gcmVxdWlyZSgnLi9saWIvc2lnbnVwJylcblxuZWFzaW5nRXEgPSBbMC4xOSwgMSwgMC4yMiwgMV1cblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERPTSBJbml0XG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuJCAtPlxuICBTaWdudXAuaW5pdCgpXG5cbiAgJChcIi5oZWFkZXJcIilcbiAgICAudmVsb2NpdHkge29wYWNpdHk6IDEsIHRvcDogMH0sXG4gICAgICBkdXJhdGlvbjogMTYwMCxcbiAgICAgIGVhc2luZzplYXNpbmdFcVxuXG4gICQoXCIuaGVyb19jb250ZW50XCIpXG4gICAgLnZlbG9jaXR5IHtvcGFjaXR5OiAxLCB0b3A6IDB9LFxuICAgICAgZHVyYXRpb246IDE2MDAsXG4gICAgICBkZWxheTogMjAwLFxuICAgICAgZWFzaW5nOmVhc2luZ0VxXG4iXX0=
