var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types"),
    arrayMap = require("@nathanfaucett/array-map"),
    extend = require("@nathanfaucett/extend");


var InputPrototype;


module.exports = Input;


function Input(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        focus: false
    };

    this.onFocus = function(e) {
        return _this.__onFocus(e);
    };
    this.onBlur = function(e) {
        return _this.__onBlur(e);
    };
}
virt.Component.extend(Input, "Input");

InputPrototype = Input.prototype;

Input.propTypes = {
    errors: propTypes.array.isRequired,
    inputType: propTypes.string.isRequired
};

Input.defaultProps = {
    errors: [],
    inputType: "input"
};

Input.contextTypes = {
    theme: propTypes.object.isRequired
};

InputPrototype.__onFocus = function(e) {
    if (this.props.onFocus) {
        this.props.onFocus(e);
    }

    this.setState({
        focus: true
    });
};

InputPrototype.__onBlur = function(e) {
    if (this.props.onBlur) {
        this.props.onBlur(e);
    }

    this.setState({
        focus: false
    });
};

InputPrototype.getValue = function(callback) {
    return this.refs.input.getValue(callback);
};

InputPrototype.getStyle = function() {
    var props = this.props,
        theme = this.context.theme,
        inputTheme = theme.styles.input,
        state = this.state,
        styles = {
            root: {},
            input: {
                color: props.color || inputTheme.color,
                borderColor: props.borderColor || inputTheme.borderColor,
                backgroundColor: theme.palette.canvasColor,
                textDecoration: "none"
            },
            errors: {},
            error: {
                padding: "0px 8px 8px",
                color: theme.palette.red1Color
            }
        };

    css.transition(styles.input, "border-color 200ms " + css.easing.inOut + " 0ms");

    if (state.focus) {
        styles.input.borderColor = props.focusBorderColor || inputTheme.focusBorderColor;
    }

    return styles;
};

InputPrototype.render = function() {
    var styles = this.getStyle(),
        props = extend({}, this.props);

    props.ref = "input";
    props.className = "Input";
    props.style = extend(styles.input, props.style);
    props.onFocus = this.onFocus;
    props.onBlur = this.onBlur;

    if (this.state.hover) {
        if (props.hoverBackgroundColor) {
            props.style.background = props.hoverBackgroundColor;
        }
    }

    return (
        virt.createView("div", {
                styles: styles.root
            },
            virt.createView("ul", {
                    style: styles.errors
                },
                arrayMap(props.errors, function each(error) {
                    return (
                        virt.createView("li", {
                                style: styles.error
                            },
                            error
                        )
                    );
                })
            ),
            virt.createView(props.inputType, props)
        )
    );
};
