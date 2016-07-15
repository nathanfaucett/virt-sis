var extend = require("@nathanfaucett/extend");


var utils = exports;


function loadModule(path) {
    var fullPath = require.resolve(path);
    delete require.cache[fullPath];
    return require(fullPath);
}

utils.loadSettings = function(env) {
    return extend({}, loadModule("./settings/default"), loadModule("./settings/" + env));
};

utils.loadPaths = function(env) {
    return extend({}, loadModule("./paths/default"), loadModule("./paths/" + env));
};
