const gulp = require('gulp');
const eslint = require('gulp-eslint');
const paths = require('../paths.js');

gulp.task('lint', () => {
  gulp.src(paths.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
