var apt = require("@nathanfaucett/apt"),
    googleAnalytics = require("../googleAnalytics"),
    app = require("../app");


var Store = apt.Store,
    RouteStorePrototype,

    _route = {
        context: {},
        state: null
    };


function RouteStore() {
    Store.call(this);
}
Store.extend(RouteStore, "tarjeta.RouteStore", [
    "CHANGE",
    "UPDATE"
]);
RouteStorePrototype = RouteStore.prototype;


function RouteStore_update(ctx, state) {
    var context = _route.context;

    context.fullUrl = ctx.fullUrl;
    context.pathname = ctx.pathname;
    context.query = ctx.query;
    context.params = ctx.params;

    googleAnalytics("set", "page", ctx.pathname);
    _route.state = state;
}

function RouteStore_handleContext(ctx) {
    app.router.handler(ctx, function onHandle(error) {
        if (error) {
            throw error;
        }
    });
}

RouteStorePrototype.getState = function() {
    return _route.state;
};

RouteStorePrototype.getContext = function() {
    return _route.context;
};

RouteStorePrototype.toJSON = function() {
    return _route;
};

RouteStorePrototype.fromJSON = function(json) {
    _route = json;
};

RouteStorePrototype.handler = function(action) {
    var consts = this.consts;

    switch (action.type) {
        case consts.CHANGE:
            RouteStore_handleContext(action.ctx);
            break;
        case consts.UPDATE:
            RouteStore_update(action.ctx, action.state);
            this.emitChange();
            break;
    }
};


module.exports = new RouteStore();
