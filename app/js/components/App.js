var virt = require("@nathanfaucett/virt"),
    eventListener = require("@nathanfaucett/event_listener"),
    propTypes = require("@nathanfaucett/prop_types"),
    app = require("../app"),
    Theme = require("../theme"),
    RouteStore = require("../stores/RouteStore");


var AppPrototype;


module.exports = App;


function App(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.theme = new Theme();
    this.size = null;

    this.state = {
        render: null
    };

    this.onChange = function() {
        return _this.__onChange();
    };

    this.onResize = function() {
        return _this.__onResize();
    };
}
virt.Component.extend(App, "App");
AppPrototype = App.prototype;

App.childContextTypes = {
    theme: propTypes.object.isRequired,
    size: propTypes.object
};

AppPrototype.getChildContext = function() {
    return {
        theme: this.theme,
        size: this.size
    };
};

AppPrototype.__onChange = function() {
    var pageState = RouteStore.getState(),
        renderPage = app.getPage(pageState);

    if (renderPage) {
        this.setState({
            ctx: RouteStore.getContext(),
            render: renderPage
        });
    } else {
        throw new Error("App onChange no page state found named " + pageState);
    }
};

AppPrototype.__onResize = function() {
    this.size = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    this.forceUpdate();
};

AppPrototype.componentDidMount = function() {

    RouteStore.addChangeListener(this.onChange);

    eventListener.on(window, "resize orientationchange", this.onResize);

    this.size = {
        width: window.innerWidth,
        height: window.innerHeight
    };
};

AppPrototype.componentWillUnmount = function() {
    RouteStore.removeChangeListener(this.onChange);
    eventListener.off(window, "resize orientationchange", this.onResize);
};

AppPrototype.render = function() {
    if (this.state.render) {
        return (
            virt.createView("div", {
                className: "App"
            }, this.state.render(this.state.ctx))
        );
    } else {
        return (
            virt.createView("div", {
                className: "App"
            })
        );
    }
};
