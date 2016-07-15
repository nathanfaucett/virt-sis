var vfs = require("vinyl-fs"),
    filePath = require("@nathanfaucett/file_path"),
    minifyCSS = require("gulp-minify-css");


module.exports = function(config) {
    return function() {
        return vfs.src(config.paths.css_out)
            .pipe(minifyCSS())
            .pipe(vfs.dest(filePath.dir(config.paths.css_out)));
    };
};
