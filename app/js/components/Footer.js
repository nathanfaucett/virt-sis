var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types");


var FooterPrototype;


module.exports = Footer;


function Footer(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Footer, "Footer");

Footer.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

FooterPrototype = Footer.prototype;

FooterPrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        styles = {
            root: {},

            wrapper: {
                margin: "0 auto",
                padding: "0",
                maxWidth: "768px"
            },

            top: {
                background: theme.palette.primary3Color,
                textAlign: "center"
            },
            slogan: {
                padding: "64px 0px",
                margin: "0px",
                color: theme.palette.canvasColor
            },

            bottom: {
                fontSize: "16px",
                lineHeight: "16px",
                color: theme.palette.grey1Color,
                background: theme.palette.grey3Color
            },
            location: {
                padding: "64px 32px 64px 16px"
            },
            locationP: {
                margin: "8px 0px"
            },

            copyright: {
                background: theme.palette.grey2Color,
                padding: "64px 0px 64px 16px"
            },
            copyrightH: {
                margin: "8px 0px",
                color: theme.palette.canvasColor
            },
            copyrightP: {
                margin: "8px 0px"
            }
        };

    return styles;
};

FooterPrototype.render = function() {
    var context = this.context,
        i18n = context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Footer",
                style: styles.root
            },
            virt.createView("div", {
                    style: styles.top
                },
                virt.createView("div", {
                        style: styles.wrapper
                    },
                    virt.createView("h1", {
                            style: styles.slogan
                        },
                        i18n("footer.slogan")
                    )
                )
            ),
            virt.createView("div", {
                    style: styles.bottom
                },
                virt.createView("div", {
                        style: styles.wrapper
                    },
                    virt.createView("div", {
                            className: "grid"
                        },
                        virt.createView("div", {
                                className: "col-xs-12 col-sm-12 col-md-6 col-lg-6"
                            },
                            virt.createView("div", {
                                    style: styles.location
                                },
                                virt.createView("p", {
                                    style: styles.locationP
                                }, i18n("app.name")),
                                virt.createView("p", {
                                    style: styles.locationP
                                }, i18n("footer.address")),
                                virt.createView("p", {
                                    style: styles.locationP
                                }, i18n("footer.phone"))
                            )
                        ),
                        virt.createView("div", {
                                className: "col-xs-12 col-sm-12 col-md-6 col-lg-6"
                            },
                            virt.createView("div", {
                                    style: styles.copyright
                                },
                                virt.createView("h3", {
                                    style: styles.copyrightH
                                }, i18n("footer.copyright.qualified")),
                                virt.createView("h3", {
                                    style: styles.copyrightH
                                }, i18n("footer.copyright.certified")),
                                virt.createView("h3", {
                                    style: styles.copyrightH
                                }, i18n("footer.copyright.ndt")),
                                virt.createView("p", {
                                        style: styles.copyrightP
                                    },
                                    "© " + ((new Date()).getFullYear()) + " " + i18n("app.name")
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};
