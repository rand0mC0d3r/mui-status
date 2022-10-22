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
import AppsOutageIcon from '@mui/icons-material/AppsOutage';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Resizable } from 're-resizable';
import { useCallback, useContext, useEffect } from 'react';
import DataProvider from '../../MuiStore';
import Tooltip from '../../utils/Tooltip';
var StyledStatusConsole = styled('div')(function () { return ({
    flex: '1 0 auto',
    overflow: 'hidden',
}); });
var StyledResizable = styled('div')(function () { return ({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto'
}); });
var StyledWrapper = styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        border: "1px solid ".concat(theme.palette.divider),
        backgroundColor: theme.palette.background.default,
        bottom: '0px',
        left: '0px',
        alignItems: 'center',
        // overflow: 'hidden',
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
var StyledResizable = styled(Resizable)(function () { return ({}); });
var StyledActionsWrapper = styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.paper,
        padding: '0px',
        boxShadow: "inset 0px 1px 0px 0px ".concat(theme.palette.divider, ", inset 0px -1px 0px 0px ").concat(theme.palette.divider),
        alignItems: 'center',
    });
});
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
        backgroundColor: activated ? theme.palette.primary.main : 'transparent',
        color: activated ? theme.palette.background.default : theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: activated ? theme.palette.primary.dark : theme.palette.divider,
            color: activated ? theme.palette.background.default : theme.palette.text.primary,
        }
    });
});
var domId = 'mui-status-console';
var domIdWrapper = 'mui-status-console-wrapper';
var relevantType = 'console';
export default function () {
    var _a = useContext(DataProvider), status = _a.status, updateConsoleActiveId = _a.updateConsoleActiveId, updateIsConsoleOpen = _a.updateIsConsoleOpen;
    var _b = useContext(DataProvider).settings, consoleActiveId = _b.consoleActiveId, isConsoleOpen = _b.isConsoleOpen;
    var isActivated = function (uniqueId) { return uniqueId === consoleActiveId ? consoleActiveId : undefined; };
    var relevantConsoles = status.filter(function (_a) {
        var type = _a.type;
        return type === relevantType;
    });
    var handleUserKeyPress = useCallback(function (event) {
        var key = event.key, keyCode = event.keyCode, ctrlKey = event.ctrlKey;
        if ((key === 'Escape' || keyCode === 27) && ctrlKey) {
            updateIsConsoleOpen();
        }
    }, []);
    useEffect(function () {
        window.addEventListener('keydown', handleUserKeyPress);
        return function () {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);
    return _jsx(_Fragment, { children: (consoleActiveId || isConsoleOpen) && _jsx(_Fragment, { children: status.some(function (_a) {
                var type = _a.type;
                return type === relevantType;
            }) && _jsx(StyledWrapper, __assign({}, { id: domIdWrapper }, { children: _jsx(Resizable, __assign({ style: { display: 'flex', flexDirection: 'column' }, defaultSize: {
                        width: '100%',
                        height: 350
                    } }, { children: _jsxs(StyledResizable, { children: [_jsxs(StyledActionsWrapper, { children: [_jsx(StyledTabs, { children: relevantConsoles.map(function (_a) {
                                            var uniqueId = _a.uniqueId, title = _a.title;
                                            return _jsx(StyledTab, __assign({}, {
                                                key: uniqueId,
                                                variant: 'caption',
                                                onClick: function () { return updateConsoleActiveId({ id: uniqueId }); },
                                                activated: isActivated(uniqueId)
                                            }, { children: title || uniqueId }));
                                        }) }), _jsx(Tooltip, __assign({}, { tooltip: 'Close console section' }, { children: _jsx(StyledCloseIcon, __assign({}, { onClick: function () { return updateConsoleActiveId({}); } })) }))] }), relevantConsoles.some(function (_a) {
                                var uniqueId = _a.uniqueId;
                                return uniqueId === consoleActiveId;
                            })
                                ? _jsx(StyledStatusConsole, __assign({}, { id: domId }))
                                : _jsxs(StyledEmptyWrapper, { children: [_jsx(AppsOutageIcon, {}), _jsx(Typography, __assign({}, { variant: 'caption', color: 'textSecondary' }, { children: "Seems no consoles available. Select one from above" }))] })] }) })) })) }) });
}
