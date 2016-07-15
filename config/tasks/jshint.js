var vfs = require("vinyl-fs"),
    jshint = require("gulp-jshint");


module.exports = function(config) {
    return function() {
        return vfs.src(config.paths.js + "/**/*.js")
            .pipe(jshint({
                es3: true,
                unused: true,
                curly: true,
                eqeqeq: true,
                expr: true,
                eqnull: true,
                proto: true
            }))
            .pipe(jshint.reporter("default"))
            .pipe(jshint.reporter("fail"));
    };
};
