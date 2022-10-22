import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Direction } from '../../index.types';
function Resizer(_a) {
    var onResize = _a.onResize;
    var _b = useState(''), direction = _b[0], setDirection = _b[1];
    var _c = useState(false), mouseDown = _c[0], setMouseDown = _c[1];
    useEffect(function () {
        var handleMouseMove = function (e) {
            if (!direction)
                return;
            var ratio = window.devicePixelRatio;
            onResize(direction, e.movementX / ratio, e.movementY / ratio);
        };
        if (mouseDown) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        return function () {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseDown, direction, onResize]);
    useEffect(function () {
        var handleMouseUp = function () { return setMouseDown(false); };
        window.addEventListener('mouseup', handleMouseUp);
        return function () {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    var handleMouseDown = function (incomingDirection) { return function () {
        setDirection(incomingDirection);
        setMouseDown(true);
    }; };
    return _jsxs(_Fragment, { children: [_jsx("div", { className: "top-left", onMouseDown: handleMouseDown(Direction.TopLeft) }), _jsx("div", { className: "top", onMouseDown: handleMouseDown(Direction.Top) }), _jsx("div", { className: "top-right", onMouseDown: handleMouseDown(Direction.TopRight) }), _jsx("div", { className: "right", onMouseDown: handleMouseDown(Direction.Right) }), _jsx("div", { className: "right-bottom", onMouseDown: handleMouseDown(Direction.BottomRight) }), _jsx("div", { className: "bottom", onMouseDown: handleMouseDown(Direction.Bottom) }), _jsx("div", { className: "bottom-left", onMouseDown: handleMouseDown(Direction.BottomLeft) }), _jsx("div", { className: "left", onMouseDown: handleMouseDown(Direction.Left) })] });
}
export default Resizer;
