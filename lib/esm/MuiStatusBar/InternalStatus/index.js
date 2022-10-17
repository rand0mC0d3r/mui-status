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
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import DataProvider from '../../MuiStore';
import Tooltip from '../../utils/Tooltip';
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
    flex: '0 1 auto',
    minWidth: '18px',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
}); });
var StyledKeyboardDoubleArrowUpIcon = styled(KeyboardDoubleArrowUpIcon)(function () { return ({
    fontSize: 12
}); });
var domId = 'mui-status-statusBar';
export default function () {
    var _a = useContext(DataProvider), status = _a.status, updateIsConsoleOpen = _a.updateIsConsoleOpen;
    return _jsxs(_Fragment, { children: [status.some(function (sItem) { return !sItem.secondary; }) && _jsx(StyledPrimaryElem, __assign({}, { id: "".concat(domId, "-primary") })), _jsx(Tooltip, __assign({}, { tooltip: 'Toggle console view' }, { children: _jsx(StyledKeyboardDoubleArrowUpIcon, __assign({}, { onDoubleClick: function () { return updateIsConsoleOpen(); } })) })), status.some(function (sItem) { return sItem.secondary; }) && _jsx(StyledSecondaryElem, __assign({}, { id: "".concat(domId, "-secondary") }))] });
}
