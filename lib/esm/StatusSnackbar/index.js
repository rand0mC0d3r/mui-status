import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useCallback, useContext, useEffect, useState } from 'react';
import DataProvider from '../Store';
export default function (_a) {
    var severity = _a.severity, message = _a.message, _b = _a.autoHideDuration, autoHideDuration = _b === void 0 ? 6000 : _b, actions = _a.actions, source = _a.source, code = _a.code;
    var _c = useContext(DataProvider), snackbar = _c.snackbar, handleSnackbarAnnouncement = _c.handleSnackbarAnnouncement;
    var _d = useState(), ownId = _d[0], setOwnId = _d[1];
    var _e = useState(null), snackbarObject = _e[0], setSnackbarObject = _e[1];
    var callbackHandleStatusAnnouncement = useCallback(function () {
        console.log(ownId, severity, message, code, autoHideDuration);
        handleSnackbarAnnouncement({ ownId: ownId, actions: actions, source: source, severity: severity, message: message, code: code, autoHideDuration: autoHideDuration });
    }, [severity, ownId, message, actions, source, code, autoHideDuration, handleSnackbarAnnouncement]);
    useEffect(function () {
        if (ownId) {
            var snackbarObjectFound = snackbar.find(function (_a) {
                var uniqueId = _a.uniqueId;
                return uniqueId === ownId;
            });
            if (snackbarObjectFound) {
                setSnackbarObject(snackbarObjectFound);
            }
        }
    }, [snackbar, ownId, snackbarObject]);
    useEffect(function () {
        if (ownId && snackbarObject === null) {
            callbackHandleStatusAnnouncement();
        }
    }, [ownId, snackbarObject, callbackHandleStatusAnnouncement]);
    useEffect(function () { setOwnId((Math.random() + 1).toString(36).substring(7)); }, []);
    return _jsx(_Fragment, {});
}
