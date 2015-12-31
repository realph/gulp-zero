var gulp = require('gulp');

var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// Start server
gulp.task('serve', function () {
  browserSync({
    server: './Build'
  });
});

// HTML task
gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./Build'))
    .pipe(reload({stream: true}))
});

// Sass task
gulp.task('sass', function() {
  gulp.src(['./src/scss/*.scss', './src/scss/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./Build/css'))
    .pipe(reload({stream: true}))
});

// JS task
gulp.task('js', function () {
    return browserify({
      entries: './src/js/app.js',
      debug: true
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./Build/js'))
    .pipe(reload({stream: true}));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('./src/*.html', ['html']);
  gulp.watch(['./src/scss/*.scss', './src/scss/**/*.scss'], ['sass']);
  gulp.watch('./src/js/*.js', ['js']);
});

// Default task
gulp.task('default', ['serve', 'html', 'sass', 'js', 'watch']);
