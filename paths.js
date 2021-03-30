const appConfig = require('./appConfig');
const baseDir = appConfig.baseDir;
const buildDir = appConfig.buildDir;
const preprocessor = appConfig.preprocessor;

const paths = {

   html: {
      src: `${baseDir}/pages/*.njk`,
      dest: `${buildDir}`,
   },

   scripts: {
      src: [
         // 'node_modules/jquery/dist/jquery.min.js', // order example (npm i --save-dev jquery)
         `${baseDir}/js/app.js`, // app.js. Always at the end
      ],
      dest: `${buildDir}/js`,
   },

   styles: {
      src: `${baseDir}/${preprocessor}/main.*`,
      dest: `${buildDir}/css`,
   },

   images: {
      srcAll: `${baseDir}/images/toScale/**/*.{png,jpg,jpeg,webp}`,
      srcPic: `${baseDir}/images/toScale/**/*.{png,jpg,jpeg}`,
      srcWebp: `${baseDir}/images/toScale/**/*.webp`,
      srcNoScale: `${baseDir}/images/ntScale/**/*.{png,jpg,jpeg,webp,svg}`,
      dest: `${buildDir}/images`,
   },

   fonts: {
      src: [`${baseDir}/fonts/**/*.*`, `!${baseDir}/fonts/src/**/*`],
      dest: `${buildDir}/fonts`,

   },

   deploy: {
      hostname: 'username@yoursite.com', // Deploy hostname
      destination: 'yoursite/public_html/', // Deploy destination
      include: [], // Included files to deploy
      exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files from deploy
   },

   cssOutputName: 'app.min.css',
   jsOutputName: 'app.min.js',

};

module.exports = { paths };
