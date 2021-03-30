const htmlmin = require('html-minifier');
const pretty = require('pretty');
const { htmlBeautify, online, buildDir } = require('./appConfig');
// const picture = require('./gulp&11ty/plugins/eleventy-plugin-picture');

module.exports = function (eleventyConfig) {

   // eleventyConfig.addWatchTarget("app/pages");


   // //BrowserSync
   // eleventyConfig.setBrowserSyncConfig({
   //    server: {
   //       baseDir: `${buildDir}/`,
   //    },
   //    notify: false,
   //    online,
   //    browser: ['firefox'], // 'google chrome' 
   // });

   //HTML formatter
   eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
      if (outputPath.endsWith(".html")) {

         const minified = htmlmin.minify(content, {
            preserveLineBreaks: htmlBeautify,
            collapseWhitespace: true,
            conservativeCollapse: true
         });
         const formatted = pretty(minified, { indent_size: '2' });

         if (htmlBeautify == true) {
            return formatted;
         } else {
            return minified;
         }
      }
      return content;
   });

   //Plugins
   // eleventyConfig.addPlugin(picture, {
   //    media: {
   //       desktop: '(min-width: 1004px)',
   //       tablet: '(min-width: 684px)'
   //    },
   //    scale: [2, 3]
   // }
   // );


   //settings
   return {
      dir: {
         input: 'app/pages',
         output: 'build',
         includes: 'blocks',
         layouts: 'layouts'
      },
      dataTemplateEngine: 'njk',
      markdownTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk',
      passthroughFileCopy: true,
      templateFormats: [
         'md', 'njk'
      ],
   };
}
