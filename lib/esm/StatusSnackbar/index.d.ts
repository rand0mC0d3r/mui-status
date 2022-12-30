/// <reference types="react" />
export default function ({ severity, message, autoHideDuration, actions, source, code, }: {
    severity: 'success' | 'info' | 'warning' | 'error';
    message: string;
    autoHideDuration?: number;
    actions?: any;
    source?: string;
    code?: string;
}): JSX.Element;
