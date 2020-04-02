var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

gulp.task('less', function () {
  return gulp.src('./public/less/**/[^_]*.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
  gulp.watch('./public/less/**/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series('watch'));
