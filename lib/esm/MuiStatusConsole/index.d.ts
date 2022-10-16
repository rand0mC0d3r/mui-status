import { CSSProperties, ReactNode } from 'react';
export default function ({ id, secondary, style, onClick, highlight, tooltip, children, console, popoverTitle, popoverActions, }: {
    id: string;
    secondary?: boolean;
    elevation?: number;
    style?: CSSProperties;
    onClick?: any;
    highlight?: 'default' | 'primary' | 'secondary';
    tooltip?: ReactNode | string;
    children?: ReactNode;
    popoverStyle?: any;
    popoverClassName?: any;
    console?: any;
    popoverTitle?: string;
    popoverActions?: any;
}): JSX.Element;
