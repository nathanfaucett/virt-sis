var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types"),
    Input = require("./Input");


var ContactUsPrototype;


module.exports = ContactUs;


function ContactUs(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        name: "",
        email: "",
        subject: "",
        message: ""
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

ContactUsPrototype.__onInput = function(e) {
    var _this = this,
        componentTarget = e.componentTarget,
        name = componentTarget.props.name;

    componentTarget.getValue(function(error, value) {
        var state;

        if (!error) {
            state = {};
            state[name] = value;
            _this.setState(state);
        }
    });
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
            formLabel: {
                display: "block",
                marginBottom: "4px",
                fontSize: "1.5em",
                fontWeight: "bold"
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
                background: theme.palette.primary3Color,
                color: theme.palette.canvasColor,
                padding: "8px 24px"
            }
        };

    css.boxShadow(styles.formSubmit, theme.styles.boxShadow);

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
                style: styles.root
            },
            virt.createView("h1", {
                style: styles.formHeader
            }, i18n("contact_us.form.header")),
            virt.createView("form", {
                    style: styles.form,
                    method: "POST",
                    action: "email.php"
                },
                virt.createView("label", {
                    style: styles.formLabel,
                    "for": "name"
                }, i18n("contact_us.form.name")),
                virt.createView(Input, {
                    name: "name",
                    onInput: this.onInput,
                    style: styles.formInput,
                    value: state.name,
                    type: "text"
                }),
                virt.createView("label", {
                    style: styles.formLabel,
                    "for": "email"
                }, i18n("contact_us.form.email")),
                virt.createView(Input, {
                    name: "email",
                    onInput: this.onInput,
                    style: styles.formInput,
                    value: state.email,
                    type: "email"
                }),
                virt.createView("label", {
                    style: styles.formLabel,
                    "for": "subject"
                }, i18n("contact_us.form.subject")),
                virt.createView(Input, {
                    name: "subject",
                    onInput: this.onInput,
                    style: styles.formInput,
                    value: state.subject,
                    type: "text"
                }),
                virt.createView("label", {
                    style: styles.formLabel,
                    "for": "message"
                }, i18n("contact_us.form.message")),
                virt.createView(Input, {
                    name: "message",
                    inputType: "textarea",
                    onInput: this.onInput,
                    style: styles.formTextArea,
                    value: state.message
                }),
                virt.createView("input", {
                    style: styles.formSubmit,
                    value: i18n("contact_us.form.submit"),
                    type: "submit"
                })
            )
        )
    );
};
