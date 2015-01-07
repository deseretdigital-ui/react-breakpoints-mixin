var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');


var config = {
  src: './src/index.js',
  dest: './dist',
  webpack: {
    output: {
      filename: 'react-breakpoints-mixin.js',
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
    externals: {
      react: {
        root: "React",
        commonjs: "react",
        commonjs2: "react",
        amd: "react"
      },
      "react/addons": {
        root: "React",
        commonjs: "react/addons",
        commonjs2: "react/addons",
        amd: "react/addons"
      }
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['bower_components', 'node_modules'],
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
};


gulp.task('dist', function () {
  return gulp.src(config.src)
    .pipe(gulpWebpack(config.webpack))
    .pipe(gulp.dest(config.dest));
});
