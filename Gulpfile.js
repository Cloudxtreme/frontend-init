'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver');


/***********
*** SASS ***
************/
gulp.task('sass', function () {
    console.log('COMPILING SASS');
    return gulp.src('./css/**/*.scss')
        .pipe(plumber(function (error) {
            console.log('sass:compile.plumber', error);
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('./css'));
});


/****************
*** WEBSERVER ***
*****************/
gulp.task('webserver', function () {
    return gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            port: 8888,
            open: true
        }));
});


/************
*** WATCH ***
*************/
gulp.task('sass:watch', function (){ 
    var watcher = gulp.watch('./css/**/*.scss', ['sass']);
    watcher.on('change', function (e) {
        console.log('watcher.on.change type: ' + e.type + ' path: ' + e.path);
    });
    return watcher;
});


/************
*** START ***
*************/
gulp.task('start', ['webserver', 'sass:watch']);