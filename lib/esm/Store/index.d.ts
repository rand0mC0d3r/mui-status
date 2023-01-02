import React from 'react';
import { SnackbarObject, StatusObject } from '../index.types';
export declare const composeDomId: (component: string, detail: string[]) => string;
interface DataContextInterface {
    settings: any;
    status: StatusObject[];
    snackbar: SnackbarObject[];
    updateConsoleActiveId: any;
    updateIsConsoleOpen: any;
    updateIsConsoleClosed: any;
    handleStatusUpdate: any;
    handleStatusAnnouncement: any;
    handleSnackbarAnnouncement: any;
    handleStatusDestroy: any;
    handleSnackbarDestroy: any;
    handleStatusTypeUpdate: any;
    handleStatusConsoleTypeUpdate: any;
    handleStatusVisibilityToggle: any;
    triggerStatusBarAnnounced: any;
    logDebug: any;
}
declare const DataContext: React.Context<DataContextInterface>;
declare function StatusProvider({ expand, hasLock, position, allowRightClick, hasBorder, width, justifyContent, debug, children, }: {
    expand?: boolean;
    hasLock?: boolean;
    position?: 'top' | 'bottom';
    allowRightClick?: boolean;
    hasBorder?: boolean;
    width?: string;
    justifyContent?: string;
    debug?: boolean;
    children?: React.ReactNode;
}): JSX.Element;
export default DataContext;
export { StatusProvider };
