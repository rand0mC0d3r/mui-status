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
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MupStatus from '../MuiStatus';
import DataProvider from '../MuiStore';
export default function (_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, style = _a.style, onClick = _a.onClick, _c = _a.tooltip, tooltip = _c === void 0 ? '' : _c, children = _a.children, console = _a.console, consoleTitle = _a.consoleTitle;
    var _d = useContext(DataProvider), status = _d.status, settings = _d.settings, handleStatusTypeUpdate = _d.handleStatusTypeUpdate, handleStatusConsoleTypeUpdate = _d.handleStatusConsoleTypeUpdate, updateConsoleActiveId = _d.updateConsoleActiveId;
    var _e = useState(null), statusObject = _e[0], setStatusObject = _e[1];
    var _f = useState(null), elementFound = _f[0], setElementFound = _f[1];
    var handleOnClick = function () {
        if (onClick) {
            onClick();
        }
        updateConsoleActiveId(settings.consoleActiveId === id ? {} : { id: statusObject === null || statusObject === void 0 ? void 0 : statusObject.uniqueId });
    };
    useEffect(function () {
        if (statusObject !== null && settings.consoleActiveId) {
            setElementFound(document.getElementById('mui-status-console') || null);
        }
    }, [statusObject, settings.consoleActiveId]);
    useEffect(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
            handleStatusTypeUpdate({ id: id, type: 'console' });
        }
    }, [status, id, statusObject]);
    useEffect(function () {
        if (statusObject) {
            handleStatusConsoleTypeUpdate({ id: id, title: consoleTitle });
        }
    }, [statusObject, id, consoleTitle]);
    return _jsxs(_Fragment, { children: [_jsx(MupStatus, __assign({}, {
                id: id,
                tooltip: tooltip,
                secondary: secondary,
                highlight: (statusObject && (statusObject === null || statusObject === void 0 ? void 0 : statusObject.uniqueId) === settings.consoleActiveId) ? 'primary' : 'default',
                onClick: function () { return handleOnClick(); },
                style: __assign(__assign({}, style), { cursor: 'context-menu', minWidth: '24px' })
            }, { children: children })), elementFound && statusObject && statusObject.uniqueId === settings.consoleActiveId && createPortal(console, elementFound)] });
}
