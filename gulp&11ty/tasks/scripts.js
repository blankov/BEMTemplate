const { src, dest } = require('gulp');
const { paths } = require('../../paths');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;

function scripts() {
   return src(paths.scripts.src)
      .pipe(concat(paths.jsOutputName))
      .pipe(uglify())
      .pipe(dest(paths.scripts.dest))
      .pipe(browserSync.stream());
}

module.exports = { scripts };
