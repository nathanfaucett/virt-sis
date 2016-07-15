var fs = require("fs"),
    path = require("@nathanfaucett/file_path"),
    isObject = require("@nathanfaucett/is_object"),
    extend = require("@nathanfaucett/extend"),
    objectForEach = require("@nathanfaucett/object-for_each"),
    fileUtils = require("@nathanfaucett/file_utils");


function flatten(obj) {
    var out = {};

    objectForEach(obj, function(value, key) {
        if (isObject(value)) {
            objectForEach(flatten(value), function(v, k) {
                out[key + "." + k] = v;
            });
        } else {
            out[key] = value;
        }
    });

    return out;
}

module.exports = function(config) {
    return function(callback) {
        var locales = config.settings.locales,
            flatLocaleMode = config.settings.flatLocaleMode,
            length = locales.length,
            called = false;

        function done(err) {
            if (called !== true) {
                if (--length === 0 || err) {
                    called = true;
                    callback(err);
                }
            }
        }

        objectForEach(locales, function(locale) {
            var localeObject = {};

            fileUtils.dive(path.join(config.paths.locale, locale), function(stat, next) {
                fs.readFile(stat.path, function(err, buffer) {
                    var json;

                    if (err) {
                        next(err);
                    } else {
                        try{
                            json = JSON.parse(buffer.toString());
                        } catch(e) {
                            next(e);
                            return;
                        }

                        if (flatLocaleMode) {
                            json = flatten(json);
                        }

                        extend(localeObject, json);
                        next();
                    }
                });
            }, function(err) {
                if (err) {
                    done(err);
                } else {
                    fileUtils.writeFile(
                        config.paths.locale_out + "/" + locale + ".json",
                        JSON.stringify(localeObject, null, 2),
                        done
                    );
                }
            });
        });
    };
};
