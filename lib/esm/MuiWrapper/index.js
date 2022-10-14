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
import { useContext, useState } from 'react';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import InternalStatus from '../MuiStatusBar/InternalStatus';
import DataProvider from '../MuiStore';
import Tooltip from '../utils/Tooltip';
import { PlacementPosition } from '../index.types';
var StyledBox = styled('div')(function (_a) {
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
        flexDirection: column === PlacementPosition.Top ? 'column-reverse' : 'column'
    });
});
var StyledChildren = styled('div')(function () { return ({
    flex: '1 1 auto',
    overflow: 'hidden',
    position: 'relative',
}); });
var StyledEntryElement = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    padding: '8px',
}); });
var StyledEntryElementItem = styled('div')(function (_a) {
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
export default function (_a) {
    var children = _a.children;
    var _b = useContext(DataProvider), status = _b.status, settings = _b.settings, handleStatusVisibilityToggle = _b.handleStatusVisibilityToggle;
    var _c = useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var open = Boolean(anchorEl);
    var onClose = function () { return setAnchorEl(null); };
    var onContextMenu = function (e) {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    };
    var statusEntry = function (statusItem) { return _jsxs(StyledEntryElementItem, __assign({ onClick: function () { return handleStatusVisibilityToggle({ id: statusItem.uniqueId }); } }, { children: [statusItem.visible ? _jsx(CheckBoxOutlinedIcon, {}) : _jsx(CheckBoxOutlineBlankOutlinedIcon, {}), statusItem.children] })); };
    var entryWrapper = function (statusItem) { return _jsx(Tooltip, __assign({}, { key: statusItem.uniqueId, tooltip: 'Toggle visibility of tile', children: statusEntry(statusItem) })); };
    return _jsxs(_Fragment, { children: [_jsxs(StyledBox, __assign({ id: "mui-status-wrapper" }, { column: settings.position }, { children: [_jsx(StyledChildren, __assign({ id: "mui-status-children" }, { children: children })), _jsx("div", __assign({ id: "mui-status-statusBar" }, { onContextMenu: onContextMenu }, { children: !settings.statusBarAnnounced && _jsx(InternalStatus, {}) }))] })), _jsx(Popover, __assign({ id: "toggle-status-popover" }, { open: open, anchorEl: anchorEl, onClose: onClose, elevation: 1 }, { anchorOrigin: { vertical: settings.upperBar ? 'top' : 'bottom', horizontal: 'center' }, transformOrigin: { vertical: !settings.upperBar ? 'bottom' : 'top', horizontal: 'center' }, style: { marginTop: "".concat((settings.upperBar ? 1 : -1) * 12, "px") } }, { children: _jsx(StyledEntryElement, __assign({}, { onContextMenu: function (e) { e.preventDefault(); } }, { children: [false, true].map(function (state) { return _jsx("div", { children: status.filter(function (statusItem) { return statusItem.secondary === state; }).map(function (statusItem) { return entryWrapper(statusItem); }) }, state.toString()); }) })) }))] });
}