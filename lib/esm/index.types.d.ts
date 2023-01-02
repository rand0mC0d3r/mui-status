import React from 'react';
export type StatusTypes = 'simple' | 'panel' | 'console';
export interface ThemeShape {
    spacing(spacing: number): void;
    shape: {
        borderRadius: number;
    };
    palette: {
        divider: string;
        primary: {
            main: string;
            dark: string;
        };
        secondary: {
            main: string;
            dark: string;
        };
    };
}
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
export interface SnackbarObject {
    uniqueId: string;
    open: boolean;
    source: string;
    actions: any;
    message: string;
    code: string;
    autoHideDuration: number;
    severity: 'success' | 'info' | 'warning' | 'error';
}
export interface SettingsObject {
    statusBarAnnounced: boolean;
    allowRightClick: boolean;
    justifyContent: string;
    position: any;
    expand: any;
    upperBar: boolean;
    debug: boolean;
    hasLock: boolean;
    isConsoleOpen?: boolean;
    isConsoleFixed?: boolean;
    consoleActiveId?: string;
    width: string;
    hasBorder: boolean;
}
export declare enum StatusType {
    SIMPLE = "simple",
    PANEL = "panel",
    CONSOLE = "console"
}
export declare enum PlacementPosition {
    Top = "top",
    Bottom = "bottom"
}
export declare const Direction: {
    Top: string;
    TopLeft: string;
    TopRight: string;
    Right: string;
    Bottom: string;
    BottomLeft: string;
    BottomRight: string;
    Left: string;
};
