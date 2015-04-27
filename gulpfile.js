// Include gulp
var gulp = require('gulp');

//Include plugins
var uglify = require('gulp-uglifyjs'),
	debug = require('gulp-debug');


// Concatenate JS Files
gulp.task('scripts', function () {
    gulp.src("public/**/*.js")
        .pipe(debug())
        .pipe(uglify('public/**/*.js',{
            output: {
                beautify: false
            },
            outSourceMap: true,
            basePath: 'public',
            sourceRoot: '/'
        }))
        .pipe(gulp.dest('build/js'));
});
// Default Task
gulp.task('default', ['scripts']);