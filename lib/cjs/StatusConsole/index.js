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
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var Status_1 = __importDefault(require("../Status"));
var Store_1 = __importDefault(require("../Store"));
function default_1(_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, style = _a.style, onClick = _a.onClick, _c = _a.tooltip, tooltip = _c === void 0 ? '' : _c, children = _a.children, console = _a.console, consoleTitle = _a.consoleTitle;
    var _d = (0, react_1.useContext)(Store_1.default), status = _d.status, handleStatusTypeUpdate = _d.handleStatusTypeUpdate, handleStatusConsoleTypeUpdate = _d.handleStatusConsoleTypeUpdate, updateConsoleActiveId = _d.updateConsoleActiveId;
    var _e = (0, react_1.useContext)(Store_1.default).settings, consoleActiveId = _e.consoleActiveId, isConsoleOpen = _e.isConsoleOpen;
    var _f = (0, react_1.useState)(null), statusObject = _f[0], setStatusObject = _f[1];
    var _g = (0, react_1.useState)(null), elementFound = _g[0], setElementFound = _g[1];
    var handleOnClick = function () {
        if (onClick) {
            onClick();
        }
        if (!isConsoleOpen) {
            updateConsoleActiveId({ id: statusObject === null || statusObject === void 0 ? void 0 : statusObject.uniqueId });
        }
        else {
            updateConsoleActiveId(consoleActiveId === id ? {} : { id: statusObject === null || statusObject === void 0 ? void 0 : statusObject.uniqueId });
        }
    };
    (0, react_1.useEffect)(function () {
        setElementFound(document.getElementById('mui-status-console') || null);
    }, [statusObject, consoleActiveId, isConsoleOpen]);
    (0, react_1.useEffect)(function () {
        var foundObject = status.find(function (_a) {
            var uniqueId = _a.uniqueId;
            return uniqueId === id;
        });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
            handleStatusTypeUpdate({ id: id, type: 'console' });
        }
    }, [status, id, statusObject]);
    (0, react_1.useEffect)(function () {
        if (statusObject) {
            handleStatusConsoleTypeUpdate({ id: id, title: consoleTitle });
        }
    }, [statusObject, id, consoleTitle]);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Status_1.default, __assign({}, {
                id: id,
                tooltip: tooltip,
                secondary: secondary,
                highlight: (statusObject && isConsoleOpen && (statusObject === null || statusObject === void 0 ? void 0 : statusObject.uniqueId) === consoleActiveId) ? 'primary' : 'default',
                onClick: function () { return handleOnClick(); },
                style: __assign(__assign({}, style), { cursor: 'context-menu', minWidth: '24px' })
            }, { children: children })), elementFound && statusObject && statusObject.uniqueId === consoleActiveId && (0, react_dom_1.createPortal)(console, elementFound)] });
}
exports.default = default_1;
