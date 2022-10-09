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
