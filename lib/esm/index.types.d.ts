import React from 'react';
export declare type StatusTypes = 'simple' | 'panel' | 'console';
export interface StatusObject {
    visible: boolean;
    type: StatusTypes;
    secondary: boolean;
    index: number;
    uniqueId: string;
    ownId: string;
    title?: string;
    children: React.ReactNode;
}
export interface SettingsObject {
    statusBarAnnounced: boolean;
    allowRightClick: boolean;
    position: any;
    expand: any;
    upperBar: boolean;
    debug: boolean;
    hasLock: boolean;
    isConsoleOpen?: boolean;
    consoleActiveId?: string;
}
export declare enum PlacementPosition {
    Top = "top",
    Bottom = "bottom"
}
