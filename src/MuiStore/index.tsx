/* eslint-disable no-console */
import React, { createContext, useEffect, useState } from 'react';
import { StatusObject } from '../index.types';
import MuiWrapper from '../MuiWrapper';

const settingsStorageKey = 'mui-status.settings'
const statusStorageKey = 'mui-status.status'

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

const DataContext = createContext({} as DataContextInterface);

function MuiStatusProvider({
  expand = true,
  position = 'top',
  allowRightClick = true,
  debug,
  tooltipComponent,
  popoverComponent,
  children,
  ...props }) {

  const [status, setStatus] = useState(props['status'] || []) as [StatusObject[], any];
  const [storedStatus, setStoredStatus] = useState<StatusObject[]>([])

  useEffect(() => {
    const storedStatusLocal = localStorage.getItem(statusStorageKey)
    if (storedStatusLocal) {
      setStoredStatus(JSON.parse(storedStatusLocal))
    }
  }, [])

  useEffect(() => {
    if (storedStatus.length > 0) {
      setStatus((status: StatusObject[]) => status.map(statusItem => {
        const found = storedStatus.find(ss => ss.uniqueId === statusItem.uniqueId)
        return found ? { ...statusItem, found } : statusItem
      }))
    }
  }, [storedStatus])

  const [settings, setSettings] = useState(props['settings'] || {
    expand: true,
    statusBarAnnounced: false,
    allowRightClick: false,
    debug: false,
  })

  const handleStatusAnnouncement = ({ id, secondary, children } : { id: string, secondary: boolean, children: any }) => {
    setStatus((status: StatusObject[]) => [...status.filter(lo => lo.uniqueId !== id),
      {
        index: status.length,
        uniqueId: id,
        visible: true,
        secondary,
        children
      }
    ])
  }

  const handleStatusUpdate = ({ id, children }: { id: string, children: any }) => {
    console.log('handleStatusUpdate', id, children)
    setStatus((status: StatusObject[]) => status.map(lo => lo.uniqueId !== id ? lo : { ...lo, children }))
  }

  const handleStatusVisibilityToggle = ({ id }) => {
    setStatus((status: StatusObject[]) => status.map(lo => (lo.uniqueId === id ? { ...lo, visible: !lo.visible } : lo)))
  }

  const handleStatusDestroy = ({ id }) => {
    setStatus((status: StatusObject[]) => [...status.filter(lo => lo.uniqueId !== id)])
  }


  const triggerStatusBarAnnounced = () => {
    if (!settings.statusBarAnnounced) {
      setSettings(settings => ({ ...settings, statusBarAnnounced: true }))
    }
  }

  useEffect(() => setSettings(settings =>
    ({ ...settings, expand, position, allowRightClick, debug })),
  [allowRightClick, expand, position, debug])

  useEffect(() => {
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    localStorage.setItem(statusStorageKey, JSON.stringify(status.map(s => ({ ...s, children: undefined }))))
  }, [status])

  useEffect(() => {
    if (settings.debug) {
      console.log('MuiStatusProvider:', { ...settings, ...status })
    }
  }, [settings, status])

  return <DataContext.Provider
    id="provider"
    value={{
      // passthru props
      tooltipComponent,
      popoverComponent,

      // settings state + crud
      settings, setSettings,

      // status - wrapper
      triggerStatusBarAnnounced,

      // status state + crud
      status,
      handleStatusVisibilityToggle,
      handleStatusUpdate,
      handleStatusAnnouncement,
      handleStatusDestroy,
    }}>
    <MuiWrapper {...{ children }} />
  </DataContext.Provider>
}

export default DataContext
export { MuiStatusProvider };
