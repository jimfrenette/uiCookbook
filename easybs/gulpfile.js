'use strict';

var gulp        = require('gulp'),
    rename      = require("gulp-rename"),
    sass        = require('gulp-sass'),
    webserver   = require('gulp-webserver');

var path = {
    html: './**/*.html',
    scss: 'src/sass/**/*.scss',
    js:   'src/js/**/*.js',
    dist: {
        css: 'css',
        js:  'js'
    }
};

gulp.task('cp-normalize', function() {
    gulp.src([
        './node_modules/normalize.scss/normalize.scss'
        ])
        .pipe(rename('_normalize.scss'))
        .pipe(gulp.dest('./src/sass/base/'));
});
// copy vendor libraries into app
gulp.task('cp', ['cp-normalize']);

// static web server w/ livereload
gulp.task('server', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('watch', function(){
    gulp.watch(path.scss, ['sass']);
});

// Compile sass into css
gulp.task('sass', function() {
    return gulp.src(path.scss)
        .pipe(sass())
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('default', ['server', 'watch']);