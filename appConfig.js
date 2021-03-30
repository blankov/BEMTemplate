const preprocessor = 'scss'; // Preprocessor name
const fileswatch = 'html,htm,txt,json,md'; // List of files extensions for watching & hard reload (comma separated)
const fontswatch = 'woff, woff2'; // List of
const imageswatch = 'jpg,jpeg,png,webp,svg'; // List of images extensions for watching & compression (comma separated)
const baseDir = 'app'; // Base directory path without «/» at the end
const buildDir = 'build'; // Base directory path without «/» at the end
const online = true; // If «false» - Browsersync will work offline without internet connection
const htmlBeautify = true; // If «false» - Html will not be formatted.

//IMAGES config
const retinaOpts = [
   {
      x: 2,
      suffix: '@2x'
   },
   {
      x: 3,
      suffix: '@3x'
   }
];




module.exports = {
   preprocessor, fileswatch, fontswatch, imageswatch, baseDir, buildDir, online, retinaOpts, htmlBeautify
};
