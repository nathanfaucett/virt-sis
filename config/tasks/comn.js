var comn = require("@nathanfaucett/comn"),
    path = require("@nathanfaucett/file_path"),
    fileUtils = require("@nathanfaucett/file_utils");


function compile(options, callback) {
    var out, error, entry;

    try {
        out = comn(options.index, options);
    } catch(e) {
        error = e;
    }

    if (error) {
        callback(error);
    } else {
        entry = out.entry();

        if (options.generateSourceMap) {
            entry.generateSourceMap();
        }

        fileUtils.writeFile(
            options.out,
            entry.source, + "\n//# sourceMappingURL=index.js.map",
            function(error) {
                if (error) {
                    callback(error);
                } else {
                    if (options.generateSourceMap) {
                        fileUtils.writeFile(options.outSourceMap, entry.sourceMap.toJSON(), callback);
                    } else {
                        callback();
                    }
                }
            }
        );
    }
}

module.exports = function(config) {
    return function(done) {
        compile({
            index: config.paths.js_src,
            out: config.paths.js_out,
            generateSourceMap: true,
            outSourceMap: config.paths.js_map_out
        }, done);
    };
};
