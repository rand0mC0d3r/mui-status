import { Tooltip } from '@material-ui/core'
import { MuiPanelProvider } from '../components/MuiPanelStore'
// import MuiStatusBar from '../components/MuiStatusBar'
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
  debug, toggleDebug,
  position, setPosition
}) {
  return <MuiPanelProvider {...{ debug, position }}
    tooltipComponent={(tooltip, component) => <Tooltip arrow title={tooltip}>{component}</Tooltip>}
  >

    <ToggleTheme {...{
      toggleDebug, debug,
      toggleDarkMode, darkMode,
      setPosition, position,
    }} />

    <AvatarStatus />
    <MenuStatus />
    <ConfigStatus />
    <AvatarsStatuses />
    <GalleryStatus />
    <SaveStatus />
    <CastStatus />

    <AliveStatus />
    <DynamicInjectStatus />

    {/* <MuiStatusBar style={{
      // height: '32px',
      // backgroundColor: '#41a0ff42',
      // borderTop: '3px solid #41a0ff',
    }}/> */}

    <div>demo content</div>
  </MuiPanelProvider>
}

export default ImplementationFrame
