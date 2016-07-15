var virt = require("@nathanfaucett/virt"),
    app = require("../app"),
    LayoutApp = require("../components/layouts/LayoutApp");


app.registerPage("not_found", function renderNotFoundPage(ctx) {
    return (
        virt.createView(LayoutApp, {
            ctx: ctx,
            i18n: app.i18n,
            render: function() {
                return (
                    virt.createView("div", {
                            className: "wrap"
                        },
                        virt.createView("div", {
                                className: "page not-found"
                            },
                            virt.createView("h1", app.i18n("errors.not_found"))
                        )
                    )
                );
            }
        })
    );
});
