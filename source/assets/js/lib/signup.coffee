module.exports = 
  init: ->
    $body = $('body')
    $signup_button = $('[data-signup]')
    $signup_cancel = $('[data-cancel-signup]')
    $signup_form = $('#signup')
    $screen = null
    open = false
  
    closeOverlay = ->
      $signup_form.velocity translateY: ['200%', '0%'], [ 250, 20 ]
      $screen.velocity opacity: 0, { complete: -> $screen.remove() }
      open = false
  
    $signup_form.on 'click', '[data-close]', ->
      closeOverlay()
      $signup_button.replaceWith('<p>Thanks for signing up!</p>');
  
    $signup_cancel.on 'click', closeOverlay
  
    $signup_button.on 'click', ->
      translate = if open then ['200%', '0%'] else ['0%', '200%']
      $signup_form.velocity translateY: translate, [ 250, 20 ]
      if open
        $screen.velocity opacity: 0, { complete: -> $screen.remove() }
      else
        $screen = $('<div class="signup-form__overlay-screen"></div>')
        $screen.on 'click', closeOverlay
        $screen.css opacity: 0
        $body.append($screen)
        $screen.velocity opacity: 1
      open = !open
  
    $signup_form.on 'submit', (e) ->
      e.preventDefault();
      $form = $(this)
      $button = $form.find('button[type=submit] .top')
      $form_pieces = $form.find('.stagger-out')
      $button.text 'Sending your info...'
      url = $form.attr 'action'
      data = $form.serialize()

      $.ajax
        url: url, 
        data: data
        dataType: 'jsonp'
      .done (data) ->
        if data.result is 'success'
          $form_pieces.velocity("transition.slideUpBigOut", {stagger: 100, complete: ->
            $replacement = $("<p class='signup-form__success'>#{data.msg}</p><button data-close class='primary-button'><div class='top'>Close</div><div class='bottom'></div></button>")
            $replacement.css({opacity: 0});
            $form.empty().append($replacement)
            $replacement.velocity opacity: [1, 0]
          })
        else
          $button.text 'There was an error. Try again.'