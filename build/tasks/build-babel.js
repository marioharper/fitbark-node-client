const gulp = require('gulp');
const babel = require('gulp-babel');
const paths = require('../paths');

gulp.task('build-babel', ['clean', 'test-unit'], () => {
  return gulp.src(paths.src)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest(paths.output));
});
