var gulp       = require('gulp'),
	util         = require('gulp-util'),
	browserSync  = require('browser-sync'),
	rename       = require('gulp-rename'),
	sass         = require('gulp-ruby-sass'),
	notify       = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer');


// html
gulp.task('html', function() {
  return gulp.src('./docs/**/*.html')
    .pipe(browserSync.reload({stream:true}));
});


////////////////////////////////////////////////////////////////////
// docs
////////////////////////////////////////////////////////////////////

// sass
gulp.task('docs', function() {
	return sass('./docs/scss/stylesheet.scss', { style: 'compact' })
		.on('error', function (err) { console.log(err.message); })
		.pipe(autoprefixer('> 5%, last 2 versions', 'Firefox >= 30', 'Opera >= 12', 'Safari >= 5', 'Explorer >= 9'))
		.pipe(gulp.dest('./docs/css'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(notify({ message: "sass file: <%= file.relative %>"}));
});


////////////////////////////////////////////////////////////////////
// build
////////////////////////////////////////////////////////////////////

//sass
gulp.task('build', function() {
	return sass('./build/veegee.scss', { style: 'compact' })
		.on('error', function (err) { console.log(err.message); })
		.pipe(autoprefixer('> 5%, last 2 versions', 'Firefox >= 30', 'Opera >= 12', 'Safari >= 5', 'Explorer >= 9'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(notify({ message: "sass file: <%= file.relative %>"}));
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
	gulp.watch('docs/**/*.scss', ['docs']);
	gulp.watch('build/**/*.scss', ['build']);
	gulp.watch('./**/*.html', ['html']);
});


