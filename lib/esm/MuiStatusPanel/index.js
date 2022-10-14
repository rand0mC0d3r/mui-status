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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ClickAwayListener, Popper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import MupStatus from '../MuiStatus';
import DataProvider from '../MuiStore';
var StyledLock = styled('div')(function () { return ({
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px dotted #000000',
}); });
var StyledContainer = styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(5px)',
        borderRadius: '4px',
        border: "1px solid ".concat(theme.palette.primary.main),
        boxShadow: theme.shadows[4]
    });
});
export default function (_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, _c = _a.elevation, elevation = _c === void 0 ? 4 : _c, style = _a.style, onClick = _a.onClick, highlight = _a.highlight, _d = _a.tooltip, tooltip = _d === void 0 ? '' : _d, children = _a.children, popoverStyle = _a.popoverStyle, popoverClassName = _a.popoverClassName, popover = _a.popover;
    var _e = useContext(DataProvider), status = _e.status, popoverComponent = _e.popoverComponent;
    var _f = useState(null), statusObject = _f[0], setStatusObject = _f[1];
    var _g = useState(false), keepOpen = _g[0], setKeepOpen = _g[1];
    var _h = useState(null), anchorEl = _h[0], setAnchorEl = _h[1];
    var _j = useState(false), isToggled = _j[0], setIsToggled = _j[1];
    var open = Boolean(anchorEl);
    var anchorVertical = isToggled ? 'top' : 'bottom';
    var transformVertical = !isToggled ? 'bottom' : 'top';
    var horizontal = (statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary) ? 'right' : 'left';
    var handleOnClick = function (e) {
        if (onClick) {
            onClick();
        }
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
    useEffect(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
        }
    }, [status, id, statusObject]);
    return _jsxs(_Fragment, { children: [_jsx(MupStatus, __assign({}, { id: id, tooltip: tooltip, highlight: highlight, secondary: secondary, onClick: handleOnClick, style: __assign(__assign({}, style), { minWidth: '24px' }) }, { children: children })), popoverComponent !== undefined
                ? popoverComponent(ComponentPopoverProps)
                : _jsx(Popper, __assign({}, __assign({ keepMounted: keepOpen }, FallbackPopoverProps), { children: _jsx(ClickAwayListener, __assign({ onClickAway: function () { return onClose(); } }, { children: _jsxs(StyledContainer, __assign({}, { style: { margin: '8px' } }, { children: [popover, _jsx(StyledLock, __assign({ onClick: function () { return setKeepOpen(!keepOpen); } }, { children: keepOpen
                                        ? _jsx(LockOutlinedIcon, { color: "primary", style: { fontSize: 14 } })
                                        : _jsx(LockOpenOutlinedIcon, { style: { fontSize: 14 } }) }))] })) })) }))] });
}
