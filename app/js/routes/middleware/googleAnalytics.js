module.exports = googleAnalyticsMiddleware;


function googleAnalyticsMiddleware(ctx, next) {
    ga("send", "pageview", ctx.pathname);
    next();
}
