const gulp = require('gulp');
const mocha = require('gulp-mocha');
const paths = require('../paths.js');

gulp.task('test-unit', ['lint'], () => {
  gulp.src(paths.unitTests)
    .pipe(mocha());
});
