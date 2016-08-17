var apply = require("@nathanfaucett/apply");


module.exports = googleAnalytics;


function googleAnalytics() {
    if (typeof(ga) !== "undefined") {
        return apply(ga, arguments);
    }
}
