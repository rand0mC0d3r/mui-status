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
var Tooltip_1 = __importDefault(require("../utils/Tooltip"));
var StyledActionsWrapper = (0, styles_1.styled)('div')(function (_a) {
    var theme = _a.theme;
    return ({
        padding: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: "1px solid ".concat(theme.palette.divider),
        userSelect: 'none',
        alignItems: 'center'
    });
});
var StyledActions = (0, styles_1.styled)('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        gap: "".concat(theme.shape.borderRadius, "px"),
        justifyContent: 'flex-end',
        alignItems: 'center'
    });
});
var StyledContainer = (0, styles_1.styled)('div')(function (_a) {
    var theme = _a.theme, elevation = _a.elevation;
    return ({
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: "".concat((0, material_1.alpha)(theme.palette.background.default, 0.75)),
        backdropFilter: 'blur(8px)',
        borderRadius: "".concat(theme.shape.borderRadius, "px"),
        margin: "".concat(theme.spacing(0.5), " 0px"),
        padding: theme.spacing(0.5),
        border: "1px solid ".concat(theme.palette.divider),
        boxShadow: theme.shadows[elevation]
    });
});
var StyledTypography = (0, styles_1.styled)(material_1.Typography)(function () { return ({
    lineHeight: 1
}); });
function default_1(_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, _c = _a.elevation, elevation = _c === void 0 ? 2 : _c, style = _a.style, onClick = _a.onClick, onClose = _a.onClose, highlight = _a.highlight, _d = _a.tooltip, tooltip = _d === void 0 ? '' : _d, children = _a.children, popoverStyle = _a.popoverStyle, popoverClassName = _a.popoverClassName, popover = _a.popover, popoverTitle = _a.popoverTitle, popoverActions = _a.popoverActions;
    var _e = (0, react_1.useContext)(MuiStore_1.default), status = _e.status, settings = _e.settings, popoverComponent = _e.popoverComponent;
    var _f = (0, react_1.useState)(null), statusObject = _f[0], setStatusObject = _f[1];
    var _g = (0, react_1.useState)(false), keepOpen = _g[0], setKeepOpen = _g[1];
    var _h = (0, react_1.useState)(null), anchorEl = _h[0], setAnchorEl = _h[1];
    var _j = (0, react_1.useState)(false), isToggled = _j[0], setIsToggled = _j[1];
    var open = Boolean(anchorEl);
    var anchorVertical = isToggled ? 'top' : 'bottom';
    var transformVertical = !isToggled ? 'bottom' : 'top';
    var horizontal = (statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary) ? 'right' : 'left';
    var handleOnClick = function (e) {
        if (onClick && !keepOpen) {
            onClick();
        }
        if (anchorEl && !keepOpen) {
            setAnchorEl(null);
        }
        else {
            setAnchorEl(e.currentTarget);
        }
        setIsToggled(e.pageY < screen.height / 2);
    };
    var handleOnClose = function () {
        if (onClose && !keepOpen) {
            onClose();
        }
        if (!keepOpen) {
            setAnchorEl(null);
        }
        if (!settings.hasLock) {
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
        id: "mui-status-panel-popover-".concat(id),
        className: popoverClassName,
        style: __assign({ marginTop: "".concat((isToggled ? 1 : -1) * 12, "px") }, popoverStyle),
    };
    (0, react_1.useEffect)(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
        }
    }, [status, id, statusObject]);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(MuiStatus_1.default, __assign({}, {
                id: id,
                tooltip: tooltip,
                highlight: (keepOpen || open) ? 'primary' : highlight,
                secondary: secondary,
                onClick: handleOnClick,
                style: __assign(__assign({}, style), { cursor: 'context-menu', minWidth: '24px' })
            }, { children: children })), popoverComponent !== undefined
                ? popoverComponent(ComponentPopoverProps)
                : (0, jsx_runtime_1.jsx)(material_1.Popper, __assign({}, __assign({ keepMounted: keepOpen }, FallbackPopoverProps), { children: (0, jsx_runtime_1.jsx)(material_1.ClickAwayListener, __assign({ onClickAway: function () { return handleOnClose(); } }, { children: (0, jsx_runtime_1.jsxs)(StyledContainer, __assign({}, { elevation: elevation }, { children: [popover, (0, jsx_runtime_1.jsxs)(StyledActionsWrapper, { children: [(0, jsx_runtime_1.jsx)(StyledTypography, __assign({ variant: "caption", color: "textSecondary" }, { children: popoverTitle })), (0, jsx_runtime_1.jsxs)(StyledActions, { children: [popoverActions, settings.hasLock && (0, jsx_runtime_1.jsx)(Tooltip_1.default, __assign({ tooltip: "Toggle keep-open" }, { children: keepOpen
                                                        ? (0, jsx_runtime_1.jsx)(LockOutlined_1.default, { onClick: function () { return setKeepOpen(!keepOpen); }, color: "primary", style: { fontSize: 14 } })
                                                        : (0, jsx_runtime_1.jsx)(LockOpenOutlined_1.default, { onClick: function () { return setKeepOpen(!keepOpen); }, style: { fontSize: 14 } }) }))] })] })] })) })) }))] });
}
exports.default = default_1;
