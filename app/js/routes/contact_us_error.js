var RouteStore = require("../stores/RouteStore"),
    app = require("../app");


app.router.route(
    "/contact_us_error",
    function handleRoot(ctx, next) {
        app.dispatchAction({
            type: RouteStore.consts.UPDATE,
            state: "home",
            ctx: ctx
        });
        alert("Invalid Form Data");
        ctx.end();
        next();
    }
);
