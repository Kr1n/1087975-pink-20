const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

const csso = require("gulp-csso");
const rename = require("gulp-rename");

const imagemin = require("gulp-imagemin");
const createwebp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const uglify = require('gulp-uglify');

// Clean

const clean = () => {
  return del("build");
}
exports.clean = clean;
// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/**.*{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/*.html",
    "source/css/normalize.min.css"
    ],
    {
      base: "source"
    })
  .pipe(gulp.dest("build"));
}
exports.copy = copy;

// Sprite

const sprite = () => {
  return gulp.src("source/img/**/icon*.svg")
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("source/img"))
}
exports.sprite = sprite;

// Webp

const webp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
  .pipe(createwebp({quality: 90}))
  .pipe(gulp.dest("source/img"))
}
exports.webp = webp;

// Images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
    ]))
}
exports.images = images;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
    ]))
  .pipe(csso())
  .pipe(rename("style.min.css"))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest("build/css"))
  .pipe(sync.stream());
}

exports.styles = styles;

// JS compress

const compress = () => {
  return gulp.src('source/js/*.js')
  .uglify()
  .pipe(rename("scritp.min.css"))
  .gulp.dest('source/js/')
}

exports.compress = compress;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.build = gulp.series(
  clean, copy, styles, sprite
  );

exports.default = gulp.series(
  build, server, watcher
  );
