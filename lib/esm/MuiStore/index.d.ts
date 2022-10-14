import React from 'react';
import { StatusObject } from '../index.types';
interface DataContextInterface {
    settings: any;
    status: StatusObject[];
    popoverComponent: any;
    tooltipComponent: any;
    handleStatusUpdate: any;
    handleStatusAnnouncement: any;
    handleStatusDestroy: any;
    handleStatusVisibilityToggle: any;
    triggerStatusBarAnnounced: any;
}
declare const DataContext: React.Context<DataContextInterface>;
declare function MuiStatusProvider({ expand, position, allowRightClick, debug, tooltipComponent, popoverComponent, children, }: {
    expand?: boolean;
    position?: 'top' | 'bottom';
    allowRightClick?: boolean;
    debug?: boolean;
    tooltipComponent?: any;
    popoverComponent?: any;
    children?: React.ReactNode;
}): JSX.Element;
export default DataContext;
export { MuiStatusProvider };