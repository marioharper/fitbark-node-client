const gulp = require('gulp');
const babel = require('gulp-babel');
const paths = require('../paths');

gulp.task('build-babel', ['clean'], () => {
  return gulp.src(paths.src)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest(paths.output));
});
