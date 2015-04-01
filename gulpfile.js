var gulp = require('gulp');

var browserify = require('browserify');
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var swig = require('gulp-swig');
var uglify = require('gulp-uglify');
var transform = require('vinyl-transform');

gulp.task('serve', function () {
  browserSync({
    server: './Build'
  });
});

gulp.task('templates', function() {
  return gulp.src('./src/*.html')
    .pipe(swig())
    .pipe(gulp.dest('./Build'))
    .on("end", reload)
});

// Sass task
gulp.task('sass', function(event) {
  return gulp.src(['./src/scss/*.scss', './src/scss/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./Build/css'))
    .pipe(reload({stream: true}))
});

// JS task
gulp.task('js', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });
  return gulp.src('./src/js/*.js')
    .pipe(browserified)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./Build/js'))
    .pipe(reload({stream: true}))
});

// Default task
gulp.task('default', ['serve', 'templates', 'sass', 'js'], function() {
  gulp.watch('./src/*.html', ['templates']);
  gulp.watch(['./src/scss/*.scss', './src/scss/**/*.scss'], ['sass']);
  gulp.watch('./src/js/*.js', ['js']);
});