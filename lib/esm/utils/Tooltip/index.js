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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Tooltip } from '@mui/material';
import { useContext } from 'react';
import DataProvider from '../../MuiStore';
export default function (_a) {
    var tooltip = _a.tooltip, children = _a.children;
    var tooltipComponent = useContext(DataProvider).tooltipComponent;
    return _jsx(_Fragment, { children: (tooltipComponent !== undefined && tooltip)
            ? tooltipComponent(tooltip, _jsx("span", { children: children }))
            : _jsx(Tooltip, __assign({ arrow: true, title: _jsx("span", __assign({ style: { userSelect: 'none' } }, { children: tooltip })) }, { children: _jsx("span", { children: children }) })) });
}
