var Theme = require("@nathanfaucett/theme"),
    css = require("@nathanfaucett/css");


var SISFlooringThemePrototype;


module.exports = SISFlooringTheme;


function SISFlooringTheme() {

    Theme.call(this);

    this.fontFamily = "Roboto, sans-serif";
}
Theme.extend(SISFlooringTheme, "SISFlooringTheme");
SISFlooringThemePrototype = SISFlooringTheme.prototype;

SISFlooringThemePrototype.getSpacing = function() {
    return {
        iconSize: 24,
        desktopGutter: 24,
        desktopGutterMore: 32,
        desktopGutterLess: 16,
        desktopGutterMini: 8,
        desktopKeylineIncrement: 64,
        desktopDropDownMenuItemHeight: 32,
        desktopDropDownMenuFontSize: 15,
        desktopLeftNavMenuItemHeight: 48,
        desktopSubheaderHeight: 48,
        desktopToolbarHeight: 56
    };
};

SISFlooringThemePrototype.getPalette = function() {
    return {
        primary1Color: "#0a1296",
        primary2Color: "#0086ff",

        accent1Color: "#ff5b29",

        grey1Color: "#bfbfbf",
        grey2Color: "#6a6a6a",
        grey3Color: "#565656",

        textColor: "rgba(0, 0, 0, 0.87)",
        canvasColor: css.colors.white,

        borderColor: "#6a6a6a",

        disabledColor: "rgba(0, 0, 0, 0.262)"
    };
};

SISFlooringThemePrototype.getStyles = function(palette /*, spacing */ ) {
    var styles = {
        link: {
            color: palette.primary2Color,
            hoverColor: palette.accent1Color,
            focusColor: palette.accent1Color,
            downColor: palette.accent1Color
        },
        boxShadow: "1px 2px 8px 0px " + palette.disabledColor
    };
    return styles;
};
