"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var MuiStore_1 = __importDefault(require("../../MuiStore"));
function default_1(_a) {
    var tooltip = _a.tooltip, children = _a.children;
    var tooltipComponent = (0, react_1.useContext)(MuiStore_1.default).tooltipComponent;
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (tooltipComponent !== undefined && tooltip) ? tooltipComponent(tooltip, (0, jsx_runtime_1.jsx)("span", { children: children })) : children });
}
exports.default = default_1;
