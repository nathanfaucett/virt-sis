var ejs = require("@nathanfaucett/ejs"),
    extend = require("@nathanfaucett/extend"),
    arrayForEach = require("@nathanfaucett/array-for_each"),
    path = require("@nathanfaucett/file_path"),
    fileUtils = require("@nathanfaucett/file_utils");


function compile(template, out, config, options, callback) {
    var opts;

    options = options || {};

    opts = {
        locals: options.data || (options.data = {}),
        settings: options.settings
    };

    arrayForEach(options.functions, function(fn) {
        extend(options.data, fn());
    });

    opts.locals.env = config.env;

    ejs.render(template, opts, function(err, str) {
        if (err) {
            callback(err);
            return;
        }

        fileUtils.writeFile(out, str, function(err) {
            callback(err);
        });
    });
}

module.exports = function(config) {
    return function(done) {
        compile(config.paths.ejs_src, config.paths.ejs_out, config, {
            data: {},
            functions: [
                function() {
                    return {
                        useLiveReload: config.env !== "production",
                        liveReloadPort: config.liveReloadPort
                    };
                }
            ]
        }, done);
    };
};
