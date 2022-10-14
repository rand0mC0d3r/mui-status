import React from 'react';
export default function ({ id, secondary, elevation, style, highlight, tooltip, children, popoverStyle, popoverClassName, popover }: {
    id: string;
    secondary?: boolean;
    elevation?: number;
    style?: React.CSSProperties;
    highlight?: 'default' | 'primary' | 'secondary';
    tooltip?: any;
    children?: any;
    popoverStyle?: any;
    popoverClassName?: any;
    popover?: any;
}): JSX.Element;
