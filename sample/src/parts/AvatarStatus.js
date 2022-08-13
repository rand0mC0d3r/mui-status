import { useTheme } from '@material-ui/core/styles'
import MuiStatusChild from '../components/MuiStatusChild'
import MupStatus from '../components/MupStatus'

export default () => {
  const theme = useTheme()

  return <MupStatus {...{ id: 'avatarStatus' }}
    style={{ borderRight: `1px solid ${theme.palette.divider}`, minWidth: '48px' }}
  >
    <MuiStatusChild mask image='https://picsum.photos/32/32' />
  </MupStatus>
}
