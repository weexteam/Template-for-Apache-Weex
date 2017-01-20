const gulp = require('gulp');
const eslint = require('gulp-eslint');
gulp.task('lint', () => {

  return gulp.src(['src/**/*.js', '!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint({
      extend: ['airbnb'], 
      globals: [
          'jQuery', 
          '$'
      ], 
      rules:{
        "semi": ["error", "always"]
      }
    }))
    .pipe(eslint.format())

    .pipe(eslint.failAfterError());
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['lint'])
})

gulp.task('default', ['watch']);