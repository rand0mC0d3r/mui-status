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
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
var LockOpenOutlined_1 = __importDefault(require("@mui/icons-material/LockOpenOutlined"));
var LockOutlined_1 = __importDefault(require("@mui/icons-material/LockOutlined"));
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var react_1 = require("react");
var MuiStatus_1 = __importDefault(require("../MuiStatus"));
var MuiStore_1 = __importDefault(require("../MuiStore"));
var StyledLock = (0, styles_1.styled)('div')(function () { return ({
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px dotted #000000',
}); });
var StyledContainer = (0, styles_1.styled)('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(5px)',
        borderRadius: '4px',
        border: "1px solid ".concat(theme.palette.divider),
    });
});
function default_1(_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, _c = _a.elevation, elevation = _c === void 0 ? 4 : _c, style = _a.style, highlight = _a.highlight, _d = _a.tooltip, tooltip = _d === void 0 ? '' : _d, children = _a.children, popoverStyle = _a.popoverStyle, popoverClassName = _a.popoverClassName, popover = _a.popover;
    var _e = (0, react_1.useContext)(MuiStore_1.default), status = _e.status, popoverComponent = _e.popoverComponent;
    var _f = (0, react_1.useState)(null), statusObject = _f[0], setStatusObject = _f[1];
    var _g = (0, react_1.useState)(false), keepOpen = _g[0], setKeepOpen = _g[1];
    var _h = (0, react_1.useState)(null), anchorEl = _h[0], setAnchorEl = _h[1];
    var _j = (0, react_1.useState)(false), isToggled = _j[0], setIsToggled = _j[1];
    var open = Boolean(anchorEl);
    var anchorVertical = isToggled ? 'top' : 'bottom';
    var transformVertical = !isToggled ? 'bottom' : 'top';
    var horizontal = (statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary) ? 'right' : 'left';
    var onClick = function (e) {
        if (anchorEl) {
            setAnchorEl(null);
        }
        else {
            setAnchorEl(e.currentTarget);
        }
        setIsToggled(e.pageY < screen.height / 2);
    };
    var onClose = function () {
        if (!keepOpen) {
            setAnchorEl(null);
        }
    };
    var ComponentPopoverProps = {
        id: "mui-status-panel-given-popover-".concat(id),
        position: isToggled ? 'top' : 'bottom',
        isSecondary: statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary,
        popover: popover,
        popoverProps: {
            anchorEl: anchorEl,
            onClose: onClose,
            open: open,
            style: { marginTop: "".concat((isToggled ? 1 : -1) * 12, "px") },
            anchorOrigin: { vertical: anchorVertical, horizontal: horizontal },
            transformOrigin: { vertical: transformVertical, horizontal: horizontal },
        }
    };
    var FallbackPopoverProps = {
        open: open,
        anchorEl: anchorEl,
        onClose: onClose,
        elevation: elevation,
        disableEnforceFocus: true,
        id: "mui-status-panel-popover-".concat(id),
        className: popoverClassName,
        marginThreshold: 36,
        style: __assign({ marginTop: "".concat((isToggled ? 1 : -1) * 12, "px") }, popoverStyle),
    };
    (0, react_1.useEffect)(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
        }
    }, [status, id, statusObject]);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(MuiStatus_1.default, __assign({}, { id: id, tooltip: tooltip, highlight: highlight, secondary: secondary, onClick: onClick, style: __assign(__assign({}, style), { minWidth: '24px' }) }, { children: children })), popoverComponent !== undefined
                ? popoverComponent(ComponentPopoverProps)
                : (0, jsx_runtime_1.jsx)(material_1.Popper, __assign({}, __assign({ keepMounted: keepOpen }, FallbackPopoverProps), { children: (0, jsx_runtime_1.jsx)(material_1.ClickAwayListener, __assign({ onClickAway: function () { return onClose(); } }, { children: (0, jsx_runtime_1.jsxs)(StyledContainer, __assign({}, { style: { margin: '8px' } }, { children: [popover, (0, jsx_runtime_1.jsx)(StyledLock, __assign({ onClick: function () { return setKeepOpen(!keepOpen); } }, { children: keepOpen
                                        ? (0, jsx_runtime_1.jsx)(LockOutlined_1.default, { color: "primary", style: { fontSize: 14 } })
                                        : (0, jsx_runtime_1.jsx)(LockOpenOutlined_1.default, { style: { fontSize: 14 } }) }))] })) })) }))] });
}
exports.default = default_1;
