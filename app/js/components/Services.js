var virt = require("@nathanfaucett/virt"),
    extend = require("@nathanfaucett/extend"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types");


var ServicesPrototype;


module.exports = Services;


function Services(props, children, context) {

    virt.Component.call(this, props, children, context);

    this.state = {
        topCurrent: null,
        topOpen: false,
        bottomCurrent: null,
        bottomOpen: false
    };
}
virt.Component.extend(Services, "Services");

Services.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

ServicesPrototype = Services.prototype;

ServicesPrototype.createOnClick = function(name, currentKey, openKey) {
    var _this = this;

    return function onClick() {
        var state = _this.state,
            current = state[currentKey],
            open = state[openKey],
            newState = {};

        if (open) {
            if (current !== name) {
                current = name;
            } else {
                current = null;
                open = false;
            }
        } else {
            current = name;
            open = true;
        }

        newState[currentKey] = current;
        newState[openKey] = open;

        _this.setState(newState);
    };
};

ServicesPrototype.getStyles = function() {
    var state = this.state,
        context = this.context,
        theme = context.theme,
        size = context.size,
        styles = {
            root: {
                marginBottom: "128px"
            },
            services: {
                marginBottom: "16px"
            },
            service: {
                overflow: "hidden",
                position: "relative",
                color: theme.palette.canvasColor,
                padding: "64px 0px 32px 0px",
                textAlign: "center",
                height: "480px"
            },
            serviceHeader: {
                margin: "0"
            },
            serviceBody: {
                fontSize: "16px",
                padding: "16px",
                textAlign: "left"
            },
            serviceExpand: {
                display: "block",
                width: "100%",
                position: "absolute",
                bottom: "32px",
                margin: "0"
            },
            serviceExpandA: {},
            serviceExpandImg: {
                width: "24px",
                height: "24px"
            },
            ul: {
                paddingLeft: "32px"
            },
            li: {
                padding: "4px 0px",
                listStyleType: "disc"
            }
        };

    css.transition(styles.service, "width 200ms " + css.easing.inOut + " 0ms");
    styles.leftService = extend({}, styles.service);
    styles.rightService = extend({}, styles.service);

    css.opacity(styles.serviceBody, 0);
    css.transition(styles.serviceBody, "opacity 200ms " + css.easing.inOut + " 0ms");

    if (size.width >= 768) {
        styles.leftService.width = styles.rightService.width = "48%";
        styles.leftService["float"] = "left";
        styles.rightService["float"] = "right";
        styles.serviceBody.width = "608px";
    }

    styles.topLeftService = extend({
        background: theme.palette.primary1Color
    }, styles.leftService);
    styles.topRightService = extend({
        background: theme.palette.primary2Color
    }, styles.rightService);

    styles.topLeftServiceBody = extend({}, styles.serviceBody);
    styles.topRightServiceBody = extend({}, styles.serviceBody);

    styles.bottomLeftService = extend({
        background: theme.palette.primary2Color
    }, styles.leftService);
    styles.bottomRightService = extend({
        background: theme.palette.primary1Color
    }, styles.rightService);

    styles.bottomLeftServiceBody = extend({}, styles.serviceBody);
    styles.bottomRightServiceBody = extend({}, styles.serviceBody);

    css.transition(styles.serviceExpandA, "transform 200ms " + css.easing.inOut + " 0ms");
    css.transform(styles.serviceExpandA, "rotate(0deg)");

    styles.topServiceExpandA = extend({}, styles.serviceExpandA);
    styles.bottomServiceExpandA = extend({}, styles.serviceExpandA);

    if (state.topOpen) {
        if (state.topCurrent === "left") {
            styles.topLeftService.width = "100%";
            styles.topRightService.width = "0%";
            css.opacity(styles.topLeftServiceBody, 1);
        } else {
            styles.topLeftService.width = "0%";
            styles.topRightService.width = "100%";
            css.opacity(styles.topRightServiceBody, 1);
        }
        css.transform(styles.topServiceExpandA, "rotate(45deg)");
    }
    if (state.bottomOpen) {
        if (state.bottomCurrent === "left") {
            styles.bottomLeftService.width = "100%";
            styles.bottomRightService.width = "0%";
            css.opacity(styles.bottomLeftServiceBody, 1);
        } else {
            styles.bottomLeftService.width = "0%";
            styles.bottomRightService.width = "100%";
            css.opacity(styles.bottomRightServiceBody, 1);
        }
        css.transform(styles.bottomServiceExpandA, "rotate(45deg)");
    }

    return styles;
};

ServicesPrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Services",
                style: styles.root
            },
            virt.createView("div", {
                    style: styles.services
                },
                virt.createView("div", {
                        style: {
                            marginBottom: "32px"
                        }
                    },
                    virt.createView("div", {
                            ref: "ndt",
                            style: styles.topLeftService
                        },
                        virt.createView("h1", {
                            style: styles.serviceHeader
                        }, i18n("services.ndt.header")),
                        virt.createView("div", {
                                style: styles.topLeftServiceBody
                            },
                            virt.createView("p", i18n("services.ndt.body")),
                            virt.createView("ul", {
                                    style: styles.ul
                                },
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ndt.li0")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ndt.li1")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ndt.li2")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ndt.li3"))
                            )
                        ),
                        virt.createView("div", {
                                style: styles.serviceExpand
                            },
                            virt.createView("a", {
                                onClick: this.createOnClick("left", "topCurrent", "topOpen"),
                                style: styles.topServiceExpandA
                            }, virt.createView("img", {
                                style: styles.serviceExpandImg,
                                src: "img/plus.png"
                            }))
                        )
                    ),
                    virt.createView("div", {
                            ref: "pmri",
                            style: styles.topRightService
                        },
                        virt.createView("h1", {
                            style: styles.serviceHeader
                        }, i18n("services.pmri.header")),
                        virt.createView("div", {
                                style: styles.topRightServiceBody
                            },
                            virt.createView("p", i18n("services.pmri.body"))
                        ),
                        virt.createView("div", {
                                style: styles.serviceExpand
                            },
                            virt.createView("a", {
                                onClick: this.createOnClick("right", "topCurrent", "topOpen"),
                                style: styles.topServiceExpandA
                            }, virt.createView("img", {
                                style: styles.serviceExpandImg,
                                src: "img/plus.png"
                            }))
                        )
                    ),
                    virt.createView("div", {
                        className: "clear"
                    })
                ),
                virt.createView("div",
                    virt.createView("div", {
                            ref: "ssi",
                            style: styles.bottomLeftService
                        },
                        virt.createView("h1", {
                            style: styles.serviceHeader
                        }, i18n("services.ssi.header")),
                        virt.createView("div", {
                                style: styles.bottomLeftServiceBody
                            },
                            virt.createView("p", i18n("services.ssi.body")),
                            virt.createView("ul", {
                                    style: styles.ul
                                },
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ssi.li0")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ssi.li1")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ssi.li2")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ssi.li3")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ssi.li4")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ssi.li5"))
                            )
                        ),
                        virt.createView("div", {
                                style: styles.serviceExpand
                            },
                            virt.createView("a", {
                                onClick: this.createOnClick("left", "bottomCurrent", "bottomOpen"),
                                style: styles.bottomServiceExpandA
                            }, virt.createView("img", {
                                style: styles.serviceExpandImg,
                                src: "img/plus.png"
                            }))
                        )
                    ),
                    virt.createView("div", {
                            ref: "pmdci",
                            style: styles.bottomRightService
                        },
                        virt.createView("h1", {
                            style: styles.serviceHeader
                        }, i18n("services.pmdci.header")),
                        virt.createView("div", {
                                style: styles.bottomRightServiceBody
                            },
                            virt.createView("p", i18n("services.pmdci.body")),
                            virt.createView("ul", {
                                    style: styles.ul
                                },
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmdci.li0")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmdci.li1")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmdci.li2")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmdci.li3")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmdci.li4"))
                            )
                        ),
                        virt.createView("div", {
                                style: styles.serviceExpand
                            },
                            virt.createView("a", {
                                onClick: this.createOnClick("right", "bottomCurrent", "bottomOpen"),
                                style: styles.bottomServiceExpandA
                            }, virt.createView("img", {
                                style: styles.serviceExpandImg,
                                src: "img/plus.png"
                            }))
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
