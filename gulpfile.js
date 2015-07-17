// Include gulp
var gulp = require('gulp');

//Include plugins
var uglify = require('gulp-uglifyjs'),
	debug = require('gulp-debug'),
	sass = require('gulp-ruby-sass'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	mainBowerFiles = require('main-bower-files'),
	plugins = require("gulp-load-plugins")({
		pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
		replaceString: /\bgulp[\-.]/
	});




// Concatenate JS Files
gulp.task('scripts', function () {
    gulp.src("public/**/*.js")
        //.pipe(debug())
        .pipe(uglify('public/**/*.js',{
            output: {
                beautify: false
            },
            outSourceMap: true,
            basePath: 'public',
            sourceRoot: '/'
        }))
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('sass', function() {
    return sass('public/src/css/scss/', {style: 'compressed'})
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('public/build/css'));
});

gulp.task('bower', function() {
	  gulp.src( mainBowerFiles())
	  	.pipe(plugins.filter('*.js'))
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.uglifyjs())
	    .pipe(gulp.dest('public/src/js/vendor/'));
	});


// Default Task
gulp.task('default', ['scripts', 'sass', 'bower']);