import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useContext } from 'react'
import InternalStatus from '../MuiStatusBar/InternalStatus'
import DataProvider, { Position } from '../MuiStore'

const useStyles = makeStyles(() => ({
  box: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  children: {
    flex: '1 1 auto',
  }
}))

export default ({ children } : { children: React.ReactNode }) => {
  const { settings } = useContext(DataProvider)
  const classes = useStyles()

  return <Box
    id="MuiWrapper"
    display="flex"
    flexDirection={settings.position === Position.top ? 'column-reverse' : 'column'}
    className={classes.box}
  >
    <div className={classes.children}>{children}</div>
    <div id="muiStatus-statusBar">{!settings.statusBarAnnounced && <InternalStatus />}</div>
  </Box>
}
