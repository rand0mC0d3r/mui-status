import React from 'react';
export default function ({ id, secondary, elevation, style, onClick, onClose, highlight, tooltip, children, popoverStyle, popoverClassName, popover }: {
    id: string;
    secondary?: boolean;
    elevation?: number;
    style?: React.CSSProperties;
    onClick?: any;
    onClose?: any;
    highlight?: 'default' | 'primary' | 'secondary';
    tooltip?: any;
    children?: any;
    popoverStyle?: any;
    popoverClassName?: any;
    popover?: any;
}): JSX.Element;
