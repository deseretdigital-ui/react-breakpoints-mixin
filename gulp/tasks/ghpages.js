var gulp = require('gulp');
var ghpages = require('gulp-gh-pages');

gulp.task('ghpages', ['build'], function () {
  gulp.src('./example/build/**/*').pipe(ghpages());
});
