var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');
gulp.task('minifycss', function () {
    console.log("开始压缩css");
    gulp.src('public/stylesheets/*.css') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
        .pipe(rename({ suffix: '.min' }))   //rename压缩后的文件名
        .pipe(minifycss())
        .pipe(gulp.dest('build/public/stylesheets')); // 写入 'build/somedir/somefile.js'
});


gulp.task('minifyjs', function () {
    console.log("开始压缩js");
    return gulp.src('public/javascripts/*.js')
        .pipe(rename({ suffix: '.min' }))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('build/public/javascripts'));  //输出
});

gulp.task('clean', function (cb) {
    del(['minified/css', 'minified/js'], cb)
});

gulp.task('default', ['clean', 'minifycss', 'minifyjs']);