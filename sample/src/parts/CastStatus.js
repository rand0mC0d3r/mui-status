import CastConnectedIcon from '@material-ui/icons/CastConnected'
import MuiStatus from '../components/MuiStatus'
import MuiStatusChild from '../components/MuiStatusChild'

export default () => <MuiStatus
  id="triggerChromeCastPanel"
  tooltip="Awaiting for connections"
>
  <MuiStatusChild icon={<CastConnectedIcon />} text='0 Devices connected' />
</MuiStatus>
