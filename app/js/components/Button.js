var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types"),
    extend = require("@nathanfaucett/extend");


var ButtonPrototype;


module.exports = Button;


function Button(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        focus: false,
        hover: false,
        down: false
    };

    this.onMouseOver = function(e) {
        return _this.__onMouseOver(e);
    };
    this.onMouseOut = function(e) {
        return _this.__onMouseOut(e);
    };
    this.onMouseDown = function(e) {
        return _this.__onMouseDown(e);
    };
    this.onMouseUp = function(e) {
        return _this.__onMouseUp(e);
    };
    this.onFocus = function(e) {
        return _this.__onFocus(e);
    };
    this.onBlur = function(e) {
        return _this.__onBlur(e);
    };
}
virt.Component.extend(Button, "Button");

ButtonPrototype = Button.prototype;

Button.propTypes = {
    elementType: propTypes.string.isRequired
};

Button.defaultProps = {
    elementType: "a"
};

Button.contextTypes = {
    theme: propTypes.object.isRequired
};

ButtonPrototype.__onMouseOver = function(e) {
    if (this.props.onMouseOver) {
        this.props.onMouseOver(e);
    }

    this.setState({
        hover: true
    });
};

ButtonPrototype.__onMouseOut = function(e) {
    if (this.props.onMouseOut) {
        this.props.onMouseOut(e);
    }

    this.setState({
        hover: false,
        down: false
    });
};

ButtonPrototype.__onMouseDown = function(e) {
    if (this.props.onMouseDown) {
        this.props.onMouseDown(e);
    }

    this.setState({
        down: true
    });
};

ButtonPrototype.__onMouseUp = function(e) {
    if (this.props.onMouseUp) {
        this.props.onMouseUp(e);
    }

    this.setState({
        down: false
    });
};

ButtonPrototype.__onFocus = function(e) {
    if (this.props.onFocus) {
        this.props.onFocus(e);
    }

    this.setState({
        focus: true
    });
};

ButtonPrototype.__onBlur = function(e) {
    if (this.props.onBlur) {
        this.props.onBlur(e);
    }

    this.setState({
        focus: false
    });
};

ButtonPrototype.getStyle = function() {
    var props = this.props,
        theme = this.context.theme,
        buttonTheme = theme.styles.button,
        state = this.state,
        styles = {
            root: {
                margin: "16px 0px 32px",
                padding: "16px 24px",
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: props.color || buttonTheme.color,
                backgroundColor: props.backgroundColor || buttonTheme.backgroundColor,
                textDecoration: "none"
            }
        };

    if (state.hover) {
        styles.root.backgroundColor = props.backgroundActiveColor || buttonTheme.backgroundActiveColor;
        if (props.hoverOpacity) {
            css.opacity(styles.root, props.hoverOpacity);
        }
    }
    if (state.focus) {
        styles.root.backgroundColor = props.backgroundActiveColor || buttonTheme.backgroundActiveColor;
    }
    if (state.down) {
        styles.root.backgroundColor = props.backgroundActiveColor || buttonTheme.backgroundActiveColor;
    }
    if (props.active) {
        styles.root.backgroundColor = props.backgroundActiveColor || buttonTheme.backgroundActiveColor;
    }

    return styles;
};

ButtonPrototype.render = function() {
    var styles = this.getStyle(),
        props = extend({}, this.props);

    props.className = "Button";
    props.style = extend(styles.root, props.style);
    props.onMouseOver = this.onMouseOver;
    props.onMouseOut = this.onMouseOut;
    props.onMouseDown = this.onMouseDown;
    props.onMouseUp = this.onMouseUp;
    props.onFocus = this.onFocus;
    props.onBlur = this.onBlur;

    return virt.createView(props.elementType, props, this.children);
};
