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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var clsx_1 = __importDefault(require("clsx"));
var react_1 = __importDefault(require("react"));
var useStyles = (0, styles_1.makeStyles)(function (theme) { return ({
    box: {
        gap: '4px',
        color: theme.palette.action.active,
    },
    icon: {
        fontSize: 20
    },
    typography: {
        lineHeight: '0px',
        whiteSpace: 'nowrap',
        userSelect: 'none'
    },
    image: {
        width: '20px',
        height: '20px',
    }
}); });
var MuiStatusChild = function (_a) {
    var icon = _a.icon, text = _a.text, image = _a.image, _b = _a.mask, mask = _b === void 0 ? false : _b, className = _a.className, style = _a.style;
    var theme = (0, styles_1.useTheme)();
    var classes = useStyles(theme);
    return react_1.default.createElement(core_1.Box, __assign({}, { style: style }, { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "nowrap", className: (0, clsx_1.default)([classes.box, className]) }),
        icon && react_1.default.createElement(core_1.SvgIcon, { id: "MupStatus_icon", className: classes.icon, color: 'action' }, icon),
        text && react_1.default.createElement(core_1.Typography, { id: "MupStatus_text", variant: "subtitle2", color: "textPrimary", className: classes.typography }, text),
        image && react_1.default.createElement("img", { id: "MupStatus_image", alt: "injected element", className: classes.image, style: { borderRadius: mask ? '50%' : '0px' }, src: image }));
};
exports.default = MuiStatusChild;
