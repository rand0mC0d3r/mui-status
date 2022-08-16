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
import { Box, SvgIcon, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
var useStyles = makeStyles(function (theme) { return ({
    box: {
        gap: '4px',
        color: theme.palette.action.active,
    },
    icon: {
        fontSize: 20
    },
    typography: {
        lineHeight: '0px',
        whiteSpace: 'nowrap',
        userSelect: 'none'
    },
    image: {
        width: '20px',
        height: '20px',
    }
}); });
var MuiStatusChild = function (_a) {
    var icon = _a.icon, text = _a.text, image = _a.image, _b = _a.mask, mask = _b === void 0 ? false : _b, className = _a.className, style = _a.style;
    var theme = useTheme();
    var classes = useStyles(theme);
    return React.createElement(Box, __assign({}, { style: style }, { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "nowrap", className: clsx([classes.box, className]) }),
        icon && React.createElement(SvgIcon, { id: "MupStatus_icon", className: classes.icon, color: 'action' }, icon),
        text && React.createElement(Typography, { id: "MupStatus_text", variant: "subtitle2", color: "textPrimary", className: classes.typography }, text),
        image && React.createElement("img", { id: "MupStatus_image", alt: "injected element", className: classes.image, style: { borderRadius: mask ? '50%' : '0px' }, src: image }));
};
export default MuiStatusChild;
