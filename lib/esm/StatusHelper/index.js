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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
var SStack = styled(Stack)(function (_a) {
    var theme = _a.theme, reverse = _a.reverse;
    return ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        userSelect: 'none',
        WebkitFontSmoothing: 'antialiased',
        shapeRendering: 'geometricPrecision',
        gap: "".concat(theme.spacing(0.5)),
        flexDirection: reverse === 'true' ? 'row-reverse' : 'row',
    });
});
var SIcon = styled(SvgIcon)(function (_a) {
    var reverse = _a.reverse;
    return ({
        fontSize: '14px',
        width: '14px',
        height: '14px',
        flex: '0 1 100%',
        transform: reverse === 'true' ? 'scaleX(-1)' : 'scaleX(1)',
    });
});
var SText = styled(Typography)(function () { return ({
    whiteSpace: 'nowrap',
    userSelect: 'none',
    fontSize: '12px',
    lineHeight: 'inherit',
}); });
var SNotifications = styled(Typography)(function (_a) {
    var theme = _a.theme;
    return ({
        padding: '0px 6px',
        lineHeight: '1.3',
        fontSize: '10px',
        color: theme.palette.text.primary,
        borderRadius: "".concat(theme.shape.borderRadius * 2, "px"),
        backgroundColor: theme.palette.divider,
        border: "0.5px solid ".concat(theme.palette.divider),
    });
});
var SImg = styled('img')(function (_a) {
    var mask = _a.mask;
    return ({
        width: '18px',
        height: '18px',
        borderRadius: mask === 'true' ? '50%' : '0px',
    });
});
/**
 * @param icon - (JSX.Element) Icon to display for status element. Expects a Material UI SvgIcon component.
 * @param text - (string | number) Text to display for status element.
 * @param notifications - (string | number) Badge to display relevant notifications.
 * @param image - (string) Image to display for status element. Expects a valid image path.
 * @param mask - (boolean) If needs to be applied a circular mask to the image.
 * @param reverse - (boolean) If needs to be applied a reverse of the default order of the elements.
 * @param reverseIcon - (boolean) If needs to be applied a reverse of the given icon.
 * @param className - (HTMLAttribute) Class name to be applied to the root element.
 * @param style - (CSSProperties) Style to be applied to the root element.
 *
 * @returns (JSX.Element) Status helper element
 */
export default function (_a) {
    var icon = _a.icon, text = _a.text, notifications = _a.notifications, image = _a.image, _b = _a.mask, mask = _b === void 0 ? false : _b, _c = _a.reverse, reverse = _c === void 0 ? false : _c, _d = _a.reverseIcon, reverseIcon = _d === void 0 ? false : _d, className = _a.className, style = _a.style;
    return _jsxs(SStack, __assign({}, { id: 'statusHelper', style: style, className: className, reverse: reverse.toString() }, { children: [icon && _jsx(SIcon, __assign({}, { id: 'sh.icon', reverse: reverseIcon.toString() }, { children: icon })), image && _jsx(SImg, __assign({}, { id: 'sh.image', alt: 'Status entry', mask: mask.toString(), src: image })), notifications && _jsx(SNotifications, __assign({}, { id: 'sh.notifications' }, { children: notifications })), text && _jsx(SText, __assign({}, { id: 'sh.text', variant: 'caption' }, { children: text }))] }));
}
