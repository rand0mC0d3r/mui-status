/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, {
  useCallback, useContext, useEffect, useState
} from 'react'
import { createPortal } from 'react-dom'
import { StatusObject } from '../index.types'
import DataProvider from '../MuiStore'

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
  onClick = false,
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
  highlight?: any,
  tooltip?: any,
  children?: React.ReactNode,
}) {
  const {
    status, settings, tooltipComponent,
    handleStatusUpdate, handleStatusAnnouncement, handleStatusDestroy,
  } = useContext(DataProvider)
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)
  const [elementFound, setElementFound] = useState<HTMLElement | null>(null)
  const theme = useTheme()
  const classes = useStyles(theme)

  const callbackOnClick = useCallback(e => {
    onClick(e)
  }, [onClick])

  const callbackHandleStatusAnnouncement = useCallback(idIncoming => {
    handleStatusAnnouncement({ id: idIncoming, secondary, children })
  }, [secondary, children, handleStatusAnnouncement])

  const callbackHandleStatusDestroy = useCallback(() => {
    handleStatusDestroy({ id })
  }, [id])

  const generateClasses = () => clsx([
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

  const handleOnClick = (e: any) => {
    if (onClick) { callbackOnClick(e) }
    handleStatusUpdate({ id, children })
  }

  const handleOnContextMenu = (e: any) => settings.allowRightClick ? onContextMenu && onContextMenu(e) : e.preventDefault()

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
    {(statusObject !== null && !!id && elementFound) && <>
      {createPortal(
        statusObject.visible
          ? <div
              {...{ id, onClick: handleOnClick, onContextMenu: handleOnContextMenu }}
              key={`MupStatus_${id}_wrapper`}
              className={generateClasses()}
              style={{ ...style, order: statusObject.index }}
          >
            {tooltipComponent !== undefined ? tooltipComponent(tooltip, <span>{children}</span>) : children}
          </div>
          : <></>,
        elementFound
      )}
    </>}
  </>
}
