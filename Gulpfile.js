var gulp = require('gulp');
var lrserver = require('tiny-lr');
var livereload = require('gulp-livereload');
var connect = require('connect');
var lrc = require('connect-livereload');
var serveStatic = require('serve-static');
var templateCache = require('gulp-angular-templatecache');
var clean = require('gulp-clean');

var WEB_PORT = 9000;
var APP_DIR = './';

var lrs = lrserver();

// start livereload server
gulp.task('lr-server', function() {
    lrs.listen(35729, function(err) {
        if (err) return console.log(err);
    });
});

// start local http server for development
gulp.task('http-server', function() {
    connect()
    .use(lrc())
    .use(serveStatic(APP_DIR))
    .listen(WEB_PORT);
});

gulp.task('clean', function () {
    return gulp.src(APP_DIR+'scripts/templates.js')
    .pipe(clean({force: true}))
    .pipe(gulp.dest(APP_DIR+'scripts'));
})

gulp.task('templates', function () {
   return gulp.src('templates/**/*.html')
    .pipe(templateCache({'module': 'ngSimple'}))
    .pipe(gulp.dest(APP_DIR+'scripts'));
});

// start local http server with watch and livereload set up
gulp.task('server', function() {
    gulp.run('lr-server');

    var watchFiles = ['templates/*.html', 'scripts/*.js'];
    gulp.watch(watchFiles, ['clean', 'templates'], function() {
        console.log('Files changed. Reloading...');
        gulp
        .src(watchFiles)
        // .pipe(gulp.task('templates'))
        .pipe(livereload(lrs));
    });

    gulp.run('http-server');
});

gulp.task('default', ['server'], function () {
    
});