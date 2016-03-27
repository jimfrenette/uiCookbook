'use strict';

var gulp        = require('gulp'),
    browserify  = require('browserify'),
    buffer      = require('vinyl-buffer'),
    gutil       = require('gulp-util'),
    source      = require('vinyl-source-stream'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    webserver   = require('gulp-webserver');

gulp.task('bundle', function () {
  var b = browserify({
    entries: './src/js/index.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./js/'));
});

// static web server w/ livereload
gulp.task('server', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('default', ['bundle','server']);