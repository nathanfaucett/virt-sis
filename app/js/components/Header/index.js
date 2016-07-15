var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    Wrapper = require("../Wrapper");


var HeaderPrototype;


module.exports = Header;


function Header(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Header, "Header");

HeaderPrototype = Header.prototype;

Header.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

HeaderPrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        size = context.size,
        styles = {
            root: {
                height: "48px"
            },

            logo: {
                textAlign: "left"
            },
            logoA: {
                padding: "8px"
            },
            logoImg: {
                height: "32px"
            },

            name: {
                color: theme.palette.grey1Color,
                textAlign: "center",
                margin: "0",
                padding: "16px 0px",
                fontSize: "16px",
                lineHeight: "16px"
            },

            menu: {
                textAlign: "right"
            },
            menuA: {
                padding: "16px"
            },
            menuImg: {
                height: "16px"
            }
        };

    if (size.width < 768) {
        styles.name.display = "none";
    }

    return styles;
};

HeaderPrototype.render = function() {
    var context = this.context,
        i18n = context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Header",
                style: styles.root
            },
            virt.createView(Wrapper, null,
                virt.createView("div", {
                        className: "grid"
                    },
                    virt.createView("div", {
                            className: "col-xs-6 col-sm-6 col-md-4 col-lg-4"
                        },
                        virt.createView("div", {
                                style: styles.logo
                            },
                            virt.createView("a", {
                                    style: styles.logoA,
                                    href: "/"
                                },
                                virt.createView("img", {
                                    style: styles.logoImg,
                                    src: "img/logo.png"
                                })
                            )
                        )
                    ),
                    virt.createView("div", {
                            className: "col-xs-6 col-sm-6 col-md-4 col-lg-4"
                        },
                        virt.createView("p", {
                            style: styles.name
                        }, i18n("app.name"))
                    ),
                    virt.createView("div", {
                            className: "col-xs-6 col-sm-6 col-md-4 col-lg-4"
                        },
                        virt.createView("div", {
                                style: styles.menu
                            },
                            virt.createView("a", {
                                    style: styles.menuA
                                },
                                virt.createView("img", {
                                    style: styles.menuImg,
                                    src: "img/menu.png"
                                })
                            )
                        )
                    )
                )
            )
        )
    );
};
