import React from 'react'

/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StatusObject {
  visible: boolean;
  type: 'simple' | 'panel' | 'console',
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
  hasLock: boolean;
}

export enum PlacementPosition {
  Top = 'top',
  Bottom = 'bottom',
}
