import React from 'react'

/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type StatusTypes = 'simple' | 'panel' | 'console'

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
  debug: boolean;
  hasLock: boolean;
  isConsoleOpen?: boolean;
  consoleActiveId?: string;
}

export enum PlacementPosition {
  Top = 'top',
  Bottom = 'bottom',
}
