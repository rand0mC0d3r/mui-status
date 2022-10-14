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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import DataProvider from '../../MuiStore';
var StyledStatusBar = styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        gap: '4px',
        display: 'flex',
        minHeight: '28px',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.background.default
            : theme.palette.background.paper,
        color: "".concat(theme.palette.background.default, " !important"),
        // borderBottom: position === 'top' ? `1px solid ${theme.palette.divider}` : 'none',
        // borderTop: position === 'top' ? 'none' : `1px solid ${theme.palette.divider}`,
    });
});
var StyledPrimaryElem = styled('div')(function () { return ({
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
var StyledSecondaryElem = styled('div')(function () { return ({
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
export default function (_a) {
    var style = _a.style, className = _a.className;
    var status = useContext(DataProvider).status;
    return _jsx(_Fragment, { children: status.some(function (sItem) { return sItem.visible; }) && _jsxs(StyledStatusBar, __assign({}, { id: "".concat(domId, "-wrapper"), style: style, className: className }, { children: [status.some(function (sItem) { return !sItem.secondary; }) && _jsx(StyledPrimaryElem, __assign({}, { id: "".concat(domId, "-primary") })), status.some(function (sItem) { return sItem.secondary; }) && _jsx(StyledSecondaryElem, __assign({}, { id: "".concat(domId, "-secondary") }))] })) });
}
