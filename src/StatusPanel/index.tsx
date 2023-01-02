/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined'
import { alpha, ClickAwayListener, Popper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CSSProperties, ReactNode, useContext, useEffect, useState } from 'react'
import { SettingsObject, StatusObject } from '../index.types'
import InternalHeader from '../internal/InternalHeader'
import Status from '../Status'
import DataProvider from '../Store'

const StyledPopper = styled(Popper)<{ toggled: string}>(({ toggled }) => ({
  zIndex: '99991',
  marginTop: `${(toggled === 'true' ? 1 : -1) * 4}px !important`,
}))

const StyledContainer = styled('div')<{elevation: number}>(({ theme, elevation } : {theme: any, elevation: number}) => ({
  display: 'flex',
  alignItems: 'stretch',
  position: 'relative',
  flexDirection: 'column',
  backgroundColor: `${alpha(theme.palette.background.default, 0.75)}`,
  backdropFilter: 'blur(8px)',
  borderRadius: `${theme.shape.borderRadius}px`,
  margin: `${theme.spacing(2)} 0px`,
  padding: theme.spacing(0.5),
  border: `3px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[elevation]
}))

export default function ({
  id,
  secondary = false,
  elevation = 2,
  style,
  onClick,
  onClose,
  highlight,
  tooltip = '',
  children,
  popover,
  popoverTitle,
  popoverActions,
} : {
  id: string,
  secondary?: boolean,
  elevation?: number,
  style?: CSSProperties,
  onClick?: any,
  onClose?: any,
  highlight?: 'default' | 'primary' | 'secondary',
  tooltip?: ReactNode | string,
  children?: ReactNode,
  popover?: any,
  popoverTitle?: string,
  popoverActions?: any
}) {
  const {
    status,
    settings,
  } : {
    status: StatusObject[],
    settings: SettingsObject,
  } = useContext(DataProvider)
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)

  const [keepOpen, setKeepOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isToggled, setIsToggled] = useState(false)
  const open = Boolean(anchorEl)

  const handleOnClick = (e: any) => {
    if (onClick && !keepOpen) {
      onClick()
    }
    if (anchorEl && !keepOpen) {
      setAnchorEl(null)
    } else {
      setAnchorEl(e.currentTarget)
    }

    setIsToggled(e.pageY < screen.height / 2)
  }

  const handleOnClose = () => {
    if (onClose && !keepOpen) {
      onClose()
    }
    if (!keepOpen || !settings.hasLock) {
      setAnchorEl(null)
    }
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
      tooltip,
      hasArrow: open,
      highlight: (keepOpen || open) ? 'primary' : highlight,
      secondary,
      onClick: handleOnClick,
      style: { ...style, cursor: 'context-menu', minWidth: '24px' }
    }}
    >
      {children}
    </Status>
    <StyledPopper {...{
      keepMounted: keepOpen,
      open,
      anchorEl,
      onClose,
      elevation,
      id: `mui-status-panel-popover-${id}`,
      toggled: isToggled.toString(),
    }}
    >
      <ClickAwayListener onClickAway={() => handleOnClose()}>
        <StyledContainer {...{ elevation }}>
          {/* <div style={{ position: 'absolute', top: '-17px', left: '0px', right: '0px', display: 'flex', justifyContent: 'center' }}>
            <ArrowDropUpOutlinedIcon color="primary" />
          </div> */}
          {popover}
          <InternalHeader {...{ id, keepOpen, setKeepOpen, popoverActions, popoverTitle }} />
        </StyledContainer>
      </ClickAwayListener>
    </StyledPopper>
  </>
}
