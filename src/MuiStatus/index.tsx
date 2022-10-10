/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { StatusObject } from '../index.types'
import DataProvider from '../MuiStore'
import Tooltip from '../utils/Tooltip'

const useStyles = makeStyles(theme => ({
  default: {
    WebkitFontSmoothing: 'auto',
    height: '100%',
    padding: '0px 4px',
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    gap: '16px',
    justifyContent: 'center',
    alignSelf: 'stretch',
    position: 'relative',
  },
  interactive: {
    cursor: 'pointer',
  },
  actionNormal: {
    '&:hover': {
      backgroundColor: `${theme.palette.augmentColor({ main: theme.palette.divider }).light} !important`,
    },
  },
  actionHighlightSecondary: {
    '&:hover': {
      backgroundColor: `${theme.palette.augmentColor({ main: theme.palette.secondary.main }).dark} !important`,
      color: `${theme.palette.background.default} !important`,
    },
  },
  actionHighlightPrimary: {
    '&:hover': {
      backgroundColor: `${theme.palette.augmentColor({ main: theme.palette.primary.main }).dark} !important`,
      color: `${theme.palette.background.default} !important`,
    },
  },
  hightlight: {
    backgroundColor: theme.palette.secondary.main,
    '& > div > *': {
      color: `${theme.palette.background.default} !important`,
    },
  },
  hightlightPrimary: {
    backgroundColor: theme.palette.primary.main,
    '& > div > *': {
      color: `${theme.palette.background.default} !important`,
    },
  },
}))

export default function ({
  id,
  secondary = false,
  style,
  onClick,
  onContextMenu,
  highlight = 'default',
  tooltip = '',
  children,
} : {
  id: string,
  secondary?: boolean,
  style?: React.CSSProperties,
  onClick?: any,
  onContextMenu?: any,
  highlight?: 'default' | 'primary' | 'secondary',
  tooltip?: React.ReactNode | string,
  children?: React.ReactNode,
}) {
  const { status, settings, handleStatusUpdate, handleStatusAnnouncement, handleStatusDestroy } = useContext(DataProvider)
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)
  const [elementFound, setElementFound] = useState<HTMLElement | null>(null)
  const theme = useTheme()
  const classes = useStyles(theme)

  const callbackHandleStatusAnnouncement = useCallback(idIncoming => {
    handleStatusAnnouncement({ id: idIncoming, secondary, children })
  }, [secondary, children, handleStatusAnnouncement])

  const callbackHandleStatusDestroy = useCallback(() => {
    handleStatusDestroy({ id })
  }, [id])

  const generateClasses = clsx([
    classes.default,

    highlight !== 'default' && classes.hightlight,
    highlight === 'primary' && classes.hightlightPrimary,

    (onClick) && [
      classes.interactive,
      highlight === 'default' && classes.actionNormal,
      highlight === 'primary' && classes.actionHighlightPrimary,
      highlight === 'secondary' && classes.actionHighlightSecondary,
    ],
  ])

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.preventDefault()
      onClick(e)
    }
    handleStatusUpdate({ id, children })
  }

  const handleOnContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (settings.allowRightClick && onContextMenu) {
      onContextMenu(e)
    }
  }

  useEffect(() => {
    const elementSearched = document.getElementById(`mui-status-statusBar-${secondary ? 'secondary' : 'primary'}`)
    if (elementSearched !== null) {
      setElementFound(elementSearched)
    }
  }, [secondary, statusObject])

  useEffect(() => {
    handleStatusUpdate({ id, children })
  }, [id, children])

  useEffect(() => () => {
    callbackHandleStatusDestroy()
  }, [callbackHandleStatusDestroy])

  useEffect(() => {
    if (id && statusObject === null && !status.some(item => item.uniqueId === id)) {
      callbackHandleStatusAnnouncement(id)
    }
  }, [id, statusObject, status, callbackHandleStatusAnnouncement])

  useEffect(() => {
    const foundObject = status.find(item => item.uniqueId === id)
    if ((statusObject === null || statusObject?.visible !== foundObject?.visible) && foundObject) {
      setStatusObject(foundObject)
    }
  }, [status, id, statusObject])

  return <>
    {(statusObject !== null && !!id && elementFound) && createPortal(
      statusObject.visible
        ? <div {...{
          id,
          key: `mui-status-${id}`,
          onClick: handleOnClick,
          onContextMenu: handleOnContextMenu,
          className: generateClasses,
          style: { ...style, order: statusObject.index }
        }}
        >
          <Tooltip {...{ tooltip, children }} />
        </div>
        : <></>,
      elementFound
    )}
  </>
}
