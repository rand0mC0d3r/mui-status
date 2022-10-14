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
var react_1 = require("react");
var CheckBoxOutlineBlankOutlined_1 = __importDefault(require("@mui/icons-material/CheckBoxOutlineBlankOutlined"));
var CheckBoxOutlined_1 = __importDefault(require("@mui/icons-material/CheckBoxOutlined"));
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var InternalStatus_1 = __importDefault(require("../MuiStatusBar/InternalStatus"));
var MuiStore_1 = __importDefault(require("../MuiStore"));
var Tooltip_1 = __importDefault(require("../utils/Tooltip"));
var index_types_1 = require("../index.types");
var StyledBox = (0, styles_1.styled)('div')(function (_a) {
    var column = _a.column;
    return ({
        height: '100%',
        width: '100%',
        position: 'absolute',
        display: 'flex',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        flexDirection: column === index_types_1.PlacementPosition.Top ? 'column-reverse' : 'column'
    });
});
var StyledChildren = (0, styles_1.styled)('div')(function () { return ({
    flex: '1 1 auto',
    overflow: 'hidden',
    position: 'relative',
}); });
var StyledEntryElement = (0, styles_1.styled)('div')(function () { return ({
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    padding: '8px',
}); });
var StyledEntryElementItem = (0, styles_1.styled)('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        minWidth: '165px',
        flexDirection: 'row',
        gap: '4px',
        padding: '4px 8px',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: "".concat(theme.palette.background.default, " !important"),
        },
    });
});
function default_1(_a) {
    var children = _a.children;
    var _b = (0, react_1.useContext)(MuiStore_1.default), status = _b.status, settings = _b.settings, handleStatusVisibilityToggle = _b.handleStatusVisibilityToggle;
    var _c = (0, react_1.useState)(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var open = Boolean(anchorEl);
    var onClose = function () { return setAnchorEl(null); };
    var onContextMenu = function (e) {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    };
    var statusEntry = function (statusItem) { return (0, jsx_runtime_1.jsxs)(StyledEntryElementItem, __assign({ onClick: function () { return handleStatusVisibilityToggle({ id: statusItem.uniqueId }); } }, { children: [statusItem.visible ? (0, jsx_runtime_1.jsx)(CheckBoxOutlined_1.default, {}) : (0, jsx_runtime_1.jsx)(CheckBoxOutlineBlankOutlined_1.default, {}), statusItem.children] })); };
    var entryWrapper = function (statusItem) { return (0, jsx_runtime_1.jsx)(Tooltip_1.default, __assign({}, { key: statusItem.uniqueId, tooltip: 'Toggle visibility of tile', children: statusEntry(statusItem) })); };
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(StyledBox, __assign({ id: "mui-status-wrapper" }, { column: settings.position }, { children: [(0, jsx_runtime_1.jsx)(StyledChildren, __assign({ id: "mui-status-children" }, { children: children })), (0, jsx_runtime_1.jsx)("div", __assign({ id: "mui-status-statusBar" }, { onContextMenu: onContextMenu }, { children: !settings.statusBarAnnounced && (0, jsx_runtime_1.jsx)(InternalStatus_1.default, {}) }))] })), (0, jsx_runtime_1.jsx)(material_1.Popover, __assign({ id: "toggle-status-popover" }, { open: open, anchorEl: anchorEl, onClose: onClose, elevation: 1 }, { anchorOrigin: { vertical: settings.upperBar ? 'top' : 'bottom', horizontal: 'center' }, transformOrigin: { vertical: !settings.upperBar ? 'bottom' : 'top', horizontal: 'center' }, style: { marginTop: "".concat((settings.upperBar ? 1 : -1) * 12, "px") } }, { children: (0, jsx_runtime_1.jsx)(StyledEntryElement, __assign({}, { onContextMenu: function (e) { e.preventDefault(); } }, { children: [false, true].map(function (state) { return (0, jsx_runtime_1.jsx)("div", { children: status.filter(function (statusItem) { return statusItem.secondary === state; }).map(function (statusItem) { return entryWrapper(statusItem); }) }, state.toString()); }) })) }))] });
}
exports.default = default_1;
