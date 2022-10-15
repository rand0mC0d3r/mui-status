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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles';
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import DataProvider from '../MuiStore';
import Tooltip from '../utils/Tooltip';
var onHoverBg = function (highlight, theme) { return highlight === 'primary' ? theme.palette.primary.dark : theme.palette.secondary.dark; };
var backgroundColor = function (highlight, theme) {
    switch (highlight) {
        case 'primary':
            return theme.palette.primary.main;
        case 'secondary':
            return theme.palette.secondary.main;
        default:
            return '';
    }
};
var StyledContainer = styled('div')(function (_a) {
    var theme = _a.theme, hasClick = _a.hasClick, highlight = _a.highlight, isDisabled = _a.isDisabled;
    return ({
        WebkitFontSmoothing: 'auto',
        height: '100%',
        padding: '0px 8px',
        display: 'flex',
        flex: '0 0 auto',
        alignItems: 'center',
        gap: '16px',
        justifyContent: 'center',
        alignSelf: 'stretch',
        position: 'relative',
        cursor: (hasClick && !isDisabled) ? 'pointer' : '',
        backgroundColor: backgroundColor(highlight, theme),
        '& > div > *': {
            color: highlight !== 'default' ? "".concat(theme.palette.background.default, " !important") : '',
        },
        '& > span > div > *': {
            color: highlight !== 'default' ? "".concat(theme.palette.background.default, " !important") : '',
        },
        '&:hover': {
            backgroundColor: hasClick ? "".concat(highlight === 'default' ? theme.palette.divider : onHoverBg(highlight, theme), " !important") : '',
            color: hasClick ? "".concat(theme.palette.background.default, " !important") : '',
        },
    });
});
export default function (_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, style = _a.style, onClick = _a.onClick, onContextMenu = _a.onContextMenu, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.highlight, highlight = _d === void 0 ? 'default' : _d, _e = _a.tooltip, tooltip = _e === void 0 ? '' : _e, children = _a.children;
    var _f = useContext(DataProvider), status = _f.status, settings = _f.settings, handleStatusUpdate = _f.handleStatusUpdate, handleStatusAnnouncement = _f.handleStatusAnnouncement, handleStatusDestroy = _f.handleStatusDestroy;
    var _g = useState(), ownId = _g[0], setOwnId = _g[1];
    var _h = useState(false), isAnnounced = _h[0], setIsAnnounced = _h[1];
    var _j = useState(null), statusObject = _j[0], setStatusObject = _j[1];
    var _k = useState(null), elementFound = _k[0], setElementFound = _k[1];
    var callbackHandleStatusAnnouncement = useCallback(function (idIncoming) { return handleStatusAnnouncement({ id: idIncoming, ownId: ownId, secondary: secondary, children: children }); }, [secondary, ownId, children, handleStatusAnnouncement]);
    var callbackHandleStatusDestroy = useCallback(function () {
        handleStatusDestroy({ id: id });
    }, [id]);
    var handleOnClick = function (e) {
        if (onClick !== undefined && !disabled) {
            e.preventDefault();
            onClick(e);
            handleStatusUpdate({ id: id, ownId: ownId, children: children });
        }
    };
    var handleOnContextMenu = function (e) {
        e.preventDefault();
        if (settings.allowRightClick && onContextMenu !== undefined && !disabled) {
            onContextMenu(e);
        }
    };
    useEffect(function () {
        setOwnId((Math.random() + 1).toString(36).substring(7));
    }, []);
    /**
     * Update status element with changed children or highlight
     * */
    useEffect(function () {
        if (ownId && statusObject !== null) {
            handleStatusUpdate({ id: id, ownId: ownId, children: children });
        }
    }, [id, ownId, statusObject, children]);
    /**
     * Announce status element to the store
     * */
    useEffect(function () {
        if (id && ownId && statusObject === null && !isAnnounced) {
            if (!status.some(function (item) { return item.uniqueId === id; })) {
                if (callbackHandleStatusAnnouncement(id)) {
                    setIsAnnounced(true);
                }
            }
        }
    }, [id, ownId, statusObject, status, callbackHandleStatusAnnouncement, isAnnounced]);
    /**
     * Find newly published status element in the store
     * */
    useEffect(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if ((statusObject === null || (statusObject === null || statusObject === void 0 ? void 0 : statusObject.visible) !== (foundObject === null || foundObject === void 0 ? void 0 : foundObject.visible)) && foundObject) {
            setStatusObject(foundObject);
        }
    }, [status, id, statusObject]);
    useLayoutEffect(function () {
        if (statusObject !== null) {
            setElementFound(document.getElementById("mui-status-statusBar-".concat(secondary ? 'secondary' : 'primary')) || null);
        }
    }, [secondary, statusObject, id]);
    useEffect(function () { return function () {
        callbackHandleStatusDestroy();
    }; }, [callbackHandleStatusDestroy]);
    useEffect(function () {
        if (!id) {
            console.error('Please define an id for the status bar item');
        }
    }, [id]);
    return _jsx(_Fragment, { children: (statusObject !== null && !!id && elementFound) && createPortal((statusObject.visible && children)
            ? _jsx(StyledContainer, __assign({}, {
                id: id,
                highlight: highlight,
                hasClick: !!onClick,
                isDisabled: disabled,
                key: "mui-status-".concat(id),
                onClick: handleOnClick,
                onContextMenu: handleOnContextMenu,
                style: __assign(__assign({}, style), { order: statusObject.index })
            }, { children: _jsx(Tooltip, __assign({}, { tooltip: tooltip, children: children })) }))
            : _jsx(_Fragment, {}), elementFound) });
}
