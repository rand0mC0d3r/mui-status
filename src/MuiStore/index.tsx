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

const DataContext = createContext({} as DataContextInterface)

function MuiStatusProvider({
  expand = true,
  position = PlacementPosition.Top,
  allowRightClick = true,
  debug = false,
  tooltipComponent,
  popoverComponent,
  children,
} : {
  expand?: boolean,
  position?: 'top' | 'bottom',
  allowRightClick?: boolean,
  debug?: boolean,
  tooltipComponent?: any,
  popoverComponent?: any,
  children?: React.ReactNode,
  }) {
  const [status, setStatus] = useState<StatusObject[]>([])

  const [settings, setSettings] = useState({
    expand: true,
    statusBarAnnounced: false,
    allowRightClick: false,
    debug: false,
  })

  const [storedStatus, setStoredStatus] = useState<StatusObject[]>([])
  const [storedSettings, setStoredSettings] = useState<SettingsObject>()

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

  const handleStatusDestroy = ({ id }: { id: string }) => {
    setStatus((status: StatusObject[]) => [...status.filter(lo => lo.uniqueId !== id)])
  }

  const triggerStatusBarAnnounced = () => {
    if (!settings.statusBarAnnounced) {
      setSettings((settings: SettingsObject) => ({ ...settings, statusBarAnnounced: true }))
    }
  }

  useEffect(() => {
    const storedSettingsLocal = localStorage.getItem(settingsStorageKey)
    const storedStatusLocal = localStorage.getItem(statusStorageKey)

    if (storedSettingsLocal) setStoredSettings(JSON.parse(storedSettingsLocal))
    if (storedStatusLocal) setStoredStatus(JSON.parse(storedStatusLocal))
  }, [])

  useEffect(() => {
    if (storedStatus.length > 0) {
      setStatus((status: StatusObject[]) => status.map(statusItem => {
        const found = storedStatus.find(ss => ss.uniqueId === statusItem.uniqueId)
        return found ? { ...statusItem, found } : statusItem
      }))
    }
    if (storedSettings) {
      setSettings((settings: SettingsObject) => ({ ...settings, ...storedSettings }))
    }
  }, [storedStatus, storedSettings])

  useEffect(() => localStorage.setItem(settingsStorageKey, JSON.stringify(settings)), [settings])
  useEffect(() => localStorage.setItem(statusStorageKey, JSON.stringify(status.map(s => ({ ...s, children: undefined })))), [status])

  useEffect(
    () => setSettings((settings: SettingsObject) => ({
      ...settings, expand, position, allowRightClick, debug
    })),
    [allowRightClick, expand, position, debug]
  )

  useEffect(() => {
    if (settings.debug) {
      console.log('mui-status-store:', { ...settings, ...status })
    }
  }, [settings, status])

  return <DataContext.Provider
    value={{
      // passthru props
      tooltipComponent,
      popoverComponent,

      // settings state + crud
      settings,

      // status - wrapper
      triggerStatusBarAnnounced,

      // status state + crud
      status,
      handleStatusVisibilityToggle,
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
