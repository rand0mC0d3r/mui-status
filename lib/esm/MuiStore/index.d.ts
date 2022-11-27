import React from 'react';
import { StatusObject } from '../index.types';
export declare const composeDomId: (component: string, detail: string[]) => string;
interface DataContextInterface {
    settings: any;
    status: StatusObject[];
    updateConsoleActiveId: any;
    updateIsConsoleOpen: any;
    updateIsConsoleClosed: any;
    handleStatusUpdate: any;
    handleStatusAnnouncement: any;
    handleStatusDestroy: any;
    handleStatusTypeUpdate: any;
    handleStatusConsoleTypeUpdate: any;
    handleStatusVisibilityToggle: any;
    triggerStatusBarAnnounced: any;
    logDebug: any;
}
declare const DataContext: React.Context<DataContextInterface>;
declare function MuiStatusProvider({ expand, hasLock, position, allowRightClick, debug, children, }: {
    expand?: boolean;
    hasLock?: boolean;
    position?: 'top' | 'bottom';
    allowRightClick?: boolean;
    debug?: boolean;
    children?: React.ReactNode;
}): JSX.Element;
export default DataContext;
export { MuiStatusProvider };
