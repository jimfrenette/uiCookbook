'use strict';

var gulp        = require('gulp'),
    assign      = require('lodash.assign'),
    browserify  = require('browserify'),
    buffer      = require('vinyl-buffer'),
    gutil       = require('gulp-util'),
    source      = require('vinyl-source-stream'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    watchify    = require('watchify'),
    webserver   = require('gulp-webserver');

// custom browserify options
var customOpts = {
    entries: ['./src/js/index.js'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('js', bundle); // run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(uglify()) // minify
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./js'));
}

// static web server w/ livereload
gulp.task('server', function() {
    gulp.src('./')
        .pipe(webserver({
            port: 3000,
            directoryListing: false,
            open: true
        }));
});

gulp.task('default', ['js', 'server']);
