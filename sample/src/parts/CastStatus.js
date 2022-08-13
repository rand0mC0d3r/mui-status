import CastConnectedIcon from '@material-ui/icons/CastConnected'
import MuiStatusChild from '../components/MuiStatusChild'
import MupStatus from '../components/MupStatus'

export default () => <MupStatus
  id="triggerChromeCastPanel"
  focusOnClick='chromecastPanel'
  tooltip="Toggle visibility for panel"
>
  <MuiStatusChild icon={<CastConnectedIcon />} text={'Toggle Panel'} />
</MupStatus>
