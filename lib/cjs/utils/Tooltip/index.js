"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = require("react");
var MuiStore_1 = __importDefault(require("../../MuiStore"));
function default_1(_a) {
    var tooltip = _a.tooltip, children = _a.children;
    var tooltipComponent = (0, react_1.useContext)(MuiStore_1.default).tooltipComponent;
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (tooltipComponent !== undefined && tooltip)
            ? tooltipComponent(tooltip, (0, jsx_runtime_1.jsx)("span", { children: children }))
            : (0, jsx_runtime_1.jsx)(material_1.Tooltip, __assign({ arrow: true, title: tooltip }, { children: (0, jsx_runtime_1.jsx)("span", { children: children }) })) });
}
exports.default = default_1;
