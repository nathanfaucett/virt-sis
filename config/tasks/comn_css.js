var config = require("../application"),
    comnCss = require("@nathanfaucett/comn_css"),
    path = require("@nathanfaucett/file_path"),
    less = require("less"),
    fileUtils = require("@nathanfaucett/file_utils");


function compile(options, callback) {
    var out, error;

    try {
        out = comnCss(options.index, options);
    } catch(e) {
        error = e;
    }

    if (error) {
        callback(error);
    } else {
        less.render(out, options.less, function(error, lessOut) {
            if (error) {
                callback(error);
            } else {
                fileUtils.writeFile(options.out, lessOut.css, callback);
            }
        });
    }
}

module.exports = function(config) {
    return function(done) {
        compile({
            index: config.paths.css_src,
            out: config.paths.css_out,
            less: {
                compress: config.env === "production",
                optimization: 0,
                ieCompat: true
            }
        }, done);
    };
};
