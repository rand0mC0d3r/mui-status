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
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
var componentId = 'statusBar';
/**
 * @param id - (string) Unique identifier for the status element.
 * @param secondary - (boolean) If needs to be applied a secondary style to the status element.
 * @param style - (CSSProperties) Style to be applied to the root element.
 * @param onClick - (function) Function to be executed on click event.
 * @param onContextMenu - (function) Function to be executed on context menu event.
 * @param disabled - (boolean) If needs to be disabled the status element.
 * @param highlight - (string) If needs to be applied a highlight style to the status element.
 * @param tooltip - (string) Tooltip to be displayed on hover.
 * @param children - (JSX.Element) Children to be displayed inside the status element.
 *
 * @returns (JSX.Element) Status element
 */
export default function (_a) {
    var severity = _a.severity, message = _a.message, _b = _a.autoHideDuration, autoHideDuration = _b === void 0 ? 6000 : _b, onClose = _a.onClose, code = _a.code, options = _a.options;
    // const { status, handleStatusUpdate, handleStatusAnnouncement, handleStatusDestroy } = useContext(DataProvider)
    // const { allowRightClick } = useContext(DataProvider).settings as SettingsObject
    // const [ownId, setOwnId] = useState<string | null>()
    var _c = useState(false), open = _c[0], setOpen = _c[1];
    return _jsx(_Fragment, { children: _jsx(Snackbar, __assign({ open: open }, { onClose: onClose, autoHideDuration: autoHideDuration }, { children: _jsxs(Alert, __assign({}, { onClose: onClose, severity: severity }, { children: [message, _jsx("code", { children: code })] })) })) });
}
