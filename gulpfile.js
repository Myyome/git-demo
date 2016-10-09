/*
	1:Less编译，压缩 合并
	2 js 合并 压缩 混淆
	3 IMG复制
	4 html 压缩
 */

/*引入gulp包*/
var gulp=require('gulp');
var less=require('gulp-less')
var cssnano=require('gulp-cssnano')
var concat=require('gulp-concat')
var uglify=require('gulp-uglify')
var htmlmin=require('gulp-htmlmin')
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/*1:Less编译，压缩 合并*/

//注册一个任务
gulp.task('styles',function(){
	gulp.src('src/styles/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(reload({stream:true}));
});

/*2 js 合并 压缩混淆*/
gulp.task('script',function(){
	gulp.src('src/script/*.js')
	.pipe(concat('index.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/script'))
	.pipe(reload({stream:true}));
});

/*3 IMG复制*/
gulp.task('img',function(){
	gulp.src('src/img/*.*')
	.pipe(gulp.dest('dist/img'))
	.pipe(reload({stream:true}));
});

/*4 html 压缩*/
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
	.pipe(reload({stream:true}));
});



// 静态服务器
gulp.task('browser-sync', function() {
    browserSync({
    	server: {
            baseDir: "dist/"
        }
    });
    gulp.watch('src/styles/*.less',['styles'])
	gulp.watch('src/script/*.js',['script'])
	gulp.watch('src/img/*.*',['img'])
	gulp.watch('src/*.html',['html']);
});
