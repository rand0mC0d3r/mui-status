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
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import DataProvider from '../../Store';
import InternalAlert from '../InternalAlert';
var SWrapper = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '550px',
}); });
export default function () {
    var snackbar = useContext(DataProvider).snackbar;
    return _jsx(SWrapper, { children: snackbar.map(function (_a) {
            var uniqueId = _a.uniqueId, severity = _a.severity, message = _a.message, source = _a.source, actions = _a.actions, code = _a.code;
            return (_jsx(InternalAlert, __assign({}, { uniqueId: uniqueId, actions: actions, severity: severity, source: source, message: message, code: code }), uniqueId));
        }) });
}
