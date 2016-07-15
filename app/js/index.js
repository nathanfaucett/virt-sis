var virt = require("@nathanfaucett/virt"),
    virtDOM = require("@nathanfaucett/virt-dom"),

    environment = require("@nathanfaucett/environment"),
    eventListener = require("@nathanfaucett/event_listener"),

    config = require("./config"),
    app = require("./app");


eventListener.on(environment.window, "load DOMContentLoaded", function() {
    var page = app.page;

    virtDOM.render(virt.createView(app.Component), environment.document.getElementById("app"));

    page.setHtml5Mode(config.html5Mode, function onSetHtml5Mode() {
        app.init(config);
        page.listen();
    });
});
