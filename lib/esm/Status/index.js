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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PlacementPosition } from '../index.types';
import DataProvider, { composeDomId } from '../Store';
var componentId = 'statusBar';
var backgroundColor = function (theme, highlight) {
    switch (highlight) {
        case 'primary':
            return theme.palette.primary.main;
        case 'secondary':
            return theme.palette.secondary.main;
        default:
            return '';
    }
};
var backgroundColorHover = function (theme, highlight) {
    switch (highlight) {
        case 'primary':
            return theme.palette.primary.dark;
        case 'secondary':
            return theme.palette.secondary.dark;
        default:
            return theme.palette.divider;
    }
};
var SSpan = styled('span')(function (_a) {
    var theme = _a.theme;
    return ({
        padding: '0px 10px',
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        fontSize: '14px',
        gap: "".concat(theme.spacing(0.5)),
        '& > *': {
            fontSize: '14px !important',
        },
    });
});
var SArrowDown = styled(ArrowDropDownOutlinedIcon)(function (_a) {
    var position = _a.position;
    return ({
        position: 'absolute',
        bottom: position !== 'top' ? '-10px' : 'unset',
        top: position === 'top' ? '-10px' : 'unset',
    });
});
var SArrowUp = styled(ArrowDropUpOutlinedIcon)(function (_a) {
    var position = _a.position;
    return ({
        position: 'absolute',
        bottom: position !== 'top' ? '-10px' : 'unset',
        top: position === 'top' ? '-10px' : 'unset',
    });
});
var SDiv = styled('div')(function (_a) {
    var theme = _a.theme, hasclick = _a.hasclick, highlight = _a.highlight, startSeparator = _a.startSeparator, endSeparator = _a.endSeparator, isdisabled = _a.isdisabled;
    return ({
        WebkitFontSmoothing: 'auto',
        height: '100%',
        display: 'flex',
        flex: '0 0 auto',
        alignItems: 'stretch',
        gap: '16px',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'relative',
        borderLeft: startSeparator === 'true' ? "1px solid ".concat(theme.palette.divider) : 'none',
        borderRight: endSeparator === 'true' ? "1px solid ".concat(theme.palette.divider) : 'none',
        cursor: (hasclick === 'true' && isdisabled === 'false') ? 'pointer' : '',
        backgroundColor: backgroundColor(theme, highlight),
        color: theme.palette.text.primary,
        '& > div > *': {
            color: highlight !== 'default'
                ? "".concat(theme.palette.background.default, " !important")
                : '',
        },
        '& > span > div > *': {
            color: highlight !== 'default'
                ? "".concat(theme.palette.background.default, " !important")
                : '',
        },
        '&:hover': (hasclick === 'true' && isdisabled === 'false') ? {
            backgroundColor: backgroundColorHover(theme, highlight),
            color: "".concat(theme.palette.text.primary),
        } : {}
    });
});
/**
 * @param id - (string) Unique identifier for the status element.
 * @param secondary - (boolean) If needs to be applied a secondary style to the status element.
 * @param style - (CSSProperties) Style to be applied to the root element.
 * @param onClick - (function) Function to be executed on click event.
 * @param onContextMenu - (function) Function to be executed on context menu event.
 * @param disabled - (boolean) If needs to be disabled the status element.
 * @param highlight - (string) If needs to be applied a highlight style to the status element.
 * @param tooltip - (string) Tooltip to be displayed on hover.
 * @param children - (JSX.Element) Children to be displayed inside the status element.
 *
 * @returns (JSX.Element) Status element
 */
