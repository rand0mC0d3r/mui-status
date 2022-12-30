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
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Alert, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
var SCode = styled('textarea')(function (_a) {
    var height = _a.height, theme = _a.theme;
    return ({
        fontFamily: 'monospace',
        backgroundColor: "".concat(theme.palette.divider),
        padding: '8px',
        resize: 'vertical',
        whiteSpace: 'nowrap',
        marginTop: '8px',
        marginBottom: '8px',
        borderColor: 'inherit',
        maxHeight: '300px',
        minHeight: "".concat((height * 20) + 10, "px"),
        borderRadius: '4px',
        color: 'inherit',
        '&:focus-visible': {
            outline: '0px',
        },
    });
});
var SMessage = styled(Typography)(function (_a) {
    var ellipsis = _a.ellipsis;
    return ({
        whiteSpace: ellipsis === 'true' ? 'nowrap' : 'normal',
        overflow: ellipsis === 'true' ? 'hidden' : 'unset',
        textOverflow: ellipsis === 'true' ? 'ellipsis' : 'unset',
        lineHeight: ellipsis === 'true' ? 'initial' : '1.65',
    });
});
var SAlert = styled(Alert)(function (_a) {
    var expanded = _a.expanded, actions = _a.actions;
    return ({
        '.MuiAlert-message': {
            minWidth: 'unset',
            width: '100%',
            padding: expanded === 'true' ? '8px 0px' : '0px',
            display: 'flex',
            flexDirection: (actions === 'true' || expanded === 'true') ? 'column' : 'row',
        },
    });
});
export default function (_a) {
    var uniqueId = _a.uniqueId, actions = _a.actions, source = _a.source, severity = _a.severity, message = _a.message, code = _a.code, _b = _a.isRemoveFlag, isRemoveFlag = _b === void 0 ? false : _b;
    var _c = useState(false), isExpanded = _c[0], setIsExpanded = _c[1];
    useEffect(function () {
        if (actions) {
            setIsExpanded(true);
        }
    }, [actions]);
    var getMessage = function (ellipsis) {
        if (ellipsis === void 0) { ellipsis = false; }
        return _jsx(SMessage, __assign({ ellipsis: ellipsis.toString() }, { children: message }));
    };
    return _jsxs(SAlert, __assign({ expanded: isExpanded.toString(), actions: ((actions === null || actions === void 0 ? void 0 : actions.length) > 0).toString(), icon: _jsx(Tooltip, __assign({ arrow: true, title: severity }, { children: _jsxs("span", __assign({ style: { lineHeight: '0px' } }, { children: [severity === 'info' && _jsx(PriorityHighOutlinedIcon, { fontSize: "inherit" }), severity === 'success' && _jsx(CheckIcon, { fontSize: "inherit" }), severity === 'warning' && _jsx(WarningAmberIcon, { fontSize: "inherit" }), severity === 'error' && _jsx(ErrorOutlineOutlinedIcon, { fontSize: "inherit" })] })) })) }, { severity: severity }, { children: [_jsx(Header, __assign({}, { uniqueId: uniqueId, actions: actions, severity: severity, message: message, isRemoveFlag: isRemoveFlag })), (isExpanded || actions) && getMessage(), isExpanded && code && _jsx(SCode, { defaultValue: code, height: Math.min(10, code.split('\n').length) }), (isExpanded || actions) && _jsx(_Fragment, { children: (source || actions) && _jsx(Footer, __assign({}, { actions: actions, severity: severity, source: source })) })] }), uniqueId);
}
