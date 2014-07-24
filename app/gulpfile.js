var gulp = require('gulp'),
    less = require('gulp-less'),
    connect = require('gulp-connect');

gulp.task('less', function(){
  gulp.src('less/main.less').
      pipe(less()).
      pipe(gulp.dest('css/')).
      pipe(connect.reload());
})

gulp.task('watch:less', function(){
  gulp.watch('less/**/*.less', ['less']);
})

gulp.task('server', function(){
  connect.server({
    root: '',
    port: 9003,
    livereload: true
  })
})

gulp.task('default', ['server','watch:less'])
