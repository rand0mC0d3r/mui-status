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
import { Popover } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import React, { Fragment, useContext, useState } from 'react';
import DataProvider from '../../MuiStore';
var useStyles = makeStyles(function (theme) { return ({
    statusBar: {
        gap: '4px',
        display: 'flex',
        minHeight: '28px',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.type === 'light'
            ? theme.palette.augmentColor({ main: theme.palette.divider }).dark
            : theme.palette.background.paper,
        color: "".concat(theme.palette.background.default, " !important"),
    },
    upper: {
        borderBottom: "1px solid ".concat(theme.palette.divider),
        borderTop: 'none',
    },
    lower: {
        borderBottom: 'none',
        borderTop: "1px solid ".concat(theme.palette.divider),
    },
    child: {
        display: 'flex',
        flexWrap: 'nowrap',
    },
    statusEntry: {
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        padding: '8px',
    },
    statusEntryItem: {
        display: 'flex',
        minWidth: '165px',
        flexDirection: 'row',
        gap: '4px',
        padding: '4px 8px',
        '&:hover': {
            backgroundColor: "".concat(theme.palette.augmentColor({ main: theme.palette.primary.light }).light, " !important"),
            color: "".concat(theme.palette.background.default, " !important")
        },
    },
    primary: {
        overflow: 'scroll',
        justifyContent: 'flex-start',
        scrollSnapType: 'both mandatory',
        gap: '4px',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
    },
    secondary: {
        overflow: 'hidden',
        flexWrap: 'nowrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        scrollSnapType: 'both mandatory',
        gap: '4px',
        flex: '1 1 auto',
        width: '0px',
        minWidth: '80px',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
    },
}); });
export default (function (_a) {
    var style = _a.style, className = _a.className;
    var theme = useTheme();
    var _b = useContext(DataProvider), status = _b.status, settings = _b.settings, handleStatusVisibilityToggle = _b.handleStatusVisibilityToggle, tooltipComponent = _b.tooltipComponent;
    var classes = useStyles(theme);
    var _c = useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var open = Boolean(anchorEl);
    var onClose = function () { return setAnchorEl(null); };
    var statusEntry = function (s) { return React.createElement("div", { className: classes.statusEntryItem, onClick: function () { return handleStatusVisibilityToggle({ id: s.uniqueId }); } },
        s.visible ? React.createElement(CheckBoxOutlinedIcon, null) : React.createElement(CheckBoxOutlineBlankOutlinedIcon, null),
        s.children); };
    var entryWrapper = function (s) { return React.createElement(Fragment, { key: s.uniqueId }, tooltipComponent !== undefined
        ? React.createElement(React.Fragment, null, tooltipComponent('Toggle visibility of tile', statusEntry(s)))
        : statusEntry(s)); };
    return React.createElement(React.Fragment, null,
        status.length > 0 && React.createElement("div", __assign({}, { style: style }, { id: "mui-status-statusBar-wrapper", onContextMenu: function (e) {
                e.preventDefault();
                setAnchorEl(e.currentTarget);
            }, className: [
                className,
                classes.statusBar,
                settings.position === 'top' ? classes.upper : classes.lower
            ].filter(function (e) { return !!e; }).join(' ') }), ['primary', 'secondary'].map(function (side, i) { return React.createElement("div", { id: "mui-status-statusBar-".concat(side), key: "".concat(side, "_status"), className: [
                classes.child,
                i === 0 ? classes.primary : classes.secondary
            ].filter(function (e) { return !!e; }).join(' ') }); })),
        React.createElement(Popover, __assign({}, { open: open, anchorEl: anchorEl, onClose: onClose }, { elevation: 1, id: 'toggle-status-popover', anchorOrigin: { vertical: settings.upperBar ? 'top' : 'bottom', horizontal: 'center' }, transformOrigin: { vertical: !settings.upperBar ? 'bottom' : 'top', horizontal: 'center' }, style: { marginTop: "".concat((settings.upperBar ? 1 : -1) * 12, "px") } }),
            React.createElement("div", { onContextMenu: function (e) { e.preventDefault(); }, className: classes.statusEntry },
                React.createElement("div", null, status.filter(function (s) { return !s.secondary; }).map(function (s) { return entryWrapper(s); })),
                React.createElement("div", null, status.filter(function (s) { return s.secondary; }).map(function (s) { return entryWrapper(s); })))));
});
