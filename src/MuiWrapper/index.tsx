// import { Box } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
// import React, { useContext } from 'react'
// import InternalStatus from '../MuiStatusBar/InternalStatus'
// import DataProvider from '../MuiStore'

// const useStyles = makeStyles(() => ({
//   box: {
//     height: '100%',
//     width: '100%',
//     position: 'absolute',
//   },
//   children: {
//     flex: '1 1 auto',
//   }
// }))

// const MuiWrapper = ({ children } : { children: any }) => {
//   const { settings } = useContext(DataProvider)
//   const classes = useStyles()

//   return <Box
//     id="MuiPanelManager"
//     display="flex"
//     flexDirection={settings.position === 'top' ? 'column-reverse' : 'column'}
//     className={classes.box}
//   >
//     <div className={classes.children}>{children}</div>
//     <div id="muiStatus-statusBar">
//       {!settings.statusBarAnnounced && <InternalStatus />}
//     </div>
//   </Box>
// }

// export default MuiWrapper
