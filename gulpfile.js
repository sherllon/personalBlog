'use strict';

// Include gulp
var gulp = require('gulp');

//Include plugins
var uglify = require('gulp-uglify'),
	debug = require('gulp-debug'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	mainBowerFiles = require('main-bower-files'),
	plugins = require("gulp-load-plugins")({
		pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
		replaceString: /\bgulp[\-.]/
	}),
	sourcemaps = require('gulp-sourcemaps'),
	connect = require('gulp-connect');




// Concatenate JS Files
gulp.task('scripts', function () {
    gulp.src("public/src/js/common/*.js")
        //.pipe(debug())
        .pipe(uglify({
            output: {
                beautify: false
            },
            outSourceMap: true,
//            basePath: 'public',
            sourceRoot: '/'
        }))
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('sass', function() {
    gulp.src('public/src/css/**/*.*css')
    	//.pipe(debug())
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
    	.pipe(concat('main.min.css'))
        .pipe(gulp.dest('public/build/css'));
});

gulp.task('bower', function() {
	  gulp.src( mainBowerFiles())
	  	.pipe(plugins.filter('*.js'))
		.pipe(plugins.concat('vendor.js'))
		.pipe(plugins.uglify())
	    .pipe(gulp.dest('public/build/js/vendor/'));
	});

//gulp.task('serverprod', function() {
//	  connect.server({
//	    root: ["public"],
//	    port: process.env.PORT || 5000, // localhost:5000
//	    livereload: false
//	  });
//	});

// Default Task
gulp.task('default', ['scripts', 'sass', 'bower']);
gulp.task('prod', ['scripts', 'sass']);
