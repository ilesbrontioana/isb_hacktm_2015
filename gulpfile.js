/**
 * Created by adm on 21.09.15.
 */
var gulp = require('gulp');
var ts = require('gulp-typescript');
var Server = require('karma').Server;
var browserSync = require('browser-sync').init(
    ['build/local/index.html'], {
        port: 63343,
        proxy: "http://localhost:63343/isb_hacktm_2015/built/local/",
        files: ["app/**", "scss/**.*.scss"]
    });

gulp.task('default', function () {
    var tsResult = gulp.src('spudz/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            //target: 'ES6',
            module:  'AMD',
            out: 'output.js'
        }));
    browserSync.reload();
    return tsResult.js.pipe(gulp.dest('built/local'));
});

gulp.task('watch', function () {
    gulp.watch('spudz/*.ts', ['default', 'test']);
    gulp.watch('spudz/com/managers/events*.ts', ['default', 'test']);
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

