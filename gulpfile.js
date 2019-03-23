var gulp = require('gulp');
var ts = require('gulp-typescript');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');
var tsProject = ts.createProject('tsconfig.json');
var sass = require('gulp-sass');
var fs = require('fs');
var cleanCSS = require('gulp-clean-css');

gulp.task('webpack', ["tsc"], function() {
    return gulp.src(['./dist/*.js'])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./'));
});


gulp.task('tsc', function() {
    return gulp.src(['./src/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scss', function() {
    gulp.src('./work/src/style/single_page/anniversary/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./build/src/style/single_page/anniversary/'));
    return gulp.src('./work/src/style/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./build/src/style/'));
});

gulp.task('deploy', ["webpack"], function() {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ["watch", 'dest', 'scss', 'icon', "webpack", "webserver"]);
