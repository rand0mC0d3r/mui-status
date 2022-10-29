/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { ClickAwayListener, Popper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CSSProperties, ReactNode, useContext, useEffect, useState } from 'react'
import { SettingsObject, StatusObject } from '../index.types'
import MuiStatus from '../MuiStatus'
import DataProvider from '../MuiStore'
import Tooltip from '../utils/Tooltip'

const StyledActionsWrapper = styled('div')(() => ({
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  borderTop: '1px dotted #000000',
  userSelect: 'none',
  alignItems: 'center'
}))

const StyledActions = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: `${theme.shape.borderRadius}px`,
  justifyContent: 'flex-end',
  alignItems: 'center'
}))

const StyledContainer = styled('div')<{elevation: number}>(({ theme, elevation } : {theme: any, elevation: number}) => ({
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column',
  backgroundColor: `${theme.palette.background.default}BB`,
  backdropFilter: 'blur(8px)',
  borderRadius: `${theme.shape.borderRadius}px`,
  margin: '8px',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[elevation]
}))

const StyledTypography = styled(Typography)(() => ({
  lineHeight: 1
}))

export default function ({
  id,
  secondary = false,
  elevation = 4,
  style,
  onClick,
  onClose,
  highlight,
  tooltip = '',
  children,
  popoverStyle,
  popoverClassName,
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
  popoverStyle?: any,
  popoverClassName?: any,
  popover?: any,
  popoverTitle?: string,
  popoverActions?: any
}) {
  const {
    status,
    settings,
    popoverComponent
  } : {
    status: StatusObject[],
    settings: SettingsObject,
    popoverComponent: any
  } = useContext(DataProvider)
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

  const handleOnClose = () => {
    if (onClose && !keepOpen) {
      onClose()
    }
    if (!keepOpen) {
      setAnchorEl(null)
    }
    if (!settings.hasLock) {
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
    <MuiStatus {...{
      id,
      tooltip,
      highlight: (keepOpen || open) ? 'primary' : highlight,
      secondary,
      onClick: handleOnClick,
      style: { ...style, cursor: 'context-menu', minWidth: '24px' }
    }}
    >
      {children}
    </MuiStatus>
    {popoverComponent !== undefined
      ? popoverComponent(ComponentPopoverProps)
      : <Popper {...{ keepMounted: keepOpen, ...FallbackPopoverProps }}>
        <ClickAwayListener onClickAway={() => handleOnClose()}>
          <StyledContainer {...{ elevation }}>
            {popover}
            <StyledActionsWrapper>
              <StyledTypography variant="caption" color="textSecondary">{popoverTitle}</StyledTypography>
              <StyledActions>
                {popoverActions}
                {settings.hasLock && <Tooltip tooltip="Toggle keep-open">
                    {keepOpen
                      ? <LockOutlinedIcon onClick={() => setKeepOpen(!keepOpen)} color="primary" style={{ fontSize: 14 }} />
                      : <LockOpenOutlinedIcon onClick={() => setKeepOpen(!keepOpen)} style={{ fontSize: 14 }} />}
                  </Tooltip>}
              </StyledActions>
            </StyledActionsWrapper>
          </StyledContainer>
        </ClickAwayListener>
      </Popper>}
  </>
}
