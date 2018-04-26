"use strict";
var gulp = require("gulp"),
uglify = require("gulp-uglify"),
babel = require("gulp-babel");
gulp.task("convert-framework",
function() {
    return gulp.src(["./framework/**/*.js"]).pipe(babel({
        presets: ["es2015", "stage-3"],
        plugins: ["transform-runtime"]
    })).pipe(uglify({
        mangle: !0,
        compress: !0
    })).pipe(gulp.dest("dist/framework"))
}),
gulp.task("convert-js",
function() {
    return gulp.src(["./*.js"]).pipe(babel({
        presets: ["es2015", "stage-3"],
        plugins: ["transform-runtime"]
    })).pipe(uglify()).pipe(gulp.dest("dist/"))
}),
gulp.task("copy",
function() {
    return gulp.src(["./vm2*/*.js", "./framework*/*.json", "./package.json"]).pipe(gulp.dest("dist/"))
}),
gulp.task("default", ["convert-framework", "convert-js", "copy"]);