var gulp = require('gulp');
var config = require('../../webpack.config.js');
var webpack = require('gulp-webpack');

module.exports = function (options) {
  config.watch = options.watch || false;
  return gulp.src('./src/index.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./example'));
};
