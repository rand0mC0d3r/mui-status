import { Popover, Tooltip } from '@material-ui/core'
import { MuiPanelProvider } from '../components/MuiPanelStore'
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
    popoverComponent={({ popover, popoverProps }) => <Popover {...{ ...popoverProps }}>{popover}</Popover>}
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

    <iframe
      title="Random Wiki article"
      style={{
        width: '100%',
        backgroundColor: '#FFF',
        height: '100%',
        border: '0px none'
      }}
      src='https://en.wikipedia.org/wiki/Thessaloniki#20th_century_and_since'
    />

  </MuiPanelProvider>
}

export default ImplementationFrame
