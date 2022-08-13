import { useTheme } from '@material-ui/core/styles'
import MuiStatus from '../components/MuiStatus'
import MuiStatusChild from '../components/MuiStatusChild'

export default () => {
  const theme = useTheme()

  return <MuiStatus {...{ id: 'avatarStatus' }}
    style={{ borderRight: `1px solid ${theme.palette.divider}`, minWidth: '48px' }}
  >
    <MuiStatusChild mask image='https://picsum.photos/32/32' />
  </MuiStatus>
}
