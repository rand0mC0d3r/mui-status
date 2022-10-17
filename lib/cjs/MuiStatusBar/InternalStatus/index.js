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
var KeyboardDoubleArrowUp_1 = __importDefault(require("@mui/icons-material/KeyboardDoubleArrowUp"));
var styles_1 = require("@mui/material/styles");
var react_1 = require("react");
var MuiStore_1 = __importDefault(require("../../MuiStore"));
var Tooltip_1 = __importDefault(require("../../utils/Tooltip"));
var StyledPrimaryElem = (0, styles_1.styled)('div')(function () { return ({
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
    justifyContent: 'flex-start',
    scrollSnapType: 'both mandatory',
    gap: '4px',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
}); });
var StyledSecondaryElem = (0, styles_1.styled)('div')(function () { return ({
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    scrollSnapType: 'both mandatory',
    gap: '4px',
    flex: '0 1 auto',
    minWidth: '18px',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
}); });
var StyledKeyboardDoubleArrowUpIcon = (0, styles_1.styled)(KeyboardDoubleArrowUp_1.default)(function () { return ({
    fontSize: 12
}); });
var domId = 'mui-status-statusBar';
function default_1() {
    var _a = (0, react_1.useContext)(MuiStore_1.default), status = _a.status, updateIsConsoleOpen = _a.updateIsConsoleOpen;
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [status.some(function (_a) {
                var secondary = _a.secondary;
                return !secondary;
            }) && (0, jsx_runtime_1.jsx)(StyledPrimaryElem, __assign({}, { id: "".concat(domId, "-primary") })), status.some(function (_a) {
                var type = _a.type;
                return type === 'console';
            }) && (0, jsx_runtime_1.jsx)(Tooltip_1.default, __assign({}, { tooltip: 'Toggle console view' }, { children: (0, jsx_runtime_1.jsx)(StyledKeyboardDoubleArrowUpIcon, __assign({}, { onDoubleClick: function () { return updateIsConsoleOpen(); } })) })), status.some(function (_a) {
                var secondary = _a.secondary;
                return secondary;
            }) && (0, jsx_runtime_1.jsx)(StyledSecondaryElem, __assign({}, { id: "".concat(domId, "-secondary") }))] });
}
exports.default = default_1;
