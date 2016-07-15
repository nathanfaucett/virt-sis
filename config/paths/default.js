var path = require("@nathanfaucett/file_path");


var root = path.dir(path.dir(__dirname)),
    config = path.join(root, "config"),
    app = path.join(root, "app");


module.exports = {

    root: root,

    build: path.join(root, "build"),
    tmp: path.join(root, ".tmp"),
    config: config,

    app: path.join(root, "app"),

    locale: path.join(config, "locale"),
    fonts: path.join(app, "fonts"),
    img: path.join(app, "img"),

    js: path.join(root, "app", "js"),
    css: path.join(root, "app", "css")
};
