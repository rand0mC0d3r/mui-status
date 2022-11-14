/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { CSSProperties, ReactNode, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { SettingsObject, StatusObject } from '../index.types'
import DataProvider from '../MuiStore'

const backgroundColor = (highlight: string, theme: any) => {
  switch (highlight) {
    case 'primary':
      return theme.palette.primary.main
    case 'secondary':
      return theme.palette.secondary.main
    default:
      return ''
  }
}
const backgroundColorHover = (highlight: string, theme: any) => {
  switch (highlight) {
    case 'primary':
      return theme.palette.primary.dark
    case 'secondary':
      return theme.palette.secondary.dark
    default:
      return theme.palette.divider
  }
}

const StyledTooltip = styled(Tooltip)(() => ({
  padding: '4px 8px',
}))

const StyledContainer = styled('div')<{ hasClick?: boolean, highlight?: string, isDisabled?: boolean }>(({ theme, hasClick, highlight, isDisabled }: any) => ({
  WebkitFontSmoothing: 'auto',
  height: '100%',
  display: 'flex',
  flex: '0 0 auto',
  alignItems: 'center',
  gap: '16px',
  justifyContent: 'center',
  alignSelf: 'center',
  position: 'relative',

  cursor: (hasClick && !isDisabled) ? 'pointer' : '',
  backgroundColor: backgroundColor(highlight, theme),
  color: theme.palette.text.primary,

  '& > div > *': {
    color: highlight !== 'default'
      ? `${theme.palette.background.default} !important`
      : '',
  },
  '& > span > div > *': {
    color: highlight !== 'default'
      ? `${theme.palette.background.default} !important`
      : '',
  },

  '&:hover': (hasClick && !isDisabled) ? {
    backgroundColor: backgroundColorHover(highlight, theme),
    color: `${theme.palette.text.primary}`,
  } : {}
}))

export default function ({
  id,
  secondary = false,
  style,
  onClick,
  onContextMenu,
  disabled = false,
  highlight = 'default',
  tooltip = '',
  children,
} : {
  id: string,
  secondary?: boolean,
  style?: CSSProperties,
  onClick?: any,
  onContextMenu?: any,
  disabled?: boolean,
  highlight?: 'default' | 'primary' | 'secondary',
  tooltip?: ReactNode | string,
  children?: ReactNode,
}) {
  const { status, handleStatusUpdate, handleStatusAnnouncement, handleStatusDestroy } = useContext(DataProvider)
  const { allowRightClick } = useContext(DataProvider).settings as SettingsObject
  const [ownId, setOwnId] = useState<string | null>()
  const [isAnnounced, setIsAnnounced] = useState<boolean>(false)
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)
  const [elementFound, setElementFound] = useState<HTMLElement | null>(null)

  const callbackHandleStatusAnnouncement = useCallback(
    idIncoming => handleStatusAnnouncement({ id: idIncoming, ownId, secondary, children }),
    [secondary, ownId, children, handleStatusAnnouncement]
  )

  const callbackHandleStatusDestroy = useCallback(() => {
    handleStatusDestroy({ id })
  }, [id])

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined && !disabled) {
      e.preventDefault()
      onClick(e)
      handleStatusUpdate({ id, ownId, children })
    }
  }

  const handleOnContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (allowRightClick && onContextMenu !== undefined && !disabled) {
      onContextMenu(e)
    }
  }

  useEffect(() => {
    setOwnId((Math.random() + 1).toString(36).substring(7))
  }, [])

  /**
   * Update status element with changed children or highlight
   * */
  useEffect(() => {
    if (ownId && statusObject !== null) {
      handleStatusUpdate({ id, ownId, children })
    }
  }, [id, ownId, statusObject, children])

  /**
   * Announce status element to the store
   * */
  useEffect(() => {
    if (id && ownId && statusObject === null && !isAnnounced) {
      if (!status.some(({ uniqueId }) => uniqueId === id)) {
        if (callbackHandleStatusAnnouncement(id)) {
          setIsAnnounced(true)
        }
      }
    }
  }, [id, ownId, statusObject, status, callbackHandleStatusAnnouncement, isAnnounced])

  /**
   * Find newly published status element in the store
   * */
  useEffect(() => {
    const foundObject = status.find(({ uniqueId }) => uniqueId === id)
    if ((statusObject === null || statusObject?.visible !== foundObject?.visible) && foundObject) {
      setStatusObject(foundObject)
    }
  }, [status, id, statusObject])

  useLayoutEffect(() => {
    if (statusObject !== null) {
      setElementFound(document.getElementById(`mui-status-statusBar-${secondary ? 'secondary' : 'primary'}`) || null)
    }
  }, [secondary, statusObject, id])

  useEffect(() => () => {
    callbackHandleStatusDestroy()
  }, [callbackHandleStatusDestroy])

  useEffect(() => {
    if (!id) {
      console.error('Please define an id for the status bar item')
    }
  }, [id])

  return <>
    {(statusObject !== null && !!id && elementFound) && createPortal(
      (statusObject.visible && children)
        ? <StyledContainer {...{
          id,
          highlight,
          hasClick: !!onClick,
          isDisabled: disabled,
          key: `mui-status-${id}`,
          onClick: handleOnClick,
          onContextMenu: handleOnContextMenu,
          style: { ...style, order: statusObject.index }
        }}
        >
          <StyledTooltip title={tooltip} arrow>
            <span>{children}</span>
          </StyledTooltip>
        </StyledContainer>
        : <></>,
      elementFound
    )}
  </>
}
