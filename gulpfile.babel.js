import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import exorcist from 'exorcist';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import ifElse from 'gulp-if-else';

watchify.args.debug = true;

const sync = browserSync.create();

// Input file.
watchify.args.debug = true;
var bundler = browserify('app/js/src/app.js', watchify.args);

// Babel transform
bundler.transform(babelify.configure({
  sourceMapRelative: 'app/src'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
    .on('error', function(error){
      console.error( '\nError: ', error.message, '\n');
      this.emit('end');
    })
    .pipe(exorcist('app/js/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
    .pipe(gulp.dest('app/js'));
}

gulp.task('sass', () =>
	gulp.src('app/css/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write(''))
		.pipe(gulp.dest('app/css'))
);

gulp.task('default', ['transpile']);

gulp.task('transpile', ['lint'], () => bundle());

gulp.task('lint', () => {
    return gulp.src(['app/js/src/**/*.js', 'gulpfile.babel.js'])
      .pipe(eslint())
      .pipe(eslint.format())
});

gulp.task('serve', ['transpile', 'sass'], () => sync.init({
  server: 'app',
  port: process.env.PORT || 8000,
  host: process.env.IP || 'localhost'
}));

gulp.task('js-watch', ['transpile'], () => sync.reload());

gulp.task('watch', ['serve'], () => {
  gulp.watch('app/js/**/*', ['js-watch'])
  gulp.watch('app/css/scss/*.scss', ['sass'])
  gulp.watch('app/css/style.css', sync.reload)
  gulp.watch('app/index.html', sync.reload);
});
