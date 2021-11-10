// Initialize modules
const { src, dest, watch, series } = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  validator = require('gulp-html'),
  browsersync = require('browser-sync').create()

// Use dart-sass for @use
sass.compiler = require('dart-sass')

const htmlTask = () => {
  return src('./index.html').pipe(validator()).pipe(dest('dist/'))
}
// Sass Task
function scssTask() {
  return src('src/scss/main.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }))
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  })
  cb()
}
function browserSyncReload(cb) {
  browsersync.reload()
  cb()
}

// Watch Task
function watchTask() {
  watch('*.html', browserSyncReload)
  watch(['src/scss/**/*.scss', 'src/**/*.png', 'src/**/*.jpg'], series(scssTask, browserSyncReload))
}

// Default Gulp Task
exports.default = series(scssTask, htmlTask, browserSyncServe, watchTask)

// Build Gulp Task
exports.build = series(scssTask, htmlTask)
