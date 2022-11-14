import { CSSProperties, ReactNode } from 'react';
export default function ({ id, secondary, style, onClick, onContextMenu, disabled, highlight, tooltip, children, }: {
    id: string;
    secondary?: boolean;
    style?: CSSProperties;
    onClick?: any;
    onContextMenu?: any;
    disabled?: boolean;
    highlight?: 'default' | 'primary' | 'secondary';
    tooltip?: ReactNode | string;
    children?: ReactNode;
}): JSX.Element;
