var fs = require("fs"),
    fileUtils = require("@nathanfaucett/file_utils"),
    uglify = require("uglify-js");


module.exports = function(config) {
    return function(callback) {
        var result = uglify.minify(config.paths.js_out, {
                inSourceMap: config.paths.js_map_out,
                outSourceMap: "index.js.map",
                sourceMapUrl: "index.js.map"
            }),
            origSourceMap = JSON.parse(fs.readFileSync(config.paths.js_map_out).toString("utf-8")),
            sourceMap = JSON.parse(result.map);

        sourceMap.sourcesContent = origSourceMap.sourcesContent;

        fileUtils.writeFile(config.paths.js_map_out, JSON.stringify(sourceMap), function(error) {
            if (error) {
                callback(error);
            } else {
                fileUtils.writeFile(config.paths.js_out, result.code, callback);
            }
        });
    };
};
