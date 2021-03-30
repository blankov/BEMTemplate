const { src, dest, series } = require('gulp');
const { paths } = require('../../paths');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const { compareLastModifiedTime } = require('gulp-changed');
const { retinaOpts } = require('../../appConfig');
const sharp = require('sharp');
const { parse } = require('path');
const through = require('through2');
const webp = require('webp-converter');

// Фильтр, исключающий картинки по query в имени из массива
function filter(array, query) {
   return array.filter(el => {
      return el.toLowerCase().indexOf(query.toLowerCase()) < 0;
   })
}

// Функция скейла картинок оригинального размера
function imageScale(files) {
   const imagesList = filter(files, '@');

   for (let i = 0; i < imagesList.length; i++) {
      const image = imagesList[i];
      const currentImage = sharp(image);
      const nP = parse(image);

      for (let id = 0; id < retinaOpts.length; id++) {
         const retina = retinaOpts[id];

         currentImage
            .metadata()
            .then(metadata => {
               return currentImage
                  .resize(Math.round(metadata.width * retina.x))
                  .toFile(nP.dir + '/' + nP.name + retina.suffix + nP.ext)
            });
      }
   }
   console.log('Rescaled ' + imagesList.length + ' images')
   console.log(imagesList)
}

// Функция конвертации картинок в .webp
function imageConvert(files) {

   for (let i = 0; i < files.length; i++) {
      const inputImage = files[i];
      const nP = parse(inputImage);
      const outputFolder = paths.images.dest + '/';
      const outputImage = nP.name + '.webp';
      const output = outputFolder + outputImage;

      //cwebp(input,output,option)

      const convertTo = webp.cwebp(inputImage, output, "-q 50"/* , logging = "-v" */);

      convertTo.then((response) => {
         console.log(response);
      });
   }
}

// Таск скейла картинок
function imagesResize() {
   const files = [];
   return src(paths.images.srcAll)
      .pipe(changed(paths.images.dest),
         { hasChanged: compareLastModifiedTime })
      // { extension: ['.jpg', '.jpeg', '.png', '.webp'] }))
      .pipe(through.obj((file, _enc, cb) => {
         files.push(file.path);
         cb(null, file);
      }, (rescaleImages) => {
         rescaleImages();
         imageScale(files)
         // console.log('files :', files); //images chosen for rescale
      }));
}

// Таск конвертации картинок
function imagesToWebp() {
   const files = [];
   return src(paths.images.srcPic)
      .pipe(changed(paths.images.dest,
         { extension: ['.webp'] }))
      .pipe(through.obj((file, _enc, cb) => {
         files.push(file.path);
         cb(null, file);
      }, (convertImages) => {
         convertImages();
         imageConvert(files)
         console.log('files to convert:', files);
      }));
}

// Таск оптимизации картинок
function imagesOpt() {
   return src(paths.images.srcPic)
      .pipe(changed(paths.images.dest,
         { hasChanged: compareLastModifiedTime },
         { extension: ['.jpg', '.jpeg', '.png'] }))
      .pipe(imagemin([
         imagemin.mozjpeg({
            quality: 90,
            progressive: true,
         }),
         imagemin.optipng({ optimizationLevel: 5 }),
      ]))
      .pipe(dest(paths.images.dest));
}

// Таск копирования картинок не нуждающихся в оптимизации и скейле
function imagesDest() {
   return src([paths.images.srcNoScale, paths.images.srcWebp])
      .pipe(changed(paths.images.dest))
      .pipe(dest(paths.images.dest));
}

const images = series(imagesResize, imagesOpt, imagesDest, imagesToWebp);

module.exports = { images };
