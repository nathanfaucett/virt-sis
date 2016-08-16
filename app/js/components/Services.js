var virt = require("@nathanfaucett/virt"),
    extend = require("@nathanfaucett/extend"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types");


var ServicesPrototype;


module.exports = Services;


function Services(props, children, context) {

    virt.Component.call(this, props, children, context);

    this.state = {
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false
    };
}
virt.Component.extend(Services, "Services");

Services.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

ServicesPrototype = Services.prototype;

ServicesPrototype.createOnClick = function(key) {
    var _this = this,
        size = this.context.size;

    return function onClick() {
        var newState = extend({}, _this.state);

        newState[key] = !newState[key];

        if (size.width >= 768) {
            switch (key) {
                case "topLeft":
                    newState.topRight = false;
                    break;
                case "topRight":
                    newState.topLeft = false;
                    break;
                case "bottomLeft":
                    newState.bottomRight = false;
                    break;
                case "bottomRight":
                    newState.bottomLeft = false;
                    break;
            }
        }

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
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                color: theme.palette.canvasColor,
                padding: "64px 0px 32px 0px",
                textAlign: "center",
                height: "480px"
            },
            serviceHeader: {
                cursor: "pointer",
                margin: "0"
            },
            serviceBody: {
                position: "absolute",
                top: "0",
                left: "0",
                cursor: "pointer",
                color: theme.palette.textColor,
                fontSize: "16px",
                padding: "16px",
                textAlign: "left"
            },
            serviceExpand: {
                cursor: "pointer",
                display: "block",
                width: "100%",
                position: "absolute",
                bottom: "32px",
                margin: "0"
            },
            serviceExpandImg: {
                cursor: "pointer",
                width: "24px",
                height: "24px"
            },
            bodyHeader: {
                margin: "0"
            },
            ul: {
                paddingLeft: "32px"
            },
            li: {
                padding: "4px 0px",
                listStyleType: "disc"
            },
            closeButton: {
                position: "absolute",
                top: "24px",
                right: "-8px"
            },
            closeButtonImg: {
                cursor: "pointer"
            }
        };

    css.transform(styles.closeButtonImg, "rotate(45deg)");

    css.transition(styles.service,
        "width 200ms " + css.easing.inOut + " 0ms",
        "background 200ms " + css.easing.inOut + " 0ms");

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
    if (size.width < 640) {
        styles.closeButton.right = "24px";
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

    styles.topLeftServiceHeader = extend({}, styles.serviceHeader);
    styles.topRightServiceHeader = extend({}, styles.serviceHeader);
    styles.bottomLeftServiceHeader = extend({}, styles.serviceHeader);
    styles.bottomRightServiceHeader = extend({}, styles.serviceHeader);

    styles.topLeftServiceExpand = extend({}, styles.serviceExpand);
    styles.topRightServiceExpand = extend({}, styles.serviceExpand);
    styles.bottomLeftServiceExpand = extend({}, styles.serviceExpand);
    styles.bottomRightServiceExpand = extend({}, styles.serviceExpand);

    if (size.width >= 768) {
        if (state.topLeft) {
            styles.topLeftService.width = "100%";
            styles.topRightService.width = "0%";
            css.opacity(styles.topLeftServiceBody, 1);
            styles.topLeftService.background = theme.palette.grey1Color;
            styles.topLeftServiceExpand.display = styles.topLeftServiceHeader.display = "none";
        }
        if (state.topRight) {
            styles.topLeftService.width = "0%";
            styles.topRightService.width = "100%";
            css.opacity(styles.topRightServiceBody, 1);
            styles.topRightService.background = theme.palette.grey1Color;
            styles.topRightServiceExpand.display = styles.topRightServiceHeader.display = "none";
        }
        if (state.bottomLeft) {
            styles.bottomLeftService.width = "100%";
            styles.bottomRightService.width = "0%";
            css.opacity(styles.bottomLeftServiceBody, 1);
            styles.bottomLeftService.background = theme.palette.grey1Color;
            styles.bottomLeftServiceExpand.display = styles.bottomLeftServiceHeader.display = "none";
        }
        if (state.bottomRight) {
            styles.bottomLeftService.width = "0%";
            styles.bottomRightService.width = "100%";
            css.opacity(styles.bottomRightServiceBody, 1);
            styles.bottomRightService.background = theme.palette.grey1Color;
            styles.bottomRightServiceExpand.display = styles.bottomRightServiceHeader.display = "none";
        }
    } else {
        styles.topLeftService.marginBottom = styles.bottomLeftService.marginBottom = "32px";

        if (state.topLeft) {
            css.opacity(styles.topLeftServiceBody, 1);
            styles.topLeftService.background = theme.palette.grey1Color;
            styles.topLeftServiceExpand.display = styles.topLeftServiceHeader.display = "none";
        }
        if (state.topRight) {
            css.opacity(styles.topRightServiceBody, 1);
            styles.topRightService.background = theme.palette.grey1Color;
            styles.topRightServiceExpand.display = styles.topRightServiceHeader.display = "none";
        }
        if (state.bottomLeft) {
            css.opacity(styles.bottomLeftServiceBody, 1);
            styles.bottomLeftService.background = theme.palette.grey1Color;
            styles.bottomLeftServiceExpand.display = styles.bottomLeftServiceHeader.display = "none";
        }
        if (state.bottomRight) {
            css.opacity(styles.bottomRightServiceBody, 1);
            styles.bottomRightService.background = theme.palette.grey1Color;
            styles.bottomRightServiceExpand.display = styles.bottomRightServiceHeader.display = "none";
        }
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
                            style: styles.topLeftService,
                            onClick: this.createOnClick("topLeft")
                        },
                        virt.createView("h1", {
                            style: styles.topLeftServiceHeader
                        }, i18n("services.ndt.header")),
                        virt.createView("div", {
                                style: styles.topLeftServiceBody
                            },
                            virt.createView("h2", {
                                style: styles.bodyHeader
                            }, i18n("services.ndt.header")),
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
                            ),
                            virt.createView("div", {
                                    style: styles.closeButton
                                },
                                virt.createView("img", {
                                    style: styles.closeButtonImg,
                                    src: "img/plus_black.png"
                                })
                            )
                        ),
                        virt.createView("div", {
                                style: styles.topLeftServiceExpand
                            },
                            virt.createView("img", {
                                style: styles.serviceExpandImg,
                                src: "img/plus.png"
                            })
                        )
                    ),
                    virt.createView("div", {
                            style: styles.topRightService,
                            onClick: this.createOnClick("topRight")
                        },
                        virt.createView("h1", {
                            style: styles.topRightServiceHeader
                        }, i18n("services.pmri.header")),
                        virt.createView("div", {
                                style: styles.topRightServiceBody
                            },
                            virt.createView("h2", {
                                style: styles.bodyHeader
                            }, i18n("services.pmri.header")),
                            virt.createView("p", i18n("services.pmri.body")),
                            virt.createView("div", {
                                    style: styles.closeButton
                                },
                                virt.createView("img", {
                                    style: styles.closeButtonImg,
                                    src: "img/plus_black.png"
                                })
                            )
                        ),
                        virt.createView("div", {
                                style: styles.topRightServiceExpand
                            },
                            virt.createView("img", {
                                style: styles.serviceExpandImg,
                                src: "img/plus.png"
                            })
                        )
                    ),
                    virt.createView("div", {
                        className: "clear"
                    })
                ),
                virt.createView("div",
                    virt.createView("div", {
                            style: styles.bottomLeftService,
                            onClick: this.createOnClick("bottomLeft")
                        },
                        virt.createView("h1", {
                            style: styles.bottomLeftServiceHeader
                        }, i18n("services.ssi.header")),
                        virt.createView("div", {
                                style: styles.bottomLeftServiceBody
                            },
                            virt.createView("h2", {
                                style: styles.bodyHeader
                            }, i18n("services.ssi.header")),
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
                            ),
                            virt.createView("div", {
                                    style: styles.closeButton
                                },
                                virt.createView("img", {
                                    style: styles.closeButtonImg,
                                    src: "img/plus_black.png"
                                })
                            )
                        ),
                        virt.createView("div", {
                                style: styles.bottomLeftServiceExpand
                            },
                            virt.createView("img", {
                                style: styles.serviceExpandImg,
                                src: "img/plus.png"
                            })
                        )
                    ),
                    virt.createView("div", {
                            style: styles.bottomRightService,
                            onClick: this.createOnClick("bottomRight")
                        },
                        virt.createView("h1", {
                            style: styles.bottomRightServiceHeader
                        }, i18n("services.pmdci.header")),
                        virt.createView("div", {
                                style: styles.bottomRightServiceBody
                            },
                            virt.createView("h2", {
                                style: styles.bodyHeader
                            }, i18n("services.pmdci.header")),
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
                            ),
                            virt.createView("div", {
                                    style: styles.closeButton
                                },
                                virt.createView("img", {
                                    style: styles.closeButtonImg,
                                    src: "img/plus_black.png"
                                })
                            )
                        ),
                        virt.createView("div", {
                                style: styles.bottomRightServiceExpand
                            },
                            virt.createView("img", {
                                style: styles.serviceExpandImg,
                                src: "img/plus.png"
                            })
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
