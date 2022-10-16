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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import DataProvider from '../../MuiStore';
import Tooltip from '../../utils/Tooltip';
var StyledStatusConsole = styled('div')(function () { return ({
    flex: '1 1 auto',
    overflow: 'hidden'
}); });
var StyledWrapper = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    overflow: 'hidden',
    right: '0px',
    height: '350px',
}); });
var StyledActionsWrapper = styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.paper,
        padding: '0px',
        border: "1px solid ".concat(theme.palette.divider),
        borderStyle: 'solid none',
        alignItems: 'center',
    });
});
var StyledTabs = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'row',
    gap: '0px',
}); });
var StyledTab = styled(Typography)(function (_a) {
    var theme = _a.theme, active = _a.active;
    return ({
        padding: '4px 8px',
        cursor: 'pointer',
        backgroundColor: active ? theme.palette.primary.light : theme.palette.background.default,
        color: active ? theme.palette.background.default : theme.palette.text.secondary,
        fontWeight: active ? 'bold' : 'normal',
    });
});
var domId = 'mui-status-console';
var domIdWrapper = 'mui-status-console-wrapper';
export default function () {
    var _a = useContext(DataProvider), status = _a.status, settings = _a.settings, updateConsoleActiveId = _a.updateConsoleActiveId;
    var consoleActiveId = settings.consoleActiveId;
    return _jsx(_Fragment, { children: consoleActiveId && _jsx(_Fragment, { children: status.some(function (sItem) { return sItem.type === 'console'; }) && _jsxs(StyledWrapper, __assign({ id: domIdWrapper }, { children: [_jsxs(StyledActionsWrapper, { children: [_jsx(StyledTabs, { children: status.filter(function (sItem) { return sItem.type === 'console'; }).map(function (s) { return _jsx(StyledTab, __assign({ onClick: function () { return updateConsoleActiveId({ id: s.uniqueId }); }, active: s.uniqueId === consoleActiveId, variant: "caption" }, { children: s.uniqueId }), s.uniqueId); }) }), _jsx(Tooltip, __assign({ tooltip: "Close console section" }, { children: _jsx(CloseIcon, { onClick: function () { return updateConsoleActiveId({}); } }) }))] }), _jsx(StyledStatusConsole, { id: domId })] })) }) });
}
