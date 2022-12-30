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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { cloneElement, Fragment } from 'react';
var buttonColors = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success',
};
var SFooter = styled('div')(function () { return ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '8px',
}); });
var SActions = styled('div')(function () { return ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: '1 1 auto',
    justifyContent: 'flex-end',
}); });
var SSource = styled(Typography)(function () { return ({
    userSelect: 'none',
}); });
export default function (_a) {
    var actions = _a.actions, source = _a.source, severity = _a.severity;
    return _jsxs(SFooter, { children: [source && _jsxs(SSource, __assign({ variant: "caption", color: "textSecondary" }, { children: ["Source:", source] })), _jsx(SActions, { children: actions && actions.map(function (action, i) { return _jsx(Fragment, { children: cloneElement(action, {
                        color: i === 0 ? buttonColors[severity] : 'inherit',
                        size: 'small',
                        style: i === 0 ? {} : { borderStyle: 'dotted' },
                        variant: i === 0 ? 'contained' : 'outlined',
                        disableElevation: true
                    }) }, "generative_".concat(i)); }) })] });
}
