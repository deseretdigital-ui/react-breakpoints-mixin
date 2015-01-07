var gulp = require('gulp');


gulp.task('clean', function () {
  var config = {
    src: [
      './dist',
      './example/build'
    ]
  };

  del(config.src);
});
