'use strict';

var gulp = require('gulp');

gulp.task('copy', function() {
    // copy vendor libraries into app
    gulp.src([
        './bower_components/requirejs-plugins/src/async.js',
        './node_modules/requirejs/require.js'
        ])
        .pipe(gulp.dest('./src/js/require/'));
});
