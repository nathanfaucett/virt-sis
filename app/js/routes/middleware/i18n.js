var i18n = require("@nathanfaucett/i18n"),
    request = require("@nathanfaucett/request"),
    isString = require("@nathanfaucett/is_string"),
    UserStore = require("../../stores/UserStore");


var cache = {};


module.exports = i18nMiddleware;


function i18nMiddleware(ctx, next) {
    var locale = UserStore.user.locale;

    if (cache[locale] === true) {
        next();
    } else {
        request.get("locale/" + locale + ".json", {
            success: function(response) {
                cache[locale] = true;
                if (isString(response.data)) {
                    response.data = JSON.parse(response.data);
                }
                i18n.add(locale, response.data);
                next();
            },
            error: function(response) {
                next(response.data);
            }
        });
    }
}
