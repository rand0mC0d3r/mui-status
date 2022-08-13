import { Popover } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import DataProvider from '../MuiPanelStore'
import MupStatus from '../MuiStatus'

const MuiStatusPanel = ({
  id,
  secondary,
  elevation,
  style,
  tooltip,
  children,
  popoverStyle,
  popoverClassName,
  popover
}) => {
  const { status } = useContext(DataProvider)
  const [statusObject, setStatusObject] = useState(null)

  const [anchorEl, setAnchorEl] = useState(null)
  const [isToggled, setIsToggled] = useState(false)
  const open = Boolean(anchorEl)

  useEffect(() => {
    const foundObject = status.find(item => item.uniqueId === id)
    if (statusObject === null && foundObject) {
      setStatusObject(foundObject)
    }
  }, [status, id, statusObject])

  const onClick = (e) => {
    setAnchorEl(e.currentTarget)
    setIsToggled(e.pageY < screen.height / 2)
  }
  const onClose = () => setAnchorEl(null)

  return <>
    <MupStatus {...{ id, tooltip, secondary, onClick }} style={{ ...style, minWidth: '24px' }}>
      {children}
    </MupStatus>
    <Popover {...{ open, anchorEl, onClose, elevation }}
      id={`${id}-status-popover`}
      className={popoverClassName}
      style={{ ...popoverStyle, marginTop: `${(isToggled ? 1 : -1) * 12}px` }}
      anchorOrigin={{
        vertical: isToggled ? 'top' : 'bottom',
        horizontal: statusObject?.secondary ? 'right' : 'left'
      }}
      transformOrigin={{
        vertical: !isToggled ? 'bottom' : 'top',
        horizontal: statusObject?.secondary ? 'right' : 'left'
      }}
    >
      {popover}
    </Popover>
  </>
}

MuiStatusPanel.defaultProps = {
  secondary: false,
  tooltip: '',
  elevation: 4,
}

MuiStatusPanel.propTypes = {
  id: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
  style: PropTypes.any,
  elevation: PropTypes.number,
  tooltip: PropTypes.string,
  children: PropTypes.any,
  popover: PropTypes.any,
}

export default MuiStatusPanel
