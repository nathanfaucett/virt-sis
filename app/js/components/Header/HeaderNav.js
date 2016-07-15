var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types");


var HeaderNavPrototype;


module.exports = HeaderNav;


function HeaderNav(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(HeaderNav, "HeaderNav");

HeaderNavPrototype = HeaderNav.prototype;

HeaderNav.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

HeaderNavPrototype.getStyles = function() {
    var styles = {
        root: {}
    };

    return styles;
};

HeaderNavPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
            className: "HeaderNav",
            style: styles.root
        })
    );
};
