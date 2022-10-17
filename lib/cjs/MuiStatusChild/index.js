"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var StyledBox = (0, styles_1.styled)('div')(function (_a) {
    var theme = _a.theme, reverse = _a.reverse;
    return ({
        gap: "".concat(theme.shape.borderRadius, "px"),
        color: theme.palette.action.active,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        userSelect: 'none',
        flexDirection: reverse ? 'row-reverse' : 'row',
        WebkitFontSmoothing: 'antialiased',
        shapeRendering: 'geometricPrecision',
    });
});
var StyledSvgIcon = (0, styles_1.styled)(material_1.SvgIcon)(function (_a) {
    var theme = _a.theme, reversed = _a.reversed;
    return ({
        fontSize: theme.typography.h6.fontSize,
        transform: reversed ? 'scaleX(-1)' : 'scaleX(1)',
    });
});
var StyledTypography = (0, styles_1.styled)(material_1.Typography)(function () { return ({
    whiteSpace: 'nowrap',
    userSelect: 'none',
    lineHeight: 'inherit',
}); });
var StyledBoldTypography = (0, styles_1.styled)(material_1.Typography)(function () { return ({
    whiteSpace: 'nowrap',
    userSelect: 'none',
    lineHeight: 'inherit',
    fontWeight: 'bold',
}); });
var StyledNotificationsTypography = (0, styles_1.styled)(material_1.Typography)(function (_a) {
    var theme = _a.theme;
    return ({
        borderRadius: '8px',
        padding: '0px 6px',
        fontSize: '10px',
        backgroundColor: theme.palette.divider,
        boxShadow: "0px 0px 1px 1px ".concat(theme.palette.background.default, "6"),
        color: theme.palette.text.primary,
    });
});
var StyledImg = (0, styles_1.styled)('img')(function () { return ({
    width: '20px',
    height: '20px',
}); });
/**
 *
 * @param icon - (ReactNode) Icon to display for status element. Expects a Material UI SvgIcon component.
 * @param text - (string | number) Text to display for status element.
 * @param notifications - (number) Badge to display relevant notifications.
 * @param boldText - (string | number) Text to display in a heavier way.
 * @param image - (string) Image to display for status element. Expects a valid image path.
 * @param mask - (boolean) If needs to be applied a circular mask to the image.
 * @param reverse - (boolean) If needs to be applied a reverse of the default order of the elements.
 * @param reverseIcon - (boolean) If needs to be applied a reverse of the given icon.
 * @param className - (HTMLAttribute) Class name to be applied to the root element.
 * @param style - (CSSProperties) Style to be applied to the root element.
 *
 * @returns (JSX.Element) Status element
 */
function default_1(_a) {
    var icon = _a.icon, text = _a.text, notifications = _a.notifications, boldText = _a.boldText, image = _a.image, _b = _a.mask, mask = _b === void 0 ? false : _b, _c = _a.reverse, reverse = _c === void 0 ? false : _c, _d = _a.reverseIcon, reverseIcon = _d === void 0 ? false : _d, className = _a.className, style = _a.style;
    return (0, jsx_runtime_1.jsxs)(StyledBox, __assign({}, { style: style, className: className, reverse: reverse }, { children: [icon && (0, jsx_runtime_1.jsx)(StyledSvgIcon, __assign({}, { color: 'action' }, { reversed: reverseIcon }, { children: icon })), image && (0, jsx_runtime_1.jsx)(StyledImg, __assign({}, { alt: '', style: { borderRadius: mask ? '50%' : '0px' }, src: image })), notifications && (0, jsx_runtime_1.jsx)(StyledNotificationsTypography, __assign({}, { variant: 'subtitle2', color: 'textPrimary' }, { children: notifications })), boldText && (0, jsx_runtime_1.jsx)(StyledBoldTypography, __assign({}, { variant: 'caption', color: 'textPrimary' }, { children: boldText })), text && (0, jsx_runtime_1.jsx)(StyledTypography, __assign({}, { variant: 'caption', color: 'textPrimary' }, { children: text }))] }));
}
exports.default = default_1;
