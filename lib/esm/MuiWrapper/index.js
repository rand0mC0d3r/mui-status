import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import InternalStatus from '../MuiStatusBar/InternalStatus';
import DataProvider from '../MuiStore';
var useStyles = makeStyles(function () { return ({
    box: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    children: {
        flex: '1 1 auto',
    }
}); });
var MuiWrapper = function (_a) {
    var children = _a.children;
    var settings = useContext(DataProvider).settings;
    var classes = useStyles();
    return React.createElement(Box, { id: "MuiPanelManager", display: "flex", flexDirection: settings.position === 'top' ? 'column-reverse' : 'column', className: classes.box },
        React.createElement("div", { className: classes.children }, children),
        React.createElement("div", { id: "muiStatus-statusBar" }, !settings.statusBarAnnounced && React.createElement(InternalStatus, null)));
};
export default MuiWrapper;
