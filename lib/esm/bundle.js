import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Typography, Tooltip, Popover, alpha, Popper, ClickAwayListener, Stack, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useState, useCallback, useEffect, createContext, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AppsOutageIcon from '@mui/icons-material/AppsOutage';
import CloseIcon from '@mui/icons-material/Close';
import { Resizable } from 're-resizable';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var PlacementPosition;
(function (PlacementPosition) {
    PlacementPosition["Top"] = "top";
    PlacementPosition["Bottom"] = "bottom";
})(PlacementPosition || (PlacementPosition = {}));

var StyledPrimaryElem = styled('div')(function () { return ({
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
    justifyContent: 'flex-start',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
}); });
var StyledSecondaryElem = styled('div')(function () { return ({
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: '0 1 auto',
    minWidth: '18px',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
}); });
var domId$1 = 'mui-status-statusBar';
function InternalStatus () {
    var status = useContext(DataContext).status;
    return jsxs(Fragment, { children: [status.some(function (_a) {
                var secondary = _a.secondary;
                return !secondary;
            }) && jsx(StyledPrimaryElem, __assign({}, { id: "".concat(domId$1, "-primary") })), status.some(function (_a) {
                var secondary = _a.secondary;
                return secondary;
            }) && jsx(StyledSecondaryElem, __assign({}, { id: "".concat(domId$1, "-secondary") }))] });
}

