/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { ClickAwayListener, Popper } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useContext, useEffect, useState } from 'react'
import { StatusObject } from '../index.types'
import MupStatus from '../MuiStatus'
import DataProvider from '../MuiStore'

const StyledLock = styled('div')(() => ({
  padding: '8px',
  display: 'flex',
  justifyContent: 'center',
  borderTop: '1px dotted #000000',
}))

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column',
  backgroundColor: 'rgba(255,255,255,0.8)',
  backdropFilter: 'blur(5px)',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[4]
}))

export default function ({
  id,
  secondary = false,
  elevation = 4,
  style,
  onClick,
  highlight,
  tooltip = '',
  children,
  popoverStyle,
  popoverClassName,
  popover
} : {
  id: string,
  secondary?: boolean,
  elevation?: number,
  style?: React.CSSProperties,
  onClick?: any,
  highlight?: 'default' | 'primary' | 'secondary',
  tooltip?: any,
  children?: any,
  popoverStyle?: any,
  popoverClassName?: any,
  popover?: any,
}) {
  const { status, popoverComponent } = useContext(DataProvider)
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)

  const [keepOpen, setKeepOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isToggled, setIsToggled] = useState(false)
  const open = Boolean(anchorEl)

  const anchorVertical = isToggled ? 'top' : 'bottom'
  const transformVertical = !isToggled ? 'bottom' : 'top'
  const horizontal = statusObject?.secondary ? 'right' : 'left'

  const handleOnClick = (e: any) => {
    if (onClick) {
      onClick()
    }
    if (anchorEl) {
      setAnchorEl(null)
    } else {
      setAnchorEl(e.currentTarget)
    }

    setIsToggled(e.pageY < screen.height / 2)
  }

  const onClose = () => {
    if (!keepOpen) {
      setAnchorEl(null)
    }
  }

  const ComponentPopoverProps = {
    id: `mui-status-panel-given-popover-${id}`,
    position: isToggled ? 'top' : 'bottom',
    isSecondary: statusObject?.secondary,
    popover,
    popoverProps: {
      anchorEl,
      onClose,
      open,
      style: { marginTop: `${(isToggled ? 1 : -1) * 12}px` },
      anchorOrigin: { vertical: anchorVertical, horizontal },
      transformOrigin: { vertical: transformVertical, horizontal },
    }
  }

  const FallbackPopoverProps = {
    open,
    anchorEl,
    onClose,
    elevation,
    disableEnforceFocus: true,
    id: `mui-status-panel-popover-${id}`,
    className: popoverClassName,
    marginThreshold: 36,
    style: {
      marginTop: `${(isToggled ? 1 : -1) * 12}px`,
      ...popoverStyle,
    },
  }

  useEffect(() => {
    const foundObject = status.find(item => item.uniqueId === id)
    if (statusObject === null && foundObject) {
      setStatusObject(foundObject)
    }
  }, [status, id, statusObject])

  return <>
    <MupStatus {...{ id, tooltip, highlight, secondary, onClick: handleOnClick, style: { ...style, minWidth: '24px' } }}>{children}</MupStatus>
    {popoverComponent !== undefined
      ? popoverComponent(ComponentPopoverProps)
      : <Popper {...{ keepMounted: keepOpen, ...FallbackPopoverProps }}>
        <ClickAwayListener onClickAway={() => onClose()}>
          <StyledContainer {...{ style: { margin: '8px' } }}>
            {popover}
            <StyledLock onClick={() => setKeepOpen(!keepOpen)}>
              {keepOpen
                ? <LockOutlinedIcon color="primary" style={{ fontSize: 14 }} />
                : <LockOpenOutlinedIcon style={{ fontSize: 14 }} />}
            </StyledLock>
          </StyledContainer>
        </ClickAwayListener>
      </Popper>}
  </>
}
