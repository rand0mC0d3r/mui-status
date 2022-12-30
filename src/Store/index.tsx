/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { createContext, useEffect, useState } from 'react'
import { PlacementPosition, SettingsObject, SnackbarObject, StatusObject } from '../index.types'
import Wrapper from '../internal/Wrapper'

const domIdBase = 'mui-status'

export const composeDomId = (component: string, detail: string[]) => {
  const id = detail.join('-')
  return `${domIdBase}-${component}-${id}`
}

const settingsStorageKey = 'mui-status.settings'
const statusStorageKey = 'mui-status.status'

const initialSettings = {
  position: PlacementPosition.Top,
  expand: true,
  statusBarAnnounced: false,
  allowRightClick: true,
  debug: false,
  hasLock: true,
  isConsoleFixed: false,
  isConsoleOpen: false,
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
  snackbar: SnackbarObject[];
  updateConsoleActiveId: any;
  updateIsConsoleOpen: any;
  updateIsConsoleClosed: any;
  handleStatusUpdate: any;
  handleStatusAnnouncement: any;
  handleSnackbarAnnouncement: any;
  handleStatusDestroy: any;
  handleSnackbarDestroy: any;
  handleStatusTypeUpdate: any;
  handleStatusConsoleTypeUpdate: any;
  handleStatusVisibilityToggle: any;
  triggerStatusBarAnnounced: any;
  logDebug: any,
}

const DataContext = createContext({} as DataContextInterface)

function StatusProvider({
  expand,
  hasLock,
  position = PlacementPosition.Top,
  allowRightClick,
  debug,
  children,
} : {
  expand?: boolean,
  hasLock?: boolean,
  position?: 'top' | 'bottom',
  allowRightClick?: boolean,
  debug?: boolean,
  children?: React.ReactNode,
  }) {
  const [status, setStatus] = useState<StatusObject[]>([])
  const [snackbar, setSnackbar] = useState<SnackbarObject[]>([])
  const [settings, setSettings] = useState<SettingsObject>(initialSettings)

  const logDebug = (message: string) => {
    if (settings.debug) {
      console.log(message)
    }
  }

  const handleStatusAnnouncement = ({ id, ownId, secondary, children } : { id: string, ownId: string, secondary: boolean, children: any }) => {
    console.log('registed status', id)
    setStatus((status: StatusObject[]) => {
      const findError = status.find(sItem => sItem.uniqueId === id && sItem.ownId !== ownId)
      if (findError) {
        logDebug(`mui-status: ❌ Status entry already registered with id: [${id}] & ownId: [${ownId}], but was proposed ownId [${findError.ownId}]`)
        return status
      }
      logDebug(`mui-status: 🆗 Status entry registered with id: [${id}] & ownId: [${ownId}]`)

      return [
        ...status.filter(({ uniqueId }) => uniqueId !== id),
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
  const handleSnackbarAnnouncement = (
    { ownId, severity, actions, source, message, code, autoHideDuration } :
    { ownId: string, actions: any, source: string, severity: string, message: any, code: string, autoHideDuration: number }
  ) => {
    console.log('registed snackbar', ownId)
    setSnackbar((snackbar: SnackbarObject[]) => [
      ...snackbar.filter(({ uniqueId }) => uniqueId !== ownId),
        {
          uniqueId: ownId,
          open: true,
          severity,
          actions,
          source,
          message,
          code,
          autoHideDuration,
        } as SnackbarObject
    ])
  }

  const handleStatusUpdate = ({ id, ownId, children }: { id: string, ownId: string, children: React.ReactNode }) => {
    setStatus((status: StatusObject[]) => {
      const findError = status.find(({ uniqueId }) => uniqueId === id)
      if (findError?.ownId !== ownId) {
        if (settings.debug) {
          console.error(`mui-status: ❌ Faulty status update captured for: [${id}] & ownId: [${ownId}], but expected ownId: [${findError?.ownId}]`)
        }
        return status
      }
      return status.map(sItem => (sItem.uniqueId === id && sItem.ownId === ownId) ? { ...sItem, children } : sItem)
    })
  }

  const handleStatusVisibilityToggle = ({ id }: { id: string }) => {
    setStatus((status: StatusObject[]) => status.map(lo => (lo.uniqueId === id ? { ...lo, visible: !lo.visible } : lo)))
  }

  const handleStatusTypeUpdate = ({ id, type }: { id: string, type: any }) => {
    if (settings.debug) {
      console.info(`mui-status: 🆗 Updated type for id: [${id}] to: [${type}]`)
    }
    setStatus((status: StatusObject[]) => status.map((lo: StatusObject) => (lo.uniqueId === id
      ? { ...lo, type } as StatusObject
      : lo)))
  }

  const handleStatusConsoleTypeUpdate = ({ id, title }: { id: string, title: string }) => {
    if (settings.debug) {
      console.info(`mui-status: 🆗 Updated console title for id: [${id}] to: [${title}]`)
    }
    setStatus((status: StatusObject[]) => status.map((lo: StatusObject) => (lo.uniqueId === id
      ? { ...lo, title } as StatusObject
      : lo)))
  }

  const handleStatusDestroy = ({ id }: { id: string }) => {
    setStatus((status: StatusObject[]) => [...status.filter(lo => lo.uniqueId !== id)])
  }

  const handleSnackbarDestroy = ({ uniqueId }: { uniqueId: string }) => {
    setSnackbar((snackbar: SnackbarObject[]) => [...snackbar.filter(lo => lo.uniqueId !== uniqueId)])
  }

  const triggerStatusBarAnnounced = () => {
    if (!settings.statusBarAnnounced) {
      setSettings((settings: SettingsObject) => ({ ...settings, statusBarAnnounced: true }))
    }
  }

  const updateConsoleActiveId = ({ id } : { id?: string }) => {
    setSettings((settings: SettingsObject) => ({
      ...settings,
      consoleActiveId: id || undefined,
      isConsoleOpen: !!id
    }))
  }

  const updateIsConsoleOpen = () => {
    setSettings((settings: SettingsObject) => ({
      ...settings,
      isConsoleOpen: !settings.isConsoleOpen,
      // consoleActiveId: settings.isConsoleOpen ? undefined : settings.consoleActiveId
    }))
  }
  const updateIsConsoleClosed = () => {
    setSettings((settings: SettingsObject) => ({
      ...settings,
      isConsoleOpen: false,
    }))
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
      console.log('mui-status-store:', { ...settings, status, snackbar })
    }
  }, [settings, status, snackbar])

  return <DataContext.Provider
    value={{
      // settings state + crud
      settings,
      updateConsoleActiveId,
      updateIsConsoleOpen,
      updateIsConsoleClosed,

      // status - wrapper
      triggerStatusBarAnnounced,

      // snackbar + crud,
      snackbar,
      handleSnackbarDestroy,

      // status state + crud
      status,
      handleStatusVisibilityToggle,
      handleStatusTypeUpdate,
      handleStatusConsoleTypeUpdate,
      handleStatusUpdate,
      handleStatusAnnouncement,
      handleSnackbarAnnouncement,
      handleStatusDestroy,

      logDebug,
    }}
  >
    <Wrapper {...{ children }} />
  </DataContext.Provider>
}

export default DataContext
export { StatusProvider }
