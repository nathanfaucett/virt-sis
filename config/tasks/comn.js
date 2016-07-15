var comn = require("@nathanfaucett/comn"),
    path = require("@nathanfaucett/file_path"),
    fileUtils = require("@nathanfaucett/file_utils");


function compile(options, callback) {
    var out, error;

    try {
        out = comn(options.index, options);
    } catch(e) {
        error = e;
    }

    if (error) {
        callback(error);
    } else {
        fileUtils.writeFile(options.out, out, callback);
    }
}

module.exports = function(config) {
    return function(done) {
        compile({
            index: config.paths.js_src,
            out: config.paths.js_out
        }, done);
    };
};
