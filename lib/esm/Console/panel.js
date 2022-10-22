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
// https://nmingaleev.medium.com/draggable-and-resizable-panel-with-react-hooks-part-2-6e6d0076bcf1
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import { Direction } from '../index.types';
import Header from './Header';
import Resizer from './Resizer';
export default function (_a) {
    var children = _a.children;
    var panelRef = useRef(null);
    var handleDrag = function (movementX, movementY) {
        var panel = panelRef.current;
        if (!panel)
            return;
        var _a = panel.getBoundingClientRect(), x = _a.x, y = _a.y;
        panel.style.left = "".concat(x + movementX, "px");
        panel.style.top = "".concat(y + movementY, "px");
    };
    var handleResize = function (direction, movementX, movementY) {
        var panel = panelRef.current;
        if (!panel)
            return;
        var _a = panel.getBoundingClientRect(), width = _a.width, height = _a.height, x = _a.x, y = _a.y;
        var resizeTop = function () {
            panel.style.height = "".concat(height - movementY, "px");
            panel.style.top = "".concat(y + movementY, "px");
        };
        var resizeRight = function () {
            panel.style.width = "".concat(width + movementX, "px");
        };
        var resizeBottom = function () {
            panel.style.height = "".concat(height + movementY, "px");
        };
        var resizeLeft = function () {
            panel.style.width = "".concat(width - movementX, "px");
            panel.style.left = "".concat(x + movementX, "px");
        };
        switch (direction) {
            case Direction.TopLeft:
                resizeTop();
                resizeLeft();
                break;
            case Direction.Top:
                resizeTop();
                break;
            case Direction.TopRight:
                resizeTop();
                resizeRight();
                break;
            case Direction.Right:
                resizeRight();
                break;
            case Direction.BottomRight:
                resizeBottom();
                resizeRight();
                break;
            case Direction.Bottom:
                resizeBottom();
                break;
            case Direction.BottomLeft:
                resizeBottom();
                resizeLeft();
                break;
            case Direction.Left:
                resizeLeft();
                break;
            default:
                break;
        }
    };
    return _jsx(_Fragment, { children: _jsx("div", __assign({ className: "panel", ref: panelRef }, { children: _jsxs("div", __assign({ className: "panel__container" }, { children: [_jsx(Resizer, { onResize: handleResize }), _jsx(Header, { onDrag: handleDrag }), _jsx("div", __assign({ className: "panel__content" }, { children: children }))] })) })) });
}
