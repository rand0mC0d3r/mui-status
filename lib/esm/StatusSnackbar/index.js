import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// import { Alert, Snackbar } from '@mui/material'
// import { Alert } from '@mui/material'
import { useCallback, useContext, useEffect, useState } from 'react';
import DataProvider from '../Store';
export default function (_a) {
    var severity = _a.severity, 
    // vertical = 'bottom',
    // horizontal = 'right',
    message = _a.message, _b = _a.autoHideDuration, autoHideDuration = _b === void 0 ? 6000 : _b, _c = _a.isExpanded, isExpanded = _c === void 0 ? false : _c, actions = _a.actions, source = _a.source, 
    // onClose,
    code = _a.code;
    var _d = useContext(DataProvider), snackbar = _d.snackbar, handleSnackbarAnnouncement = _d.handleSnackbarAnnouncement;
    // const [open, setOpen] = useState<boolean>(true)
    var _e = useState(), ownId = _e[0], setOwnId = _e[1];
    var _f = useState(null), snackbarObject = _f[0], setSnackbarObject = _f[1];
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
