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
var material_1 = require("@mui/material");
var react_1 = require("react");
var MuiStatus_1 = __importDefault(require("../MuiStatus"));
var MuiStore_1 = __importDefault(require("../MuiStore"));
function default_1(_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, _c = _a.elevation, elevation = _c === void 0 ? 4 : _c, style = _a.style, _d = _a.tooltip, tooltip = _d === void 0 ? '' : _d, children = _a.children, popoverStyle = _a.popoverStyle, popoverClassName = _a.popoverClassName, popover = _a.popover;
    var _e = (0, react_1.useContext)(MuiStore_1.default), status = _e.status, popoverComponent = _e.popoverComponent;
    var _f = (0, react_1.useState)(null), statusObject = _f[0], setStatusObject = _f[1];
    var _g = (0, react_1.useState)(null), anchorEl = _g[0], setAnchorEl = _g[1];
    var _h = (0, react_1.useState)(false), isToggled = _h[0], setIsToggled = _h[1];
    var open = Boolean(anchorEl);
    var anchorVertical = isToggled ? 'top' : 'bottom';
    var transformVertical = !isToggled ? 'bottom' : 'top';
    var horizontal = (statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary) ? 'right' : 'left';
    var onClick = function (e) {
        setAnchorEl(e.currentTarget);
        setIsToggled(e.pageY < screen.height / 2);
    };
    var onClose = function () { return setAnchorEl(null); };
    var ComponentPopoverProps = {
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
        style: __assign(__assign({}, popoverStyle), { marginTop: "".concat((isToggled ? 1 : -1) * 12, "px") }),
    };
    (0, react_1.useEffect)(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
        }
    }, [status, id, statusObject]);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(MuiStatus_1.default, __assign({}, { id: id, tooltip: tooltip, secondary: secondary, onClick: onClick, style: __assign(__assign({}, style), { minWidth: '24px' }) }, { children: children })), popoverComponent !== undefined
                ? popoverComponent(ComponentPopoverProps)
                : (0, jsx_runtime_1.jsx)(material_1.Popover, __assign({}, __assign(__assign({}, FallbackPopoverProps), { anchorOrigin: { vertical: anchorVertical, horizontal: horizontal }, transformOrigin: { vertical: transformVertical, horizontal: horizontal } }), { children: popover }))] });
}
exports.default = default_1;
