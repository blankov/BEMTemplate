// LOGIC
const {
   cleanImg,
   cleanBuild,
   cleanFonts } = require('./gulp&11ty/tasks/cleanThings');
const {
   deploy,
   ghDeploy } = require('./gulp&11ty/tasks/deploy');
const { scripts } = require('./gulp&11ty/tasks/scripts');
const { styles } = require('./gulp&11ty/tasks/styles');
const { images } = require('./gulp&11ty/tasks/images');
const { fonts } = require('./gulp&11ty/tasks/fonts');
// const { browsersync } = require('./gulp&11ty/tasks/browsersync');
const { startwatch } = require('./gulp&11ty/tasks/startwatch');

const {
   series, parallel
} = require('gulp');

exports.assets = series(cleanImg, styles, scripts, images);
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.cleanImg = cleanImg;
exports.cleanBuild = cleanBuild;
exports.cleanFonts = cleanFonts;
exports.deploy = deploy;
exports.ghDeploy = ghDeploy;
exports.default = parallel(images, styles, scripts, fonts, /* browsersync, */ startwatch);

// exports.log = require('./gulp&11ty/tasks/images').imagesToWebp;
// exports.log2 = test;


