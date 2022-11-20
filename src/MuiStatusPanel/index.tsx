/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { alpha, ClickAwayListener, Popper, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CSSProperties, ReactNode, useContext, useEffect, useState } from 'react'
import { SettingsObject, StatusObject } from '../index.types'
import MuiStatus from '../MuiStatus'
import DataProvider from '../MuiStore'

const StyledActionsWrapper = styled('div')(({ theme } : {theme: any}) => ({
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  borderTop: `1px solid ${theme.palette.divider}`,
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
  backgroundColor: `${alpha(theme.palette.background.default, 0.75)}`,
  backdropFilter: 'blur(8px)',
  borderRadius: `${theme.shape.borderRadius}px`,
  margin: `${theme.spacing(0.5)} 0px`,
  padding: theme.spacing(0.5),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[elevation]
}))

const StyledTypography = styled(Typography)(() => ({
  lineHeight: 1
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
    if (!keepOpen) {
      setAnchorEl(null)
    }
    if (!settings.hasLock) {
      setAnchorEl(null)
    }
  }

  const FallbackPopoverProps = {
    open,
    anchorEl,
    onClose,
    elevation,
    id: `mui-status-panel-popover-${id}`,
    className: popoverClassName,
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
    <Popper {...{ keepMounted: keepOpen, ...FallbackPopoverProps }}>
      <ClickAwayListener onClickAway={() => handleOnClose()}>
        <StyledContainer {...{ elevation }}>
          {popover}
          <StyledActionsWrapper>
            <StyledTypography variant="caption" color="textSecondary">{popoverTitle}</StyledTypography>
            <StyledActions>
              {popoverActions}
              {settings.hasLock && <Tooltip title="Toggle keep-open">
                {keepOpen
                  ? <LockOutlinedIcon onClick={() => setKeepOpen(!keepOpen)} color="primary" style={{ fontSize: 14 }} />
                  : <LockOpenOutlinedIcon onClick={() => setKeepOpen(!keepOpen)} style={{ fontSize: 14 }} />}
              </Tooltip>}
            </StyledActions>
          </StyledActionsWrapper>
        </StyledContainer>
      </ClickAwayListener>
    </Popper>
  </>
}
