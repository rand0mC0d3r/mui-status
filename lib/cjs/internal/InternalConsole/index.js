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
/* eslint-disable @typescript-eslint/no-explicit-any */
var AppsOutage_1 = __importDefault(require("@mui/icons-material/AppsOutage"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var re_resizable_1 = require("re-resizable");
var react_1 = require("react");
var index_types_1 = require("../../index.types");
var Store_1 = __importDefault(require("../../Store"));
var StyledStatusConsole = (0, styles_1.styled)('div')(function () { return ({
    flex: '1 0 auto',
    overflow: 'hidden',
    display: 'flex',
}); });
var StyledResizable = (0, styles_1.styled)('div')(function () { return ({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
}); });
var StyledWrapper = (0, styles_1.styled)('div')(function (_a) {
    var theme = _a.theme, bottom = _a.bottom;
    return ({
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        borderTop: "1px solid ".concat(theme.palette.divider),
        backgroundColor: theme.palette.background.default,
        bottom: bottom === 'true' ? '0px' : 'unset',
        top: bottom !== 'true' ? '0px' : 'unset',
        left: '0px',
        alignItems: 'center',
        right: '0px',
        zIndex: 999,
        '& > div > div:nth-child(2) > div:not(:first-child)': {
            display: 'none',
        }
    });
});
var StyledEmptyWrapper = (0, styles_1.styled)('div')(function () { return ({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
}); });
var StyledTabs = (0, styles_1.styled)('div')(function () { return ({
    display: 'flex',
    flexDirection: 'row',
    gap: '0px',
}); });
var StyledCloseIcon = (0, styles_1.styled)(Close_1.default)(function () { return ({
    fontSize: '20px'
}); });
var StyledTab = (0, styles_1.styled)(material_1.Typography)(function (_a) {
    var theme = _a.theme, activated = _a.activated;
    return ({
        padding: '4px 12px',
        cursor: 'pointer',
        backgroundColor: activated === 'true' ? theme.palette.primary.main : 'transparent',
        color: activated === 'true' ? theme.palette.background.default : theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: activated === 'true' ? theme.palette.primary.dark : theme.palette.divider,
            color: activated === 'true' ? theme.palette.background.default : theme.palette.text.primary,
        }
    });
});
var domId = 'mui-status-console';
var domIdWrapper = 'mui-status-console-wrapper';
var relevantType = 'console';
function default_1() {
    var _a = (0, react_1.useContext)(Store_1.default), status = _a.status, updateConsoleActiveId = _a.updateConsoleActiveId, updateIsConsoleOpen = _a.updateIsConsoleOpen;
    var _b = (0, react_1.useContext)(Store_1.default).settings, consoleActiveId = _b.consoleActiveId, isConsoleOpen = _b.isConsoleOpen, position = _b.position;
    var isActivated = function (uniqueId) { return uniqueId === consoleActiveId; };
    var relevantConsoles = status.filter(function (_a) {
        var type = _a.type;
        return type === relevantType;
    });
    var _c = (0, react_1.useState)('300px'), height = _c[0], setHeight = _c[1];
    var _d = (0, react_1.useState)('100%'), width = _d[0], setWidth = _d[1];
    var handleUserKeyPress = (0, react_1.useCallback)(function (event) {
        var keyCode = event.keyCode;
        if ((keyCode === 27)) {
            updateIsConsoleOpen();
        }
    }, []);
    (0, react_1.useEffect)(function () {
        window.addEventListener('keydown', handleUserKeyPress);
        return function () {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (isConsoleOpen) && (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: status.some(function (_a) {
                var type = _a.type;
                return type === relevantType;
            }) && (0, jsx_runtime_1.jsx)(StyledWrapper, __assign({}, { id: domIdWrapper }, { bottom: String(position === index_types_1.PlacementPosition.Bottom) }, { children: (0, jsx_runtime_1.jsx)(re_resizable_1.Resizable, __assign({ onResizeStop: function (_e, _direction, _ref, d) {
                        var computedHeight = Number(height.replace('px', '')) + d.height;
                        if (computedHeight < 125) {
                            updateConsoleActiveId({});
                        }
                        else {
                            setHeight("".concat(computedHeight, "px"));
                            setWidth('100%');
                        }
                    }, style: { display: 'flex', flexDirection: 'column' }, minHeight: "75px", maxHeight: "950px", defaultSize: { width: width, height: height } }, { children: (0, jsx_runtime_1.jsx)(StyledResizable, { children: relevantConsoles.some(function (_a) {
                            var uniqueId = _a.uniqueId;
                            return uniqueId === consoleActiveId;
                        })
                            ? (0, jsx_runtime_1.jsxs)("div", __assign({ style: { flex: '1 1 auto', display: 'flex', flexDirection: 'column' } }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, { children: [(0, jsx_runtime_1.jsx)(StyledTabs, { children: relevantConsoles.map(function (_a) {
                                                    var uniqueId = _a.uniqueId, title = _a.title;
                                                    return (0, jsx_runtime_1.jsx)(StyledTab, __assign({}, {
                                                        key: uniqueId,
                                                        variant: 'caption',
                                                        onClick: function () { return updateConsoleActiveId({ id: uniqueId }); },
                                                        activated: isActivated(uniqueId).toString()
                                                    }, { children: title || uniqueId }));
                                                }) }), (0, jsx_runtime_1.jsx)(material_1.Tooltip, __assign({}, { title: 'Close console section' }, { children: (0, jsx_runtime_1.jsx)(StyledCloseIcon, __assign({}, { onClick: function () { return updateConsoleActiveId({}); } })) }))] })), (0, jsx_runtime_1.jsx)(StyledStatusConsole, __assign({}, { id: domId }))] }))
                            : (0, jsx_runtime_1.jsxs)(StyledEmptyWrapper, { children: [(0, jsx_runtime_1.jsx)(AppsOutage_1.default, {}), (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({}, { variant: 'caption', color: 'textSecondary' }, { children: "Seems no consoles available. Select one from above" }))] }) }) })) })) }) });
}
exports.default = default_1;
