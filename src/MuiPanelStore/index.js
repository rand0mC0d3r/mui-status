/* eslint-disable no-mixed-spaces-and-tabs */
import { createContext, useEffect, useState } from 'react'
import MuiPanelManager from '../MuiPanelManager'
import { oppositeSide } from '../utils'
import MuiDebug from './MuiDebug'

const localStorageKey = 'material-ui-panel.layout'
const settingsStorageKey = 'material-ui-panel.settings'
const statusStorageKey = 'material-ui-panel.status'

const DataContext = createContext(null)

// const getRandomColor = () => '#' + Math.random().toString(16).substr(-6)

const getRandomId = () => (Math.random() + 1).toString(36).substring(7)

function MuiPanelProvider({
  expand,
  allowRightClick,
  initialSide = 'left',
  markerColor,
  inverseMarkers,
  debugMode,
  upperBar,
  tooltipComponent,
  showCollapseButton,
  showSplitterButton,
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
    isCollapsed: false,
    canSplitter: true,
    statusBarAnnounced: false,
    inverseMarkers: false,
    allowRightClick: false,
    markerColor: 'textPrimary',
    debugMode: false,
  })

  const handleStatusAnnouncement = ({ id, secondary }) => {
    setStatus(status => [
      ...status.filter(lo => lo.uniqueId !== id),
      {
        index: status.length,
        uniqueId: id,
        visible: true,
        secondary,
      }
    ])
  }

  const handleStatusUpdate = ({ id, children }) => {
    setStatus(status => status.map(lo => lo.uniqueId !== id ? lo : { ...lo, children }))
  }

  const handleStatusVisibilityToggle = ({ id }) => {
    setStatus(status => status.map(lo => (lo.uniqueId === id ? { ...lo, visible: !lo.visible } : lo)))
  }

  const handleStatusDestroy = ({ id }) => {
    setStatus(status => [...status.filter(lo => lo.uniqueId !== id)])
  }




  const updateParentSummary = (layout) => {
    return layout.map(layoutObject =>
      (layoutObject.parentId === null)
        ? {
				  ...layoutObject,
				  notifications: {
				    ...layoutObject.notifications,
				    summary: layout.reduce((acc, value) => {
				      if (value.parentId === layoutObject.uniqueId) {
				        acc = acc + value.notifications.count
				      }

				      return acc
				    }, 0) + layoutObject.notifications.count,
				  }
        }
				: layoutObject
    )
  }



  const handleSetStatusElements = ({ uniqueId, elements }) => {
    setStatus(status => status.map(statusObject => statusObject.uniqueId === uniqueId
			? { ...statusObject, elements }
			: statusObject))
  }






  const toggleSettingIsCollapsed = (collapsed) => setSettings(settings => ({ ...settings, isCollapsed: collapsed ? collapsed : !settings.isCollapsed }))

  const triggerStatusBarAnnounced = () => {
    if (!settings.statusBarAnnounced) {
      setSettings(settings => ({ ...settings, statusBarAnnounced: true }))
    }
  }

  useEffect(() => setSettings(settings =>
    ({ ...settings, inverseMarkers, allowRightClick, debugMode, upperBar })),
  [inverseMarkers, allowRightClick, debugMode, upperBar])


  useEffect(() => !!markerColor && setSettings(settings => ({ ...settings, markerColor })), [markerColor])

  useEffect(() => {
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    localStorage.setItem(statusStorageKey, JSON.stringify(status.map(s => ({ ...s, children: undefined }))))
  }, [status])

  return <DataContext.Provider
    id="provider"
    value={{
      // layout, setLayout,
      settings, setSettings,
      // sections, setSections,
      status,

      tooltipComponent,

      // showContent,
      // addZoneToSection, removeZoneFromSection,

      // splitContent,
      // splitContentNg,

      handleStatusVisibilityToggle,
      // toggleSectionDirection,
      // chooseTypeForSection,
      // setSectionUrl,
      // toggleCollapseSection,
      // addPanelToSection, removePanelFromSection,

      // handleUnSetAsEmbedded,
      toggleSettingIsCollapsed,
      // handleSetAsGroup,
      handleStatusUpdate,
      // handleSetVisible,
      // handlePanelAlerts,
      // handleSetSide,
      // handleSetDisabled,
      // handleToggleCollapse,
      triggerStatusBarAnnounced,
      // handleSetAsEmbedded,
      // handleSetIcon,
      // handlePanelAnnouncement,
      // handleContentAnnouncement,
      // handlePanelDestroy,

      handleStatusAnnouncement,
      handleStatusDestroy,
      handleSetStatusElements,
    }}>
    <MuiPanelManager {...{ allowRightClick, showCollapseButton, showSplitterButton }}>
      {props.children}
    </MuiPanelManager>
    {settings.debugMode && <MuiDebug />}
  </DataContext.Provider>
}

export default DataContext
export { MuiPanelProvider }
