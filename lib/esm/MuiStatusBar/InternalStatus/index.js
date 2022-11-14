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
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import DataProvider from '../../MuiStore';
var StyledPrimaryElem = styled('div')(function () { return ({
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
    justifyContent: 'flex-start',
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
    flex: '0 1 auto',
    minWidth: '18px',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
}); });
var domId = 'mui-status-statusBar';
export default function () {
    var status = useContext(DataProvider).status;
    return _jsxs(_Fragment, { children: [status.some(function (_a) {
                var secondary = _a.secondary;
                return !secondary;
            }) && _jsx(StyledPrimaryElem, __assign({}, { id: "".concat(domId, "-primary") })), status.some(function (_a) {
                var secondary = _a.secondary;
                return secondary;
            }) && _jsx(StyledSecondaryElem, __assign({}, { id: "".concat(domId, "-secondary") }))] });
}
