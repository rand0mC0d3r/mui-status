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
// https://nmingaleev.medium.com/draggable-and-resizable-panel-with-react-hooks-part-2-6e6d0076bcf1
/* eslint-disable @typescript-eslint/no-explicit-any */
import Panel from './panel';
export default function (_a) {
    var props = _a.props;
    return _jsx(_Fragment, { children: _jsx(Panel, __assign({}, props)) });
}
