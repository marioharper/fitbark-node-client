const gulp = require('gulp');
const guppy = require('git-guppy')(gulp);

gulp.task('pre-commit', ['test-unit'], () => {
  return gulp.src(guppy.src('pre-commit'));
});
