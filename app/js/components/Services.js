var virt = require("@nathanfaucett/virt"),
    virtDOM = require("@nathanfaucett/virt-dom"),
    extend = require("@nathanfaucett/extend"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types");


var ServicesPrototype;


module.exports = Services;


function Services(props, children, context) {

    virt.Component.call(this, props, children, context);

    this.lastWidth = context.size.width;

    this.state = {
        topLeft: false,
        topRight: false,
        middleLeft: false,
        middleRight: false,
        bottomLeft: false,
        bottomRight: false,

        topLeftHeight: 0,
        topRightHeight: 0,
        middleLeftHeight: 0,
        middleRightHeight: 0,
        bottomLeftHeight: 0,
        bottomRightHeight: 0
    };
}
virt.Component.extend(Services, "Services");

Services.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

ServicesPrototype = Services.prototype;

ServicesPrototype.componentDidMount = function() {
    this.getHeights();
};

ServicesPrototype.componentWillUpdate = function() {
    if (this.lastWidth !== this.context.size.width) {
        this.lastWidth = this.context.size.width;
        this.getHeights();
    }
};

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
                case "middleLeft":
                    newState.middleRight = false;
                    break;
                case "middleRight":
                    newState.middleLeft = false;
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

ServicesPrototype.getHeight = function(refName) {
    var ref = this.refs[refName];

    if (ref) {
        return virtDOM.findDOMNode(ref).offsetHeight;
    } else {
        return 0;
    }
};

ServicesPrototype.getHeights = function() {
    var state = this.state,
        topLeftHeight = this.getHeight("topLeftInner"),
        topRightHeight = this.getHeight("topRightInner"),
        middleLeftHeight = this.getHeight("middleLeftInner"),
        middleRightHeight = this.getHeight("middleRightInner"),
        bottomLeftHeight = this.getHeight("bottomLeftInner"),
        bottomRightHeight = this.getHeight("bottomRightInner");

    if (
        state.topLeftHeight !== topLeftHeight ||
        state.topRightHeight !== topRightHeight ||
        state.middleLeftHeight !== middleLeftHeight ||
        state.middleRightHeight !== middleRightHeight ||
        state.bottomLeftHeight !== bottomLeftHeight ||
        state.bottomRightHeight !== bottomRightHeight
    ) {
        this.setState({
            topLeftHeight: topLeftHeight,
            topRightHeight: topRightHeight,
            middleLeftHeight: middleLeftHeight,
            middleRightHeight: middleRightHeight,
            bottomLeftHeight: bottomLeftHeight,
            bottomRightHeight: bottomRightHeight
        });
    }
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
                padding: "64px 0px 32px",
                textAlign: "center",
                height: "400px"
            },
            serviceHeader: {
                padding: "0 8px",
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
                top: "16px",
                right: "16px"
            },
            closeButtonImg: {
                cursor: "pointer"
            }
        };

    css.transform(styles.closeButtonImg, "rotate(45deg) scale(0.9)");

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
        styles.serviceBody.width = "640px";
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

    styles.middleLeftService = extend({
        background: theme.palette.primary1Color
    }, styles.leftService);
    styles.middleRightService = extend({
        background: theme.palette.primary2Color
    }, styles.rightService);

    styles.middleLeftServiceBody = extend({}, styles.serviceBody);
    styles.middleRightServiceBody = extend({}, styles.serviceBody);

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
    styles.middleLeftServiceHeader = extend({}, styles.serviceHeader);
    styles.middleRightServiceHeader = extend({}, styles.serviceHeader);
    styles.bottomLeftServiceHeader = extend({}, styles.serviceHeader);
    styles.bottomRightServiceHeader = extend({}, styles.serviceHeader);

    styles.topLeftServiceExpand = extend({}, styles.serviceExpand);
    styles.topRightServiceExpand = extend({}, styles.serviceExpand);
    styles.middleLeftServiceExpand = extend({}, styles.serviceExpand);
    styles.middleRightServiceExpand = extend({}, styles.serviceExpand);
    styles.bottomLeftServiceExpand = extend({}, styles.serviceExpand);
    styles.bottomRightServiceExpand = extend({}, styles.serviceExpand);

    if (size.width < 640) {
        styles.topLeftService.height = state.topLeftHeight + "px";
        styles.topRightService.height = state.topRightHeight + "px";
        styles.middleLeftService.height = state.middleLeftHeight + "px";
        styles.middleRightService.height = state.middleRightHeight + "px";
        styles.bottomLeftService.height = state.bottomLeftHeight + "px";
        styles.bottomRightService.height = state.bottomRightHeight + "px";
    }

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
        if (state.middleLeft) {
            styles.middleLeftService.width = "100%";
            styles.middleRightService.width = "0%";
            css.opacity(styles.middleLeftServiceBody, 1);
            styles.middleLeftService.background = theme.palette.grey1Color;
            styles.middleLeftServiceExpand.display = styles.middleLeftServiceHeader.display = "none";
        }
        if (state.middleRight) {
            styles.middleLeftService.width = "0%";
            styles.middleRightService.width = "100%";
            css.opacity(styles.middleRightServiceBody, 1);
            styles.middleRightService.background = theme.palette.grey1Color;
            styles.middleRightServiceExpand.display = styles.middleRightServiceHeader.display = "none";
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
        styles.topLeftService.marginBottom =
            styles.middleLeftService.marginBottom =
            styles.bottomLeftService.marginBottom = "32px";

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
        if (state.middleLeft) {
            css.opacity(styles.middleLeftServiceBody, 1);
            styles.middleLeftService.background = theme.palette.grey1Color;
            styles.middleLeftServiceExpand.display = styles.middleLeftServiceHeader.display = "none";
        }
        if (state.middleRight) {
            css.opacity(styles.middleRightServiceBody, 1);
            styles.middleRightService.background = theme.palette.grey1Color;
            styles.middleRightServiceExpand.display = styles.middleRightServiceHeader.display = "none";
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
                                ref: "topLeftInner",
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
                                ref: "topRightInner",
                                style: styles.topRightServiceBody
                            },
                            virt.createView("h2", {
                                style: styles.bodyHeader
                            }, i18n("services.pmri.header")),
                            virt.createView("p", i18n("services.pmri.body")),
                            virt.createView("ul", {
                                    style: styles.ul
                                },
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmri.li0")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmri.li1")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmri.li2"))
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
                virt.createView("div", {
                        style: {
                            marginBottom: "32px"
                        }
                    },
                    virt.createView("div", {
                            style: styles.middleLeftService,
                            onClick: this.createOnClick("middleLeft")
                        },
                        virt.createView("h1", {
                            style: styles.middleLeftServiceHeader
                        }, i18n("services.ssi.header")),
                        virt.createView("div", {
                                ref: "middleLeftInner",
                                style: styles.middleLeftServiceBody
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
                                style: styles.middleLeftServiceExpand
                            },
                            virt.createView("img", {
                                style: styles.serviceExpandImg,
                                src: "img/plus.png"
                            })
                        )
                    ),
                    virt.createView("div", {
                            style: styles.middleRightService,
                            onClick: this.createOnClick("middleRight")
                        },
                        virt.createView("h1", {
                            style: styles.middleRightServiceHeader
                        }, i18n("services.pmdci.header")),
                        virt.createView("div", {
                                ref: "middleRightInner",
                                style: styles.middleRightServiceBody
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
                                style: styles.middleRightServiceExpand
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
                        }, i18n("services.pmrs.header")),
                        virt.createView("div", {
                                ref: "bottomLeftInner",
                                style: styles.bottomLeftServiceBody
                            },
                            virt.createView("h2", {
                                style: styles.bodyHeader
                            }, i18n("services.pmrs.header")),
                            virt.createView("p", i18n("services.pmrs.body")),
                            virt.createView("ul", {
                                    style: styles.ul
                                },
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmrs.li0")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmrs.li1")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmrs.li2")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmrs.li3")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.pmrs.li4"))
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
                        }, i18n("services.ydci.header")),
                        virt.createView("div", {
                                ref: "bottomRightInner",
                                style: styles.bottomRightServiceBody
                            },
                            virt.createView("h2", {
                                style: styles.bodyHeader
                            }, i18n("services.ydci.header")),
                            virt.createView("p", i18n("services.ydci.body")),
                            virt.createView("ul", {
                                    style: styles.ul
                                },
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ydci.li0")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ydci.li1")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ydci.li2")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ydci.li3")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ydci.li4")),
                                virt.createView("li", {
                                    style: styles.li
                                }, i18n("services.ydci.li5"))
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
