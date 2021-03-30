const src = require('gulp');
const { paths }= require('../../paths');
const { buildDir } = require('../../appConfig');
const rsync        = require('gulp-rsync');
const ghPages      = require('gh-pages');
const path         = require('path');

function deploy() {
   return src(`${buildDir}/`)
      .pipe(rsync({
         root:        `${buildDir}/`,
         hostname:    paths.deploy.hostname,
         destination: paths.deploy.destination,
         include:     paths.deploy.include,
         exclude:     paths.deploy.exclude,
         recursive:   true,
         archive:     true,
         silent:      false,
         compress:    true,
      }));
}

function ghDeploy(cb) {
   ghPages.publish(path.join(process.cwd(), `./${buildDir}`), cb);
}

module.exports = { deploy, ghDeploy };
