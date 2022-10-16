import { CSSProperties, ReactNode } from 'react';
export default function ({ id, secondary, style, onClick, tooltip, children, console, }: {
    id: string;
    secondary?: boolean;
    elevation?: number;
    style?: CSSProperties;
    onClick?: any;
    tooltip?: ReactNode | string;
    children?: ReactNode;
    popoverStyle?: any;
    popoverClassName?: any;
    console?: any;
    popoverTitle?: string;
    popoverActions?: any;
}): JSX.Element;
