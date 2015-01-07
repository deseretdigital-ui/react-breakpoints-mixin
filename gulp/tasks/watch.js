var gulp = require('gulp');


gulp.task('watch', ['build'], function() {
  var config = {
    src: [
      './src/**/*',
      './example/src/**/*'
    ],
    tasks: ['build']
  };

  gulp.watch(config.src, config.tasks);
});
