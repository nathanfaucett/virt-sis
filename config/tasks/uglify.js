var fileUtils = require("@nathanfaucett/file_utils"),
    uglify = require("uglify-js");


module.exports = function(config) {
    return function(callback) {
        var result = uglify.minify(config.paths.js_out, {
            inSourceMap: config.paths.js_map_out,
            outSourceMap: "index.js.map",
            sourceMapUrl: "index.js.map"
        });

        fileUtils.writeFile(config.paths.js_map_out, result.map, function(error) {
            if (error) {
                callback(error);
            } else {
                fileUtils.writeFile(config.paths.js_out, result.code, callback);
            }
        });
    };
};
