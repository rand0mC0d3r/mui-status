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
import { Popover } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import MupStatus from '../MuiStatus';
import DataProvider from '../MuiStore';
var MuiStatusPanel = function (_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, _c = _a.elevation, elevation = _c === void 0 ? 4 : _c, style = _a.style, _d = _a.tooltip, tooltip = _d === void 0 ? "" : _d, children = _a.children, popoverStyle = _a.popoverStyle, popoverClassName = _a.popoverClassName, popover = _a.popover;
    var _e = useContext(DataProvider), status = _e.status, popoverComponent = _e.popoverComponent;
    var _f = useState(null), statusObject = _f[0], setStatusObject = _f[1];
    var _g = useState(null), anchorEl = _g[0], setAnchorEl = _g[1];
    var _h = useState(false), isToggled = _h[0], setIsToggled = _h[1];
    var open = Boolean(anchorEl);
    useEffect(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
        }
    }, [status, id, statusObject]);
    var onClick = function (e) {
        setAnchorEl(e.currentTarget);
        setIsToggled(e.pageY < screen.height / 2);
    };
    var onClose = function () { return setAnchorEl(null); };
    return React.createElement(React.Fragment, null,
        React.createElement(MupStatus, __assign({}, { id: id, tooltip: tooltip, secondary: secondary, onClick: onClick }, { style: __assign(__assign({}, style), { minWidth: '24px' }) }), children),
        popoverComponent !== undefined
            ? React.createElement(React.Fragment, null, popoverComponent({
                position: isToggled ? 'top' : 'bottom',
                isSecondary: statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary,
                popover: popover,
                popoverProps: {
                    anchorEl: anchorEl,
                    onClose: onClose,
                    open: open,
                    style: { marginTop: "".concat((isToggled ? 1 : -1) * 12, "px") },
                    anchorOrigin: {
                        vertical: isToggled ? 'top' : 'bottom',
                        horizontal: (statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary) ? 'right' : 'left'
                    },
                    transformOrigin: {
                        vertical: !isToggled ? 'bottom' : 'top',
                        horizontal: (statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary) ? 'right' : 'left'
                    }
                }
            }))
            : React.createElement(React.Fragment, null,
                React.createElement(Popover, __assign({}, { open: open, anchorEl: anchorEl, onClose: onClose, elevation: elevation }, { id: "".concat(id, "-status-popover"), className: popoverClassName, style: __assign(__assign({}, popoverStyle), { marginTop: "".concat((isToggled ? 1 : -1) * 12, "px") }), anchorOrigin: {
                        vertical: isToggled ? 'top' : 'bottom',
                        horizontal: (statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary) ? 'right' : 'left'
                    }, transformOrigin: {
                        vertical: !isToggled ? 'bottom' : 'top',
                        horizontal: (statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary) ? 'right' : 'left'
                    } }), popover)));
};
export default MuiStatusPanel;