export default function (_a) {
    var id = _a.id, _b = _a.hasArrow, hasArrow = _b === void 0 ? false : _b, _c = _a.secondary, secondary = _c === void 0 ? false : _c, style = _a.style, onClick = _a.onClick, onContextMenu = _a.onContextMenu, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.highlight, highlight = _e === void 0 ? 'default' : _e, tooltip = _a.tooltip, children = _a.children, _f = _a.endSeparator, endSeparator = _f === void 0 ? false : _f, _g = _a.startSeparator, startSeparator = _g === void 0 ? false : _g;
    var _h = useContext(DataProvider), status = _h.status, handleStatusUpdate = _h.handleStatusUpdate, handleStatusAnnouncement = _h.handleStatusAnnouncement, handleStatusDestroy = _h.handleStatusDestroy;
    var _j = useContext(DataProvider).settings, allowRightClick = _j.allowRightClick, position = _j.position;
    var _k = useState(), ownId = _k[0], setOwnId = _k[1];
    var _l = useState(null), statusObject = _l[0], setStatusObject = _l[1];
    var _m = useState(null), elementFound = _m[0], setElementFound = _m[1];
    var callbackHandleStatusAnnouncement = useCallback(function () { return handleStatusAnnouncement({ id: id, ownId: ownId, secondary: secondary, children: children }); }, [id, secondary, ownId, children, handleStatusAnnouncement]);
    var callbackHandleStatusDestroy = useCallback(function () { handleStatusDestroy({ id: id }); }, [id]);
    var handleOnClick = function (e) {
        if (onClick !== undefined && !disabled) {
            e.preventDefault();
            onClick(e);
            handleStatusUpdate({ id: id, ownId: ownId, children: children });
        }
    };
    var handleOnContextMenu = function (e) {
        e.preventDefault();
        if (allowRightClick && onContextMenu !== undefined && !disabled) {
            onContextMenu(e);
        }
    };
    // useEffect(() => {
    //   if (ownId && statusObject !== null) {
    //     console.log('announcing status update', id)
    //     handleStatusUpdate({ id, ownId, children })
    //   }
    // }, [id, ownId, statusObject, children])
    useEffect(function () {
        if (id && ownId && statusObject === null && !status.some(function (_a) {
            var uniqueId = _a.uniqueId;
            return uniqueId === id;
        })) {
            console.log('announcing status', id);
            callbackHandleStatusAnnouncement();
        }
    }, [id, ownId, statusObject, status, callbackHandleStatusAnnouncement]);
    useEffect(function () {
        var statusObjectFound = status.find(function (_a) {
            var uniqueId = _a.uniqueId;
            return uniqueId === id;
        });
        if ((statusObject === null || (statusObject === null || statusObject === void 0 ? void 0 : statusObject.visible) !== (statusObjectFound === null || statusObjectFound === void 0 ? void 0 : statusObjectFound.visible)) && statusObjectFound) {
            setStatusObject(statusObjectFound);
        }
    }, [status, id, statusObject]);
    useLayoutEffect(function () {
        if (statusObject !== null) {
            setElementFound(document.getElementById(composeDomId(componentId, [secondary ? 'secondary' : 'primary'])) || null);
        }
    }, [secondary, statusObject]);
    useEffect(function () {
        console.log('generate ownId', ownId, id);
        setOwnId((Math.random() + 1).toString(36).substring(7));
    }, []);
    // validation
    useEffect(function () { if (!id) {
        console.error('Please define an id for the status bar item');
    } }, [id]);
    // teardown
    useEffect(function () { return function () { callbackHandleStatusDestroy(); }; }, [callbackHandleStatusDestroy]);
    return _jsx(_Fragment, { children: (statusObject !== null && !!id && elementFound)
            && createPortal((statusObject.visible && children) && _jsxs(SDiv, __assign({}, {
                id: id,
                direction: 'row',
                key: "mui-status-".concat(id),
                onClick: handleOnClick,
                onContextMenu: handleOnContextMenu,
                style: __assign(__assign({}, style), { order: statusObject.index }),
                highlight: highlight,
                startSeparator: startSeparator.toString(),
                endSeparator: endSeparator.toString(),
                hasclick: (!!onClick).toString(),
                isdisabled: disabled.toString(),
            }, { children: [hasArrow && _jsx(_Fragment, { children: position === PlacementPosition.Bottom
                            ? _jsx(SArrowUp, { position: position.toString(), color: "primary" })
                            : _jsx(SArrowDown, { position: position.toString(), color: "primary" }) }), tooltip
                        ? _jsx(Tooltip, __assign({ title: tooltip, arrow: true }, { children: _jsx(SSpan, { children: children }) }))
                        : _jsx(SSpan, { children: children })] })), elementFound) });
}
