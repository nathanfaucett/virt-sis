var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types"),
    eventListener = require("@nathanfaucett/event_listener"),
    Wrapper = require("./Wrapper");


var BGImagePrototype;


module.exports = BGImage;


function BGImage(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.onScroll = function(e) {
        return _this.__onScroll(e);
    };
}
virt.Component.extend(BGImage, "BGImage");

BGImagePrototype = BGImage.prototype;

BGImage.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

BGImagePrototype.__onScroll = function() {
    this.forceUpdate();
};

BGImagePrototype.componentDidMount = function() {
    eventListener.on(window, "scroll", this.onScroll);
};

BGImagePrototype.componentWillUnmount = function() {
    eventListener.off(window, "scroll", this.onScroll);
};

BGImagePrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        size = context.size,

        styles = {
            root: {
                position: "relative"
            },
            container: {
                paddingBottom: "16px",
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

BGImagePrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "BGImage",
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
            )
        )
    );
};
