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
import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import DataProvider from '../MuiStore';
import InternalStatus from './InternalStatus';
export default (function (_a) {
    var style = _a.style, className = _a.className;
    var triggerStatusBarAnnounced = useContext(DataProvider).triggerStatusBarAnnounced;
    var _b = useState(null), documentElement = _b[0], setDocumentElement = _b[1];
    useEffect(function () {
        var detectDocumentElement = document.getElementById('muiStatus-statusBar');
        if (detectDocumentElement) {
            setDocumentElement(detectDocumentElement);
            triggerStatusBarAnnounced();
        }
    }, []);
    return documentElement
        ? createPortal(React.createElement(InternalStatus, __assign({}, { style: __assign(__assign({}, style), { padding: '0px', margin: '0px' }), className: className })), documentElement)
        : null;
});
