import { MenuItem, MenuList } from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt'
import MuiStatusChild from '../components/MuiStatusChild'
import MuiStatusPanel from '../components/MuiStatusPanel'

export default () => <MuiStatusPanel
  id='statusSampleMenu'
  tooltip="Open Sample menu..."
  popover={<MenuList id="menu-list-grow" onKeyDown={() => { }}>
    <MenuItem onClick={() => { }}>Profile</MenuItem>
    <MenuItem onClick={() => { }}>My account</MenuItem>
    <MenuItem onClick={() => { }}>Logout</MenuItem>
  </MenuList>}
>
  <MuiStatusChild icon={<ListAltIcon />} text="Menu" />
</MuiStatusPanel>
