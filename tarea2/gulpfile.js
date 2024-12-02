const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const copy = require('gulp-copy');
const replace = require('gulp-replace');
const browserSync = require('browser-sync');
const tsc = require('gulp-typescript')

gulp.task('scripts', () => {
    return gulp.src('src/scripts/**/*.ts')
        .pipe(tsc())
        .pipe(replace(/(from\s+['"])(.*)\.ts(['"])/g, '$1$2.js$3'))
        .pipe(gulp.dest('dist/scripts'))
})

gulp.task('styles', () => {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('styles:dev', () => {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('html:dev', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(replace('styles.css', 'styles.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('data', () => {
    return gulp.src('src/*.json')
        .pipe(gulp.dest('dist'))
})

gulp.task('assets', () => {
    return gulp.src('src/assets/**')
        .pipe(copy('dist', { prefix: 1 }));
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src', gulp.parallel('dev')).on('change', browserSync.reload);
});

gulp.task('dev', gulp.parallel('styles:dev', 'scripts', 'data', 'assets', 'html:dev'));

gulp.task('default', gulp.parallel('styles', 'scripts', 'assets', 'html', 'data'));
