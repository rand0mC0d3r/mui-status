import { CSSProperties, ReactNode } from 'react';
export default function ({ id, secondary, elevation, style, onClick, onClose, highlight, tooltip, children, popover, popoverTitle, popoverActions, }: {
    id: string;
    secondary?: boolean;
    elevation?: number;
    style?: CSSProperties;
    onClick?: any;
    onClose?: any;
    highlight?: 'default' | 'primary' | 'secondary';
    tooltip?: ReactNode | string;
    children?: ReactNode;
    popover?: any;
    popoverTitle?: string;
    popoverActions?: any;
}): JSX.Element;
