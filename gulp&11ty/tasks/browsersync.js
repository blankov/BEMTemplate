const { buildDir, online } = require('../../appConfig');
const browserSync  = require('browser-sync').create();

function browsersync() {
   browserSync.init({
      server: {
         baseDir: `${buildDir}/`,
      },
      notify:  false,
      online,
      browser: ['firefox'], // 'google chrome',
   });
}


module.exports = { browsersync };
