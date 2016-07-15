var RouteStore = require("../stores/RouteStore"),
    app = require("../app");


app.router.use(
    function handleNotFound(ctx, next) {
        if (ctx.route) {
            next();
        } else {
            app.dispatchAction({
                type: RouteStore.consts.UPDATE,
                state: "not_found",
                ctx: ctx
            });
            ctx.end();
            next();
        }
    }
);
