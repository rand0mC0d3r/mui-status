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
var styles_1 = require("@mui/material/styles");
var react_1 = require("react");
var Store_1 = __importDefault(require("../../Store"));
var SPrimary = (0, styles_1.styled)('div')(function () { return ({
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
    justifyContent: 'flex-start',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
}); });
var SSecondary = (0, styles_1.styled)('div')(function () { return ({
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: '0 1 auto',
    minWidth: '18px',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
}); });
var domId = 'mui-status-statusBar';
function default_1() {
    var status = (0, react_1.useContext)(Store_1.default).status;
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [status.some(function (_a) {
                var secondary = _a.secondary;
                return !secondary;
            }) && (0, jsx_runtime_1.jsx)(SPrimary, __assign({}, { id: "".concat(domId, "-primary") })), status.some(function (_a) {
                var secondary = _a.secondary;
                return secondary;
            }) && (0, jsx_runtime_1.jsx)(SSecondary, __assign({}, { id: "".concat(domId, "-secondary") }))] });
}
exports.default = default_1;
