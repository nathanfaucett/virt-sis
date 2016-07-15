var del = require("del");


module.exports = function(config) {
    return function (done) {
        del([
            config.paths.build,
            config.paths.ejs_out,
            config.paths.js_out,
            config.paths.css_out,
            config.paths.locale_out
        ], done);
    };
};
