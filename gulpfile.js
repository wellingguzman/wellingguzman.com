var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var replace = require('gulp-replace');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('less', function () {
  return gulp.src('./less/**/[^_]*.less')
    .pipe(less())
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(cssmin())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('css-cache-bust', function () {
  var bust = (new Date().getTime()).toString(16);

  return gulp
    .src(['public/_shared/layout.jade'])
    .pipe(
      replace(/bust=[0-9a-f]+/gi, function () {
        return 'bust=' + bust;
      })
    )
    .pipe(gulp.dest('public/_shared/'));
});

gulp.task('watch', function () {
  gulp.watch('./less/**/*.less', gulp.series('less', 'css-cache-bust'));
});

gulp.task('default', gulp.series('watch'));
