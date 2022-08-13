/* eslint-disable no-unused-vars */
import { Tooltip } from '@material-ui/core'
import { useState } from 'react'
import { MuiPanelProvider } from '../components/MuiPanelStore'
import MuiStatusBar from '../components/MuiStatusBar'
import MupContent from '../components/MupContent'
import AliveStatus from './AliveStatus'
import AvatarsStatuses from './AvatarsStatuses'
import AvatarStatus from './AvatarStatus'
import CastStatus from './CastStatus'
import ConfigStatus from './ConfigStatus'
import DynamicInjectStatus from './DynamicInjectStatus'
import GalleryStatus from './GalleryStatus'
import MenuStatus from './MenuStatus'
import SaveStatus from './SaveStatus'
import ToggleTheme from './ToggleTheme'

function ImplementationFrame({
  darkMode, toggleDarkMode,
  help, toggleHelp,
  debugMode, toggleDebugMode,
  upperBar, toggleUpperBar,
  collapseMode, toggleCollapseMode,
  inverseMarkers, toggleInverseMarkers,
  wikiUrl, setWikiUrl
}) {
  const [markerColor, setMarkerColor] = useState('primary')

  const statusBlock = <>
    <AvatarStatus />
    <MenuStatus />
    <ConfigStatus />
    <AvatarsStatuses />
    <GalleryStatus />
    <SaveStatus />
    <CastStatus />

    <AliveStatus />
    <DynamicInjectStatus />
  </>

  return <MuiPanelProvider
    showSplitterButton={false}
    initialSide='left'
    tooltipComponent={(tooltip, component) => <Tooltip arrow title={tooltip}>{component}</Tooltip>}
    {...{ debugMode, markerColor, inverseMarkers, upperBar }}
    showCollapseButton={collapseMode}>

    <ToggleTheme {...{
      toggleUpperBar, upperBar,
      toggleDebugMode, debugMode,
      help, toggleHelp,
      toggleDarkMode, darkMode,
      toggleCollapseMode, collapseMode,
      toggleInverseMarkers, inverseMarkers,
      markerColor, setMarkerColor
    }} />


    {statusBlock}

    <MuiStatusBar style={{
      // height: '32px',
      // backgroundColor: '#41a0ff42',
      // borderTop: '3px solid #41a0ff',
    }}/>

    {/* <MupContent> */}
    {/* <iframe
      title="Random Wiki article"
      style={{
        width: '100%',
        backgroundColor: '#FFF',
        height: '100%',
        border: '0px none'
      }}
      src={window.location.search.split('url=')[1] || wikiUrl}
    /> */}
    <div>demo content</div>
    {/* </MupContent> */}
  </MuiPanelProvider>
}

export default ImplementationFrame
