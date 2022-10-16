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
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MupStatus from '../MuiStatus';
import DataProvider from '../MuiStore';
var StyledContainer = styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        order: -1,
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(8px)',
        minHeight: '350px',
        border: "1px solid ".concat(theme.palette.primary.main),
    });
});
export default function (_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, style = _a.style, onClick = _a.onClick, 
    // onClose,
    highlight = _a.highlight, _c = _a.tooltip, tooltip = _c === void 0 ? '' : _c, children = _a.children, console = _a.console;
    var _d = useContext(DataProvider), status = _d.status, handleStatusTypeUpdate = _d.handleStatusTypeUpdate;
    var _e = useState(null), statusObject = _e[0], setStatusObject = _e[1];
    var _f = useState(false), keepOpen = _f[0], setKeepOpen = _f[1];
    var _g = useState(null), anchorEl = _g[0], setAnchorEl = _g[1];
    var _h = useState(null), elementFound = _h[0], setElementFound = _h[1];
    var open = Boolean(anchorEl);
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
    };
    useEffect(function () {
        if (statusObject !== null) {
            setElementFound(document.getElementById('mui-status-console') || null);
        }
    }, [statusObject]);
    useEffect(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
            handleStatusTypeUpdate({ id: id, type: 'console' });
        }
    }, [status, id, statusObject]);
    return _jsxs(_Fragment, { children: [_jsx(MupStatus, __assign({}, {
                id: id,
                tooltip: tooltip,
                highlight: (keepOpen || open) ? 'primary' : highlight,
                secondary: secondary,
                onClick: handleOnClick,
                style: __assign(__assign({}, style), { cursor: 'context-menu', minWidth: '24px' })
            }, { children: children })), open && elementFound && createPortal(_jsx(StyledContainer, { children: console }), elementFound)] });
}
