const { src, dest } = require('gulp');
const { paths }     = require('../../paths');
const browserSync   = require('browser-sync').create();
const nunjucks      = require('gulp-nunjucks');
const formatHTML    = require('gulp-format-html');
const htmlmin       = require('gulp-htmlmin');


function html() {
   return src(paths.html.src)
      .pipe(nunjucks.compile())
      .pipe(htmlmin({preserveLineBreaks: true, collapseWhitespace: true}))
      .pipe(formatHTML({ indent_size: "2" }))
      .pipe(dest(paths.html.dest))
      .pipe(browserSync.stream());
}

module.exports      = { html };
