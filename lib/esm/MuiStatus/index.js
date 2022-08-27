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
/* eslint-disable no-unused-vars */
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import DataProvider from '../MuiStore';
var useStyles = makeStyles(function (theme) { return ({
    default: {
        WebkitFontSmoothing: 'auto',
        height: '100%',
        padding: '0px 4px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        justifyContent: 'center',
        alignSelf: 'stretch',
        position: 'relative',
    },
    interactive: {
        cursor: 'pointer',
    },
    actionNormal: {
        '&:hover': {
            backgroundColor: "".concat(theme.palette.augmentColor({ main: theme.palette.divider }).light, " !important")
        }
    },
    actionHighlightSecondary: {
        '&:hover': {
            backgroundColor: "".concat(theme.palette.augmentColor({ main: theme.palette.secondary.main }).dark, " !important"),
            color: "".concat(theme.palette.background.default, " !important")
        },
    },
    actionHighlightPrimary: {
        '&:hover': {
            backgroundColor: "".concat(theme.palette.augmentColor({ main: theme.palette.primary.main }).dark, " !important"),
            color: "".concat(theme.palette.background.default, " !important")
        },
    },
    hightlight: {
        backgroundColor: theme.palette.secondary.main,
        '& > div > *': {
            color: "".concat(theme.palette.background.default, " !important")
        }
    },
    hightlightPrimary: {
        backgroundColor: theme.palette.primary.main,
        '& > div > *': {
            color: "".concat(theme.palette.background.default, " !important")
        }
    },
}); });
var MuiStatus = function (_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, style = _a.style, _c = _a.onClick, onClick = _c === void 0 ? false : _c, onContextMenu = _a.onContextMenu, _d = _a.highlight, highlight = _d === void 0 ? 'default' : _d, _e = _a.tooltip, tooltip = _e === void 0 ? '' : _e, children = _a.children;
    var _f = useContext(DataProvider), status = _f.status, settings = _f.settings, tooltipComponent = _f.tooltipComponent, handleStatusUpdate = _f.handleStatusUpdate, handleStatusAnnouncement = _f.handleStatusAnnouncement, handleStatusDestroy = _f.handleStatusDestroy;
    var _g = useState(null), statusObject = _g[0], setStatusObject = _g[1];
    var _h = useState(null), elementFound = _h[0], setElementFound = _h[1];
    var theme = useTheme();
    var classes = useStyles(theme);
    var callbackOnClick = useCallback(function (e) {
        onClick(e);
    }, [onClick]);
    useEffect(function () {
        var elementSearched = document.getElementById("mui-status-statusBar-".concat(secondary ? 'secondary' : 'primary'));
        if (elementSearched !== null) {
            setElementFound(elementSearched);
        }
    }, [secondary, statusObject]);
    useEffect(function () {
        handleStatusUpdate({ id: id, children: children });
    }, [id, children]);
    var callbackHandleStatusAnnouncement = useCallback(function (id) {
        handleStatusAnnouncement({ id: id, secondary: secondary, children: children });
    }, [secondary, children, handleStatusAnnouncement]);
    var callbackHandleStatusDestroy = useCallback(function () {
        handleStatusDestroy({ id: id });
    }, [id]);
    useEffect(function () {
        return function () {
            callbackHandleStatusDestroy();
        };
    }, [callbackHandleStatusDestroy]);
    useEffect(function () {
        if (id && statusObject === null && !status.some(function (item) { return item.uniqueId === id; })) {
            callbackHandleStatusAnnouncement(id);
        }
    }, [id, statusObject, status, callbackHandleStatusAnnouncement]);
    useEffect(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if ((statusObject === null || (statusObject === null || statusObject === void 0 ? void 0 : statusObject.visible) !== (foundObject === null || foundObject === void 0 ? void 0 : foundObject.visible)) && foundObject) {
            setStatusObject(foundObject);
        }
    }, [status, id, statusObject]);
    var generateClasses = function () {
        return clsx([
            classes.default,
            highlight !== 'default' && classes.hightlight,
            highlight === 'primary' && classes.hightlightPrimary,
            (onClick) && [
                classes.interactive,
                highlight === 'default' && classes.actionNormal,
                highlight === 'primary' && classes.actionHighlightPrimary,
                highlight === 'secondary' && classes.actionHighlightSecondary
            ],
        ]);
    };
    return React.createElement(React.Fragment, null, (statusObject !== null && !!id && elementFound) && React.createElement(React.Fragment, null, createPortal(statusObject.visible
        ? React.createElement("div", { id: id, key: "MupStatus_".concat(id, "_wrapper"), onClick: function (e) {
                onClick ? callbackOnClick(e) : null;
                handleStatusUpdate({ id: id, children: children });
            }, onContextMenu: function (e) { return settings.allowRightClick
                ? onContextMenu ? onContextMenu(e) : null
                : e.preventDefault(); }, className: generateClasses(), style: __assign(__assign({}, style), { order: statusObject.index }) }, tooltipComponent !== undefined
            ? React.createElement(React.Fragment, null, tooltipComponent(tooltip, React.createElement("span", null, children)))
            : children)
        : React.createElement(React.Fragment, null), elementFound)));
};
export default MuiStatus;
