let project_folder = "dist"; // Выводные файлы
let source_folder = "src";  //Исходники
let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/'
    },
    src: {
        html: source_folder + '/*.html',
        css: source_folder + '/assets/sass/styles.scss',
        js: source_folder + '/assets/js/scripts.js',
        img: source_folder + '/assets/img/**/*.{jpg,png,svg,ico,webp,gif}',
        fonts: source_folder + '/assets/fonts/*.ttf'
    },
    watch: { //наблюдение за
        html: source_folder + '/**/*.html',
        css: source_folder + '/assets/sass/**/*.scss',
        js: source_folder + '/assets/js/**/*.js',
        img: source_folder + '/assets/img/**/*.{jpg,png,svg,ico,webp,gif}'
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),//Группирует медиа запросы ставит их в конец файла
    clean_css = require('gulp-clean-css'),//Чистит сжимает файл css
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default, //Cжатие оптимизация js
    imagemin = require('gulp-imagemin'), // Оптимизация картинок
    sassGlob = require('gulp-sass-glob');// Для импортов наверное
    fileinclude = require('gulp-file-include');// Подключает файлы @@include('header.html')
    ttf2woff = require('gulp-ttf2woff'); //Создает woff из ttf
    ttf2woff2 = require('gulp-ttf2woff2');////Создает woff2 из ttf


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/",
        },
        port: 3000,
        notify: false
    })
} //Синхронизация браузером
function html() {
    return src(path.src.html) //Берем файлы
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
          }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css(params) {
    return src(path.src.css) //Берем файлы
        .pipe(sassGlob()) //Для импортов наверное
        .pipe(
            sass({
                outputStyle: 'expanded' // развернутые
            })
        )
        .pipe(group_media())
        .pipe(autoprefixer())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}
function js() {
    return src(path.src.js) //Берем файлы
        .pipe(dest(path.build.js))
        // .pipe(uglify())
        // .pipe(
        //     rename({
        //         extname: ".min.js"
        //     })
        // )
        // .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}
function images() {
    return src(path.src.img) //Берем файлы
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts(params){
  src(path.src.fonts) //Берем файлы
  .pipe(ttf2woff())
  .pipe(dest(path.build.fonts))
  return src(path.src.fonts)
  .pipe(ttf2woff2())
  .pipe(dest(path.build.fonts))
}
function watchfiles(params) {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)
}

let build = gulp.series(gulp.parallel(html, css, js, images, fonts));
let watch = gulp.parallel(build, watchfiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.css = css;
exports.js = js;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;


