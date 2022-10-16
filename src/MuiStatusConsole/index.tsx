/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { styled } from '@mui/material/styles'
import { CSSProperties, ReactNode, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { SettingsObject, StatusObject } from '../index.types'
import MupStatus from '../MuiStatus'
import DataProvider from '../MuiStore'

// const StyledContainer = styled('div')(({ theme }) => ({
//   display: 'flex',
//   order: -1,
//   alignItems: 'stretch',
//   flexDirection: 'column',
//   backgroundColor: 'rgba(255,255,255,0.9)',
//   backdropFilter: 'blur(8px)',
//   minHeight: '350px',
//   border: `1px solid ${theme.palette.primary.dark}`,
//   borderStyle: 'solid none',
// }))

export default function ({
  id,
  secondary = false,
  style,
  onClick,
  // onClose,
  // highlight,
  tooltip = '',
  children,
  console,
} : {
  id: string,
  secondary?: boolean,
  elevation?: number,
  style?: CSSProperties,
  onClick?: any,
  // onClose?: any,
  // highlight?: 'default' | 'primary' | 'secondary',
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
    handleStatusTypeUpdate
  } : {
    status: StatusObject[],
    settings: SettingsObject,
    handleStatusTypeUpdate: any,
  } = useContext(DataProvider)
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)

  // const [keepOpen, setKeepOpen] = useState(false)
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
      setElementFound(document.getElementById('mui-status-console') || null)
    }
  }, [statusObject])

  useEffect(() => {
    const foundObject = status.find(item => item.uniqueId === id)
    if (statusObject === null && foundObject) {
      setStatusObject(foundObject)
      handleStatusTypeUpdate({ id, type: 'console' })
    }
  }, [status, id, statusObject])

  return <>
    <MupStatus {...{
      id,
      tooltip,
      // highlight: (keepOpen || open) ? 'primary' : highlight,
      secondary,
      onClick: handleOnClick,
      style: { ...style, cursor: 'context-menu', minWidth: '24px' }
    }}
    >
      {children}
    </MupStatus>
    {open && elementFound && createPortal(<>
      {console}
    </>, elementFound)}
  </>
}
