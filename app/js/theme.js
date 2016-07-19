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
        primary1Color: "#3a345a",
        primary2Color: "#434371",
        primary3Color: "#4f5891",
        primary4Color: "#7f8fb8",

        accent1Color: "#ff6600",

        grey1Color: "#f2f2f2",
        grey2Color: "#575555",
        grey3Color: "#252525",

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
