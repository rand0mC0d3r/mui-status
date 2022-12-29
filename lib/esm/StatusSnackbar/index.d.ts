/// <reference types="react" />
export default function ({ severity, message, autoHideDuration, isExpanded, actions, source, code, }: {
    severity: 'success' | 'info' | 'warning' | 'error';
    message: string;
    autoHideDuration?: number;
    isExpanded?: boolean;
    actions?: any;
    source?: string;
    code?: string;
}): JSX.Element;
