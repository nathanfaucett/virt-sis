var vfs = require("vinyl-fs"),
    filePath = require("@nathanfaucett/file_path"),
    minifyHTML = require("gulp-minify-html");


module.exports = function(config) {
    return function() {
        return vfs.src(config.paths.ejs_out)
            .pipe(minifyHTML())
            .pipe(vfs.dest(filePath.dir(config.paths.ejs_out)));
    };
};
