'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    webserver = require('gulp-webserver'),
    plumber = require('gulp-plumber');

gulp.task('sass', function () {
    console.log('COMPILING SASS');
    return gulp.src('./src/**/*.scss')
        .pipe(plumber(function (error) {
            console.log('sass:compile.plumber', error);
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('./src/css'))
        .pipe(connect.reload());
});


gulp.task('webserver', function () {
    return gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            port: 8081,
            open: true
        }));
});


gulp.task('sass:watch', function () {
    gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('start', ['webserver', 'sass:watch']);