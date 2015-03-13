var gulp        = require("gulp");
var handlebars  = require("gulp-handlebars");
var wrap        = require("gulp-wrap");
var declare     = require("gulp-declare");
var concat      = require("gulp-concat");
var less        = require("gulp-less");
var bower       = require("main-bower-files");
var _           = require("underscore");
var notify      = require("gulp-notify");
var plumber     = require("gulp-plumber");
var browserSync = require('browser-sync');


var onError = function(err) {
  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Beep"
  })(err);

  this.emit('end');
};



//================================================
//  WATCH
//================================================

gulp.task("watch", function() {
  gulp.watch(hbsPath, ["templates", browserSync.reload]);
  gulp.watch(lessPath, ["less", browserSync.reload]);
  gulp.watch("bower.json", ["bower:assets", browserSync.reload]);
});

gulp.task("default", ["templates", "less", "bower:assets", 'browser-sync'], function() {
  gulp.watch(hbsPath, ["templates", browserSync.reload]);
  gulp.watch(lessPath, ["less", browserSync.reload]);
  gulp.watch("bower.json", ["bower:assets", browserSync.reload]);
});


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});


//================================================
//  COMPILING ASSETS
//================================================

var hbsPath     = "templates/*.hbs";
var lessPath    = "less/*.less";


// -- HANDLEBARS TEMPLATES -- //

gulp.task("templates", function(){
  gulp.src(hbsPath)
    .pipe(handlebars())
    .pipe(wrap("Handlebars.template(<%= contents %>)"))
    .pipe(declare({
      namespace: "JST"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./js/"));
});


// -- LESS STYLESHEETS -- //

gulp.task("less", function() {
  gulp.src(lessPath)
    .pipe(plumber({errorHandler: onError}))
    .pipe(less())
    .pipe(gulp.dest("./css"))
    .pipe(notify({ // Add gulpif here
               title: 'Gulp',
               subtitle: 'success',
               message: 'LESS task',
               sound: "Pop"
           }));
});


//================================================
//  BOWER ASSETS
//================================================

gulp.task("bower:assets", ["bower:assets:js",
                           "bower:assets:css",
                           "bower:assets:dev",
                           "bower:assets:fonts"]);

// -- JAVASCRIPT -- //

gulp.task("bower:assets:js", function() {
  var files, sorted, dev;

  // get all bower js assets
  files = bower({filter: "**/*.js"});

  // make sure backbone is last in list
  sorted = _.sortBy(files, function(path) {
    if (path.match(/backbonefire\.js/)) {
      return 2;
    }
    if (path.match(/backbone\.js/)) {
      return 1;
    }
    return 0;
  });

  gulp.src(sorted)
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("vendor/js"));
});


// -- STYLESHEETS -- //

gulp.task("bower:assets:css", function() {
  var files;

  files = bower({filter: "**/*.css"});

  gulp.src(files)
    .pipe(concat("vendor.css"))
    .pipe(gulp.dest("vendor/css"));
});


// -- FONTS -- //

gulp.task("bower:assets:fonts", function(){
  var files;

  files = bower({filter: /\.(eot|svg|ttf|woff|woff2|otf)$/g});

  gulp.src(files)
    .pipe(gulp.dest("vendor/fonts"));
});

// -- DEV ASSETS -- //

gulp.task("bower:assets:dev", function(){
  var files;

  files = _.difference(bower({includeDev: true}), bower());

  gulp.src(files)
    .pipe(gulp.dest("vendor/dev"));
});
