import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useContext } from 'react'
import InternalStatus from '../MuiStatusBar/InternalStatus'
import DataProvider, { Position } from '../MuiStore'

const useStyles = makeStyles(() => ({
  boxElem: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  childrenElem: {
    flex: '1 1 auto',
  }
}))

const flexDirection = (position: string) => position === Position.top ? 'column-reverse' : 'column'

export default ({ children } : { children: React.ReactNode }) => {
  const { settings } = useContext(DataProvider)
  const classes = useStyles()
  const { boxElem, childrenElem } = classes

  return <Box id="mui-status-wrapper" {...{ display:"flex",  flexDirection: flexDirection(settings.position), className:boxElem }}>
    <div id="mui-status-children" className={childrenElem}>{children}</div>
    <div id="mui-status-statusBar">{!settings.statusBarAnnounced && <InternalStatus />}</div>
  </Box>
}
