import { Box } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useContext } from 'react'
import DataProvider from '../MuiPanelStore'
import InternalStatus from './../MuiStatusBar/InternalStatus'

const useStyles = makeStyles((theme) => ({
  box: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  root: {
    flex: '1 1 auto',
    width: '100%',
    overflow: 'hidden',
    display: 'grid',
    'grid-template-rows': '1fr',
    'gap': '0px 0px',
    'grid-auto-flow': 'row',
    backgroundColor: theme.palette.background.default,
  },
}))

const MuiPanelStatus = ({ children }) => {
  const theme = useTheme()
  const { settings } = useContext(DataProvider)
  const classes = useStyles(theme, settings.upperBar)

  return <Box
    id="MuiPanelStatus"
    display="flex"
    flexDirection={settings.upperBar ? 'column-reverse' : 'column'}
    className={classes.box}
  >
    <div id="MuiPanels" className={`${classes.root}`}>{children}</div>
    <div id="material-ui-panel-statusBar">{!settings.statusBarAnnounced && <InternalStatus />}</div>
  </Box>
}

export default MuiPanelStatus
