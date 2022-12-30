/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { alpha, ClickAwayListener, Popper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext, useEffect, useState } from 'react'
import { SettingsObject, SnackbarObject, StatusObject } from '../index.types'
import InternalAlert from '../internal/InternalAlert'
import InternalHeader from '../internal/InternalHeader'
import Status from '../Status'
import StatusHelper from '../StatusHelper'
import DataProvider from '../Store'

const StyledPopper = styled(Popper)<{ toggled: string}>(({ toggled }) => ({
  zIndex: '99991',
  marginTop: `${(toggled === 'true' ? 1 : -1) * 4}px !important`,
}))

const StyledContainer = styled('div')<{elevation: number}>(({ theme, elevation } : {theme: any, elevation: number}) => ({
  display: 'flex',
  width: '650px',
  gap: '8px',
  alignItems: 'stretch',
  position: 'relative',
  flexDirection: 'column',
  backgroundColor: `${alpha(theme.palette.background.default, 0.75)}`,
  backdropFilter: 'blur(8px)',
  borderRadius: `${theme.shape.borderRadius}px`,
  margin: `${theme.spacing(0.5)} 0px`,
  padding: theme.spacing(0.5),
  border: `3px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[elevation]
}))

export default function ({
  id = 'notificationsPanel',
} : {
  id?: string,
}) {
  const {
    status,
    snackbar,
  } : {
    status: StatusObject[],
    snackbar: SnackbarObject[],
  } = useContext(DataProvider)
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)

  const [anchorEl, setAnchorEl] = useState(null)
  const [isToggled, setIsToggled] = useState(false)
  const open = Boolean(anchorEl)

  const handleOnClick = (e: any) => {
    if (anchorEl) {
      setAnchorEl(null)
    } else {
      setAnchorEl(e.currentTarget)
    }

    setIsToggled(e.pageY < screen.height / 2)
  }

  const handleOnClose = () => {
    // if (!settings.hasLock) {
    //   setAnchorEl(null)
    // }
  }

  useEffect(() => {
    const foundObject = status.find(item => item.uniqueId === id)
    if (statusObject === null && foundObject) {
      setStatusObject(foundObject)
    }
  }, [status, id, statusObject])

  return <>
    <Status {...{
      id,
      tooltip: 'Notifications',
      hasArrow: open,
      highlight: open ? 'primary' : 'default',
      secondary: true,
      onClick: handleOnClick,
    }}
    >
      <StatusHelper text="Notifications" icon={<NotificationsOutlinedIcon />} notifications={snackbar.length} />
    </Status>
    <StyledPopper {...{
      open,
      anchorEl,
      id: `mui-status-panel-popover-${id}`,
      toggled: isToggled.toString(),
    }}
    >
      <ClickAwayListener onClickAway={() => handleOnClose()}>
        <StyledContainer {...{ elevation: 0 }}>
          <div style={{ position: 'absolute', top: '-17px', left: '0px', right: '0px', display: 'flex', justifyContent: 'center' }}>
            <ArrowDropUpOutlinedIcon color="primary" />
          </div>
          {snackbar.map(({ uniqueId, severity, message, source, actions, code }) => (
            <InternalAlert key={uniqueId} {...{ uniqueId, actions, severity, source, message, code }} />))}
          <InternalHeader {...{ id }} />
        </StyledContainer>
      </ClickAwayListener>
    </StyledPopper>
  </>
}
