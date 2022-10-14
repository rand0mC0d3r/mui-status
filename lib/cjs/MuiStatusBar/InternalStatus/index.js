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
/* eslint-disable @typescript-eslint/no-explicit-any */
var styles_1 = require("@mui/material/styles");
var react_1 = require("react");
var MuiStore_1 = __importDefault(require("../../MuiStore"));
var StyledStatusBar = (0, styles_1.styled)('div')(function (_a) {
    var theme = _a.theme;
    return ({
        gap: '4px',
        display: 'flex',
        minHeight: '28px',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.divider
            : theme.palette.background.paper,
        color: "".concat(theme.palette.background.default, " !important"),
        // borderBottom: position === 'top' ? `1px solid ${theme.palette.divider}` : 'none',
        // borderTop: position === 'top' ? 'none' : `1px solid ${theme.palette.divider}`,
    });
});
var StyledPrimaryElem = (0, styles_1.styled)('div')(function () { return ({
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
    justifyContent: 'flex-start',
    scrollSnapType: 'both mandatory',
    gap: '4px',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
}); });
var StyledSecondaryElem = (0, styles_1.styled)('div')(function () { return ({
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    scrollSnapType: 'both mandatory',
    gap: '4px',
    flex: '1 1 auto',
    width: '0px',
    minWidth: '18px',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
}); });
var domId = 'mui-status-statusBar';
function default_1(_a) {
    var style = _a.style, className = _a.className;
    var status = (0, react_1.useContext)(MuiStore_1.default).status;
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: status.some(function (sItem) { return sItem.visible; }) && (0, jsx_runtime_1.jsxs)(StyledStatusBar, __assign({}, { id: "".concat(domId, "-wrapper"), style: style, className: className }, { children: [status.some(function (sItem) { return !sItem.secondary; }) && (0, jsx_runtime_1.jsx)(StyledPrimaryElem, __assign({}, { id: "".concat(domId, "-primary") })), status.some(function (sItem) { return sItem.secondary; }) && (0, jsx_runtime_1.jsx)(StyledSecondaryElem, __assign({}, { id: "".concat(domId, "-secondary") }))] })) });
}
exports.default = default_1;
