import React from 'react';
export interface StatusObject {
    visible: boolean;
    secondary: boolean;
    index: number;
    uniqueId: string;
    ownId: string;
    children: React.ReactNode;
}
export interface SettingsObject {
    statusBarAnnounced: boolean;
    allowRightClick: boolean;
    position: any;
    expand: any;
    debug: boolean;
}
export declare enum PlacementPosition {
    Top = "top",
    Bottom = "bottom"
}
