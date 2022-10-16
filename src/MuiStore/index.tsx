/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { createContext, useEffect, useState } from 'react'
import { PlacementPosition, SettingsObject, StatusObject } from '../index.types'
import MuiWrapper from '../MuiWrapper'

const settingsStorageKey = 'mui-status.settings'
const statusStorageKey = 'mui-status.status'

const initialSettings = {
  position: PlacementPosition.Top,
  expand: true,
  statusBarAnnounced: false,
  allowRightClick: true,
  debug: false,
  hasLock: true,
} as SettingsObject

const valOrDefault = (val: any, def: any) => {
  if (val === undefined) {
    return def
  }
  return val
}

interface DataContextInterface {
  settings: any;
  status: StatusObject[];
  popoverComponent: any;
  tooltipComponent: any;
  updateConsoleActiveId: any;
  handleStatusUpdate: any;
  handleStatusAnnouncement: any;
  handleStatusDestroy: any;
  handleStatusTypeUpdate: any;
  handleStatusVisibilityToggle: any;
  triggerStatusBarAnnounced: any;
}

const DataContext = createContext({} as DataContextInterface)

function MuiStatusProvider({
  expand,
  hasLock,
  position = PlacementPosition.Top,
  allowRightClick,
  debug,
  tooltipComponent,
  popoverComponent,
  children,
} : {
  expand?: boolean,
  hasLock?: boolean,
  position?: 'top' | 'bottom',
  allowRightClick?: boolean,
  debug?: boolean,
  tooltipComponent?: any,
  popoverComponent?: any,
  children?: React.ReactNode,
  }) {
  const [status, setStatus] = useState<StatusObject[]>([])
  const [settings, setSettings] = useState<SettingsObject>(initialSettings)

  // const [storedStatus, setStoredStatus] = useState<StatusObject[]>([])
  // const [storedSettings, setStoredSettings] = useState<SettingsObject>()

  const handleStatusAnnouncement = ({ id, ownId, secondary, children } : { id: string, ownId: string, secondary: boolean, children: any }) => {
    setStatus((status: StatusObject[]) => {
      const findError = status.find(sItem => sItem.uniqueId === id && sItem.ownId !== ownId)
      if (findError) {
        console.error(`mui-status: ❌ Status entry already registered with id: [${id}] & ownId: [${ownId}], but expected ownId [${findError.ownId}]`)
        return status
      }
      if (settings.debug) {
        console.info(`mui-status: 🆗 Status entry registered with id: [${id}] & ownId: [${ownId}]`)
      }
      return [
        ...status.filter(sItem => sItem.uniqueId !== id),
        {
          index: status.length,
          uniqueId: id,
          ownId,
          visible: true,
          secondary,
          children
        } as StatusObject
      ]
    })
  }

  const handleStatusUpdate = ({ id, ownId, children }: { id: string, ownId: string, children: React.ReactNode }) => {
    setStatus((status: StatusObject[]) => {
      const findError = status.find(sItem => sItem.uniqueId === id)
      if (findError?.ownId !== ownId) {
        console.error(`mui-status: ❌ Faulty status update captured for: [${id}] & ownId: [${ownId}], but expected ownId: [${findError?.ownId}]`)
        return status
      }
      return status.map(sItem => (sItem.uniqueId === id && sItem.ownId === ownId) ? { ...sItem, children } : sItem)
    })
  }

  const handleStatusVisibilityToggle = ({ id }: { id: string }) => {
    setStatus((status: StatusObject[]) => status.map(lo => (lo.uniqueId === id ? { ...lo, visible: !lo.visible } : lo)))
  }

  const handleStatusTypeUpdate = ({ id, type }: { id: string, type: any }) => {
    console.info(`mui-status: 🆗 Updated type for id: [${id}] to: [${type}]`)
    setStatus((status: StatusObject[]) => status.map((lo: StatusObject) => (lo.uniqueId === id
      ? { ...lo, type } as StatusObject
      : lo)))
  }

  const handleStatusDestroy = ({ id }: { id: string }) => {
    setStatus((status: StatusObject[]) => [...status.filter(lo => lo.uniqueId !== id)])
  }

  const triggerStatusBarAnnounced = () => {
    if (!settings.statusBarAnnounced) {
      setSettings((settings: SettingsObject) => ({ ...settings, statusBarAnnounced: true }))
    }
  }
  const updateConsoleActiveId = ({ id } : { id?: string }) => {
    setSettings((settings: SettingsObject) => ({ ...settings, consoleActiveId: id || undefined }))
  }

  useEffect(() => {
    // const storedSettingsLocal = localStorage.getItem(settingsStorageKey)
    // const storedStatusLocal = localStorage.getItem(statusStorageKey)

    // if (storedSettingsLocal) setStoredSettings(JSON.parse(storedSettingsLocal))
    // if (storedStatusLocal) setStoredStatus(JSON.parse(storedStatusLocal))
  }, [])

  // useEffect(() => {
  //   if (storedStatus.length > 0) {
  //     setStatus((status: StatusObject[]) => status.map(statusItem => {
  //       const found = storedStatus.find(ss => ss.uniqueId === statusItem.uniqueId)
  //       return found ? { ...statusItem, found } : statusItem
  //     }))
  //   }
  //   if (storedSettings) {
  //     setSettings((settings: SettingsObject) => ({ ...settings, ...storedSettings }))
  //   }
  // }, [storedStatus, storedSettings])

  useEffect(() => localStorage.setItem(settingsStorageKey, JSON.stringify(settings)), [settings])
  useEffect(() => localStorage.setItem(statusStorageKey, JSON.stringify(status.map(s => ({ ...s, children: undefined })))), [status])

  useEffect(() => {
    setSettings((settings: SettingsObject) => ({
      ...settings,
      expand: expand || initialSettings.expand,
      position,
      allowRightClick: allowRightClick || initialSettings.allowRightClick,
      debug: debug || initialSettings.debug,
      hasLock: valOrDefault(hasLock, initialSettings.hasLock),
    }))
  }, [allowRightClick, expand, position, debug, hasLock])

  useEffect(() => {
    if (settings.debug) {
      console.log('mui-status-store:', { ...settings, status })
    }
  }, [settings, status])

  return <DataContext.Provider
    value={{
      // passthru props
      tooltipComponent,
      popoverComponent,

      // settings state + crud
      settings,
      updateConsoleActiveId,

      // status - wrapper
      triggerStatusBarAnnounced,

      // status state + crud
      status,
      handleStatusVisibilityToggle,
      handleStatusTypeUpdate,
      handleStatusUpdate,
      handleStatusAnnouncement,
      handleStatusDestroy,
    }}
  >
    <MuiWrapper {...{ children }} />
  </DataContext.Provider>
}

export default DataContext
export { MuiStatusProvider }
