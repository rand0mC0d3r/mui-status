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
import MuiWrapper from '../MuiWrapper';
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
    var expand = _a.expand, hasLock = _a.hasLock, _b = _a.position, position = _b === void 0 ? PlacementPosition.Top : _b, allowRightClick = _a.allowRightClick, debug = _a.debug, tooltipComponent = _a.tooltipComponent, popoverComponent = _a.popoverComponent, children = _a.children;
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
    return _jsx(DataContext.Provider, __assign({ value: {
            // passthru props
            tooltipComponent: tooltipComponent,
            popoverComponent: popoverComponent,
            // settings state + crud
            settings: settings,
            updateConsoleActiveId: updateConsoleActiveId,
            updateIsConsoleOpen: updateIsConsoleOpen,
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
        } }, { children: _jsx(MuiWrapper, __assign({}, { children: children })) }));
}
export default DataContext;
export { MuiStatusProvider };