var StyledStatusConsole = styled('div')(function () { return ({
    flex: '1 0 auto',
    overflow: 'hidden',
}); });
var StyledResizable = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
}); });
var StyledWrapper = styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        borderTop: "1px solid ".concat(theme.palette.divider),
        backgroundColor: theme.palette.background.default,
        bottom: '0px',
        left: '0px',
        alignItems: 'center',
        right: '0px',
        '& > div > div:nth-child(2) > div:not(:first-child)': {
            display: 'none',
        }
    });
});
var StyledEmptyWrapper = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
}); });
var StyledTabs = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'row',
    gap: '0px',
}); });
var StyledCloseIcon = styled(CloseIcon)(function () { return ({
    fontSize: '20px'
}); });
var StyledTab = styled(Typography)(function (_a) {
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
function InternalConsole () {
    var _a = useContext(DataContext), status = _a.status, updateConsoleActiveId = _a.updateConsoleActiveId, updateIsConsoleOpen = _a.updateIsConsoleOpen;
    var _b = useContext(DataContext).settings, consoleActiveId = _b.consoleActiveId, isConsoleOpen = _b.isConsoleOpen;
    var isActivated = function (uniqueId) { return uniqueId === consoleActiveId; };
    var relevantConsoles = status.filter(function (_a) {
        var type = _a.type;
        return type === relevantType;
    });
    var _c = useState('300px'), height = _c[0], setHeight = _c[1];
    var _d = useState('100%'), width = _d[0], setWidth = _d[1];
    var handleUserKeyPress = useCallback(function (event) {
        var keyCode = event.keyCode;
        if ((keyCode === 27)) {
            updateIsConsoleOpen();
        }
    }, []);
    useEffect(function () {
        window.addEventListener('keydown', handleUserKeyPress);
        return function () {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);
    return jsx(Fragment, { children: (isConsoleOpen) && jsx(Fragment, { children: status.some(function (_a) {
                var type = _a.type;
                return type === relevantType;
            }) && jsx(StyledWrapper, __assign({}, { id: domIdWrapper }, { children: jsx(Resizable, __assign({ onResizeStop: function (_e, _direction, _ref, d) {
                        var computedHeight = Number(height.replace('px', '')) + d.height;
                        if (computedHeight < 125) {
                            updateConsoleActiveId({});
                        }
                        else {
                            setHeight("".concat(computedHeight, "px"));
                            setWidth('100%');
                        }
                    }, style: { display: 'flex', flexDirection: 'column' }, minHeight: "75px", maxHeight: "950px", defaultSize: { width: width, height: height } }, { children: jsx(StyledResizable, { children: relevantConsoles.some(function (_a) {
                            var uniqueId = _a.uniqueId;
                            return uniqueId === consoleActiveId;
                        })
                            ? jsxs("div", __assign({ style: { flex: '1 1 auto', display: 'flex', flexDirection: 'column' } }, { children: [jsxs("div", __assign({ style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, { children: [jsx(StyledTabs, { children: relevantConsoles.map(function (_a) {
                                                    var uniqueId = _a.uniqueId, title = _a.title;
                                                    return jsx(StyledTab, __assign({}, {
                                                        key: uniqueId,
                                                        variant: 'caption',
                                                        onClick: function () { return updateConsoleActiveId({ id: uniqueId }); },
                                                        activated: isActivated(uniqueId).toString()
                                                    }, { children: title || uniqueId }));
                                                }) }), jsx(Tooltip, __assign({}, { title: 'Close console section' }, { children: jsx(StyledCloseIcon, __assign({}, { onClick: function () { return updateConsoleActiveId({}); } })) }))] })), jsx(StyledStatusConsole, __assign({}, { id: domId }))] }))
                            : jsxs(StyledEmptyWrapper, { children: [jsx(AppsOutageIcon, {}), jsx(Typography, __assign({}, { variant: 'caption', color: 'textSecondary' }, { children: "Seems no consoles available. Select one from above" }))] }) }) })) })) }) });
}

var StyledBox$1 = styled('div')(function (_a) {
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
function MuiWrapper (_a) {
    var children = _a.children;
    var _b = useContext(DataContext), status = _b.status, handleStatusVisibilityToggle = _b.handleStatusVisibilityToggle;
    var _c = useContext(DataContext).settings, position = _c.position, statusBarAnnounced = _c.statusBarAnnounced, upperBar = _c.upperBar;
    var _d = useState(null), anchorEl = _d[0], setAnchorEl = _d[1];
    var open = Boolean(anchorEl);
    var onClose = function () { return setAnchorEl(null); };
    var onContextMenu = function (e) {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    };
    var statusEntry = function (statusItem) { return jsxs(StyledEntryElementItem, __assign({ onClick: function () { return handleStatusVisibilityToggle({ id: statusItem.uniqueId }); } }, { children: [statusItem.visible ? jsx(CheckBoxOutlinedIcon, {}) : jsx(CheckBoxOutlineBlankOutlinedIcon, {}), statusItem.children || jsx(StyledTypographyNoChildren, __assign({ variant: "caption", color: "textSecondary" }, { children: "No content for child" }))] })); };
    var entryWrapper = function (statusItem) { return jsx(Tooltip, __assign({}, { key: statusItem.uniqueId, title: 'Toggle visibility of tile' }, { children: statusEntry(statusItem) })); };
    return jsxs(Fragment, { children: [jsxs(StyledBox$1, __assign({ id: "mui-status-wrapper" }, { column: position }, { children: [jsxs(StyledChildren, __assign({ id: "mui-status-children" }, { children: [children, status.some(function (_a) {
                                var type = _a.type;
                                return type === 'console';
                            }) && jsx(InternalConsole, {})] })), status.some(function (_a) {
                        var visible = _a.visible;
                        return visible;
                    }) && jsx(StyledStatusBar, __assign({ position: position }, { onContextMenu: onContextMenu }, { children: !statusBarAnnounced && jsx(InternalStatus, {}) }))] })), jsx(Popover, __assign({ id: "toggle-status-popover" }, { open: open, anchorEl: anchorEl, onClose: onClose, elevation: 1 }, { anchorOrigin: { vertical: upperBar ? 'top' : 'bottom', horizontal: 'center' }, transformOrigin: { vertical: !upperBar ? 'bottom' : 'top', horizontal: 'center' }, style: { marginTop: "".concat((upperBar ? 1 : -1) * 12, "px") } }, { children: jsx(StyledEntryElement, __assign({}, { onContextMenu: function (e) { e.preventDefault(); } }, { children: [false, true].map(function (state) { return jsx("div", { children: status.filter(function (_a) {
                            var secondary = _a.secondary;
                            return secondary === state;
                        }).map(function (statusItem) { return entryWrapper(statusItem); }) }, state.toString()); }) })) }))] });
}

var settingsStorageKey = 'mui-status.settings';
var statusStorageKey = 'mui-status.status';
var initialSettings = {
    position: PlacementPosition.Top,
    expand: true,
    statusBarAnnounced: false,
    allowRightClick: true,
    debug: false,
    hasLock: true,
    isConsoleOpen: false,
};
var valOrDefault = function (val, def) {
    if (val === undefined) {
        return def;
    }
    return val;
};
var DataContext = createContext({});
function MuiStatusProvider(_a) {
    var expand = _a.expand, hasLock = _a.hasLock, _b = _a.position, position = _b === void 0 ? PlacementPosition.Top : _b, allowRightClick = _a.allowRightClick, debug = _a.debug, children = _a.children;
    var _c = useState([]), status = _c[0], setStatus = _c[1];
    var _d = useState(initialSettings), settings = _d[0], setSettings = _d[1];
    // const [storedStatus, setStoredStatus] = useState<StatusObject[]>([])
    // const [storedSettings, setStoredSettings] = useState<SettingsObject>()
    var handleStatusAnnouncement = function (_a) {
        var id = _a.id, ownId = _a.ownId, secondary = _a.secondary, children = _a.children;
        setStatus(function (status) {
            var findError = status.find(function (sItem) { return sItem.uniqueId === id && sItem.ownId !== ownId; });
            if (findError) {
                console.error("mui-status: \u274C Status entry already registered with id: [".concat(id, "] & ownId: [").concat(ownId, "], but expected ownId [").concat(findError.ownId, "]"));
                return status;
            }
            if (settings.debug) {
                console.info("mui-status: \uD83C\uDD97 Status entry registered with id: [".concat(id, "] & ownId: [").concat(ownId, "]"));
            }
            return __spreadArray(__spreadArray([], status.filter(function (sItem) { return sItem.uniqueId !== id; }), true), [
                {
                    index: status.length,
                    uniqueId: id,
                    ownId: ownId,
                    visible: true,
                    secondary: secondary,
                    children: children
                }
            ], false);
        });
    };
    var handleStatusUpdate = function (_a) {
        var id = _a.id, ownId = _a.ownId, children = _a.children;
        setStatus(function (status) {
            var findError = status.find(function (sItem) { return sItem.uniqueId === id; });
            if ((findError === null || findError === void 0 ? void 0 : findError.ownId) !== ownId) {
                console.error("mui-status: \u274C Faulty status update captured for: [".concat(id, "] & ownId: [").concat(ownId, "], but expected ownId: [").concat(findError === null || findError === void 0 ? void 0 : findError.ownId, "]"));
                return status;
            }
            return status.map(function (sItem) { return (sItem.uniqueId === id && sItem.ownId === ownId) ? __assign(__assign({}, sItem), { children: children }) : sItem; });
        });
    };
    var handleStatusVisibilityToggle = function (_a) {
        var id = _a.id;
        setStatus(function (status) { return status.map(function (lo) { return (lo.uniqueId === id ? __assign(__assign({}, lo), { visible: !lo.visible }) : lo); }); });
    };
    var handleStatusTypeUpdate = function (_a) {
        var id = _a.id, type = _a.type;
        console.info("mui-status: \uD83C\uDD97 Updated type for id: [".concat(id, "] to: [").concat(type, "]"));
        setStatus(function (status) { return status.map(function (lo) { return (lo.uniqueId === id
            ? __assign(__assign({}, lo), { type: type })
            : lo); }); });
    };
    var handleStatusConsoleTypeUpdate = function (_a) {
        var id = _a.id, title = _a.title;
        console.info("mui-status: \uD83C\uDD97 Updated console title for id: [".concat(id, "] to: [").concat(title, "]"));
        setStatus(function (status) { return status.map(function (lo) { return (lo.uniqueId === id
            ? __assign(__assign({}, lo), { title: title })
            : lo); }); });
    };
    var handleStatusDestroy = function (_a) {
        var id = _a.id;
        setStatus(function (status) { return __spreadArray([], status.filter(function (lo) { return lo.uniqueId !== id; }), true); });
    };
    var triggerStatusBarAnnounced = function () {
        if (!settings.statusBarAnnounced) {
            setSettings(function (settings) { return (__assign(__assign({}, settings), { statusBarAnnounced: true })); });
        }
    };
    var updateConsoleActiveId = function (_a) {
        var id = _a.id;
        setSettings(function (settings) { return (__assign(__assign({}, settings), { consoleActiveId: id || undefined, isConsoleOpen: !!id })); });
    };
    var updateIsConsoleOpen = function () {
        setSettings(function (settings) { return (__assign(__assign({}, settings), { isConsoleOpen: !settings.isConsoleOpen })); });
    };
    var updateIsConsoleClosed = function () {
        setSettings(function (settings) { return (__assign(__assign({}, settings), { isConsoleOpen: false })); });
    };
    useEffect(function () {
        // const storedSettingsLocal = localStorage.getItem(settingsStorageKey)
        // const storedStatusLocal = localStorage.getItem(statusStorageKey)
        // if (storedSettingsLocal) setStoredSettings(JSON.parse(storedSettingsLocal))
        // if (storedStatusLocal) setStoredStatus(JSON.parse(storedStatusLocal))
    }, []);
    // useEffect(() => {
    //   if (storedStatus.length > 0) {
    //     setStatus((status: StatusObject[]) => status.map(statusItem => {
    //       const found = storedStatus.find(ss => ss.uniqueId === statusItem.uniqueId)
    //       return found ? { ...statusItem, found } : statusItem
    //     }))
    //   }
    //   if (storedSettings) {
    //     setSettings((settings: SettingsObject) => ({ ...settings, ...storedSettings }))
    //   }
    // }, [storedStatus, storedSettings])
    useEffect(function () { return localStorage.setItem(settingsStorageKey, JSON.stringify(settings)); }, [settings]);
    useEffect(function () { return localStorage.setItem(statusStorageKey, JSON.stringify(status.map(function (s) { return (__assign(__assign({}, s), { children: undefined })); }))); }, [status]);
    useEffect(function () {
        setSettings(function (settings) { return (__assign(__assign({}, settings), { expand: expand || initialSettings.expand, position: position, allowRightClick: allowRightClick || initialSettings.allowRightClick, debug: debug || initialSettings.debug, hasLock: valOrDefault(hasLock, initialSettings.hasLock) })); });
    }, [allowRightClick, expand, position, debug, hasLock]);
    useEffect(function () {
        if (settings.debug) {
            console.log('mui-status-store:', __assign(__assign({}, settings), { status: status }));
        }
    }, [settings, status]);
    return jsx(DataContext.Provider, __assign({ value: {
            // settings state + crud
            settings: settings,
            updateConsoleActiveId: updateConsoleActiveId,
            updateIsConsoleOpen: updateIsConsoleOpen,
            updateIsConsoleClosed: updateIsConsoleClosed,
            // status - wrapper
            triggerStatusBarAnnounced: triggerStatusBarAnnounced,
            // status state + crud
            status: status,
            handleStatusVisibilityToggle: handleStatusVisibilityToggle,
            handleStatusTypeUpdate: handleStatusTypeUpdate,
            handleStatusConsoleTypeUpdate: handleStatusConsoleTypeUpdate,
            handleStatusUpdate: handleStatusUpdate,
            handleStatusAnnouncement: handleStatusAnnouncement,
            handleStatusDestroy: handleStatusDestroy,
        } }, { children: jsx(MuiWrapper, __assign({}, { children: children })) }));
}

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
var StyledTooltip = styled(Tooltip)(function () { return ({
    padding: '4px 8px',
}); });
var StyledContainer$1 = styled('div')(function (_a) {
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
function MuiStatus (_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, style = _a.style, onClick = _a.onClick, onContextMenu = _a.onContextMenu, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.highlight, highlight = _d === void 0 ? 'default' : _d, _e = _a.tooltip, tooltip = _e === void 0 ? '' : _e, children = _a.children;
    var _f = useContext(DataContext), status = _f.status, handleStatusUpdate = _f.handleStatusUpdate, handleStatusAnnouncement = _f.handleStatusAnnouncement, handleStatusDestroy = _f.handleStatusDestroy;
    var allowRightClick = useContext(DataContext).settings.allowRightClick;
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
        if (allowRightClick && onContextMenu !== undefined && !disabled) {
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
    useEffect(function () {
        var foundObject = status.find(function (_a) {
            var uniqueId = _a.uniqueId;
            return uniqueId === id;
        });
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
    return jsx(Fragment, { children: (statusObject !== null && !!id && elementFound) && createPortal((statusObject.visible && children)
            ? jsx(StyledContainer$1, __assign({}, {
                id: id,
                highlight: highlight,
                hasClick: !!onClick,
                isDisabled: disabled,
                key: "mui-status-".concat(id),
                onClick: handleOnClick,
                onContextMenu: handleOnContextMenu,
                style: __assign(__assign({}, style), { order: statusObject.index })
            }, { children: jsx(StyledTooltip, __assign({ title: tooltip, arrow: true }, { children: jsx("span", { children: children }) })) }))
            : jsx(Fragment, {}), elementFound) });
}

function index$2 (_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, style = _a.style, onClick = _a.onClick, _c = _a.tooltip, tooltip = _c === void 0 ? '' : _c, children = _a.children, console = _a.console, consoleTitle = _a.consoleTitle;
    var _d = useContext(DataContext), status = _d.status, handleStatusTypeUpdate = _d.handleStatusTypeUpdate, handleStatusConsoleTypeUpdate = _d.handleStatusConsoleTypeUpdate, updateConsoleActiveId = _d.updateConsoleActiveId;
    var _e = useContext(DataContext).settings, consoleActiveId = _e.consoleActiveId, isConsoleOpen = _e.isConsoleOpen;
    var _f = useState(null), statusObject = _f[0], setStatusObject = _f[1];
    var _g = useState(null), elementFound = _g[0], setElementFound = _g[1];
    var handleOnClick = function () {
        if (onClick) {
            onClick();
        }
        if (!isConsoleOpen) {
            updateConsoleActiveId({ id: statusObject === null || statusObject === void 0 ? void 0 : statusObject.uniqueId });
        }
        else {
            updateConsoleActiveId(consoleActiveId === id ? {} : { id: statusObject === null || statusObject === void 0 ? void 0 : statusObject.uniqueId });
        }
    };
    useEffect(function () {
        setElementFound(document.getElementById('mui-status-console') || null);
    }, [statusObject, consoleActiveId, isConsoleOpen]);
    useEffect(function () {
        var foundObject = status.find(function (_a) {
            var uniqueId = _a.uniqueId;
            return uniqueId === id;
        });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
            handleStatusTypeUpdate({ id: id, type: 'console' });
        }
    }, [status, id, statusObject]);
    useEffect(function () {
        if (statusObject) {
            handleStatusConsoleTypeUpdate({ id: id, title: consoleTitle });
        }
    }, [statusObject, id, consoleTitle]);
    return jsxs(Fragment, { children: [jsx(MuiStatus, __assign({}, {
                id: id,
                tooltip: tooltip,
                secondary: secondary,
                highlight: (statusObject && isConsoleOpen && (statusObject === null || statusObject === void 0 ? void 0 : statusObject.uniqueId) === consoleActiveId) ? 'primary' : 'default',
                onClick: function () { return handleOnClick(); },
                style: __assign(__assign({}, style), { cursor: 'context-menu', minWidth: '24px' })
            }, { children: children })), elementFound && statusObject && statusObject.uniqueId === consoleActiveId && createPortal(console, elementFound)] });
}

var StyledActionsWrapper = styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        padding: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: "1px solid ".concat(theme.palette.divider),
        userSelect: 'none',
        alignItems: 'center'
    });
});
var StyledActions = styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        gap: "".concat(theme.shape.borderRadius, "px"),
        justifyContent: 'flex-end',
        alignItems: 'center'
    });
});
var StyledContainer = styled('div')(function (_a) {
    var theme = _a.theme, elevation = _a.elevation;
    return ({
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: "".concat(alpha(theme.palette.background.default, 0.75)),
        backdropFilter: 'blur(8px)',
        borderRadius: "".concat(theme.shape.borderRadius, "px"),
        margin: "".concat(theme.spacing(0.5), " 0px"),
        padding: theme.spacing(0.5),
        border: "1px solid ".concat(theme.palette.divider),
        boxShadow: theme.shadows[elevation]
    });
});
var StyledTypography$1 = styled(Typography)(function () { return ({
    lineHeight: 1
}); });
function index$1 (_a) {
    var id = _a.id, _b = _a.secondary, secondary = _b === void 0 ? false : _b, _c = _a.elevation, elevation = _c === void 0 ? 2 : _c, style = _a.style, onClick = _a.onClick, onClose = _a.onClose, highlight = _a.highlight, _d = _a.tooltip, tooltip = _d === void 0 ? '' : _d, children = _a.children, popoverStyle = _a.popoverStyle, popoverClassName = _a.popoverClassName, popover = _a.popover, popoverTitle = _a.popoverTitle, popoverActions = _a.popoverActions;
    var _e = useContext(DataContext), status = _e.status, settings = _e.settings;
    var _f = useState(null), statusObject = _f[0], setStatusObject = _f[1];
    var _g = useState(false), keepOpen = _g[0], setKeepOpen = _g[1];
    var _h = useState(null), anchorEl = _h[0], setAnchorEl = _h[1];
    var _j = useState(false), isToggled = _j[0], setIsToggled = _j[1];
    var open = Boolean(anchorEl);
    var handleOnClick = function (e) {
        if (onClick && !keepOpen) {
            onClick();
        }
        if (anchorEl && !keepOpen) {
            setAnchorEl(null);
        }
        else {
            setAnchorEl(e.currentTarget);
        }
        setIsToggled(e.pageY < screen.height / 2);
    };
    var handleOnClose = function () {
        if (onClose && !keepOpen) {
            onClose();
        }
        if (!keepOpen) {
            setAnchorEl(null);
        }
        if (!settings.hasLock) {
            setAnchorEl(null);
        }
    };
    var FallbackPopoverProps = {
        open: open,
        anchorEl: anchorEl,
        onClose: onClose,
        elevation: elevation,
        id: "mui-status-panel-popover-".concat(id),
        className: popoverClassName,
        style: __assign({ marginTop: "".concat((isToggled ? 1 : -1) * 12, "px") }, popoverStyle),
    };
    useEffect(function () {
        var foundObject = status.find(function (item) { return item.uniqueId === id; });
        if (statusObject === null && foundObject) {
            setStatusObject(foundObject);
        }
    }, [status, id, statusObject]);
    return jsxs(Fragment, { children: [jsx(MuiStatus, __assign({}, {
                id: id,
                tooltip: tooltip,
                highlight: (keepOpen || open) ? 'primary' : highlight,
                secondary: secondary,
                onClick: handleOnClick,
                style: __assign(__assign({}, style), { cursor: 'context-menu', minWidth: '24px' })
            }, { children: children })), jsx(Popper, __assign({}, __assign({ keepMounted: keepOpen }, FallbackPopoverProps), { children: jsx(ClickAwayListener, __assign({ onClickAway: function () { return handleOnClose(); } }, { children: jsxs(StyledContainer, __assign({}, { elevation: elevation }, { children: [popover, jsxs(StyledActionsWrapper, { children: [jsx(StyledTypography$1, __assign({ variant: "caption", color: "textSecondary" }, { children: popoverTitle })), jsxs(StyledActions, { children: [popoverActions, settings.hasLock && jsx(Tooltip, __assign({ title: "Toggle keep-open" }, { children: keepOpen
                                                    ? jsx(LockOutlinedIcon, { onClick: function () { return setKeepOpen(!keepOpen); }, color: "primary", style: { fontSize: 14 } })
                                                    : jsx(LockOpenOutlinedIcon, { onClick: function () { return setKeepOpen(!keepOpen); }, style: { fontSize: 14 } }) }))] })] })] })) })) }))] });
}

var StyledBox = styled(Stack)(function (_a) {
    var theme = _a.theme, reverse = _a.reverse;
    return ({
        gap: "".concat(theme.spacing(0.5)),
        flexDirection: reverse === 'true' ? 'row-reverse' : 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        userSelect: 'none',
        WebkitFontSmoothing: 'antialiased',
        shapeRendering: 'geometricPrecision',
    });
});
var StyledSvgIcon = styled(SvgIcon)(function (_a) {
    var reverseicon = _a.reverseicon;
    return ({
        fontSize: '14px',
        flex: '0 1 100%',
        transform: reverseicon === 'true' ? 'scaleX(-1)' : 'scaleX(1)',
    });
});
var StyledTypography = styled(Typography)(function () { return ({
    whiteSpace: 'nowrap',
    userSelect: 'none',
    fontSize: '12px',
    lineHeight: 'inherit',
}); });
var StyledNotificationsTypography = styled(Typography)(function (_a) {
    var theme = _a.theme;
    return ({
        borderRadius: "".concat(theme.shape.borderRadius * 2, "px"),
        padding: '0px 6px',
        lineHeight: '1.3',
        fontSize: '10px',
        backgroundColor: theme.palette.divider,
        border: "0.5px solid ".concat(theme.palette.divider),
    });
});
var StyledImg = styled('img')(function (_a) {
    var mask = _a.mask;
    return ({
        width: '18px',
        height: '18px',
        borderRadius: mask ? '50%' : '0px',
    });
});
/**
 * @param icon - (ReactNode) Icon to display for status element. Expects a Material UI SvgIcon component.
 * @param text - (string | number) Text to display for status element.
 * @param notifications - (string | number) Badge to display relevant notifications.
 * @param image - (string) Image to display for status element. Expects a valid image path.
 * @param mask - (boolean) If needs to be applied a circular mask to the image.
 * @param reverse - (boolean) If needs to be applied a reverse of the default order of the elements.
 * @param reverseIcon - (boolean) If needs to be applied a reverse of the given icon.
 * @param className - (HTMLAttribute) Class name to be applied to the root element.
 * @param style - (CSSProperties) Style to be applied to the root element.
 *
 * @returns (JSX.Element) Status element
 */
function index (_a) {
    var icon = _a.icon, text = _a.text, notifications = _a.notifications, image = _a.image, _b = _a.mask, mask = _b === void 0 ? false : _b, _c = _a.reverse, reverse = _c === void 0 ? false : _c, _d = _a.reverseIcon, reverseIcon = _d === void 0 ? false : _d, className = _a.className, style = _a.style;
    return jsxs(StyledBox, __assign({}, { id: 'statusHelper', style: style, className: className, reverse: reverse.toString() }, { children: [icon && jsx(StyledSvgIcon, __assign({}, { id: 'sh.icon', reverseicon: reverseIcon.toString() }, { children: icon })), image && jsx(StyledImg, __assign({}, { id: 'sh.image', alt: 'Status entry', mask: mask, src: image })), notifications && jsx(StyledNotificationsTypography, __assign({}, {
                id: 'sh.notifications',
                variant: 'subtitle2',
                color: 'textPrimary'
            }, { children: notifications })), text && jsx(StyledTypography, __assign({}, { id: 'sh.text', variant: 'caption' }, { children: text }))] }));
}

export { MuiStatus as Status, index$2 as StatusConsole, index as StatusHelper, index$1 as StatusPanel, MuiStatusProvider as StatusProvider };
