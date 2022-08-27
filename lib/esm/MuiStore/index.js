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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
/* eslint-disable no-console */
import React, { createContext, useEffect, useState } from 'react';
import MuiWrapper from '../MuiWrapper';
var settingsStorageKey = 'mui-status.settings';
var statusStorageKey = 'mui-status.status';
var DataContext = createContext({});
function MuiStatusProvider(_a) {
    var _b = _a.expand, expand = _b === void 0 ? true : _b, _c = _a.position, position = _c === void 0 ? 'top' : _c, _d = _a.allowRightClick, allowRightClick = _d === void 0 ? true : _d, debug = _a.debug, tooltipComponent = _a.tooltipComponent, popoverComponent = _a.popoverComponent, children = _a.children, props = __rest(_a, ["expand", "position", "allowRightClick", "debug", "tooltipComponent", "popoverComponent", "children"]);
    var _e = useState(props['status'] || []), status = _e[0], setStatus = _e[1];
    var _f = useState([]), storedStatus = _f[0], setStoredStatus = _f[1];
    var _g = useState(props['settings'] || {
        expand: true,
        statusBarAnnounced: false,
        allowRightClick: false,
        debug: false,
    }), settings = _g[0], setSettings = _g[1];
    var _h = useState(), storedSettings = _h[0], setStoredSettings = _h[1];
    var handleStatusAnnouncement = function (_a) {
        var id = _a.id, secondary = _a.secondary, children = _a.children;
        setStatus(function (status) { return __spreadArray(__spreadArray([], status.filter(function (lo) { return lo.uniqueId !== id; }), true), [{
                index: status.length,
                uniqueId: id,
                visible: true,
                secondary: secondary,
                children: children
            }], false); });
    };
    var handleStatusUpdate = function (_a) {
        var id = _a.id, children = _a.children;
        console.log('handleStatusUpdate', id, children);
        setStatus(function (status) { return status.map(function (lo) { return lo.uniqueId !== id ? lo : __assign(__assign({}, lo), { children: children }); }); });
    };
    var handleStatusVisibilityToggle = function (_a) {
        var id = _a.id;
        setStatus(function (status) { return status.map(function (lo) { return (lo.uniqueId === id ? __assign(__assign({}, lo), { visible: !lo.visible }) : lo); }); });
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
    useEffect(function () {
        var storedSettingsLocal = localStorage.getItem(settingsStorageKey);
        var storedStatusLocal = localStorage.getItem(statusStorageKey);
        if (storedSettingsLocal)
            setStoredSettings(JSON.parse(storedSettingsLocal));
        if (storedStatusLocal)
            setStoredStatus(JSON.parse(storedStatusLocal));
    }, []);
    useEffect(function () {
        if (storedStatus.length > 0) {
            setStatus(function (status) { return status.map(function (statusItem) {
                var found = storedStatus.find(function (ss) { return ss.uniqueId === statusItem.uniqueId; });
                return found ? __assign(__assign({}, statusItem), { found: found }) : statusItem;
            }); });
        }
        if (storedSettings) {
            setSettings(function (settings) { return (__assign(__assign({}, settings), storedSettings)); });
        }
    }, [storedStatus, storedSettings]);
    useEffect(function () { return localStorage.setItem(settingsStorageKey, JSON.stringify(settings)); }, [settings]);
    useEffect(function () { return localStorage.setItem(statusStorageKey, JSON.stringify(status.map(function (s) { return (__assign(__assign({}, s), { children: undefined })); }))); }, [status]);
    useEffect(function () { return setSettings(function (settings) { return (__assign(__assign({}, settings), { expand: expand, position: position, allowRightClick: allowRightClick, debug: debug })); }); }, [allowRightClick, expand, position, debug]);
    useEffect(function () {
        if (settings.debug) {
            console.log('MuiStatusProvider:', __assign(__assign({}, settings), status));
        }
    }, [settings, status]);
    return React.createElement(DataContext.Provider, { id: "provider", value: {
            // passthru props
            tooltipComponent: tooltipComponent,
            popoverComponent: popoverComponent,
            // settings state + crud
            settings: settings,
            setSettings: setSettings,
            // status - wrapper
            triggerStatusBarAnnounced: triggerStatusBarAnnounced,
            // status state + crud
            status: status,
            handleStatusVisibilityToggle: handleStatusVisibilityToggle,
            handleStatusUpdate: handleStatusUpdate,
            handleStatusAnnouncement: handleStatusAnnouncement,
            handleStatusDestroy: handleStatusDestroy,
        } },
        React.createElement(MuiWrapper, __assign({}, { children: children })));
}
export default DataContext;
export { MuiStatusProvider };
