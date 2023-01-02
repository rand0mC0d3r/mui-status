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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { createContext, useEffect, useState } from 'react';
import { PlacementPosition } from '../index.types';
import Wrapper from '../internal/Wrapper';
var domIdBase = 'mui-status';
export var composeDomId = function (component, detail) {
    var id = detail.join('-');
    return "".concat(domIdBase, "-").concat(component, "-").concat(id);
};
var settingsStorageKey = 'mui-status.settings';
var statusStorageKey = 'mui-status.status';
var initialSettings = {
    position: PlacementPosition.Top,
    expand: true,
    statusBarAnnounced: false,
    allowRightClick: true,
    debug: false,
    hasLock: true,
    width: '100%',
    hasBorder: true,
    isConsoleFixed: false,
    isConsoleOpen: false,
};
var valOrDefault = function (val, def) {
    if (val === undefined) {
        return def;
    }
    return val;
};
var DataContext = createContext({});
function StatusProvider(_a) {
    var expand = _a.expand, hasLock = _a.hasLock, _b = _a.position, position = _b === void 0 ? PlacementPosition.Top : _b, allowRightClick = _a.allowRightClick, _c = _a.hasBorder, hasBorder = _c === void 0 ? true : _c, _d = _a.width, width = _d === void 0 ? '100%' : _d, _e = _a.justifyContent, justifyContent = _e === void 0 ? 'space-between' : _e, debug = _a.debug, children = _a.children;
    var _f = useState([]), status = _f[0], setStatus = _f[1];
    var _g = useState([]), snackbar = _g[0], setSnackbar = _g[1];
    var _h = useState(initialSettings), settings = _h[0], setSettings = _h[1];
    var logDebug = function (message) {
        if (settings.debug) {
            console.log(message);
        }
    };
    var handleStatusAnnouncement = function (_a) {
        var id = _a.id, ownId = _a.ownId, secondary = _a.secondary, children = _a.children;
        console.log('registed status', id);
        setStatus(function (status) {
            var findError = status.find(function (sItem) { return sItem.uniqueId === id && sItem.ownId !== ownId; });
            if (findError) {
                logDebug("mui-status: \u274C Status entry already registered with id: [".concat(id, "] & ownId: [").concat(ownId, "], but was proposed ownId [").concat(findError.ownId, "]"));
                return status;
            }
            logDebug("mui-status: \uD83C\uDD97 Status entry registered with id: [".concat(id, "] & ownId: [").concat(ownId, "]"));
            return __spreadArray(__spreadArray([], status.filter(function (_a) {
                var uniqueId = _a.uniqueId;
                return uniqueId !== id;
            }), true), [
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
    var handleSnackbarAnnouncement = function (_a) {
        var ownId = _a.ownId, severity = _a.severity, actions = _a.actions, source = _a.source, message = _a.message, code = _a.code, autoHideDuration = _a.autoHideDuration;
        console.log('registed snackbar', ownId);
        setSnackbar(function (snackbar) { return __spreadArray(__spreadArray([], snackbar.filter(function (_a) {
            var uniqueId = _a.uniqueId;
            return uniqueId !== ownId;
        }), true), [
            {
                uniqueId: ownId,
                open: true,
                severity: severity,
                actions: actions,
                source: source,
                message: message,
                code: code,
                autoHideDuration: autoHideDuration,
            }
        ], false); });
    };
    var handleStatusUpdate = function (_a) {
        var id = _a.id, ownId = _a.ownId, children = _a.children;
        setStatus(function (status) {
            var findError = status.find(function (_a) {
                var uniqueId = _a.uniqueId;
                return uniqueId === id;
            });
            if ((findError === null || findError === void 0 ? void 0 : findError.ownId) !== ownId) {
                if (settings.debug) {
                    console.error("mui-status: \u274C Faulty status update captured for: [".concat(id, "] & ownId: [").concat(ownId, "], but expected ownId: [").concat(findError === null || findError === void 0 ? void 0 : findError.ownId, "]"));
                }
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
        if (settings.debug) {
            console.info("mui-status: \uD83C\uDD97 Updated type for id: [".concat(id, "] to: [").concat(type, "]"));
        }
        setStatus(function (status) { return status.map(function (lo) { return (lo.uniqueId === id
            ? __assign(__assign({}, lo), { type: type })
            : lo); }); });
    };
    var handleStatusConsoleTypeUpdate = function (_a) {
        var id = _a.id, title = _a.title;
        if (settings.debug) {
            console.info("mui-status: \uD83C\uDD97 Updated console title for id: [".concat(id, "] to: [").concat(title, "]"));
        }
        setStatus(function (status) { return status.map(function (lo) { return (lo.uniqueId === id
            ? __assign(__assign({}, lo), { title: title })
            : lo); }); });
    };
    var handleStatusDestroy = function (_a) {
        var id = _a.id;
        setStatus(function (status) { return __spreadArray([], status.filter(function (lo) { return lo.uniqueId !== id; }), true); });
    };
    var handleSnackbarDestroy = function (_a) {
        var uniqueId = _a.uniqueId;
        setSnackbar(function (snackbar) { return __spreadArray([], snackbar.filter(function (lo) { return lo.uniqueId !== uniqueId; }), true); });
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
        console.log('hasBorder', hasBorder);
        setSettings(function (settings) { return (__assign(__assign({}, settings), { expand: expand || initialSettings.expand, position: position, justifyContent: justifyContent, width: width || initialSettings.width, hasBorder: hasBorder, allowRightClick: allowRightClick || initialSettings.allowRightClick, debug: debug || initialSettings.debug, hasLock: valOrDefault(hasLock, initialSettings.hasLock) })); });
    }, [allowRightClick, hasBorder, justifyContent, width, expand, position, debug, hasLock]);
    // useEffect(() => {
    //   if (settings.debug) {
    //     console.log('mui-status-store:', { ...settings, status, snackbar })
    //   }
    // }, [settings, status, snackbar])
    useEffect(function () {
        if (settings.debug) {
            console.log('mui-status-settings:', __assign({}, settings));
        }
    }, [settings]);
    useEffect(function () {
        if (settings.debug) {
            console.log('mui-status-status:', __assign({}, status));
        }
    }, [status]);
    useEffect(function () {
        if (settings.debug) {
            console.log('mui-status-snackbar:', __assign({}, snackbar));
        }
    }, [snackbar]);
    return _jsx(DataContext.Provider, __assign({ value: {
            // settings state + crud
            settings: settings,
            updateConsoleActiveId: updateConsoleActiveId,
            updateIsConsoleOpen: updateIsConsoleOpen,
            updateIsConsoleClosed: updateIsConsoleClosed,
            // status - wrapper
            triggerStatusBarAnnounced: triggerStatusBarAnnounced,
            // snackbar + crud,
            snackbar: snackbar,
            handleSnackbarDestroy: handleSnackbarDestroy,
            // status state + crud
            status: status,
            handleStatusVisibilityToggle: handleStatusVisibilityToggle,
            handleStatusTypeUpdate: handleStatusTypeUpdate,
            handleStatusConsoleTypeUpdate: handleStatusConsoleTypeUpdate,
            handleStatusUpdate: handleStatusUpdate,
            handleStatusAnnouncement: handleStatusAnnouncement,
            handleSnackbarAnnouncement: handleSnackbarAnnouncement,
            handleStatusDestroy: handleStatusDestroy,
            logDebug: logDebug,
        } }, { children: _jsx(Wrapper, __assign({}, { children: children })) }));
}
export default DataContext;
export { StatusProvider };
