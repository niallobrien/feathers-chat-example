var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
gulp.task('start', function () {
  nodemon({
    script: './src/index.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})
