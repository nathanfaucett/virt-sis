var apt = require("@nathanfaucett/apt"),
    page = require("@nathanfaucett/page"),
    cookies = require("@nathanfaucett/cookies"),
    request = require("@nathanfaucett/request"),
    i18n = require("@nathanfaucett/i18n"),

    router = require("./router"),

    i18nBound, RouteStore, UserStore;


var Application = apt.Application,
    app, SISApplicationPrototype;


function SISApplication() {

    Application.call(this);

    this.router = router;

    this.config = null;
    this.Component = null;
    this.page = page;
    this.i18n = null;

    this.pages = {};
}
Application.extend(SISApplication, "sis.Application");
SISApplicationPrototype = SISApplication.prototype;


app = module.exports = new SISApplication();


app.Component = require("./components/App");
i18nBound = require("./utils/i18n");
RouteStore = require("./stores/RouteStore");
UserStore = require("./stores/UserStore");


SISApplicationPrototype.init = function(config) {
    var _this = this,
        dispatcher = this.dispatcher;

    this.i18n = i18nBound;
    this.router = router;

    this.config = config;

    request.defaults.headers["Content-Type"] = "application/json";
    request.defaults.withCredentials = true;

    this.registerStore(require("./stores/RouteStore"));
    this.registerStore(require("./stores/UserStore"));

    page.on("request", function onRequest(ctx) {
        dispatcher.dispatch({
            type: RouteStore.consts.CHANGE,
            ctx: ctx
        });
    });

    UserStore.on("changeLocale", function onChangeLocale() {
        page.reload();
    });

    i18n.throwMissingError(config.throwMissingTranslationError);

    dispatcher.on("dispatch", function onDispatch() {
        cookies.set("sis.state", _this.toJSON());
    });
    this.fromJSON(cookies.get("sis.state"));

    if (config.env !== "production") {
        global.reset = function() {
            cookies.remove("sis.state");
            location.reload();
        };
    }

    this.emit("init");
};

SISApplicationPrototype.registerPage = function(name, render) {
    this.pages[name] = render;
};

SISApplicationPrototype.getPage = function(name) {
    return this.pages[name];
};

require("./views");
require("./routes");
