Signup = require('./lib/signup')

easingEq = [0.19, 1, 0.22, 1]

#--------------------------------------------------------
# DOM Init
#--------------------------------------------------------

$ ->
  Signup.init()

  $(".header")
    .velocity {opacity: 1, top: 0},
      duration: 1600,
      easing:easingEq

  $(".hero_content")
    .velocity {opacity: 1, top: 0},
      duration: 1600,
      delay: 200,
      easing:easingEq
