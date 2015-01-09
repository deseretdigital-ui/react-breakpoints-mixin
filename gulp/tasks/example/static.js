var gulp = require('gulp');


gulp.task('example/static', function () {
  var config = {
    src: './example/src/index.html',
    dest: './example/build'
  };

  return gulp.src(config.src).pipe(gulp.dest(config.dest));
});
