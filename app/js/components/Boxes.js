var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types");


var BoxesPrototype;


module.exports = Boxes;


function Boxes(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Boxes, "Boxes");

BoxesPrototype = Boxes.prototype;

Boxes.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

BoxesPrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        size = context.size,

        styles = {
            root: {
                position: "relative"
            },
            boxesHolder: {
                width: "100%",
                position: "absolute",
                top: "-145px"
            },
            boxesContent: {
                maxWidth: "640px",
                margin: "0 auto"
            },

            boxesLeft: {
                width: "49.999%",
                "float": "left"
            },
            boxesLeftInner: {
                textAlign: "center",
                padding: "64px 0",
                margin: "48px 0",
                background: theme.palette.grey1Color
            },
            boxesH1: {
                fontSize: "72px",
                lineHeight: "72px",
                margin: "0"
            },

            boxesRight: {
                width: "49.999%",
                "float": "left"
            },
            boxesRightInner: {
                padding: "32px 8px 16px 48px",
                background: theme.palette.grey3Color
            },
            boxesTitle: {
                margin: "16px 0px",
                color: theme.palette.canvasColor
            },
            boxesBody: {
                margin: "8px 0px",
                color: theme.palette.grey1Color
            },
            boxesLink: {
                margin: "16px 0px",
                color: theme.palette.accent1Color
            },

            equals: {
                position: "relative",
                "float": "left"
            },
            equalsContent: {
                position: "absolute",
                left: "-32px",
                top: "120px",
                width: "64px",
                height: "64px",
                textAlign: "center",
                background: theme.palette.canvasColor
            },
            equalsP: {
                margin: "0",
                fontSize: "96px",
                lineHeight: "56px",
                paddingLeft: "2px"
            }
        };

    css.borderRadius(styles.equalsContent, "50%");

    if (size.width < 640) {
        delete styles.boxesHolder.position;
        delete styles.boxesHolder.top;

        styles.boxesLeftInner.margin = "0px";
        styles.boxesLeftInner.padding = "32px 0";

        styles.equalsContent.top = "104px";
        delete styles.equalsContent.left;
        styles.equalsContent.right = ((size.width / 2) - 32) + "px";

        styles.boxesRight.width = "100%";
        styles.boxesLeft.width = "100%";
    }

    return styles;
};

BoxesPrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Boxes",
                style: styles.root
            },
            virt.createView("div", {
                    style: styles.boxesHolder
                },
                virt.createView("div", {
                        style: styles.boxesContent
                    },
                    virt.createView("div", {
                            style: styles.boxesLeft
                        },
                        virt.createView("div", {
                                style: styles.boxesLeftInner
                            },
                            virt.createView("h1", {
                                style: styles.boxesH1
                            }, i18n("home.boxes.we"))
                        )
                    ),
                    virt.createView("div", {
                            style: styles.equals
                        },
                        virt.createView("div", {
                                style: styles.equalsContent
                            },
                            virt.createView("p", {
                                style: styles.equalsP
                            }, "=")
                        )
                    ),
                    virt.createView("div", {
                            style: styles.boxesRight
                        },
                        virt.createView("div", {
                                style: styles.boxesRightInner
                            },
                            virt.createView("h1", {
                                style: styles.boxesTitle
                            }, i18n("home.boxes.title")),
                            virt.createView("h3", {
                                style: styles.boxesBody
                            }, i18n("home.boxes.body0")),
                            virt.createView("h3", {
                                style: styles.boxesBody
                            }, i18n("home.boxes.body1")),
                            virt.createView("h3", {
                                style: styles.boxesBody
                            }, i18n("home.boxes.body2")),
                            virt.createView("a", {
                                style: styles.boxesLink
                            }, i18n("home.boxes.link"))
                        )
                    ),
                    virt.createView("div", {
                        className: "clear"
                    })
                )
            )
        )
    );
};
