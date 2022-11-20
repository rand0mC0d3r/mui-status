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
/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { Popover, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useState } from 'react';
import InternalStatus from '../MuiStatusBar/InternalStatus';
import DataProvider from '../MuiStore';
import { PlacementPosition } from '../index.types';
import InternalConsole from '../MuiStatusBar/InternalConsole';
var StyledBox = styled('div')(function (_a) {
    var column = _a.column;
    return ({
        height: '100%',
        width: '100%',
        gap: '0px',
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
var StyledTypographyNoChildren = styled(Typography)(function () { return ({
    userSelect: 'none'
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
        cursor: 'pointer',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 6px',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: "".concat(theme.palette.background.default, " !important"),
        },
    });
});
var StyledStatusBar = styled('div')(function (_a) {
    var theme = _a.theme, position = _a.position;
    return ({
        gap: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.background.default
            : theme.palette.background.paper,
        boxShadow: "inset 0px ".concat(position === 'top' ? -3 : 3, "px 0px -2px ").concat(theme.palette.divider),
    });
});
export default function (_a) {
    var children = _a.children;
    var _b = useContext(DataProvider), status = _b.status, handleStatusVisibilityToggle = _b.handleStatusVisibilityToggle;
    var _c = useContext(DataProvider).settings, position = _c.position, statusBarAnnounced = _c.statusBarAnnounced, upperBar = _c.upperBar;
    var _d = useState(null), anchorEl = _d[0], setAnchorEl = _d[1];
    var open = Boolean(anchorEl);
    var onClose = function () { return setAnchorEl(null); };
    var onContextMenu = function (e) {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    };
    var statusEntry = function (statusItem) { return _jsxs(StyledEntryElementItem, __assign({ onClick: function () { return handleStatusVisibilityToggle({ id: statusItem.uniqueId }); } }, { children: [statusItem.visible ? _jsx(CheckBoxOutlinedIcon, {}) : _jsx(CheckBoxOutlineBlankOutlinedIcon, {}), statusItem.children || _jsx(StyledTypographyNoChildren, __assign({ variant: "caption", color: "textSecondary" }, { children: "No content for child" }))] })); };
    var entryWrapper = function (statusItem) { return _jsx(Tooltip, __assign({}, { key: statusItem.uniqueId, label: 'Toggle visibility of tile', children: statusEntry(statusItem) })); };
    return _jsxs(_Fragment, { children: [_jsxs(StyledBox, __assign({ id: "mui-status-wrapper" }, { column: position }, { children: [_jsxs(StyledChildren, __assign({ id: "mui-status-children" }, { children: [children, status.some(function (_a) {
                                var type = _a.type;
                                return type === 'console';
                            }) && _jsx(InternalConsole, {})] })), status.some(function (_a) {
                        var visible = _a.visible;
                        return visible;
                    }) && _jsx(StyledStatusBar, __assign({ position: position }, { onContextMenu: onContextMenu }, { children: !statusBarAnnounced && _jsx(InternalStatus, {}) }))] })), _jsx(Popover, __assign({ id: "toggle-status-popover" }, { open: open, anchorEl: anchorEl, onClose: onClose, elevation: 1 }, { anchorOrigin: { vertical: upperBar ? 'top' : 'bottom', horizontal: 'center' }, transformOrigin: { vertical: !upperBar ? 'bottom' : 'top', horizontal: 'center' }, style: { marginTop: "".concat((upperBar ? 1 : -1) * 12, "px") } }, { children: _jsx(StyledEntryElement, __assign({}, { onContextMenu: function (e) { e.preventDefault(); } }, { children: [false, true].map(function (state) { return _jsx("div", { children: status.filter(function (_a) {
                            var secondary = _a.secondary;
                            return secondary === state;
                        }).map(function (statusItem) { return entryWrapper(statusItem); }) }, state.toString()); }) })) }))] });
}
