let project_folder = require("path").basename(__dirname)
let soucre_folder = "#src"
let path = {
   build: {
      html: project_folder + "/",
      css: project_folder + "/css/",
      js: project_folder + "/js/",
      images: project_folder + "/images/",
   },
   src: {
      html: [soucre_folder + "/*.html", "!" + soucre_folder + "/_*.html"],
      css: soucre_folder + "/scss/style.scss",
      js: soucre_folder + "/js/script.js",
      images: soucre_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
   },
   watch: {
      html: soucre_folder + "/**/*.html",
      css: soucre_folder + "/scss/**/*.scss",
      js: soucre_folder + "/js/**/*.js",
      images: soucre_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}"
   },
   clean: "./" + project_folder + "/"
}

let {
   src,
   dest
} = require('gulp'),
   gulp = require('gulp'),
   browsersync = require('browser-sync').create(),
   fileinclude = require('gulp-file-include'),
   del = require('del'),
   scss = require('gulp-sass'),
   autoprefixer = require('gulp-autoprefixer'),
   group_media = require('gulp-group-css-media-queries'),
   clean_css = require('gulp-clean-css'),
   rename = require('gulp-rename'),
   uglify = require('gulp-uglify-es').default,
   imagemin = require('gulp-imagemin'),
   webp = require('gulp-webp'),
   webp_html = require('gulp-webp-html'),
   webpcss = require('gulp-webpcss');

function browserSync(params) {
   browsersync.init({
      server: {
         baseDir: "./" + project_folder + "/"
      },
      port: 3000,
      notify: false
   })
}

function html() {
   return src(path.src.html)
      .pipe(fileinclude())
      .pipe(webp_html())
      .pipe(dest(path.build.html))
      .pipe(browsersync.stream())
}

function watchFiles(param) {
   gulp.watch([path.watch.html], html);
   gulp.watch([path.watch.css], css);
   gulp.watch([path.watch.js], js);
   gulp.watch([path.watch.images], images);
}

function clean(param) {
   return del(path.clean)
}

function css() {
   return src(path.src.css)
      .pipe(
         scss({
            outputStyle: "expended"
         })
      )
      .pipe(
         group_media()
      )
      .pipe(
         autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
         })
      )
      .pipe(webpcss())
      .pipe(dest(path.build.css))
      .pipe(
         clean_css()
      )
      .pipe(
         rename({
            extname: ".min.css"
         })
      )
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
}

function js() {
   return src(path.src.js)
      .pipe(fileinclude())
      .pipe(dest(path.build.js))
      .pipe(
         uglify()
      )
      .pipe(
         rename({
            extname: ".min.js"
         })
      )
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream())
}
function images() {
   return src(path.src.images)
      .pipe(
         webp({
            quality: 70
         })
      )
      .pipe(dest(path.build.images))
      .pipe(src(path.src.images))
      .pipe(
         imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimiztionLevel: 3
         })
      )
      .pipe(dest(path.build.images))
      .pipe(browsersync.stream())
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images))
let watch = gulp.parallel(build, watchFiles, browserSync)
exports.images = images
exports.js = js
exports.css = css
exports.autoprefixer = autoprefixer
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch