import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import DataProvider from '../MuiStore'
import InternalStatus from '../MuiStatusBar/InternalStatus'

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

const MuiWrapper = ({ children }) => {
  const { settings } = useContext(DataProvider)
  const classes = useStyles()

  return <Box
    id="MuiPanelManager"
    display="flex"
    flexDirection={settings.position === 'top' ? 'column-reverse' : 'column'}
    className={classes.box}
  >
    <div className={classes.children}>{children}</div>
    <div id="mui-status-statusBar">
      {!settings.statusBarAnnounced && <InternalStatus />}
    </div>
  </Box>
}

MuiWrapper.propTypes = {
  children: PropTypes.any.isRequired,
}

export default MuiWrapper
