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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
export default function (_a) {
    var onDrag = _a.onDrag;
    var _b = useState(false), mouseDown = _b[0], setMouseDown = _b[1];
    useEffect(function () {
        var handleMouseUp = function () { return setMouseDown(false); };
        window.addEventListener('mouseup', handleMouseUp);
        return function () {
            window.addEventListener('mouseup', handleMouseUp);
        };
    }, []);
    useEffect(function () {
        var ratio = window.devicePixelRatio;
        var handleMouseMove = function (e) { return onDrag(e.movementX / ratio, e.movementY / ratio); };
        if (mouseDown) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        return function () {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseDown, onDrag]);
    var handleMouseDown = function () { return setMouseDown(true); };
    return _jsx(_Fragment, { children: _jsx("div", __assign({ className: "panel__header", onMouseDown: handleMouseDown }, { children: "header" })) });
}
