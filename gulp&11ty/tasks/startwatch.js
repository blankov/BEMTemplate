const paths = require('../../paths').paths;
const {
   baseDir,
   buildDir,
   preprocessor,
   imageswatch,
   fileswatch,
   fontswatch } = require('../../appConfig');

// const html = require('./html').html;
const scripts = require('./scripts').scripts;
const styles = require('./styles').styles;
const images = require('./images').images;
// const browserSync = require('browser-sync').create();
const { watch } = require('gulp');

function startwatch() {
   watch(`${baseDir}/${preprocessor}/**/*`, {
      usePolling: true,
   }, styles);

   watch(`${baseDir}/images/**/*.{${imageswatch}}`, {
      usePolling: true,
   }, images);

   // watch(`${baseDir}/pages/**/*.njk`, {
   //    usePolling: true,
   // }, html);

   // watch([`${buildDir}/**/*.{${fileswatch}}`, `${buildDir}/fonts/*.{${fontswatch}}`], {
   //    usePolling: true,
   // }).on('change', browserSync.reload);

   watch([`${baseDir}/js/**/*.js`, `!${paths.scripts.dest}/*.min.js`], {
      usePolling: true,
   }, scripts);
}

module.exports = { startwatch };
