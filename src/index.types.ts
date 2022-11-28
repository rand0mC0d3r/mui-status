import React from 'react'

/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type StatusTypes = 'simple' | 'panel' | 'console'

export interface ThemeShape {
  spacing(spacing: number): void,
  shape: { borderRadius: number},
  palette: {
    divider: string,
    primary: { main: string, dark: string },
    secondary: { main: string, dark: string }
  }
}

export interface StatusObject {
  visible: boolean;
  type: StatusTypes,
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
  isConsoleFixed?: boolean;
  consoleActiveId?: string;
}

export enum StatusType {
  SIMPLE = 'simple',
  PANEL = 'panel',
  CONSOLE = 'console'
}

export enum PlacementPosition {
  Top = 'top',
  Bottom = 'bottom',
}

export const Direction = {
  Top: 'top',
  TopLeft: 'topLeft',
  TopRight: 'topRight',
  Right: 'right',
  Bottom: 'bottom',
  BottomLeft: 'bottomLeft',
  BottomRight: 'bottomRight',
  Left: 'left',
}
