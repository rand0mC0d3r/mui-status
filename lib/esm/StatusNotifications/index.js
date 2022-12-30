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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { alpha, ClickAwayListener, Popper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
// import InternalHeader from '../internal/InternalHeader'
import Status from '../Status';
import DataProvider from '../Store';
var StyledPopper = styled(Popper)(function (_a) {
    var toggled = _a.toggled;
    return ({
        zIndex: '99991',
        marginTop: "".concat((toggled === 'true' ? 1 : -1) * 4, "px !important"),
    });
});
var StyledContainer = styled('div')(function (_a) {
    var theme = _a.theme, elevation = _a.elevation;
    return ({
        display: 'flex',
        width: '650px',
        gap: '8px',
        alignItems: 'stretch',
        position: 'relative',
        flexDirection: 'column',
        backgroundColor: "".concat(alpha(theme.palette.background.default, 0.75)),
        backdropFilter: 'blur(8px)',
        borderRadius: "".concat(theme.shape.borderRadius, "px"),
        margin: "".concat(theme.spacing(0.5), " 0px"),
        padding: theme.spacing(0.5),
        border: "3px solid ".concat(theme.palette.primary.main),
        boxShadow: theme.shadows[elevation]
    });
});
export default function (_a) {
    var _b = _a.id, id = _b === void 0 ? 'notificationsPanel' : _b;
    var _c = useContext(DataProvider), status = _c.status, 
    // snackbar,
    settings = _c.settings;
    var _d = useState(null), statusObject = _d[0], setStatusObject = _d[1];
    var _e = useState(null), anchorEl = _e[0], setAnchorEl = _e[1];
    var _f = useState(false), isToggled = _f[0], setIsToggled = _f[1];
    var open = Boolean(anchorEl);
    var handleOnClick = function (e) {
        if (anchorEl) {
            setAnchorEl(null);
        }
        else {
            setAnchorEl(e.currentTarget);
        }
        setIsToggled(e.pageY < screen.height / 2);
    };
    var handleOnClose = function () {
        if (!settings.hasLock) {
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
                tooltip: 'Notifications',
                hasArrow: open,
                highlight: open ? 'primary' : 'default',
                secondary: true,
                onClick: handleOnClick,
            }, { children: "ffff" })), _jsx(StyledPopper, __assign({}, {
                open: open,
                anchorEl: anchorEl,
                id: "mui-status-panel-popover-".concat(id),
                toggled: isToggled.toString(),
            }, { children: _jsx(ClickAwayListener, __assign({ onClickAway: function () { return handleOnClose(); } }, { children: _jsx(StyledContainer, __assign({}, { elevation: 0 }, { children: _jsx("div", __assign({ style: { position: 'absolute', top: '-17px', left: '0px', right: '0px', display: 'flex', justifyContent: 'center' } }, { children: _jsx(ArrowDropUpOutlinedIcon, { color: "primary" }) })) })) })) }))] });
}
