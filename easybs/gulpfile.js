'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

var path = {
    html: './**/*.html',
    scss: 'src/sass/**/*.scss',
    js:   'src/js/**/*.js',
    dist: {
        css: 'css',
        js:  'js'
    }
};

// BrowserSync static server + watching scss and html files
gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: './',
            directory: false,
            index: 'index.html'
        }
    });

    gulp.watch(path.scss, ['sass']);
    gulp.watch(path.html).on('change', reload);
});

// Compile sass into css
gulp.task('sass', function() {
    return gulp.src(path.scss)
        .pipe(sass())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);