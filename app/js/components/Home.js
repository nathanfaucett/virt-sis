var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    eventListener = require("@nathanfaucett/event_listener"),
    BGImage = require("./BGImage"),
    Boxes = require("./Boxes"),
    ContactUs = require("./ContactUs"),
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

            pageContent: {
                margin: "256px auto 0px",
                maxWidth: "640px"
            },
            pageTitle: {
                textAlign: "center"
            },
            pageBody: {
                fontSize: "20px",
                paddingBottom: "64px"
            },
            highlight: {
                color: theme.palette.accent1Color
            },

            standards: {
                top: "0px",
                left: "50%",
                marginLeft: "-320px",
                maxWidth: "640px",
                position: "absolute"
            },
            standardsHeader: {
                textAlign: "center",
                fontSize: "64px",
                lineHeight: "64px",
                color: theme.palette.canvasColor
            },
            standardsBody: {
                background: theme.palette.canvasColor,
                padding: "64px 128px",
                textAlign: "justify",
                fontSize: "18px",
                lineHeight: "24px",
                color: theme.palette.grey2Color
            },

            footer: {
                position: "relative",
                marginBottom: "-1px"
            }
        };

    if (size.width < 960) {
        delete styles.standards.position;
        delete styles.standards.top;
        delete styles.standards.left;
        delete styles.standards.marginLeft;
        delete styles.standards.maxWidth;
        styles.standards.textAlign = "center";
        styles.standardsHeader.color = theme.palette.grey2Color;

        styles.pageBody.padding = "0px 16px";
    }

    if (size.width < 1110) {
        styles.standardsBody.padding = "32px 64px";
    }
    if (size.width < 640) {
        styles.pageContent.margin = "0px auto";
    }
    if (size.width < 480) {
        styles.standardsBody.padding = "64px 16px";
    }

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
            virt.createView(BGImage),
            virt.createView(Boxes),
            virt.createView("div", {
                    style: styles.pageContent
                },
                virt.createView("h1", {
                        style: styles.pageTitle
                    },
                    virt.createView("span", i18n("home.mission.our")),
                    virt.createView("span", " "),
                    virt.createView("span", {
                        style: styles.highlight
                    }, i18n("home.mission.mission"))
                ),
                virt.createView("p", {
                        style: styles.pageBody
                    },
                    i18n("home.mission.body")
                ),
                virt.createView(Services)
            ),
            virt.createView(Wrapper,
                virt.createView("div", {
                        style: styles.footer
                    },
                    virt.createView("img", {
                        src: "img/menatwork.jpg"
                    }),
                    virt.createView("div", {
                            style: styles.standards
                        },
                        virt.createView("h1", {
                            style: styles.standardsHeader
                        }, i18n("home.standards.header")),
                        virt.createView("p", {
                            style: styles.standardsBody
                        }, '"' + i18n("home.standards.body") + '"')
                    )
                )
            ),
            virt.createView(Wrapper,
                virt.createView(ContactUs)
            )
        )
    );
};
