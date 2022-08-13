import CastConnectedIcon from '@material-ui/icons/CastConnected'
import MuiStatus from '../components/MuiStatus'
import MuiStatusChild from '../components/MuiStatusChild'

export default () => <MuiStatus
  id="triggerChromeCastPanel"
  focusOnClick='chromecastPanel'
  tooltip="Toggle visibility for panel"
>
  <MuiStatusChild icon={<CastConnectedIcon />} text={'Toggle Panel'} />
</MuiStatus>
