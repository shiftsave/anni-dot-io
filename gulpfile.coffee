###*
 * Gulp Scaffold System
 *
 * @author  Ivan Cruz
 * @date   6.24.14
 *
###


gulp           = require 'gulp'
autoprefixer   = require 'gulp-autoprefixer'
browserify     = require 'gulp-browserify'
browserSync    = require 'browser-sync'
concat         = require 'gulp-concat'
coffeelint     = require 'gulp-coffeelint'
coffeeify      = require 'coffeeify'
handleify      = require 'handleify'
jade           = require 'gulp-jade'
jeet           = require 'jeet'
livereload     = require 'gulp-livereload'
minifyCSS      = require 'gulp-minify-css'
notify         = require 'gulp-notify'
plumber        = require 'gulp-plumber'
rename         = require 'gulp-rename'
runSequence    = require 'run-sequence'
stylus         = require 'gulp-stylus'
uglify         = require 'gulp-uglify'
util           = require 'gulp-util'
watch          = require 'gulp-watch'
del            = require 'del'


#--------------------------------------------------------
# Variables
#--------------------------------------------------------

# Root application path
# basePath = 'process.cwd()'

# Source path
sourcePath = "source"

# Compile path
outputPath = "public"

# Directory where vendor files live
vendorPath = "#{sourcePath}/assets/vendor"

# Name of templates directory
viewsDirectory = "views"

# Name of JavaScript directory
jsDirectory = "assets/js"

# Name of CSS directory
cssDirectory = "assets/css"

# Name of Images directory
imagesDirectory = "assets/images"

# Name of Fonts directory
fontsDirectory = "assets/fonts"

# Name of main JS file
jsMainFile = "main"

# Name of main CSS file
cssMainFile = "main"

#--------------------------------------------------------
# Clean public folder
#--------------------------------------------------------


gulp.task 'clean', (cb) ->
  del [
    "#{outputPath}"
  ], cb


#--------------------------------------------------------
# Compile Stylus to CSS stylesheets
#--------------------------------------------------------


gulp.task "styles", ->
   gulp.src ["#{sourcePath}/#{cssDirectory}/#{cssMainFile}.styl"]
      .pipe plumber()
      .pipe stylus(use: [jeet()])
      .pipe autoprefixer()
      .pipe gulp.dest "#{outputPath}/#{cssDirectory}"
      .pipe browserSync.reload(stream:true)


#--------------------------------------------------------
# Copy images to public folder
#--------------------------------------------------------


gulp.task "images", ->
   gulp.src "#{sourcePath}/#{imagesDirectory}/**/*"
      .pipe gulp.dest "#{outputPath}/#{imagesDirectory}"
      .pipe browserSync.reload(stream:true)
      .pipe notify message: "Images Updated"


#--------------------------------------------------------
# Copy fonts to public folder
#--------------------------------------------------------


gulp.task "fonts", ->
   gulp.src "#{sourcePath}/#{fontsDirectory}/**/*"
      .pipe gulp.dest "#{outputPath}/#{fontsDirectory}"
      .pipe browserSync.reload(stream:true)
      .pipe notify message: "Fonts Updated"


#--------------------------------------------------------
# Compile Javascript files
#--------------------------------------------------------


gulp.task "coffee", ->
   gulp.src "#{sourcePath}/#{jsDirectory}/#{jsMainFile}.coffee", read: false
      .pipe plumber()
      .pipe browserify
         transform:  ["handleify", "coffeeify"]
         extensions: [".coffee", ".js"]
         debug: true
      .pipe rename "#{jsMainFile}.js"
      .pipe gulp.dest "#{outputPath}/#{jsDirectory}"
      .pipe browserSync.reload(stream:true)
      .pipe notify message: "Coffeescript Updated"


#--------------------------------------------------------
# Compile Vendor files
#--------------------------------------------------------


gulp.task "vendor", ->
   gulp.src "#{vendorPath}/**/*.js"
      .pipe uglify()
      .pipe concat "vendor.min.js"
      .pipe gulp.dest "#{outputPath}/#{jsDirectory}"
      .pipe browserSync.reload(stream:true)
      .pipe notify message: "Vendors Updated"


#--------------------------------------------------------
# Compile Views to PHP
#--------------------------------------------------------


gulp.task "templates", ->
  YOUR_LOCALS = {}
  gulp.src "#{sourcePath}/#{viewsDirectory}/**/*"
    .pipe(jade(locals: YOUR_LOCALS))
    .pipe plumber()
    .pipe gulp.dest "#{outputPath}"
    .pipe browserSync.reload(stream:true)


#--------------------------------------------------------
# Start local server
#--------------------------------------------------------


gulp.task 'browser-sync', ->
  browserSync.init server: baseDir: './public'


#--------------------------------------------------------
# Watch for changes
#--------------------------------------------------------


gulp.task "watch", ->
   gulp.watch "#{sourcePath}/#{cssDirectory}/**/*",          ["styles"]
   gulp.watch "#{sourcePath}/#{jsDirectory}/**/*",           ["coffee"]
   gulp.watch "#{vendorPath}/**/*",                          ["vendor"]
   gulp.watch "#{sourcePath}/#{viewsDirectory}/**/*",        ["templates"]
   gulp.watch "#{sourcePath}/#{imagesDirectory}/**/*",       ["images"]
   gulp.watch "#{sourcePath}/#{fontsDirectory}/**/*",        ["fonts"]


# + ----------------------------------------------------------


gulp.task "default", ->
   runSequence "clean", [
      "styles"
      "templates"
      "images"
      "fonts"
      "coffee"
      "vendor"
   ], "watch", "browser-sync"
