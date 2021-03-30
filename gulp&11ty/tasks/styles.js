const { src, dest } = require('gulp');
const { paths } = require('../../paths');
const scss         = require('gulp-sass');
const cleancss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();

function styles() {
   return src(paths.styles.src)
      .pipe(scss())
      .pipe(concat(paths.cssOutputName))
      .pipe(autoprefixer({
         overrideBrowserslist: ['last 2 versions'],
         grid:                 true,
      }))
      .pipe(cleancss({
         level: {
            1: {
               specialComments: 0,
            },
         },
         /* format: 'beautify' */
      }))
      .pipe(dest(paths.styles.dest))
      .pipe(browserSync.stream());
}

module.exports = { styles };
