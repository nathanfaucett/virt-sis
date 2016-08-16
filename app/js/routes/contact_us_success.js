var RouteStore = require("../stores/RouteStore"),
    app = require("../app");


app.router.route(
    "/contact_us_success",
    function handleRoot(ctx, next) {
        app.dispatchAction({
            type: RouteStore.consts.UPDATE,
            state: "home",
            ctx: ctx
        });
        ctx.end();
        next();
    }
);
