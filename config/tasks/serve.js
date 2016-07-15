var connect = require("gulp-connect"),
    livereload = require("@nathanfaucett/livereload");


module.exports = function(config) {
    return function(done) {

        livereload.listen({
            port: config.liveReloadPort
        });

        connect.server({
            root: config.paths.root_serve,
            port: config.port,
            livereload: false
        });
    };
};
