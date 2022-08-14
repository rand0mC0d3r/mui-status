/* eslint-disable no-console */
import { createContext, useEffect, useState } from 'react'
import MuiWrapper from '../MuiWrapper'

const settingsStorageKey = 'mui-status.settings'
const statusStorageKey = 'mui-status.status'

const DataContext = createContext(null)

function MuiStatusProvider({
  expand = true,
  position = 'top',
  allowRightClick = true,
  debug,
  tooltipComponent,
  popoverComponent,
  children,
  ...props }) {

  const [status, setStatus] = useState(props['status'] || [])
  const [storedStatus, setStoredStatus] = useState([])

  useEffect(() => {
    const storedStatusLocal = localStorage.getItem(statusStorageKey)
    if (storedStatusLocal) {
      setStoredStatus(JSON.parse(storedStatusLocal))
    }
  }, [])

  useEffect(() => {
    if (storedStatus.length > 0) {
      setStatus(status => status.map(statusItem => {
        const found = storedStatus.find(ss => ss.uniqueId === statusItem.uniqueId)

        return found ? { ...statusItem, ...found } : statusItem
      }))
    }
  }, [storedStatus])

  const [settings, setSettings] = useState(props['settings'] || {
    expand: true,
    statusBarAnnounced: false,
    allowRightClick: false,
    debug: false,
  })

  const handleStatusAnnouncement = ({ id, secondary, children }) => {
    setStatus(status => [...status.filter(lo => lo.uniqueId !== id),
      {
        index: status.length,
        uniqueId: id,
        visible: true,
        secondary,
        children
      }
    ])
  }

  const handleStatusUpdate = ({ id, children }) => {
    console.log('handleStatusUpdate', id, children)
    setStatus(status => status.map(lo => lo.uniqueId !== id ? lo : { ...lo, children }))
  }

  const handleStatusVisibilityToggle = ({ id }) => {
    setStatus(status => status.map(lo => (lo.uniqueId === id ? { ...lo, visible: !lo.visible } : lo)))
  }

  const handleStatusDestroy = ({ id }) => {
    setStatus(status => [...status.filter(lo => lo.uniqueId !== id)])
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
export { MuiStatusProvider }
