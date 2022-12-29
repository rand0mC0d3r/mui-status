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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import DataProvider from '../../Store';
var SWrapper = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '450px',
}); });
export default function () {
    var snackbar = useContext(DataProvider).snackbar;
    return _jsx(SWrapper, { children: snackbar.map(function (_a) {
            var uniqueId = _a.uniqueId, severity = _a.severity, message = _a.message, code = _a.code;
            return (_jsxs(Alert, __assign({}, { severity: severity }, { onClose: function () { } }, { children: [message, _jsx("code", { children: code })] }), uniqueId));
        }) });
}
