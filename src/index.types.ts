/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StatusObject {
  visible: boolean;
  secondary: boolean;
  index: number;
  uniqueId: string;
  children: any;
}

export interface SettingsObject {
  statusBarAnnounced: boolean;
  allowRightClick: boolean;
  position: any;
  expand: any;
  debug: boolean;
}

export enum PlacementPosition {
  Top = 'top',
  Bottom = 'bottom',
}
