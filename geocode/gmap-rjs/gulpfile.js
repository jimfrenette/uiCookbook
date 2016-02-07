'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// copy vendor libraries into app
gulp.task('copy', function() {
    gulp.src([
        './bower_components/requirejs-plugins/src/async.js',
        './node_modules/requirejs/require.js'
        ])
        .pipe(gulp.dest('./src/js/require/'));
});

// BrowserSync static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './',
            directory: false,
            index: 'index.html'
        }
    });
});
