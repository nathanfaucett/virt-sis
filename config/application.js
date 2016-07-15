var extend = require("@nathanfaucett/extend"),
    utils = require("./utils");


var env = process.env.NODE_ENV || "development",
    port = process.env.PORT || 4000,
    liveReloadPort = process.env.LIVERELOAD_PORT || 35729;


module.exports = {
    port: port,
    env: env,
    liveReloadPort: liveReloadPort,

    utils: utils,
    settings: utils.loadSettings(env),
    paths: utils.loadPaths(env)
};
