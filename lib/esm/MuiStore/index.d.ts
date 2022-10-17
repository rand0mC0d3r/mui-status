import React from 'react';
import { StatusObject } from '../index.types';
interface DataContextInterface {
    settings: any;
    status: StatusObject[];
    popoverComponent: any;
    tooltipComponent: any;
    updateConsoleActiveId: any;
    updateIsConsoleOpen: any;
    handleStatusUpdate: any;
    handleStatusAnnouncement: any;
    handleStatusDestroy: any;
    handleStatusTypeUpdate: any;
    handleStatusConsoleTypeUpdate: any;
    handleStatusVisibilityToggle: any;
    triggerStatusBarAnnounced: any;
}
declare const DataContext: React.Context<DataContextInterface>;
declare function MuiStatusProvider({ expand, hasLock, position, allowRightClick, debug, tooltipComponent, popoverComponent, children, }: {
    expand?: boolean;
    hasLock?: boolean;
    position?: 'top' | 'bottom';
    allowRightClick?: boolean;
    debug?: boolean;
    tooltipComponent?: any;
    popoverComponent?: any;
    children?: React.ReactNode;
}): JSX.Element;
export default DataContext;
export { MuiStatusProvider };
