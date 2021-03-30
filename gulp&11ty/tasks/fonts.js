const { src, dest } = require('gulp');
const { paths } = require('../../paths');
const browserSync  = require('browser-sync').create();

function fonts() {
   return src(paths.fonts.src)
      .pipe(dest(paths.fonts.dest))
      .pipe(browserSync.stream());
}

module.exports = { fonts };
