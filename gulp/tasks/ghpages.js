var gulp = require('gulp');
var ghpages = require('gulp-gh-pages');

gulp.task('ghpages', ['build'], function () {

  console.log(["\033[31m",
    "Before you run this task you need to setup the gh-pages branch.",
    "See `gulp-gh-pages` README.md: https://www.npmjs.org/package/gulp-gh-pages#readme",
    "After that, you can remove this message from `gulp/tasks/ghpages.js`.",
    "\033[91m"
  ].join("\n")); return;


  // remove message above for this line to execute.
  gulp.src('./example/**/*').pipe(ghpages());

});
