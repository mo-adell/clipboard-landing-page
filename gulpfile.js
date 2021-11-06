//initializing modules
const 
      gulp         = require('gulp'),
      sass         = require('gulp-sass') (require('sass')),
      concat       = require('gulp-concat'),
      cssnano      = require('gulp-cssnano'),
      autoprefixer = require('gulp-autoprefixer');


//file path variables
const files = {
  scssPath : 'src/scss/**/*.scss',
  cssPath  : 'build/css'
}


//watch scss task
function watchScss() {
  return gulp.watch(files.scssPath, function () {
    return gulp.src(files.scssPath)
                .pipe(sass().on('error', sass.logError))
                .pipe(concat('style.css'))
                .pipe(gulp.dest(files.cssPath))
  })
}


exports.scss = watchScss;



//final css task
// function css() {
//   return gulp.src(files.scssPath)
//             .pipe(sass().on('error', sass.logError))
//             .pipe(autoprefixer())
//             .pipe(concat('style.css'))
//             .pipe(cssnano())
//             .pipe(gulp.dest(files.cssPath))
// }
// exports.build = css;
