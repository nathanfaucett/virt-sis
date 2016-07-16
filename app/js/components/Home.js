var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types"),
    eventListener = require("@nathanfaucett/event_listener"),
    Boxes = require("./Boxes"),
    Services = require("./Services"),
    Wrapper = require("./Wrapper");


var HomePrototype;


module.exports = Home;


function Home(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.onScroll = function(e) {
        return _this.__onScroll(e);
    };
}
virt.Component.extend(Home, "Home");

HomePrototype = Home.prototype;

Home.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

HomePrototype.__onScroll = function() {
    this.forceUpdate();
};

HomePrototype.componentDidMount = function() {
    eventListener.on(window, "scroll", this.onScroll);
};

HomePrototype.componentWillUnmount = function() {
    eventListener.off(window, "scroll", this.onScroll);
};

HomePrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        size = context.size,

        styles = {
            root: {
                position: "relative"
            },

            container: {
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: "100%"
            },

            glare: {
                position: "absolute",
                top: (32 + (window.scrollY * 2)) + "px",
                left: "50%",
                width: "320px",
                height: "100%",
                background: theme.palette.canvasColor
            },

            content: {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%"
            },
            contentHolder: {
                maxWidth: "640px",
                margin: "0 auto",
                paddingTop: "18%",
                color: theme.palette.canvasColor
            },
            title: {
                fontSize: "52px",
                lineHeight: "52px",
                margin: "0"
            },
            body: {
                fontSize: "24px",
                lineHeight: "24px",
                margin: "0"
            },

            pageContent: {
                margin: "256px auto 0px",
                maxWidth: "640px"
            },
            pageTitle: {
                textAlign: "center"
            },
            pageBody: {
                paddingBottom: "64px"
            },
            highlight: {
                color: theme.palette.accent1Color
            },

            footer: {
                marginBottom: "-1px"
            }
        };

    if (size.width < 960) {
        delete styles.contentHolder.paddingTop;
        styles.contentHolder.padding = "5%";
        styles.title.fontSize = "32px";
        styles.title.lineHeight = "32px";
        styles.body.fontSize = "16px";
        styles.body.lineHeight = "16px";
    }

    css.opacity(styles.glare, 0.2);

    return styles;
};

HomePrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Home",
                style: styles.root
            },
            virt.createView(Wrapper,
                virt.createView("div", {
                        style: styles.container
                    },
                    virt.createView("img", {
                        style: styles.bgImg,
                        src: "img/bg.jpg"
                    }),
                    virt.createView("div", {
                        style: styles.glare
                    }),
                    virt.createView("div", {
                            style: styles.content
                        },
                        virt.createView("div", {
                                style: styles.contentHolder
                            },
                            virt.createView("h1", {
                                style: styles.title
                            }, i18n("home.title")),
                            virt.createView("p", {
                                style: styles.body
                            }, i18n("home.body"))
                        )
                    )
                )
            ),
            virt.createView(Boxes),
            virt.createView("div", {
                    style: styles.pageContent
                },
                virt.createView("h1", {
                        style: styles.pageTitle
                    },
                    virt.createView("span", i18n("home.satisfied_customers.satisfied")),
                    virt.createView("span", " "),
                    virt.createView("span", {
                        style: styles.highlight
                    }, i18n("home.satisfied_customers.customers"))
                ),
                virt.createView("p", {
                        style: styles.pageBody
                    },
                    i18n("home.satisfied_customers.body")
                ),
                virt.createView(Services)
            ),
            virt.createView(Wrapper,
                virt.createView("div", {
                        style: styles.footer
                    },
                    virt.createView("img", {
                        src: "img/menatwork.jpg"
                    })
                )
            )
        )
    );
};
