const { buildDir } = require('../../appConfig');
const { paths } = require('../../paths');
const del          = require('del');

function cleanImg() {
   return del(`${paths.images.dest}/**/*`, {
      force: true,
   });
}

function cleanBuild() {
   return del(`${buildDir}/**/*`, {
      force: true,
   });
}

function cleanFonts() {
   return del(`${paths.fonts.dest}/**/*`, {
      force: true,
   });
}

module.exports = { cleanImg, cleanBuild, cleanFonts };
