var virt = require("@nathanfaucett/virt");


var WrapperPrototype;


module.exports = Wrapper;


function Wrapper(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Wrapper, "Wrapper");

Wrapper.contextTypes = {};

WrapperPrototype = Wrapper.prototype;

WrapperPrototype.getStyles = function() {
    var styles = {
        root: {
            margin: "0 auto",
            padding: "0 16px",
            maxWidth: "1280px"
        }
    };

    return styles;
};

WrapperPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Wrapper",
                style: styles.root
            },
            this.children
        )
    );
};
