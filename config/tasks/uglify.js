var vfs = require("vinyl-fs"),
    filePath = require("@nathanfaucett/file_path"),
    uglify = require("gulp-uglify");


module.exports = function(config) {
    return function() {
        return vfs.src(config.paths.js_out)
            .pipe(uglify())
            .pipe(vfs.dest(filePath.dir(config.paths.js_out)));
    };
};
