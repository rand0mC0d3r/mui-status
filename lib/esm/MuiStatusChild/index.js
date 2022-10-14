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
import { SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
var StyledBox = styled('div')(function (_a) {
    var theme = _a.theme, reverse = _a.reverse;
    return ({
        gap: '4px',
        color: theme.palette.action.active,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        flexDirection: reverse ? 'row-reverse' : 'row',
    });
});
var StyledSvgIcon = styled(SvgIcon)(function (_a) {
    var reverseIcon = _a.reverseIcon;
    return ({
        fontSize: 20,
        'shape-rendering': 'geometricprecision',
        transform: reverseIcon ? 'scaleX(-1)' : 'scaleX(1)',
    });
});
var StyledTypography = styled(Typography)(function () { return ({
    whiteSpace: 'nowrap',
    userSelect: 'none',
    lineHeight: '1',
    fontSize: '12px',
    '-webkit-font-smoothing': 'antialiased',
}); });
var StyledBoldTypography = styled(Typography)(function () { return ({
    whiteSpace: 'nowrap',
    userSelect: 'none',
    lineHeight: '1',
    fontSize: '14px',
    fontWeight: 'bold',
    '-webkit-font-smoothing': 'antialiased',
}); });
var StyledImg = styled('img')(function () { return ({
    width: '20px',
    height: '20px',
}); });
/**
 *
 * @param icon - (ReactNode) Icon to display for status element. Expects a Material UI SvgIcon component.
 * @param text - (string) Text to display for status element.
 * @param image - (string) Image to display for status element. Expects a valid image path.
 * @param mask - (boolean) If needs to be applied a circular mask to the image.
 * @param reverse - (boolean) If needs to be applied a reverse of the default order of the elements
 * @param reverseIcon - (boolean) If needs to be applied a reverse of the given icon
 * @param className - (HTMLAttribute) Class name to be applied to the root element.
 * @param style - (CSSProperties) Style to be applied to the root element.
 *
 * @returns (JSX.Element) Status element
 */
export default function (_a) {
    var icon = _a.icon, text = _a.text, boldText = _a.boldText, image = _a.image, _b = _a.mask, mask = _b === void 0 ? false : _b, _c = _a.reverse, reverse = _c === void 0 ? false : _c, _d = _a.reverseIcon, reverseIcon = _d === void 0 ? false : _d, className = _a.className, style = _a.style;
    return _jsxs(StyledBox, __assign({}, { style: style, className: className, reverse: reverse }, { children: [icon && _jsx(StyledSvgIcon, __assign({}, { color: 'action', reverseIcon: reverseIcon }, { children: icon })), boldText && _jsx(StyledBoldTypography, __assign({}, { variant: 'subtitle2', color: 'textPrimary' }, { children: boldText })), text && _jsx(StyledTypography, __assign({}, { variant: 'caption', color: 'textPrimary' }, { children: text })), image && _jsx(StyledImg, __assign({}, { alt: '', style: { borderRadius: mask ? '50%' : '0px' }, src: image }))] }));
}