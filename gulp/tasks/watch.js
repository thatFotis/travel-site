var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

// Start watch task
gulp.task('watch', function() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.html', function() {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function() {
        gulp.start('cssInject');
    });

});

//Start cssInject task after the [styles] dependency is run, for injecting css into the html without refresh.
gulp.task('cssInject', ['styles'] ,function(){
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});