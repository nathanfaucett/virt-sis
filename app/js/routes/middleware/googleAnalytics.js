var googleAnalytics = require("../../googleAnalytics");


module.exports = googleAnalyticsMiddleware;


function googleAnalyticsMiddleware(ctx, next) {
    googleAnalytics("send", "pageview", ctx.pathname);
    next();
}
