var apt = require("@nathanfaucett/apt"),
    cookies = require("@nathanfaucett/cookies"),
    indexOf = require("@nathanfaucett/index_of"),
    emptyFunction = require("@nathanfaucett/empty_function"),
    HEADER_LOCALE = require("../consts/HEADER_LOCALE"),
    app = require("../app");


var Store = apt.Store,

    navigatorLanguage = (
        navigator.language ||
        (navigator.userLanguage && navigator.userLanguage.replace(/-[a-z]{2}$/, String.prototype.toUpperCase)) ||
        "en"
    ),

    UserStorePrototype,

    defaultLocale, userStore;


function UserStore() {

    Store.call(this);

    this.user = {
        locale: null
    };
}
Store.extend(UserStore, "sis.UserStore", [
    "CHANGE_LOCALE"
]);
UserStorePrototype = UserStore.prototype;

UserStorePrototype.toJSON = function() {
    return {
        user: this.user
    };
};

UserStorePrototype.fromJSON = function(json) {
    this.user.locale = json.locale || defaultLocale;
};

UserStorePrototype.setLocale = function(value, callback) {
    var changed = UserStore_setLocale(_this, value);
    (callback || emptyFunction)();
    return changed;
};

function UserStore_setLocale(_this, value) {
    var last = _this.user.locale;

    value = indexOf(app.config.locales, value) === -1 ? app.config.locales[0] : value;

    if (last !== value) {
        _this.user.locale = value;
        cookies.set(HEADER_LOCALE, value);
        return true;
    } else {
        return false;
    }
}

UserStorePrototype.handler = function(action) {
    switch (action.type) {
        case this.consts.CHANGE_LOCALE:
            if (this.setLocale(action.locale)) {
                this.emit("changeLocale");
            }
            break;
    }
};


userStore = module.exports = new UserStore();


app.on("init", function onInit() {
    var locales = app.config.locales,
        locale = cookies.get(HEADER_LOCALE);

    if (indexOf(locales, locale) === -1) {
        locale = indexOf(locales, navigatorLanguage) !== -1 ? navigatorLanguage : locales[0];
    }

    defaultLocale = locale;
    UserStore_setLocale(userStore, defaultLocale);
});
