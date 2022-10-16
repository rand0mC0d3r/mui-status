/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CSSProperties, ReactNode, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { SettingsObject, StatusObject } from '../index.types'
import MupStatus from '../MuiStatus'
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

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  order: -1,
  alignItems: 'stretch',
  flexDirection: 'column',
  backgroundColor: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(8px)',
  border: `1px solid ${theme.palette.primary.main}`,
}))

const StyledTypography = styled(Typography)(() => ({
  lineHeight: 1
}))

export default function ({
  id,
  secondary = false,
  style,
  onClick,
  // onClose,
  highlight,
  tooltip = '',
  children,
  console,
  popoverTitle,
  popoverActions,
} : {
  id: string,
  secondary?: boolean,
  elevation?: number,
  style?: CSSProperties,
  onClick?: any,
  // onClose?: any,
  highlight?: 'default' | 'primary' | 'secondary',
  tooltip?: ReactNode | string,
  children?: ReactNode,
  popoverStyle?: any,
  popoverClassName?: any,
  console?: any,
  popoverTitle?: string,
  popoverActions?: any
}) {
  const {
    status,
    settings
  } : {
    status: StatusObject[],
    settings: SettingsObject,
    popoverComponent: any
  } = useContext(DataProvider)
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)

  const [keepOpen, setKeepOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [elementFound, setElementFound] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleOnClick = (e: any) => {
    if (onClick) {
      onClick()
    }
    if (anchorEl) {
      setAnchorEl(null)
    } else {
      setAnchorEl(e.currentTarget)
    }
  }

  useEffect(() => {
    if (statusObject !== null) {
      setElementFound(document.getElementById('mui-status-statusBar') || null)
    }
  }, [statusObject])

  useEffect(() => {
    const foundObject = status.find(item => item.uniqueId === id)
    if (statusObject === null && foundObject) {
      setStatusObject(foundObject)
    }
  }, [status, id, statusObject])

  return <>
    <MupStatus {...{
      id,
      tooltip,
      highlight: (keepOpen || open) ? 'primary' : highlight,
      secondary,
      onClick: handleOnClick,
      style: { ...style, cursor: 'context-menu', minWidth: '24px' }
    }}
    >
      {children}
    </MupStatus>
    {open && elementFound && createPortal(<StyledContainer>
      {console}
      <StyledActionsWrapper>
        <StyledTypography variant="caption" color="textPrimary">{popoverTitle}</StyledTypography>
        <StyledActions>
          {popoverActions}
          {settings.hasLock && <Tooltip tooltip="Toggle keep-open">
              {keepOpen
                ? <LockOutlinedIcon onClick={() => setKeepOpen(!keepOpen)} color="primary" style={{ fontSize: 14 }} />
                : <LockOpenOutlinedIcon onClick={() => setKeepOpen(!keepOpen)} style={{ fontSize: 14 }} />}
            </Tooltip>}
        </StyledActions>
      </StyledActionsWrapper>
    </StyledContainer>, elementFound)}
  </>
}
