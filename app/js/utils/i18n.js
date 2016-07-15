var i18n = require("@nathanfaucett/i18n"),
    fastSlice = require("@nathanfaucett/fast_slice"),
    UserStore = require("../stores/UserStore");


module.exports = i18nBound;


function i18nBound(key) {
    return i18n(UserStore.user.locale, key, fastSlice(arguments, 1));
}
