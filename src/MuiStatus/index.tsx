import { Stack, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { CSSProperties, ReactNode, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { SettingsObject, StatusObject, ThemeShape } from '../index.types'
import DataProvider from '../MuiStore'

const backgroundColor = (highlight: string, theme: ThemeShape) => {
  switch (highlight) {
    case 'primary':
      return theme.palette.primary.main
    case 'secondary':
      return theme.palette.secondary.main
    default:
      return ''
  }
}

const backgroundColorHover = (highlight: string, theme: ThemeShape) => {
  switch (highlight) {
    case 'primary':
      return theme.palette.primary.dark
    case 'secondary':
      return theme.palette.secondary.dark
    default:
      return theme.palette.divider
  }
}

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  padding: '4px 8px',
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  fontSize: '14px',
  gap: `${theme.spacing(0.5)}`,

  '& > *': {
    fontSize: '14px !important',
  },
}))

const StyledStack = styled(Stack)<{ hasclick?: boolean, highlight?: string, isdisabled?: boolean }>(({ theme, hasclick, highlight, isdisabled }: any) => ({
  WebkitFontSmoothing: 'auto',
  height: '100%',
  display: 'flex',
  flex: '0 0 auto',
  alignItems: 'center',
  gap: '16px',
  justifyContent: 'center',
  alignSelf: 'center',
  position: 'relative',

  cursor: (hasclick && !isdisabled) ? 'pointer' : '',
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

  '&:hover': (hasclick && !isdisabled) ? {
    backgroundColor: backgroundColorHover(highlight, theme),
    color: `${theme.palette.text.primary}`,
  } : {}
}))

/**
 * @param id - (string) Unique identifier for the status element.
 * @param secondary - (boolean) If needs to be applied a secondary style to the status element.
 * @param style - (CSSProperties) Style to be applied to the root element.
 * @param onClick - (function) Function to be executed on click event.
 * @param onContextMenu - (function) Function to be executed on context menu event.
 * @param disabled - (boolean) If needs to be disabled the status element.
 * @param highlight - (string) If needs to be applied a highlight style to the status element.
 * @param tooltip - (string) Tooltip to be displayed on hover.
 * @param children - (JSX.Element) Children to be displayed inside the status element.
 *
 * @returns (JSX.Element) Status element
 */
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

  useEffect(() => {
    if (ownId && statusObject !== null) {
      handleStatusUpdate({ id, ownId, children })
    }
  }, [id, ownId, statusObject, children])

  useEffect(() => {
    if (id && ownId && statusObject === null && !isAnnounced) {
      if (!status.some(({ uniqueId }) => uniqueId === id)) {
        if (callbackHandleStatusAnnouncement(id)) {
          setIsAnnounced(true)
        }
      }
    }
  }, [id, ownId, statusObject, status, callbackHandleStatusAnnouncement, isAnnounced])

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
        ? <StyledStack {...{
          id,
          key: `mui-status-${id}`,
          onClick: handleOnClick,
          onContextMenu: handleOnContextMenu,
          style: { ...style, order: statusObject.index },

          highlight,
          hasclick: !!onClick,
          isdisabled: disabled
        }}
        >
          <StyledTooltip title={tooltip} arrow>
            <span>{children}</span>
          </StyledTooltip>
        </StyledStack>
        : <></>,
      elementFound
    )}
  </>
}
