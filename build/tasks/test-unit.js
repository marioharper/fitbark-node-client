const gulp = require('gulp');
const mocha = require('gulp-mocha');
const paths = require('../paths.js');
require('babel-core/register');

gulp.task('test-unit', ['lint'], () => {
  return gulp.src(paths.unitTests)
    .pipe(mocha({
      compilers: [
        'js:babel-core/register',
      ],
    }));
});
