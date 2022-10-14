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
var DataContext = createContext({});
function MuiStatusProvider(_a) {
    var _b = _a.expand, expand = _b === void 0 ? true : _b, _c = _a.position, position = _c === void 0 ? PlacementPosition.Top : _c, _d = _a.allowRightClick, allowRightClick = _d === void 0 ? true : _d, _e = _a.debug, debug = _e === void 0 ? false : _e, tooltipComponent = _a.tooltipComponent, popoverComponent = _a.popoverComponent, children = _a.children;
    var _f = useState([]), status = _f[0], setStatus = _f[1];
    var _g = useState({
        expand: true,
        statusBarAnnounced: false,
        allowRightClick: false,
        debug: false,
    }), settings = _g[0], setSettings = _g[1];
    var _h = useState([]), storedStatus = _h[0], setStoredStatus = _h[1];
    var _j = useState(), storedSettings = _j[0], setStoredSettings = _j[1];
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
            console.log('mui-status-store:', __assign(__assign({}, settings), status));
        }
    }, [settings, status]);
    return _jsx(DataContext.Provider, __assign({ value: {
            // passthru props
            tooltipComponent: tooltipComponent,
            popoverComponent: popoverComponent,
            // settings state + crud
            settings: settings,
            // status - wrapper
            triggerStatusBarAnnounced: triggerStatusBarAnnounced,
            // status state + crud
            status: status,
            handleStatusVisibilityToggle: handleStatusVisibilityToggle,
            handleStatusUpdate: handleStatusUpdate,
            handleStatusAnnouncement: handleStatusAnnouncement,
            handleStatusDestroy: handleStatusDestroy,
        } }, { children: _jsx(MuiWrapper, __assign({}, { children: children })) }));
}
export default DataContext;
export { MuiStatusProvider };
