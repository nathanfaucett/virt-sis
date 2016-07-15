var vfs = require("vinyl-fs"),
    minifyJSON = require("gulp-jsonminify");


module.exports = function(config) {
    return function() {
        return vfs.src(config.paths.locale_out + "/**/*.json")
            .pipe(minifyJSON())
            .pipe(vfs.dest(config.paths.locale_out));
    };
};
