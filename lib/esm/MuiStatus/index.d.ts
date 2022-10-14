import React from 'react';
export default function ({ id, secondary, style, onClick, onContextMenu, highlight, tooltip, children, }: {
    id: string;
    secondary?: boolean;
    style?: React.CSSProperties;
    onClick?: any;
    onContextMenu?: any;
    highlight?: 'default' | 'primary' | 'secondary';
    tooltip?: React.ReactNode | string;
    children?: React.ReactNode;
}): JSX.Element;
