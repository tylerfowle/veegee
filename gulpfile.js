var gulp       = require('gulp'),
	util         = require('gulp-util'),
	browserSync  = require('browser-sync'),
	rename       = require('gulp-rename'),
	sass         = require('gulp-ruby-sass'),
	notify       = require('gulp-notify'),
  fileinclude  = require('gulp-file-include'),
	autoprefixer = require('gulp-autoprefixer');


////////////////////////////////////////////////////////////////////
// build
////////////////////////////////////////////////////////////////////

//sass
gulp.task('build', function() {
	return sass('./build/scss/stylesheet.scss', { style: 'compact' })
		.on('error', function (err) { console.log(err.message); })
		.pipe(autoprefixer('> 5%, last 2 versions', 'Firefox >= 30', 'Opera >= 12', 'Safari >= 5', 'Explorer >= 9'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(notify({ message: "sass file: <%= file.relative %>"}));
});

// html
gulp.task('veegee', function() {
  return gulp.src(['./build/**/*.html', '!./build/svg/**/*'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './build/'
    }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('./dist/html/'))
    .pipe(browserSync.stream({}))
});


//browser sync
gulp.task('browser-sync', function() {
	browserSync.init({
		open: false,
		notify: false,
		server: {
			baseDir: "./",
			index: "docs/docs.html",
			directory: true
		}
	});
});


gulp.task('default', ['browser-sync'], function() {
	gulp.watch('build/**/*.scss', ['build']);
  gulp.watch('./build/**/*.html', ['veegee']);
	gulp.watch('./build/svg/*', ['veegee']);
});


