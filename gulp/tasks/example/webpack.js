var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');


var config = {
  src: './example/src/index.js',
  dest: './example/build',
  webpack: {
    output: {
      filename: 'example.js',
      libraryTarget: 'umd'
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, loader: 'jsx-loader?harmony' },
        {
          test: /\.scss$/, loaders: [
            'style-loader',
            'css-loader',
            'autoprefixer-loader?{browsers:["last 2 version", "> 1%", "ie 8"]}',
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['bower_components', 'node_modules'],
    }
  }
};


gulp.task('example/webpack', ['dist'], function () {
  return gulp.src(config.src)
    .pipe(gulpWebpack(config.webpack))
    .pipe(gulp.dest(config.dest));
});
