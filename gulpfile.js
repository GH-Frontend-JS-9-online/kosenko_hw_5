'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
 
gulp.task('sass', function() {
  return gulp.src(['app/sass/**/*.sass', 'app/sass/**/*.scss'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgPlugins: [{removeViewBox: false}]
    })))
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
                stream: true
            }))
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        notify: false,
        // browser: 'google-chrome'
    });
    gulp.watch(['app/sass/**/*.sass', 'app/sass/**/*.scss'], gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/img/**/*', gulp.parallel('img'))
});

gulp.task('default', gulp.parallel('watch', 'html', 'sass', 'img'));   
// gulp.task('default', gulp.parallel('html', 'sass'));   