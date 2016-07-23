var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    rename = require('gulp-rename'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();


gulp.task('dependencies', function() {
  gulp.src('bower_components/normalize-css/normalize.css')
  .pipe(rename('_normalize.scss'))
  .pipe(gulp.dest('scss/vendors'));
});

gulp.task('sass', function() {
    gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 20 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch('scss/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('index.html', ['dist']).on('change', browserSync.reload);
});
