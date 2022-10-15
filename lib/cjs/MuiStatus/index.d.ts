import React from 'react';
export default function ({ id, secondary, style, onClick, onContextMenu, disabled, highlight, tooltip, children, }: {
    id: string;
    secondary?: boolean;
    style?: React.CSSProperties;
    onClick?: any;
    onContextMenu?: any;
    disabled?: boolean;
    highlight?: 'default' | 'primary' | 'secondary';
    tooltip?: React.ReactNode | string;
    children?: React.ReactNode;
}): JSX.Element;
