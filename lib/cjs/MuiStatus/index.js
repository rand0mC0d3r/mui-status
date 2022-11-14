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
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var MuiStore_1 = __importDefault(require("../MuiStore"));
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
var backgroundColorHover = function (highlight, theme) {
    switch (highlight) {
        case 'primary':
            return theme.palette.primary.dark;
        case 'secondary':
            return theme.palette.secondary.dark;
        default:
            return theme.palette.divider;
    }
};
var StyledTooltip = (0, styles_1.styled)(material_1.Tooltip)(function () { return ({
    padding: '4px 8px',
}); });
var StyledContainer = (0, styles_1.styled)('div')(function (_a) {
    var theme = _a.theme, hasClick = _a.hasClick, highlight = _a.highlight, isDisabled = _a.isDisabled;
    return ({
        WebkitFontSmoothing: 'auto',
        height: '100%',
        display: 'flex',
        flex: '0 0 auto',
        alignItems: 'center',
        gap: '16px',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'relative',
        cursor: (hasClick && !isDisabled) ? 'pointer' : '',
        backgroundColor: backgroundColor(highlight, theme),
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
        '&:hover': (hasClick && !isDisabled) ? {
            backgroundColor: backgroundColorHover(highlight, theme),
            color: "".concat(theme.palette.text.primary),
        } : {}
    });
});
function default_1(_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, style = _a.style, onClick = _a.onClick, onContextMenu = _a.onContextMenu, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.highlight, highlight = _d === void 0 ? 'default' : _d, _e = _a.tooltip, tooltip = _e === void 0 ? '' : _e, children = _a.children;
    var _f = (0, react_1.useContext)(MuiStore_1.default), status = _f.status, handleStatusUpdate = _f.handleStatusUpdate, handleStatusAnnouncement = _f.handleStatusAnnouncement, handleStatusDestroy = _f.handleStatusDestroy;
    var allowRightClick = (0, react_1.useContext)(MuiStore_1.default).settings.allowRightClick;
    var _g = (0, react_1.useState)(), ownId = _g[0], setOwnId = _g[1];
    var _h = (0, react_1.useState)(false), isAnnounced = _h[0], setIsAnnounced = _h[1];
    var _j = (0, react_1.useState)(null), statusObject = _j[0], setStatusObject = _j[1];
    var _k = (0, react_1.useState)(null), elementFound = _k[0], setElementFound = _k[1];
    var callbackHandleStatusAnnouncement = (0, react_1.useCallback)(function (idIncoming) { return handleStatusAnnouncement({ id: idIncoming, ownId: ownId, secondary: secondary, children: children }); }, [secondary, ownId, children, handleStatusAnnouncement]);
    var callbackHandleStatusDestroy = (0, react_1.useCallback)(function () {
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
        if (allowRightClick && onContextMenu !== undefined && !disabled) {
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
            if (!status.some(function (_a) {
                var uniqueId = _a.uniqueId;
                return uniqueId === id;
            })) {
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
        var foundObject = status.find(function (_a) {
            var uniqueId = _a.uniqueId;
            return uniqueId === id;
        });
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
                isDisabled: disabled,
                key: "mui-status-".concat(id),
                onClick: handleOnClick,
                onContextMenu: handleOnContextMenu,
                style: __assign(__assign({}, style), { order: statusObject.index })
            }, { children: (0, jsx_runtime_1.jsx)(StyledTooltip, __assign({ title: tooltip, arrow: true }, { children: (0, jsx_runtime_1.jsx)("span", { children: children }) })) }))
            : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), elementFound) });
}
exports.default = default_1;
