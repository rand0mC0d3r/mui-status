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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Alert, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { cloneElement, useContext, useEffect, useState } from 'react';
import DataProvider from '../../Store';
var SHeader = styled('div')(function (_a) {
    var expanded = _a.expanded;
    return ({
        display: 'flex',
        alignItems: 'center',
        paddingBottom: expanded === 'true' ? '8px' : '0px',
        marginTop: expanded === 'true' ? '-4px' : '0px',
        justifyContent: 'space-between',
        width: '100%',
    });
});
var SBottom = styled('div')(function () { return ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '8px',
}); });
var SActionButtons = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'row',
}); });
var SActions = styled('div')(function () { return ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: '1 1 auto',
    justifyContent: 'flex-end',
}); });
var STitle = styled(Typography)(function () { return ({
    userSelect: 'none',
    textTransform: 'capitalize',
    fontWeight: 'bold',
}); });
var SMessage = styled(Typography)(function (_a) {
    var ellipsis = _a.ellipsis;
    return ({
        whiteSpace: ellipsis === 'true' ? 'nowrap' : 'normal',
        overflow: ellipsis === 'true' ? 'hidden' : 'unset',
        textOverflow: ellipsis === 'true' ? 'ellipsis' : 'unset',
        lineHeight: 'initial'
    });
});
var SAlert = styled(Alert)(function (_a) {
    var expanded = _a.expanded, actions = _a.actions;
    return ({
        '.MuiAlert-message': {
            minWidth: 'unset',
            width: '100%',
            padding: expanded === 'true' ? '8px 0px' : '0px',
            display: actions === 'true' ? 'block' : 'flex',
            flexDirection: (actions === 'true' || expanded === 'true') ? 'column' : 'row',
        },
    });
});
export default function (_a) {
    var uniqueId = _a.uniqueId, actions = _a.actions, source = _a.source, severity = _a.severity, message = _a.message, code = _a.code;
    var handleSnackbarDestroy = useContext(DataProvider).handleSnackbarDestroy;
    var _b = useState(false), isExpanded = _b[0], setIsExpanded = _b[1];
    var toggleExpanded = function () {
        setIsExpanded(!isExpanded);
    };
    var closeAlert = function () {
        handleSnackbarDestroy({ uniqueId: uniqueId });
    };
    useEffect(function () {
        if (actions) {
            setIsExpanded(true);
        }
    }, [actions]);
    var getMessage = function (ellipsis) {
        if (ellipsis === void 0) { ellipsis = false; }
        return _jsx(SMessage, __assign({ ellipsis: ellipsis.toString() }, { children: message }));
    };
    return _jsxs(SAlert, __assign({ expanded: isExpanded.toString(), actions: ((actions === null || actions === void 0 ? void 0 : actions.length) > 0).toString(), icon: _jsx(Tooltip, __assign({ arrow: true, title: severity }, { children: _jsxs("span", __assign({ style: { lineHeight: '0px' } }, { children: [severity === 'info' && _jsx(PriorityHighOutlinedIcon, { fontSize: "inherit" }), severity === 'success' && _jsx(CheckIcon, { fontSize: "inherit" }), severity === 'warning' && _jsx(WarningAmberIcon, { fontSize: "inherit" }), severity === 'error' && _jsx(ErrorOutlineOutlinedIcon, { fontSize: "inherit" })] })) })) }, { severity: severity }, { children: [_jsxs(SHeader, __assign({ expanded: isExpanded.toString() }, { children: [(isExpanded)
                        ? _jsx(STitle, __assign({ variant: "subtitle1", color: "inherit" }, { children: severity }))
                        : _jsx(_Fragment, { children: !actions
                                ? _jsx(_Fragment, { children: getMessage(true) })
                                : _jsx(STitle, __assign({ variant: "subtitle1", color: "inherit" }, { children: severity })) }), _jsxs(SActionButtons, { children: [!actions && _jsx(Tooltip, __assign({ arrow: true, title: "Expand/Collapse alert" }, { children: _jsx(IconButton, __assign({ color: "inherit", size: "small", onClick: toggleExpanded }, { children: !isExpanded
                                        ? _jsx(ExpandMoreIcon, { fontSize: "small" })
                                        : _jsx(ExpandLessIcon, { fontSize: "small" }) })) })), _jsx(Tooltip, __assign({ arrow: true, title: "Close alert" }, { children: _jsx(IconButton, __assign({ color: "inherit", onClick: closeAlert, size: "small" }, { children: _jsx(CloseIcon, { fontSize: "small" }) })) }))] })] })), (isExpanded || actions) && getMessage(), code && _jsx("code", { children: code }), (isExpanded || actions) && _jsx(_Fragment, { children: (source || actions) && _jsxs(SBottom, { children: [source && _jsxs(Typography, __assign({ variant: "caption", color: "textSecondary" }, { children: ["Source:", source] })), _jsx(SActions, { children: actions && actions.map(function (action) { return _jsx(_Fragment, { children: cloneElement(action, { variant: 'contained', disableElevation: true }) }); }) })] }) })] }), uniqueId);
}
