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
import { alpha, ClickAwayListener, Popper, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import Status from '../Status';
import DataProvider from '../Store';
var StyledActionsWrapper = styled('div')(function (_a) {
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
var StyledActions = styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        gap: "".concat(theme.shape.borderRadius, "px"),
        justifyContent: 'flex-end',
        alignItems: 'center'
    });
});
var StyledContainer = styled('div')(function (_a) {
    var theme = _a.theme, elevation = _a.elevation;
    return ({
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: "".concat(alpha(theme.palette.background.default, 0.75)),
        backdropFilter: 'blur(8px)',
        borderRadius: "".concat(theme.shape.borderRadius, "px"),
        margin: "".concat(theme.spacing(0.5), " 0px"),
        padding: theme.spacing(0.5),
        border: "1px solid ".concat(theme.palette.divider),
        boxShadow: theme.shadows[elevation]
    });
});
var StyledTypography = styled(Typography)(function () { return ({
    lineHeight: 1
}); });
export default function (_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, _c = _a.elevation, elevation = _c === void 0 ? 2 : _c, style = _a.style, onClick = _a.onClick, onClose = _a.onClose, highlight = _a.highlight, _d = _a.tooltip, tooltip = _d === void 0 ? '' : _d, children = _a.children, popoverStyle = _a.popoverStyle, popoverClassName = _a.popoverClassName, popover = _a.popover, popoverTitle = _a.popoverTitle, popoverActions = _a.popoverActions;
    var _e = useContext(DataProvider), status = _e.status, settings = _e.settings;
    var _f = useState(null), statusObject = _f[0], setStatusObject = _f[1];
    var _g = useState(false), keepOpen = _g[0], setKeepOpen = _g[1];
    var _h = useState(null), anchorEl = _h[0], setAnchorEl = _h[1];
    var _j = useState(false), isToggled = _j[0], setIsToggled = _j[1];
    var open = Boolean(anchorEl);
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
        if (!keepOpen || !settings.hasLock) {
            setAnchorEl(null);
        }
    };
    useEffect(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
        }
    }, [status, id, statusObject]);
    return _jsxs(_Fragment, { children: [_jsx(Status, __assign({}, {
                id: id,
                tooltip: tooltip,
                highlight: (keepOpen || open) ? 'primary' : highlight,
                secondary: secondary,
                onClick: handleOnClick,
                style: __assign(__assign({}, style), { cursor: 'context-menu', minWidth: '24px' })
            }, { children: children })), _jsx(Popper, __assign({}, {
                keepMounted: keepOpen,
                open: open,
                anchorEl: anchorEl,
                onClose: onClose,
                elevation: elevation,
                id: "mui-status-panel-popover-".concat(id),
                className: popoverClassName,
                style: __assign({ zIndex: '9999', marginTop: "".concat((isToggled ? 1 : -1) * 12, "px") }, popoverStyle)
            }, { children: _jsx(ClickAwayListener, __assign({ onClickAway: function () { return handleOnClose(); } }, { children: _jsxs(StyledContainer, __assign({}, { elevation: elevation }, { children: [popover, _jsxs(StyledActionsWrapper, { children: [_jsx(StyledTypography, __assign({ variant: "caption", color: "textSecondary" }, { children: popoverTitle })), _jsxs(StyledActions, { children: [popoverActions, settings.hasLock && _jsx(Tooltip, __assign({ title: "Toggle keep-open" }, { children: keepOpen
                                                    ? _jsx(LockOutlinedIcon, { onClick: function () { return setKeepOpen(!keepOpen); }, color: "primary", style: { fontSize: 14 } })
                                                    : _jsx(LockOpenOutlinedIcon, { onClick: function () { return setKeepOpen(!keepOpen); }, style: { fontSize: 14 } }) }))] })] })] })) })) }))] });
}
