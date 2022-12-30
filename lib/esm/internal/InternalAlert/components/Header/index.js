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
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import DataProvider from '../../../../Store';
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
var SActionButtons = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'row',
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
        lineHeight: ellipsis === 'true' ? 'initial' : '1.65',
    });
});
export default function (_a) {
    var uniqueId = _a.uniqueId, actions = _a.actions, severity = _a.severity, message = _a.message, _b = _a.isRemoveFlag, isRemoveFlag = _b === void 0 ? false : _b;
    var handleSnackbarDestroy = useContext(DataProvider).handleSnackbarDestroy;
    var _c = useState(false), isExpanded = _c[0], setIsExpanded = _c[1];
    var toggleExpanded = function () {
        if ((actions === null || actions === void 0 ? void 0 : actions.length) > 0)
            return;
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
    return _jsxs(SHeader, __assign({ expanded: isExpanded.toString() }, { children: [(isExpanded)
                ? _jsx(STitle, __assign({ onDoubleClick: toggleExpanded, variant: "subtitle1", color: "inherit" }, { children: severity }))
                : _jsx(_Fragment, { children: !actions
                        ? _jsx(_Fragment, { children: getMessage(true) })
                        : _jsx(STitle, __assign({ onDoubleClick: toggleExpanded, variant: "subtitle1", color: "inherit" }, { children: severity })) }), _jsxs(SActionButtons, { children: [!actions && _jsx(Tooltip, __assign({ arrow: true, title: "Expand/Collapse alert" }, { children: _jsx(IconButton, __assign({ color: "inherit", size: "small", onClick: toggleExpanded }, { children: !isExpanded
                                ? _jsx(ExpandMoreIcon, { fontSize: "small" })
                                : _jsx(ExpandLessIcon, { fontSize: "small" }) })) })), _jsx(Tooltip, __assign({ arrow: true, title: isRemoveFlag ? 'Close alert' : 'Dismiss alert' }, { children: _jsx(IconButton, __assign({ color: "inherit", onClick: closeAlert, size: "small" }, { children: isRemoveFlag ? _jsx(CloseIcon, { fontSize: "small" }) : _jsx(ArrowForwardIcon, { fontSize: "small" }) })) }))] })] }));
}
