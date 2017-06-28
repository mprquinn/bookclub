var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function() {
  gulp.watch('./scss/**', ['scss']);
});

gulp.task('scss', function() {
  return gulp
    .src('./scss/styles.sass')
    .pipe(
      sourcemaps.init({
        loadMaps: true,
        identityMap: true
      })
    )
    .pipe(
      sass({
        indentedSyntax: true,
        errLogToConsole: true,
        outputStyle: 'expanded'
      })
    )
    .pipe(
      sourcemaps.write('.', {
        sourceRoot: null
      })
    )
    .pipe(gulp.dest('./css'));
});
