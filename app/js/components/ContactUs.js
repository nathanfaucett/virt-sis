var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    extend = require("@nathanfaucett/extend"),
    propTypes = require("@nathanfaucett/prop_types"),
    request = require("@nathanfaucett/request"),
    objectForEach = require("@nathanfaucett/object-for_each"),
    app = require("../app"),
    googleAnalytics = require("../googleAnalytics"),
    Input = require("./Input");


var reEmail = /^(.+)@(.+){2,}\.(.+){2,}$/,
    ContactUsPrototype;


module.exports = ContactUs;


function ContactUs(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        form: {
            name: "",
            email: "",
            subject: "",
            message: ""
        },
        errors: {
            name: [],
            email: [],
            subject: [],
            message: []
        },
        message: ""
    };

    this.validates = {
        name: validateString,
        email: validateEmail,
        subject: validateString,
        message: validateString
    };

    this.onSubmit = function(e) {
        return _this.__onSubmit(e);
    };
    this.onInput = function(e) {
        return _this.__onInput(e);
    };
}
virt.Component.extend(ContactUs, "ContactUs");

ContactUsPrototype = ContactUs.prototype;

ContactUs.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired
};

function validateString(_this, key, value, errors) {
    var i18n = _this.context.i18n;

    if (!value) {
        errors[0] = i18n("errors.required", i18n("contact_us.form." + key));
        return true;
    } else {
        errors.length = 0;
        return false;
    }
}

function validateEmail(_this, key, value, errors) {
    var i18n = _this.context.i18n;

    if (!reEmail.test(value)) {
        errors[0] = i18n("errors.email");
        return true;
    } else {
        errors.length = 0;
        return false;
    }
}

ContactUsPrototype.__validate = function(name, value, state) {
    state.errors = extend(state.errors || {}, this.state.errors);
    return this.validates[name](this, name, value, state.errors[name]);
};

ContactUsPrototype.__validateAll = function(state) {
    var _this = this,
        error = false;

    objectForEach(this.state.form, function each(value, key) {
        var e = _this.__validate(key, value, state);
        error = error || e;
    });

    return error;
};

ContactUsPrototype.__onInput = function(e) {
    var _this = this,
        componentTarget = e.componentTarget,
        name = componentTarget.props.name;

    componentTarget.getValue(function(error, value) {
        var state;

        if (!error) {
            state = {
                form: extend({}, _this.state.form)
            };
            state.form[name] = value;
            _this.__validate(name, value, state);
            _this.setState(state);
        }
    });
};

ContactUsPrototype.clearWithMessage = function(message) {
    var _this = this;

    this.setState({
        form: {
            name: "",
            email: "",
            subject: "",
            message: ""
        },
        errors: {
            name: [],
            email: [],
            subject: [],
            message: []
        },
        message: message
    });

    setTimeout(function onSetTimeout() {
        var newMessage = _this.state.message;

        _this.setState({
            message: newMessage !== message ? newMessage : ""
        });
    }, 5000);
};

ContactUsPrototype.__onSubmit = function() {
    var state = {},
        error = this.__validateAll(state),
        _this, formData, i18n;

    googleAnalytics("set", "page", "contact_us");

    if (error) {
        this.setState(state);
    } else {
        _this = this;
        formData = new FormData();
        i18n = this.context.i18n;

        objectForEach(this.state.form, function(value, key) {
            formData.append(key, value);
        });

        request.post(app.config.baseUrl + location.pathname + "email.php", formData, {
            success: function onSucess() {
                _this.clearWithMessage(i18n("contact_us.success"));
            },
            error: function onError() {
                _this.clearWithMessage(i18n("contact_us.error"));
            }
        });
    }
};

ContactUsPrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        styles = {
            root: {
                position: "relative",
                maxWidth: "640px",
                margin: "0 auto",
                padding: "48px 0"
            },
            formHeader: {
                textTransform: "uppercase",
                textAlign: "center"
            },
            body: {
                position: "relative",
                margin: "0 32px",
                padding: "32px 16px",
                background: theme.palette.canvasColor
            },
            formInput: {
                padding: "8px",
                marginBottom: "8px",
                border: "2px solid " + theme.palette.primary3Color
            },
            formTextArea: {
                minHeight: "160px",
                resize: "vertical",
                padding: "8px",
                marginBottom: "32px",
                border: "2px solid " + theme.palette.primary3Color
            },
            formSubmit: {
                display: "block",
                width: "inherit",
                fontWeight: "bold",
                fontSize: "20px",
                textTransform: "uppercase",
                background: theme.palette.accent1Color,
                color: theme.palette.canvasColor,
                padding: "8px 24px"
            }
        };

    css.borderRadius(styles.formSubmit, "0px");
    css.borderRadius(styles.formInput, "0px");
    css.borderRadius(styles.formTextArea, "0px");

    return styles;
};

ContactUsPrototype.render = function() {
    var state = this.state,
        i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "ContactUs",
                id: "ContactUs",
                style: styles.root
            },
            virt.createView("h1", {
                style: styles.formHeader
            }, i18n("contact_us.form.header")),
            virt.createView(Input, {
                name: "name",
                placeholder: i18n("contact_us.form.name"),
                onInput: this.onInput,
                style: styles.formInput,
                value: state.form.name,
                errors: state.errors.name,
                type: "text"
            }),
            virt.createView(Input, {
                name: "email",
                placeholder: i18n("contact_us.form.email"),
                onInput: this.onInput,
                style: styles.formInput,
                value: state.form.email,
                errors: state.errors.email,
                type: "text"
            }),
            virt.createView(Input, {
                name: "subject",
                placeholder: i18n("contact_us.form.subject"),
                onInput: this.onInput,
                style: styles.formInput,
                value: state.form.subject,
                errors: state.errors.subject,
                type: "text"
            }),
            virt.createView(Input, {
                name: "message",
                placeholder: i18n("contact_us.form.message"),
                inputType: "textarea",
                onInput: this.onInput,
                style: styles.formTextArea,
                value: state.form.message,
                errors: state.errors.message
            }),
            virt.createView("input", {
                style: styles.formSubmit,
                onClick: this.onSubmit,
                value: i18n("contact_us.form.submit"),
                type: "submit"
            }),
            virt.createView("p", {
                style: styles.formMessage
            }, this.state.message)
        )
    );
};
