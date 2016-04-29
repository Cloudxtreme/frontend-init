"use strict";


/****************
 *** REQUIRES ***
 ****************/
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var dist = "./dist";
var errorHandlerFactory = function (taskName) {
    return function (err) {
        notify.onError({
            title: "Gulp Error: " + taskName,
            message: "<%= error.message %>",
            sound: "Beep"
        })(err);

        this.emit('end');
    };
};


/************
 *** HTML ***
 ************/
gulp.task('html', function () {
    return gulp.src('./**/*.htm')
        .pipe(connect.reload());
});


/***********
 *** IMG ***
 ***********/
gulp.task('img', function () {
    var onError = errorHandlerFactory('img');

    return gulp.src('./src/img/*')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(imagemin({
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dist + '/img'));
});


/**********
 *** JS ***
 **********/
gulp.task('js', function () {
    var onError = errorHandlerFactory('js');

    return gulp.src('./src/js/main.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        //.pipe(gulp.dest('./dist/js')) uncomment to create an un-minified version
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist + '/js'))
        .pipe(connect.reload());
});


/************
 *** CSS ***
 ************/
gulp.task('css', function () {
    var onError = errorHandlerFactory('css');

    return gulp.src('./src/scss/*.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist + '/css'))
        .pipe(connect.reload());
});


/*************
 *** WATCH ***
 *************/
gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./**/*.htm', ['html']);
});


/*****************
 *** LOCALHOST ***
 *****************/
gulp.task('localhost', function () {
    return connect.server({
        root: [__dirname],
        livereload: true,
        fallback: './index.htm',
        host: '0.0.0.0'
    });
});

gulp.task('build', ['js', 'css', 'html', 'img']);

gulp.task('default', ['build', 'watch', 'localhost']);
