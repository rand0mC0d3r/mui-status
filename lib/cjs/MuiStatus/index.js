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
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
var styles_1 = require("@mui/material/styles");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var MuiStore_1 = __importDefault(require("../MuiStore"));
var Tooltip_1 = __importDefault(require("../utils/Tooltip"));
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
var StyledContainer = (0, styles_1.styled)('div')(function (_a) {
    var theme = _a.theme, hasClick = _a.hasClick, highlight = _a.highlight;
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
        cursor: hasClick ? 'pointer' : '',
        backgroundColor: backgroundColor(highlight, theme),
        '& > div > *': {
            color: highlight !== 'default' ? "".concat(theme.palette.background.default, " !important") : '',
        },
        '& > span > div > *': {
            color: highlight !== 'default' ? "".concat(theme.palette.background.default, " !important") : '',
        },
        '&:hover': {
            backgroundColor: "".concat(highlight === 'default' ? theme.palette.divider : onHoverBg(highlight, theme), " !important"),
            color: "".concat(theme.palette.background.default, " !important"),
        },
    });
});
function default_1(_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, style = _a.style, onClick = _a.onClick, onContextMenu = _a.onContextMenu, _c = _a.highlight, highlight = _c === void 0 ? 'default' : _c, _d = _a.tooltip, tooltip = _d === void 0 ? '' : _d, children = _a.children;
    var _e = (0, react_1.useContext)(MuiStore_1.default), status = _e.status, settings = _e.settings, handleStatusUpdate = _e.handleStatusUpdate, handleStatusAnnouncement = _e.handleStatusAnnouncement, handleStatusDestroy = _e.handleStatusDestroy;
    var _f = (0, react_1.useState)(), ownId = _f[0], setOwnId = _f[1];
    var _g = (0, react_1.useState)(false), isAnnounced = _g[0], setIsAnnounced = _g[1];
    var _h = (0, react_1.useState)(null), statusObject = _h[0], setStatusObject = _h[1];
    var _j = (0, react_1.useState)(null), elementFound = _j[0], setElementFound = _j[1];
    var callbackHandleStatusAnnouncement = (0, react_1.useCallback)(function (idIncoming) { return handleStatusAnnouncement({ id: idIncoming, ownId: ownId, secondary: secondary, children: children }); }, [secondary, ownId, children, handleStatusAnnouncement]);
    var callbackHandleStatusDestroy = (0, react_1.useCallback)(function () {
        handleStatusDestroy({ id: id });
    }, [id]);
    var handleOnClick = function (e) {
        if (onClick !== undefined) {
            e.preventDefault();
            onClick(e);
            handleStatusUpdate({ id: id, ownId: ownId, children: children });
        }
    };
    var handleOnContextMenu = function (e) {
        e.preventDefault();
        if (settings.allowRightClick && onContextMenu) {
            onContextMenu(e);
        }
    };
    (0, react_1.useEffect)(function () {
        setOwnId((Math.random() + 1).toString(36).substring(7));
    }, []);
    /**
     * Update status element with changed children or highlight
     * */
    (0, react_1.useEffect)(function () {
        if (ownId && statusObject !== null) {
            handleStatusUpdate({ id: id, ownId: ownId, children: children });
        }
    }, [id, ownId, statusObject, children]);
    /**
     * Announce status element to the store
     * */
    (0, react_1.useEffect)(function () {
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
    (0, react_1.useEffect)(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if ((statusObject === null || (statusObject === null || statusObject === void 0 ? void 0 : statusObject.visible) !== (foundObject === null || foundObject === void 0 ? void 0 : foundObject.visible)) && foundObject) {
            setStatusObject(foundObject);
        }
    }, [status, id, statusObject]);
    (0, react_1.useLayoutEffect)(function () {
        if (statusObject !== null) {
            setElementFound(document.getElementById("mui-status-statusBar-".concat(secondary ? 'secondary' : 'primary')) || null);
        }
    }, [secondary, statusObject, id]);
    (0, react_1.useEffect)(function () { return function () {
        callbackHandleStatusDestroy();
    }; }, [callbackHandleStatusDestroy]);
    (0, react_1.useEffect)(function () {
        if (!id) {
            console.error('Please define an id for the status bar item');
        }
    }, [id]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (statusObject !== null && !!id && elementFound) && (0, react_dom_1.createPortal)((statusObject.visible && children)
            ? (0, jsx_runtime_1.jsx)(StyledContainer, __assign({}, {
                id: id,
                highlight: highlight,
                hasClick: !!onClick,
                key: "mui-status-".concat(id),
                onClick: handleOnClick,
                onContextMenu: handleOnContextMenu,
                style: __assign(__assign({}, style), { order: statusObject.index })
            }, { children: (0, jsx_runtime_1.jsx)(Tooltip_1.default, __assign({}, { tooltip: tooltip, children: children })) }))
            : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), elementFound) });
}
exports.default = default_1;
